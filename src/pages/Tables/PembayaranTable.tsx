import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PembayaranTables from "../../components/tables/DataTablePembayaran";

export default function IuranTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Pembayaran" />
      <div className="space-y-6">
        <ComponentCard title="Pembayaran">
          <PembayaranTables />
        </ComponentCard>
      </div>
    </>
  );
}
