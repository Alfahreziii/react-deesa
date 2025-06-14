import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RapatTables from "../../components/tables/DataTableRapat";

export default function RapatTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Rapat" />
      <div className="space-y-6">
        <ComponentCard title="Rapat">
          <RapatTables />
        </ComponentCard>
      </div>
    </>
  );
}