import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <h1 className="text-[12rem] font-black text-slate-100 dark:text-slate-900 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 p-6 rounded-full backdrop-blur-sm">
                <Search className="w-16 h-16 text-primary animate-bounce shadow-2xl" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Page Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="rounded-full px-8 font-bold h-14">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-bold h-14">
            <Link href="/contact" className="flex items-center gap-2">
              Contact Support <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>

        <div className="pt-12">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Pakistan Currency Exchange</p>
        </div>
      </div>
    </div>
  )
}
