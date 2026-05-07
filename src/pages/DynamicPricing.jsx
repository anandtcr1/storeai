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
import { PageHeader, KpiCard, AiBadge } from "../components/Common";

/**
 * DynamicPricing — AI-suggested pricing and ESL management.
 * Uses demand, inventory, competitor, and zone signals to recommend
 * price adjustments, with a guardrail UI for safe automation.
 * Privacy note: pricing decisions avoid individual customer identity
 * usage in line with PDPL §14.
 */
const SUGGESTIONS = [
  {
    product: "Sparkling water 500ml",
    current: "AED 3.50",
    suggested: "AED 4.00",
    delta: "+14%",
    reason: ["High demand", "Competitor +5%"],
    confidence: 91,
  },
  {
    product: "Organic granola",
    current: "AED 18.00",
    suggested: "AED 16.00",
    delta: "-11%",
    reason: ["Slow mover", "Prevent stockout"],
    confidence: 78,
  },
  {
    product: "Dark chocolate bar",
    current: "AED 8.50",
    suggested: "AED 9.20",
    delta: "+8%",
    reason: ["Low inventory", "Zone engagement"],
    confidence: 84,
  },
  {
    product: "Baby wipes pack",
    current: "AED 12.00",
    suggested: "AED 12.90",
    delta: "+8%",
    reason: ["High demand", "Competitor +2%"],
    confidence: 87,
  },
];

const AUDIT_LOG = [
  {
    time: "09:12",
    sku: "Milk 1L",
    from: "AED 5.00",
    to: "AED 5.40",
    trigger: "AI",
    impact: "AED 320",
  },
  {
    time: "10:05",
    sku: "Green tea",
    from: "AED 9.20",
    to: "AED 9.00",
    trigger: "Manager",
    impact: "AED -40",
  },
  {
    time: "11:20",
    sku: "Chips family",
    from: "AED 15.00",
    to: "AED 16.20",
    trigger: "Rule",
    impact: "AED 160",
  },
];

const DynamicPricing = () => {
  const [autoApply, setAutoApply] = useState(false);
  const [maxIncrease, setMaxIncrease] = useState(12);
  const [minMargin, setMinMargin] = useState(18);
  const [neverLower, setNeverLower] = useState(true);
  const [blackout, setBlackout] = useState(true);

  return (
    <>
      <PageHeader
        title="AI-Suggested Pricing & Digital Tags"
        subtitle="Price recommendations with ESL sync and automatic guardrails"
        actions={
          <Form.Check
            type="switch"
            id="auto-apply-mode"
            label={autoApply ? "Auto-apply enabled" : "Auto-apply off"}
            checked={autoApply}
            onChange={() => setAutoApply((prev) => !prev)}
          />
        }
      />

      {autoApply && (
        <Alert variant="warning" className="mb-4">
          <strong>Auto-apply mode is enabled.</strong> Approved suggestions push
          to ESL tags without further review.
        </Alert>
      )}

      <Row className="g-3 mb-4">
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label={
              <>
                Active price suggestions <AiBadge />
              </>
            }
            value="14"
            icon="bi-bolt"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="Projected margin lift"
            value="AED 18.2k"
            icon="bi-graph-up"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="ESLs connected"
            value="248 / 252"
            icon="bi-hdd-network"
          />
        </Col>
        <Col xs={12} md={6} xl={3}>
          <KpiCard
            label="Last sync time"
            value="2 min ago"
            icon="bi-clock-history"
          />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} xl={8}>
          <Card>
            <Card.Header>
              <strong>Pending suggestions</strong>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {SUGGESTIONS.map((item, index) => (
                  <Col xs={12} md={6} key={index}>
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="fw-semibold">{item.product}</div>
                            <div className="small text-muted">
                              Current {item.current}
                            </div>
                          </div>
                          <Badge
                            bg={
                              item.delta.startsWith("+") ? "success" : "danger"
                            }
                          >
                            {item.delta}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="fs-5 fw-bold">{item.suggested}</div>
                        </div>
                        <div className="mb-3">
                          {item.reason.map((reason) => (
                            <Badge
                              key={reason}
                              bg="secondary"
                              pill
                              className="me-1 mb-1"
                            >
                              {reason}
                            </Badge>
                          ))}
                        </div>
                        <div className="small text-muted mb-3">
                          Confidence: {item.confidence}%
                        </div>
                        <div className="d-flex gap-2 flex-wrap">
                          <Button size="sm" variant="success">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            Reject
                          </Button>
                          <Button size="sm" variant="outline-secondary">
                            Edit
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Card className="mb-3">
            <Card.Header>
              <strong>ESL fleet status</strong>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="ss-pill-dot" />
                <span className="fw-semibold">248 of 252 tags online</span>
              </div>
              <div className="small text-muted">
                Last sync 2 min ago · connection health stable
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <strong>Pricing rules</strong>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Max price increase</Form.Label>
                <Form.Range
                  value={maxIncrease}
                  min={0}
                  max={30}
                  onChange={(e) => setMaxIncrease(Number(e.target.value))}
                />
                <div className="small text-muted">
                  {maxIncrease}% max uplift
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Min margin</Form.Label>
                <Form.Range
                  value={minMargin}
                  min={5}
                  max={40}
                  onChange={(e) => setMinMargin(Number(e.target.value))}
                />
                <div className="small text-muted">
                  {minMargin}% minimum margin
                </div>
              </Form.Group>
              <Form.Check
                type="switch"
                id="never-lower-competitor"
                label="Never lower than competitor"
                checked={neverLower}
                onChange={() => setNeverLower((prev) => !prev)}
                className="mb-2"
              />
              <Form.Check
                type="switch"
                id="blackout-categories"
                label="Blackout categories enabled"
                checked={blackout}
                onChange={() => setBlackout((prev) => !prev)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <strong>Audit trail</strong>
        </Card.Header>
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Time</th>
                <th>SKU</th>
                <th className="d-none d-md-table-cell">Old → new price</th>
                <th>Trigger</th>
                <th>Revenue impact</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOG.map((entry, index) => (
                <tr key={index}>
                  <td className="font-monospace small">{entry.time}</td>
                  <td>{entry.sku}</td>
                  <td className="d-none d-md-table-cell">
                    {entry.from} → {entry.to}
                  </td>
                  <td>{entry.trigger}</td>
                  <td>{entry.impact}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      <div className="small text-muted mt-3">
        Pricing suggestions are generated without using individual customer
        identity data, consistent with PDPL §14 guardrails.
      </div>
    </>
  );
};

export default DynamicPricing;
