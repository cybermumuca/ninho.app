import { ResponsiveRoomListItemOptionsOverlay } from "./responsive-room-list-item-options-overlay";

export default async function RoomListItemOptions({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  return <ResponsiveRoomListItemOptionsOverlay roomId={roomId} />;
}