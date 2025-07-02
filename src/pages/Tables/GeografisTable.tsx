import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import GeografisTables from "../../components/tables/DataTableGeografis";

export default function GeografisTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Geografis" />
      <div className="space-y-6">
        <ComponentCard title="Geografis">
          <GeografisTables />
        </ComponentCard>
      </div>
    </>
  );
}
