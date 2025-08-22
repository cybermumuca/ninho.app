"use client";

import { useRouter, useParams, notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  DollarSign,
  Heart,
  Briefcase,
  User,
  Book,
  Sun,
  Plane,
  MoreHorizontal,
  ChevronLeftIcon,
  ArchiveIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { mockCategoryList } from "@/data/categories";
import { CategoryPreview } from "@/components/category-preview";

const editCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
  icon: z.enum([
    "dollar-sign",
    "heart",
    "briefcase",
    "user",
    "book",
    "sun",
    "airplane",
    "more-horizontal"
  ], {
    message: "Selecione um ícone válido",
  }),
  color: z.enum(["blue", "green", "red", "purple", "yellow", "orange", "pink", "indigo", "amber", "gray"], {
    message: "Selecione uma cor válida",
  }),
});

type EditCategoryFormData = z.infer<typeof editCategorySchema>;

const availableIcons = [
  { value: "dollar-sign", icon: DollarSign, label: "Dinheiro" },
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

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId as string;

  const category = mockCategoryList.find(c => c.id === categoryId);

  const form = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: "",
      icon: "more-horizontal",
      color: "blue"
    }
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        icon: category.icon as EditCategoryFormData["icon"],
        color: category.color as EditCategoryFormData["color"]
      });
    }
  }, [category, form]);

  const watchCategoryName = form.watch("name");

  function onSubmit(data: EditCategoryFormData) {
    console.log("Dados atualizados da categoria:", data);
    router.push("/categories");
  }

  if (!category) {
    return notFound();
  }

  // Verifica se a categoria está arquivada
  const isArchived = category.archivedAt !== null;

  if (isArchived) {
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
            <h1 className="text-xl font-bold">Editar Categoria</h1>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="px-6 py-5 max-w-md text-center">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-muted">
                <ArchiveIcon className="size-8 text-muted-foreground" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Categoria Arquivada</h2>
              <p className="text-muted-foreground">
                Esta categoria está arquivada e não pode ser editada. Para editar, primeiro desarquive a categoria.
              </p>
            </div>
            <Button onClick={() => router.back()} className="w-full">
              Voltar
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="-m-2 p-2"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>
            <h1 className="text-xl font-bold">Editar Categoria</h1>
          </div>
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
                  name={watchCategoryName || category.name}
                  icon={form.watch("icon")}
                  color={form.watch("color")}
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
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
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
                            title={label}
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
                            title={label}
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
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}