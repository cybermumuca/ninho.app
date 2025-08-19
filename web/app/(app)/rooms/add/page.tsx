"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Bed,
  Sofa,
  UtensilsCrossed,
  Bath,
  Home,
  Car,
  TreePine,
  Gamepad2,
  Briefcase,
  Baby,
  Shirt,
  Book,
  ChevronLeftIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const addRoomSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
  icon: z.enum(["BED", "SOFA", "UTENSILS", "BATH", "HOME", "CAR", "TREE", "GAMEPAD", "BRIEFCASE", "BABY", "SHIRT", "BOOK"], {
    message: "Selecione um ícone válido",
  }),
  color: z.enum(["blue", "green", "red", "purple", "yellow", "orange", "pink", "indigo"], {
    message: "Selecione uma cor válida",
  }),
});

type AddRoomFormData = z.infer<typeof addRoomSchema>;

const availableIcons = [
  { value: "BED", icon: Bed },
  { value: "SOFA", icon: Sofa },
  { value: "UTENSILS", icon: UtensilsCrossed },
  { value: "BATH", icon: Bath },
  { value: "HOME", icon: Home },
  { value: "CAR", icon: Car },
  { value: "TREE", icon: TreePine },
  { value: "GAMEPAD", icon: Gamepad2 },
  { value: "BRIEFCASE", icon: Briefcase },
  { value: "BABY", icon: Baby },
  { value: "SHIRT", icon: Shirt },
  { value: "BOOK", icon: Book },
];

const availableColors = [
  { value: "blue", class: "bg-blue-700", label: "Azul" },
  { value: "green", class: "bg-green-700", label: "Verde" },
  { value: "red", class: "bg-red-700", label: "Vermelho" },
  { value: "purple", class: "bg-purple-700", label: "Roxo" },
  { value: "yellow", class: "bg-yellow-700", label: "Amarelo" },
  { value: "orange", class: "bg-orange-700", label: "Laranja" },
  { value: "pink", class: "bg-pink-700", label: "Rosa" },
  { value: "indigo", class: "bg-indigo-700", label: "Índigo" },
];

export default function AddRoomPage() {
  const router = useRouter();

  const form = useForm<AddRoomFormData>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      name: "",
      icon: "BED",
      color: "blue"
    }
  });

  const watchRoomName = form.watch("name");

  function onSubmit(data: AddRoomFormData) {
    console.log("Dados do cômodo:", data);
    router.push("/rooms");
  }

  const SelectedIconComponent = availableIcons.find(i => i.value === form.watch("icon"))?.icon || Bed;
  const selectedColorClass = availableColors.find(c => c.value === form.watch("color"))?.class || "bg-blue-700";

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-start items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="-m-2 p-2"
          >
            <ChevronLeftIcon className="size-6" />
          </Button>
          <h1 className="text-xl font-bold">Adicionar Cômodo</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className={`size-12 ${selectedColorClass}`}>
                  <AvatarFallback className={`${selectedColorClass} text-white`}>
                    <SelectedIconComponent className="size-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {watchRoomName || "Novo Cômodo"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Preview do seu cômodo</p>
                </div>
              </div>
            </Card>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cômodo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Quarto, Sala, Cozinha..."
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableIcons.map(({ value, icon }) => {
                        const IconComponent = icon;
                        const isSelected = value === field.value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => field.onChange(value)}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <IconComponent className="size-6" />
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seleção de Cor */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-3">
                      {availableColors.map(({ value, class: colorClass, label }) => {
                        const isSelected = value === field.value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => field.onChange(value)}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className={`size-8 rounded-full ${colorClass}`} />
                            <span className="text-xs font-medium">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Criar Cômodo
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
