'use client';

import Image from "next/image";
import Link from "next/link";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Actions } from "@/components/actions";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRenameModal } from "@/store/use-rename-modal";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const TabSeperator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  )
}

export const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">
  });

  const { onOpen } = useRenameModal();

  if (!data) return <Info.Skeleton />

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md select-none">
      <Hint label="Go To Boards" side="bottom" sideOffset={10}>
        <Button variant="board" className="px-2" asChild>
          <Link href="/">
            <Image src="/logo.svg" alt="Board Logo" height={40} width={40} />
            <span className={cn(
              "font-semibold text-xl ml-2 text-black", font.className
            )}>
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Edit Board Title" side="bottom" sideOffset={10}>
        <Button variant="board" className="text-base font-normal px-2" onClick={() => onOpen(data?._id, data?.title)}>
          {data?.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>

    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  )
}