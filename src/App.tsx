import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";
import HyacineDashboard from "@/pages/hyacine/Dashboard";
import HyacineWeight from "@/pages/hyacine/Weight";
import HyacineMeals from "@/pages/hyacine/Meals";
import HyacineExercise from "@/pages/hyacine/Exercise";
import HyacineMetrics from "@/pages/hyacine/Metrics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Hyacine */}
          <Route path="/hyacine" element={<HyacineDashboard />} />
          <Route path="/hyacine/weight" element={<HyacineWeight />} />
          <Route path="/hyacine/meals" element={<HyacineMeals />} />
          <Route path="/hyacine/exercise" element={<HyacineExercise />} />
          <Route path="/hyacine/metrics" element={<HyacineMetrics />} />
          {/* Other products */}
          <Route path="/:productId" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
