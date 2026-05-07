import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import LiveOps from "./pages/LiveOps.jsx";
import Analytics from "./pages/Analytics.jsx";
import Merchandising from "./pages/Merchandising.jsx";
import Workforce from "./pages/Workforce.jsx";
import ShelfOptimizer from "./pages/ShelfOptimizer.jsx";
import DemandForecast from "./pages/DemandForecast.jsx";
import DynamicPricing from "./pages/DynamicPricing.jsx";
import LossPrevention from "./pages/LossPrevention.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

/**
 * App — top-level layout shell.
 *
 * Structure (matches Tech Spec §10 "Application shell"):
 *   ┌──────────────────────────────────────┐
 *   │            Header                    │  sticky
 *   ├──────────┬───────────────────────────┤
 *   │ Sidebar  │     Main content          │
 *   │          │     (router outlet)       │
 *   └──────────┴───────────────────────────┘
 *   │            Footer                    │
 *   └──────────────────────────────────────┘
 *
 * The default route redirects to /live-ops because the spec calls Live ops
 *   "the default landing screen for store managers".
 *
 * Sidebar visibility is controlled by useState — on lg+ it's always visible
 *   as a desktop column; on smaller screens it's an Offcanvas drawer the
 *   header toggle button opens.
 */

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="ss-shell">
      <Header onToggleSidebar={() => setShowSidebar(true)} />

      <div className="ss-body">
        <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />

        <main className="ss-content">
          <Routes>
            {/* Default → Live ops */}
            <Route path="/" element={<Navigate to="/live-ops" replace />} />

            <Route path="/live-ops" element={<LiveOps />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/merchandising" element={<Merchandising />} />
            <Route path="/workforce" element={<Workforce />} />
            <Route path="/shelf-optimizer" element={<ShelfOptimizer />} />
            <Route path="/demand-forecast" element={<DemandForecast />} />
            <Route path="/dynamic-pricing" element={<DynamicPricing />} />
            <Route path="/loss-prevention" element={<LossPrevention />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            {/* Catch-all — bounce back to default */}
            <Route path="*" element={<Navigate to="/live-ops" replace />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
