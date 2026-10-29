"use client";

import { useState } from "react";

export type Demo = {
  name: string;
  description: string;
  industry: string;
  "filter-categories"?: string[];
  url: string;
  "video-url": string;
  // true adds a "Demo configuration" link to `url` + "/config".
  "has-config": boolean;
  // Optional. Add the key (even as "") to show a Script button; empty = "Soon".
  "script-url"?: string;
  "color-background": string;
  "color-text": string;
};

const OTHER_INDUSTRY = "Other";
const ALL = "All";

const categoriesOf = (demo: Demo) => demo["filter-categories"] ?? [];

type CardAction = { label: string; icon: "video" | "script"; href: string };

function cardActions(demo: Demo): CardAction[] {
  const actions: CardAction[] = [
    { label: "Walkthrough", icon: "video", href: demo["video-url"] },
  ];
  if (typeof demo["script-url"] === "string") {
    actions.push({ label: "Script", icon: "script", href: demo["script-url"] });
  }
  return actions;
}

function ActionIcon({ icon }: { icon: CardAction["icon"] }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon === "video" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
        </>
      ) : (
        <>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h4" />
        </>
      )}
    </svg>
  );
}

export default function DemoBrowser({ demos }: { demos: Demo[] }) {
  const [filter, setFilter] = useState(ALL);

  // Chips are every unique filter category across all demos, A-Z.
  const categories = [...new Set(demos.flatMap(categoriesOf))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  const shown = demos.filter(
    (d) => filter === ALL || categoriesOf(d).includes(filter),
  );

  return (
    <>
      <section className="filter-bar">
        <div className="filter-chips" role="group" aria-label="Filter by industry">
          {[ALL, ...categories].map((category) => {
            const count =
              category === ALL
                ? demos.length
                : demos.filter((d) => categoriesOf(d).includes(category))
                    .length;
            return (
              <button
                type="button"
                className="filter-chip"
                key={category}
                aria-pressed={category === filter}
                onClick={() => setFilter(category)}
              >
                {category}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>
        <span className="filter-summary" aria-live="polite">
          Showing {shown.length} of {demos.length} demos
        </span>
      </section>

      <section className="demo-grid" aria-label="Available demos">
        {shown.map((demo, index) => {
          const isOther = demo.industry === OTHER_INDUSTRY;
          const cardStyle = {
            "--tile-background": demo["color-background"],
            "--tile-text": demo["color-text"],
            "--tile-delay": `${index * 70}ms`,
          } as React.CSSProperties;

          return (
            <article className="demo-tile" key={demo.name} style={cardStyle}>
              <div className="tile-heading">
                <h2>{demo.industry}</h2>
                <p className="tile-name">
                  <span className="tile-dot" aria-hidden="true" />
                  {demo.name}
                </p>
              </div>
              {demo.description && (
                <p className="tile-description">{demo.description}</p>
              )}

              <div className="tile-actions">
                {isOther ? (
                  <span className="tile-soon-banner">Coming soon</span>
                ) : (
                  <>
                    <a
                      className="tile-primary"
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Open demo</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                    <div className="tile-secondary-row">
                      {cardActions(demo).map((action) =>
                        action.href ? (
                          <a
                            className="tile-secondary"
                            href={action.href}
                            key={action.label}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ActionIcon icon={action.icon} />
                            <span>{action.label}</span>
                          </a>
                        ) : (
                          <span
                            className="tile-secondary tile-secondary-disabled"
                            key={action.label}
                            aria-disabled="true"
                            title={`${action.label} coming soon`}
                          >
                            <ActionIcon icon={action.icon} />
                            <span>{action.label}</span>
                            <span className="tile-soon">Soon</span>
                          </span>
                        ),
                      )}
                    </div>
                    {demo["has-config"] && (
                      <a
                        className="tile-config"
                        href={`${demo.url.replace(/\/+$/, "")}/config`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Configure ${demo.name}`}
                        title="Open the demo's configuration page"
                      >
                        <span className="tile-config-label">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                          <span>Demo configuration</span>
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </a>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
