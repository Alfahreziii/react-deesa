import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import DatePicker from "../date-picker";
import { createIuran, updateIuran } from "../../../api/services/iuranService";
import dayjs from "dayjs";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function IuranFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    bulan: initialData?.bulan || "",
    harga: initialData?.harga?.toString() || "",
    jatuh_tempo: initialData?.jatuh_tempo || "",
  });

  // Format angka menjadi Rp
  const formatRupiah = (value: string) => {
    const angka = value.replace(/\D/g, "") || "0";
    return "Rp" + parseInt(angka, 10).toLocaleString("id-ID");
  };


  // Ambil hanya angka dari string
  const extractAngka = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "harga") {
      const angka = extractAngka(value);
      setFormData((prev) => ({ ...prev, harga: angka }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bulan || !formData.harga || !formData.jatuh_tempo ) {
      setErrorMessage("Harap isi semua field!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const formattedData = {
      ...formData,
      bulan: dayjs(formData.bulan).format("YYYY-MM-DD"),
      harga: parseInt(formData.harga, 10) || 0,
      jatuh_tempo: dayjs(formData.jatuh_tempo).format("YYYY-MM-DD"),
    };

    try {
      if (isUpdate && initialData?.id) {
        const response = await updateIuran(initialData.id, formattedData);
        setSuccessMessage(response.message || "Iuran berhasil diperbarui!");
      } else {
        const response = await createIuran(formattedData);
        setSuccessMessage(response.message || "Iuran berhasil ditambahkan!");
        setFormData({
          bulan: "",
          harga: "",
          jatuh_tempo: "",
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setErrorMessage(error?.message || "Terjadi kesalahan.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ComponentCard title={isUpdate ? "Edit Iuran" : "Input Iuran"}>
      {errorMessage && (
        <Alert variant="error" title="Error Message" message={errorMessage} />
      )}
      {successMessage && (
        <Alert variant="success" title="Success Message" message={successMessage} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <DatePicker
            id="bulan"
            label="Bulan"
            mode="month"
            disabled={isDetail}
            placeholder="Pilih bulan"
            value={formData.bulan}
            onChange={(_, dateStr) => {
              setFormData((prev) => ({ ...prev, bulan: dateStr }));
            }}
          />
        </div>

        <div>
          <Label htmlFor="Harga">Harga</Label>
          <div className="relative">
            <Input
              type="text"
              id="harga"
              name="harga"
              disabled={isDetail}
              placeholder="Contoh: Rp150.000"
              value={formatRupiah(String(formData.harga))}
              onChange={handleChange}
            />
          </div>
        </div>

        <DatePicker
          id="jatuh_tempo"
          label="Jatuh Tempo"
          disabled={isDetail}
          placeholder="Pilih tanggal"
          value={formData.jatuh_tempo}
          onChange={(_, dateStr) => {
            setFormData((prev) => ({ ...prev, jatuh_tempo: dateStr }));
          }}
        />

        {!isDetail && (
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {isUpdate ? "Perbarui Iuran" : "Simpan Iuran"}
          </button>
        )}
      </form>
    </ComponentCard>
  );
}
