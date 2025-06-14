  import React, { useEffect, useState } from "react";
  import { useModal } from "../../hooks/useModal";
  import { JenisSurat } from "../../api/types/jenissurat";
  import { Modal } from "../ui/modal";
  import { 
    getJenisSurat,
    deleteJenisSurat,
    createJenisSurat,
  } from "../../api/services/jenissuratService";
  import DataTable from "./ReusableTables/BasicTableOne";
  import {ColumnConfig } from "./ReusableTables/BasicTableOne";
  import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup"; // path sesuaikan dengan strukturmu

  import Alert from "../ui/alert/Alert";
  import Button from "../ui/button/Button";
  import Input from "../form/input/InputField";
  import Label from "../form/Label";

  const JenisSuratTable: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const [jenissurat, setJenisSurat] = useState<JenisSurat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getJenisSurat();
        setJenisSurat(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (id: number) => {
      const confirmed = await showConfirmAlert(
        "Yakin ingin menghapus?",
        "Tindakan ini tidak bisa dibatalkan!"
      );
    
      if (confirmed) {
        try {
          await deleteJenisSurat(id);
          showAlert("Berhasil", "Data berhasil dihapus", "success");
          fetchData(); // refresh data setelah delete
        } catch (error) {
          showAlert("Gagal", "Gagal menghapus data", "error");
        }
      }
    };
    
    const [form, setForm] = useState({
      nama_jenis: '',
    });
    const [message, setMessage] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
    
        try {
          await createJenisSurat(form);
          setMessage('Jenis Surat Ditambahkan!, Halaman akan diperbarui dalam 2 detik');

          setTimeout(() => {
            fetchData();
            closeModal();
            setForm({ nama_jenis: '' }); // Reset form setelah submit
            setMessage(''); // Optional: hapus pesan setelah refresh
          }, 2000);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Gagal Menambahkan Jenis Surat');
        } finally {
          setLoading(false);
        }
      };


  const columns: ColumnConfig<JenisSurat>[] = [
    {
      header: "Nama Jenis Surat",
      accessor: "nama_jenis",
    },
        {
          header: "Aksi",
          accessor: "id",
          render: (_value: any, row: JenisSurat) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(row.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Hapus
              </button>
            </div>
          ),
        },
  ];



    if (loading) return <p>Loading...</p>;
    return (
      <>
      <div>
        <DataTable<JenisSurat> 
          data={jenissurat} 
          columns={columns} 
          onCreate={openModal}
        />
      </div>      
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Create Jenis Surat
              </h4>
                {error && (
                <Alert
                  variant="error"
                  title="Error Message"
                  message={error}
                />
                )}
                {message && (
                <Alert
                  variant="success"
                  title="Succes"
                  message={message}
                />
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="custom-scrollbar px-2 pb-3">
                <div className="mt-7">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Nama Jenis</Label>
                      <Input type="text" name="nama_jenis" value={form.nama_jenis} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  };

  export default JenisSuratTable;
