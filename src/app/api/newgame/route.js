/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/lib/mongodb';
import Game from '@/modals/game';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
    await connectDB();
    delete mongoose.models.Game;

    try {
        // Create a new game without rounds
        const newGame = new Game({
            gameName: 'New Game',
            rounds: [], // No rounds initially
            status: 'ongoing', // Mark game as ongoing
        });

        await newGame.save();

        // Update gameName with creation date
        newGame.gameName = `Game created on ${newGame.createdAt}`;
        await newGame.save();

        console.log('New Game Created:', newGame);

        return NextResponse.json({
            message: 'New game created successfully',
            game: newGame,
        });
    } catch (error) {
        console.error('Error creating new game:', error);
        return NextResponse.json({ error: 'Error creating new game' }, { status: 400 });
    }
}
