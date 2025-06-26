import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import IuranTables from "../../components/tables/DataTableIuran";

export default function IuranTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Iurans" />
      <div className="space-y-6">
        <ComponentCard title="Iurans">
          <IuranTables />
        </ComponentCard>
      </div>
    </>
  );
}
