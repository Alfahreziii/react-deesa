import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import KerjabaktiInputs from "../../components/form/form-elements/KerjabaktiInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function TahlilForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Kerja Bakti" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <KerjabaktiInputs />
        </div>
      </div>
    </div>
  );
}
