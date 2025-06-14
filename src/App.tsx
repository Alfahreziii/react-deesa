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

import PengajianForm from "./pages/Forms/PengajianForm";
import EditPengajianForm from "./pages/Forms/EditPengajianForm";
import PengajianTable from "./pages/Tables/PengajianTable.tsx";

import TahlilForm from "./pages/Forms/TahlilForm.tsx";
import EditTahlilForm from "./pages/Forms/EditTahlilForm.tsx";
import TahlilTable from "./pages/Tables/TahlilTable";

import KerjabaktiForm from "./pages/Forms/KerjabaktiForm.tsx";
import EditKerjabaktiForm from "./pages/Forms/EditKerjabaktiForm.tsx";
import KerjabaktiTable from "./pages/Tables/KerjabaktiTable";

import RapatForm from "./pages/Forms/RapatForm";
import EditRapatForm from "./pages/Forms/EditRapatForm";
import RapatTable from "./pages/Tables/RapatTable";

import SuratTable from "./pages/Tables/SuratTable";

import AduanTable from "./pages/Tables/AduanTable.tsx";

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

              <Route path="/form-berita" element={<BeritaForm />} />
              <Route path="/berita-tables/edit-berita/:id" element={<EditBeritaForm />} />

              <Route path="/form-kerjabakti" element={<KerjabaktiForm />} />
              <Route path="/kerjabakti-tables/edit-kerjabakti/:id" element={<EditKerjabaktiForm />} />

              <Route path="/form-tahlil" element={<TahlilForm />} />
              <Route path="/tahlil-tables/edit-tahlil/:id" element={<EditTahlilForm />} />

              <Route path="/form-rapat" element={<RapatForm />} />
              <Route path="/rapat-tables/edit-rapat/:id" element={<EditRapatForm />} />

              {/* Tables */}
              <Route path="/berita-tables" element={<BeritaTable />} />
              <Route path="/pengajian-tables" element={<PengajianTable />} />
              <Route path="/aduan-tables" element={<AduanTable />} />
              <Route path="/kerjabakti-tables" element={<KerjabaktiTable />} />
              <Route path="/tahlil-tables" element={<TahlilTable />} />
              <Route path="/rapat-tables" element={<RapatTable />} />
              <Route path="/surat-tables" element={<SuratTable />} />

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
