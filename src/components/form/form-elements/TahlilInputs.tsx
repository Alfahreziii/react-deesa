import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import { TimeIcon } from "../../../icons";
import DatePicker from "../date-picker";
import { createTahlil, updateTahlil } from "../../../api/services/tahlilService";
import { formatJam } from "../../../utils/dateFormatter";
import dayjs from "dayjs";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function TahlilFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    hari: initialData?.hari || "",
    judul: initialData?.judul || "",
    jam_mulai: initialData?.jam_mulai || "",
    jam_selesai: initialData?.jam_selesai || "",
    tempat: initialData?.tempat || "",
    ustadzah: initialData?.ustadzah || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.hari || !formData.jam_mulai || !formData.jam_selesai || !formData.tempat || !formData.ustadzah) {
    setErrorMessage("Harap isi semua field!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

const formattedData = {
  ...formData,
  hari: dayjs(formData.hari).format("YYYY-MM-DD"), // atau format lain yang kamu mau
  jam_mulai: formatJam(formData.jam_mulai),
  jam_selesai: formatJam(formData.jam_selesai),
};

  try {
    if (isUpdate && initialData?.id) {
      const response = await updateTahlil(initialData.id, formattedData);
      setSuccessMessage(response.message || "Tahlil berhasil diperbarui!");
    } else {
      const response = await createTahlil(formattedData);
      setSuccessMessage(response.message || "Tahlil berhasil ditambahkan!");
      setFormData({
        hari: "",
        judul: "",
        jam_mulai: "",
        jam_selesai: "",
        tempat: "",
        ustadzah: "",
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error: any) {
    setErrorMessage(error?.message || "Terjadi kesalahan.");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};


  return (
    <ComponentCard title={isUpdate ? "Edit Tahlil" : "Input Tahlil"}>
      {errorMessage && (
        <Alert variant="error" title="Error Message" message={errorMessage} />
      )}
      {successMessage && (
        <Alert variant="success" title="Success Message" message={successMessage} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="judul">Judul</Label>
          <Input
            type="text"
            id="judul"
            name="judul"
            disabled={isDetail}
            value={formData.judul}
            onChange={handleChange}
          />
        </div> 
        <div>
          <DatePicker
            id="date-picker"
            label="Hari"
            placeholder="Select a date"
            disabled={isDetail}
            value={formData.hari}
            onChange={(_, currentDateString) => {
              setFormData((prev) => ({
                ...prev,
                hari: currentDateString,
              }));
            }}
          />
        </div>

        <div>
          <Label htmlFor="jam_mulai">Jam Mulai</Label>
          <div className="relative">
            <Input
              type="time"
              id="jam_mulai"
              name="jam_mulai"
              disabled={isDetail}
              value={formData.jam_mulai}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="jam_selesai">Jam Selesai</Label>
          <div className="relative">
            <Input
              type="time"
              id="jam_selesai"
              name="jam_selesai"
              disabled={isDetail}
              value={formData.jam_selesai}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="tempat">Tempat</Label>
          <Input
            type="text"
            id="tempat"
            name="tempat"
            disabled={isDetail}
            value={formData.tempat}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="ustadzah">Ustadzah</Label>
          <Input
            type="text"
            id="ustadzah"
            name="ustadzah"
            disabled={isDetail}
            value={formData.ustadzah}
            onChange={handleChange}
          />
        </div>

        {!isDetail && (
        <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            {isUpdate ? "Perbarui Tahlil" : "Simpan Tahlil"}
        </button>
        )}
      </form>
    </ComponentCard>
  );
}
