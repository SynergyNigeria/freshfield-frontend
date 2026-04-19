# Freshfield Investment App - Frontend

A Next.js frontend application for the Freshfield investment platform with crypto trading features.

## Features

- User authentication (login, register)
- Dashboard with portfolio overview
- Wallet management (deposit, withdrawal)
- Crypto portfolio view
- Buy/Sell crypto transactions
- Transaction history

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── (auth)/          # Authentication pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── wallet/          # Wallet pages
│   │   └── portfolio/       # Portfolio pages
│   ├── components/          # Reusable components
│   ├── lib/                 # API and utilities
│   └── store/               # Zustand state stores
├── public/                  # Static files
├── package.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

## Pages

- `/` - Home page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/dashboard` - User dashboard
- `/wallet` - Wallet management
- `/portfolio` - Investment portfolio

## Technologies Used

- Next.js 14.1.0
- React 18.3.1
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios (HTTP Client)
- React Query (Server State)
- React Hot Toast (Notifications)

## State Management

Using Zustand for global state:

- `authStore` - Authentication state (token, user)
- `walletStore` - Wallet state (balance, transactions)
- `investmentStore` - Investment state (cryptos, portfolio)

## API Integration

All API calls are made through the `@/lib/api.ts` file, which is configured to:

- Use the Django REST API backend
- Automatically include authentication token in headers
- Handle errors and responses

## Running with Backend

Make sure the Django backend is running on `http://localhost:8000`:

```bash
# Backend (in another terminal)
cd backend
python manage.py runserver
```

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Token-based authentication with the Django backend
- CORS enabled for `localhost:3000` on the backend
- Responsive design using Tailwind CSS
- Real-time updates using React Query
