import { NextResponse } from "next/server";
import { initializeGame, hit, stand } from "@/app/lib/gameLogic";

export async function POST(request) {
  const { action, gameState } = await request.json();

  let newState;

  switch (action) {
    case "new":
      newState = initializeGame();
      break;
    case "hit":
      newState = hit(gameState);
      break;
    case "stand":
      newState = stand(gameState);
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json(newState);
}
export async function GET() {
  return NextResponse.json({ message: "Game API is working" });
}
