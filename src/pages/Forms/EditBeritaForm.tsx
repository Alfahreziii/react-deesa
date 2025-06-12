import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBeritaById } from "../../api/services/beritaService";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BeritaFormComponent from "../../components/form/form-elements/BeritaInputs";

export default function EditBeritaPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBeritaById(Number(id));
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
      <PageBreadcrumb pageTitle="Form Berita" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <BeritaFormComponent initialData={initialData} isUpdate />
          )}
        </div>
      </div>
    </div>
  );
}