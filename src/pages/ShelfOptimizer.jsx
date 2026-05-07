import React, { useState } from "react";
import { Row, Col, Card, Button, Badge, Table } from "react-bootstrap";
import {
  PageHeader,
  KpiCard,
  Placeholder,
  AiBadge,
} from "../components/Common";

/**
 * ShelfOptimizer — Smart Shelf Placement
 * Uses foot-fall analytics from zone tracking (Tech Spec §3.1, §3.2)
 * to recommend product moves that improve visibility and revenue.
 */
const RECOMMENDATIONS = [
  {
    product: "Lavender body wash",
    current: "Personal care",
    suggested: "Wellness endcap",
    reason: "High dwell zone, low current visibility",
    uplift: 14,
    dwell: "24s",
    visits: 720,
    category: "Personal care",
    status: "Pending",
  },
  {
    product: "Almond croissants",
    current: "Bakery",
    suggested: "Front shelf",
    reason: "Foot-fall spike in morning aisle",
    uplift: 18,
    dwell: "31s",
    visits: 1_080,
    category: "Bakery",
    status: "Pending",
  },
  {
    product: "Sparkling water",
    current: "Beverage",
    suggested: "Ambient drinks",
    reason: "Low velocity in aisle, high visibility endcap",
    uplift: 11,
    dwell: "18s",
    visits: 940,
    category: "Beverage",
    status: "Applied",
  },
];

const filterChips = [
  { label: "Bakery", variant: "outline-secondary" },
  { label: "Beverage", variant: "outline-secondary" },
  { label: "Personal care", variant: "outline-secondary" },
  { label: "High impact", variant: "outline-secondary" },
  { label: "Pending", variant: "outline-secondary" },
];

const ShelfOptimizer = () => {
  const [status, setStatus] = useState("all");

  const visibleRecommendations =
    status === "all"
      ? RECOMMENDATIONS
      : RECOMMENDATIONS.filter((rec) => rec.status.toLowerCase() === status);

  return (
    <>
      <PageHeader
        title="Smart Shelf Placement"
        subtitle="AI-driven shelf recommendations based on zone foot-fall and dwell metrics"
      />

      <Row className="g-3 mb-4">
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="Projected revenue lift"
            value="AED 42k"
            icon="bi-currency-dollar"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard label="Shelves analyzed" value="68" icon="bi-grid-3x3-gap" />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label={
              <>
                Recommendations pending <AiBadge />
              </>
            }
            value="8"
            icon="bi-hourglass-split"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="Recommendations applied"
            value="32"
            icon="bi-check2-circle"
          />
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <strong>Current vs suggested shelf layout</strong>
            <div className="small text-muted">
              Compare existing placement with AI-optimized zoning.
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {filterChips.map((chip) => (
              <Button key={chip.label} size="sm" variant={chip.variant}>
                {chip.label}
              </Button>
            ))}
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} md={6}>
              <Placeholder
                height={260}
                icon="bi-grid-3x3-gap"
                label="Current shelf layout placeholder"
              />
            </Col>
            <Col xs={12} md={6}>
              <Placeholder
                height={260}
                icon="bi-grid-3x3-gap"
                label="Suggested shelf layout placeholder"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <strong>Recommendations table</strong>
            <div className="small text-muted">
              Each suggestion is tied to dwell time and visit count for
              defensibility.
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={status === "all" ? "primary" : "outline-secondary"}
              onClick={() => setStatus("all")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={status === "pending" ? "primary" : "outline-secondary"}
              onClick={() => setStatus("pending")}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={status === "applied" ? "primary" : "outline-secondary"}
              onClick={() => setStatus("applied")}
            >
              Applied
            </Button>
          </div>
        </Card.Header>
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th className="d-none d-md-table-cell">Current zone</th>
                <th>Suggested zone</th>
                <th className="d-none d-md-table-cell">Reason</th>
                <th>Projected uplift</th>
                <th className="d-none d-md-table-cell">Foot-fall trigger</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleRecommendations.map((rec, index) => (
                <tr key={index}>
                  <td>
                    <div className="fw-semibold">{rec.product}</div>
                    <div className="small text-muted">{rec.category}</div>
                  </td>
                  <td className="d-none d-md-table-cell">{rec.current}</td>
                  <td>{rec.suggested}</td>
                  <td className="d-none d-md-table-cell">{rec.reason}</td>
                  <td>{rec.uplift}%</td>
                  <td className="d-none d-md-table-cell text-muted">
                    {rec.dwell} dwell · {rec.visits} visits
                  </td>
                  <td className="text-end">
                    <Button
                      size="sm"
                      variant="outline-success"
                      className="me-2"
                    >
                      Apply
                    </Button>
                    <Button size="sm" variant="outline-secondary">
                      Dismiss
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

export default ShelfOptimizer;
