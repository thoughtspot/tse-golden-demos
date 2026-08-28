import demos from "../demos.json";
import Link from "next/link";

type Demo = {
  name: string;
  description: string;
  industry: string;
  url: string;
  "color-background": string;
  "color-text": string;
};

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Golden Demos home">
          <span className="brand-mark">TS</span>
          <span>Golden Demos</span>
        </Link>
        <span className="header-status">PMM / Prod org</span>
      </header>

      <main className="page-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">ThoughtSpot showcase</p>
          <h1 id="page-title">Choose a demo to explore.</h1>
          <p className="intro-copy">
            Select a tile below to open a guided experience. You must already be
            logged into PMM in the Prod org to access these demos.
          </p>
        </section>

        <section className="demo-grid" aria-label="Available demos">
          {[...(demos as Demo[])]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((demo, index) => (
              <a
                className="demo-tile"
                href={demo.url}
                key={demo.name}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  {
                    "--tile-background": demo["color-background"],
                    "--tile-text": demo["color-text"],
                    "--tile-delay": `${index * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="tile-topline">
                  <span className="tile-industry">{demo.industry}</span>
                  <span className="tile-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div>
                  <h2>{demo.name}</h2>
                  <p>{demo.description}</p>
                </div>
                <span className="tile-cta">Open demo</span>
              </a>
            ))}
        </section>
      </main>
    </div>
  );
}
