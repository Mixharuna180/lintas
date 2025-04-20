import { 
  Eye, 
  Target,
  Gem,
  Handshake,
  Lightbulb,
  Users
} from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl text-primary mb-6">
              Tentang PT. LINTAS FIBER NUSANTARA
            </h2>
            <p className="text-gray-600 mb-4">
              PT. LINTAS FIBER NUSANTARA adalah penyedia layanan internet fiber optic terkemuka di Indonesia yang berdedikasi untuk memberikan koneksi cepat, stabil, dan terjangkau bagi pelanggan rumahan dan bisnis.
            </p>
            <p className="text-gray-600 mb-4">
              Berdiri sejak tahun 2015, kami telah melayani ribuan pelanggan di berbagai kota di Indonesia dengan infrastruktur jaringan fiber optic modern dan layanan pelanggan profesional.
            </p>
            <p className="text-gray-600 mb-6">
              Misi kami adalah menghubungkan seluruh Indonesia dengan internet berkualitas tinggi yang mendukung pertumbuhan digital dan meningkatkan produktivitas.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mt-1">
                  <Eye className="text-primary" size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="font-heading font-semibold text-lg">Visi</h3>
                  <p className="text-gray-600">
                    Menjadi penyedia layanan internet terpercaya dan terdepan di Indonesia dengan jaringan yang luas dan layanan berkualitas.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mt-1">
                  <Target className="text-primary" size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="font-heading font-semibold text-lg">Misi</h3>
                  <p className="text-gray-600">
                    Menyediakan layanan internet yang cepat, stabil, dan terjangkau dengan dukungan pelanggan terbaik untuk mendorong pertumbuhan digital Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Team LINTAS FIBER" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary rounded-lg p-6 shadow-lg max-w-xs">
              <div className="text-white">
                <div className="font-heading font-bold text-2xl mb-2">7+ Tahun</div>
                <p>Pengalaman menyediakan layanan internet berkualitas di Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-heading font-bold text-2xl text-primary mb-8 text-center">
            Nilai-Nilai Perusahaan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Gem className="text-primary" size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2">Kualitas</h4>
              <p className="text-gray-600">
                Kami berkomitmen untuk memberikan layanan dan produk berkualitas tinggi yang memenuhi ekspektasi pelanggan.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Handshake className="text-primary" size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2">Integritas</h4>
              <p className="text-gray-600">
                Kami menjunjung tinggi kejujuran, transparansi, dan etika dalam setiap aspek bisnis kami.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-primary" size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2">Inovasi</h4>
              <p className="text-gray-600">
                Kami terus berinovasi untuk meningkatkan teknologi dan layanan kami guna memberikan pengalaman terbaik.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary" size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2">Kepuasan Pelanggan</h4>
              <p className="text-gray-600">
                Kami menempatkan kepuasan pelanggan sebagai prioritas utama dalam setiap keputusan dan tindakan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
