import { ResponsiveGroceryOptionsOverlay } from "./responsive-grocery-options-overlay";

export default async function GroceryListItemOptions({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ResponsiveGroceryOptionsOverlay groceryId={id} />;
}