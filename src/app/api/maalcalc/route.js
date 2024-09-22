/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/lib/mongodb';
import Game from '@/modals/game';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

function calculateMaal(players, seenPoint, unseenPoint, pointRate) {
    const playersArray = Object.values(players);

    const totalPlayerPoints = playersArray.reduce((sum, player) => sum + player.maalPoints, 0);
    const numPlayers = playersArray.length;

    let totalPointsOfOthers = 0;
    let winner;

    playersArray.forEach(player => {
        let playerTotalPoints;

        if (player.isWinner) {
            winner = player;
        } else if (player.status==="active") {
            playerTotalPoints = (player.maalPoints * numPlayers) - (totalPlayerPoints + seenPoint);
        } else {
            playerTotalPoints = -(totalPlayerPoints + unseenPoint);
        }

        if (!player.isWinner) {
            player.totalPoints = playerTotalPoints;
            player.amount = playerTotalPoints * pointRate;
            totalPointsOfOthers += playerTotalPoints;
        }
    });

    if (winner) {
        winner.totalPoints = -totalPointsOfOthers;
        winner.amount = winner.totalPoints * pointRate;
    }

    return playersArray;
}

export async function POST(request) {
    await connectDB();
    delete mongoose.models.Game;
    const { players , settings } = await request.json();
    const result = calculateMaal(players, settings.seenPoint, settings.unseenPoint, settings.pointRate);

    try {
        // Find the latest game (based on createdAt timestamp)
        const latestGame = await Game.findOne().sort({ createdAt: -1 }); // Sort by creation date in descending order

        if (latestGame) {
            const newRound = {
                roundNumber: latestGame.roundsPlayed + 1, // Increment round number
                playerResults: result
            };

            // Add the new round to the latest game
            latestGame.rounds.push(newRound);
            latestGame.roundsPlayed = latestGame.rounds.length; // Update rounds played
            latestGame.gameName = `Game created on ${latestGame.createdAt} - last updated on ${new Date()}`;

            await latestGame.save();
            return NextResponse.json({
                currentRoundResult: result,
                allRounds: latestGame.rounds
            });
        } else {
            return NextResponse.json({ error: 'No game found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error adding round to latest game:', error);
        return NextResponse.json({ error: 'Error adding round to latest game' }, { status: 400 });
    }
}
