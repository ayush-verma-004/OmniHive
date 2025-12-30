import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Utensils, Shirt, ArrowRight, ShieldCheck, Clock, Heart, Mail, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

    const services = [
        {
            icon: BookOpen,
            title: "Digital Library",
            description: "Access thousands of e-books across various genres. From academic resources to fiction bestsellers.",
            link: "/ebooks",
            gradient: "from-blue-600 to-indigo-700"
        },
        {
            icon: Utensils,
            title: "Gourmet Food",
            description: "Order from top-rated restaurants and local gems. Fresh food delivered straight to your doorstep.",
            link: "/food",
            gradient: "from-orange-500 to-amber-600"
        },
        {
            icon: Shirt,
            title: "Fashion Hub",
            description: "Explore the latest trends in clothing. Quality fabrics and modern designs for every occasion.",
            link: "/clothes",
            gradient: "from-rose-500 to-pink-600"
        }
    ];

    const features = [
        {
            icon: ShieldCheck,
            title: "Secure Payments",
            description: "Your transactions are always safe with our industry-standard encryption."
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Our dedicated team is available around the clock to assist you."
        },
        {
            icon: Heart,
            title: "Curated Quality",
            description: "Every item and service is handpicked for premium quality."
        }
    ];

    const stats = [
        { label: "Active Users", value: "50K+", color: "text-blue-600" },
        { label: "Books Available", value: "10K+", color: "text-primary" },
        { label: "Daily Orders", value: "500+", color: "text-orange-500" },
        { label: "Fashion Brands", value: "100+", color: "text-secondary" }
    ];

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 px-6">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white shadow-soft border border-border/50 text-primary-hover text-xs font-black uppercase tracking-[0.2em] animate-fade-in-up">
                            <Sparkles size={14} /> The Future of Lifestyle
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 leading-[0.9] tracking-tight text-text"
                    >
                        Elevate Your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary animate-gradient-x">
                            Daily Essence.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Discover a seamless fusion of curated literature, gourmet tastes, and high-street fashion. OmniHive is your premium gateway to an inspired life.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                    >
                        <Link to="/food" className="btn-primary flex items-center group w-full sm:w-auto justify-center px-10 py-4 text-lg">
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                        <button className="btn-secondary w-full sm:w-auto px-10 py-4 text-lg bg-white/80 backdrop-blur-sm border-border">
                            Explore Now
                        </button>
                    </motion.div>

                    {/* Social/Trust Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-20 flex flex-col items-center gap-4"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted/60">Trusted by modern humans globally</p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-soft">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-soft">
                                +50K
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid with Visual Overlap */}
            <section className="py-24 bg-white relative z-20" ref={targetRef}>
                <div className="container mx-auto px-6">
                    <motion.div
                        style={{ opacity, y }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight">Curated Categories</h2>
                        <div className="h-1.5 w-24 bg-primary/20 rounded-full mx-auto mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1 }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>
                        <p className="text-text-muted max-w-xl mx-auto font-bold">
                            Explore our hand-picked selections across three distinct universes.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ServiceCard {...service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Break / Stats */}
            <section className="py-24 bg-slate-50 border-y border-border/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white shadow-soft ring-1 ring-border/30 hover:shadow-premium hover:-translate-y-2 transition-all duration-500"
                            >
                                <span className={`text-4xl md:text-5xl font-black mb-3 ${stat.color} tracking-tighter`}>{stat.value}</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-text-muted">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl">
                    {/* Decorative lights */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 py-20 px-8 text-center space-y-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-xl border border-white/20"
                        >
                            <Mail className="w-10 h-10 text-primary-light" />
                        </motion.div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">Stay in the Hive</h2>
                            <p className="text-gray-400 font-bold max-w-lg mx-auto text-lg">Subscribe to our newsletter for exclusive collections and gourmet updates.</p>
                        </div>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600 font-bold"
                            />
                            <button className="px-10 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95">
                                Join Now
                            </button>
                        </form>

                        <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-bold pt-6">
                            <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary-light" /> No Spam. Ever.</div>
                            <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                            <div className="flex items-center gap-1.5"><TrendingUp size={14} className="text-primary-light" /> Weekly Curation.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

