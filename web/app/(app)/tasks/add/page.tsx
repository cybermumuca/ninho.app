"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockCategoryList } from "@/data/categories";
import { mockListTags } from "@/data/tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, XIcon, DollarSignIcon, HeartIcon, BriefcaseIcon, UserIcon, BookIcon, SunIcon, GraduationCapIcon, HomeIcon, TruckIcon, ShoppingCartIcon, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "@/components/date-picker";

const addTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(100, "Título deve ter no máximo 100 caracteres"),
  annotation: z.string().max(2000, "Anotações devem ter no máximo 2000 caracteres"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  dueDate: z.string().optional(),
  estimatedDuration: z.string().optional(),
  tagIds: z.array(z.string()),
}).refine((data) => {
  const startValue = data.startDate;
  const dueValue = data.dueDate;

  const isDueDateInvalid = startValue && dueValue && startValue > dueValue;

  if (isDueDateInvalid) {
    return false;
  }

  return true;
}, {
  error: "Data de término deve ser posterior ou igual à data de início",
  path: ["dueDate"]
});

type AddTaskFormData = z.infer<typeof addTaskSchema>;

const iconMap: Record<string, LucideIcon> = {
  "dollar-sign": DollarSignIcon,
  "heart": HeartIcon,
  "briefcase": BriefcaseIcon,
  "user": UserIcon,
  "book": BookIcon,
  "sun": SunIcon,
  "graduation-cap": GraduationCapIcon,
  "home": HomeIcon,
  "truck": TruckIcon,
  "shopping-cart": ShoppingCartIcon,
};

const colorMap: Record<string, string> = {
  "purple": "bg-purple-500 hover:bg-purple-600 text-white",
  "blue": "bg-blue-500 hover:bg-blue-600 text-white",
  "green": "bg-green-500 hover:bg-green-600 text-white",
  "red": "bg-red-500 hover:bg-red-600 text-white",
  "yellow": "bg-yellow-500 hover:bg-yellow-600 text-black",
  "pink": "bg-pink-500 hover:bg-pink-600 text-white",
  "amber": "bg-amber-500 hover:bg-amber-600 text-black",
  "orange": "bg-orange-500 hover:bg-orange-600 text-white",
};

export default function AddTaskPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [durationDialogOpen, setDurationDialogOpen] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const form = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      startDate: "",
      tagIds: [],
      estimatedDuration: undefined,
      annotation: "",
    },
  });

  function onSubmit(data: AddTaskFormData) {
    console.log("raw:", data);
    toast.success("Tarefa criada com sucesso!");
  }

  function handleTagToggle(tagId: string) {
    const currentTags = form.getValues("tagIds");
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(id => id !== tagId)
      : [...currentTags, tagId];

    form.setValue("tagIds", newTags);
    setSelectedTags(newTags);
  }

  function formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  function handleDurationSelect() {
    form.setValue("estimatedDuration", `${hours}:${minutes}`);
    setDurationDialogOpen(false);
  }

  function formatDuration(duration: string | undefined): string {
    if (!duration) return "";
    const [hours, minutes] = duration.split(":").map(Number);
    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}min`);
    return parts.join(" ");
  }

  const activeCategoriesList = mockCategoryList.filter(category => category.archivedAt === null);
  const startValue = form.watch("startDate");

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
          <h1 className="text-xl font-bold">Criar Tarefa</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Título <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Estudar React..."
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <FormMessage />
                    <FormDescription>{field.value?.length || 0}/100</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annotation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anotações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione anotações sobre a tarefa..."
                      disabled={form.formState.isSubmitting}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <FormMessage />
                    <FormDescription>{field.value?.length || 0}/2000</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Categoria <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeCategoriesList.map((category) => {
                          const IconComponent = iconMap[category.icon];
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                {IconComponent && <IconComponent className="size-4" />}
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Data de Início <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(date) => {
                        if (date) {
                          const formattedDate = formatDateForInput(date);
                          field.onChange(formattedDate);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <DatePicker
                      min={startValue}
                      value={field.value}
                      onChange={(date) => {
                        if (date) {
                          const formattedDate = formatDateForInput(date);
                          field.onChange(formattedDate);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração Estimada</FormLabel>
                  <FormControl>
                    <Dialog open={durationDialogOpen} onOpenChange={setDurationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left px-3 font-normal"
                          onClick={() => {
                            setDurationDialogOpen(true);
                          }}
                        >
                          {field.value ? formatDuration(field.value) : "Selecionar duração"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Selecionar Duração</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="hours">Horas</label>
                            <Input
                              type="number"
                              id="hours"
                              min={0}
                              max={24}
                              value={hours}
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (isNaN(value) || value < 0) value = 0;
                                if (value > 24) value = 24;
                                const formatted = value < 10 ? `0${value}` : `${value}`;
                                setHours(formatted);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="minutes">Minutos</label>
                            <Input
                              type="number"
                              id="minutes"
                              min={0}
                              max={59}
                              value={minutes}
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (isNaN(value) || value < 0) value = 0;
                                if (value > 59) value = 59;
                                const formatted = value < 10 ? `0${value}` : `${value}`;
                                setMinutes(formatted);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setDurationDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="button"
                            className="flex-1"
                            onClick={handleDurationSelect}
                          >
                            Confirmar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagIds"
              render={() => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Tags</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {selectedTags.length} selecionadas
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockListTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag.id);
                      const colorClass = colorMap[tag.color] || "bg-gray-500 hover:bg-gray-600 text-white";
                      return (
                        <Badge
                          key={tag.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${isSelected
                            ? colorClass
                            : 'hover:bg-muted'
                            }`}
                          onClick={() => handleTagToggle(tag.id)}
                        >
                          {tag.name}
                          {isSelected && (
                            <XIcon className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Criando..." : "Criar Tarefa"}
            </Button>
          </form>
        </Form>
      </main>
    </div >
  )
}