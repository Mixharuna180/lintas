import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSubmissionSchema } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

// Extend the schema to add client-side validations
const contactFormSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(3, { message: "Nama harus minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor telepon harus minimal 10 digit" }),
  message: z.string().min(10, { message: "Pesan harus minimal 10 karakter" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacyAccepted: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest('POST', '/api/contact', data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Pesan Terkirim",
        description: data.message || "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Gagal Mengirim Pesan",
        description: error.message || "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Ada pertanyaan tentang layanan LINTAS FIBER? Tim kami siap membantu Anda. Silakan isi formulir di bawah ini atau hubungi kami melalui kontak yang tersedia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl shadow-md p-8">
            <h3 className="font-heading font-semibold text-xl mb-6 text-primary">Kirim Pesan</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap*</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Masukkan nama lengkap" 
                            {...field} 
                            className="w-full p-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Masukkan email" 
                            {...field} 
                            className="w-full p-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon*</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Masukkan nomor telepon" 
                            {...field} 
                            className="w-full p-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjek*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih subjek" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="info">Informasi Produk</SelectItem>
                            <SelectItem value="subscribe">Berlangganan</SelectItem>
                            <SelectItem value="technical">Dukungan Teknis</SelectItem>
                            <SelectItem value="billing">Pembayaran & Penagihan</SelectItem>
                            <SelectItem value="feedback">Kritik & Saran</SelectItem>
                            <SelectItem value="others">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tulis pesan Anda di sini" 
                          rows={5}
                          {...field} 
                          className="w-full p-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacyAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="privacy"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="privacy">
                          Saya menyetujui <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> dan penggunaan data saya untuk keperluan komunikasi layanan.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-lg font-medium transition duration-300 mt-2"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 text-primary">Informasi Kontak</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-xl text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-heading font-medium text-lg mb-1">Kantor Pusat</h4>
                  <p className="text-gray-600">
                    Gedung LINTAS Tower, Lantai 18<br/>
                    Jl. Jendral Sudirman Kav. 52-53<br/>
                    Jakarta Selatan, 12190<br/>
                    Indonesia
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-xl text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-heading font-medium text-lg mb-1">Telepon</h4>
                  <p className="text-gray-600">Call Center: 0800-1234-5678 (24/7)</p>
                  <p className="text-gray-600">Kantor: (021) 1234-5678</p>
                  <p className="text-gray-600">WhatsApp: +62812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-xl text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-heading font-medium text-lg mb-1">Email</h4>
                  <p className="text-gray-600">Informasi: info@lintasfiber.id</p>
                  <p className="text-gray-600">Dukungan: support@lintasfiber.id</p>
                  <p className="text-gray-600">Penjualan: sales@lintasfiber.id</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-xl text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="font-heading font-medium text-lg mb-1">Jam Operasional</h4>
                  <p className="text-gray-600">Senin - Jumat: 08.00 - 17.00 WIB</p>
                  <p className="text-gray-600">Sabtu: 09.00 - 15.00 WIB</p>
                  <p className="text-gray-600">Minggu & Hari Libur: Tutup</p>
                  <p className="text-gray-600">(Layanan Dukungan Teknis 24/7)</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-heading font-medium text-lg mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition duration-300">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition duration-300">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition duration-300">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition duration-300">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
