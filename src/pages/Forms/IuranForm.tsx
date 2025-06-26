import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import IuranInputs from "../../components/form/form-elements/IuranInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function IuraForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Iuran" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <IuranInputs />
        </div>
      </div>
    </div>
  );
}
