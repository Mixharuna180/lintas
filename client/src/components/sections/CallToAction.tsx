import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80')"
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">Siap Bergabung dengan LINTAS FIBER?</h2>
          <p className="text-white text-opacity-90 text-lg mb-8">
            Dapatkan koneksi internet cepat dan stabil untuk rumah atau bisnis Anda sekarang. Tim kami siap membantu Anda memilih paket yang tepat sesuai kebutuhan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#packages">
              <Button 
                className="w-full sm:w-auto bg-white text-primary hover:bg-opacity-90 px-8 py-6 rounded-full font-heading font-medium transition duration-300 text-center"
                size="lg"
              >
                Lihat Paket
              </Button>
            </a>
            <a href="#contact">
              <Button 
                className="w-full sm:w-auto bg-[#FF6B00] hover:bg-opacity-90 text-white px-8 py-6 rounded-full font-heading font-medium transition duration-300 text-center"
                size="lg"
              >
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
