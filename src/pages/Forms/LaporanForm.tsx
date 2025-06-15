import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import LaporanInputs from "../../components/form/form-elements/LaporanInputs.tsx";
import PageMeta from "../../components/common/PageMeta";

export default function TahlilForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Laporan" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <LaporanInputs />
        </div>
      </div>
    </div>
  );
}
