import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Package, 
  CreditCard, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Calendar,
  Clock,
  Wifi,
  Upload,
  Download,
  AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";

const MemberPage = () => {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Mock data for demo purposes
  const mockPackageData = {
    name: "Paket Premium",
    speed: "100 Mbps",
    status: "Aktif",
    billingDate: "15 April 2025",
    nextBillingDate: "15 Mei 2025",
    lastPayment: "Rp 499.000",
    usageData: {
      totalDownload: "352.6 GB",
      totalUpload: "48.2 GB",
      averageSpeed: "78.5 Mbps"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold font-heading flex items-center">
              <Wifi className="mr-2" />
              LINTAS FIBER
            </a>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="hidden md:inline">
                    Halo, <span className="font-semibold">{user.name}</span>
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-heading mb-6">Area Member</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Menu</CardTitle>
                <CardDescription>Akses layanan member Anda</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <User className="mr-2 h-4 w-4" />
                    Profil Saya
                  </Button>
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <Package className="mr-2 h-4 w-4" />
                    Paket & Layanan
                  </Button>
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Tagihan & Pembayaran
                  </Button>
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <BarChart className="mr-2 h-4 w-4" />
                    Penggunaan Internet
                  </Button>
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Button>
                  <Button variant="ghost" className="justify-start mb-1 rounded-none">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Bantuan
                  </Button>
                </nav>
              </CardContent>
              <CardFooter className="pt-3">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Welcome Card */}
            <Card className="mb-6 bg-primary text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Selamat Datang, {user?.name || "Pelanggan"}</h2>
                    <p className="text-white text-opacity-90">
                      Akses lengkap informasi layanan LINTAS FIBER Anda di sini.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-white text-primary px-4 py-3 rounded-lg font-bold">
                      ID Pelanggan: LF{user?.id.toString().padStart(6, '0')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-6 grid w-full grid-cols-3 lg:grid-cols-5 h-auto">
                <TabsTrigger value="overview" className="py-3">Ringkasan</TabsTrigger>
                <TabsTrigger value="usage" className="py-3">Penggunaan</TabsTrigger>
                <TabsTrigger value="billing" className="py-3">Tagihan</TabsTrigger>
                <TabsTrigger value="profile" className="py-3 hidden lg:flex">Profil</TabsTrigger>
                <TabsTrigger value="support" className="py-3 hidden lg:flex">Bantuan</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Status Layanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500 flex items-center">
                        Aktif
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded ml-2">
                          Berlangganan
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Sejak 2 Januari 2025</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Paket Saat Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {mockPackageData.name}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Kecepatan hingga {mockPackageData.speed}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Tanggal Tagihan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-500 flex items-center">
                        15 Mei 2025
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Status: <span className="text-green-600 font-medium">Sudah dibayar</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Package className="h-5 w-5 mr-2 text-primary" />
                        Detail Paket
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Paket:</span>
                          <span className="font-medium">{mockPackageData.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Kecepatan:</span>
                          <span className="font-medium">{mockPackageData.speed}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-green-600">{mockPackageData.status}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Tanggal Berlangganan:</span>
                          <span className="font-medium">{mockPackageData.billingDate}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Tanggal Tagihan Berikutnya:</span>
                          <span className="font-medium">{mockPackageData.nextBillingDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-primary" />
                        Penggunaan Internet
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Download className="h-4 w-4 mr-2 text-blue-500" />
                              <span className="text-sm text-gray-600">Download</span>
                            </div>
                            <div className="text-xl font-bold">
                              {mockPackageData.usageData.totalDownload}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Upload className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-sm text-gray-600">Upload</span>
                            </div>
                            <div className="text-xl font-bold">
                              {mockPackageData.usageData.totalUpload}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Wifi className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm text-gray-600">Rata-rata Kecepatan</span>
                          </div>
                          <div className="text-xl font-bold">
                            {mockPackageData.usageData.averageSpeed}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: "78.5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Other tabs would be implemented similarly */}
              <TabsContent value="usage">
                <Card>
                  <CardHeader>
                    <CardTitle>Penggunaan Internet</CardTitle>
                    <CardDescription>
                      Statistik penggunaan internet Anda dalam 30 hari terakhir.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Statistik penggunaan detail akan segera hadir</h3>
                      <p className="text-gray-500">
                        Kami sedang mengembangkan fitur pengukuran penggunaan internet yang lebih detail.
                        Terima kasih atas kesabaran Anda.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Tagihan & Pembayaran</CardTitle>
                    <CardDescription>
                      Riwayat pembayaran dan status tagihan terbaru Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Detail tagihan akan segera hadir</h3>
                      <p className="text-gray-500">
                        Kami sedang mengembangkan fitur pembayaran online dan pengelolaan tagihan.
                        Fitur ini akan tersedia dalam waktu dekat.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Saya</CardTitle>
                    <CardDescription>
                      Informasi profil dan akun Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Pengaturan profil akan segera hadir</h3>
                      <p className="text-gray-500">
                        Kami sedang menyiapkan fitur pengelolaan profil agar Anda dapat memperbarui
                        informasi pribadi dengan mudah.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle>Bantuan & Dukungan</CardTitle>
                    <CardDescription>
                      Butuh bantuan? Tim dukungan kami siap membantu Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Sistem tiket bantuan akan segera hadir</h3>
                      <p className="text-gray-500">
                        Kami sedang mengembangkan sistem tiket bantuan yang terintegrasi.
                        Untuk sementara, silakan hubungi kami melalui kontak yang tersedia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-sm">
              &copy; 2025 PT. LINTAS FIBER NUSANTARA. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-primary text-sm">Syarat dan Ketentuan</a>
              <a href="#" className="text-gray-600 hover:text-primary text-sm">Kebijakan Privasi</a>
              <a href="/" className="text-gray-600 hover:text-primary text-sm">Beranda</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MemberPage;