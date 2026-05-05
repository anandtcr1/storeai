import React from 'react';
import { Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line, ComposedChart, Legend
} from 'recharts';
import { PageHeader, KpiCard } from '../components/Common';

/**
 * Workforce — staffing recommendations.
 * Tech Spec §10 p.27: "Forecasted hourly traffic with overlaid current
 *   staffing line. Concrete recommendations with apply-to-schedule action."
 *
 * Tech Spec §3.5 implementation note: Prophet/LSTM forecasting model
 * trained on historical traffic, weather, holidays, promos.
 */

const FORECAST = [
  { hour: '8a',  forecast: 45,  staff: 4 },
  { hour: '9a',  forecast: 78,  staff: 4 },
  { hour: '10a', forecast: 95,  staff: 5 },
  { hour: '11a', forecast: 130, staff: 6 },
  { hour: '12p', forecast: 178, staff: 6 },
  { hour: '1p',  forecast: 165, staff: 6 },
  { hour: '2p',  forecast: 142, staff: 5 },
  { hour: '3p',  forecast: 168, staff: 5 },
  { hour: '4p',  forecast: 215, staff: 5 },
  { hour: '5p',  forecast: 248, staff: 5 }, // understaffed peak
  { hour: '6p',  forecast: 232, staff: 6 },
  { hour: '7p',  forecast: 180, staff: 6 },
  { hour: '8p',  forecast: 120, staff: 5 }
];

const RECS = [
  {
    type: 'Understaffed', variant: 'danger',
    window: '5pm–7pm · checkout',
    note: 'Forecast 240/hr · current 4 cashiers · recommend 6'
  },
  {
    type: 'Overstaffed', variant: 'warning',
    window: '10am–11am · all zones',
    note: 'Forecast 60/hr · current 8 staff · recommend 5'
  },
  {
    type: 'Action', variant: 'info',
    window: '2pm · bakery',
    note: 'Recurring stockout — assign restocker for 1:30pm pre-fill'
  }
];

const Workforce = () => {
  return (
    <>
      <PageHeader
        title="Workforce"
        subtitle="Forecasted traffic and suggested coverage for tomorrow"
        actions={
          <Button variant="primary" size="sm">
            <i className="bi bi-calendar-plus me-1" />Apply all to schedule
          </Button>
        }
      />

      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Forecast accuracy" value="91" suffix="%" icon="bi-bullseye" trend={2} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Tomorrow peak" value="248" suffix="visitors/hr" icon="bi-graph-up-arrow" />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Suggested staff" value="62" suffix="hrs" icon="bi-people" trend={-5} />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <KpiCard label="Est. payroll savings" value="AED 1,240" icon="bi-piggy-bank" />
        </Col>
      </Row>

      {/* Forecast chart — bars are forecast traffic, line is staff coverage */}
      <Card className="mb-4">
        <Card.Header>
          <strong>Forecasted traffic vs. scheduled staff</strong>
          <span className="text-muted ms-2 small">tomorrow · Sunday 4 May</span>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={FORECAST}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="forecast" fill="#0d6efd" name="Forecast visitors" />
              <Line yAxisId="right" type="monotone" dataKey="staff"
                    stroke="#22c55e" strokeWidth={3} dot name="Staff scheduled" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Recommendation cards — actionable items */}
      <Card>
        <Card.Header><strong>Recommendations</strong></Card.Header>
        <Table hover className="mb-0">
          <tbody>
            {RECS.map((r, i) => (
              <tr key={i}>
                <td style={{ width: 130 }}>
                  <Badge bg={r.variant}>{r.type}</Badge>
                </td>
                <td>
                  <div className="fw-bold">{r.window}</div>
                  <div className="small text-muted">{r.note}</div>
                </td>
                <td className="text-end" style={{ width: 140 }}>
                  <Button variant="outline-primary" size="sm">Apply</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default Workforce;
