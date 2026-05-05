import React from 'react';
import { Row, Col, Card, Tab, Nav, Table, Badge, Form, Button, Alert } from 'react-bootstrap';
import { PageHeader, Placeholder } from '../components/Common';

/**
 * Settings — Tech Spec §10:
 *   "Settings — cameras, zones, users, integrations, audit log"
 *
 * Plan tier section reflects the three pricing tiers from sales pitch
 * slide 10 (Essential / Professional / Enterprise).
 *
 * Vertical pills nav on the left for sub-sections — keeps related
 * config grouped without cluttering the main left sidebar.
 */

const CAMERAS = [
  { name: 'CAM-01 · Entry',         status: 'Live',     fps: 25, res: '4MP' },
  { name: 'CAM-02 · Aisle 1',       status: 'Live',     fps: 15, res: '4MP' },
  { name: 'CAM-03 · Aisle 2',       status: 'Live',     fps: 15, res: '4MP' },
  { name: 'CAM-04 · Frozen',        status: 'Live',     fps: 15, res: '4MP' },
  { name: 'CAM-05 · Bakery',        status: 'Degraded', fps: 8,  res: '2MP' },
  { name: 'CAM-06 · Checkout',      status: 'Live',     fps: 25, res: '4MP' },
  { name: 'CAM-07 · Self-checkout', status: 'Live',     fps: 25, res: '4MP' },
  { name: 'CAM-08 · Backroom',      status: 'Offline',  fps: 0,  res: '2MP' }
];

const Settings = () => {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Cameras, zones, integrations, users, and account"
      />

      {/* Tab.Container with vertical pill nav — works well on desktop and
          collapses to a horizontal scroll on mobile (Bootstrap default). */}
      <Tab.Container defaultActiveKey="cameras">
        <Row>
          <Col xs={12} md={3} className="mb-3">
            <Nav variant="pills" className="flex-md-column">
              <Nav.Item><Nav.Link eventKey="cameras"><i className="bi bi-camera-video me-2" />Cameras</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="zones"><i className="bi bi-geo-alt me-2" />Zones & floor plan</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="pos"><i className="bi bi-credit-card me-2" />POS integration</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="users"><i className="bi bi-people me-2" />Users & roles</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="privacy"><i className="bi bi-shield-lock me-2" />Privacy</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="plan"><i className="bi bi-stars me-2" />Plan</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="audit"><i className="bi bi-list-check me-2" />Audit log</Nav.Link></Nav.Item>
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            <Tab.Content>
              {/* Cameras tab */}
              <Tab.Pane eventKey="cameras">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <strong>Cameras · 8 total</strong>
                    <Button size="sm" variant="primary">
                      <i className="bi bi-plus-lg me-1" />Add camera
                    </Button>
                  </Card.Header>
                  <div className="table-responsive">
                    <Table hover className="mb-0 align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                          <th className="d-none d-sm-table-cell">FPS</th>
                          <th className="d-none d-sm-table-cell">Resolution</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {CAMERAS.map(c => (
                          <tr key={c.name}>
                            <td>{c.name}</td>
                            <td>
                              <Badge bg={
                                c.status === 'Live' ? 'success'
                                : c.status === 'Degraded' ? 'warning' : 'danger'
                              }>{c.status}</Badge>
                            </td>
                            <td className="d-none d-sm-table-cell">{c.fps}</td>
                            <td className="d-none d-sm-table-cell">{c.res}</td>
                            <td className="text-end">
                              <Button size="sm" variant="link">Configure</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card>
              </Tab.Pane>

              {/* Zones tab — would host the floor-plan editor */}
              <Tab.Pane eventKey="zones">
                <Card>
                  <Card.Header><strong>Floor plan zones</strong></Card.Header>
                  <Card.Body>
                    <Placeholder
                      height={320}
                      label="Floor plan editor · drag polygons to define zones"
                      icon="bi-bounding-box"
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* POS — Tech Spec §9 */}
              <Tab.Pane eventKey="pos">
                <Card>
                  <Card.Header><strong>POS integration</strong></Card.Header>
                  <Card.Body>
                    <Form>
                      <Row className="g-3">
                        <Col xs={12} md={6}>
                          <Form.Label className="small fw-bold">POS system</Form.Label>
                          <Form.Select size="sm">
                            <option>LS Retail (NAV/BC)</option>
                            <option>Microsoft Dynamics 365 Commerce</option>
                            <option>SAP Retail</option>
                            <option>Oracle Retail Xstore</option>
                            <option>Shopify POS</option>
                            <option>Custom / legacy</option>
                          </Form.Select>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label className="small fw-bold">Integration method</Form.Label>
                          <Form.Select size="sm">
                            <option>Webhook (recommended)</option>
                            <option>REST API poll</option>
                            <option>DB read replica</option>
                          </Form.Select>
                        </Col>
                        <Col xs={12}>
                          <Form.Label className="small fw-bold">Webhook URL</Form.Label>
                          <Form.Control
                            size="sm"
                            value="https://api.smartstore.ai/webhooks/pos/al-wahda"
                            readOnly
                          />
                        </Col>
                      </Row>
                      <Alert variant="success" className="mt-3 mb-0 py-2 small">
                        <i className="bi bi-check-circle me-1" />
                        Connected · last event 12 seconds ago · match rate 84%
                      </Alert>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Users */}
              <Tab.Pane eventKey="users">
                <Card>
                  <Card.Header><strong>Users & roles</strong></Card.Header>
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="table-light">
                        <tr><th>User</th><th>Role</th><th>Last seen</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Sara · manager@alwahda.ae</td><td><Badge bg="primary">Manager</Badge></td><td className="small text-muted">Just now</td></tr>
                        <tr><td>Ahmed · merch@alwahda.ae</td><td><Badge bg="info">Merchandiser</Badge></td><td className="small text-muted">2h ago</td></tr>
                        <tr><td>Fatima · lp@alwahda.ae</td><td><Badge bg="warning">Loss prevention</Badge></td><td className="small text-muted">Yesterday</td></tr>
                      </tbody>
                    </Table>
                  </div>
                </Card>
              </Tab.Pane>

              {/* Privacy — UAE PDPL controls (Tech Spec §14) */}
              <Tab.Pane eventKey="privacy">
                <Card>
                  <Card.Header><strong>Privacy & UAE PDPL</strong></Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Check type="switch" defaultChecked id="p1" label="Face blurring on stored frame clips" />
                      <Form.Check type="switch" defaultChecked id="p2" label="Auto-purge embeddings after 30 days" />
                      <Form.Check type="switch" defaultChecked id="p3" label="Show customer-facing signage notice" />
                      <Form.Check type="switch" id="p4" label="Allow joining vision tracks to loyalty IDs (off by default)" />
                      <hr />
                      <Form.Label className="small fw-bold">Frame clip retention (days)</Form.Label>
                      <Form.Range min={7} max={90} defaultValue={30} />
                      <Alert variant="info" className="small mb-0">
                        Spec recommends 30 days. Longer retention requires DPO sign-off.
                      </Alert>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Plan — pricing tiers from sales slide 10 */}
              <Tab.Pane eventKey="plan">
                <Row className="g-3">
                  {[
                    { name: 'Essential',    price: 'AED 3,500/mo',  cams: 'Up to 12',    feats: 'Foot traffic · heat maps · queue alerts', current: false },
                    { name: 'Professional', price: 'AED 6,500/mo',  cams: 'Up to 25',    feats: 'Funnel · stockouts · custom reports',   current: true },
                    { name: 'Enterprise',   price: 'AED 12,000/mo', cams: 'Unlimited',   feats: 'LP suite · multi-store · 4hr SLA',     current: false }
                  ].map(p => (
                    <Col md={4} key={p.name}>
                      <Card className={p.current ? 'border-primary border-2' : ''}>
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <strong>{p.name}</strong>
                            {p.current && <Badge bg="primary">Current</Badge>}
                          </div>
                          <div className="ss-kpi-value mt-2">{p.price.split('/')[0]}</div>
                          <div className="small text-muted">/{p.price.split('/')[1]}</div>
                          <div className="small mt-2">{p.cams}</div>
                          <div className="small text-muted">{p.feats}</div>
                          <Button
                            variant={p.current ? 'outline-secondary' : 'outline-primary'}
                            size="sm"
                            className="w-100 mt-3"
                            disabled={p.current}
                          >
                            {p.current ? 'Active' : 'Upgrade'}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>

              {/* Audit log */}
              <Tab.Pane eventKey="audit">
                <Card>
                  <Card.Header><strong>Audit log</strong></Card.Header>
                  <Card.Body className="small">
                    <div className="font-monospace">
                      <div>2026-05-03 14:32 · manager@alwahda · viewed incident #4821</div>
                      <div>2026-05-03 14:18 · system · alert raised — concealment gesture</div>
                      <div>2026-05-03 09:00 · system · daily report generated</div>
                      <div>2026-05-02 17:55 · merch@alwahda · exported zone report</div>
                      <div>2026-05-02 12:10 · admin · added user lp@alwahda.ae</div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Settings;
