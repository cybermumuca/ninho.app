"use client"

import { useHabitWizardStore } from "@/stores/habit-wizard-store"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TitleStep() {
  const { formData, updateFormData } = useHabitWizardStore()

  function handleTitleChange(title: string) {
    updateFormData({ title })
  }

  function handleDescriptionChange(description: string) {
    updateFormData({ description })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Informações Básicas</h2>
        <p className="text-muted-foreground">
          Dê um nome claro e motivador para seu hábito. A descrição é opcional, mas pode ajudar você a lembrar dos detalhes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold inline-block">
            Título do Hábito <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Seja específico e use verbos de ação. Ex: Meditar 10 minutos, Ler 30 páginas, Fazer exercícios...
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-semibold">
            Descrição (opcional)
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            Descreva melhor seu hábito, suas motivações, objetivos ou detalhes importantes...
          </p>
        </div>
      </div>
    </div>
  )
}
