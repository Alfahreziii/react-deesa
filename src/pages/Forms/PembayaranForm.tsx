import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PembayaranInputs from "../../components/form/form-elements/PembayaranInputs.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";

export default function PembayaranForm() {
  return (
    <div>
      <PageMeta
        title="Concept"
        description="Concept"
      />
      <PageBreadcrumb pageTitle="Form Pembayaran" />
      <div className="grid grid-cols-1">
        <div className="space-y-6">
          <PembayaranInputs />
        </div>
      </div>
    </div>
  );
}
