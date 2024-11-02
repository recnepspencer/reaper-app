// src/app/api/userGoals/route.ts

import { NextResponse } from 'next/server';
import { updateUserGoal } from '@/lib/db/goalFunctions';

export async function PUT(request: Request) {
  try {
    const { userId, goalId, action, ...data } = await request.json();

    if (!userId || !goalId || !action) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const updatedUserGoal = await updateUserGoal(userId, parseInt(goalId, 10), action, data);

    return NextResponse.json(updatedUserGoal, { status: 200 });
  } catch (error: any) {
    console.error('Error updating UserGoal:', error);
    return NextResponse.json({ error: 'Failed to update UserGoal' }, { status: 500 });
  }
}
