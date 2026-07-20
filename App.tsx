import { useState, useEffect, useRef, useCallback } from "react"
import ShaderShowcase from "@/components/ui/hero"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Product Data ─── */
interface Product {
  id: string
  name: string
  category: string
  image: string
  tagline: string
  desc: string
  features: string[]
}

const products: Product[] = [
  {
    id: "dhoop-batti",
    name: "Premium Dhoop Batti",
    category: "Home Fragrance",
    image: "images/dhoop-batti-front.png",
    tagline: "Traditional serenity, elevated.",
    desc: "Hand-rolled dhoop sticks crafted from natural botanicals, releasing a slow, temple-grade fragrance that settles a room into stillness.",
    features: ["100% natural ingredients", "207g long-burning pack", "Smoke that lingers, never overwhelms", "Rooted in ritual, made for modern homes"],
  },
  {
    id: "dhoop-cone",
    name: "Sugandhit Dhoop & Cone Set",
    category: "Home Fragrance",
    image: "images/dhoop-cone-box.png",
    tagline: "A ritual kept in walnut and velvet.",
    desc: "Fragrant dhoop cones and sticks presented in a hand-finished walnut box, paired with a hand-stitched velvet pouch for carrying them anywhere.",
    features: ["Hand-finished walnut keepsake box", "Velvet travel pouch included", "Slow-burning cone & stick formats", "Designed for daily grounding"],
  },
  {
    id: "soaps",
    name: "Botanical Soap Duo",
    category: "Bath & Body",
    image: "images/soaps.png",
    tagline: "Lavender calm, herbal clarity.",
    desc: "Two cold-pressed soap bars — a soft lavender and an herbal green — slow-milled to hold their natural oils and quiet fragrance.",
    features: ["Cold-pressed, slow-milled bars", "Lavender & herbal green variants", "Free from harsh sulphates", "Gentle enough for daily use"],
  },
  {
    id: "detergent",
    name: "Premium Detergent Powder",
    category: "Home Care",
    image: "images/detergent-powder.png",
    tagline: "Purity, worked into every fibre.",
    desc: "A concentrated detergent powder formulated for a deep, gentle clean — designed to protect fabric while lifting everyday stains.",
    features: ["Concentrated cleaning formula", "Gentle on fabric, tough on stains", "Fresh, understated fragrance", "Low-residue rinse"],
  },
  {
    id: "surface-cleaner",
    name: "Surface & Floor Cleaner",
    category: "Home Care",
    image: "images/surface-cleaner.png",
    tagline: "Clarity you can see and smell.",
    desc: "A fast-acting, streak-free cleaner that cuts through grime while leaving behind a light, mineral-fresh scent.",
    features: ["Streak-free finish", "Fast-acting formula", "Light, mineral-fresh scent", "Safe for daily surface care"],
  },
  {
    id: "luxury-collection",
    name: "Nirvonn Luxury Collection",
    category: "Fragrance & Skincare",
    image: "images/luxury-collection.png",
    tagline: "Essence de Rêve, and beyond.",
    desc: "An eau de parfum, an illuminating serum, and finishing creams — a considered collection of skin and scent, finished in gold and glass.",
    features: ["Essence de Rêve eau de parfum", "Glow Illuminator serum", "Éclat Suprême finishing cream", "Gold-finished glass packaging"],
  },
  {
    id: "vaasho",
    name: "Vaash-O Household Range",
    category: "Everyday Care",
    image: "images/vaasho-range.png",
    tagline: "Everyday care, dependably clean.",
    desc: "A companion range for daily household upkeep — hand wash, detergent powder, and toilet cleaner, built for consistent, reliable performance.",
    features: ["Antibacterial hand wash", "2kg ultra stain-remover powder", "Powerful germ-fighting toilet cleaner", "Fresh, everyday fragrance"],
  },
]

/* ─── Feature Items ─── */
const features = [
  {
    title: "Natural Ingredients",
    desc: "Botanicals and minerals chosen for how they feel, not just how they perform.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.3">
        <path d="M12 2C9 6 5 9 5 14a7 7 0 0 0 14 0c0-5-4-8-7-12Z" />
      </svg>
    ),
  },
  {
    title: "Considered Design",
    desc: "Every box, bottle, and label is shaped with the same restraint as the formula inside.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.3">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 14h16" />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    desc: "Formulated and finished for consistent performance, wear after wear, use after use.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.3">
        <path d="M12 3l7 4v5c0 5-3 7.5-7 9-4-1.5-7-4-7-9V7l7-4Z" />
      </svg>
    ),
  },
  {
    title: "Precision Crafted",
    desc: "Small batches, tested details, nothing shipped until it earns the name Nirvonn.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.3">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.4" fill="#C9A96E" stroke="none" />
      </svg>
    ),
  },
]

/* ─── Intersection Observer Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const revealEls = el.querySelectorAll(".reveal")
    revealEls.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ─── Main App ─── */
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useReveal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selectedProduct])

  const closeModal = useCallback(() => setSelectedProduct(null), [])

  return (
    <div ref={sectionRef} className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">

      {/* ═══════════════════════════════════════════
          FIXED NAVIGATION (appears on scroll)
          ═══════════════════════════════════════════ */}
      <nav
        className={`nav-fixed fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "scrolled" : "bg-transparent pointer-events-none opacity-0"
        }`}
        style={{ pointerEvents: scrolled ? "auto" : "none", opacity: scrolled ? 1 : 0 }}
      >
        <a href="#" className="flex items-center gap-3">
          <img src="images/nirvonn-logo.jpg" alt="Nirvonn" className="w-12 h-12 rounded-full object-cover border border-white/15 shadow-md" />
          <span className="font-display text-base tracking-[0.25em] font-semibold text-white">NIRVONN</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
          <a href="#" className="hover:text-[#E4CD9C] transition-colors duration-300">Home</a>
          <a href="#products" className="hover:text-[#E4CD9C] transition-colors duration-300">Products</a>
          <a href="#about" className="hover:text-[#E4CD9C] transition-colors duration-300">About</a>
        </div>
        <a href="#products" className="btn-outline-gold text-xs tracking-widest-2 uppercase px-5 py-2 rounded-full">
          Explore
        </a>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — Shader Showcase
          ═══════════════════════════════════════════ */}
      <ShaderShowcase />

      {/* ═══════════════════════════════════════════
          GOLD DIVIDER
          ═══════════════════════════════════════════ */}
      <div className="gold-divider" />

      {/* ═══════════════════════════════════════════
          PRODUCT SHOWCASE GRID
          ═══════════════════════════════════════════ */}
      <section id="products" className="relative px-6 md:px-12 py-28 md:py-40 max-w-7xl mx-auto">
        <motion.div
          className="reveal text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-widest-2 uppercase text-[#E4CD9C] mb-4">The Range</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white">
            Every product, <span className="italic text-[#E4CD9C]">considered</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Crafted with intention. Designed to elevate the everyday.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              className="reveal product-card group"
              onClick={() => setSelectedProduct(p)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
            >
              <div className="img-box relative h-64 md:h-72 flex items-center justify-center p-8 overflow-hidden bg-gradient-to-b from-black/10 to-black/30">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain drop-shadow-lg" loading="lazy" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C9A96E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="card-body p-6">
                <p className="text-[10px] tracking-widest-2 uppercase text-[#E4CD9C]/70 mb-2 font-medium">{p.category}</p>
                <h3 className="font-display text-lg mb-1.5 text-white font-medium group-hover:text-[#E4CD9C] transition-colors duration-300">{p.name}</h3>
                <p className="text-sm text-[var(--text-muted)]">{p.tagline}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GOLD DIVIDER
          ═══════════════════════════════════════════ */}
      <div className="gold-divider max-w-xl mx-auto" />

      {/* ═══════════════════════════════════════════
          FEATURE HIGHLIGHT
          ═══════════════════════════════════════════ */}
      <section id="about" className="relative px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="reveal text-center mb-16 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xs tracking-widest-2 uppercase text-[#E4CD9C] mb-4">Why Nirvonn</p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white">
              The standard we <span className="italic text-[#E4CD9C]">hold</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                className="reveal text-center group"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
              >
                <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  {f.icon}
                </div>
                <h3 className="font-display text-base mb-2 text-white font-medium">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISUAL BREAK — Full-bleed image
          ═══════════════════════════════════════════ */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src="images/dhoop-cone-box.png"
          alt="Nirvonn luxury collection"
          className="reveal absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="visual-break-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            className="font-display text-4xl md:text-7xl font-light text-white mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Crafted to <span className="italic text-[#E4CD9C]">Impress</span>
          </motion.h2>
          <motion.a
            href="#products"
            className="btn-gold px-8 py-3.5 rounded-full text-sm cursor-pointer inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Products
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="px-6 md:px-12 py-16 border-t border-white/5 bg-[var(--bg-elevated)]">
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <a href="#" className="flex items-center gap-3">
              <img src="images/nirvonn-logo.jpg" alt="Nirvonn" className="w-14 h-14 rounded-full object-cover border border-white/10 shadow-md" />
              <span className="font-display text-base tracking-[0.25em] text-white font-semibold">NIRVONN</span>
            </a>
            <div className="flex items-center gap-8 text-sm text-[var(--text-muted)]">
              <a href="#" className="hover:text-[#E4CD9C] transition-colors duration-300">Home</a>
              <a href="#products" className="hover:text-[#E4CD9C] transition-colors duration-300">Products</a>
              <a href="#about" className="hover:text-[#E4CD9C] transition-colors duration-300">About</a>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-5 text-[var(--text-muted)]">
              <a href="#" className="hover:text-[#E4CD9C] transition-colors duration-300" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c2.7 0 3 .01 4.06.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.36.06 4.06s-.01 3-.06 4.06c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.36.06-4.06.06s-3-.01-4.06-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.2 15 2.2 14.7 2.2 12s.01-3 .06-4.06c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.65 2.6c.64-.25 1.37-.42 2.43-.47C9.14 2.08 9.44 2.2 12 2.2Zm0 1.8c-2.66 0-2.94.01-3.98.06-.86.04-1.33.18-1.64.3-.41.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.64C4.36 8.72 4.35 9 4.35 12s.01 3.28.06 4.32c.04.86.18 1.33.3 1.64.16.41.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.64.3 1.04.05 1.32.06 3.98.06s2.94-.01 3.98-.06c.86-.04 1.33-.18 1.64-.3.41-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.64.05-1.04.06-1.32.06-4.32s-.01-3.28-.06-4.32c-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 0 0-.66-1.02 2.7 2.7 0 0 0-1.02-.66c-.31-.12-.78-.26-1.64-.3C14.94 4.01 14.66 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#E4CD9C] transition-colors duration-300" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.2-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1c.5 1.6 2 2.8 3.8 2.9A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Gold divider */}
          <div className="gold-divider mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">© 2026 Nirvonn. All rights reserved.</p>
            <p className="text-xs text-[var(--text-muted)]">Designed for Perfection.</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          PRODUCT DETAIL MODAL
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-backdrop fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <motion.div
              className="modal-panel relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl grid md:grid-cols-2 gap-0"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#E4CD9C] hover:border-[#C9A96E]/30 transition-all duration-300 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* Image side */}
              <div className="flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-black/30 to-[#1B2E22]/10">
                <motion.img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full max-w-xs md:max-w-sm h-auto object-contain rounded-sm drop-shadow-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                />
              </div>

              {/* Details side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-[var(--bg-elevated)]">
                <motion.p
                  className="font-display text-xs tracking-widest-2 uppercase text-[#E4CD9C] mb-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedProduct.category}
                </motion.p>
                <motion.h3
                  className="font-display text-2xl md:text-3xl font-light mb-4 text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {selectedProduct.name}
                </motion.h3>
                <motion.p
                  className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProduct.desc}
                </motion.p>

                <motion.ul
                  className="space-y-3 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {selectedProduct.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.button
                  onClick={closeModal}
                  className="btn-outline-gold self-start text-xs tracking-widest-2 uppercase px-6 py-3 rounded-full cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
