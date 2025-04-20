import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type PackageFeature = {
  text: string;
  included: boolean;
};

type Package = {
  name: string;
  description: string;
  price: string;
  speed: string;
  featured: boolean;
  features: PackageFeature[];
  buttonText: string;
  popular?: boolean;
};

const PackageCard = ({ pkg }: { pkg: Package }) => {
  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition duration-300 ${pkg.featured ? 'border-2 border-[#FF6B00] transform md:-translate-y-4' : 'border border-gray-100'}`}>
      <CardHeader className={`p-0 ${pkg.featured ? 'bg-[#FF6B00]' : 'bg-primary'} py-6 px-4 text-center relative`}>
        {pkg.popular && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
            TERPOPULER
          </div>
        )}
        <h3 className="font-heading font-bold text-2xl text-white">{pkg.name}</h3>
        <p className="text-white text-opacity-90">{pkg.description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <p className={`text-5xl font-heading font-bold ${pkg.featured ? 'text-[#FF6B00]' : 'text-primary'}`}>
            {pkg.price}<span className="text-base font-normal text-gray-600">/bulan</span>
          </p>
          <p className="text-gray-500 mt-2">Kecepatan hingga {pkg.speed}</p>
        </div>
        <div className="space-y-3 mb-8">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {feature.included ? (
                <Check className="text-green-500 mr-3" size={18} />
              ) : (
                <X className="text-gray-400 mr-3" size={18} />
              )}
              <span className={feature.included ? '' : 'text-gray-400'}>{feature.text}</span>
            </div>
          ))}
        </div>
        <a href="#contact">
          <Button 
            className={`w-full ${pkg.featured ? 'bg-[#FF6B00]' : 'bg-primary'} hover:bg-opacity-90 text-white rounded-full font-heading font-medium transition duration-300`}
          >
            {pkg.buttonText}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

const Packages = () => {
  const packages: Package[] = [
    {
      name: "Paket Reguler",
      description: "Untuk penggunaan harian",
      price: "Rp 350k",
      speed: "50 Mbps",
      featured: false,
      features: [
        { text: "50 Mbps Download / 25 Mbps Upload", included: true },
        { text: "Unlimited Kuota", included: true },
        { text: "Router WiFi Gratis", included: true },
        { text: "Instalasi Gratis", included: true },
        { text: "IP Statis", included: false },
      ],
      buttonText: "Berlangganan"
    },
    {
      name: "Paket Premium",
      description: "Ideal untuk keluarga",
      price: "Rp 499k",
      speed: "100 Mbps",
      featured: true,
      popular: true,
      features: [
        { text: "100 Mbps Download / 50 Mbps Upload", included: true },
        { text: "Unlimited Kuota", included: true },
        { text: "Router WiFi Mesh Gratis", included: true },
        { text: "Instalasi Gratis", included: true },
        { text: "Prioritas Support 24/7", included: true },
      ],
      buttonText: "Berlangganan"
    },
    {
      name: "Paket Bisnis",
      description: "Untuk kebutuhan bisnis",
      price: "Rp 799k",
      speed: "200 Mbps",
      featured: false,
      features: [
        { text: "200 Mbps Download / 100 Mbps Upload", included: true },
        { text: "Unlimited Kuota", included: true },
        { text: "Router Enterprise Gratis", included: true },
        { text: "IP Statis", included: true },
        { text: "SLA dengan Uptime 99.9%", included: true },
      ],
      buttonText: "Berlangganan"
    }
  ];

  return (
    <section id="packages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Paket Internet LINTAS FIBER</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan internet Anda. Semua paket dilengkapi dengan instalasi gratis dan router WiFi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Butuh paket khusus untuk kebutuhan perusahaan besar?</p>
          <a 
            href="#contact" 
            className="text-primary hover:text-[#00BFFF] font-medium inline-flex items-center transition duration-300"
          >
            <span>Hubungi tim enterprise kami</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;
