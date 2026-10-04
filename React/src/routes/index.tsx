import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  professorProfile as P, metrics, researchAreas, ecosystem, impactFlow, agenda, publications,
  conferences, books, educationalPackages, projects, students, courses, coursesUrl, awards,
  academicProfiles, TBU, type PubType,
} from "@/data/profile";

const TITLE = "Dr. Gouri Ashok Gargate | IIT Kharagpur";
const DESC =
  "Academic and research profile of Dr. Gouri Ashok Gargate, Assistant Professor (Grade-I), Rajiv Gandhi School of Intellectual Property Law, Indian Institute of Technology Kharagpur.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Gouri Ashok Gargate, Gouri Gargate, IIT Kharagpur, Intellectual Property Law, IP Management, Technology Transfer, IP Valuation, IP Audit, Traditional Knowledge, Competition Law, Patent Pools, AI and Intellectual Property" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Gouri Ashok Gargate",
          honorificPrefix: "Dr.",
          jobTitle: "Assistant Professor (Grade-I)",
          email: "mailto:gouri@rgsoipl.iitkgp.ac.in",
          worksFor: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Kharagpur" },
          sameAs: academicProfiles.filter((p) => p.url).map((p) => p.url),
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = ["About", "Research", "Publications", "Projects", "Teaching", "Students", "Awards", "Contact"];

function Section({ id, eyebrow, title, subtitle, children, tone }: {
  id: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode; tone?: "muted";
}) {
  return (
    <section id={id} className={`border-t border-border py-20 md:py-28 ${tone === "muted" ? "bg-secondary" : ""}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-4 md:grid-cols-[200px_1fr]">
          <p className="eyebrow pt-2">{eyebrow}</p>
          <div>
            <h2 className="text-3xl font-normal text-primary md:text-[2.6rem] md:leading-tight">{title}</h2>
            {subtitle && <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-xl text-primary">{P.shortName}</a>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{n}</a>
          ))}
          <CvButton />
        </nav>
        <button className="lg:hidden text-sm text-primary" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mnav" aria-label="Mobile" className="border-t border-border bg-background px-6 py-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n} onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block py-2 text-primary">{n}</a>
          ))}
          <div className="pt-3"><CvButton /></div>
        </nav>
      )}
    </header>
  );
}

function CvButton() {
  const base = "inline-flex items-center rounded-sm border border-primary px-4 py-2 text-sm font-medium transition-colors";
  return P.cvUrl ? (
    <a href={P.cvUrl} className={`${base} bg-primary text-primary-foreground hover:bg-primary/90`} download>Download CV</a>
  ) : (
    <span aria-disabled="true" title="CV to be updated" className={`${base} cursor-not-allowed text-primary opacity-60`}>Download CV</span>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-pattern absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:py-28">
        <div>
          <p className="eyebrow mb-6">{P.institute}</p>
          <h1 className="text-5xl font-normal leading-[1.05] text-primary md:text-7xl">{P.name}</h1>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-6 text-lg font-medium text-foreground">{P.title}</p>
          <p className="text-muted-foreground">{P.school}<br />{P.institute}</p>
          <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-foreground/85">{P.tagline}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#research" className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Explore Research</a>
            <a href="#publications" className="rounded-sm border border-primary px-5 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground">View Publications</a>
            <a href="#contact" className="text-sm text-accent underline-offset-4 hover:underline">Get in Touch →</a>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-sm">
          {P.portraitUrl ? (
            <img src={P.portraitUrl} alt={`Portrait of ${P.name}`} className="aspect-[4/5] w-full rounded-sm object-cover shadow-soft" loading="lazy" />
          ) : (
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-sm border border-dashed border-border bg-card shadow-soft">
              <span className="font-serif text-6xl text-primary/30">GAG</span>
              <span className="mt-4 eyebrow">Portrait — to be added</span>
            </div>
          )}
          <figcaption className="mt-3 text-xs text-muted-foreground">RGSOIPL · IIT Kharagpur</figcaption>
        </figure>
      </div>
      <div className="relative border-t border-border bg-card/70">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 md:grid-cols-5">
          {metrics.map((m) => (
            <div key={m.label} className="py-6">
              <dt className="text-xs text-muted-foreground">{m.label}</dt>
              <dd className="font-serif text-2xl text-primary">{m.value}</dd>
              <dd className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/80">Source: {m.source}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ImpactFlow({ steps, label }: { steps: string[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setVisible(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ol ref={ref} aria-label={label} className={`flex flex-wrap items-center gap-y-4 ${visible ? "flow-visible" : ""}`}>
      {steps.map((s, i) => (
        <li key={s} className="flow-step flex items-center" style={{ animationDelay: `${i * 140}ms` }}>
          <span className="rounded-sm border border-border bg-card px-4 py-2 font-serif text-lg text-primary shadow-soft">{s}</span>
          {i < steps.length - 1 && <span aria-hidden className="mx-3 text-gold">⟶</span>}
        </li>
      ))}
    </ol>
  );
}

const FILTERS: ("All" | PubType)[] = ["All", "Journal", "Conference", "Book", "Edited Volume", "Educational Package", "Patent", "Workshop", "Other"];

function Publications() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.toLowerCase();
    return publications
      .filter((p) => filter === "All" || p.type === filter)
      .filter((p) => !t || [p.title, p.authors, p.venue].join(" ").toLowerCase().includes(t))
      .sort((a, b) => b.year - a.year);
  }, [filter, q]);
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Publication type">
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
              className={`rounded-sm border px-3 py-1.5 text-xs transition-colors ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, author, venue…" aria-label="Search publications"
          className="w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-accent md:w-72" />
      </div>
      <ol className="divide-y divide-border border-y border-border">
        {list.map((p) => (
          <li key={p.title} className="grid gap-2 py-6 md:grid-cols-[80px_1fr_auto]">
            <span className="font-mono text-sm text-muted-foreground">{p.year}</span>
            <div>
              <h3 className="font-serif text-xl leading-snug text-primary">{p.title}</h3>
              {p.authors && <p className="mt-1 text-sm text-muted-foreground">{p.authors}</p>}
              {p.venue && (
                <p className="mt-1 text-sm italic text-foreground/80">
                  {p.venue}{p.volume && `, ${p.volume}`}{p.pages && `, ${p.pages}`}
                </p>
              )}
              {p.doi && <a className="mt-1 inline-block font-mono text-xs text-accent hover:underline" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI: {p.doi}</a>}
            </div>
            <span className="eyebrow self-start text-gold">{p.type}</span>
          </li>
        ))}
        {list.length === 0 && <li className="py-10 text-center text-muted-foreground">No publications match. More entries will be added.</li>}
      </ol>
    </>
  );
}

function Index() {
  const [showAllConf, setShowAllConf] = useState(false);
  const confs = showAllConf ? conferences : conferences.slice(0, 6);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        <Section id="about" eyebrow="01 — About" title={`About ${P.name}`}>
          <div className="grid gap-12 md:grid-cols-[200px_1fr]">
            <div />
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
                {P.bio.map((b, i) => <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-primary" : ""}>{b}</p>)}
                <div className="mt-8 rounded-sm border border-border bg-card p-6">
                  <p className="eyebrow mb-3">Methodology — predominantly qualitative</p>
                  <p className="font-serif text-xl text-primary">{P.methodology.join(" + ")}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl text-primary">Across the innovation lifecycle</h3>
                  <ul className="flex flex-wrap gap-2">{P.lifecycle.map((x) => <li key={x} className="rounded-sm border border-border px-2.5 py-1 text-sm">{x}</li>)}</ul>
                </div>
                <div>
                  <h3 className="mb-3 text-xl text-primary">Further research themes</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">{P.themes.map((x) => <li key={x}><span className="mr-2 text-gold">§</span>{x}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="research" tone="muted" eyebrow="02 — Research" title="Research & Intellectual Contributions" subtitle="Exploring how intellectual property can enable innovation, competitiveness and responsible societal development.">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {researchAreas.map((r, i) => (
              <article key={r.title} className="bg-card p-6 transition-colors hover:bg-background">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg leading-snug text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-16">
            <p className="eyebrow mb-5">Research ecosystem</p>
            <ImpactFlow steps={ecosystem} label="Research ecosystem" />
          </div>
        </Section>

        <section className="border-t border-border bg-ink py-20 text-ink-foreground">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow mb-4 text-gold">Research impact</p>
            <h2 className="mb-10 text-3xl font-normal md:text-4xl">From inquiry to societal value</h2>
            <ol className="grid gap-6 md:grid-cols-6">
              {impactFlow.map((s, i) => (
                <li key={s} className="border-t border-gold/60 pt-4">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-serif text-xl">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Section id="agenda" eyebrow="03 — Agenda" title="Current & Emerging Research Agenda">
          <ul className="grid gap-x-10 md:grid-cols-2">
            {agenda.map((a, i) => (
              <li key={a} className="flex items-baseline gap-5 border-b border-border py-5">
                <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl text-primary">{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="publications" tone="muted" eyebrow="04 — Publications" title="Selected Publications">
          <Publications />
          <a href={academicProfiles[0]?.url ?? "#"} target="_blank" rel="noreferrer" className="mt-8 inline-block text-sm text-accent hover:underline">Google Scholar Profile →</a>
        </Section>

        <Section id="conferences" eyebrow="05 — Conferences" title="Conference Contributions">
          <ol className="relative border-l border-border pl-8">
            {confs.map((c) => (
              <li key={c.title} className="relative pb-7">
                <span className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <p className="font-mono text-xs text-muted-foreground">{c.year}{c.venue ? ` · ${c.venue}` : ""}</p>
                <p className="mt-1 font-serif text-lg text-primary">{c.title}</p>
              </li>
            ))}
          </ol>
          <button onClick={() => setShowAllConf(!showAllConf)} className="text-sm text-accent hover:underline" aria-expanded={showAllConf}>
            {showAllConf ? "Show fewer" : `Show all ${conferences.length} contributions`}
          </button>
        </Section>

        <Section id="books" tone="muted" eyebrow="06 — Books" title="Books, Educational Resources & Academic Contributions">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl text-primary">Books</h3>
              <ul className="space-y-4">{books.map((b) => <li key={b.title}><p className="font-serif text-lg italic">{b.title}</p><p className="font-mono text-xs text-muted-foreground">{b.year}</p></li>)}</ul>
              <h3 className="mb-4 mt-10 text-xl text-primary">Patent</h3>
              <p className="font-serif text-lg">IP System <span className="font-mono text-xs text-muted-foreground">· 2024</span></p>
            </div>
            <div className="md:col-span-2">
              <h3 className="mb-4 text-xl text-primary">Educational packages</h3>
              <ul className="divide-y divide-border border-y border-border">
                {educationalPackages.map((e) => (
                  <li key={e.title} className="flex justify-between gap-6 py-3"><span>{e.title}</span><span className="font-mono text-sm text-muted-foreground">{e.year}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="projects" eyebrow="07 — Projects" title="Research Projects & Grants">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <p className="eyebrow mb-4">Principal Investigator · Completed</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {projects.pi.map((p) => <li key={p} className="rounded-sm border border-border bg-card p-5 text-sm leading-relaxed shadow-soft">{p}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Co-Principal Investigator</p>
              {projects.coPi.map((p) => <p key={p} className="rounded-sm border border-gold/50 bg-card p-5 text-sm shadow-soft">{p}</p>)}
            </div>
          </div>
        </Section>

        <Section id="teaching" tone="muted" eyebrow="08 — Teaching" title="Teaching & Online Courses">
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {courses.map((c) => (
              <li key={c.title} className="bg-card p-8">
                <h3 className="text-2xl text-primary">{c.title}</h3>
                {c.platform && <p className="mt-3 eyebrow">{c.platform}</p>}
              </li>
            ))}
          </ul>
          {coursesUrl && <a href={coursesUrl} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Explore Courses</a>}
        </Section>

        <Section id="students" eyebrow="09 — Mentorship" title="Research Scholars">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {students.map((s) => (
              <li key={s.name} className="border-t-2 border-primary pt-5">
                <h3 className="text-xl text-primary">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.area ?? TBU}</p>
                {s.thesis && <p className="mt-3 font-serif text-sm italic">“{s.thesis}” {s.year && <span className="font-mono not-italic text-xs text-muted-foreground">· {s.year}</span>}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="awards" tone="muted" eyebrow="10 — Recognition" title="Awards & Recognition">
          <ul className="grid gap-x-10 md:grid-cols-2">
            {awards.map((a) => (
              <li key={a} className="flex items-center gap-4 border-b border-border py-5">
                <span className="h-2 w-2 rotate-45 bg-gold" aria-hidden />
                <span className="font-serif text-xl text-primary">{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="profiles" eyebrow="11 — Profiles" title="Academic Profiles">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {academicProfiles.map((p) => (
              <li key={p.label}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-sm border border-border bg-card px-5 py-4 text-primary transition-colors hover:border-accent">
                    {p.label}<span className="text-accent">↗</span>
                  </a>
                ) : (
                  <span aria-disabled="true" className="flex items-center justify-between rounded-sm border border-dashed border-border px-5 py-4 text-muted-foreground">
                    {p.label}<span className="text-xs">To be updated</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" tone="muted" eyebrow="12 — Contact" title="Get in Touch">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <a href={`mailto:${P.email}`} className="break-all font-serif text-3xl text-primary hover:text-accent">{P.email}</a>
              <div className="mt-6"><a href={`mailto:${P.email}`} className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Send Email</a></div>
            </div>
            <address className="not-italic leading-relaxed text-muted-foreground">
              {P.school}<br />{P.institute}<br />{P.location}
            </address>
          </div>
        </Section>
      </main>

      <footer className="bg-ink py-14 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-serif text-2xl">{P.name}</p>
            <p className="mt-2 text-sm opacity-80">{P.title}<br />{P.school}<br />{P.institute}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
            {[["Research", "research"], ["Publications", "publications"], ["Teaching", "teaching"], ["Students", "students"], ["Academic Profiles", "profiles"], ["Contact", "contact"]].map(([l, h]) => (
              <a key={h} href={`#${h}`} className="hover:text-gold">{l}</a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-ink-foreground/20 pt-6 text-xs opacity-70 md:col-span-2">
            <span>© 2026 Gouri Ashok Gargate. All rights reserved.</span>
            <a href="#top" className="hover:text-gold">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
