"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient as RawMeshGradient, PulsingBorder as RawPulsingBorder } from "@paper-design/shaders-react"
const MeshGradient = RawMeshGradient as any
const PulsingBorder = RawPulsingBorder as any
import { motion } from "framer-motion"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A96E" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#E4CD9C" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Shader backgrounds — Nirvonn palette: deep black, gold, emerald */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#060606", "#1B2E22", "#C9A96E", "#0e0d0b", "#2D6A4F"]}
        speed={0.25}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#060606", "#E4CD9C", "#1B2E22", "#C9A96E"]}
        speed={0.15}
        wireframe="true"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6 md:px-12">
        <motion.div
          className="flex items-center gap-4 group cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <img
            src="images/nirvonn-logo.jpg"
            alt="Nirvonn"
            className="w-16 h-16 rounded-full object-cover border border-white/20 shadow-lg"
            style={{ filter: "url(#logo-glow)" }}
          />
          <span className="font-display text-xl tracking-[0.25em] font-semibold text-white">NIRVONN</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {["Home", "Products", "About"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
              className="text-white/70 hover:text-[#E4CD9C] text-xs font-medium px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <button className="absolute right-0 px-2.5 py-2 rounded-full bg-[#C9A96E] text-black font-normal text-xs transition-all duration-300 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button className="px-6 py-2 rounded-full bg-[#C9A96E] text-black font-medium text-xs transition-all duration-300 hover:bg-[#E4CD9C] cursor-pointer h-8 flex items-center z-10 tracking-wide">
            Explore
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="absolute bottom-12 left-8 md:left-12 z-20 max-w-2xl">
        <div className="text-left">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 relative border border-white/10"
            style={{ filter: "url(#glass-effect)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent rounded-full" />
            <span className="text-white/90 text-sm font-medium relative z-10 tracking-wide">
              ✨ The Nirvonn Collection
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 tracking-wider"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #C9A96E 40%, #2D6A4F 70%, #E4CD9C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                filter: "url(#text-glow)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Designed for
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl italic">
              Perfection
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg font-light text-white/60 mb-8 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Where simplicity meets innovation. Premium home &amp; personal care crafted with natural ingredients and timeless design.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.a
              href="#products"
              className="btn-gold px-8 py-3.5 rounded-full text-sm cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
            </motion.a>
            <motion.a
              href="#about"
              className="btn-outline-gold px-8 py-3.5 rounded-full text-sm cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Story
            </motion.a>
          </motion.div>
        </div>
      </main>

      {/* Pulsing Border Orb */}
      <div className="absolute bottom-10 right-10 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PulsingBorder
            colors={["#C9A96E", "#E4CD9C", "#2D6A4F", "#52B788", "#C9A96E"]}
            colorBack="#00000000"
            speed={1.2}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spots={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          />

          {/* Rotating Text */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-white/60 font-medium" style={{ fontSize: "8px" }}>
              <textPath href="#circle" startOffset="0%">
                NIRVONN • Designed for Perfection • NIRVONN • Designed for Perfection •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20">
        <span className="text-[9px] tracking-widest-2 uppercase font-display">Scroll</span>
        <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
          <path d="M8 1V23M8 23L2 17M8 23L14 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
