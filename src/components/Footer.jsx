import React from 'react';

/**
 * Footer — minimal, includes compliance attribution per Tech Spec §14
 * (UAE PDPL compliance must be visible to users) and quick-status links.
 */
const Footer = () => (
  <footer className="border-top bg-white py-2 px-3 small text-muted">
    <div className="d-flex flex-wrap justify-content-between gap-2">
      <div>
        © 2026 SmartStore AI · Hosted in AWS me-central-1 (UAE)
      </div>
      <div className="d-flex gap-3">
        <span><i className="bi bi-shield-check me-1" />PDPL compliant</span>
        <a href="#" className="text-muted text-decoration-none">Privacy</a>
        <a href="#" className="text-muted text-decoration-none">Docs</a>
        <a href="#" className="text-muted text-decoration-none">Status</a>
      </div>
    </div>
  </footer>
);

export default Footer;
