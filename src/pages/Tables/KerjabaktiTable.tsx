import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import KerjabaktiTables from "../../components/tables/DataTableKerjabakti.tsx";

export default function PengajianTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Kerja Bakti" />
      <div className="space-y-6">
        <ComponentCard title="Kerja Bakti">
          <KerjabaktiTables />
        </ComponentCard>
      </div>
    </>
  );
}
