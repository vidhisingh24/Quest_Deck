import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models';

const JWT_SECRET = process.env.JWT_SECRET || 'quest_jwt_secret_key_prod_2026';

export async function POST(req: Request) {
  try {
    const { name, email, password, avatar } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    });

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return NextResponse.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        level: newUser.level,
        xp: newUser.xp,
        coins: newUser.coins,
        streak: newUser.streak,
        isOnboarded: newUser.isOnboarded,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
