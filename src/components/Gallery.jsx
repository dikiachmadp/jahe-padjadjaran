import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

const galleryImages = [
    '/img1.jpeg',
    '/img2.jpeg',
    '/img3.jpeg',
    '/img4.jpeg',
    '/img5.jpeg',
    '/img6.jpeg',
    '/img7.jpeg',
    '/img8.jpeg'
];

const Gallery = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const { t } = useLanguage();
    const [currentImage, setCurrentImage] = useState(6); // Start with img7 (index 6)

    return (
        <section id="gallery" className="py-16 md:py-20 bg-gradient-to-b from-warmth-50 to-white overflow-x-hidden">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
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

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="aspect-[4/3] md:aspect-[3/2] bg-gradient-to-br from-heritage-50 to-white rounded-3xl shadow-2xl overflow-hidden group cursor-pointer hover:shadow-3xl transition-all duration-500 mx-auto max-w-4xl w-full">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    src={galleryImages[currentImage]}
                                    alt={`Gallery image ${currentImage + 1}`}
                                    className="w-full h-full object-cover transition-all duration-500"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Thumbnails */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryImages.map((image, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`group relative w-full aspect-square rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-4 ${currentImage === index
                                        ? 'border-warmth-500 shadow-2xl scale-105'
                                        : 'border-transparent hover:border-warmth-300 hover:scale-105'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                                    />
                                    {currentImage === index && (
                                        <div className="absolute inset-0 bg-warmth-500/20 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-warmth-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;

