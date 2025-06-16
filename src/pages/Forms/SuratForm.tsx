import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SuratInputs from "../../components/form/form-elements/SuratInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function TahlilForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Surat" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <SuratInputs />
        </div>
      </div>
    </div>
  );
}
