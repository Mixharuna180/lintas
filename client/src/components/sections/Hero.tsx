import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative bg-primary text-white overflow-hidden pt-24">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')"
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-4">
            Internet Cepat, Stabil dan Terjangkau
          </h1>
          <p className="text-lg mb-8 text-white text-opacity-90">
            LINTAS FIBER menyediakan layanan internet fiber optic berkualitas tinggi untuk rumah dan bisnis Anda dengan jaminan kecepatan dan stabilitas terbaik.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#packages">
              <Button 
                className="w-full sm:w-auto bg-[#FF6B00] hover:bg-opacity-90 text-white px-8 py-6 rounded-full font-heading font-medium transition duration-300 text-center"
                size="lg"
              >
                Lihat Paket
              </Button>
            </a>
            <a href="#coverage">
              <Button 
                className="w-full sm:w-auto bg-transparent hover:bg-white/30 text-white border border-white border-opacity-40 px-8 py-6 rounded-full font-heading font-medium transition duration-300 text-center"
                variant="outline"
                size="lg"
              >
                Cek Area Layanan
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
