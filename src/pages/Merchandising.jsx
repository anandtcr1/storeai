import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Badge, Modal, Alert, Form } from 'react-bootstrap';
import { PageHeader, KpiCard, Placeholder } from '../components/Common';

/**
 * Merchandising — combines Zone Performance (Tech Spec §10 p.24)
 * and Out-of-Stock Log (Tech Spec §10 p.25). Both are merchandiser-
 * facing, so they live in the same menu group.
 *
 * Key UX decision: clicking a row opens a modal drill-down. The spec
 * notes "clickable rows open a zone-detail drill-down".
 */

const ZONES = [
  { zone: 'Frozen aisle',  visits: 2140, dwell: '2:24', engage: 88, conv: 62, trend: +8 },
  { zone: 'Beverage',      visits: 1847, dwell: '1:58', engage: 76, conv: 54, trend: +3 },
  { zone: 'Bakery',        visits: 1632, dwell: '1:42', engage: 82, conv: 68, trend: +1 },
  { zone: 'Personal care', visits: 1520, dwell: '2:48', engage: 56, conv: 31, trend: -12 },
  { zone: 'Snacks',        visits: 1289, dwell: '1:24', engage: 86, conv: 71, trend: +5 },
  { zone: 'Deli counter',  visits: 948,  dwell: '1:18', engage: 91, conv: 79, trend: +2 },
  { zone: 'Pantry aisle 2',visits: 724,  dwell: '0:48', engage: 42, conv: 38, trend: -6 }
];

const STOCKOUTS = [
  {
    severity: 'high', minutes: 42, location: 'Beverage aisle B2 · top shelf',
    note: 'High traffic · 14 customers approached · est. AED 680 lost'
  },
  {
    severity: 'med', minutes: 18, location: 'Bakery · fresh croissants',
    note: 'Recurring 2pm pattern — increase morning bake'
  },
  {
    severity: 'low', minutes: 6, location: 'Frozen · ice cream tub middle shelf',
    note: 'Low priority · low approach rate this hour'
  }
];

const Merchandising = () => {
  const [drilldown, setDrilldown] = useState(null);

  return (
    <>
      <PageHeader
        title="Merchandising"
        subtitle="Zone performance, shelf engagement, and out-of-stock alerts"
      />

      {/* Out-of-stock summary KPIs */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={4}>
          <KpiCard label="Active stockouts" value="3" icon="bi-exclamation-triangle" />
        </Col>
        <Col xs={12} sm={4}>
          <KpiCard label="Avg restock time" value="28" suffix="min" icon="bi-clock-history" trend={-15} />
        </Col>
        <Col xs={12} sm={4}>
          <KpiCard label="Lost sales today" value="AED 1,840" icon="bi-currency-exchange" />
        </Col>
      </Row>

      {/* Zone performance — merchandiser's main working screen */}
      <Card className="mb-4">
        <Card.Header className="d-flex flex-wrap gap-2 justify-content-between">
          <strong>Zone performance</strong>
          {/* Inline filter — sort + range, kept compact */}
          <div className="d-flex gap-2">
            <Form.Select size="sm" style={{ width: 140 }}>
              <option>Sort: Visits</option>
              <option>Sort: Conversion</option>
              <option>Sort: Dwell</option>
            </Form.Select>
            <Button variant="outline-secondary" size="sm">
              <i className="bi bi-funnel" />
            </Button>
          </div>
        </Card.Header>

        {/* responsive wrapper makes the table scroll horizontally on phones
            instead of breaking the layout */}
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Zone</th>
                <th className="text-end">Visits</th>
                <th className="text-end d-none d-sm-table-cell">Avg dwell</th>
                <th className="text-end d-none d-md-table-cell">Engage</th>
                <th className="text-end">Conv</th>
                <th className="text-end">Trend</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map(z => (
                <tr
                  key={z.zone}
                  role="button"
                  onClick={() => setDrilldown(z)}
                  className={z.conv < 40 ? 'table-warning' : ''}
                >
                  <td>{z.zone}</td>
                  <td className="text-end">{z.visits.toLocaleString()}</td>
                  <td className="text-end d-none d-sm-table-cell">{z.dwell}</td>
                  <td className="text-end d-none d-md-table-cell">{z.engage}%</td>
                  <td className={`text-end ${z.conv < 40 ? 'text-danger fw-bold' : ''}`}>
                    {z.conv}%
                  </td>
                  <td className={`text-end ${z.trend >= 0 ? 'text-success' : 'text-danger'}`}>
                    {z.trend >= 0 ? '+' : ''}{z.trend}%
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Card.Footer>
          {/* Auto-surfaced insight — Tech Spec §10 p.24 example */}
          <Alert variant="warning" className="mb-0 py-2 small">
            <strong>Personal care needs attention.</strong>{' '}
            High dwell (2:48) but low conversion (31%) — possible price, range, or layout issue.
          </Alert>
        </Card.Footer>
      </Card>

      {/* Out-of-stock log — operations-critical screen */}
      <Card>
        <Card.Header>
          <strong>Out-of-stock log</strong>
          <span className="text-muted ms-2 small">detected empty shelves and restock events</span>
        </Card.Header>
        <Card.Body>
          {STOCKOUTS.map((s, i) => (
            <Card
              key={i}
              className={`mb-2 border-start border-4 border-${
                s.severity === 'high' ? 'danger' : s.severity === 'med' ? 'warning' : 'info'
              }`}
            >
              <Card.Body className="py-2">
                <Row className="align-items-center g-2">
                  <Col xs={12} md={3}>
                    <Badge bg={s.severity === 'high' ? 'danger' : s.severity === 'med' ? 'warning' : 'info'}>
                      Active {s.minutes} min
                    </Badge>
                    <div className="fw-bold mt-1">{s.location}</div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="small text-muted">{s.note}</div>
                  </Col>
                  {/* Every alert needs an action — Tech Spec §16 */}
                  <Col xs={12} md={3} className="text-md-end">
                    <Button variant="primary" size="sm" className="me-1">
                      <i className="bi bi-bell me-1" />Notify staff
                    </Button>
                    <Button variant="outline-secondary" size="sm">Dismiss</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* Zone drill-down modal — opened on row click */}
      <Modal show={!!drilldown} onHide={() => setDrilldown(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{drilldown?.zone} · zone detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {drilldown && (
            <>
              <Row className="g-3 mb-3">
                <Col xs={6} md={3}><KpiCard label="Visits" value={drilldown.visits.toLocaleString()} /></Col>
                <Col xs={6} md={3}><KpiCard label="Dwell" value={drilldown.dwell} /></Col>
                <Col xs={6} md={3}><KpiCard label="Engage" value={`${drilldown.engage}%`} /></Col>
                <Col xs={6} md={3}><KpiCard label="Conv" value={`${drilldown.conv}%`} /></Col>
              </Row>
              <Placeholder height={220} label="Hourly trend chart for this zone" icon="bi-graph-up" />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDrilldown(null)}>Close</Button>
          <Button variant="primary">Schedule audit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Merchandising;
