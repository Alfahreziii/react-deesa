import { useEffect, useState } from "react";
import Select from "react-select";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Alert from "../../ui/alert/Alert";
import DatePicker from "../date-picker";
import dayjs from "dayjs";
import { fetchUsers } from "../../../api/services/userService";
import { getIuran, createPembayaran } from "../../../api/services/iuranService";

interface Props {
  initialData?: any;
  isUpdate?: boolean;
  isDetail?: boolean;
}

export default function PembayaranFormComponent({ initialData, isUpdate = false, isDetail = false }: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const [iurans, setIurans] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    user_id: initialData?.user_id || "",
    iuran_id: initialData?.iuran_id || "",
    paid_at: initialData?.paid_at || "",
    status: initialData?.status || "Lunas",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        const iuranData = await getIuran();
        setUsers(usersData);
        setIurans(iuranData);
      } catch (err) {
        setErrorMessage("Gagal memuat data user/iuran");
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selected: any, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selected?.value || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.user_id || !formData.iuran_id || !formData.paid_at) {
      setErrorMessage("Harap isi semua field");
      return;
    }

    const payload = {
      ...formData,
      user_id: parseInt(formData.user_id, 10),
      iuran_id: parseInt(formData.iuran_id, 10),
      paid_at: dayjs(formData.paid_at).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const res = await createPembayaran(payload);
      setSuccessMessage(res.message || "Pembayaran berhasil disimpan.");
      setErrorMessage("");
      setFormData({ user_id: "", iuran_id: "", paid_at: "", status: "Lunas" });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || "Terjadi kesalahan saat menyimpan pembayaran.";
      setErrorMessage(msg);
      setSuccessMessage("");
    }
  };

  return (
    <ComponentCard title={isUpdate ? "Edit Pembayaran" : "Input Pembayaran"}>
      {errorMessage && <Alert variant="error" title="Error" message={errorMessage} />}
      {successMessage && <Alert variant="success" title="Success" message={successMessage} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User */}
        <div>
          <Label htmlFor="user_id">Nama User</Label>
          <Select
            inputId="user_id"
            options={users.map((user) => ({
              value: user.id,
              label: `${user.name} (${user.email})`,
            }))}
            value={users
              .map((user) => ({
                value: user.id,
                label: `${user.name} (${user.email})`,
              }))
              .find((opt) => opt.value === Number(formData.user_id))}
            onChange={(selected) => handleSelectChange(selected, "user_id")}
            placeholder="Pilih user..."
            isClearable
            isDisabled={isDetail}
          />
        </div>

        {/* Iuran */}
        <div>
          <Label htmlFor="iuran_id">Iuran Bulan</Label>
          <Select
            inputId="iuran_id"
            options={iurans.map((iuran) => ({
              value: iuran.id,
              label: `${iuran.bulan} - Rp${parseInt(iuran.harga).toLocaleString()}`,
            }))}
            value={iurans
              .map((iuran) => ({
                value: iuran.id,
                label: `${iuran.bulan} - Rp${parseInt(iuran.harga).toLocaleString()}`,
              }))
              .find((opt) => opt.value === Number(formData.iuran_id))}
            onChange={(selected) => handleSelectChange(selected, "iuran_id")}
            placeholder="Pilih iuran..."
            isClearable
            isDisabled={isDetail}
          />
        </div>

        {/* Paid At */}
        <DatePicker
          id="paid_at"
          disabled={isDetail}
          label="Tanggal Bayar"
          placeholder="Pilih tanggal bayar"
          value={formData.paid_at}
          onChange={(_, dateStr) => {
            setFormData((prev) => ({ ...prev, paid_at: dateStr }));
          }}
        />

        {/* Tombol Submit */}
        {!isDetail && (
        <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
            {isUpdate ? "Perbarui Pembayaran" : "Simpan Pembayaran"}
        </button>
        )}
      </form>
    </ComponentCard>
  );
}
