import { useState,useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import TextArea from "../input/TextArea";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import { createBerita, updateBerita } from "../../../api/services/beritaService";
import DropzoneComponent from "./DropZone";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
}

export default function PengajianFormComponent({ initialData, isUpdate = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    judul: initialData?.judul || "",
    deskripsi: initialData?.deskripsi || "",
    foto: initialData?.foto || "",
  });
    useEffect(() => {
    if (initialData?.deskripsi) {
        setMessage(initialData.deskripsi);
    }
    }, [initialData]);

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

    if (!formData.judul || !message || (!isUpdate && !fotoFile)) {
    setErrorMessage("Harap isi semua field!");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
    }


    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("deskripsi", message);
    if (fotoFile) {
        data.append("foto", fotoFile);
    }

  try {
    if (isUpdate && initialData?.id) {
      const response = await updateBerita(initialData.id, data);
      setSuccessMessage(response.message || "Pengajian berhasil diperbarui!");
    } else {
      const response = await createBerita(data);
      setSuccessMessage(response.message || "Pengajian berhasil ditambahkan!");

      // Reset form
      setFormData({ judul: "", deskripsi: "", foto: "" });
      setMessage("");
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
    <ComponentCard title={isUpdate ? "Edit Pengajian" : "Input Pengajian"}>
      {errorMessage && (
        <Alert variant="error" title="Error Message" message={errorMessage} />
      )}
      {successMessage && (
        <Alert variant="success" title="Success Message" message={successMessage} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="judul">judul</Label>
          <Input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
          />
        </div>

        {/* Default TextArea */}
        <div>
          <Label>Deskripsi</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
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
        <div>
            <DropzoneComponent 
                onFilesUploaded={(files) => {
                const file = files[0];
                setFotoFile(file);

                // Revoke URL lama sebelum buat yang baru
                if (fotoPreviewUrl) {
                    URL.revokeObjectURL(fotoPreviewUrl);
                }

                const previewUrl = URL.createObjectURL(file);
                setFotoPreviewUrl(previewUrl);
                }}

            />

    </div>

        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {isUpdate ? "Perbarui Pengajian" : "Simpan Pengajian"}
        </button>
      </form>
    </ComponentCard>
  );
}
