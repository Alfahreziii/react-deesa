import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BeritaTables from "../../components/tables/DataTableBerita";

export default function BeritaTable() {
  return (
    <>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Berita" />
      <div className="space-y-6">
        <ComponentCard title="Berita">
          <BeritaTables />
        </ComponentCard>
      </div>
    </>
  );
}
