// src/app/api/user-goal/[userId]/[goalId].ts

import { NextResponse } from 'next/server';
import { deleteUserGoalAssignment, getUserGoals } from '@/lib/db/userGoalFunctions';

// Handle GET request to fetch user goals
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId || Array.isArray(userId)) {
      return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
    }

    const userGoals = await getUserGoals(userId);
    return NextResponse.json(userGoals, { status: 200 });
  } catch (error) {
    console.error('GET /api/userGoals error:', error);
    return NextResponse.json({ error: 'Failed to fetch user goals' }, { status: 500 });
  }
}

// Handle DELETE request to remove a user goal assignment
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const goalId = url.searchParams.get('goalId');

    if (!userId || Array.isArray(userId) || !goalId || Array.isArray(goalId)) {
      return NextResponse.json({ error: 'Valid User ID and Goal ID are required' }, { status: 400 });
    }

    await deleteUserGoalAssignment(userId, goalId as any);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /api/userGoals error:', error);
    return NextResponse.json({ error: 'Failed to delete user goal assignment' }, { status: 500 });
  }
}
