import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Form,
  Alert,
} from "react-bootstrap";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import { PageHeader, KpiCard, AiBadge } from "../components/Common";

/**
 * DemandForecast — SKU demand prediction page.
 * Reuses the book's Prophet/LSTM approach from Tech Spec §3.5,
 * but the target variable is SKU-level demand rather than staffing.
 */
const FORECAST = [
  { day: "Mon", history: 48, forecast: 52, upper: 62, lower: 43 },
  { day: "Tue", history: 54, forecast: 57, upper: 67, lower: 49 },
  { day: "Wed", history: 61, forecast: 64, upper: 74, lower: 55 },
  { day: "Thu", history: 59, forecast: 63, upper: 71, lower: 53 },
  { day: "Fri", history: 80, forecast: 95, upper: 112, lower: 78 },
  { day: "Sat", history: 92, forecast: 102, upper: 118, lower: 87 },
  { day: "Sun", history: 88, forecast: 98, upper: 113, lower: 82 },
];

const STOCKOUTS = [
  {
    sku: "GF Almond milk",
    category: "Beverage",
    when: "2 days",
    status: "Critical",
  },
  {
    sku: "Greek yogurt 170g",
    category: "Frozen",
    when: "4 days",
    status: "Warning",
  },
  {
    sku: "Organic bread",
    category: "Bakery",
    when: "6 days",
    status: "Critical",
  },
];

const categories = [
  "Bakery",
  "Beverage",
  "Frozen",
  "Personal care",
  "Household",
];
const horizons = ["7d", "14d", "30d"];

const DemandForecast = () => {
  const [category, setCategory] = useState("Bakery");
  const [horizon, setHorizon] = useState("7d");

  return (
    <>
      <PageHeader
        title="Demand Forecasting"
        subtitle="SKU-level demand prediction using POS data and vision-based engagement signals"
      />

      <Row className="g-3 mb-4">
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label={
              <>
                Forecast accuracy <AiBadge />
              </>
            }
            value="88"
            suffix="%"
            icon="bi-check2-circle"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard label="SKUs tracked" value="142" icon="bi-box-seam" />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="Predicted stockouts"
            value="3"
            icon="bi-exclamation-triangle"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label={
              <>
                Suggested reorder value <AiBadge />
              </>
            }
            value="AED 21.4k"
            icon="bi-bag-plus"
          />
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <strong>Forecast timeline</strong>
            <div className="small text-muted">
              Historical demand + AI forecast with upper/lower confidence
              bounds.
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Form.Select
              size="sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: 180 }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            {horizons.map((value) => (
              <Button
                key={value}
                size="sm"
                variant={horizon === value ? "primary" : "outline-secondary"}
                onClick={() => setHorizon(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={FORECAST}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="history" name="Historical demand" fill="#6c757d" />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#0d6efd"
                strokeWidth={3}
                name="Forecast"
              />
              <Line
                type="monotone"
                dataKey="upper"
                stroke="#0dcaf0"
                strokeWidth={1}
                dot={false}
                name="Upper bound"
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#0dcaf0"
                strokeWidth={1}
                dot={false}
                name="Lower bound"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      <Alert variant="info" className="mb-4">
        <strong>AI insight:</strong> Croissant demand up 40% on weekends —
        increase Friday bake by 25%.
      </Alert>

      <Card>
        <Card.Header>
          <strong>Predicted stockouts</strong>
          <div className="small text-muted">
            Flagged SKUs likely to run out soon with one-click reorder.
          </div>
        </Card.Header>
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>SKU</th>
                <th className="d-none d-md-table-cell">Category</th>
                <th>Runs out in</th>
                <th className="d-none d-md-table-cell">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {STOCKOUTS.map((item, index) => (
                <tr key={index}>
                  <td>{item.sku}</td>
                  <td className="d-none d-md-table-cell text-muted">
                    {item.category}
                  </td>
                  <td>{item.when}</td>
                  <td className="d-none d-md-table-cell">
                    <Badge
                      bg={item.status === "Critical" ? "danger" : "warning"}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button size="sm" variant="outline-primary">
                      Auto-create reorder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default DemandForecast;
