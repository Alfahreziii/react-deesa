import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRapatById } from "../../api/services/rapatService.tsx";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import RapatFormComponent from "../../components/form/form-elements/RapatInputs.tsx";

export default function EditRapatPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRapatById(Number(id));
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
      <PageBreadcrumb pageTitle="Form Rapat" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <RapatFormComponent initialData={initialData} isUpdate />
          )}
        </div>
      </div>
    </div>
  );
}