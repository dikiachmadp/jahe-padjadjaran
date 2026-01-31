import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Product from './components/Product';
import Pricing from './components/Pricing';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
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
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <About />
        <Product />
        <Pricing />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
