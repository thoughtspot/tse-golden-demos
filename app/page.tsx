import demos from "../demos.json";
import Image from "next/image";
import Link from "next/link";
import DemoBrowser, { type Demo } from "./demo-browser";

const OTHER_INDUSTRY = "Other";

const CHECKLIST = [
  "Connected to Twingate VPN",
  "Logged into PMM in the Primary org",
];

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
        <div className="site-header-inner">
          <Link className="brand" href="/" aria-label="TSE Golden Demos home">
            <Image
              className="brand-mark"
              src="/ts.png"
              alt=""
              width={32}
              height={32}
              priority
            />
            <span>TSE Golden Demos</span>
          </Link>
          <span className="header-status">PMM / Primary org</span>
        </div>
      </header>

      <main className="page-content">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-text">
            <p className="eyebrow">ThoughtSpot showcase</p>
            <h1 id="page-title">Choose a demo to explore.</h1>
            <p className="intro-copy">
              Every tile has the live demo, a recorded walkthrough, and (soon)
              the talk track — so you can prep in minutes.
            </p>
          </div>
          <div className="info-cards">
            <aside className="info-card" aria-labelledby="checklist-title">
              <p className="info-card-title" id="checklist-title">
                Before you open a demo
              </p>
              {CHECKLIST.map((item) => (
                <div className="checklist-item" key={item}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </aside>
            <aside
              className="info-card info-card-login"
              aria-labelledby="login-title"
            >
              <p className="info-card-title" id="login-title">
                For demos with a login page
              </p>
              <dl className="login-fields">
                <dt>Email</dt>
                <dd>Your ThoughtSpot email</dd>
                <dt>Password</dt>
                <dd>Anything, password is not validated</dd>
              </dl>
            </aside>
          </div>
        </section>

        <DemoBrowser demos={orderedDemos} />
      </main>
    </div>
  );
}
