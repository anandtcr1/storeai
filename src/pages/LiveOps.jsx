import React from 'react';
import { Row, Col, Card, Button, ListGroup, Badge, Table } from 'react-bootstrap';
import { KpiCard, PageHeader, Placeholder } from '../components/Common';

/**
 * Live Operations — DEFAULT LANDING SCREEN.
 *
 * Tech Spec §10 specifies this page exactly:
 *   "The default landing screen for store managers. Designed to be
 *    scannable in under 10 seconds. Live KPIs, real-time floor heat map,
 *    active alerts, and top zones by dwell."
 *
 * Sales pitch slide 5 confirms the four hero KPIs:
 *   87 in-store · 1,243 today · 78% conversion · 4.2m wait · 3 alerts
 *
 * Layout uses Bootstrap's 12-col grid:
 *   xs=12 (single column on phone)
 *   md=6  (pairs on tablet)
 *   xl=3  (4-up KPI row on desktop)
 */

// Heat-map cells — each represents a store zone with a density score 0-1.
// In production these come from the WebSocket stream documented in Tech
// Spec §4.3 ("Real-time ingest flow"). For wireframe we hardcode.
const ZONES = [
  { name: 'Produce',   density: 0.45 },
  { name: 'Bakery',    density: 0.35 },
  { name: 'Deli',      density: 0.30 },
  { name: 'Frozen',    density: 0.55 },
  { name: 'Storage',   density: 0.10 },
  { name: 'Pantry',    density: 0.20 },
  { name: 'Beverage',  density: 0.50 },
  { name: 'Snacks',    density: 0.85 }, // hot zone
  { name: 'Personal',  density: 0.40 },
  { name: 'Checkout',  density: 0.65 }
];

// Linearly interpolate between cool blue and warm red for heat density.
const heatColor = d => {
  const r = Math.round(255 * d);
  const b = Math.round(220 * (1 - d));
  return `rgba(${r}, ${100 + Math.round(50 * (1 - d))}, ${b}, 0.65)`;
};

// Active alerts — per Tech Spec §16 recommendation:
//   "Every alert needs an action. Don't show 'queue at lane 3' without a
//    button to call backup."
// So every alert row carries an explicit action button.
const ALERTS = [
  { type: 'queue', sev: 'high', text: 'Lane 3 queue at 9 customers',  action: 'Call backup' },
  { type: 'stock', sev: 'med',  text: 'Empty shelf · beverage B2',    action: 'Notify staff' },
  { type: 'crowd', sev: 'med',  text: 'Produce zone above capacity',  action: 'View zone' }
];

const TOP_ZONES = [
  { zone: 'Frozen aisle', dwell: '2:24' },
  { zone: 'Beverage',     dwell: '1:58' },
  { zone: 'Bakery',       dwell: '1:42' }
];

const LiveOps = () => {
  return (
    <>
      <PageHeader
        title="Live operations"
        subtitle="Monitor floor activity, alerts, and queue status in real time · Sunday, 3 May · 14:32 GST"
        actions={
          <>
            <Button variant="outline-secondary" size="sm">
              <i className="bi bi-download me-1" /> Export
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-broadcast me-1" /> Live mode
            </Button>
          </>
        }
      />

      {/* ---------------- KPI strip — sales pitch slide 5 -------------- */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="In store" value="87" icon="bi-people" trend={5} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Visitors today" value="1,243" icon="bi-door-open" trend={12} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Conversion" value="78" suffix="%" icon="bi-cart-check" trend={3} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Avg checkout wait" value="4.2" suffix="m" icon="bi-clock" trend={-8} />
        </Col>
      </Row>

      {/* ---------------- Floor heatmap + alerts column ---------------- */}
      <Row className="g-3">
        {/* Heatmap takes the wide column on desktop, full width on mobile */}
        <Col xs={12} lg={8}>
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>
                <strong>Floor heat map</strong>
                <span className="text-muted ms-2 small">last 60 minutes</span>
              </span>
              <div className="btn-group btn-group-sm" role="group">
                <Button variant="outline-secondary" size="sm">15m</Button>
                <Button variant="outline-secondary" size="sm" active>1h</Button>
                <Button variant="outline-secondary" size="sm">Today</Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Each cell is a polygon zone from Tech Spec §3.2.
                  In production this is a D3 + Canvas overlay on the
                  store's floor plan SVG. For wireframe we use a 5-col grid. */}
              <div className="ss-heat-grid">
                {ZONES.map(z => (
                  <div
                    key={z.name}
                    className="ss-heat-cell"
                    style={{ background: heatColor(z.density) }}
                    title={`${z.name} · density ${(z.density * 100).toFixed(0)}%`}
                  >
                    {z.name}
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center justify-content-end mt-3 small text-muted">
                <span className="me-2">Low</span>
                <div style={{
                  width: 120, height: 8, borderRadius: 4,
                  background: 'linear-gradient(to right, rgba(0,150,220,0.65), rgba(255,100,0,0.65))'
                }} />
                <span className="ms-2">High</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Alerts column — narrow on desktop, stacks below heatmap on mobile */}
        <Col xs={12} lg={4}>
          <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
              <strong>Active alerts</strong>
              <Badge bg="danger" pill>{ALERTS.length}</Badge>
            </Card.Header>
            <ListGroup variant="flush">
              {ALERTS.map((a, i) => (
                <ListGroup.Item key={i} className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <Badge
                        className={`me-2 ss-sev-${a.sev}`}
                        bg=""
                        text="dark"
                      >
                        {a.type}
                      </Badge>
                      <span className="small">{a.text}</span>
                    </div>
                  </div>
                  {/* Every alert ships with an action — Tech Spec §16 */}
                  <Button variant="outline-primary" size="sm" className="align-self-start">
                    {a.action}
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card>
            <Card.Header><strong>Top zones by dwell</strong></Card.Header>
            <Table size="sm" className="mb-0">
              <tbody>
                {TOP_ZONES.map(z => (
                  <tr key={z.zone}>
                    <td>{z.zone}</td>
                    <td className="text-end text-muted">{z.dwell}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LiveOps;
