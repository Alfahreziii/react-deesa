import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPengajianById } from "../../api/services/pengajianService";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PengajianFormComponent from "../../components/form/form-elements/PengajianInputs";

export default function EditPengajianPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPengajianById(Number(id));
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
      <PageBreadcrumb pageTitle="Form Pengajian" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <PengajianFormComponent initialData={initialData} isUpdate />
          )}
        </div>
      </div>
    </div>
  );
}