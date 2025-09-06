"use client"

import { useHabitWizardStore } from "@/stores/habit-wizard-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DatesStep() {
  const { formData, updateFormData } = useHabitWizardStore()

  function handleStartDateChange(startDate: string) {
    updateFormData({ startDate })
  }

  function handleTargetDateChange(targetDate: string) {
    updateFormData({ targetDate })
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Quando você quer começar este hábito? Defina também uma data alvo opcional para se manter motivado.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-base font-semibold">
            Data de Início <span className="text-red-500">*</span>
          </Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="h-11"
          />
          <p className="text-sm text-muted-foreground">
            A partir de quando você começará a praticar este hábito.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetDate" className="text-base font-semibold">
            Data Alvo
          </Label>
          <Input
            id="targetDate"
            type="date"
            value={formData.targetDate}
            onChange={(e) => handleTargetDateChange(e.target.value)}
            className="h-11"
            min={formData.startDate}
          />
          <p className="text-sm text-muted-foreground">
            Até quando você quer manter este hábito? Deixe vazio para indefinido.
          </p>
        </div>
      </div>
    </div>
  )
}
