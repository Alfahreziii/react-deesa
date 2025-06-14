import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TahlilInputs from "../../components/form/form-elements/TahlilInputs";
import PageMeta from "../../components/common/PageMeta";

export default function TahlilForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Tahlil" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <TahlilInputs />
        </div>
      </div>
    </div>
  );
}
