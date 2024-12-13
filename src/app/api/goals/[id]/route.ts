// src/app/api/goals/[id]/route.ts

import { NextResponse } from "next/server";
import {
  createGoal,
  getAllGoals,
  deleteGoal,
  getGoalById,
  updateGoal,
} from "@/lib/db/goalFunctions";
import { GoalType } from "@/lib/interfaces/goals.interface";



export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const goalId = parseInt(params.id, 10);

  if (isNaN(goalId)) {
    return NextResponse.json({ error: "Invalid Goal ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { title, description, type } = body;

    // Validate required fields
    if (!title || !description || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the goal exists
    const existingGoal = await getGoalById(goalId);
    if (!existingGoal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    // Use the backend utility `updateGoal` (requires only 2 arguments)
    const updatedGoal = await updateGoal(goalId, { title, description, type });

    return NextResponse.json(updatedGoal, { status: 200 });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 }
    );
  }
}