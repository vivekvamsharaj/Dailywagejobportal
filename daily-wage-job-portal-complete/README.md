# Daily Wage Worker Job Portal (FSD Project)

A full-stack web application designed for daily wage workers with geospatial (10 km radius) matching, multi-language support (Telugu, English, Hindi), and direct navigation to owner job sites.

## 🚀 How to Run Locally

### 1. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm start
```

## 📍 Key Features
- **10km Geospatial Search:** MongoDB `2dsphere` index and `$near` queries.
- **Multilingual UI:** Telugu (`te`), Hindi (`hi`), English (`en`) built with `i18next`.
- **Firebase OTP Auth:** Mobile phone number OTP verification for workers.
- **Google Maps Route Navigation:** Instant directions from worker location to owner location.
