type Room = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

type Task = {
  id: number;
  roomId: number;
  dueDate: string; // formato ISO
  done: boolean;
};

export type RoomSummary = Room & {
  tasksOverdue: number;
  tasksToday: number;
  tasksCompletedToday: number;
  allDone: boolean;
  noTasks: boolean;
};

export const mockRoomList: RoomSummary[] = [
  { 
    id: 1, 
    name: "Quarto", 
    icon: "BED", 
    color: "blue", 
    tasksOverdue: 0, 
    tasksToday: 3, 
    tasksCompletedToday: 0,
    allDone: false, 
    noTasks: false, 
  },
  { 
    id: 2, 
    name: "Sala", 
    icon: "SOFA", 
    color: "green", 
    tasksOverdue: 2,
    tasksToday: 0, 
    tasksCompletedToday: 1,
    allDone: false, 
    noTasks: false,
  },
  { 
    id: 3, 
    name: "Cozinha", 
    icon: "UTENSILS",
    color: "red", 
    tasksOverdue: 0,
    tasksToday: 0, 
    tasksCompletedToday: 0,
    allDone: false, 
    noTasks: true,
  },
  {
    id: 4,
    name: "Banheiro",
    icon: "BATH",
    color: "purple",
    tasksOverdue: 0,
    tasksToday: 0,
    tasksCompletedToday: 0,
    allDone: true,
    noTasks: false,
  }
];