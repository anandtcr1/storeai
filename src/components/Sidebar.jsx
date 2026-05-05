import React from 'react';
import { NavLink } from 'react-router-dom';
import { Offcanvas, Badge } from 'react-bootstrap';

/**
 * Sidebar navigation.
 *
 * Tech Spec §10 specifies SEVEN menu groups for the application:
 *   Live ops · Analytics · Merchandising · Workforce ·
 *   Loss prevention · Reports · Settings & admin
 *
 * Spec also calls out "role-based menu visibility". For the wireframe we
 * render all groups but visually separate Operations / Insights / Security /
 * Admin so role-trimming is obvious.
 *
 * On desktop (lg+) the sidebar is a fixed column.
 * On mobile/tablet it is an Offcanvas drawer triggered by the header toggle.
 */

// Menu definition lives outside the component so it isn't re-allocated on
// every render. Each item maps to a route.
const MENU = [
  {
    group: 'Operations',
    items: [
      { to: '/live-ops', icon: 'bi-broadcast',     label: 'Live ops',        badge: 3 },
      { to: '/analytics',icon: 'bi-graph-up',      label: 'Analytics' },
      { to: '/merchandising', icon: 'bi-grid-3x3-gap', label: 'Merchandising' },
      { to: '/workforce', icon: 'bi-people',       label: 'Workforce' }
    ]
  },
  {
    group: 'Security',
    items: [
      { to: '/loss-prevention', icon: 'bi-shield-exclamation', label: 'Loss prevention', badge: 2 }
    ]
  },
  {
    group: 'Insights',
    items: [
      { to: '/reports',  icon: 'bi-file-earmark-text', label: 'Reports' },
      { to: '/settings', icon: 'bi-gear',           label: 'Settings' }
    ]
  }
];

// Inner content reused by both the desktop column AND the mobile offcanvas.
const NavContent = ({ onNavigate }) => (
  <nav className="py-3">
    <div className="px-3 pb-3 border-bottom mb-2">
      <div className="fw-bold">SmartStore AI</div>
      <div className="small text-muted">Al Wahda branch</div>
    </div>
    {MENU.map(group => (
      <div key={group.group} className="mb-2">
        <div className="ss-nav-group-label">{group.group}</div>
        {group.items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `ss-nav-link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            <i className={`bi ${item.icon}`} />
            <span>{item.label}</span>
            {item.badge && <Badge bg="danger" pill>{item.badge}</Badge>}
          </NavLink>
        ))}
      </div>
    ))}
    <div className="px-3 pt-3 mt-3 border-top small text-muted">
      <div><i className="bi bi-info-circle me-1" /> v1.0 · pilot</div>
      <div className="mt-1">UAE PDPL compliant</div>
    </div>
  </nav>
);

const Sidebar = ({ show, onHide }) => {
  return (
    <>
      {/* Desktop: fixed column, always visible on lg+ */}
      <aside className="ss-sidebar ss-sidebar-desktop">
        <NavContent />
      </aside>

      {/* Mobile/tablet: slide-in offcanvas drawer */}
      <Offcanvas show={show} onHide={onHide} responsive="lg" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <NavContent onNavigate={onHide} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
