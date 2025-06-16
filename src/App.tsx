import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import BeritaForm from "./pages/Forms/BeritaForm"
import EditBeritaForm from "./pages/Forms/EditBeritaForm";
import BeritaTable from "./pages/Tables/BeritaTable";
import DetailBeritaForm from "./pages/Forms/DetailBeritaForm";

import PengajianForm from "./pages/Forms/PengajianForm";
import EditPengajianForm from "./pages/Forms/EditPengajianForm";
import PengajianTable from "./pages/Tables/PengajianTable.tsx";
import DetailPengajianForm from "./pages/Forms/DetailPengajianForm";

import TahlilForm from "./pages/Forms/TahlilForm.tsx";
import EditTahlilForm from "./pages/Forms/EditTahlilForm.tsx";
import TahlilTable from "./pages/Tables/TahlilTable";
import DetailTahlilForm from "./pages/Forms/DetailTahlilForm";

import KerjabaktiForm from "./pages/Forms/KerjabaktiForm.tsx";
import EditKerjabaktiForm from "./pages/Forms/EditKerjabaktiForm.tsx";
import KerjabaktiTable from "./pages/Tables/KerjabaktiTable";
import DetailKerjabaktiForm from "./pages/Forms/DetailKerjabaktiForm";

import RapatForm from "./pages/Forms/RapatForm";
import EditRapatForm from "./pages/Forms/EditRapatForm";
import RapatTable from "./pages/Tables/RapatTable";
import DetailRapatForm from "./pages/Forms/DetailRapatForm";

import PendudukForm from "./pages/Forms/PendudukForm";
import EditPendudukForm from "./pages/Forms/EditPendudukForm";
import DetailPendudukForm from "./pages/Forms/DetailPendudukForm";
import PendudukTable from "./pages/Tables/PendudukTable";

import LaporanTable from "./pages/Tables/LaporanTable";
import LaporanForm from "./pages/Forms/LaporanForm";
import EditLaporanForm from "./pages/Forms/EditLaporanForm";
import DetailLaporanForm from "./pages/Forms/DetailLaporanForm";

import PengurusTable from "./pages/Tables/PengurusTable";
import PengurusForm from "./pages/Forms/PengurusForm";
import EditPengurusForm from "./pages/Forms/EditPengurusForm";
import DetailPengurusForm from "./pages/Forms/DetailPengurusForm";

import SuratTable from "./pages/Tables/SuratTable";
import DetailSuratForm from "./pages/Forms/DetailSuratForm";

import AduanTable from "./pages/Tables/AduanTable.tsx";
// import DetailAduanForm from "./pages/Forms/DetailAduanForm";

import GuestRoute from "./routes/GuestRoute";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import Table from "./components/tables/DataTableBerita"
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              <Route path="/form-pengajian" element={<PengajianForm />} />
              <Route path="/pengajian-tables/edit-pengajian/:id" element={<EditPengajianForm />} />
              <Route path="/pengajian-tables/detail-pengajian/:id" element={<DetailPengajianForm />} />

              <Route path="/form-berita" element={<BeritaForm />} />
              <Route path="/berita-tables/edit-berita/:id" element={<EditBeritaForm />} />
              <Route path="/berita-tables/detail-berita/:id" element={<DetailBeritaForm />} />

              <Route path="/form-kerjabakti" element={<KerjabaktiForm />} />
              <Route path="/kerjabakti-tables/edit-kerjabakti/:id" element={<EditKerjabaktiForm />} />
              <Route path="/kerjabakti-tables/detail-kerjabakti/:id" element={<DetailKerjabaktiForm />} />

              <Route path="/form-tahlil" element={<TahlilForm />} />
              <Route path="/tahlil-tables/edit-tahlil/:id" element={<EditTahlilForm />} />
              <Route path="/tahlil-tables/detail-tahlil/:id" element={<DetailTahlilForm />} />

              <Route path="/form-rapat" element={<RapatForm />} />
              <Route path="/rapat-tables/edit-rapat/:id" element={<EditRapatForm />} />
              <Route path="/rapat-tables/detail-rapat/:id" element={<DetailRapatForm />} />

              <Route path="/form-penduduk" element={<PendudukForm />} />
              <Route path="/penduduk-tables/edit-penduduk/:id" element={<EditPendudukForm />} />
              <Route path="/penduduk-tables/detail-penduduk/:id" element={<DetailPendudukForm />} />

              <Route path="/form-laporan" element={<LaporanForm />} />
              <Route path="/laporan-tables/edit-laporan/:id" element={<EditLaporanForm />} />
              <Route path="/laporan-tables/detail-laporan/:id" element={<DetailLaporanForm />} />

              <Route path="/form-pengurus" element={<PengurusForm />} />
              <Route path="/pengurus-tables/edit-pengurus/:id" element={<EditPengurusForm />} />
              <Route path="/pengurus-tables/detail-pengurus/:id" element={<DetailPengurusForm />} />

              <Route path="/surat-tables/detail-surat/:id" element={<DetailSuratForm />} />

              {/* Tables */}
              <Route path="/berita-tables" element={<BeritaTable />} />
              <Route path="/pengajian-tables" element={<PengajianTable />} />
              <Route path="/aduan-tables" element={<AduanTable />} />
              <Route path="/kerjabakti-tables" element={<KerjabaktiTable />} />
              <Route path="/tahlil-tables" element={<TahlilTable />} />
              <Route path="/rapat-tables" element={<RapatTable />} />
              <Route path="/surat-tables" element={<SuratTable />} />
              <Route path="/penduduk-tables" element={<PendudukTable />} />
              <Route path="/laporan-tables" element={<LaporanTable />} />
              <Route path="/pengurus-tables" element={<PengurusTable />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route element={<GuestRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </>
  );
}
