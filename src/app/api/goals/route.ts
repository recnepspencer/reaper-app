// src/app/api/goals/route.ts

import { NextResponse } from "next/server";
import { createGoal, getAllGoals, deleteGoal, getGoalById } from "@/lib/db/goalFunctions";
import { GoalType } from "@/lib/interfaces/goals.interface";

// Handle GET request to fetch all goals
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId || Array.isArray(userId)) {
      return NextResponse.json(
        { error: "Valid User ID is required bro" },
        { status: 400 }
      );
    }

    const goals = await getAllGoals(userId);
    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error("GET /api/goals error:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

// Handle POST request to create a new goal
export async function POST(request: Request) {
  try {
    const { title, description, type, userId } = await request.json();

    if (
      !title ||
      !description ||
      !type ||
      !userId ||
      !["TIMER", "COUNTER", "YESNO"].includes(type)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const newGoal = await createGoal(userId, {
      title,
      description,
      type: type as GoalType,
    });
    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    console.error("POST /api/goals error:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}

