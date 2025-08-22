import { ResponsiveCategoryOptionsOverlay } from "./responsive-category-options-overlay";

export default async function CategoryOptionsPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;

  return <ResponsiveCategoryOptionsOverlay categoryId={categoryId} />;
}
