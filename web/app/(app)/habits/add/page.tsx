"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { mockCategoryList } from "@/data/categories"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const createHabitSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  type: z.enum(["SUCCESS_FAILURE", "TIMED"], {
    message: "Tipo do hábito é obrigatório"
  }),
  frequency: z.enum([
    "DAILY",
    "WEEKLY_DAYS",
    "MONTHLY_DAYS",
    "MONTHLY_WEEKDAYS",
    "YEARLY_DATES",
    "PERIOD_COUNT",
    "EVERY_X_DAYS"
  ], {
    message: "Frequência é obrigatória"
  }),
  weekDays: z.array(z.string()).optional(),
  monthDays: z.array(z.number()).optional(),
  monthWeekdayOccurrence: z.string().optional(),
  monthWeekday: z.string().optional(),
  yearMonth: z.string().optional(),
  yearDay: z.number().optional(),
  periodCount: z.number().optional(),
  periodType: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
  intervalDays: z.number().optional(),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  targetDate: z.string().optional()
}).refine((data) => {
  // Validações específicas baseadas na frequência
  switch (data.frequency) {
    case "WEEKLY_DAYS":
      return data.weekDays && data.weekDays.length > 0
    case "MONTHLY_DAYS":
      return data.monthDays && data.monthDays.length > 0
    case "MONTHLY_WEEKDAYS":
      return data.monthWeekdayOccurrence && data.monthWeekday
    case "YEARLY_DATES":
      return data.yearDay && data.yearMonth
    case "PERIOD_COUNT":
      return data.periodCount && data.periodType
    case "EVERY_X_DAYS":
      return data.intervalDays && data.intervalDays > 0
    default:
      return true
  }
}, {
  message: "Preencha os campos obrigatórios para a frequência selecionada",
  path: ["frequency"]
})

type CreateHabitSchema = z.infer<typeof createHabitSchema>

const weekDays = [
  { id: "MONDAY", label: "Segunda-feira" },
  { id: "TUESDAY", label: "Terça-feira" },
  { id: "WEDNESDAY", label: "Quarta-feira" },
  { id: "THURSDAY", label: "Quinta-feira" },
  { id: "FRIDAY", label: "Sexta-feira" },
  { id: "SATURDAY", label: "Sábado" },
  { id: "SUNDAY", label: "Domingo" }
]

const monthDaysOptions = Array.from({ length: 31 }, (_, i) => i + 1)

const weekdayOccurrences = [
  { value: "FIRST", label: "1°" },
  { value: "SECOND", label: "2°" },
  { value: "THIRD", label: "3°" },
  { value: "FOURTH", label: "4°" },
  { value: "FIFTH", label: "5°" },
  { value: "LAST", label: "Último" }
]

const months = [
  { value: "JANUARY", label: "Janeiro" },
  { value: "FEBRUARY", label: "Fevereiro" },
  { value: "MARCH", label: "Março" },
  { value: "APRIL", label: "Abril" },
  { value: "MAY", label: "Maio" },
  { value: "JUNE", label: "Junho" },
  { value: "JULY", label: "Julho" },
  { value: "AUGUST", label: "Agosto" },
  { value: "SEPTEMBER", label: "Setembro" },
  { value: "OCTOBER", label: "Outubro" },
  { value: "NOVEMBER", label: "Novembro" },
  { value: "DECEMBER", label: "Dezembro" }
]

const periodTypes = [
  { value: "WEEK", label: "Semana" },
  { value: "MONTH", label: "Mês" },
  { value: "YEAR", label: "Ano" }
]

export default function CreateHabitPage() {
  const form = useForm<CreateHabitSchema>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      type: "SUCCESS_FAILURE",
      frequency: "DAILY",
      weekDays: [],
      monthDays: [],
      startDate: new Date().toISOString().split('T')[0],
      targetDate: ""
    }
  })

  const router = useRouter();

  const frequencyValue = form.watch("frequency")
  const activeCategories = mockCategoryList.filter(cat => !cat.archivedAt)

  const onSubmit = (data: CreateHabitSchema) => {
    // Limpar dados desnecessários baseados na frequência
    const cleanedData = { ...data }

    switch (data.frequency) {
      case "DAILY":
        // Para frequência diária, remover todos os outros campos
        delete cleanedData.weekDays
        delete cleanedData.monthDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.periodCount
        delete cleanedData.periodType
        delete cleanedData.intervalDays
        break
      case "WEEKLY_DAYS":
        delete cleanedData.monthDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.periodCount
        delete cleanedData.periodType
        delete cleanedData.intervalDays
        break
      case "MONTHLY_DAYS":
        delete cleanedData.weekDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.periodCount
        delete cleanedData.periodType
        delete cleanedData.intervalDays
        break
      case "MONTHLY_WEEKDAYS":
        delete cleanedData.weekDays
        delete cleanedData.monthDays
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.periodCount
        delete cleanedData.periodType
        delete cleanedData.intervalDays
        break
      case "YEARLY_DATES":
        delete cleanedData.weekDays
        delete cleanedData.monthDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.periodCount
        delete cleanedData.periodType
        delete cleanedData.intervalDays
        break
      case "PERIOD_COUNT":
        delete cleanedData.weekDays
        delete cleanedData.monthDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.intervalDays
        break
      case "EVERY_X_DAYS":
        delete cleanedData.weekDays
        delete cleanedData.monthDays
        delete cleanedData.monthWeekdayOccurrence
        delete cleanedData.monthWeekday
        delete cleanedData.yearMonth
        delete cleanedData.yearDay
        delete cleanedData.periodCount
        delete cleanedData.periodType
        break
    }

    console.log("✅ Hábito criado com sucesso:", cleanedData)

    // Aqui você implementaria a lógica para salvar o hábito
    // Por exemplo, enviar para uma API ou salvar no estado global

    // Mostrando toast de sucesso
    toast.success("🎉 Hábito criado com sucesso!", {
      description: `${cleanedData.title} foi adicionado aos seus hábitos.`,
      duration: 3000,
    })

    // Em uma implementação real, você redirecionaria para a página de hábitos
    // router.push('/habits')

    // Limpar o formulário após sucesso
    form.reset({
      title: "",
      description: "",
      categoryId: "",
      type: "SUCCESS_FAILURE",
      frequency: "DAILY",
      weekDays: [],
      monthDays: [],
      startDate: new Date().toISOString().split('T')[0],
      targetDate: ""
    })
  }

  const renderFrequencyOptions = () => {
    switch (frequencyValue) {
      case "WEEKLY_DAYS":
        return (
          <FormField
            control={form.control}
            name="weekDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Escolha os dias da semana</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {weekDays.map((day) => (
                    <FormItem key={day.id} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(day.id)}
                          onCheckedChange={(checked) => {
                            const current = field.value || []
                            if (checked) {
                              field.onChange([...current, day.id])
                            } else {
                              field.onChange(current.filter(d => d !== day.id))
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {day.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "MONTHLY_DAYS":
        return (
          <FormField
            control={form.control}
            name="monthDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Escolha os dias do mês</FormLabel>
                <div className="grid grid-cols-7 gap-2">
                  {monthDaysOptions.map((day) => (
                    <div key={day} className="flex flex-col items-center">
                      <FormControl>
                        <Checkbox
                          id={`day-${day}`}
                          checked={field.value?.includes(day)}
                          onCheckedChange={(checked) => {
                            const current = field.value || []
                            if (checked) {
                              field.onChange([...current, day])
                            } else {
                              field.onChange(current.filter(d => d !== day))
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel htmlFor={`day-${day}`} className="text-xs font-normal cursor-pointer mt-1">
                        {day}
                      </FormLabel>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "MONTHLY_WEEKDAYS":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="monthWeekdayOccurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Ocorrência no mês</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione a ocorrência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weekdayOccurrences.map((occurrence) => (
                        <SelectItem key={occurrence.value} value={occurrence.value}>
                          {occurrence.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthWeekday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Dia da semana</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione o dia da semana" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weekDays.map((day) => (
                        <SelectItem key={day.id} value={day.id}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case "YEARLY_DATES":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="yearDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Dia</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="Dia do mês"
                        className="h-11"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Mês</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione o mês" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case "PERIOD_COUNT":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="periodCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Número de vezes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Quantas vezes"
                        className="h-11"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="periodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Por período</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {periodTypes.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Exemplo: 3 vezes por semana, 2 vezes por mês, etc.
            </p>
          </div>
        )

      case "EVERY_X_DAYS":
        return (
          <FormField
            control={form.control}
            name="intervalDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Repetir a cada X dias</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Número de dias"
                    className="h-11"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Exemplo: A cada 2 dias, a cada 7 dias, etc.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
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
          <h1 className="text-xl font-bold">Criar Hábito</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <h2 className="text-lg font-bold">Informações Básicas</h2>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Hábito<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Trabalhar no projeto pessoal, Estudar para a prova, Treinar..."
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva melhor seu hábito, seus objetivos ou motivações..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria<span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {activeCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Hábito<span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full flex items-center" size="lg">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUCCESS_FAILURE">
                          <div className="flex items-center gap-2">
                            <span>✅</span>
                            <div className="flex flex-col items-start">
                              <p className="font-medium">Sucesso/Falha</p>
                              <p className="text-xs text-muted-foreground">Marcar como feito ou não feito</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="TIMED">
                          <div className="flex items-center gap-2">
                            <span>⏱️</span>
                            <div className="flex flex-col items-start">
                              <p className="font-medium">Cronometrado</p>
                              <p className="text-xs text-muted-foreground">Medir tempo gasto na atividade</p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h2 className="text-lg font-bold">Configuração de Frequência</h2>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequência<span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DAILY">
                          <div className="flex items-center gap-2">
                            <span>🌅</span>
                            <span>Todos os dias</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="WEEKLY_DAYS">
                          <div className="flex items-center gap-2">
                            <span>📅</span>
                            <span>Alguns dias da semana</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="MONTHLY_DAYS">
                          <div className="flex items-center gap-2">
                            <span>📋</span>
                            <span>Dias específicos do mês</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="MONTHLY_WEEKDAYS">
                          <div className="flex items-center gap-2">
                            <span>🗓️</span>
                            <span>Dias da semana específicos do mês</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="YEARLY_DATES">
                          <div className="flex items-center gap-2">
                            <span>🎯</span>
                            <span>Dias específicos do ano</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="PERIOD_COUNT">
                          <div className="flex items-center gap-2">
                            <span>⚡</span>
                            <span>Algumas vezes por período</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="EVERY_X_DAYS">
                          <div className="flex items-center gap-2">
                            <span>🔄</span>
                            <span>Repetir a cada X dias</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Opções de frequência específicas */}
              {frequencyValue !== "DAILY" && (
                <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                  {renderFrequencyOptions()}
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold">Datas e Metas</h2>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Data Alvo</FormLabel>
                    <FormControl>
                      <Input type="date" className="h-11" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Data opcional para quando você quer alcançar este hábito
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Criar Hábito
            </Button>
          </form>
        </Form>
      </main>
    </div>
  )
}
