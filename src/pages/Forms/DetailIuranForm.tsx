import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getIuranById } from "../../api/services/iuranService.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import IuranFormComponent from "../../components/form/form-elements/IuranInputs.tsx";

export default function DetailIuranPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIuranById(Number(id));
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
      <PageBreadcrumb pageTitle="Detail Iuran" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <IuranFormComponent initialData={initialData} isDetail />
          )}
        </div>
      </div>
    </div>
  );
}