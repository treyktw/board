"use client"

import { useState } from "react"

import { CanvasMode, CanvasState } from "@/types/canvas"

import { Participants } from "@/app/board/[boardId]/_components/participants"
import { Info } from "./info"
import { Toolbar } from "./toolbar"
import { useHistory, useCanRedo, useCanUndo, useUndo } from "@/liveblocks.config"

interface CanvasProps {
  boardId: string
}

export const Canvas = ({
  boardId
}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <div className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId}/>
      <Participants />
      <Toolbar 
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </div>
  )
}