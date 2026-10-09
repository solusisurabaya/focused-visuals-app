import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import product from "@/assets/product.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALURELAB — Toko online-mu. Aturanmu." },
      { name: "description", content: "Platform e-commerce untuk bisnis Indonesia. Bangun toko online dengan identitas brand sendiri, kelola produk dan pesanan dalam satu platform." },
      { property: "og:title", content: "ALURELAB — Toko online-mu. Aturanmu." },
      { property: "og:description", content: "Bangun dan kelola toko online dengan identitas brand sendiri bersama ALURELAB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xl font-extrabold tracking-tight ${className}`}>
      <Sparkle className="h-5 w-5 text-lime" />
      ALURELAB
    </span>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word mr-[0.22em]">
          <span style={{ animationDelay: `${delay + i * 0.08}s` }}>{w}</span>
        </span>
      ))}
    </>
  );
}

function Btn({ children, href, variant = "lime" }: { children: ReactNode; href: string; variant?: "lime" | "ghost" | "ghostDark" }) {
  const v = {
    lime: "bg-lime text-ink hover:bg-paper",
    ghost: "border border-paper/25 text-paper hover:border-lime hover:text-lime",
    ghostDark: "border border-ink/20 text-ink hover:bg-ink hover:text-paper",
  }[variant];
  return (
    <a href={href} className={`group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${v}`}>
      {children}
    </a>
  );
}

const nav = [
  ["Fitur", "#fitur"],
  ["Cara Kerja", "#cara-kerja"],
  ["FAQ", "#faq"],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-paper/10 bg-ink/80 px-5 py-3 text-paper backdrop-blur-xl">
        <a href="#top" aria-label="ALURELAB beranda"><Logo /></a>
        <nav className="hidden gap-8 text-sm font-medium md:flex" aria-label="Navigasi utama">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-paper/70 transition-colors hover:text-lime">{l}</a>
          ))}
        </nav>
        <a href="#mulai" className="hidden rounded-full bg-lime px-5 py-2 text-sm font-bold text-ink transition hover:bg-paper md:inline-flex">Mulai Sekarang ↗</a>
        <button className="md:hidden text-sm font-bold" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          {open ? "Tutup" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mnav" className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl bg-ink p-4 text-paper md:hidden" aria-label="Navigasi mobile">
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-2xl font-bold hover:bg-ink-soft">{l}</a>
          ))}
          <a href="#mulai" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-lime px-4 py-3 text-center font-bold text-ink">Mulai Sekarang ↗</a>
        </nav>
      )}
    </header>
  );
}

/* ---------- Mockups ---------- */

function StoreMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-card text-ink shadow-panel">
      <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-cloud" /><i className="h-2.5 w-2.5 rounded-full bg-cloud" /><i className="h-2.5 w-2.5 rounded-full bg-cloud" />
        <span className="ml-3 rounded-full bg-paper px-3 py-0.5 text-[10px] text-muted-foreground">sunsori.id</span>
      </div>
      <div className="flex items-center justify-between px-5 py-3 text-[11px]">
        <b className="text-sm tracking-tight">sunsori</b>
        <span className="hidden gap-4 text-muted-foreground sm:flex"><span>Koleksi</span><span>Tentang</span><span>Keranjang (1)</span></span>
      </div>
      <div className="grid grid-cols-5 gap-4 px-5 pb-5">
        <img src={product} alt="Produk toko Sunsori: mug dan teko keramik" width={800} height={960} className="col-span-3 aspect-[4/5] w-full rounded-xl object-cover" />
        <div className="col-span-2 flex flex-col justify-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Seri Pagi</span>
          <b className={`${compact ? "text-sm" : "text-lg"} leading-tight`}>Set Seduh Keramik</b>
          <span className="text-xs text-muted-foreground">Dibuat tangan oleh perajin lokal.</span>
          <span className="mt-2 rounded-full bg-ink py-2 text-center text-[10px] font-bold text-paper">Tambah ke Keranjang</span>
        </div>
      </div>
    </div>
  );
}

function DashMock() {
  const orders = [
    ["#1042", "Set Seduh Keramik", "Diproses"],
    ["#1041", "Mug Pagi", "Dikirim"],
    ["#1040", "Teko Leher Angsa", "Selesai"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-paper/10 bg-ink-soft text-paper shadow-panel">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-bold"><Sparkle className="h-3 w-3 text-lime" />Dashboard</span>
        <span className="text-[10px] text-paper/50">Toko: sunsori</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-widest text-paper/50">Pesanan terbaru</p>
        <ul className="mt-3 divide-y divide-paper/10">
          {orders.map(([id, n, s]) => (
            <li key={id} className="flex items-center justify-between py-2.5 text-xs">
              <span className="text-paper/50">{id}</span>
              <span className="flex-1 px-3">{n}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${s === "Diproses" ? "bg-lime text-ink" : "bg-paper/10 text-paper/80"}`}>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChartMock({ dark = true }: { dark?: boolean }) {
  const h = [35, 52, 44, 68, 58, 80, 72, 92, 76, 88, 70, 96];
  return (
    <div className={`rounded-2xl p-5 shadow-panel ${dark ? "border border-paper/10 bg-ink-soft text-paper" : "bg-card text-ink"}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest opacity-60">Aktivitas toko</p>
        <span className="text-[10px] opacity-60">12 minggu terakhir</span>
      </div>
      <div className="mt-6 flex h-32 items-end gap-1.5">
        {h.map((v, i) => (
          <div key={i} className={`bar flex-1 rounded-t-md ${i === h.length - 1 ? "bg-lime" : dark ? "bg-paper/15" : "bg-cloud"}`} style={{ height: `${v}%`, transitionDelay: `${i * 50}ms` }} />
        ))}
      </div>
      <p className="mt-3 text-[10px] opacity-50">Ilustrasi tampilan — data contoh</p>
    </div>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      el.style.transform = `perspective(1400px) rotateY(${-12 + x * 6}deg) rotateX(${6 - y * 6}deg)`;
    };
    addEventListener("mousemove", onMove);
    return () => removeEventListener("mousemove", onMove);
  }, []);
  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-20 pt-36 text-paper md:pb-28 md:pt-44">
      <Sparkle className="floaty absolute right-[8%] top-32 h-10 w-10 text-lime" />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="reveal text-xs font-semibold tracking-[0.25em] text-lime">PLATFORM E-COMMERCE UNTUK BISNIS INDONESIA</p>
          <h1 className="display mt-6 text-[clamp(3.2rem,9vw,7.5rem)]">
            <SplitText text="Toko online-mu." /><br />
            <span className="text-lime"><SplitText text="Aturanmu." delay={0.25} /></span>
          </h1>
          <p className="reveal mt-8 max-w-md text-lg text-paper/70">
            Bangun toko online dengan identitas brand sendiri. Kelola produk, pesanan, dan bisnismu dalam satu platform.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <Btn href="#mulai">Mulai Sekarang <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span></Btn>
            <Btn href="#fitur" variant="ghost">Jelajahi Platform</Btn>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div ref={ref} className="relative transition-transform duration-300 ease-out" style={{ transform: "perspective(1400px) rotateY(-12deg) rotateX(6deg)", transformStyle: "preserve-3d" }}>
            <div className="reveal w-[88%]"><StoreMock /></div>
            <div className="reveal absolute -bottom-10 right-0 w-[62%]" style={{ transform: "translateZ(60px)" }}><DashMock /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="fitur" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="reveal display max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)]">Semua kebutuhan toko online dalam satu tempat.</h2>

        <div className="mt-24 grid items-center gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <span className="text-7xl font-extrabold text-silver">01</span>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight">Toko Online dengan Identitas Sendiri</h3>
            <p className="mt-4 max-w-sm text-muted-foreground">Bangun toko online yang mencerminkan karakter dan identitas brand bisnismu.</p>
          </div>
          <div className="reveal md:col-span-6 md:col-start-7"><StoreMock /></div>
        </div>

        <div className="reveal mt-28 grid items-center gap-12 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:grid-cols-12 md:p-14">
          <div className="md:order-2 md:col-span-5 md:col-start-8">
            <span className="text-7xl font-extrabold text-lime">02</span>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight">Pengelolaan Produk dan Pesanan</h3>
            <p className="mt-4 max-w-sm text-paper/60">Kelola produk dan pesanan pelanggan melalui satu dashboard yang praktis.</p>
          </div>
          <div className="space-y-4 md:order-1 md:col-span-6">
            <DashMock />
            <div className="grid grid-cols-3 gap-3">
              {["Set Seduh", "Mug Pagi", "Teko"].map((p) => (
                <div key={p} className="rounded-xl border border-paper/10 p-3 text-xs">
                  <div className="mb-2 aspect-square rounded-lg bg-paper/10" />
                  {p}<span className="block text-[10px] text-lime">Aktif</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-28 grid items-end gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <span className="text-7xl font-extrabold text-silver">03</span>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight">Pantau Aktivitas Bisnis</h3>
            <p className="mt-4 text-muted-foreground">Lihat informasi aktivitas toko dan penjualan dalam tampilan yang mudah dipahami.</p>
          </div>
          <div className="reveal md:col-span-7 md:col-start-6 rounded-[2rem] bg-cloud p-6 md:p-10"><ChartMock dark={false} /></div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Buat Toko", "Mulai siapkan toko online dan identitas brand bisnismu."],
    ["Atur Produk", "Tambahkan produk dan sesuaikan tampilan toko sesuai kebutuhanmu."],
    ["Mulai Berjualan", "Publikasikan toko online dan kelola aktivitas bisnismu dari satu tempat."],
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="cara-kerja" className="bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="reveal display text-[clamp(2.5rem,6vw,5.5rem)]">Dari ide menjadi<br /><span className="text-lime">toko online.</span></h2>
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <div className="reveal relative">
            <div className="absolute left-0 right-0 top-0 h-px bg-paper/10"><div className="line-grow h-full bg-lime" style={{ width: `${((active + 1) / 3) * 100}%`, transition: "width .6s" }} /></div>
            {steps.map(([t, d], i) => (
              <button key={t} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className={`flex w-full items-start gap-6 border-b border-paper/10 py-8 text-left transition-opacity ${active === i ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>
                <span className={`display text-6xl md:text-8xl ${active === i ? "text-lime" : ""}`}>0{i + 1}</span>
                <span><b className="block text-2xl tracking-tight">{t}</b><span className="mt-2 block text-paper/60">{d}</span></span>
              </button>
            ))}
          </div>
          <div className="reveal flex items-center">
            <div className="w-full overflow-hidden rounded-2xl bg-card text-ink shadow-panel">
              <div className="flex items-center justify-between border-b px-5 py-3 text-[11px]">
                <b className={`transition-opacity ${active >= 0 ? "opacity-100" : "opacity-0"}`}>{active >= 0 ? "sunsori" : ""}</b>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${active === 2 ? "bg-lime" : "bg-cloud text-muted-foreground"}`}>{active === 2 ? "Online" : "Draf"}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 p-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className={`aspect-[4/5] overflow-hidden rounded-xl transition-all duration-700 ${active >= 1 ? "bg-paper" : "border-2 border-dashed border-cloud"}`}>
                      {active >= 1 && <img src={product} alt="" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: `${i * 50}% center` }} />}
                    </div>
                    <div className={`h-2 rounded-full transition-all duration-700 ${active >= 1 ? "w-3/4 bg-ink" : "w-1/2 bg-cloud"}`} />
                    <div className="h-2 w-1/3 rounded-full bg-cloud" />
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <div className={`rounded-full py-3 text-center text-xs font-bold transition-all duration-700 ${active === 2 ? "bg-ink text-paper" : "bg-cloud text-muted-foreground"}`}>
                  {active === 2 ? "Toko sudah dipublikasikan" : active === 1 ? "Menyiapkan produk…" : "Toko baru dibuat"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Apa itu ALURELAB?", "ALURELAB adalah platform e-commerce yang dirancang untuk membantu bisnis membangun dan mengelola toko online dengan identitas brand mereka sendiri."],
  ["Apakah ALURELAB merupakan marketplace seperti Shopee?", "Bukan. ALURELAB berfokus pada pembuatan dan pengelolaan toko online milik masing-masing bisnis, bukan marketplace tempat banyak penjual berjualan dalam satu platform."],
  ["Apakah saya bisa memiliki toko online dengan brand sendiri?", "ALURELAB dirancang untuk mendukung konsep toko online dengan identitas brand sendiri. Detail pilihan kustomisasi mengikuti fitur yang tersedia pada platform."],
  ["Apakah saya perlu kemampuan coding?", "ALURELAB ditujukan untuk mempermudah proses membangun toko online. Tingkat kemudahan dan kebutuhan teknis akan mengikuti fitur yang tersedia pada platform."],
  ["Bagaimana cara mulai menggunakan ALURELAB?", "Kamu dapat memulai melalui tombol “Mulai Sekarang”."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Masih punya pertanyaan?</h2>
          <p className="mt-6 max-w-xs text-muted-foreground">Temukan jawaban untuk hal-hal yang perlu kamu ketahui tentang ALURELAB.</p>
        </div>
        <div className="reveal lg:col-span-7 lg:col-start-6">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-ink/15">
                <h3>
                  <button id={`fq-${i}`} aria-expanded={isOpen} aria-controls={`fa-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-bold tracking-tight md:text-xl focus-visible:outline-2 focus-visible:outline-lime">
                    {q}
                    <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-lime" : "bg-cloud"}`} aria-hidden>
                      <i className="absolute h-0.5 w-3.5 bg-ink" />
                      <i className={`absolute h-3.5 w-0.5 bg-ink transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <div id={`fa-${i}`} role="region" aria-labelledby={`fq-${i}`} className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden pr-14 text-muted-foreground"><span className="block pb-7">{a}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="mulai" className="relative overflow-hidden bg-ink text-paper">
      <svg viewBox="0 0 200 200" className="spin-slow pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] text-paper/5" aria-hidden>
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 6" />
        <rect x="45" y="45" width="110" height="110" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <Sparkle className="floaty absolute bottom-40 left-[10%] h-8 w-8 text-lime" />
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <h2 className="reveal display max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">Saatnya bisnismu punya <span className="text-lime">ruang sendiri.</span></h2>
        <div className="reveal mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lg text-paper/60">Bangun toko online yang mencerminkan identitas dan visi bisnismu.</p>
          <Btn href="#mulai">Mulai Sekarang ↗</Btn>
        </div>
      </div>
      <footer className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <Logo />
          <nav className="flex gap-6 text-sm text-paper/60" aria-label="Navigasi footer">
            {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-lime">{l}</a>)}
          </nav>
          <p className="text-xs text-paper/40">© {new Date().getFullYear()} ALURELAB</p>
        </div>
      </footer>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
