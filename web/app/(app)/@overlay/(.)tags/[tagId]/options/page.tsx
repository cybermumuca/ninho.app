import { ResponsiveTagOptionsOverlay } from "./responsive-tag-options-overlay";

export default async function TagOptionsPage({ params }: { params: Promise<{ tagId: string }> }) {
  const { tagId } = await params;

  return <ResponsiveTagOptionsOverlay tagId={tagId} />;
}