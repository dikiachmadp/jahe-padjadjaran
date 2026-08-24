import Pricing from '../components/Pricing';
import Partners from '../components/Partners';
import Contact from '../components/Contact';

/**
 * Halaman kemitraan.
 *
 * Komponen Pricing sebelumnya diimpor di App.jsx tapi tidak pernah dirender,
 * sehingga skema harga mitra — konten paling bernilai untuk calon distributor —
 * tidak pernah terlihat oleh siapa pun. Di sini konten itu mendapat URL sendiri.
 */
const PartnershipPage = () => (
  <div className="pt-20">
    <Pricing />
    <Partners />
    <Contact />
  </div>
);

export default PartnershipPage;
