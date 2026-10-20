import Link from "next/link";
export default function Home() {
  return <main className="mx-auto max-w-6xl px-6 py-10 md:px-12">
    <nav aria-label="Main navigation" className="flex justify-between border-b border-white/10 pb-6"><Link href="/" className="font-semibold tracking-widest">EMBERFRAME / VFX</Link><a href="#vision" className="text-sm text-stone-300">The vision ↗</a></nav>
    <section className="relative py-28 md:py-40"><div aria-hidden="true" className="glow" />
      <p className="mb-6 text-xs uppercase tracking-[.3em] text-amber-400">Artist control. Cinematic possibility.</p>
      <h1 className="relative max-w-4xl text-6xl font-medium leading-[1.05] tracking-tight md:text-8xl">Keep the shot.<br/><span className="text-amber-300">Create the impossible.</span></h1>
      <p className="mt-8 max-w-xl text-lg leading-8 text-stone-400">Premium AI visual effects, built around your vision. Original footage stays intact. Every effect becomes an editable layer, shaped by your references and your timing.</p>
      <a href="#vision" className="mt-10 inline-block rounded-full border border-amber-300/40 px-6 py-3 text-amber-200 transition-colors hover:bg-amber-300/10">Explore the foundation ↓</a>
      <p className="mt-5 text-xs text-stone-500">Early development · generation and editing tools are planned</p>
    </section>
    <section id="vision" className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-3">
      {[["01 / PRESERVE", "Your footage, untouched", "Source media is immutable. FX live in independent, editable layers."], ["02 / DIRECT", "Reference with intention", "Exact, close, and original modes. Frame timing and dissipation defined by the artist."], ["03 / COMPOSE", "Build the atmosphere", "Fire, smoke, magic, electricity, and more. A cinematic showcase and sample library are next."]].map(([label,title,body]) => <article key={label} className="rounded-2xl border border-white/10 bg-white/[.02] p-7"><p className="text-xs tracking-widest text-amber-400">{label}</p><h2 className="mt-6 text-xl">{title}</h2><p className="mt-3 text-sm leading-7 text-stone-400">{body}</p></article>)}
    </section><footer className="py-8 text-xs text-stone-500">Emberframe VFX · For artists, directors, and video creators.</footer>
  </main>;
}
