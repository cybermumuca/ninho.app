import { ResponsiveSingleTaskOptionsOverlay } from "./responsive-single-task-options-overlay";

export default async function SingleTaskOptionsPage({ params }: { params: Promise<{ singleTaskId: string }> }) {
  const { singleTaskId } = await params;

  return <ResponsiveSingleTaskOptionsOverlay singleTaskId={singleTaskId} />;
}