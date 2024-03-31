import { Loader } from "lucide-react";
import { Info } from "./info";
import { ToolbarSkeleton } from "./toolbar";
import { Participants } from "./participants";

export const Loading = () => {
  return (
    <main
      className="h-screen w-full relative bg-neutral-100 touch-none flex items-center justify-center"
    >
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <ToolbarSkeleton />
    </main>
  );
};