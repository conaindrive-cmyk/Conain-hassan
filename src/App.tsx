import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Mail, Instagram, Phone, MapPin, ChevronRight, Star, Quote, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Types ---
interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface PricePackage {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface Service {
  title: string;
  description: string;
  icon: any;
}

interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  image: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Bride",
    content: "Conain captured our wedding so beautifully. Every emotion, every small detail was perfectly framed. Highly recommended!",
    rating: 5
  },
  {
    name: "Zawar Ahmed",
    role: "Event Organizer",
    content: "We've worked with many photographers, but Conain's vision is unique. He knows exactly how to work with light.",
    rating: 5
  },
  {
    name: "Sana Malik",
    role: "Fashion Model",
    content: "The fashion shoot was incredible. The results were even better than I expected. Professional and creative.",
    rating: 5
  }
];

const packages: PricePackage[] = [
  {
    name: "Basic",
    price: "PKR 25,000",
    features: ["2 Hours Coverage", "50 Edited Photos", "Online Gallery", "Digital Delivery"]
  },
  {
    name: "Standard",
    price: "PKR 50,000",
    features: ["5 Hours Coverage", "150 Edited Photos", "Premium Photo Album", "Digital Delivery", "1 Professional Assistant"],
    recommended: true
  },
  {
    name: "Premium",
    price: "PKR 85,000",
    features: ["Full Day Coverage", "300+ Edited Photos", "2 Premium Photo Albums", "4K Video Highlights", "2 Professional Assistants"]
  }
];

const services: Service[] = [
  { title: "Wedding Shoots", description: "Timeless coverage of your special day with a cinematic touch.", icon: Camera },
  { title: "Birthday/Event Coverage", description: "Capturing the joy and energy of your celebrations.", icon: Calendar },
  { title: "Product Photography", description: "Professional shots for your brand and e-commerce needs.", icon: Camera },
  { title: "Corporate Event", description: "Discrete and professional coverage of corporate gatherings.", icon: Camera },
  { title: "Brand Shoots", description: "Visual storytelling that elevates your brand identity.", icon: Star },
  { title: "Outdoor Shoots", description: "Beautiful natural light photography in stunning locations.", icon: MapPin },
];

const portfolioItems: PortfolioItem[] = [
  { id: 1, category: "Wedding", title: "Sunset Vows", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
  { id: 2, category: "Portrait", title: "Inner Glow", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
  { id: 3, category: "Event", title: "City Nights", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 4, category: "Fashion", title: "Noir Chic", image: "https://images.unsplash.com/photo-1539109139204-63340b77f94d?auto=format&fit=crop&q=80&w=800" },
  { id: 5, category: "Creative", title: "Neon Dream", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
  { id: 6, category: "Wedding", title: "Eternal Bond", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const categories = ["All", "Wedding", "Portrait", "Event", "Fashion", "Creative"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPortfolio = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const navItems = ['About', 'Gallery', 'Services', 'Pricing', 'Contact'];

  return (
    <div className="min-h-screen bg-luxury-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 px-6 py-6 transition-all duration-500 ${isScrolled ? 'bg-luxury-black/80 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-display font-bold tracking-tighter"
          >
            CONAIN <span className="text-luxury-silver">HASSAN</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-luxury-silver">
            {navItems.map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#fff', y: -2 }}
                className="hover:text-white transition-all"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a 
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-luxury-silver transition-colors"
            >
              Book Session
            </motion.a>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-luxury-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#booking" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-2xl uppercase tracking-widest"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/50" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.6em' }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-luxury-silver uppercase text-[10px] md:text-xs mb-8 font-bold"
          >
            Professional Photography in Karachi
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 text-glow leading-[0.8]"
          >
            CONAIN <br className="md:hidden" /> HASSAN
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '40%' }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-px bg-white/30 mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-lg md:text-2xl font-serif italic text-luxury-silver/90"
          >
            "Capturing Moments, Creating Memories"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-silver/40 font-bold">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden glass-card p-3">
              <img 
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800" 
                alt="About Conain"
                className="w-full h-full object-cover rounded-[1.5rem] grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Visual Decoration */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-white/10 rounded-tl-3xl hidden lg:block" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-silver font-bold">The Perspective</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-10 leading-tight">
              A Passionate Eye <br /> from <span className="text-luxury-silver italic font-serif">Karachi.</span>
            </h2>
            <div className="space-y-8 text-luxury-silver/80 leading-relaxed text-lg font-light">
              <p>
                Visual storytelling is not just about pressing a button. It's about finding the subtle light, the raw emotion, and the narrative that exists in every moment.
              </p>
              <p>
                As a specialized photographer in <span className="text-white font-medium">Portrait, Wedding, Event, and Creative photography</span>, I deliver a signature look that is both sophisticated and emotionally resonant.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-12">
              <div>
                <div className="text-4xl font-display font-bold mb-2">5+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold mb-2">500+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Stories Told</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="gallery" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.8em] text-luxury-silver mb-6 block font-bold"
          >
            Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-16 tracking-tighter underline decoration-white/5 underline-offset-12"
          >
            CAPTURED WORKS
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 relative pb-3 whitespace-nowrap ${activeCategory === cat ? 'text-white' : 'text-luxury-silver/50 hover:text-white'}`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] text-white/50 uppercase tracking-[0.4em] mb-3 font-bold">{item.category}</span>
                  <h3 className="text-3xl font-display font-medium tracking-tight mb-2">{item.title}</h3>
                  <div className="w-12 h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.6em] text-luxury-silver mb-4 block font-bold">Services</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9]">PROFESSIONAL <br /> SOLUTIONS</h2>
          </div>
          <div className="md:max-w-xs text-luxury-silver text-sm font-light leading-relaxed mb-2">
            Tailored photography experiences designed for the discerning client who values timeless quality and artistic integrity.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/5 rounded-3xl overflow-hidden glass-card">
          {services.map((service) => (
            <motion.div 
              key={service.title}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="p-12 md:p-16 bg-luxury-black/30 transition-all group"
            >
              <div className="w-2px h-12 bg-white/10 mb-10 group-hover:bg-white group-hover:h-16 transition-all duration-500" />
              <h3 className="text-2xl font-display font-bold mb-6 tracking-tight group-hover:translate-x-2 transition-transform">{service.title}</h3>
              <p className="text-luxury-silver/80 font-light leading-relaxed text-sm mb-8">{service.description}</p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                Details <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.8em] text-luxury-silver mb-8 block font-bold italic">Investment</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold">Packages & Pricing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {packages.map((pkg) => (
              <motion.div 
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`p-10 lg:p-14 rounded-[2.5rem] border transition-all duration-500 relative flex flex-col ${pkg.recommended ? 'border-white/20 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-105' : 'border-white/5 bg-luxury-black/50 hover:border-white/20'} group`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
                    Recommended Choice
                  </div>
                )}
                <div className="mb-12">
                  <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-widest text-luxury-silver/60">{pkg.name}</h3>
                  <div className="text-4xl lg:text-5xl font-display font-bold">{pkg.price}</div>
                </div>
                
                <div className="space-y-6 mb-12 flex-grow">
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-center gap-4 text-[13px] text-luxury-silver/80">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      {feat}
                    </div>
                  ))}
                </div>

                <a 
                  href="#booking"
                  className={`block py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all text-center ${pkg.recommended ? 'bg-white text-black hover:bg-luxury-silver' : 'bg-white/5 border border-white/10 hover:border-white text-white'}`}
                >
                  Book {pkg.name}
                </a>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center mt-16 text-luxury-silver/40 text-[10px] uppercase font-bold tracking-[0.3em]">
            * Custom tailored packages available upon request
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-24 underline decoration-white/5 underline-offset-12">CLIENT VOICES</h2>
        
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Quote className="w-12 h-12 text-white/5 absolute -top-10 -left-6" />
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-2 h-2 fill-white text-white" />)}
              </div>
              <p className="text-lg md:text-xl font-serif italic text-luxury-silver leading-relaxed mb-10">"{t.content}"</p>
              <div className="h-4 w-px bg-white/20 mx-auto mb-6" />
              <h4 className="font-display font-bold uppercase tracking-[0.2em] text-xs mb-1">{t.name}</h4>
              <span className="text-[10px] text-luxury-silver uppercase tracking-widest">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
            <span className="text-[10px] uppercase tracking-[0.6em] text-luxury-silver mb-6 block font-bold">Reservation</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 leading-[0.9]">BOOK YOUR <br /> SESSION</h2>
            <p className="text-luxury-silver/70 text-lg font-light leading-relaxed mb-12 max-w-md">
              Ready to create something extraordinary together? Fill out the form or reach out directly to secure your date.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-1">Direct Call</div>
                  <div className="text-xl font-display font-medium">03152469120</div>
                </div>
              </div>
              <div className="flex items-start gap-6 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-1">Email Inquiries</div>
                  <div className="text-xl font-display font-medium">conainhassan1@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-6 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-1">Location</div>
                  <div className="text-xl font-display font-medium">Karachi, Pakistan</div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 flex gap-6">
               <a href="https://www.instagram.com/photography_by_conain.hassan?igsh=MTM4emtwdWY3YzRnNQ==" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 lg:p-16 glass-card rounded-[3rem]"
          >
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 p-1 focus:outline-none focus:border-white transition-colors" placeholder="Ex: John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40 ml-1">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 p-1 focus:outline-none focus:border-white transition-colors" placeholder="ex@domain.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40 ml-1">Date of Service</label>
                    <input type="date" className="w-full bg-transparent border-b border-white/10 p-1 focus:outline-none focus:border-white transition-colors text-white/50" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40 ml-1">Interest</label>
                    <select className="w-full bg-transparent border-b border-white/10 p-1 focus:outline-none focus:border-white transition-colors appearance-none text-white/50">
                      <option className="bg-luxury-black">Wedding Photography</option>
                      <option className="bg-luxury-black">Portrait Session</option>
                      <option className="bg-luxury-black">Event Coverage</option>
                      <option className="bg-luxury-black">Creative Shoot</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40 ml-1">Project Details</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 p-1 focus:outline-none focus:border-white transition-colors" placeholder="Share your vision..." />
                </div>
              </div>
              <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                Send Notification
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 px-6 border-t border-white/5 mt-32 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div className="max-w-xs">
              <div className="text-3xl font-display font-bold tracking-tighter mb-8 italic">CH<span className="text-luxury-silver">.P</span></div>
              <p className="text-sm text-luxury-silver/50 font-light leading-relaxed mb-10 italic font-serif text-lg">
                Dedicated to the pursuit of beauty, authenticity, and visual excellence.
              </p>
              <div className="flex gap-4">
                 <a href="https://www.instagram.com/photography_by_conain.hassan?igsh=MTM4emtwdWY3YzRnNQ==" target="_blank" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
              <div className="space-y-6">
                <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">Navigation</h5>
                <ul className="space-y-4 text-sm font-medium uppercase tracking-widest text-luxury-silver/80">
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                  <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">Social</h5>
                <ul className="space-y-4 text-sm font-medium uppercase tracking-widest text-luxury-silver/80">
                  <li><a href="https://www.instagram.com/photography_by_conain.hassan?igsh=MTM4emtwdWY3YzRnNQ==" target="_blank" className="hover:text-white transition-colors">Instagram</a></li>
                </ul>
              </div>
              <div className="hidden lg:block space-y-6">
                <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">Reach Us</h5>
                <p className="text-sm font-medium text-luxury-silver/80 leading-relaxed max-w-xs">
                  Karachi, Pakistan <br />
                  03152469120 <br />
                  conainhassan1@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">© 2024 Conain Hassan Photography</p>
            <div className="flex gap-12 text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
