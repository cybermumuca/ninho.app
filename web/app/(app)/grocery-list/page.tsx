import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroceryListItem } from "@/components/grocery-list-item";
import { mockGroceriesList } from "@/data/groceries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listas de Compras",
  description: "Veja e gerencie suas listas de compras.",
};

export default function GroceryListPage() {
  return (
    <div className="min-h-dvh">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Listas de Compras</h1>
          </div>
          <Avatar className="size-10">
            <AvatarImage
              src="https://github.com/cybermumuca.png"
              alt="Foto de perfil"
            />
            <AvatarFallback>
              <span className="text-sm font-bold">SL</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGroceriesList.map((list) => (
              <GroceryListItem key={list.id} {...list} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
