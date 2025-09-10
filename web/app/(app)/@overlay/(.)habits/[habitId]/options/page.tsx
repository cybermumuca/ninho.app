import { ResponsiveHabitOptionsOverlay } from "./responsive-habit-options-overlay";

export default async function HabitOptionsPage({ params }: { params: Promise<{ habitId: string }> }) {
  const { habitId } = await params;

  return <ResponsiveHabitOptionsOverlay habitId={habitId} />;
}