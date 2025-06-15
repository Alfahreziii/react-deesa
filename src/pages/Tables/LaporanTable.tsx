import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import LaporanTables from "../../components/tables/DataTableLaporan";

export default function RapatTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Laporan" />
      <div className="space-y-6">
        <ComponentCard title="Laporan" className="">
          <LaporanTables />
        </ComponentCard>
      </div>
    </>
  );
}