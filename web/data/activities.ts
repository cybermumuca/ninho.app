export const mockActivitiesList = [
  {
    id: "3",
    title: "Trabalho",
    activityType: "EVENT",
    category: {
      color: "yellow",
      icon: "briefcase-2",
    },
    modality: "SUCCESS_FAILURE",
    status: "SKIPPED",
    startDateTime: "08:00",
    endDateTime: "16:00",
  },
  {
    id: "4",
    title: "Consulta médica",
    activityType: "EVENT",
    category: {
      color: "red",
      icon: "stethoscope",
    },
    modality: "SUCCESS_FAILURE",
    status: "NONE",
    startDateTime: "18:00",
  },
  {
    id: "1",
    title: "Praticar no Teclado",
    activityType: "HABIT",
    category: {
      color: "blue",
      icon: "music",
    },
    modality: "TIMED",
    status: "PENDING",
  },
  {
    id: "2",
    title: "Jogar o lixo",
    activityType: "HOUSEHOLD_TASK",
    category: {
      color: "green",
      icon: "brush-cleaning",
    },
    modality: "SUCCESS_FAILURE",
    status: "SUCCESS",
  },
  {
    id: "5",
    title: "Aniversário de Casamento",
    activityType: "ANNIVERSARY",
    category: {
      color: "purple",
      icon: "cake",
    },
    modality: "SUCCESS_FAILURE",
    status: "NONE"
  }
] as const;