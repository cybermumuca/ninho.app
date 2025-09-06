"use client"

import { useHabitWizardStore, FrequencyType, MonthlyWeekdayOccurrence, YearlyDateOccurrence } from "@/stores/habit-wizard-store"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PlusIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const frequencyOptions = [
  {
    type: "DAILY" as FrequencyType,
    title: "Todos os dias",
  },
  {
    type: "WEEKLY_DAYS" as FrequencyType,
    title: "Alguns dias da semana",
  },
  {
    type: "MONTHLY_DAYS" as FrequencyType,
    title: "Dias específicos do mês",
  },
  {
    type: "MONTHLY_WEEKDAYS" as FrequencyType,
    title: "Dias da semana específicos do mês",
  },
  {
    type: "YEARLY_DATES" as FrequencyType,
    title: "Dias específicos do ano",
  },
  {
    type: "PERIOD_COUNT" as FrequencyType,
    title: "Algumas vezes por período",
  },
  {
    type: "EVERY_X_DAYS" as FrequencyType,
    title: "A cada X dias",
  }
]

const weekDays = [
  { id: "monday", label: "Segunda" },
  { id: "tuesday", label: "Terça" },
  { id: "wednesday", label: "Quarta" },
  { id: "thursday", label: "Quinta" },
  { id: "friday", label: "Sexta" },
  { id: "saturday", label: "Sábado" },
  { id: "sunday", label: "Domingo" }
]

const monthDaysOptions = Array.from({ length: 31 }, (_, i) => i + 1)

const weekdayOccurrences = [
  { value: "first", label: "1°" },
  { value: "second", label: "2°" },
  { value: "third", label: "3°" },
  { value: "fourth", label: "4°" },
  { value: "fifth", label: "5°" },
  { value: "last", label: "Último" }
]

const months = [
  { value: "january", label: "Janeiro" },
  { value: "february", label: "Fevereiro" },
  { value: "march", label: "Março" },
  { value: "april", label: "Abril" },
  { value: "may", label: "Maio" },
  { value: "june", label: "Junho" },
  { value: "july", label: "Julho" },
  { value: "august", label: "Agosto" },
  { value: "september", label: "Setembro" },
  { value: "october", label: "Outubro" },
  { value: "november", label: "Novembro" },
  { value: "december", label: "Dezembro" }
]

const periodTypes = [
  { value: "WEEK", label: "Semana" },
  { value: "MONTH", label: "Mês" },
  { value: "YEAR", label: "Ano" }
]

export function FrequencyStep() {
  const { formData, updateFormData } = useHabitWizardStore()

  function handleFrequencySelect(frequency: FrequencyType) {
    updateFormData({
      frequency,
      weekDays: [],
      monthDays: [],
      monthWeekdayOccurrences: [],
      yearlyDateOccurrences: [],
      periodCount: null,
      periodType: null,
      intervalDays: null
    })
  }

  function renderFrequencyOptions() {
    switch (formData.frequency) {
      case "WEEKLY_DAYS": {
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {weekDays.map((day) => (
              <div key={day.id} className="flex items-center space-x-2">
                <Checkbox
                  id={day.id}
                  checked={formData.weekDays?.includes(day.id) || false}
                  onCheckedChange={(checked) => {
                    const current = formData.weekDays || []
                    if (checked) {
                      updateFormData({ weekDays: [...current, day.id] })
                    } else {
                      updateFormData({ weekDays: current.filter(d => d !== day.id) })
                    }
                  }}
                />
                <Label htmlFor={day.id} className="text-sm cursor-pointer">
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        )
      }
      case "MONTHLY_DAYS": {
        return (
          <div className="space-y-3">
            <Label className="text-base font-semibold">Escolha os dias do mês</Label>
            <div className="grid grid-cols-7 gap-2 max-h-60 p-1 overflow-y-auto">
              {monthDaysOptions.map((day) => (
                <div
                  id={`day-${day}`}
                  className={cn("flex items-center justify-center p-2 rounded-lg transition-all duration-250 cursor-pointer ring-2 ring-muted", formData.monthDays?.includes(day) && "ring-2 ring-primary bg-primary/10")}
                  onClick={() => {
                    const current = formData.monthDays || []

                    if (current.includes(day)) {
                      updateFormData({ monthDays: current.filter(d => d !== day) })
                    } else {
                      updateFormData({ monthDays: [...current, day] })
                    }
                  }}
                >
                  <Label htmlFor={`day-${day}`} className="text-xs">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case "MONTHLY_WEEKDAYS": {
        const occurrences = formData.monthWeekdayOccurrences || []

        function addOccurrence() {
          const newOccurrence: MonthlyWeekdayOccurrence = {
            id: Date.now().toString(),
            occurrence: "",
            weekday: ""
          }
          updateFormData({
            monthWeekdayOccurrences: [...occurrences, newOccurrence]
          })
        }

        function removeOccurrence(id: string) {
          updateFormData({
            monthWeekdayOccurrences: occurrences.filter(occ => occ.id !== id)
          })
        }

        function updateOccurrence(id: string, field: 'occurrence' | 'weekday', value: string) {
          const updatedOccurrences = occurrences.map(occ =>
            occ.id === id ? { ...occ, [field]: value } : occ
          )

          const currentOccurrence = updatedOccurrences.find(occ => occ.id === id)
          if (currentOccurrence && currentOccurrence.occurrence && currentOccurrence.weekday) {
            const duplicateExists = updatedOccurrences.some(occ =>
              occ.id !== id &&
              occ.occurrence === currentOccurrence.occurrence &&
              occ.weekday === currentOccurrence.weekday
            )

            if (duplicateExists) {
              const occurrenceLabel = weekdayOccurrences.find(o => o.value === currentOccurrence.occurrence)?.label
              const weekdayLabel = weekDays.find(d => d.id === currentOccurrence.weekday)?.label
              toast.error("Combinação duplicada", {
                description: `"${occurrenceLabel} ${weekdayLabel}" já foi adicionado. Escolha uma combinação diferente.`
              })
              return
            }
          }

          updateFormData({
            monthWeekdayOccurrences: updatedOccurrences
          })
        }

        function isComboAlreadyUsed(currentId: string, occurrence: string, weekday: string) {
          return occurrences.some(occ =>
            occ.id !== currentId &&
            occ.occurrence === occurrence &&
            occ.weekday === weekday
          )
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Configurar entradas</Label>
              <Button
                type="button"
                size="sm"
                onClick={addOccurrence}
                className="flex items-center gap-2"
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>

            {occurrences.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Adicione entradas para configurar os dias da semana específicos do mês em que esse hábito deve ocorrer
              </p>
            ) : (
              <div className="space-y-2">
                {occurrences.map((occurrence, idx) => (
                  <div key={idx} className="flex items-end gap-2 p-3 border rounded-lg bg-muted/30">
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm font-medium">Ocorrência</Label>
                      <Select
                        value={occurrence.occurrence}
                        onValueChange={(value) => updateOccurrence(occurrence.id, 'occurrence', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {weekdayOccurrences.map((occ) => {
                            const wouldBeDuplicate = !!occurrence.weekday &&
                              isComboAlreadyUsed(occurrence.id, occ.value, occurrence.weekday)
                            return (
                              <SelectItem
                                key={occ.value}
                                value={occ.value}
                                disabled={wouldBeDuplicate}
                              >
                                {occ.label}
                                {wouldBeDuplicate && " (já usado)"}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm font-medium">Dia da semana</Label>
                      <Select
                        value={occurrence.weekday}
                        onValueChange={(value) => updateOccurrence(occurrence.id, 'weekday', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {weekDays.map((day) => {
                            const wouldBeDuplicate = !!occurrence.occurrence &&
                              isComboAlreadyUsed(occurrence.id, occurrence.occurrence, day.id)
                            return (
                              <SelectItem
                                key={day.id}
                                value={day.id}
                                disabled={wouldBeDuplicate}
                              >
                                {day.label}
                                {wouldBeDuplicate && " (já usado)"}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeOccurrence(occurrence.id)}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }
      case "YEARLY_DATES": {
        const dateOccurrences = formData.yearlyDateOccurrences || []

        function addDateOccurrence() {
          const newDateOccurrence: YearlyDateOccurrence = {
            id: Date.now().toString(),
            day: 1,
            month: ""
          }
          updateFormData({
            yearlyDateOccurrences: [...dateOccurrences, newDateOccurrence]
          })
        }

        function removeDateOccurrence(id: string) {
          updateFormData({
            yearlyDateOccurrences: dateOccurrences.filter(date => date.id !== id)
          })
        }

        function updateDateOccurrence(id: string, field: 'day' | 'month', value: number | string) {
          const updatedOccurrences = dateOccurrences.map(date =>
            date.id === id ? { ...date, [field]: value } : date
          )

          const currentOccurrence = updatedOccurrences.find(date => date.id === id)
          if (currentOccurrence && currentOccurrence.day && currentOccurrence.month) {
            const duplicateExists = updatedOccurrences.some(date =>
              date.id !== id &&
              date.day === currentOccurrence.day &&
              date.month === currentOccurrence.month
            )

            if (duplicateExists) {
              const monthLabel = months.find(m => m.value === currentOccurrence.month)?.label
              toast.error("Data duplicada", {
                description: `"${currentOccurrence.day} de ${monthLabel}" já foi adicionado. Escolha uma data diferente.`
              })
              return
            }
          }

          updateFormData({
            yearlyDateOccurrences: updatedOccurrences
          })
        }

        function isDateComboAlreadyUsed(currentId: string, day: number, month: string): boolean {
          return dateOccurrences.some(date =>
            date.id !== currentId &&
            date.day === day &&
            date.month === month
          )
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Configurar entradas</Label>
              <Button
                type="button"
                size="sm"
                onClick={addDateOccurrence}
                className="flex items-center gap-2"
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>

            {dateOccurrences.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Adicione entradas para configurar os dias específicos do ano em que esse hábito deve ocorrer
              </p>
            ) : (
              <div className="space-y-3">
                {dateOccurrences.map((dateOccurrence) => (
                  <div key={dateOccurrence.id} className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm font-medium">Dia</Label>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="Dia"
                        value={dateOccurrence.day || ""}
                        onChange={(e) => {
                          const day = parseInt(e.target.value) || 1
                          updateDateOccurrence(dateOccurrence.id, 'day', day)
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm font-medium">Mês</Label>
                      <Select
                        value={dateOccurrence.month}
                        onValueChange={(value) => updateDateOccurrence(dateOccurrence.id, 'month', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => {
                            const wouldBeDuplicate = !!dateOccurrence.day &&
                              isDateComboAlreadyUsed(dateOccurrence.id, dateOccurrence.day, month.value)
                            return (
                              <SelectItem
                                key={month.value}
                                value={month.value}
                                disabled={wouldBeDuplicate}
                              >
                                {month.label}
                                {wouldBeDuplicate && " (já usado)"}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDateOccurrence(dateOccurrence.id)}
                      className="text-destructive"
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }
      case "PERIOD_COUNT": {
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Quantas vezes</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder=""
                  value={formData.periodCount || ""}
                  onChange={(e) => updateFormData({ periodCount: parseInt(e.target.value) || null })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold">Por período</Label>
                <Select
                  value={formData.periodType || ""}
                  onValueChange={(value) => updateFormData({ periodType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodTypes.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      }
      case "EVERY_X_DAYS": {
        return (
          <div className="space-y-2">
            <Label className="text-base font-semibold">A cada quantos dias?</Label>
            <Input
              type="number"
              min="1"
              value={formData.intervalDays || ""}
              onChange={(e) => updateFormData({ intervalDays: parseInt(e.target.value) || null })}
            />
          </div>
        )
      }
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Definir Frequência</h2>
        <p className="text-muted-foreground">
          Com que frequência você quer praticar este hábito?
        </p>
      </div>

      <div className="grid gap-3">
        <RadioGroup onValueChange={handleFrequencySelect}>
          {frequencyOptions.map((option) => (
            <>
              <div className="flex items-center space-x-2" key={option.type}>
                <RadioGroupItem value={option.type} id={option.type} />
                <Label htmlFor={option.type}>{option.title}</Label>
              </div>
              {formData.frequency && formData.frequency !== "DAILY" && formData.frequency === option.type && (
                <div className="mt-1 p-4 border rounded-lg bg-muted/30 space-y-4" key={option.type}>
                  {renderFrequencyOptions()}
                </div>
              )}
            </>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
