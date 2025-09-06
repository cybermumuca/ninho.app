import { create } from 'zustand'

export type HabitType = "SUCCESS_FAILURE" | "TIMED"
export type FrequencyType =
  | "DAILY"
  | "WEEKLY_DAYS"
  | "MONTHLY_DAYS"
  | "MONTHLY_WEEKDAYS"
  | "YEARLY_DATES"
  | "PERIOD_COUNT"
  | "EVERY_X_DAYS"

export type PeriodType = "WEEK" | "MONTH" | "YEAR"

export interface MonthlyWeekdayOccurrence {
  id: string
  occurrence: string
  weekday: string
}

export interface YearlyDateOccurrence {
  id: string
  day: number
  month: string
}

export interface HabitFormData {
  // Passo 1: Categoria
  categoryId: string

  // Passo 2: Tipo
  type: HabitType | null

  // Passo 3: Título e descrição
  title: string
  description: string

  // Passo 4: Frequência
  frequency: FrequencyType | null
  weekDays?: string[]
  monthDays?: number[]
  monthWeekdayOccurrences?: MonthlyWeekdayOccurrence[]
  yearlyDateOccurrences?: YearlyDateOccurrence[]
  periodCount?: number | null
  periodType?: PeriodType | null
  intervalDays?: number | null

  // Passo 5: Datas
  startDate: string
  targetDate: string
}

interface HabitWizardState {
  currentStep: number
  formData: HabitFormData

  // Actions
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<HabitFormData>) => void
  resetForm: () => void
  isStepValid: () => boolean
  submitHabit: () => Promise<void>
}

const initialFormData: HabitFormData = {
  categoryId: "",
  type: null,
  title: "",
  description: "",
  frequency: null,
  weekDays: [],
  monthDays: [],
  monthWeekdayOccurrences: [],
  yearlyDateOccurrences: [],
  periodCount: null,
  periodType: null,
  intervalDays: null,
  startDate: new Date().toISOString().split('T')[0],
  targetDate: ""
}

export const useHabitWizardStore = create<HabitWizardState>((set, get) => ({
  currentStep: 0,
  formData: initialFormData,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 4)
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),

  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  resetForm: () => set({
    currentStep: 1,
    formData: initialFormData
  }),

  isStepValid: () => {
    const { formData, currentStep } = get()

    switch (currentStep) {
      case 0: // Categoria
        return formData.categoryId !== ""
      case 1: // Tipo
        return formData.type !== null
      case 2: // Título e descrição
        return formData.title.trim() !== ""
      case 3: // Frequência
        if (!formData.frequency) return false

        switch (formData.frequency) {
          case "DAILY":
            return true
          case "WEEKLY_DAYS":
            return formData.weekDays ? formData.weekDays.length > 0 : false
          case "MONTHLY_DAYS":
            return formData.monthDays ? formData.monthDays.length > 0 : false
          case "MONTHLY_WEEKDAYS":
            return formData.monthWeekdayOccurrences ? formData.monthWeekdayOccurrences.length > 0 : false
          case "YEARLY_DATES":
            return formData.yearlyDateOccurrences ? formData.yearlyDateOccurrences.length > 0 : false
          case "PERIOD_COUNT":
            return !!(formData.periodCount && formData.periodType)
          case "EVERY_X_DAYS":
            return !!(formData.intervalDays && formData.intervalDays > 0)
          default:
            return false
        }
      case 4: // Datas
        return formData.startDate !== ""
      default:
        return false
    }
  },

  submitHabit: async () => {
    const { formData } = get()

    console.log("✅ Hábito criado:", formData)
  }
}))
