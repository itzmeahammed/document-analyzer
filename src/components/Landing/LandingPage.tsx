import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Brain, FileText, Shield, BarChart3, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Three.js background animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 100;
    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x000000,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 50;

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-1 bg-gradient-to-br from-white via-white to-gray-50 opacity-95" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl text-black">DocuSort AI</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-sm font-semibold text-black">AI-Powered Document Intelligence</span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-black leading-tight">
                Transform Your
                <span className="block text-black">
                  Documents Instantly
                </span>
              </h1>
              <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
                Harness the power of advanced AI to analyze, categorize, and extract insights from your documents in seconds. No manual work required.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-black/90 transition-colors"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#000' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-black/20 text-black rounded-xl font-bold text-lg hover:border-black transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-12">
              {[
                { label: 'Documents Processed', value: '1M+' },
                { label: 'Accuracy Rate', value: '99.8%' },
                { label: 'Processing Speed', value: '<2s' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-white/50 backdrop-blur-sm border border-black/10 rounded-lg"
                >
                  <div className="text-2xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-black/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Overview */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-black/2">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black text-black mb-4">Powerful Features</h2>
              <p className="text-xl text-black/60">Everything you need to master document intelligence</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Brain,
                  title: 'AI-Powered Analysis',
                  description: 'Advanced NLP and machine learning algorithms understand your documents like never before.',
                  color: 'from-black/10 to-black/5',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Process documents in milliseconds with our optimized infrastructure.',
                  color: 'from-black/10 to-black/5',
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Bank-level encryption and compliance with GDPR, HIPAA, and SOC 2.',
                  color: 'from-black/10 to-black/5',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className={`p-8 bg-gradient-to-br ${feature.color} border border-black/10 rounded-2xl backdrop-blur-sm cursor-pointer`}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mb-4"
                  >
                    <feature.icon className="w-12 h-12 text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-black/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Model 1: Smart Categorization */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full w-fit">
                  <FileText className="w-4 h-4 text-black" />
                  <span className="text-sm font-semibold text-black">Model 1</span>
                </div>
                <h2 className="text-5xl font-black text-black leading-tight">
                  Smart Document
                  <span className="block text-black/60">Categorization</span>
                </h2>
                <p className="text-lg text-black/60 leading-relaxed">
                  Our intelligent classification engine automatically organizes your documents into Medical, Financial, Legal, and Personal categories with 99.8% accuracy.
                </p>
                <ul className="space-y-3">
                  {[
                    'Automatic category detection',
                    'Multi-label classification',
                    'Custom category support',
                    'Real-time processing',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-black/70"
                    >
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96"
              >
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl border border-black/20"
                />
                <div className="absolute inset-4 bg-white border border-black/10 rounded-xl p-6 space-y-4">
                  {['Medical', 'Financial', 'Legal', 'Personal'].map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 bg-black/5 rounded-lg border border-black/10"
                    >
                      <span className="font-semibold text-black">{cat}</span>
                      <motion.div
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                        className="w-20 h-1 bg-black rounded-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Model 2: Text Extraction & OCR */}
        <section className="py-20 px-6 bg-black/2">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Visual */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96 order-2 lg:order-1"
              >
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl border border-black/20"
                />
                <div className="absolute inset-4 bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-center space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, width: '0%' }}
                      whileInView={{ opacity: 1, width: `${70 + Math.random() * 30}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="h-2 bg-black/20 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 lg:order-2"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full w-fit">
                  <Zap className="w-4 h-4 text-black" />
                  <span className="text-sm font-semibold text-black">Model 2</span>
                </div>
                <h2 className="text-5xl font-black text-black leading-tight">
                  Advanced Text
                  <span className="block text-black/60">Extraction & OCR</span>
                </h2>
                <p className="text-lg text-black/60 leading-relaxed">
                  Extract text from scanned documents, images, and PDFs with precision. Our OCR technology handles multiple languages and complex layouts.
                </p>
                <ul className="space-y-3">
                  {[
                    'Multi-language support',
                    'Handwriting recognition',
                    'Table detection & extraction',
                    'Metadata preservation',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-black/70"
                    >
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Model 3: Intelligent Insights */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 border border-black/10 rounded-full w-fit">
                  <BarChart3 className="w-4 h-4 text-black" />
                  <span className="text-sm font-semibold text-black">Model 3</span>
                </div>
                <h2 className="text-5xl font-black text-black leading-tight">
                  Intelligent Data
                  <span className="block text-black/60">Extraction & Insights</span>
                </h2>
                <p className="text-lg text-black/60 leading-relaxed">
                  Automatically extract key information like dates, amounts, IDs, and entities. Get actionable insights from your document collection.
                </p>
                <ul className="space-y-3">
                  {[
                    'Entity recognition',
                    'Key-value extraction',
                    'Trend analysis',
                    'Custom field mapping',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-black/70"
                    >
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96"
              >
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl border border-black/20"
                />
                <div className="absolute inset-4 bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-center items-center space-y-4">
                  <div className="flex items-end justify-center space-x-2 w-full h-32">
                    {[40, 60, 80, 50, 90, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: '0%' }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        animate={{ height: `${height}%` }}
                        className="flex-1 bg-black/30 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-black/60">Analytics Dashboard</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-black text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-5xl font-black leading-tight">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-xl text-white/70">
              Join thousands of organizations using DocuSort AI to streamline their document workflows.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg flex items-center justify-center space-x-2 mx-auto hover:bg-white/90 transition-colors"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white border-t border-black/10 py-12 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {[
                { title: 'Product', items: ['Features', 'Pricing', 'Security'] },
                { title: 'Company', items: ['About', 'Blog', 'Careers'] },
                { title: 'Resources', items: ['Docs', 'API', 'Support'] },
                { title: 'Legal', items: ['Privacy', 'Terms', 'Contact'] },
              ].map((col, i) => (
                <div key={i}>
                  <h3 className="font-bold text-black mb-4">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item, j) => (
                      <li key={j}>
                        <a href="#" className="text-black/60 hover:text-black transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-black/10 pt-8 flex justify-between items-center">
              <p className="text-black/60">© 2024 DocuSort AI. All rights reserved.</p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social, i) => (
                  <a key={i} href="#" className="text-black/60 hover:text-black transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;
