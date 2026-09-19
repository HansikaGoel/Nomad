# NOMADE

NOMADE is a responsive cultural travel companion for discovering heritage, cuisine, craft, music, language, and living history in Kyoto, Oaxaca, and Marrakech.

## Run locally

Open two VS Code terminals from the project root:

```powershell
cd backend
npm install
npm start
```

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend expects the API at `http://localhost:5000/api`; set `VITE_API_URL` if the API uses another host.

The backend starts with the seeded in-memory dataset, so MongoDB and an AI API key are not required for the demo. To use MongoDB, copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`. When connected, Mongoose models are available for `Destination` and `Review` while the seed data continues to provide an immediate fallback.

## Docker

```powershell
docker compose up --build
```

Then open `http://localhost:8080`.

## API surface

- `GET /api/destinations?search=kyoto`
- `GET /api/destinations/:id/dashboard`
- `GET /api/destinations/compare?d1=kyoto&d2=oaxaca`
- `POST /api/translator/scan`
- `POST /api/ai/itinerary`
- `GET /api/reviews/:destinationId`
- `POST /api/reviews`
