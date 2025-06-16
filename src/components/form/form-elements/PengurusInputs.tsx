import { useState,useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import { createPengurus, updatePengurus } from "../../../api/services/pengurusService";
import DropzoneComponent from "./DropZone";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function PengurusFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
    nama: initialData?.nama || "",
    email: initialData?.email || "",
    alamat: initialData?.alamat || "",
    jabatan: initialData?.jabatan || "",
    no_hp: initialData?.no_hp || "",
    foto: initialData?.foto || "",
    });

    useEffect(() => {
    if (isUpdate && initialData?.foto && !fotoFile && !fotoPreviewUrl) {
        setFotoPreviewUrl(initialData.foto);
    }
    }, [isUpdate, initialData, fotoFile, fotoPreviewUrl]);


    useEffect(() => {
    return () => {
        if (fotoPreviewUrl) {
        URL.revokeObjectURL(fotoPreviewUrl);
        }
    };
    }, [fotoPreviewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

    if (!formData.nama || !formData.email || !formData.alamat || !formData.jabatan || !formData.no_hp || (!isUpdate && !fotoFile)) {
    setErrorMessage("Harap isi semua field!");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
    }


    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("email", formData.email);
    data.append("jabatan", formData.jabatan);
    data.append("alamat", formData.alamat);
    data.append("no_hp", formData.no_hp);

    if (fotoFile) {
        data.append("foto", fotoFile);
    }

  try {
    if (isUpdate && initialData?.id) {
      const response = await updatePengurus(initialData.id, data);
      setSuccessMessage(response.message || "Pengurus berhasil diperbarui!");
    } else {
      const response = await createPengurus(data);
      setSuccessMessage(response.message || "Pengurus berhasil ditambahkan!");

      // Reset form
      setFormData({ nama: "", email: "", foto: "", jabatan: "", no_hp: "", alamat: "" });
      setFotoFile(null);

      if (fotoPreviewUrl) {
        URL.revokeObjectURL(fotoPreviewUrl);
        setFotoPreviewUrl(null);
      }
    }

    setErrorMessage(""); // Kosongkan error message jika submit berhasil
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error: any) {
    setErrorMessage(error?.message || "Terjadi kesalahan.");
    setSuccessMessage(""); // Kosongkan pesan sukses agar tidak bertabrakan
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

  return (
    <ComponentCard title={isUpdate ? "Edit Pengurus" : "Input Pengurus"}>
      {errorMessage && (
        <Alert variant="error" title="Error Message" message={errorMessage} />
      )}
      {successMessage && (
        <Alert variant="success" title="Success Message" message={successMessage} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="nama">nama</Label>
          <Input
            type="text"
            id="nama"
            name="nama"
            disabled={isDetail}
            value={formData.nama}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email">email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            disabled={isDetail}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="jabatan">jabatan</Label>
          <Input
            type="text"
            id="jabatan"
            name="jabatan"
            disabled={isDetail}
            value={formData.jabatan}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="alamat">alamat</Label>
          <Input
            type="text"
            id="alamat"
            name="alamat"
            disabled={isDetail}
            value={formData.alamat}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="no_hp">no_hp</Label>
          <Input
            type="text"
            id="no_hp"
            name="no_hp"
            disabled={isDetail}
            value={formData.no_hp}
            onChange={handleChange}
          />
        </div>

            {fotoPreviewUrl && (
            <img
                src={fotoPreviewUrl.startsWith("blob:")
                ? fotoPreviewUrl
                : `${import.meta.env.VITE_API_URL}/file/${fotoPreviewUrl}`}
                alt="Preview"
                className="w-40 h-auto mt-2 rounded"
            />
            )}
{(fotoPreviewUrl || initialData?.foto) && (
  <img
    src={
      fotoPreviewUrl?.startsWith("blob:")
        ? fotoPreviewUrl
        : `${import.meta.env.VITE_API_URL}/file/${fotoPreviewUrl || initialData?.foto}`
    }
    alt="Preview"
    className="w-40 h-auto mt-2 rounded"
  />
)}

{!isDetail && (
  <div>
    <DropzoneComponent 
      onFilesUploaded={(files) => {
        const file = files[0];
        setFotoFile(file);

        if (fotoPreviewUrl) {
          URL.revokeObjectURL(fotoPreviewUrl);
        }

        const previewUrl = URL.createObjectURL(file);
        setFotoPreviewUrl(previewUrl);
      }}
    />
  </div>
)}

        {!isDetail && (
        <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            {isUpdate ? "Perbarui Pengurus" : "Simpan Pengurus"}
        </button>
        )}
      </form>
    </ComponentCard>
  );
}
