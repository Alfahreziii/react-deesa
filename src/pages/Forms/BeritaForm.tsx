import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BeritaInputs from "../../components/form/form-elements/BeritaInputs";
import PageMeta from "../../components/common/PageMeta";

export default function PengajianForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Berita" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <BeritaInputs />
        </div>
      </div>
    </div>
  );
}
