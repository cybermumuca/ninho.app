import { ResponsiveGroceryListOptionsOverlay } from "./responsive-grocery-list-options-overlay";

export default async function GroceryListItemOptions({ params }: { params: Promise<{ groceryListId: string }> }) {
  const { groceryListId } = await params;

  return <ResponsiveGroceryListOptionsOverlay groceryListId={groceryListId} />;
}