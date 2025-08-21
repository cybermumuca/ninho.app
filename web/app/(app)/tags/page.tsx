"use client";

import { Button } from "@/components/ui/button";
import { CirclePlusIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { mockListTags } from "@/data/tags";
import { useState, useMemo } from "react";
import { TagItem } from "./tag-item";

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTags = useMemo(() => {
    if (!searchTerm) return mockListTags;
    return mockListTags.filter(tag =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedTags = [...filteredTags].sort((a, b) => {
    if (b.associated !== a.associated) {
      return b.associated - a.associated;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Tags</h1>
            <p className="text-sm text-muted-foreground">
              {mockListTags.length === 0
                ? 'Organize suas tarefas com tags personalizadas'
                : `${mockListTags.length} ${mockListTags.length === 1 ? 'tag criada' : 'tags criadas'} • ${mockListTags.reduce((sum, tag) => sum + tag.associated, 0)} ${mockListTags.reduce((sum, tag) => sum + tag.associated, 0) === 1 ? 'associação' : 'associações'}`
              }
            </p>
          </div>
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/tags/add">
              <CirclePlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-4">
        {mockListTags.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl mb-6 border border-primary/10">
              <CirclePlusIcon className="size-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Organize com tags</h2>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
              Crie tags personalizadas para categorizar suas tarefas, projetos e organizações de forma inteligente.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/tags/add">
                <CirclePlusIcon className="size-4" />
                Criar primeira tag
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {mockListTags.length > 3 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Buscar tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            )}

            {sortedTags.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center flex-1">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <Search className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Nenhuma tag encontrada</h3>
                <p className="text-muted-foreground">
                  Tente usar termos diferentes para encontrar suas tags.
                </p>
              </div>
            ) : (
              <div className="flex items-center flex-wrap gap-1">
                {sortedTags.map((tag) => <TagItem key={tag.id} tag={tag} />)}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}