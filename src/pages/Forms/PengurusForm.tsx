import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PengurusInputs from "../../components/form/form-elements/PengurusInputs";
import PageMeta from "../../components/common/PageMeta";

export default function PengurusForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Pengurus" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <PengurusInputs />
        </div>
      </div>
    </div>
  );
}
