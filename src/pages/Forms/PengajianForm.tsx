import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PengajianInputs from "../../components/form/form-elements/PengajianInputs";
import PageMeta from "../../components/common/PageMeta";

export default function PengajianForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Pengajian" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <PengajianInputs />
        </div>
      </div>
    </div>
  );
}
