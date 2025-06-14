import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TahlilTables from "../../components/tables/DataTableTahlil.tsx";

export default function PengajianTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Tahlil" />
      <div className="space-y-6">
        <ComponentCard title="Tahlil">
          <TahlilTables />
        </ComponentCard>
      </div>
    </>
  );
}
