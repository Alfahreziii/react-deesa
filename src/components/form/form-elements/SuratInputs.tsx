import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function SuratFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {

  const [formData, setFormData] = useState({
    id_jenissurat: initialData?.id_jenissurat || "",
    atas_nama: initialData?.atas_nama || "",
    ditunjukan: initialData?.ditunjukan || "",
    keterangan: initialData?.keterangan || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    };


  return (
    <ComponentCard title={isUpdate ? "Edit Pengajian" : "Input Pengajian"}>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <Label htmlFor="id_jenissurat">Jenis Surat</Label>
          <div className="relative">
            <Input
              type="text"
              id="id_jenissurat"
              name="id_jenissurat"
              disabled={isDetail}
              value={formData.id_jenissurat}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="atas_nama">Atas Nama</Label>
          <div className="relative">
            <Input
              type="text"
              id="atas_nama"
              name="atas_nama"
              disabled={isDetail}
              value={formData.atas_nama}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="ditunjukan">Ditunjukan</Label>
          <div className="relative">
            <Input
              type="text"
              id="ditunjukan"
              name="ditunjukan"
              disabled={isDetail}
              value={formData.ditunjukan}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="keterangan">Keterangan</Label>
          <Input
            type="text"
            id="keterangan"
            disabled={isDetail}
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
          />
        </div>

        {!isDetail && (
        <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            {isUpdate ? "Perbarui Surat" : "Simpan Surat"}
        </button>
        )}
      </form>
    </ComponentCard>
  );
}
