import { ResponsiveGroceryListMenuOverlay } from "./responsive-grocery-list-menu-overlay";

export default async function GroceryListMenu({ params }: { params: Promise<{ groceryListId: string }> }) {
  const { groceryListId } = await params;

  return <ResponsiveGroceryListMenuOverlay groceryListId={groceryListId} />;
}