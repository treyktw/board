'use client';

import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { ColorPicker } from "./colorpicker";

import { BringToFront, SendToBack, Trash2 } from "lucide-react";

import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas"



interface SelectionToolsProps {
  camera: Camera,
  setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({
  camera,
  setLastUsedColor,
}: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection);

  const selectionBounds = useSelectionBounds();

  const moveToFront = useMutation((
    { storage }
  ) => {
    const liveLayersIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayersIds.toArray();

    for(let i = 0; i < arr.length; i++) {
      if(selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for(let i = indices.length -1; i >= 0; i--) {
      liveLayersIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
    }
  }, [selection]);

  const moveToBack = useMutation((
    { storage }
  ) => {
    const liveLayersIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayersIds.toArray();

    for(let i = 0; i < arr.length; i++) {
      if(selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for(let i = 0; i < indices.length; i++) {
      liveLayersIds.move(indices[i], i)
    }
  }, [selection]);

  const setFill = useMutation((
      { storage },
      fill: Color
    ) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill)

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill)
      })
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers();


  if(!selectionBounds) {
    return null;
  }

  
  
  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div className="absolute rounded-xl p-3 bg-white border flex select-none"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
      }}
    >
      <ColorPicker
        onChange={setFill}
      />
      <div className="flex flex-col gap-y-0.5">
        <Hint label="Bring to Front">
          <Button variant={ "board" } size={"icon"} onClick={moveToFront}>
            <BringToFront />
          </Button>
        </Hint>
        <Hint label="Send Back" side="bottom">
          <Button variant={ "board" } size={"icon"} onClick={moveToBack}>
            <SendToBack />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-b-neutral-200">
        <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
          <Trash2 />
        </Button>
      </div>
    </div>
  )
});

SelectionTools.displayName = "SelectionTools"