import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AduanTables from "../../components/tables/DataTableAduan.tsx";

export default function BeritaTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Aduan" />
      <div className="space-y-6">
        <ComponentCard title="Aduan">
          <AduanTables />
        </ComponentCard>
      </div>
    </>
  );
}
