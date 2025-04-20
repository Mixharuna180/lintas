import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import MemberPage from "@/pages/member-page";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/member" component={MemberPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Switch>
            {/* Routes with full layout (header & footer) */}
            <Route path="/">
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </div>
            </Route>
            
            {/* Routes without standard layout */}
            <Route path="/auth">
              <AuthPage />
            </Route>
            
            <Route path="/member">
              <MemberPage />
            </Route>
            
            {/* 404 page */}
            <Route>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <NotFound />
                </main>
                <Footer />
              </div>
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
