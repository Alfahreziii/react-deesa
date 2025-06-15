import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PendudukTables from "../../components/tables/DataTablePenduduk";

export default function RapatTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Penduduk" />
      <div className="space-y-6">
        <ComponentCard title="Penduduk" className="">
          <PendudukTables />
        </ComponentCard>
      </div>
    </>
  );
}