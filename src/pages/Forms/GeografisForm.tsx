import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GeografisInputs from "../../components/form/form-elements/GeografisInputs";
import PageMeta from "../../components/common/PageMeta";

export default function GeografisForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Geografis" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <GeografisInputs />
        </div>
      </div>
    </div>
  );
}
