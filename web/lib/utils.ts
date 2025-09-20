import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DAILY_FREQUENCY, HabitFrequency, PERIOD_COUNT_FREQUENCY } from "./types/habit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

export function getFrequencyDescription(frequency: HabitFrequency) {
  switch (frequency.type) {
    case "DAILY": {
      return "Todos os dias";
    }
    case "PERIOD_COUNT": {
      const periodMap = {
        "WEEK": "semana",
        "MONTH": "mês",
        "YEAR": "ano"
      };

      return `${frequency.count} ${frequency.count > 1 ? "vezes" : "vez"} por ${periodMap[frequency.period]}`;
    }
    case "WEEKLY_DAYS": {
      const dayMap = {
        "SUNDAY": "Domingo",
        "MONDAY": "Segunda",
        "TUESDAY": "Terça",
        "WEDNESDAY": "Quarta",
        "THURSDAY": "Quinta",
        "FRIDAY": "Sexta",
        "SATURDAY": "Sábado"
      };

      const days = frequency.weekDays.map(day => dayMap[day]);
      return `Todas as ${days.join(", ")}`;
    }
  }
}

export function getCategoryColorClasses(color: string) {
  const colorMap = {
    "purple": {
      border: "border-purple-900",
      text: "text-purple-400",
      bg: "bg-purple-700/30",
    },
    "red": {
      border: "border-red-900",
      text: "text-red-400",
      bg: "bg-red-700/30",
    },
    "blue": {
      border: "border-blue-900",
      text: "text-blue-400",
      bg: "bg-blue-700/30",
    },
    "green": {
      border: "border-green-900",
      text: "text-green-400",
      bg: "bg-green-700/30",
    },
    "yellow": {
      border: "border-yellow-900",
      text: "text-yellow-400",
      bg: "bg-yellow-700/30",
    },
    "pink": {
      border: "border-pink-900",
      text: "text-pink-400",
      bg: "bg-pink-700/30",
    },
    "orange": {
      border: "border-orange-900",
      text: "text-orange-400",
      bg: "bg-orange-700/30",
    },
    "teal": {
      border: "border-teal-900",
      text: "text-teal-400",
      bg: "bg-teal-700/30",
    },
    "cyan": {
      border: "border-cyan-900",
      text: "text-cyan-400",
      bg: "bg-cyan-700/30",
    },
    "amber": {
      border: "border-amber-900",
      text: "text-amber-400",
      bg: "bg-amber-700/30",
    },
    "emerald": {
      border: "border-emerald-900",
      text: "text-emerald-400",
      bg: "bg-emerald-700/30",
    },
    "fuchsia": {
      border: "border-fuchsia-900",
      text: "text-fuchsia-400",
      bg: "bg-fuchsia-700/30",
    },
    "lime": {
      border: "border-lime-900",
      text: "text-lime-400",
      bg: "bg-lime-700/30",
    },
    "indigo": {
      border: "border-indigo-900",
      text: "text-indigo-400",
      bg: "bg-indigo-700/30",
    },
    "gray": {
      border: "border-gray-900",
      text: "text-gray-400",
      bg: "bg-gray-700/30",
    },
  }

  return colorMap[color as keyof typeof colorMap] || colorMap["gray"];
}

export function getActivityTypeLabel(activityType: string) {
  const activityTypeMap = {
    "TASK": "Tarefa",
    "EVENT": "Evento",
    "HOUSEHOLD_TASK": "Tarefa Doméstica",
    "HABIT": "Hábito",
    "ANNIVERSARY": "Aniversário"
  };

  return activityTypeMap[activityType as keyof typeof activityTypeMap] || "Atividade";
}