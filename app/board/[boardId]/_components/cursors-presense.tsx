"use client";

import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionIds) => (
        <Cursor
          key={connectionIds}
          connectionId={connectionIds}
        /> 
      ))}
    </>
  )
}

export const CursorPresence = memo(() => {
  return (
    <>
    {/* Dropped Pencil */}
      <Cursors/>
    </>
  );
});

CursorPresence.displayName = "CursorPresence";