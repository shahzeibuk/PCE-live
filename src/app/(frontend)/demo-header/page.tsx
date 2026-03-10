import { FloatingHeader } from "@/components/ui/floating-header";
import { cn } from '@/utilities/ui';

export default function DemoHeaderPage() {
 return (
		<div className="relative w-full px-4 pt-20">
			<FloatingHeader />
			<div className="min-h-screen py-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-black mb-6 tracking-tighter">Premium Header <br/><span className="text-primary italic">Experience</span></h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                    Scroll down to see the sticky floating header effect with backdrop blur and responsive mobile menu.
                </p>
                <div className="mt-12 w-full max-w-4xl aspect-video bg-muted rounded-3xl border-8 border-white shadow-2xl animate-pulse flex items-center justify-center">
                    <span className="text-4xl font-bold opacity-20 italic">Content Placeholder</span>
                </div>
            </div>
            
            <div className="h-screen" />
            
            <section className="container py-24">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-12 rounded-3xl bg-card border shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl mb-6 mx-auto">
                                {i}
                            </div>
                            <h3 className="text-xl font-bold mb-4">Feature {i}</h3>
                            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                        </div>
                    ))}
                </div>
            </section>

			{/* Dots Background */}
			<div
				aria-hidden="true"
				className={cn(
					'absolute inset-0 -z-10 size-full pointer-events-none opacity-50',
					'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]',
				)}
			/>
		</div>
	);
}
