import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PendudukInputs from "../../components/form/form-elements/PendudukInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function PendudukForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Penduduk" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <PendudukInputs />
        </div>
      </div>
    </div>
  );
}
