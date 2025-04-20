import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Wifi, User, Lock, Mail, Phone, Home } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username harus diisi" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

// Registration form schema
const registerSchema = z.object({
  name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  confirmPassword: z.string().min(1, { message: "Konfirmasi password harus diisi" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Password dan konfirmasi password tidak cocok",
  path: ["confirmPassword"]
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [_, navigate] = useLocation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/member");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      termsAccepted: false,
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // Remove termsAccepted as it's not part of the user model
    const { termsAccepted, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <a href="/" className="text-primary text-2xl font-bold font-heading mb-6 flex items-center">
            <Wifi className="mr-2" />
            LINTAS FIBER
          </a>
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Hero Section */}
            <div className="bg-primary text-white p-10 flex flex-col justify-center relative">
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')"
                  }}
                ></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-bold font-heading mb-4">Area Member LINTAS FIBER</h1>
                <p className="text-white text-opacity-90 mb-6">
                  Akses area member untuk menikmati layanan eksklusif, memantau penggunaan internet, dan mengelola akun Anda dengan mudah.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Kelola Profil Anda</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <Wifi className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Pantau Penggunaan Internet</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <Lock className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Akses Fitur Eksklusif</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-10">
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Daftar</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-heading font-semibold">Masuk ke Akun Anda</h2>
                    <p className="text-gray-600">Masukkan username dan password untuk mengakses area member.</p>

                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 mt-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    placeholder="Masukkan username" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    type="password" 
                                    placeholder="Masukkan password" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                              htmlFor="remember"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Ingat saya
                            </label>
                          </div>
                          <a href="#" className="text-sm text-primary hover:underline">
                            Lupa password?
                          </a>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-primary text-white" 
                          size="lg"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? "Memproses..." : "Masuk"}
                        </Button>
                      </form>
                    </Form>

                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-600">
                        Belum punya akun?{" "}
                        <button
                          className="text-primary hover:underline font-medium"
                          onClick={() => setActiveTab("register")}
                        >
                          Daftar sekarang
                        </button>
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-heading font-semibold">Buat Akun Baru</h2>
                    <p className="text-gray-600">Daftar untuk menjadi member LINTAS FIBER dan akses fitur khusus.</p>

                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 mt-6">
                        <FormField
                          control={registerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Lengkap*</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    placeholder="Masukkan nama lengkap" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input 
                                      placeholder="Buat username" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input 
                                      type="email" 
                                      placeholder="Masukkan email" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input 
                                      type="password" 
                                      placeholder="Buat password" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Konfirmasi Password*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input 
                                      type="password" 
                                      placeholder="Konfirmasi password" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={registerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nomor Telepon</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    type="tel" 
                                    placeholder="Masukkan nomor telepon" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alamat</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input 
                                    placeholder="Masukkan alamat" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Saya menyetujui <a href="#" className="text-primary hover:underline">Syarat dan Ketentuan</a> serta <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> LINTAS FIBER
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-primary text-white" 
                          size="lg"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? "Memproses..." : "Daftar"}
                        </Button>
                      </form>
                    </Form>

                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-600">
                        Sudah punya akun?{" "}
                        <button
                          className="text-primary hover:underline font-medium"
                          onClick={() => setActiveTab("login")}
                        >
                          Masuk di sini
                        </button>
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-primary">
            &larr; Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;