import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useScroll } from '@/lib/hooks/use-scroll';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrolled = useScroll(50);
  const { user } = useAuth();
  const [_, navigate] = useLocation();

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-primary leading-tight">LINTAS FIBER</h1>
                <p className="text-xs text-gray-500">PT. LINTAS FIBER NUSANTARA</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="font-heading font-medium text-primary hover:text-[#00BFFF] transition duration-300">Beranda</a>
            <a href="#packages" className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300">Paket</a>
            <a href="#coverage" className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300">Area Layanan</a>
            <a href="#about" className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300">Tentang Kami</a>
            <a href="#faq" className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300">FAQ</a>
            <a href="#contact" className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300">Kontak</a>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button className="bg-[#FF6B00] hover:bg-opacity-90 text-white rounded-full">
                Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full z-50 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-4 py-4">
              <a 
                href="#home" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-primary hover:text-[#00BFFF] transition duration-300"
              >
                Beranda
              </a>
              <a 
                href="#packages" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300"
              >
                Paket
              </a>
              <a 
                href="#coverage" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300"
              >
                Area Layanan
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300"
              >
                Tentang Kami
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300"
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading font-medium text-gray-700 hover:text-[#00BFFF] transition duration-300"
              >
                Kontak
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#FF6B00] hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-heading font-medium transition duration-300 text-center"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
