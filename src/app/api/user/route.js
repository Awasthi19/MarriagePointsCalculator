import { connectDB } from '@/lib/mongodb';
import User from '@/modals/user'; // Ensure the path to your model is correct
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Parse the JSON body from the request
  const { email, name } = await request.json();
  console.log(email, name);

  await connectDB();

  try {
    // Create a new user
    await User.create({ email, name });
    return NextResponse.json({ message: 'User Created' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 400 });
  }
}


