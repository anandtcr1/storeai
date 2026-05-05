import React, { useState } from 'react';
import { Row, Col, Card, Table, Badge, Form, Button, Modal } from 'react-bootstrap';
import { PageHeader, KpiCard, Placeholder } from '../components/Common';

/**
 * Loss Prevention — incident log per Tech Spec §10 p.28.
 * "All behavior anomalies, safety events, and security alerts.
 *  Filterable by severity, type, zone, and status. Each row links to
 *  incident detail with video evidence."
 *
 * Detail modal shows the linked frame clip (placeholder here — in
 * production this is served from MinIO/S3 per Tech Spec §5).
 */

const INCIDENTS = [
  { time: '14:18', sev: 'high', type: 'Concealment gesture',  zone: 'Personal care · aisle 7', status: 'Open' },
  { time: '14:02', sev: 'med',  type: 'SCO weight mismatch',  zone: 'Self-checkout 2',          status: 'Open' },
  { time: '13:47', sev: 'med',  type: 'Spill detected',       zone: 'Beverage aisle B2',        status: 'Resolved' },
  { time: '11:33', sev: 'low',  type: 'Repeated zone return', zone: 'Frozen aisle',             status: 'Reviewed' },
  { time: '10:15', sev: 'med',  type: 'Group coordination',   zone: 'Snacks aisle 4',           status: 'Resolved' },
  { time: '02:08', sev: 'high', type: 'After-hours motion',   zone: 'Backroom · receiving',     status: 'Resolved' }
];

const sevBadge = sev => {
  const cls = `ss-sev-${sev}`;
  return <Badge bg="" className={cls} text="dark" style={{ textTransform: 'capitalize' }}>{sev}</Badge>;
};

const statusBadge = status => {
  const map = { Open: 'danger', Resolved: 'success', Reviewed: 'secondary' };
  return <Badge bg={map[status] || 'secondary'}>{status}</Badge>;
};

const LossPrevention = () => {
  const [filter, setFilter] = useState('all');
  const [detail, setDetail] = useState(null);

  const filtered = filter === 'all' ? INCIDENTS : INCIDENTS.filter(i => i.sev === filter);

  return (
    <>
      <PageHeader
        title="Loss prevention"
        subtitle="Behavior anomalies, safety events, and security alerts"
        actions={
          <Button variant="outline-secondary" size="sm">
            <i className="bi bi-download me-1" />Export incidents
          </Button>
        }
      />

      <Row className="g-3 mb-4">
        <Col xs={6} md={3}><KpiCard label="Open incidents" value="2"  icon="bi-exclamation-octagon" /></Col>
        <Col xs={6} md={3}><KpiCard label="High severity" value="2"   icon="bi-shield-exclamation" /></Col>
        <Col xs={6} md={3}><KpiCard label="Avg resolve time" value="14" suffix="min" icon="bi-clock" /></Col>
        <Col xs={6} md={3}><KpiCard label="False positive rate" value="6" suffix="%" icon="bi-bug" trend={-2} /></Col>
      </Row>

      <Card>
        <Card.Header className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <strong>Incident log</strong>
          <div className="d-flex gap-2">
            {/* Filter chips: severity */}
            <Form.Select size="sm" value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 160 }}>
              <option value="all">All severity</option>
              <option value="high">High only</option>
              <option value="med">Medium only</option>
              <option value="low">Low only</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: 140 }}>
              <option>All zones</option>
              <option>Aisles</option>
              <option>Checkout</option>
              <option>Backroom</option>
            </Form.Select>
          </div>
        </Card.Header>
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Time</th>
                <th>Severity</th>
                <th>Type</th>
                <th className="d-none d-md-table-cell">Zone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc, i) => (
                <tr key={i}>
                  <td className="font-monospace small">{inc.time}</td>
                  <td>{sevBadge(inc.sev)}</td>
                  <td>{inc.type}</td>
                  <td className="d-none d-md-table-cell text-muted">{inc.zone}</td>
                  <td>{statusBadge(inc.status)}</td>
                  <td>
                    <Button size="sm" variant="outline-primary" onClick={() => setDetail(inc)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Incident detail modal — video evidence + actions */}
      <Modal show={!!detail} onHide={() => setDetail(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Incident · {detail?.type}
            <span className="ms-2">{detail && sevBadge(detail.sev)}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detail && (
            <>
              <Row className="mb-3 small">
                <Col xs={6}><strong>Time:</strong> {detail.time}</Col>
                <Col xs={6}><strong>Zone:</strong> {detail.zone}</Col>
              </Row>
              {/* Video clip placeholder — Tech Spec §3.7: "Each incident
                  triggers an alert with linked video clip retained for 30 days." */}
              <Placeholder
                height={280}
                label="30-second video clip · face-blurred per privacy policy"
                icon="bi-camera-video"
              />
              <div className="mt-3 small text-muted">
                <i className="bi bi-shield-check me-1" />
                Faces blurred · clip auto-deleted after 30 days (UAE PDPL §14)
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setDetail(null)}>Close</Button>
          <Button variant="warning">Mark reviewed</Button>
          <Button variant="danger">Confirm incident</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LossPrevention;
