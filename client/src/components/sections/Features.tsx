import { 
  Zap, 
  Shield, 
  Headphones 
} from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-2xl text-primary" />,
      title: "Kecepatan Tinggi",
      description: "Nikmati kecepatan download dan upload yang stabil hingga 1 Gbps dengan teknologi fiber optic terkini."
    },
    {
      icon: <Shield className="text-2xl text-primary" />,
      title: "Koneksi Stabil",
      description: "Infrastruktur jaringan kami dirancang untuk memberikan koneksi yang stabil bahkan pada jam sibuk."
    },
    {
      icon: <Headphones className="text-2xl text-primary" />,
      title: "Dukungan 24/7",
      description: "Tim dukungan pelanggan kami siap membantu Anda kapan saja dengan respons cepat dan solusi tepat."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Mengapa Memilih LINTAS FIBER?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan layanan internet fiber optic dengan kualitas terbaik dan dukungan pelanggan 24/7 untuk memastikan Anda selalu terhubung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
