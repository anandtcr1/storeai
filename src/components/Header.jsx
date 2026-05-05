import React from 'react';
import { Navbar, Container, Form, Button, Dropdown, Badge } from 'react-bootstrap';

/**
 * Header — sticky top bar present across every page.
 *
 * Maps directly to the Tech Spec §10 "Application shell" requirement:
 *   "Header carries the store selector, date range, search, notifications,
 *    and user avatar."
 *
 * On mobile we hide the search input and date range to keep the bar usable
 * on a tablet/phone (Tech Spec §16 — "Mobile-first dashboard").
 */
const Header = ({ onToggleSidebar }) => {
  return (
    <Navbar bg="white" className="ss-header px-3" expand={false}>
      <Container fluid className="g-0">
        {/* Mobile sidebar toggle — hidden on lg+ */}
        <Button
          variant="outline-secondary"
          size="sm"
          className="d-lg-none me-2"
          onClick={onToggleSidebar}
          aria-label="Open navigation"
        >
          <i className="bi bi-list" />
        </Button>

        {/* Store selector — required because the platform is multi-tenant /
            multi-store from day 1 (Tech Spec §16 recommendation) */}
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="light" size="sm" id="store-select">
            <i className="bi bi-shop me-1" />
            Al Wahda branch
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item active>Al Wahda branch</Dropdown.Item>
            <Dropdown.Item>Yas Mall branch</Dropdown.Item>
            <Dropdown.Item>Marina branch</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <i className="bi bi-grid me-1" /> All stores (chain view)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Date range — hidden on small screens */}
        <Dropdown className="me-2 d-none d-md-block">
          <Dropdown.Toggle variant="light" size="sm" id="date-range">
            <i className="bi bi-calendar3 me-1" /> Today
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item active>Today</Dropdown.Item>
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Custom…</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Search — hidden on small screens. Spec wants global search. */}
        <Form className="d-none d-lg-flex flex-grow-1 me-3" style={{ maxWidth: 360 }}>
          <Form.Control
            size="sm"
            type="search"
            placeholder="Search zones, alerts, transactions…"
            aria-label="Search"
          />
        </Form>

        {/* Right-aligned: notifications + user. ms-auto pushes them to the right. */}
        <div className="ms-auto d-flex align-items-center gap-2">
          {/* Live status indicator — surfaces edge-server health (Tech Spec §15) */}
          <span className="d-none d-md-inline small text-muted">
            <span className="ss-pill-dot" />
            12 cameras live
          </span>

          <Button variant="light" size="sm" className="position-relative" aria-label="Notifications">
            <i className="bi bi-bell" />
            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
              3
            </Badge>
          </Button>

          <Dropdown align="end">
            <Dropdown.Toggle variant="light" size="sm" id="user-menu">
              <i className="bi bi-person-circle me-1" />
              <span className="d-none d-sm-inline">Manager</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Signed in as</Dropdown.Header>
              <Dropdown.ItemText className="small">manager@alwahda.ae</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Help & docs</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
