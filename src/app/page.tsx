"use client";

import { motion } from "framer-motion";
import { Music, Users, Heart, Camera, Play, ImageIcon, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";

// Componente de estrellas animadas - Memoizado para optimización
const AnimatedStars = memo(() => {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      }));
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 12000); // Aumentamos el intervalo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
      ))}
    </div>
  );
});

// Agregar displayName
AnimatedStars.displayName = 'AnimatedStars';

// Componente de notas musicales flotantes
const FloatingNotes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-300/20 text-2xl"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          ♪
        </motion.div>
      ))}
    </div>
  );
};

// Componente de ondas de sonido
const SoundWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute border border-purple-400/10 rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: '50%',
            top: '50%',
            marginLeft: `${-100 - i * 50}px`,
            marginTop: `${-100 - i * 50}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

// Componente de partículas musicales para secciones
const MusicParticles = ({ density = 8 }: { density?: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: density }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-300/10 text-xl"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            x: [-5, 5, -5],
            rotate: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        >
          {i % 4 === 0 ? '♪' : i % 4 === 1 ? '♫' : i % 4 === 2 ? '♬' : '♭'}
        </motion.div>
      ))}
    </div>
  );
};

// Componente de estrellas para sección "Quiénes Somos"
const AboutStars = () => {
  // Posiciones fijas predefinidas para evitar hydration mismatch
  const starPositions = [
    { x: 15, y: 20 }, { x: 85, y: 35 }, { x: 25, y: 70 }, { x: 75, y: 15 },
    { x: 45, y: 45 }, { x: 10, y: 80 }, { x: 90, y: 60 }, { x: 35, y: 25 },
    { x: 65, y: 85 }, { x: 5, y: 40 }, { x: 95, y: 75 }, { x: 55, y: 10 },
    { x: 20, y: 90 }, { x: 80, y: 50 }, { x: 50, y: 65 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {starPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 text-2xl font-bold"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0],
            scale: [0, 1, 1.5, 0],
            rotate: [0, 180, 360],
            y: [0, -50, -100],
            x: [0, (i % 3 - 1) * 20, (i % 5 - 2) * 40],
          }}
          transition={{
            duration: 4 + (i % 3) * 0.5,
            repeat: Infinity,
            repeatDelay: (i % 4) * 0.8,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        >
          ⚡
        </motion.div>
      ))}
    </div>
  );
};

// Componente de punticos para sección "Galería"
const GalleryDots = () => {
  // Posiciones fijas predefinidas para evitar hydration mismatch
  const dotPositions = [
    { x: 12, y: 18 }, { x: 88, y: 32 }, { x: 35, y: 75 }, { x: 68, y: 12 },
    { x: 22, y: 55 }, { x: 78, y: 85 }, { x: 45, y: 25 }, { x: 15, y: 90 },
    { x: 85, y: 45 }, { x: 52, y: 65 }, { x: 8, y: 40 }, { x: 92, y: 70 },
    { x: 38, y: 15 }, { x: 65, y: 92 }, { x: 28, y: 35 }, { x: 72, y: 58 },
    { x: 18, y: 78 }, { x: 82, y: 22 }, { x: 48, y: 88 }, { x: 58, y: 48 },
    { x: 32, y: 62 }, { x: 75, y: 28 }, { x: 25, y: 82 }, { x: 88, y: 8 },
    { x: 42, y: 95 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {dotPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-lg"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0.5, 0],
            scale: [0, 1, 2, 0],
            y: [0, -30, -60, -90],
            x: [0, (i % 3 - 1) * 10, (i % 5 - 2) * 20],
          }}
          transition={{
            duration: 3 + (i % 4) * 0.4,
            repeat: Infinity,
            repeatDelay: (i % 3) * 0.7,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Componente de burbujas para sección "Contactos"
const ContactBubbles = () => {
  // Configuraciones fijas predefinidas para evitar hydration mismatch
  const bubbleConfigs = [
    { x: 15, y: 25, size: 35 }, { x: 75, y: 60, size: 28 }, { x: 35, y: 15, size: 42 },
    { x: 85, y: 80, size: 31 }, { x: 25, y: 70, size: 38 }, { x: 65, y: 35, size: 26 },
    { x: 45, y: 85, size: 44 }, { x: 90, y: 45, size: 33 }, { x: 10, y: 55, size: 29 },
    { x: 55, y: 20, size: 37 }, { x: 80, y: 75, size: 40 }, { x: 30, y: 90, size: 32 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {bubbleConfigs.map((config, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-cyan-400 rounded-full shadow-lg"
          style={{
            width: `${config.size}px`,
            height: `${config.size}px`,
            left: `${config.x}%`,
            top: `${config.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.4, 0],
            scale: [0, 1, 1.5, 0],
            y: [0, -40, -80, -120],
            x: [0, (i % 3 - 1) * 7.5, (i % 5 - 2) * 15],
          }}
          transition={{
            duration: 5 + (i % 3) * 0.7,
            repeat: Infinity,
            repeatDelay: (i % 5) * 0.8,
            delay: i * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Componente de ondas tipo tambor para el logo con efecto "bum bum" - Memoizado
const DrumWaves = memo(({ trigger }: { trigger: boolean }) => {
  // Detectar si es móvil para reducir la intensidad
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Primera onda - BUM (optimizada para móviles) */}
      {Array.from({ length: isMobile ? 2 : 3 }, (_, i) => (
        <motion.div
          key={`first-${i}`}
          className="absolute border-2 border-purple-400/40 rounded-full"
          style={{
            width: isMobile ? '100px' : '150px',
            height: isMobile ? '100px' : '150px',
            transform: 'translate3d(0, 0, 0)', // Activar GPU
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={trigger ? {
            scale: [0, isMobile ? 1.2 + i * 0.2 : 1.5 + i * 0.3, isMobile ? 1.8 + i * 0.3 : 2.5 + i * 0.5],
            opacity: [0.6, 0.4, 0],
            borderWidth: [2, 1, 0],
          } : {}}
          transition={{
            duration: isMobile ? 0.5 : 0.8,
            ease: "easeOut",
            delay: i * 0.05
          }}
        />
      ))}
      
      {/* Segunda onda - BUM (más ligera en móviles) */}
      {Array.from({ length: isMobile ? 2 : 4 }, (_, i) => (
        <motion.div
          key={`second-${i}`}
          className="absolute border-2 border-pink-400/30 rounded-full"
          style={{
            width: isMobile ? '120px' : '180px',
            height: isMobile ? '120px' : '180px',
            transform: 'translate3d(0, 0, 0)', // Activar GPU
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={trigger ? {
            scale: [0, isMobile ? 1.4 + i * 0.2 : 2 + i * 0.4, isMobile ? 2.2 + i * 0.3 : 4 + i * 0.6],
            opacity: [0.5, 0.3, 0],
            borderWidth: [2, 0.5, 0],
          } : {}}
          transition={{
            duration: isMobile ? 0.8 : 1.2,
            ease: "easeOut",
            delay: 0.2 + i * 0.06
          }}
        />
      ))}
      
      {/* Ondas de impacto simplificadas para móviles */}
      {!isMobile && Array.from({ length: 2 }, (_, i) => (
        <motion.div
          key={`impact-${i}`}
          className="absolute border-1 border-white/30 rounded-full"
          style={{
            width: '120px',
            height: '120px',
            transform: 'translate3d(0, 0, 0)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={trigger ? {
            scale: [0, 2.5 + i, 4 + i],
            opacity: [0.4, 0.2, 0],
            borderWidth: [1, 0.5, 0],
          } : {}}
          transition={{
            duration: 1.2,
            ease: "easeOut", 
            delay: 0.4 + i * 0.15
          }}
        />
      ))}
    </div>
  );
});

// Agregar displayName para el componente memoizado
DrumWaves.displayName = 'DrumWaves';

// Componente Modal independiente y memoizado para evitar re-renders
const ContractModal = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica de envío del formulario
    console.log('Formulario enviado');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-purple-500/20 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Contratar Nova Vox</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Nombre *</label>
            <input
              type="text"
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Correo Electrónico *</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Número de Teléfono *</label>
            <input
              type="tel"
              placeholder="Ej: +57 300 123 4567"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Asunto *</label>
            <input
              type="text"
              placeholder="Tipo de evento o colaboración"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Mensaje *</label>
            <textarea
              rows={4}
              placeholder="Cuéntanos los detalles del evento: fecha, lugar, duración, tipo de presentación, etc."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
              required
            ></textarea>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold text-lg"
            >
              Enviar Solicitud
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
});

// Agregar displayName para el componente memoizado
ContractModal.displayName = 'ContractModal';

// Tipo para el contenido del modal de galería
interface GalleryModalContent {
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
}

// Props del modal de galería
interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: GalleryModalContent | null;
}

// Componente Modal de Galería - Memoizado para optimización
const GalleryModal = memo<GalleryModalProps>(({ isOpen, onClose, content }) => {
  // Manejar tecla ESC para cerrar
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    // Solo cerrar si se hace click en el backdrop, no en el contenido
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen || !content) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-6xl max-h-[95vh] w-full flex flex-col cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar mejorado */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">{content.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-black/50 hover:bg-red-600/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 hover:scale-110 border border-white/20 hover:border-red-400"
              title="Cerrar (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="flex-1 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
          {content.type === 'image' ? (
            <div className="relative w-full h-full max-h-[80vh] rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src={content.src}
                alt={content.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-xl"
                unoptimized={true}
              />
            </div>
          ) : (
            <div className="w-full h-full max-h-[80vh] rounded-xl overflow-hidden">
              <video
                src={content.src}
                controls
                autoPlay
                className="w-full h-full object-contain rounded-xl"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          )}
        </div>

        {/* Instrucciones de navegación */}
        <div className="text-center mt-4">
          <p className="text-white/60 text-sm">
            Presiona <kbd className="bg-white/20 px-2 py-1 rounded text-xs">ESC</kbd> o haz click fuera para cerrar
          </p>
        </div>
      </motion.div>
    </div>
  );
});

// Agregar displayName para el componente memoizado
GalleryModal.displayName = 'GalleryModal';

export default function Home() {
  const [drumTrigger, setDrumTrigger] = useState(false);
  const [logoBumBum, setLogoBumBum] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean;
    content: GalleryModalContent | null;
  }>({
    isOpen: false,
    content: null
  });
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openGalleryModal = useCallback((content: GalleryModalContent) => {
    setGalleryModal({
      isOpen: true,
      content: content
    });
  }, []);

  const closeGalleryModal = useCallback(() => {
    setGalleryModal({
      isOpen: false,
      content: null
    });
  }, []);

  const triggerDrumWaves = useCallback(() => {
    // Solo activar efectos si el modal no está abierto
    if (!isModalOpen) {
      setDrumTrigger(true);
      setTimeout(() => setDrumTrigger(false), 2000);
      
      setLogoBumBum(true);
      setTimeout(() => setLogoBumBum(false), 1000);
    }
  }, [isModalOpen]);

  // Efecto de rebote automático - pausado cuando el modal está abierto
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const intervalTime = isMobile ? 8000 : 6000; // Aumentamos el tiempo entre animaciones
    
    const interval = setInterval(() => {
      // Solo ejecutar si el modal no está abierto
      if (!isModalOpen) {
        triggerDrumWaves();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isModalOpen, triggerDrumWaves]); // Agregar isModalOpen como dependencia

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background dinámico animado */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "linear-gradient(45deg, #1e1b4b, #581c87, #1e3a8a)",
              "linear-gradient(135deg, #581c87, #1e3a8a, #1e1b4b)",
              "linear-gradient(225deg, #1e3a8a, #1e1b4b, #581c87)",
              "linear-gradient(315deg, #1e1b4b, #581c87, #1e3a8a)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 60% 30%, #a855f7 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-900/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer relative"
                onClick={triggerDrumWaves}
              >
                <Image
                  src="/logo.jpeg"
                  alt="Nova Vox Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
                <DrumWaves trigger={drumTrigger} />
              </div>
              <span className="text-white font-bold text-xl">Nova Vox</span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('quienes-somos')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Quiénes Somos
              </button>
              <button 
                onClick={() => scrollToSection('galeria')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Galería
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 z-10">
        {/* Animaciones de fondo */}
        <AnimatedStars />
        <FloatingNotes />
        <SoundWaves />
        
        {/* Elementos de fondo originales mejorados */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            animate={{
              background: [
                "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
              ],
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
            animate={{
              background: [
                "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)"
              ],
              scale: [1, 1.1, 1],
              x: [0, -15, 0],
              y: [0, 15, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="mb-8 relative"
          >
            <motion.div 
              className="w-48 h-48 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden cursor-pointer"
              animate={{
                background: [
                  "linear-gradient(45deg, #a855f7, #ec4899)",
                  "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  "linear-gradient(225deg, #8b5cf6, #a855f7)",
                  "linear-gradient(315deg, #a855f7, #ec4899)"
                ],
                boxShadow: [
                  "0 0 30px rgba(168,85,247,0.5)",
                  "0 0 40px rgba(236,72,153,0.6)",
                  "0 0 35px rgba(139,92,246,0.5)",
                  "0 0 30px rgba(168,85,247,0.5)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              onClick={triggerDrumWaves}
            >
              <motion.div
                animate={logoBumBum ? {
                  rotate: 360,
                  scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 
                    [1, 1.15, 0.95, 1.1, 1] : // Móvil: animación más suave
                    [1, 1.3, 0.9, 1.2, 1],   // Desktop: animación completa
                } : { 
                  rotate: 360 
                }}
                transition={logoBumBum ? {
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { 
                    duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.6, 
                    ease: "easeOut" 
                  }
                } : { 
                  duration: 20, repeat: Infinity, ease: "linear" 
                }}
                className="relative"
                style={{ transform: 'translate3d(0, 0, 0)' }} // GPU acceleration
              >
                <motion.div
                  animate={logoBumBum ? {
                    filter: typeof window !== 'undefined' && window.innerWidth < 768 ? 
                      [ // Móvil: efectos más ligeros
                        "brightness(1) saturate(1)",
                        "brightness(1.2) saturate(1.1)",
                        "brightness(1.05) saturate(1.05)",
                        "brightness(1.15) saturate(1.08)",
                        "brightness(1) saturate(1)"
                      ] : 
                      [ // Desktop: efectos completos
                        "brightness(1) saturate(1)",
                        "brightness(1.4) saturate(1.3)",
                        "brightness(1.1) saturate(1.1)",
                        "brightness(1.3) saturate(1.2)",
                        "brightness(1) saturate(1)"
                      ]
                  } : {}}
                  transition={logoBumBum ? {
                    duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.6,
                    ease: "easeOut"
                  } : {}}
                  style={{ transform: 'translate3d(0, 0, 0)' }} // GPU acceleration
                >
                  <Image
                    src="/logo.jpeg"
                    alt="Nova Vox Logo"
                    width={120}
                    height={120}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </motion.div>
              </motion.div>
              
              {/* Animación de ondas tipo tambor */}
              <DrumWaves trigger={drumTrigger} />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-7xl md:text-8xl font-bold text-white mb-4 tracking-wider"
          >
            NOVA VOX
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl text-purple-200 mb-12 max-w-2xl mx-auto"
          >
            Donde las voces se encuentran con la innovación
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection('galeria')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Escucha Nuestra Música
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              onClick={() => scrollToSection('quienes-somos')}
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
            >
              Conoce Más
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Sección Quiénes Somos */}
      <section id="quienes-somos" className="py-20 px-4 relative overflow-hidden">
        {/* Animación de estrellas */}
        <AboutStars />
        
        {/* Background dinámico */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e1b4b 100%)",
              "linear-gradient(225deg, #581c87 0%, #1e1b4b 50%, #1e3a8a 100%)",
              "linear-gradient(315deg, #1e1b4b 0%, #1e3a8a 50%, #1e293b 100%)",
              "linear-gradient(45deg, #1e3a8a 0%, #1e293b 50%, #581c87 100%)"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Partículas musicales */}
        <MusicParticles density={6} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Quiénes <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Somos</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Información de la banda */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6">Nova Vox</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Somos un colectivo musical que nació de la pasión compartida por crear sonidos que 
                trascienden fronteras. Nuestro género principal es el <span className="text-purple-400 font-semibold">Pop Alternativo</span> con influencias de 
                rock, indie y elementos electrónicos.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Desde nuestros inicios, hemos creído que la música es el lenguaje universal que conecta 
                almas y Nova Vox es nuestro vehículo para llevar esas conexiones a cada rincón del 
                mundo.
              </p>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/30 mt-8">
                <blockquote className="text-lg text-purple-200 italic">
                  &ldquo;No solo creamos música, <span className="text-purple-400">creamos experiencias que despiertan el alma</span>&rdquo;
                </blockquote>
              </div>
            </motion.div>

            {/* Cards de características */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-4">Talento Unificado</h4>
                </div>
                <p className="text-gray-400">
                  Tres voces, una sola alma musical que trasciende géneros y emociones.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-4">Pasión Auténtica</h4>
                </div>
                <p className="text-gray-400">
                  Cada nota nace del corazón, cada melodía cuenta una historia única.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-4">Sonido Innovador</h4>
                </div>
                <p className="text-gray-400">
                  Fusionamos lo clásico con lo contemporáneo para crear algo completamente nuevo.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-purple-500/20"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">7</div>
              <div className="text-gray-400 text-sm">Integrantes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">1</div>
              <div className="text-gray-400 text-sm">Años Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-gray-400 text-sm">Presentaciones</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm">Pasión Musical</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Galería */}
      <section id="galeria" className="py-20 px-4 relative overflow-hidden">
        {/* Animación de punticos */}
        <GalleryDots />
        
        {/* Background dinámico con tema musical */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #000000 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%)",
              "radial-gradient(circle at 70% 60%, #0f0f23 0%, #16213e 30%, #1a1a2e 60%, #000000 100%)",
              "radial-gradient(circle at 50% 20%, #1a1a2e 0%, #000000 30%, #16213e 60%, #0f0f23 100%)",
              "radial-gradient(circle at 20% 80%, #16213e 0%, #0f0f23 30%, #000000 60%, #1a1a2e 100%)"
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Efectos de luces como en un concierto */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: '150px',
              height: '400px',
              left: `${20 + i * 30}%`,
              top: '-100px',
              filter: 'blur(40px)'
            }}
            animate={{
              background: [
                "linear-gradient(180deg, #a855f7 0%, transparent 70%)",
                "linear-gradient(180deg, #ec4899 0%, transparent 70%)",
                "linear-gradient(180deg, #8b5cf6 0%, transparent 70%)"
              ],
              opacity: [0.1, 0.3, 0.1],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Nuestra <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Galería</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-4">
              Momentos capturados, emociones preservadas. Descubre nuestro mundo a través 
              de imágenes y videos.
            </p>
            
            {/* Indicador específico para móviles */}
            <div className="md:hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-4 max-w-md mx-auto mt-6">
              <div className="flex items-center justify-center gap-2 text-purple-300 mb-2">
                <Play className="w-5 h-5 fill-current" />
                <span className="text-sm font-semibold">Para dispositivos móviles</span>
              </div>
              <p className="text-xs text-gray-300">
                👆 Toca las imágenes y videos para verlos en pantalla completa
              </p>
            </div>
          </motion.div>

          {/* Grid de Galería */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            {/* Imagen 1 - Image1.jpg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => openGalleryModal({
                type: 'image',
                src: '/Image1.jpg',
                alt: 'Nova Vox - Imagen 1',
                title: 'Nova Vox - Imagen 1'
              })}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl overflow-hidden">
                <Image 
                  src="/Image1.jpg" 
                  alt="Nova Vox - Imagen 1" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Nova Vox</p>
                  <p className="text-sm text-purple-200">Click para ampliar</p>
                </div>
              </div>
            </motion.div>

            {/* Video 1 - Prueba1.mp4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => openGalleryModal({
                type: 'video',
                src: '/Prueba1.mp4',
                alt: 'Nova Vox - Video Musical',
                title: 'Nova Vox - Video Musical'
              })}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-600 rounded-xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  preload="metadata"
                >
                  <source src="/Prueba1.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              
              {/* Overlay permanente para móviles con indicador de video */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                  <p className="text-lg font-semibold">Video Musical</p>
                  <p className="text-sm text-purple-200 md:hidden">👆 Toca para reproducir</p>
                  <p className="text-sm text-purple-200 hidden md:block">Click para reproducir</p>
                </div>
              </div>
            </motion.div>

            {/* Imagen 2 - Image2.jpg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => openGalleryModal({
                type: 'image',
                src: '/Image2.jpg',
                alt: 'Nova Vox - Imagen 2',
                title: 'Nova Vox - Detrás de Escena'
              })}
            >
              <div className="aspect-video bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl overflow-hidden">
                <Image 
                  src="/Image2.jpg" 
                  alt="Nova Vox - Imagen 2" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Detrás de Escena</p>
                  <p className="text-sm text-teal-200">Click para ampliar</p>
                </div>
              </div>
            </motion.div>

            {/* Video 2 - Prueba2.mp4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => openGalleryModal({
                type: 'video',
                src: '/Prueba2.mp4',
                alt: 'Nova Vox - Actuación en Vivo',
                title: 'Nova Vox - Actuación en Vivo'
              })}
            >
              <div className="aspect-video bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  preload="metadata"
                >
                  <source src="/Prueba2.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              
              {/* Overlay permanente para móviles con indicador de video */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold">Actuación en Vivo</p>
                  <p className="text-sm text-pink-200 md:hidden">👆 Toca para reproducir</p>
                  <p className="text-sm text-pink-200 hidden md:block">Click para reproducir</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Destacado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-2xl p-8 mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Video Destacado</h3>
              <p className="text-purple-200 text-lg">
                Nuestro último video musical que captura la esencia de Nova Vox. Una experiencia 
                audiovisual que no te puedes perder.
              </p>
            </div>
            
            <div 
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-500"
              onClick={() => openGalleryModal({
                type: 'video',
                src: '/VideoPrincipal.mp4',
                alt: 'Nova Vox - Video Principal',
                title: 'Nova Vox - Video Principal'
              })}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  preload="metadata"
                  poster="/Image1.jpg"
                >
                  <source src="/VideoPrincipal.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              
              {/* Overlay simplificado - solo para hover en desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              </div>
              
              {/* Información en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-2">Nova Vox - Video Principal</h4>
                  <p className="text-gray-300 text-sm md:hidden">👆 Toca para reproducir en pantalla completa</p>
                  <p className="text-gray-300 text-sm hidden md:block">Click para reproducir en pantalla completa</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-6">¿Quieres ver más contenido exclusivo?</p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
                Síguenos en Redes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="py-20 px-4 relative overflow-hidden">
        {/* Animación de burbujas */}
        <ContactBubbles />
        
        {/* Background dinámico final */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, #1e293b 0%, #581c87 25%, #1e3a8a 50%, #1e1b4b 75%, #1e293b 100%)",
              "linear-gradient(135deg, #581c87 0%, #1e3a8a 25%, #1e1b4b 50%, #1e293b 75%, #581c87 100%)",
              "linear-gradient(225deg, #1e3a8a 0%, #1e1b4b 25%, #1e293b 50%, #581c87 75%, #1e3a8a 100%)",
              "linear-gradient(315deg, #1e1b4b 0%, #1e293b 25%, #581c87 50%, #1e3a8a 75%, #1e1b4b 100%)"
            ]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Partículas finales */}
        <MusicParticles density={4} />
        
        {/* Ondas finales */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute border border-purple-400/20 rounded-full"
              style={{
                width: `${300 + i * 150}px`,
                height: `${300 + i * 150}px`,
                left: '50%',
                top: '50%',
                marginLeft: `${-150 - i * 75}px`,
                marginTop: `${-150 - i * 75}px`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Contáctanos
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              ¿Listo para una experiencia musical inolvidable? Ponte en contacto con nosotros 
              para eventos, colaboraciones o simplemente para decir hola.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Información de Contacto</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-purple-500/20">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Teléfono</h4>
                  <p className="text-gray-400 mb-1">+57 310 123 4567</p>
                  <p className="text-gray-500 text-sm">Llámanos para contrataciones</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-purple-500/20">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Email</h4>
                  <p className="text-gray-400 mb-1">info@novavox.music</p>
                  <p className="text-gray-500 text-sm">Escríbenos tus consultas</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-purple-500/20">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">Ubicación</h4>
                  <p className="text-gray-400 mb-1">Antioquia, Rionegro</p>
                  <p className="text-gray-500 text-sm">Disponibles para eventos</p>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="mt-12">
                <h4 className="text-xl font-bold text-white mb-6">Síguenos en Redes</h4>
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-shadow"
                  >
                    <Instagram className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm text-pink-100">@novavoxband</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 p-4 bg-blue-600 rounded-xl text-white hover:shadow-lg transition-shadow"
                  >
                    <Facebook className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Facebook</p>
                      <p className="text-sm text-blue-100">Nova Vox Oficial</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 p-4 bg-red-600 rounded-xl text-white hover:shadow-lg transition-shadow"
                  >
                    <Youtube className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">YouTube</p>
                      <p className="text-sm text-red-100">Nova Vox Music</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 p-4 bg-sky-500 rounded-xl text-white hover:shadow-lg transition-shadow"
                  >
                    <span className="w-6 h-6 flex items-center justify-center text-lg font-bold">𝕏</span>
                    <div>
                      <p className="font-semibold">Twitter</p>
                      <p className="text-sm text-sky-100">@novavoxmusic</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Llamada a Acción */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-center mt-12">
                <h4 className="text-2xl font-bold text-white mb-4">¿Listo para el Espectáculo?</h4>
                <p className="text-purple-100 mb-6">
                  Contacta con nosotros para eventos privados, conciertos y colaboraciones musicales.
                </p>
                <Button 
                  onClick={openModal}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
                >
                  Contratar Ahora
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-purple-900 text-white py-12 px-4 relative overflow-hidden">
        {/* Animaciones de fondo del footer - igual que logo principal */}
        <AnimatedStars />
        <FloatingNotes />
        <SoundWaves />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Music className="w-8 h-8 mr-3 text-purple-400" />
              <h3 className="text-2xl font-bold">NOVA VOX</h3>
            </div>
            <p className="text-purple-200 mb-6">
              Donde las voces se encuentran con la innovación
            </p>
            <p className="text-sm text-purple-300">
              © 2025 Nova Vox. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Modal de Contratación */}
      <ContractModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Modal de Galería */}
      <GalleryModal 
        isOpen={galleryModal.isOpen} 
        onClose={closeGalleryModal} 
        content={galleryModal.content} 
      />
    </div>
  );
}