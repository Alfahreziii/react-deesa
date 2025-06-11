import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PengajianTables from "../../components/tables/DataTablePengajian";

export default function PengajianTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Pengajian" />
      <div className="space-y-6">
        <ComponentCard title="Pengajian">
          <PengajianTables />
        </ComponentCard>
      </div>
    </>
  );
}
