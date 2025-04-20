import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Input 
} from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { calculateDownloadTime } from '@/lib/utils/calculationHelpers';

const SpeedComparison = () => {
  const [fileSize, setFileSize] = useState<number>(1);
  const [connectionSpeed, setConnectionSpeed] = useState<string>("100");
  const [customSpeed, setCustomSpeed] = useState<number>(100);
  const [showCustomSpeed, setShowCustomSpeed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [downloadTime, setDownloadTime] = useState<string>("");

  const handleConnectionSpeedChange = (value: string) => {
    setConnectionSpeed(value);
    setShowCustomSpeed(value === "custom");
  };

  const calculateTime = () => {
    const speedValue = connectionSpeed === "custom" ? customSpeed : parseInt(connectionSpeed);
    const time = calculateDownloadTime(fileSize, speedValue);
    setDownloadTime(time);
    setShowResult(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Bandingkan Kecepatan</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Lihat berapa lama waktu yang dibutuhkan untuk mengunduh file pada berbagai kecepatan internet.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <TableHeader className="bg-primary text-white">
              <TableRow>
                <TableHead className="px-6 py-4 text-left font-heading text-white">Ukuran File</TableHead>
                <TableHead className="px-6 py-4 text-center font-heading text-white">
                  50 Mbps<br/><span className="text-xs font-normal opacity-75">Paket Reguler</span>
                </TableHead>
                <TableHead className="px-6 py-4 text-center font-heading text-white">
                  100 Mbps<br/><span className="text-xs font-normal opacity-75">Paket Premium</span>
                </TableHead>
                <TableHead className="px-6 py-4 text-center font-heading text-white">
                  200 Mbps<br/><span className="text-xs font-normal opacity-75">Paket Bisnis</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium">Film HD (4GB)</TableCell>
                <TableCell className="px-6 py-4 text-center">10 menit 40 detik</TableCell>
                <TableCell className="px-6 py-4 text-center bg-[#FF6B00] bg-opacity-10">5 menit 20 detik</TableCell>
                <TableCell className="px-6 py-4 text-center">2 menit 40 detik</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium">Game (50GB)</TableCell>
                <TableCell className="px-6 py-4 text-center">2 jam 13 menit</TableCell>
                <TableCell className="px-6 py-4 text-center bg-[#FF6B00] bg-opacity-10">1 jam 7 menit</TableCell>
                <TableCell className="px-6 py-4 text-center">33 menit</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium">Foto (10MB)</TableCell>
                <TableCell className="px-6 py-4 text-center">1,6 detik</TableCell>
                <TableCell className="px-6 py-4 text-center bg-[#FF6B00] bg-opacity-10">0,8 detik</TableCell>
                <TableCell className="px-6 py-4 text-center">0,4 detik</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium">Update Software (1GB)</TableCell>
                <TableCell className="px-6 py-4 text-center">2 menit 40 detik</TableCell>
                <TableCell className="px-6 py-4 text-center bg-[#FF6B00] bg-opacity-10">1 menit 20 detik</TableCell>
                <TableCell className="px-6 py-4 text-center">40 detik</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-xl mb-4 text-primary">Kalkulator Kecepatan Internet</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="file-size" className="block mb-2 text-sm font-medium text-gray-700">
                    Ukuran File (GB)
                  </label>
                  <Input
                    id="file-size"
                    type="number"
                    min={1}
                    max={1000}
                    value={fileSize}
                    onChange={(e) => setFileSize(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="connection-speed" className="block mb-2 text-sm font-medium text-gray-700">
                    Kecepatan Internet (Mbps)
                  </label>
                  <Select
                    value={connectionSpeed}
                    onValueChange={handleConnectionSpeedChange}
                  >
                    <SelectTrigger id="connection-speed" className="w-full">
                      <SelectValue placeholder="Pilih kecepatan internet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 Mbps - Paket Reguler</SelectItem>
                      <SelectItem value="100">100 Mbps - Paket Premium</SelectItem>
                      <SelectItem value="200">200 Mbps - Paket Bisnis</SelectItem>
                      <SelectItem value="custom">Kecepatan Kustom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {showCustomSpeed && (
                  <div>
                    <label htmlFor="custom-speed" className="block mb-2 text-sm font-medium text-gray-700">
                      Kecepatan Kustom (Mbps)
                    </label>
                    <Input
                      id="custom-speed"
                      type="number"
                      min={1}
                      max={1000}
                      value={customSpeed}
                      onChange={(e) => setCustomSpeed(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                )}
                
                <Button 
                  onClick={calculateTime}
                  className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded-lg font-medium transition duration-300"
                >
                  Hitung Waktu Download
                </Button>
                
                {showResult && (
                  <div className="bg-white p-4 rounded-lg border border-primary border-opacity-20">
                    <p className="text-center">
                      Waktu download untuk <span className="font-semibold">{fileSize} GB</span> pada kecepatan{" "}
                      <span className="font-semibold">
                        {connectionSpeed === "custom" ? customSpeed : connectionSpeed} Mbps
                      </span>:
                    </p>
                    <p className="text-2xl text-center font-heading font-bold text-primary mt-2">
                      {downloadTime}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpeedComparison;
