import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PengurusTables from "../../components/tables/DataTablePengurus";
import JabatanTable from "../../components/tables/DataTableJabatan";

export default function PengurusTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Pengurus" />
      <div className="space-y-6">
        <ComponentCard title="Jabatan">
          <JabatanTable />
        </ComponentCard>
        <ComponentCard title="Pengurus">
          <PengurusTables />
        </ComponentCard>
      </div>
    </>
  );
}
