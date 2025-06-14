import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SuratTables from "../../components/tables/DataTableSurat.tsx";
import JenisSuratTables from "../../components/tables/DataTableJenissurat.tsx";

export default function SuratTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Surat" />
      <div className="space-y-6">
        <ComponentCard title="Jenis Surat">
          <JenisSuratTables />
        </ComponentCard>
        <ComponentCard title="Surat">
          <SuratTables />
        </ComponentCard>
      </div>
    </>
  );
}