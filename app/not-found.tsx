import Link from "next/link";
import { cn } from "@/lib/utils";
import ButtonGradient from "@/components/svg/button-gradient";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-n-8">
      <div className={cn("relative z-10 text-center")}>
        <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6">404</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-n-3 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center h-12 px-8 rounded-full font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white transition-all hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
      
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-blue-900/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Interactive elements */}
      <ButtonGradient />
    </main>
  );
} 