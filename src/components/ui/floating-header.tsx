'use client'

import React from 'react';
import { Grid2x2PlusIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import type { Header as HeaderType } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';
import Link from 'next/link';

export function FloatingHeader({ data }: { data: HeaderType }) {
	const [open, setOpen] = React.useState(false);

	const navItems = data?.navItems || [];

	return (
		<header
			className={cn(
				'sticky top-5 z-50',
				'mx-auto w-full max-w-4xl rounded-xl border shadow-lg',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg',
                'container'
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-2">
				<Link href="/" className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
					<Logo loading="eager" priority="high" className="size-8 invert dark:invert-0" />
					<p className="font-sans text-lg font-bold tracking-tight">PCE</p>
				</Link>
                
				<div className="hidden items-center gap-1 lg:flex">
					{navItems.map(({ link }, i) => (
						<CMSLink
							key={i}
							{...link}
							appearance="ghost"
                            className="text-sm font-medium"
						/>
					))}
				</div>

				<div className="flex items-center gap-2">
					<Button size="sm" className="hidden sm:flex rounded-full px-5">Download App</Button>
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
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg border-r"
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
