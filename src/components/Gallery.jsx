import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { Check } from 'lucide-react';

const galleryImages = [
    '/img1.jpeg', '/img2.jpeg', '/img3.jpeg', '/img4.jpeg',
    '/img5.jpeg', '/img6.jpeg', '/img7.jpeg', '/img8.jpeg'
];

const Gallery = () => {
    const [ref, isVisible] = useScrollAnimation(0.15);
    const { t } = useLanguage();
    const [currentImage, setCurrentImage] = useState(6);

    // Variasi animasi untuk gambar utama
    const mainImageVariants = {
        initial: { opacity: 0, scale: 1.02, filter: 'blur(4px)' },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' }
    };

    return (
        <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-warmth-50 to-white overflow-hidden">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-warmth-100 text-warmth-700 rounded-full text-sm font-sans font-medium mb-4">
                        {t('gallery.badge', 'Gallery')}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-heritage-900 mb-6">
                        {t('gallery.title', 'Product Gallery')}
                    </h2>
                    <p className="text-lg md:text-xl text-heritage-700 max-w-3xl mx-auto font-body leading-relaxed px-4">
                        {t('gallery.description', 'Explore our premium ginger candy products in various presentations and packaging options.')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Main Image Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-2 lg:order-1 w-full"
                    >
                        <div className="relative aspect-[4/3] md:aspect-[3/2] bg-heritage-100 rounded-3xl shadow-2xl overflow-hidden group border-8 border-white">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    src={galleryImages[currentImage]}
                                    alt="Gallery Preview"
                                    variants={mainImageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Thumbnails Grid */}
                    <div className="order-1 lg:order-2">
                        <div className="grid grid-cols-4 gap-3 md:gap-4">
                            {galleryImages.map((image, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ transform: 'translateZ(0)' }}
                                    className={`relative aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-colors duration-300 border-2 ${currentImage === index
                                            ? 'border-warmth-500 ring-2 ring-warmth-500 ring-offset-2'
                                            : 'border-transparent hover:border-warmth-300'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-full h-full object-cover transition-all duration-500 ${currentImage === index ? 'scale-110 brightness-75' : 'hover:scale-110'
                                            }`}
                                    />
                                    {currentImage === index && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 flex items-center justify-center bg-warmth-600/20"
                                        >
                                            <div className="bg-warmth-500 p-1 rounded-full shadow-lg">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;