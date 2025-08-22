import { Button } from "@/components/ui/button";
import { mockCategoryList } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, CirclePlusIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import { CategoryItem } from "./category-item";

export default function CategoriesPage() {
  const hasCategories = mockCategoryList.length > 0;

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Categorias</h1>
            <p className={cn("text-muted-foreground", hasCategories ? "text-sm" : "text-xs")}>
              {hasCategories
                ? `${mockCategoryList.length} ${mockCategoryList.length === 1 ? 'categoria criada' : 'categorias criadas'} • ${mockCategoryList.reduce((sum, category) => sum + category.associations, 0)} ${mockCategoryList.reduce((sum, category) => sum + category.associations, 0) === 1 ? 'associação' : 'associações'}`
                : 'Organize suas tarefas com categorias personalizadas'
              }
            </p>
          </div>
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/categories/add">
              <CirclePlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-4">
        {hasCategories ? (
          <div className="grid grid-cols-3 lg:grid-cols-11 gap-2">
            {mockCategoryList.filter((category) => !category.archivedAt).map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl mb-6 border border-primary/10">
              <FolderIcon className="size-11 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-1 text-foreground">Organize-se com categorias</h2>
            <p className="text-muted-foreground max-w-md mb-3 leading-relaxed">
              Crie categorias personalizadas para categorizar suas tarefas de forma inteligente.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/categories/add">
                Criar primeira categoria
                <ChevronRightIcon className="size-4 translate-y-[-0.5px]" strokeWidth={3} />
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}