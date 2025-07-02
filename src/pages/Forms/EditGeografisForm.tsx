import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getGeografisById } from "../../api/services/geografisService";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GeografisFormComponent from "../../components/form/form-elements/GeografisInputs";

export default function EditGeografisPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGeografisById(Number(id));
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
      <PageBreadcrumb pageTitle="Form Geografis" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          {initialData && (
            <GeografisFormComponent initialData={initialData} isUpdate />
          )}
        </div>
      </div>
    </div>
  );
}