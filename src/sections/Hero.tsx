import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, Shield, Cpu, Compass } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
// @ts-ignore
import kcgAfricaRising from '@/src/assets/images/kcg_africa_rising_1780357788022.png';

const taglineItems = ["AFRICAN SOUVEREIGNTY", "QUANTUM CAPITAL", "INFRASTRUCTURE", "VALUE SYNERGY", "DECISION ENGINE"];

interface CityNode {
  name: string;
  lat: number;
  lon: number;
  role: string;
}

const CITIES: CityNode[] = [
  { name: "Abidjan", lat: 5.3, lon: -4.0, role: "Logistique DMS" },
  { name: "Lagos", lat: 6.5, lon: 3.4, role: "Hub d'Investissement DPI" },
  { name: "Cairo", lat: 30.0, lon: 31.2, role: "Sovereign Gateway" },
  { name: "Nairobi", lat: -1.3, lon: 36.8, role: "Ressources DRN" },
  { name: "Johannesburg", lat: -26.2, lon: 28.0, role: "Bourse Souveraine" },
  { name: "Dakar", lat: 14.7, lon: -17.4, role: "DDD Récits Nationaux" },
  { name: "Kinshasa", lat: -4.4, lon: 15.3, role: "Matières Critiques" },
  { name: "Casablanca", lat: 33.5, lon: -7.6, role: "Hub Nord-Africain" },
  { name: "Kigali", lat: -1.9, lon: 30.1, role: "Innovation Tech" },
  { name: "Paris", lat: 48.8, lon: 2.3, role: "Partenaires Stratégiques" },
  { name: "Dubai", lat: 25.2, lon: 55.2, role: "Syndication Moyen-Orient" },
  { name: "New York", lat: 40.7, lon: -74.0, role: "Capital-Risque Global" }
];

const PATHS = [
  { from: 0, to: 1 }, // Abidjan -> Lagos
  { from: 1, to: 4 }, // Lagos -> Johannesburg
  { from: 4, to: 3 }, // Johannesburg -> Nairobi
  { from: 3, to: 2 }, // Nairobi -> Cairo
  { from: 2, to: 6 }, // Cairo -> Kinshasa
  { from: 6, to: 1 }, // Kinshasa -> Lagos
  { from: 5, to: 0 }, // Dakar -> Abidjan
  { from: 7, to: 2 }, // Casablanca -> Cairo
  { from: 8, to: 3 }, // Kigali -> Nairobi
  { from: 9, to: 7 }, // Paris -> Casablanca
  { from: 10, to: 2 }, // Dubai -> Cairo
  { from: 11, to: 1 } // New York -> Lagos
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move listener for cinematic parallax backlashes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Is Point in Africa Boundary Check for procedurally projecting a stellar African landmass map onto a 3D sphere
  const isPointInAfrica = (lat: number, lon: number): boolean => {
    if (lat > 37 || lat < -34.8) return false;
    if (lon < -17.5 || lon > 51.4) return false;

    if (lat > 15) {
      // Sahara and far North Africa
      return lon >= -17 && lon <= 34;
    }
    if (lat > 4) {
      // West Africa Bulb & East/Central
      return lon >= -17 && lon <= 48;
    }
    if (lat > -5) {
      // Central narrowing region
      return lon >= 8 && lon <= 42;
    }
    if (lat > -20) {
      // Southern African mid
      return lon >= 11 && lon <= 38;
    }
    // South Africa tip
    return lon >= 16 && lon <= 33;
  };

  // 3D Globe Projection Rendering Loop (with subtle opacity overlay for high technical aesthetics)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotationY = 0.5; // Facing Africa beautifully by default
    let bounceProgress = 0;

    // Generate Globe Dot Matrix (procedural Africa landmass)
    const globePoints: Array<{ lat: number; lon: number; inAfrica: boolean; pulseSpeed: number; densityShift: number }> = [];
    
    // Distribute points evenly using Fibonacci Sphere approach for absolute luxury rendering
    const pointCount = 1500; // Decreased density for better visual space (90% space concept)
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;

      const lonRad = theta % (Math.PI * 2);
      const latRad = Math.asin(y);

      const lon = ((lonRad * 180) / Math.PI) - 180;
      const lat = (latRad * 180) / Math.PI;

      globePoints.push({
        lat,
        lon,
        inAfrica: isPointInAfrica(lat, lon),
        pulseSpeed: 0.05 + Math.random() * 0.08,
        densityShift: Math.random()
      });
    }

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;

      // Slow orbital rotation
      rotationY += 0.0006; // even slower, calmer
      bounceProgress += 0.005;

      // Camera parallax tilt calculations from mouse offset
      const tiltX = 0.12 + (mousePos.y * 0.02);
      const shiftX = mousePos.x * 20;
      const shiftY = mousePos.y * 12;

      // Projection parameters
      const perspective = 900;

      // 1. Draw procedural satellite dots on sphere
      globePoints.forEach((p) => {
        const latRad = (p.lat * Math.PI) / 180;
        const lonRad = (p.lon * Math.PI) / 180;
        const currentLonRad = lonRad + rotationY;

        const x3D = globeRadius * Math.cos(latRad) * Math.sin(currentLonRad);
        const y3D = -globeRadius * Math.sin(latRad);
        const z3D = globeRadius * Math.cos(latRad) * Math.cos(currentLonRad);

        const rx = x3D;
        const ry = y3D * Math.cos(tiltX) - z3D * Math.sin(tiltX);
        const rz = y3D * Math.sin(tiltX) + z3D * Math.cos(tiltX);

        if (rz > -10) {
          const depthScale = perspective / (perspective - rz);
          const screenX = centerX + rx * depthScale + shiftX;
          const screenY = centerY + ry * depthScale + shiftY;

          // Set premium coloring styles depending on Africa occupancy
          if (p.inAfrica) {
            const pulse = 0.4 + Math.sin(bounceProgress * p.pulseSpeed * 5) * 0.3;
            ctx.fillStyle = p.densityShift > 0.92 
              ? `rgba(255, 255, 255, ${0.15 + pulse * 0.15})` 
              : `rgba(200, 16, 46, ${0.12 + pulse * 0.15})`;
            
            ctx.beginPath();
            ctx.arc(screenX, screenY, (p.densityShift > 0.92 ? 1.2 : 0.85) * depthScale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            if (p.densityShift > 0.95) {
              ctx.fillStyle = `rgba(255, 255, 255, 0.02)`;
              ctx.beginPath();
              ctx.arc(screenX, screenY, 0.5 * depthScale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

      // 2. Project key City Nodes on the globe
      const projectedCities = CITIES.map((city) => {
        const latRad = (city.lat * Math.PI) / 180;
        const lonRad = (city.lon * Math.PI) / 180;
        const currentLonRad = lonRad + rotationY;

        const x3D = globeRadius * Math.cos(latRad) * Math.sin(currentLonRad);
        const y3D = -globeRadius * Math.sin(latRad);
        const z3D = globeRadius * Math.cos(latRad) * Math.cos(currentLonRad);

        const rx = x3D;
        const ry = y3D * Math.cos(tiltX) - z3D * Math.sin(tiltX);
        const rz = y3D * Math.sin(tiltX) + z3D * Math.cos(tiltX);

        return {
          city,
          rx, ry, rz,
          depthScale: perspective / (perspective - rz),
          x: centerX + rx * (perspective / (perspective - rz)) + shiftX,
          y: centerY + ry * (perspective / (perspective - rz)) + shiftY,
          front: rz > -50
        };
      });

      // 3. Draw curved high-end infrastructure links ("VEINES ÉNERGÉTIQUES")
      ctx.lineWidth = 0.5;
      PATHS.forEach((path) => {
        const p1 = projectedCities[path.from];
        const p2 = projectedCities[path.to];

        if (p1 && p2 && p1.front && p2.front) {
          ctx.strokeStyle = `rgba(200, 16, 46, 0.08)`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 - 15;
          ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
          ctx.stroke();

          // Flowing energy packets
          const packetT = (bounceProgress * 0.2) % 1.0;
          const packetX = (1 - packetT) * (1 - packetT) * p1.x + 2 * (1 - packetT) * packetT * midX + packetT * packetT * p2.x;
          const packetY = (1 - packetT) * (1 - packetT) * p1.y + 2 * (1 - packetT) * packetT * midY + packetT * packetT * p2.y;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Render glowing indicators for cities
      projectedCities.forEach((pcNode) => {
        if (pcNode.front) {
          const size = 1.8 * pcNode.depthScale;
          const aura = (4 + Math.sin(bounceProgress * 3) * 2) * pcNode.depthScale;

          ctx.strokeStyle = `rgba(200, 16, 46, 0.15)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(pcNode.x, pcNode.y, aura, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(pcNode.x, pcNode.y, size, 0, Math.PI * 2);
          ctx.fill();

          // Discreet terminal style city labelling
          ctx.font = "bold 7.5px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.letterSpacing = "0.15em";
          ctx.fillText(pcNode.city.name.toUpperCase(), pcNode.x + size + 4, pcNode.y + 2.5);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePos]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white select-none"
      >
        {/* ================= CINEMATIC BACKGROUND SYSTEM ================= */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pre-calculated photorealistic background picture featuring Africa Rising sunrise visual */}
          <img 
            src={kcgAfricaRising}
            alt="KCG Africa Rising"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten transition-transform duration-[4000ms] ease-out scale-105"
            style={{
              transform: `scale(1.04) translate(${mousePos.x * 12}px, ${mousePos.y * 8}px)`,
            }}
          />

          {/* Procedural 3D Network Lines overlaying carefully to keep a technical structure */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-80" />
          
          {/* Luxury Shadow Atmosphere layering to prevent UI clutter */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/90 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Ambient Top Minimalist Line Accent */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-kcg-red/25 to-transparent z-10" />

        {/* ================= HERO INTELLECTUAL CONTENT LAYER ================= */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-32 pb-16">
          <div className="max-w-6xl mx-auto text-center space-y-10">
            
            {/* Elegant Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-[10px] uppercase tracking-[0.45em] text-neutral-300 mx-auto font-black"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-kcg-red shadow-[0_0_10px_#C8102E] animate-pulse" />
              KOFFMANN CAPITAL GROUP • MISSION SOUVERAINE
            </motion.div>

            {/* Main Premium Typography Headline (translated into precise French) */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-6xl lg:text-[76px] font-display font-medium tracking-tighter leading-[1.05] flex flex-col items-center text-white uppercase drop-shadow-[0_0_60px_rgba(200,16,46,0.12)]"
              >
                <span className="block italic text-white/45 mb-3 text-xl md:text-3xl tracking-widest lowercase font-sans font-light normal-case">
                  Nous ne construisons pas de plateformes.
                </span>
                <span className="block font-black tracking-tight flex items-center justify-center">
                  Nous bâtissons
                </span>
                <span className="block text-kcg-red italic font-extrabold font-display">
                  L'économie de demain.
                </span>
              </motion.h1>
            </div>

            {/* Sub-text explaining depth, horizon, and Africa destiny */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="max-w-[820px] mx-auto text-neutral-300 text-sm md:text-base lg:text-lg font-light leading-relaxed select-none px-6"
            >
              KOFFMANN CAPITAL GROUP développe les infrastructures, les talents, les investissements et les systèmes intelligents qui accélèrent la transformation durable du continent africain.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button 
                onClick={() => {
                  document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4.5 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-xs tracking-widest uppercase transition-all flex items-center gap-3 border border-white shadow-[0_15px_35px_rgba(0,0,0,0.5)] group duration-500"
              >
                Explorer l'architecture
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-black" />
              </button>
            </motion.div>

          </div>
        </div>

        {/* ================= INFINITE TICKER ================= */}
        <div className="relative z-10 w-full overflow-hidden border-y border-white/5 py-3 tracking-widest bg-black/60 backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-20 px-10 items-center">
                {taglineItems.map((item) => (
                  <span key={item} className="text-[9.5px] font-mono tracking-[0.45em] text-neutral-500 font-bold uppercase">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMMERSIVE INTELLECTUAL BANNER (AFRICA RISING) ================= */}
      <section className="relative w-full py-32 px-6 bg-[#000000] z-20 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
        
        {/* Glow Ambient Layer */}
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.015),transparent_65%)]" 
        />
        
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Title Left */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="text-[9.5px] font-mono text-kcg-red uppercase tracking-widest font-black block">
              NOTRE DESTIN INDUSTRIEL
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-display font-medium tracking-tighter uppercase leading-[1.0] text-white">
              Le destin du continent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-red-400 font-bold italic font-display">se forge ici.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#C8102E] mt-4" />
          </div>

          {/* Description Right */}
          <div className="md:col-span-7 text-left space-y-6">
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Matières critiques, adéquation financière et corridors logistiques paneuropéens. Nous forgeons l'infrastructure globale qui redessine la parité mondiale.
            </p>
            <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
              En transformant la matière brute et en consolidant la chaîne logistique de décision, KOFFMANN CAPITAL GROUP place l'Afrique au centre névralgique de la cartographie économique universelle.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}
