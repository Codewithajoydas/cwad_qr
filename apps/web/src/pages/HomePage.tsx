import { HealthCard } from "../components/HealthCard";

export function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">CWAD Fullstack Monorepo</p>
        <h1>Production-ready foundation without the dependency dump.</h1>
        <p className="description">
          React, Express, shared contracts, validation, workspace tooling, Docker, CI, testing,
          logging, security middleware, and clean application boundaries.
        </p>
        <HealthCard />
      </section>
    </main>
  );
}