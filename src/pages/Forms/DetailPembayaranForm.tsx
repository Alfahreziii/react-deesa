import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPembayaranById } from "../../api/services/iuranService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PembayaranFormComponent from "../../components/form/form-elements/PembayaranInputs.tsx";

export default function DetailPembayaranPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPembayaranById(Number(id));
        setInitialData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
        <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Detail Pembayaran" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <PembayaranFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}