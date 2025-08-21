"use client";

import { useRouter, notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/tag";
import { mockListTags } from "@/data/tags";
import { use, useEffect } from "react";

const editTagSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(30, "Nome deve ter no máximo 30 caracteres")
    .trim()
    .toLowerCase()
    .regex(/^[\p{L}\s'-]+$/u, "Use apenas letras, espaços, hífens ou apóstrofos"),
  color: z.enum(["blue", "green", "red", "purple", "yellow", "orange", "pink", "indigo"], {
    message: "Selecione uma cor válida",
  }),
});

type EditTagSchema = z.infer<typeof editTagSchema>;

const availableColors = [
  { value: "blue", class: "bg-blue-700/30 text-blue-400 border-blue-900", bgClass: "bg-blue-700", label: "Azul" },
  { value: "green", class: "bg-green-700/30 text-green-400 border-green-900", bgClass: "bg-green-700", label: "Verde" },
  { value: "red", class: "bg-red-700/30 text-red-400 border-red-900", bgClass: "bg-red-700", label: "Vermelho" },
  { value: "purple", class: "bg-purple-700/30 text-purple-400 border-purple-900", bgClass: "bg-purple-700", label: "Roxo" },
  { value: "yellow", class: "bg-yellow-700/30 text-yellow-400 border-yellow-900", bgClass: "bg-yellow-700", label: "Amarelo" },
  { value: "orange", class: "bg-orange-700/30 text-orange-400 border-orange-900", bgClass: "bg-orange-700", label: "Laranja" },
  { value: "pink", class: "bg-pink-700/30 text-pink-400 border-pink-900", bgClass: "bg-pink-700", label: "Rosa" },
  { value: "indigo", class: "bg-indigo-700/30 text-indigo-400 border-indigo-900", bgClass: "bg-indigo-700", label: "Índigo" },
];

export default function EditTagPage({ params }: { params: Promise<{ tagId: string }> }) {
  const router = useRouter();
  const { tagId } = use(params);

  const tag = mockListTags.find(t => t.id === tagId);

  const form = useForm<EditTagSchema>({
    resolver: zodResolver(editTagSchema),
    defaultValues: {
      name: "",
      color: "blue"
    }
  });

  useEffect(() => {
    if (tag) {
      form.reset({
        name: tag.name,
        color: tag.color as EditTagSchema["color"]
      });
    }
  }, [tag, form]);

  const watchTagName = form.watch("name");
  const watchColor = form.watch("color");

  function onSubmit(data: EditTagSchema) {
    console.log("Dados atualizados da tag:", { id: tagId, ...data });
    router.back();
  }

  if (!tag) {
    return notFound();
  }

  const selectedColor = availableColors.find(c => c.value === watchColor);

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
          <h1 className="text-xl font-bold">Editar Tag</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <Card className="p-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Preview da Tag
                </h3>
                <p className="text-sm text-muted-foreground">
                  Assim sua tag aparecerá no sistema
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Tag
                  name={watchTagName || tag.name}
                  color={selectedColor?.value || tag.color}
                />
              </div>
            </Card>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da tag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: trabalho, autocuidado, pessoal..."
                      className="h-11"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        field.onChange(value);
                      }}
                    />
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
                  <FormLabel>Cor da tag</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-3">
                      {availableColors.map(({ value, bgClass, label }) => {
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
                            <div className={`size-8 rounded-full ${bgClass}`} />
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
