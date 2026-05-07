import React from "react";
import { Card, Badge } from "react-bootstrap";

/**
 * KpiCard — the four headline numbers shown on Live ops (and reused
 * elsewhere). Sales pitch slide 5 specifies the four metrics:
 *   87 in-store · 78% conversion · 4.2m wait · 3 alerts
 *
 * The component is generic so we can reuse it on Analytics, Workforce, etc.
 *
 * Trend prop is optional — when provided, shows colored delta
 * (Tech Spec §10 Zone Performance: "trend indicators").
 */
export const KpiCard = ({ label, value, suffix, trend, icon }) => {
  const trendNum = trend != null ? Number(trend) : null;
  const trendColor =
    trendNum == null
      ? "text-muted"
      : trendNum >= 0
        ? "text-success"
        : "text-danger";
  const trendIcon =
    trendNum == null
      ? ""
      : trendNum >= 0
        ? "bi-arrow-up-short"
        : "bi-arrow-down-short";

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="ss-kpi-label">{label}</div>
          {icon && <i className={`bi ${icon} text-muted`} />}
        </div>
        <div className="ss-kpi-value mt-2">
          {value}
          {suffix && (
            <span className="fs-5 fw-normal text-muted ms-1">{suffix}</span>
          )}
        </div>
        {trendNum != null && (
          <div className={`small mt-1 ${trendColor}`}>
            <i className={`bi ${trendIcon}`} />
            {Math.abs(trendNum)}% vs. yesterday
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

/**
 * PageHeader — title + subtitle + optional action button.
 * Establishes visual hierarchy at the top of every page.
 */
export const PageHeader = ({ title, subtitle, actions }) => (
  <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-2">
    <div>
      <h1 className="ss-section-title mb-1">{title}</h1>
      {subtitle && <div className="ss-section-sub mb-0">{subtitle}</div>}
    </div>
    {actions && <div className="d-flex gap-2">{actions}</div>}
  </div>
);

/**
 * Placeholder — a wireframe-style hatched box that signals
 * "a real chart / heatmap / video clip / map goes here".
 * Used liberally — this is a wireframe, not a finished UI.
 */
export const Placeholder = ({
  height = 200,
  label = "Visualization placeholder",
  icon,
}) => (
  <div className="ss-placeholder" style={{ minHeight: height }}>
    <div>
      {icon && <i className={`bi ${icon} d-block fs-3 mb-2`} />}
      {label}
    </div>
  </div>
);

export const AiBadge = ({ text = "AI" }) => (
  <Badge bg="info" pill className="text-dark small align-middle ms-1">
    {text}
  </Badge>
);
