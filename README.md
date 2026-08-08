# Quest

Quest is a gamified learning platform built with Next.js, designed to make learning engaging and fun. It features interactive quests, flashcards, leaderboards, a shop, and a progression system with certificates.

## Features

- **Interactive Quests**: Learn through gamified challenges and tasks.
- **Flashcards**: Review and memorize key concepts effectively.
- **Leaderboard**: Compete with others and track your ranking.
- **Shop**: Spend earned points on rewards or power-ups.
- **Profile & Progression**: Track your progress, view your achievements, and earn certificates.
- **Authentication**: Secure login and signup system.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Authentication**: JWT, bcryptjs
- **Database**: MongoDB (Mongoose)
- **Charts/Visuals**: Recharts, Canvas Confetti

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vidhisingh24/Quest.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables (e.g., MongoDB URI, JWT Secret).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains the Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and database connections.

## License

This project is licensed under the MIT License.
