"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DollarSign,
  Heart,
  Briefcase,
  User,
  Book,
  Sun,
  Plane,
  MoreHorizontal,
  ChevronLeftIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CategoryPreview } from "@/components/category-preview";

const addCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
  icon: z.enum(["dollar-sign", "heart", "briefcase", "user", "book", "sun", "airplane", "more-horizontal"], {
    message: "Selecione um ícone válido",
  }),
  color: z.enum(["blue", "green", "red", "purple", "yellow", "orange", "pink", "indigo", "amber", "gray"], {
    message: "Selecione uma cor válida",
  }),
});

type AddCategoryFormData = z.infer<typeof addCategorySchema>;

const availableIcons = [
  { value: "dollar-sign", icon: DollarSign, label: "Finanças" },
  { value: "heart", icon: Heart, label: "Saúde" },
  { value: "briefcase", icon: Briefcase, label: "Trabalho" },
  { value: "user", icon: User, label: "Pessoal" },
  { value: "book", icon: Book, label: "Estudos" },
  { value: "sun", icon: Sun, label: "Lazer" },
  { value: "airplane", icon: Plane, label: "Viagens" },
  { value: "more-horizontal", icon: MoreHorizontal, label: "Outros" },
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
  { value: "amber", class: "bg-amber-700", label: "Âmbar" },
  { value: "gray", class: "bg-gray-700", label: "Cinza" },
];

export default function CreateCategoryPage() {
  const router = useRouter();

  const form = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      icon: "more-horizontal",
      color: "blue"
    }
  });

  const watchCategoryName = form.watch("name");
  const watchIcon = form.watch("icon");
  const watchColor = form.watch("color");

  function onSubmit(data: AddCategoryFormData) {
    console.log("Dados da categoria:", data);
    router.back();
  }

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
          <h1 className="text-xl font-bold">Criar Categoria</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <Card className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">
                  Preview da Categoria
                </h3>
                <p className="text-sm text-muted-foreground">
                  Assim sua categoria aparecerá no sistema
                </p>
              </div>
              <div className="flex justify-center">
                <CategoryPreview
                  name={watchCategoryName || "Nova Categoria"}
                  icon={watchIcon}
                  color={watchColor}
                />
              </div>
            </Card>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Finanças, Saúde, Trabalho..."
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableIcons.map(({ value, icon, label }) => {
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
                            <span className="text-xs font-medium text-center">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-5 gap-3">
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
                            <span className="text-xs font-medium text-center">{label}</span>
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
              Criar Categoria
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
