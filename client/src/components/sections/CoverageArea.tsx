import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Input
} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Map
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

type CoverageStatus = 'available' | 'partial' | 'unavailable' | null;

interface CoverageResult {
  status: CoverageStatus;
  message: string;
}

const CoverageArea = () => {
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [coverageResult, setCoverageResult] = useState<CoverageResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Mock data for cities and districts
  const cities: Record<string, string[]> = {
    jakarta: ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur"],
    banten: ["Tangerang", "Tangerang Selatan", "Serang", "Cilegon"],
    jabar: ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi"],
    jateng: ["Semarang", "Solo", "Magelang", "Salatiga"],
    jatim: ["Surabaya", "Malang", "Kediri", "Sidoarjo"],
    bali: ["Denpasar", "Badung", "Gianyar", "Tabanan"]
  };

  const districts: Record<string, string[]> = {
    jakartaselatan: ["Kebayoran Baru", "Pancoran", "Mampang Prapatan", "Setiabudi", "Cilandak"],
    bandung: ["Coblong", "Cibeunying", "Sukajadi", "Cicendo"],
    surabaya: ["Gubeng", "Tegalsari", "Rungkut", "Kenjeran"],
    denpasar: ["Denpasar Barat", "Denpasar Timur", "Denpasar Selatan", "Denpasar Utara"]
  };

  const checkCoverageMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest(
        'GET', 
        `/api/coverage/check?province=${province}&city=${city}&district=${district}&postalCode=${postalCode}`,
        undefined
      );
      return res.json();
    },
    onSuccess: (data) => {
      setCoverageResult(data.coverage);
      setShowResult(true);
    },
    onError: (error) => {
      console.error("Error checking coverage", error);
      setCoverageResult(null);
      setShowResult(false);
    }
  });

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setCity("");
    setDistrict("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
  };

  const handleCheckCoverage = () => {
    if (!province || !postalCode) {
      alert("Silakan pilih provinsi dan masukkan kode pos untuk mengecek ketersediaan.");
      return;
    }
    
    checkCoverageMutation.mutate();
  };

  return (
    <section id="coverage" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Area Layanan</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            LINTAS FIBER terus memperluas jangkauan layanan di berbagai kota di Indonesia. Cek ketersediaan layanan di area Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden h-[400px] md:h-[500px] relative">
            <div className="absolute inset-0 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80" 
                alt="Coverage Map" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-30"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
                <h3 className="font-heading font-bold text-xl text-primary mb-4">Peta Interaktif Segera Hadir</h3>
                <p className="text-gray-600 mb-4">
                  Kami sedang mengembangkan peta interaktif untuk memudahkan Anda melihat area jangkauan LINTAS FIBER.
                </p>
                <a href="#coverage-check">
                  <Button className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-medium transition duration-300">
                    Cek Area Anda
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Coverage Check Form */}
          <div id="coverage-check">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Cek Ketersediaan Layanan</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="province" className="block mb-2 text-sm font-medium text-gray-700">
                      Provinsi
                    </label>
                    <Select value={province} onValueChange={handleProvinceChange}>
                      <SelectTrigger id="province">
                        <SelectValue placeholder="Pilih Provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                        <SelectItem value="banten">Banten</SelectItem>
                        <SelectItem value="jabar">Jawa Barat</SelectItem>
                        <SelectItem value="jateng">Jawa Tengah</SelectItem>
                        <SelectItem value="jatim">Jawa Timur</SelectItem>
                        <SelectItem value="bali">Bali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
                      Kota/Kabupaten
                    </label>
                    <Select 
                      value={city} 
                      onValueChange={handleCityChange}
                      disabled={!province}
                    >
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Pilih Kota/Kabupaten" />
                      </SelectTrigger>
                      <SelectContent>
                        {province && cities[province]?.map((cityName, index) => (
                          <SelectItem 
                            key={index} 
                            value={cityName.toLowerCase().replace(/\s/g, '')}
                          >
                            {cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-700">
                      Kecamatan
                    </label>
                    <Select 
                      value={district} 
                      onValueChange={setDistrict}
                      disabled={!city}
                    >
                      <SelectTrigger id="district">
                        <SelectValue placeholder="Pilih Kecamatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {city && districts[city]?.map((districtName, index) => (
                          <SelectItem 
                            key={index} 
                            value={districtName.toLowerCase().replace(/\s/g, '')}
                          >
                            {districtName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-gray-700">
                      Kode Pos
                    </label>
                    <Input
                      id="postal_code"
                      type="text"
                      placeholder="Contoh: 12345"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCheckCoverage}
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-lg font-medium transition duration-300 mt-2"
                    disabled={checkCoverageMutation.isPending}
                  >
                    {checkCoverageMutation.isPending ? "Memeriksa..." : "Cek Ketersediaan"}
                  </Button>
                </div>

                {/* Result Box */}
                {showResult && coverageResult && (
                  <div className={`mt-6 p-4 rounded-lg border ${
                    coverageResult.status === 'available' 
                      ? 'border-green-500 bg-green-500 bg-opacity-10' 
                      : coverageResult.status === 'partial' 
                        ? 'border-yellow-500 bg-yellow-500 bg-opacity-10' 
                        : 'border-red-500 bg-red-500 bg-opacity-10'
                  }`}>
                    <div className="flex items-center">
                      {coverageResult.status === 'available' ? (
                        <CheckCircle className="text-green-500 text-2xl mr-3" />
                      ) : coverageResult.status === 'partial' ? (
                        <AlertTriangle className="text-yellow-500 text-2xl mr-3" />
                      ) : (
                        <XCircle className="text-red-500 text-2xl mr-3" />
                      )}
                      <div>
                        <h4 className="font-medium">
                          {coverageResult.status === 'available' 
                            ? 'Layanan Tersedia!' 
                            : coverageResult.status === 'partial' 
                              ? 'Perlu Pengecekan Lanjutan' 
                              : 'Layanan Belum Tersedia'}
                        </h4>
                        <p className="text-sm">{coverageResult.message}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a href="#contact">
                        <Button className={`w-full ${
                          coverageResult.status === 'available' 
                            ? 'bg-green-500' 
                            : coverageResult.status === 'partial' 
                              ? 'bg-yellow-500' 
                              : 'bg-primary'
                        } text-white text-center py-2 rounded-lg hover:bg-opacity-90 transition duration-300`}>
                          {coverageResult.status === 'available' 
                            ? 'Berlangganan Sekarang' 
                            : coverageResult.status === 'partial' 
                              ? 'Ajukan Survei Lokasi' 
                              : 'Daftar Tunggu'}
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-primary text-4xl font-bold mb-2">10+</div>
            <p className="text-gray-600">Provinsi</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-primary text-4xl font-bold mb-2">50+</div>
            <p className="text-gray-600">Kota & Kabupaten</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-primary text-4xl font-bold mb-2">250+</div>
            <p className="text-gray-600">Kecamatan</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-primary text-4xl font-bold mb-2">10,000+</div>
            <p className="text-gray-600">Pelanggan Puas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageArea;
