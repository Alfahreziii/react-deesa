import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import { createLaporan, updateLaporan } from "../../../api/services/laporanService";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function PendudukFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    jumlah_rumah: initialData?.jumlah_rumah || "",
    jumlah_meninggal: initialData?.jumlah_meninggal || "",
    jumlah_pindah: initialData?.jumlah_pindah || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.jumlah_rumah || !formData.jumlah_meninggal || !formData.jumlah_pindah) {
    setErrorMessage("Harap isi semua field!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

const formattedData = {
  jumlah_rumah: parseInt(formData.jumlah_rumah, 10) || 0,
  jumlah_meninggal: parseInt(formData.jumlah_meninggal, 10) || 0,
  jumlah_pindah: parseInt(formData.jumlah_pindah, 10) || 0,
};

console.log("Submitting data:", formattedData);

if (isUpdate && initialData?.id) {
  console.log("Updating id:", initialData.id);
}

  try {
    if (isUpdate && initialData?.id) {
      const response = await updateLaporan(initialData.id, formattedData);
      
      setSuccessMessage(response.message || "Penduduk berhasil diperbarui!");
    } else {
      const response = await createLaporan(formattedData);
      setSuccessMessage(response.message || "Penduduk berhasil ditambahkan!");
      setFormData({
        jumlah_rumah: "",
        jumlah_meninggal: "",
        jumlah_pindah: "",
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
    const backendMessage = error?.response?.data?.message;
    setErrorMessage(backendMessage || error?.message || "Terjadi kesalahan.");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }

};


  return (
    <ComponentCard title={isUpdate ? "Edit Penduduk Bakti" : "Input Penduduk Bakti"}>
      {errorMessage && (
        <Alert variant="error" title="Error Message" message={errorMessage} />
      )}
      {successMessage && (
        <Alert variant="success" title="Success Message" message={successMessage} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="jumlah_rumah">Jumlah Rumah</Label>
          <div className="relative">
            <Input
              type="number"
              id="jumlah_rumah"
              name="jumlah_rumah"
              value={formData.jumlah_rumah}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="jumlah_meninggal">Jumlah Meninggal</Label>
          <div className="relative">
            <Input
              type="number"
              id="jumlah_meninggal"
              name="jumlah_meninggal"
              value={formData.jumlah_meninggal}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="jumlah_pindah">Jumlah Pindah</Label>
          <div className="relative">
            <Input
              type="number"
              id="jumlah_pindah"
              name="jumlah_pindah"
              value={formData.jumlah_pindah}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>

        {!isDetail && (
        <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            {isUpdate ? "Perbarui Penduduk" : "Simpan Penduduk"}
        </button>
        )}

      </form>
    </ComponentCard>
  );
}
