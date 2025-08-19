import { Button } from "@/components/ui/button";
import { CirclePlusIcon, Home, PlusCircle } from "lucide-react";
import { RoomListCard } from "./room-list-card";
import { mockRoomList } from "@/data/rooms";
import Link from "next/link";

export default function RoomsPage() {
  const hasRooms = mockRoomList.length > 0;

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <div className="flex justify-between items-center container mx-auto px-4 py-4">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-foreground">Cômodos</h1>
          </div>
          <Button
            className="rounded-md p-2 -m-2 cursor-pointer"
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/rooms/add">
              <CirclePlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-4">
        {hasRooms ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRoomList.map(room => (
              <RoomListCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6 p-4 rounded-full bg-muted">
              <Home className="size-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Nenhum cômodo cadastrado</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Organize suas tarefas domésticas criando cômodos. Cada cômodo pode ter suas próprias tarefas e você pode acompanhar o progresso de cada um.
            </p>
            <Button className="gap-2" asChild>
              <Link href="/rooms/add">
                <PlusCircle className="size-4" />
                Criar primeiro cômodo
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}