"use client"

import { useHabitWizardStore } from "@/stores/habit-wizard-store"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { CategoryStep } from "./steps/category-step"
import { TypeStep } from "./steps/type-step"
import { TitleStep } from "./steps/title-step"
import { FrequencyStep } from "./steps/frequency-step"
import { DatesStep } from "./steps/dates-step"
import { useRouter } from "next/navigation"

export default function HabitWizardPage() {
  const router = useRouter();
  const {
    currentStep
  } = useHabitWizardStore()

  const stepComponents = [
    <CategoryStep />,
    <TypeStep />,
    <TitleStep />,
    <FrequencyStep />,
    <DatesStep />
  ]

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
      <main className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <div className="absolute inset-0 p-4 overflow-y-auto">
            {stepComponents[currentStep]}
          </div>
        </div>

        <NewHabitFooter />
      </main>
    </div>
  )
}

function NewHabitFooter() {
  const { currentStep, prevStep, nextStep, isStepValid, submitHabit } = useHabitWizardStore();
  const router = useRouter();

  return (
    <footer className="flex items-center bg-muted/20 p-4 gap-2">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
        className="flex-1 h-11"
      >
        <ChevronLeftIcon className="h-4 w-4 mr-2" />
        Anterior
      </Button>

      {currentStep === 4 ? (
        <Button
          onClick={() => {
            submitHabit();
            router.back();
          }}
          disabled={!isStepValid()}
          className="flex-2 h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          Criar Hábito
        </Button>
      ) : (
        <Button
          onClick={nextStep}
          disabled={!isStepValid()}
          className="flex-2 h-11"
        >
          Próximo
          <ChevronRightIcon className="h-4 w-4 ml-2" />
        </Button>
      )}
    </footer>
  )
}
