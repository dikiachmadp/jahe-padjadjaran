import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Product from './components/Product';
import Pricing from './components/Pricing';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

    // Set page title and meta description
    document.title = 'Permen Jahe Padjajaran';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'PT Padjajaran Pratama Wijaya - Produsen Permen Jahe Padjajaran, permen berbasis rempah alami berkualitas tinggi untuk kesehatan dan kenyamanan Anda.'
      );
    }
  }, []);

  return (
    <LanguageProvider>
      {/* overflow-x-hidden to prevent horizontal scroll */}
      <div className="relative overflow-x-hidden">
        <Header />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Product />
          <Pricing />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
