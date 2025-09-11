import { ResponsiveHabitTaskOptionsOverlay } from "./responsive-habit-task-options-overlay";

export default async function HabitTaskOptionsPage({ params }: { params: Promise<{ habitId: string, taskId: string }> }) {
  const { habitId, taskId } = await params;

  return <ResponsiveHabitTaskOptionsOverlay habitId={habitId} taskId={taskId} />;
}