import { useState,useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import { createGeografis, updateGeografis } from "../../../api/services/geografisService";
import DropzoneComponent from "./DropZone";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function GeografisFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    judul: initialData?.judul || "",
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

    if (!formData.judul || (!isUpdate && !fotoFile)) {
    setErrorMessage("Harap isi semua field!");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
    }


    const data = new FormData();
    data.append("judul", formData.judul);
    if (fotoFile) {
        data.append("foto", fotoFile);
    }

  try {
    if (isUpdate && initialData?.id) {
      const response = await updateGeografis(initialData.id, data);
      setSuccessMessage(response.message || "Geografis berhasil diperbarui!");
    } else {
      const response = await createGeografis(data);
      setSuccessMessage(response.message || "Geografis berhasil ditambahkan!");

      // Reset form
      setFormData({ judul: "", foto: "" });
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
    <ComponentCard title={isUpdate ? "Edit Geografis" : "Input Geografis"}>
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
            disabled={isDetail}
            value={formData.judul}
            onChange={handleChange}
          />
        </div>
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
            {isUpdate ? "Perbarui Geografis" : "Simpan Geografis"}
        </button>
        )}
      </form>
    </ComponentCard>
  );
}
