import { GroceryListItemOptionsOverlay } from "./grocery-list-item-options-overlay";

interface PageParams {
  groceryListId: string;
  itemId: string;
}

export default async function GroceryListItemOptionsPage({
  params
}: {
  params: Promise<PageParams>
}) {
  const { groceryListId, itemId } = await params;

  return <GroceryListItemOptionsOverlay groceryListId={groceryListId} itemId={itemId} />;
}