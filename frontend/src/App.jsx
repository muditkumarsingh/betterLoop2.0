import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import SummaryPage from "./pages/SummaryPage";
import RecoverySpacePage from "./pages/RecoverySpacePage";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="bg-[#EFE7E1]">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="summary" element={< SummaryPage />} />
          <Route path="recovery" element={<RecoverySpacePage />} />
        </Route>



        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;