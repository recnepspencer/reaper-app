// /api/goals/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import {
  getGoalById,
  updateUserGoal,
  deleteGoal,
} from "../../../lib/db/goalFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log("API Route Hit: /api/goals/[id]", { method: req.method, id });
  const goalId = parseInt(id as string, 10);

  if (isNaN(goalId)) {
    console.log("Invalid Goal ID");
    return res.status(400).json({ error: "Invalid Goal ID" });
  }

  if (req.method === "GET") {
    try {
      const goal = await getGoalById(goalId);
      if (!goal) {
        console.log("Goal Not Found");
        return res.status(404).json({ error: "Goal not found" });
      }
      console.log("GET Goal:", goal);
      return res.json(goal);
    } catch (error) {
      console.error("Error fetching goal:", error);
      return res.status(500).json({ error: "Failed to fetch goal" });
    }
  } else if (req.method === "PUT") {
    const { userId, action, ...data } = req.body;

    if (!userId || !action) {
      console.log("Missing userId or action in PUT request");
      return res.status(400).json({ error: "User ID and action are required" });
    }

    try {
      const updatedGoal = await updateUserGoal(userId, goalId, action, data);
      console.log("Updated Goal:", updatedGoal);
      return res.json(updatedGoal);
    } catch (error) {
      console.error("Error updating user goal:", error);
      return res.status(500).json({ error: "Failed to update user goal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const goal = await getGoalById(goalId);
      if (!goal) {
        console.log("Goal Not Found for Deletion");
        return res.status(404).json({ error: "Goal not found" });
      }

      await deleteGoal(goalId);
      console.log("Goal Deleted Successfully");
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting goal:", error);
      return res.status(500).json({ error: "Failed to delete goal" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
