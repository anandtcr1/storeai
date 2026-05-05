import React from 'react';
import { Row, Col, Card, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';
import { KpiCard, PageHeader } from '../components/Common';

/**
 * Analytics — second-tier menu group covering conversion funnel,
 * footfall trends, customer journeys, and demographics.
 *
 * For the wireframe we focus on the two highest-impact screens called out
 * in Tech Spec §10:
 *   - Conversion funnel (vision + POS join)
 *   - Footfall trends time-series
 *
 * The funnel numbers are taken verbatim from the Tech Spec wireframe on p.24:
 *   Entered store 8,742 → Visited >1 zone 8,043 → Dwell at shelf 6,207
 *   → Reached checkout 5,594 → Completed purchase 5,332
 */

const FUNNEL = [
  { label: 'Entered store',     count: 8742, pct: 100 },
  { label: 'Visited >1 zone',   count: 8043, pct: 92 },
  { label: 'Dwell at shelf',    count: 6207, pct: 71 },
  { label: 'Reached checkout',  count: 5594, pct: 64 },
  { label: 'Completed purchase',count: 5332, pct: 61 }
];

// Hourly traffic for the trend chart — shape mirrors what the
// Celery aggregator in Tech Spec §4.3 would return.
const HOURLY = [
  { hour: '8a',  visitors: 45,  conversion: 62 },
  { hour: '9a',  visitors: 78,  conversion: 65 },
  { hour: '10a', visitors: 120, conversion: 70 },
  { hour: '11a', visitors: 156, conversion: 72 },
  { hour: '12p', visitors: 198, conversion: 75 },
  { hour: '1p',  visitors: 184, conversion: 76 },
  { hour: '2p',  visitors: 142, conversion: 78 },
  { hour: '3p',  visitors: 168, conversion: 80 },
  { hour: '4p',  visitors: 215, conversion: 79 },
  { hour: '5p',  visitors: 248, conversion: 76 },
  { hour: '6p',  visitors: 232, conversion: 74 },
  { hour: '7p',  visitors: 180, conversion: 72 },
  { hour: '8p',  visitors: 120, conversion: 70 }
];

const Analytics = () => {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Conversion funnel, footfall trends, and customer journeys · last 7 days"
        actions={
          <Button variant="outline-secondary" size="sm">
            <i className="bi bi-share me-1" /> Share report
          </Button>
        }
      />

      {/* Summary KPIs above the fold */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Total visitors" value="8,742" icon="bi-people" trend={6} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Conversion rate" value="61" suffix="%" icon="bi-cart-check" trend={2} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Avg dwell time" value="3:42" icon="bi-clock-history" trend={-1} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Repeat zone visits" value="2.3" icon="bi-arrow-repeat" trend={0} />
        </Col>
      </Row>

      <Tabs defaultActiveKey="funnel" className="mb-3">
        {/* ---------------- Funnel tab ----------------------------- */}
        <Tab eventKey="funnel" title="Conversion funnel">
          <Card>
            <Card.Header>
              <strong>From store entry to completed purchase</strong>
              <span className="text-muted ms-2 small">last 7 days</span>
            </Card.Header>
            <Card.Body>
              {/* Custom CSS-grid funnel — bars scale by .pct.
                  Each row is a stage; user can drill down by clicking. */}
              {FUNNEL.map(stage => (
                <div key={stage.label} className="ss-funnel-row">
                  <div className="text-truncate" title={stage.label}>{stage.label}</div>
                  <div>
                    <div
                      className="ss-funnel-bar d-flex align-items-center justify-content-end px-2 text-white small"
                      style={{ width: `${stage.pct}%` }}
                    >
                      {stage.count.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-end small text-muted">{stage.pct}%</div>
                </div>
              ))}

              {/* Insight callouts — every drop-off should drive a decision.
                  Spec p.24: "Largest drop-off / Strongest stage" */}
              <Row className="g-3 mt-3">
                <Col md={6}>
                  <Alert variant="warning" className="mb-0">
                    <strong>Largest drop-off</strong>
                    <div className="small">
                      Zone visit → shelf dwell · 21% lost · 1,836 visitors browsed but didn't engage
                    </div>
                  </Alert>
                </Col>
                <Col md={6}>
                  <Alert variant="success" className="mb-0">
                    <strong>Strongest stage</strong>
                    <div className="small">
                      Checkout → purchase · 95% · cart abandonment is low at register
                    </div>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* ---------------- Trends tab ----------------------------- */}
        <Tab eventKey="trends" title="Footfall trends">
          <Card>
            <Card.Header>
              <strong>Hourly visitors and conversion</strong>
              <span className="text-muted ms-2 small">today</span>
            </Card.Header>
            <Card.Body>
              {/* Recharts is in the spec's stack (Tech Spec §5).
                  ResponsiveContainer makes it chart-responsive — width: '100%'. */}
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={HOURLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left" type="monotone" dataKey="visitors"
                    stroke="#0d6efd" strokeWidth={2} dot={false} name="Visitors"
                  />
                  <Line
                    yAxisId="right" type="monotone" dataKey="conversion"
                    stroke="#22c55e" strokeWidth={2} dot={false} name="Conversion %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Tab>

        {/* ---------------- Journeys tab — placeholder ---------------- */}
        <Tab eventKey="journeys" title="Customer journeys">
          <Card>
            <Card.Header><strong>Sankey of common paths</strong></Card.Header>
            <Card.Body>
              <div className="ss-placeholder" style={{ minHeight: 280 }}>
                <div>
                  <i className="bi bi-diagram-3 d-block fs-1 mb-2" />
                  Sankey diagram placeholder · entry → zone sequence → checkout
                </div>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

export default Analytics;
