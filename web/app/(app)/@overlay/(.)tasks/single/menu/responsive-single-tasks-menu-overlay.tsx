"use client";

import { useSimpleTaskListStore } from "@/app/(app)/(mobile-navigation)/tasks/(tab)/single/simple-task-list-store";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import { SelectValue } from "@radix-ui/react-select";
import { ArrowDownAZIcon, CalendarArrowDownIcon, CircleXIcon, ClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ResponsiveSingleTasksMenuOverlay() {
  const {
    groupBy,
    setGroupBy,
    sortBy,
    setSortBy,
    resetCollapsedGroups,
    dateRange,
    setDateRange,
    showTaskCount,
    setShowTaskCount
  } = useSimpleTaskListStore();
  const router = useRouter();
  const isMobile = useIsMobile();

  function handleSortChange(newSort: typeof sortBy) {
    setSortBy(newSort);
    resetCollapsedGroups();
  }

  function handleGroupChange(newGroup: typeof groupBy) {
    setGroupBy(newGroup);
    resetCollapsedGroups();
  }

  const content = (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Exibição</h3>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal">
            Limitar tarefas por data
          </Label>
          <Select onValueChange={setDateRange} defaultValue={dateRange}>
            <SelectTrigger className="max-h-8">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAY">Hoje</SelectItem>
              <SelectItem value="WEEK">Esta semana</SelectItem>
              <SelectItem value="MONTH">Este mês</SelectItem>
              <SelectItem value="ALL">Não limitar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-normal" htmlFor="show-task-count">
            Exibir contagem de tarefas nos grupos
          </Label>
          <Switch
            id="show-task-count"
            checked={showTaskCount}
            onCheckedChange={setShowTaskCount}
          />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Agrupar por</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={groupBy === "alphabet" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleGroupChange("alphabet")}
            size="lg"
          >
            <ArrowDownAZIcon className="size-5" />
            Alfabeto
          </Button>
          <Button
            variant={groupBy === "date" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleGroupChange("date")}
            size="lg"
          >
            <CalendarArrowDownIcon className="size-5" />
            Data
          </Button>
          <Button
            variant={groupBy === "none" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleGroupChange("none")}
            size="lg"
          >
            <CircleXIcon className="size-5" />
            Não agrupar
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Ordenar por</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={sortBy === "alphabet" ? "default" : "outline"}
            className="justify-start"
            onClick={() => handleSortChange("alphabet")}
            size="lg"
          >
            <ArrowDownAZIcon className="size-5" />
            Alfabeto
          </Button>
          <Button
            variant={sortBy === "estimatedDuration" ? "default" : "outline"}
            className="justify-start text-xs md:text-sm"
            onClick={() => handleSortChange("estimatedDuration")}
            size="lg"
          >
            <ClockIcon className="size-5" />
            Duração Estimada
          </Button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={true} onOpenChange={() => router.back()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Opções de Listagem</DrawerTitle>
            <DrawerDescription>Gerencie as opções da listagem de tarefas</DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Opções de Listagem</SheetTitle>
          <SheetDescription>Gerencie as opções da listagem de tarefas</SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  )
}