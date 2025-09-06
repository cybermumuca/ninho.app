"use client"

import { useHabitWizardStore } from "@/stores/habit-wizard-store"
import { HabitType } from "@/stores/habit-wizard-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Timer } from "lucide-react"

const habitTypes = [
  {
    type: "SUCCESS_FAILURE" as HabitType,
    title: "Sucesso/Falha",
    description: "Marque como feito ou não feito.",
    icon: CheckCircle,
    examples: ["Meditar", "Beber água", "Fazer exercícios", "Ler"]
  },
  {
    type: "TIMED" as HabitType,
    title: "Cronometrado",
    description: "Defina uma meta de tempo.",
    icon: Timer,
    examples: ["Estudar", "Trabalhar no projeto", "Tocar piano", "Exercitar-se"]
  }
]

export function TypeStep() {
  const { formData, updateFormData } = useHabitWizardStore()

  function handleTypeSelect(type: HabitType) {
    updateFormData({ type })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Escolher Tipo</h2>
        <p className="text-muted-foreground">
          Como você quer medir o progresso do seu hábito? Escolha o tipo que melhor se adapta à sua necessidade.
        </p>
      </div>
      <div className="grid gap-4">
        {habitTypes.map((habitType) => {
          const Icon = habitType.icon
          const isSelected = formData.type === habitType.type

          return (
            <Card
              key={habitType.type}
              className={`cursor-pointer transition-all hover:shadow-md ${isSelected
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-muted/50'
                }`}
              onClick={() => handleTypeSelect(habitType.type)}
            >
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                    }`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col -translate-y-1">
                      <h3 className="text-lg font-semibold">{habitType.title}</h3>

                      <p className="text-sm text-muted-foreground">
                        {habitType.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-sm font-semibold text-muted-foreground">Exemplos:</span>
                      {habitType.examples.map((example, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
