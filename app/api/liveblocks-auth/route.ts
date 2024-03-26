import { currentUser, User } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: "sk_dev_F9ccrfBHyvnkS5uB0OmZLA2PHz9GH-mKFqiBAhblz53GapAuOmprSsQF_stPhsQ7",
});


export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();


  if(!authorization|| !user) {
    return new Response("Unauthorized", { status: 403 }); // Add back status: 403
  };

  const { room } = await request.json();
  const board = await convex.query(api.board.get, {id: room});



  if(board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  };

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(
    user.id,
    { userInfo }
  );

  if(room) {
    session.allow(room, session.FULL_ACCESS)
  };

  const { status, body} = await session.authorize();
  console.log({ status, body }, "Allowed")
  return new Response(body, { status });

}

