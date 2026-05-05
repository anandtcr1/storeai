import React from 'react';
import { Row, Col, Card, Button, Table, Badge, Form } from 'react-bootstrap';
import { PageHeader, Placeholder } from '../components/Common';

/**
 * Reports — Tech Spec §10 final section:
 *   "Reports — daily summary, custom builder, scheduled exports"
 * The page splits into three working areas:
 *   1. Recent reports list
 *   2. Custom report builder (preview)
 *   3. Scheduled reports config
 */

const RECENT = [
  { name: 'Daily summary · 02 May 2026',    type: 'Daily',    size: '1.2 MB', when: '06:00' },
  { name: 'Weekly executive · W18 2026',    type: 'Weekly',   size: '3.4 MB', when: 'Mon 07:00' },
  { name: 'Stockout incidents · Apr 2026',  type: 'Custom',   size: '0.8 MB', when: '01 May' },
  { name: 'Conversion funnel · Q1 2026',    type: 'Quarter',  size: '5.1 MB', when: '01 Apr' }
];

const SCHEDULED = [
  { name: 'Daily KPI digest', cadence: 'Daily 07:00', recipients: 'Manager', next: 'Tomorrow' },
  { name: 'LP weekly review', cadence: 'Mon 09:00',   recipients: 'LP team', next: '5 May' }
];

const Reports = () => {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Daily summary, custom builder, and scheduled exports"
        actions={
          <Button variant="primary" size="sm">
            <i className="bi bi-plus-lg me-1" />New report
          </Button>
        }
      />

      <Row className="g-3">
        {/* Recent reports — left/main column */}
        <Col xs={12} lg={8}>
          <Card className="mb-3">
            <Card.Header><strong>Recent reports</strong></Card.Header>
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Report</th>
                    <th className="d-none d-sm-table-cell">Type</th>
                    <th className="d-none d-md-table-cell">Generated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT.map(r => (
                    <tr key={r.name}>
                      <td>
                        <i className="bi bi-file-earmark-pdf me-2 text-danger" />
                        {r.name}
                      </td>
                      <td className="d-none d-sm-table-cell">
                        <Badge bg="light" text="dark">{r.type}</Badge>
                      </td>
                      <td className="d-none d-md-table-cell small text-muted">{r.when}</td>
                      <td className="text-end">
                        <Button variant="outline-secondary" size="sm" className="me-1">
                          <i className="bi bi-eye" />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="bi bi-download" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>

          <Card>
            <Card.Header><strong>Custom report builder</strong></Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Label className="small fw-bold">Date range</Form.Label>
                  <Form.Select size="sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Custom…</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="small fw-bold">Template</Form.Label>
                  <Form.Select size="sm">
                    <option>Executive summary</option>
                    <option>Merchandiser deep-dive</option>
                    <option>Loss prevention review</option>
                    <option>Workforce planning</option>
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <Form.Label className="small fw-bold">Include sections</Form.Label>
                  <div className="d-flex flex-wrap gap-3">
                    <Form.Check label="Footfall" defaultChecked />
                    <Form.Check label="Conversion" defaultChecked />
                    <Form.Check label="Heat maps" defaultChecked />
                    <Form.Check label="Stockouts" />
                    <Form.Check label="Incidents" />
                    <Form.Check label="Staffing" />
                  </div>
                </Col>
              </Row>
              <Placeholder
                height={120}
                label="Live report preview · would render server-side as you change settings"
                icon="bi-file-earmark-bar-graph"
              />
              <div className="mt-3 d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" size="sm">Save template</Button>
                <Button variant="primary" size="sm">Generate</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Scheduled — right column */}
        <Col xs={12} lg={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <strong>Scheduled</strong>
              <Button variant="link" size="sm" className="p-0">
                <i className="bi bi-plus-lg" />
              </Button>
            </Card.Header>
            <Card.Body>
              {SCHEDULED.map(s => (
                <div key={s.name} className="border-bottom pb-2 mb-2">
                  <div className="fw-bold">{s.name}</div>
                  <div className="small text-muted">
                    <i className="bi bi-clock me-1" />{s.cadence} · to {s.recipients}
                  </div>
                  <div className="small">Next: {s.next}</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Reports;
