import { HabitHeader } from "./habit-header";

export default function HabitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <HabitHeader />
      </header>
      {children}
    </div>
  );
}