import { TasksLayoutHeader } from "./task-layout-header";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <TasksLayoutHeader />
        </div>
      </header>
      {children}
    </div>
  )
}
