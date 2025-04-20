import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const FAQ = () => {
  const faqItems: FAQItem[] = [
    {
      question: "Apa itu layanan Fiber Optic?",
      answer: (
        <p className="text-gray-600">
          Fiber optic adalah teknologi transfer data menggunakan kabel serat optik yang mampu mentransmisikan data dengan kecepatan tinggi. Dibandingkan dengan kabel tembaga tradisional, fiber optic menawarkan kecepatan yang jauh lebih tinggi, stabilitas yang lebih baik, dan bandwith yang lebih besar dengan latensi yang lebih rendah.
        </p>
      )
    },
    {
      question: "Berapa lama proses instalasi layanan LINTAS FIBER?",
      answer: (
        <p className="text-gray-600">
          Proses instalasi LINTAS FIBER biasanya membutuhkan waktu 3-5 hari kerja setelah permohonan disetujui. Waktu ini dapat bervariasi tergantung pada lokasi dan kondisi infrastruktur yang ada. Tim teknisi kami akan menghubungi Anda untuk menjadwalkan waktu instalasi yang sesuai dengan ketersediaan Anda.
        </p>
      )
    },
    {
      question: "Apakah ada biaya instalasi untuk berlangganan LINTAS FIBER?",
      answer: (
        <p className="text-gray-600">
          Untuk semua paket LINTAS FIBER, biaya instalasi standar sudah termasuk dalam paket berlangganan (gratis). Namun, untuk kondisi khusus seperti pemasangan di gedung tinggi atau area yang membutuhkan peralatan tambahan, mungkin ada biaya tambahan yang akan diinformasikan kepada Anda sebelum instalasi.
        </p>
      )
    },
    {
      question: "Bagaimana cara melakukan pembayaran tagihan LINTAS FIBER?",
      answer: (
        <>
          <p className="text-gray-600">LINTAS FIBER menawarkan berbagai metode pembayaran untuk kenyamanan Anda:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Auto debit melalui kartu kredit atau rekening bank</li>
            <li>Transfer bank ke rekening perusahaan</li>
            <li>Pembayaran melalui e-wallet seperti OVO, GoPay, dan DANA</li>
            <li>Pembayaran melalui minimarket (Alfamart, Indomaret)</li>
            <li>Aplikasi mobile LINTAS FIBER</li>
          </ul>
        </>
      )
    },
    {
      question: "Bagaimana jika terjadi gangguan pada koneksi internet saya?",
      answer: (
        <>
          <p className="text-gray-600">Jika Anda mengalami gangguan koneksi, silakan hubungi tim dukungan pelanggan kami melalui:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Call Center: 0800-1234-5678 (24/7)</li>
            <li>Email: support@lintasfiber.id</li>
            <li>Live Chat di website atau aplikasi LINTAS FIBER</li>
            <li>WhatsApp: +62812-3456-7890</li>
          </ul>
          <p className="mt-2 text-gray-600">
            Tim teknisi kami akan segera mendiagnosa dan menyelesaikan masalah Anda. Untuk pelanggan Paket Premium dan Bisnis, kami menyediakan layanan prioritas dengan respons lebih cepat.
          </p>
        </>
      )
    },
    {
      question: "Apakah saya bisa mengupgrade atau downgrade paket saya?",
      answer: (
        <p className="text-gray-600">
          Ya, Anda dapat mengubah paket berlangganan Anda kapan saja. Perubahan paket akan berlaku pada periode penagihan berikutnya. Untuk mengubah paket, silakan hubungi layanan pelanggan kami atau login ke akun LINTAS FIBER Anda dan pilih menu 'Kelola Paket'. Tidak ada biaya tambahan untuk perubahan paket, namun ada masa kontrak minimal untuk beberapa paket yang perlu diperhatikan.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan LINTAS FIBER. Jika Anda tidak menemukan jawaban di sini, silakan hubungi tim dukungan kami.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-4 bg-white hover:bg-gray-50 transition duration-300 font-heading font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50 border-t border-gray-200">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Punya pertanyaan lain yang tidak tercantum di sini?</p>
            <a 
              href="#contact" 
              className="text-primary hover:text-[#00BFFF] font-medium inline-flex items-center transition duration-300"
            >
              <span>Hubungi tim dukungan kami</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
