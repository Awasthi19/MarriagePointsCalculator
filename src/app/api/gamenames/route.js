import { connectDB } from '@/lib/mongodb';
import Game from '@/modals/game';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST() {
  await connectDB();
  
  // Clear the model to avoid "OverwriteModelError" during hot reloading in development
  delete mongoose.models.Game;

  try {
    // Fetch all games from the database
    const games = await Game.find({}, 'gameName'); // Only select 'gameName' field

    // Return the game names in the response
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error fetching game names:', error);
    return NextResponse.error({ status: 500, body: 'Error fetching game names' });
  }
}
