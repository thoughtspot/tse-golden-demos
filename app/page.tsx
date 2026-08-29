import demos from "../demos.json";
import Image from "next/image";
import Link from "next/link";

type Demo = {
  name: string;
  description: string;
  industry: string;
  url: string;
  "color-background": string;
  "color-text": string;
};

const OTHER_INDUSTRY = "Other";

export default function Home() {
  const orderedDemos = [...(demos as Demo[])].sort((a, b) => {
    const aIsOther = a.industry === OTHER_INDUSTRY;
    const bIsOther = b.industry === OTHER_INDUSTRY;
    if (aIsOther !== bIsOther) {
      return aIsOther ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Golden Demos home">
          <Image
            className="brand-mark"
            src="/ts.png"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span>Golden Demos</span>
        </Link>
        <span className="header-status">PMM / Primary org</span>
      </header>

      <main className="page-content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">ThoughtSpot showcase</p>
          <h1 id="page-title">Choose a demo to explore.</h1>
          <p className="intro-copy">
            Select a tile below to open a guided experience. You must already be
            logged into PMM in the Primary org to access these demos.
          </p>
        </section>

        <section className="demo-grid" aria-label="Available demos">
          {orderedDemos.map((demo, index) => {
            const isOther = demo.industry === OTHER_INDUSTRY;
            const tileStyle = {
              "--tile-background": demo["color-background"],
              "--tile-text": demo["color-text"],
              "--tile-delay": `${index * 70}ms`,
            } as React.CSSProperties;
            const tileBody = (
              <>
                <div className="tile-topline">
                  <span className="tile-industry">{demo.industry}</span>
                  {!isOther && (
                    <span className="tile-arrow" aria-hidden="true">
                      ↗
                    </span>
                  )}
                </div>
                <div>
                  <h2>{demo.name}</h2>
                  <p>{demo.description}</p>
                </div>
                <span className="tile-cta">
                  {isOther ? "Coming soon" : "Open demo"}
                </span>
              </>
            );

            if (isOther) {
              return (
                <div
                  className="demo-tile demo-tile-static"
                  key={demo.name}
                  style={tileStyle}
                >
                  {tileBody}
                </div>
              );
            }

            return (
              <a
                className="demo-tile"
                href={demo.url}
                key={demo.name}
                target="_blank"
                rel="noopener noreferrer"
                style={tileStyle}
              >
                {tileBody}
              </a>
            );
          })}
        </section>
      </main>
    </div>
  );
}
