import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import RapatInputs from "../../components/form/form-elements/RapatInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function TahlilForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Rapat" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <RapatInputs />
        </div>
      </div>
    </div>
  );
}
