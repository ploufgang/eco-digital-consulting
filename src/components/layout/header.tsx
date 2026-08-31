"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/#impact", label: "Votre impact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="container-shell flex h-20 items-center justify-between">
        <Brand />
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => <Link className="text-sm font-semibold text-muted transition-colors hover:text-foreground" href={item.href} key={item.href}>{item.label}</Link>)}
          <ThemeToggle />
          <Button asChild size="sm"><Link href="/reserver">Réserver un échange</Link></Button>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Dialog.Root onOpenChange={setOpen} open={open}>
            <Dialog.Trigger asChild>
              <button aria-label="Ouvrir le menu" className="grid size-10 place-items-center rounded-full border border-border bg-surface" type="button"><Menu aria-hidden="true" className="size-5" /></button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/55" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,24rem)] flex-col bg-background p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-2xl">Navigation</Dialog.Title>
                  <Dialog.Close asChild><button aria-label="Fermer le menu" className="grid size-10 place-items-center rounded-full border border-border" type="button"><X aria-hidden="true" className="size-5" /></button></Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Accédez aux pages principales du site.</Dialog.Description>
                <nav aria-label="Navigation mobile" className="mt-10 flex flex-col gap-2">
                  {[{ href: "/", label: "Accueil" }, ...navigation, { href: "/reserver", label: "Réserver un échange" }].map((item) => <Link className="rounded-xl px-3 py-4 font-display text-2xl hover:bg-accent-soft" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
