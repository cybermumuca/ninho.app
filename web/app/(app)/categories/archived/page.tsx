"use client";

import { Button } from "@/components/ui/button";
import { mockCategoryList } from "@/data/categories";
import { ArchiveIcon, ChevronLeftIcon, FolderOpenIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArchivedCategoryItem } from "./archived-category-item";

export default function ArchivedCategoriesPage() {
  const router = useRouter();
  const archivedCategories = mockCategoryList.filter(category => category.archivedAt);
  const hasArchivedCategories = archivedCategories.length > 0;

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="-m-2 p-2"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold text-foreground">Categorias Arquivadas</h1>
              <p className="text-sm text-muted-foreground">
                {hasArchivedCategories
                  ? `${archivedCategories.length} ${archivedCategories.length === 1 ? 'categoria arquivada' : 'categorias arquivadas'}`
                  : 'Nenhuma categoria arquivada'
                }
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {hasArchivedCategories ? (
          <div className="space-y-3">
            {archivedCategories.map((category) => (
              <ArchivedCategoryItem
                key={category.id}
                category={category as any}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-5 bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl mb-6 border border-muted">
              <FolderOpenIcon className="size-11 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">Nenhuma categoria arquivada</h2>
              <p className="text-muted-foreground max-w-md mb-2 leading-relaxed">
                Quando você arquivar categorias, elas aparecerão aqui.
              </p>
            </div>
            <Button variant="outline" asChild size="lg">
              <Link href="/categories">
                <ChevronLeftIcon className="size-4" />
                Voltar para categorias
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
