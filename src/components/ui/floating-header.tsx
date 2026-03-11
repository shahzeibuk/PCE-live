'use client'

import React from 'react';
import { ChevronDown, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import type { Header as HeaderType } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';
import Link from 'next/link';

export function FloatingHeader({ data }: { data: HeaderType }) {
	const [open, setOpen] = React.useState(false);

	const navItems = (data?.navItems || []).filter(item => 
        item.link.label.toLowerCase() !== 'contact' && 
        item.link.label.toLowerCase() !== 'contact us'
    );

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 w-full border-b',
				'bg-white dark:bg-slate-950'
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-2">
				<Link href="/" className="flex cursor-pointer items-center gap-2 rounded-lg py-1 px-2 transition-colors">
					<Logo loading="eager" priority="high" className="h-10 sm:h-12 w-auto" />
				</Link>
                
				<div className="hidden items-center gap-2 lg:flex">
					{navItems.map(({ link }, i) => (
						<CMSLink
							key={i}
							{...link}
							appearance="ghost"
                            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md px-4 py-2"
						/>
					))}

                    {/* Footer Links Dropdown */}
                    <div className="relative group/nav cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md px-4 py-2 flex items-center gap-1">
                        Company
                        <ChevronDown className="w-4 h-4 ml-0.5 opacity-50 group-hover/nav:rotate-180 transition-transform duration-200" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-xl border bg-white dark:bg-slate-950 shadow-lg opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 p-2 grid gap-0.5 transform origin-top group-hover/nav:translate-y-0 translate-y-1 pointer-events-none group-hover/nav:pointer-events-auto">
                            <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#099546] mb-1">About Us</p>
                            <Link href="/about" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Company Profile</Link>
                            <Link href="/mission-vision" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Mission & Vision</Link>
                            <Link href="/careers" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Careers</Link>
                            <Link href="/partners-associates" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Partners & Associates</Link>
                            <Link href="/complaints-feedback" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Complaints & Feedback</Link>
                            
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-2" />
                            
                            <p className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Legal</p>
                            <Link href="/terms" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Terms & Conditions</Link>
                            <Link href="/privacy" className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors font-medium">Privacy Policy</Link>
                        </div>
                    </div>
				</div>

				<div className="flex items-center gap-2">
					<Button asChild size="sm" className="hidden sm:flex rounded-full px-5 font-bold">
                        <Link href="/contact">Contact Us</Link>
                    </Button>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden rounded-full h-9 w-9"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-white dark:bg-slate-950 gap-0 border-r"
							showClose={true}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-6 pt-16 pb-8">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Navigation</p>
								{navItems.map(({ link }, i) => (
									<CMSLink
                                        key={i}
                                        {...link}
                                        appearance="ghost"
                                        className="justify-start text-lg py-3"
                                        onClick={() => setOpen(false)}
                                    />
								))}
                                
                                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                                <p className="text-xs font-bold uppercase tracking-widest text-[#099546] mb-2 mt-4">Company</p>
                                <Link href="/about" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors">Company Profile</Link>
                                <Link href="/mission-vision" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors">Mission & Vision</Link>
                                <Link href="/careers" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors">Careers</Link>
                                <Link href="/partners-associates" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors">Partners & Associates</Link>
                                <Link href="/complaints-feedback" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors">Complaints & Feedback</Link>
                                <Link href="/terms" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors text-muted-foreground">Terms & Conditions</Link>
                                <Link href="/privacy" onClick={() => setOpen(false)} className="block py-3 text-lg font-medium hover:text-primary transition-colors text-muted-foreground">Privacy Policy</Link>
							</div>
							<SheetFooter className="p-6">
								<Button variant="outline" className="w-full rounded-xl">Sign In</Button>
								<Button className="w-full rounded-xl">Get Started</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
