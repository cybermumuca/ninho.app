import { ResponsiveGroceryListMenuOverlay } from "./responsive-grocery-list-menu";

export default async function GroceryListMenu({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ResponsiveGroceryListMenuOverlay groceryId={id} />;
}