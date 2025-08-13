import { ResponsiveGroceryListOptionsOverlay } from "./responsive-grocery-list-options-overlay";

export default async function GroceryListItemOptions({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ResponsiveGroceryListOptionsOverlay groceryId={id} />;
}