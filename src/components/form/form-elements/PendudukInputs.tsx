import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import DatePicker from "../date-picker";
import dayjs from "dayjs";
import { createPenduduk, updatePenduduk } from "../../../api/services/pendudukService";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function PendudukFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    alamat: initialData?.alamat || "",
    status: initialData?.status || "",
    nomor_kk: initialData?.nomor_kk || "",
    nomor_nik: initialData?.nomor_nik || "",
    nama: initialData?.nama || "",
    jenis_kelamin: initialData?.jenis_kelamin || "",
    tempat_lahir: initialData?.tempat_lahir || "",
    tgl_lahir: initialData?.tgl_lahir || "",
    umur: initialData?.umur || "",
    pekerjaan: initialData?.pekerjaan || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.alamat || !formData.status || !formData.nomor_kk || !formData.nomor_nik || !formData.nama || !formData.jenis_kelamin 
    || !formData.tempat_lahir || !formData.tgl_lahir || !formData.umur || !formData.pekerjaan ) {
    setErrorMessage("Harap isi semua field!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

const formattedData = {
  ...formData,
  tgl_lahir: dayjs(formData.tgl_lahir).format("YYYY-MM-DD"),
  umur: parseInt(formData.umur, 10),
};
console.log("Data dikirim ke server:", formattedData);
  try {
    if (isUpdate && initialData?.id) {
      const response = await updatePenduduk(initialData.id, formattedData);
      setSuccessMessage(response.message || "Penduduk berhasil diperbarui!");
    } else {
      const response = await createPenduduk(formattedData);
      setSuccessMessage(response.message || "Penduduk berhasil ditambahkan!");
      setFormData({
        alamat: "",
        status: "",
        nomor_kk: "",
        nomor_nik: "",
        nama: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tgl_lahir: "",
        umur: "",
        pekerjaan: "",
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error: any) {
    setErrorMessage(error?.message || "Terjadi kesalahan.");
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
          <Label htmlFor="alamat">Alamat</Label>
          <div className="relative">
            <Input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <div className="relative">
            <Input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="nomor_kk">Nomor KK</Label>
          <div className="relative">
            <Input
              type="text"
              id="nomor_kk"
              name="nomor_kk"
              value={formData.nomor_kk}
              onChange={handleChange}
              disabled={isDetail}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="nomor_nik">Nomor NIK</Label>
          <Input
            type="text"
            id="nomor_nik"
            name="nomor_nik"
            value={formData.nomor_nik}
            onChange={handleChange}
            disabled={isDetail}
          />
        </div>

        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            disabled={isDetail}
          />
        </div>

        <div>
            <Label>Jenis Kelamin<span className="text-error-500">*</span></Label>
            <select
                id="jenis_kelamin"
                name="jenis_kelamin"    
                value={formData.jenis_kelamin}
                onChange={handleSelectChange}
                disabled={isDetail} 
                className="w-full p-2 border rounded-md"
            >
                <option value="" disabled>Select jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
            </select>
        </div>

        <div>
          <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
          <Input
            type="text"
            id="tempat_lahir"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            disabled={isDetail}
          />
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Lahir"
            placeholder="Select a date"
            value={formData.tgl_lahir}
            onChange={(_, currentDateString) => {
              setFormData((prev) => ({
                ...prev,
                tgl_lahir: currentDateString,
              }));
            }}
            disabled={isDetail}
          />
        </div>

        <div>
          <Label htmlFor="umur">Umur</Label>
          <Input
            type="number"
            id="umur"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            disabled={isDetail}
          />
        </div>

        <div>
          <Label htmlFor="pekerjaan">Pekerjaan</Label>
          <Input
            type="text"
            id="pekerjaan"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleChange}
            disabled={isDetail}
          />
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
