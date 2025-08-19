"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
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
  ChevronLeftIcon,
  TrashIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { mockRoomList } from "@/data/rooms";

const editRoomSchema = z.object({
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

type EditRoomFormData = z.infer<typeof editRoomSchema>;

const availableIcons = [
  { value: "BED", icon: Bed, label: "Cama" },
  { value: "SOFA", icon: Sofa, label: "Sofá" },
  { value: "UTENSILS", icon: UtensilsCrossed, label: "Utensílios" },
  { value: "BATH", icon: Bath, label: "Banheira" },
  { value: "HOME", icon: Home, label: "Casa" },
  { value: "CAR", icon: Car, label: "Carro" },
  { value: "TREE", icon: TreePine, label: "Árvore" },
  { value: "GAMEPAD", icon: Gamepad2, label: "Videogame" },
  { value: "BRIEFCASE", icon: Briefcase, label: "Trabalho" },
  { value: "BABY", icon: Baby, label: "Bebê" },
  { value: "SHIRT", icon: Shirt, label: "Roupas" },
  { value: "BOOK", icon: Book, label: "Livros" },
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

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = parseInt(params.roomId as string);

  const room = mockRoomList.find(r => r.id === roomId);

  const form = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomSchema),
    defaultValues: {
      name: "",
      icon: "BED",
      color: "blue"
    }
  });

  useEffect(() => {
    if (room) {
      form.reset({
        name: room.name,
        icon: room.icon as EditRoomFormData["icon"],
        color: room.color as EditRoomFormData["color"]
      });
    }
  }, [room, form]);

  const watchRoomName = form.watch("name");

  function onSubmit(data: EditRoomFormData) {
    console.log("Dados atualizados do cômodo:", data);
    router.push("/rooms");
  }

  function handleDeleteRoom() {
    if (confirm("Tem certeza que deseja excluir este cômodo? Esta ação não pode ser desfeita.")) {
      console.log("Excluindo cômodo:", roomId);
      router.push("/rooms");
    }
  }

  if (!room) {
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
            <h1 className="text-xl font-bold">Cômodo não encontrado</h1>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">O cômodo solicitado não foi encontrado.</p>
        </main>
      </div>
    );
  }

  const SelectedIconComponent = availableIcons.find(i => i.value === form.watch("icon"))?.icon || Bed;
  const selectedColorClass = availableColors.find(c => c.value === form.watch("color"))?.class || "bg-blue-700";

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
            <h1 className="text-xl font-bold">Editar Cômodo</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteRoom}
            className="-m-2 p-2 text-destructive hover:text-destructive"
          >
            <TrashIcon className="size-5" />
          </Button>
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
                    {watchRoomName || "Nome do Cômodo"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Preview das suas alterações</p>
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
