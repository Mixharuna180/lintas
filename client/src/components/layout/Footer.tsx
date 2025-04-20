import { Link } from 'wouter';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  CreditCard,
  Wallet
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl leading-tight">LINTAS FIBER</h2>
                <p className="text-xs text-gray-400">PT. LINTAS FIBER NUSANTARA</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Penyedia layanan internet fiber optic terpercaya di Indonesia dengan jangkauan luas dan layanan berkualitas.
            </p>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Metode Pembayaran:</span>
              <div className="flex space-x-2">
                <CreditCard className="text-gray-400" size={18} />
                <CreditCard className="text-gray-400" size={18} />
                <Wallet className="text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><a href="#packages" className="text-gray-400 hover:text-white transition duration-300">Paket Reguler</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-white transition duration-300">Paket Premium</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-white transition duration-300">Paket Bisnis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Layanan Enterprise</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Dedicated Internet</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Solusi Jaringan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Data Center</a></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Link Penting</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Beranda</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">Tentang Kami</a></li>
              <li><a href="#coverage" className="text-gray-400 hover:text-white transition duration-300">Area Layanan</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Karir</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Berita & Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="mt-1 mr-3 text-[#00BFFF]" size={18} />
                <span className="text-gray-400">
                  Gedung LINTAS Tower, Lantai 18<br/>
                  Jl. Jendral Sudirman Kav. 52-53<br/>
                  Jakarta Selatan, 12190
                </span>
              </li>
              <li className="flex">
                <Phone className="mt-1 mr-3 text-[#00BFFF]" size={18} />
                <span className="text-gray-400">0800-1234-5678 (24/7)</span>
              </li>
              <li className="flex">
                <Mail className="mt-1 mr-3 text-[#00BFFF]" size={18} />
                <span className="text-gray-400">info@lintasfiber.id</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-3">Download Aplikasi Kami</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition duration-300 flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <span className="text-sm">Google Play</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition duration-300 flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span className="text-sm">App Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2023 PT. LINTAS FIBER NUSANTARA. Hak Cipta Dilindungi.</p>
            <div className="mt-4 md:mt-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/KOMINFO_Logo.svg/1200px-KOMINFO_Logo.svg.png" 
                alt="Terdaftar di Kementerian Komunikasi dan Informatika RI" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
