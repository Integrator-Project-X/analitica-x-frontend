# 🐾 Veterinary Analytics Frontend

Frontend application for the **Veterinary Platform**, built with **Next.js**.
This project consumes **analytics endpoints** from a backend service and visualizes data using **charts and dashboards** for different user roles: **Admin** and **Veterinarian**.

---

## 📌 Technologies Used

- **Next.js**
- **React**
- **TypeScript / JavaScript**
- **Tailwind CSS**
- **Chart.js**
- **react-chartjs-2**
- **Fetch API**
- **Node.js**

---

## 📂 Project Structure (Simplified)

frontend/
│
├── app/ or pages/
│   ├── admin/
│   │   └── analytics/page.tsx
│   ├── veterinarian/
│   │   └── analytics/page.tsx
│
├── components/
│   ├── charts/
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   └── PieChart.tsx
│
├── lib/
│   └── api.ts
│
├── styles/
├── public/
│
├── .env.local
├── package.json
└── README.md

1️⃣ Prerequisites
Before running the project, make sure you have:
Node.js (v18 or higher recommended)
npm
Backend analytics API running (FastAPI / NestJS)

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables
Create a file called .env.local in the root of the project.

env
Copiar código
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
This variable defines the base URL of the analytics backend.

4️⃣ Analytics Endpoints Consumed
Admin Analytics
h
Copiar código
GET /admin/analytics/clinics
GET /admin/analytics/animals
GET /admin/analytics/clients-by-month
Veterinarian Analytics
http
Copiar código
GET /veterinarian/analytics/top-clients?clinic_id=1
GET /veterinarian/analytics/top-services?clinic_id=1
GET /veterinarian/analytics/services-by-period?clinic_id=1&year=2025

5️⃣Running the Frontend
Start the development server:

npm run dev

Then open your browser at:
http://localhost:3000

6️⃣Charts and Visualizations
The frontend focuses on data visualization, not KPI cards.

📊 Chart Types Used
Bar Chart

Clinics with most services

Top services requested

Pie Chart

Services by animal type

Line Chart

Clients by month

Services over time

All charts are implemented using:
npm install chart.js react-chartjs-2

 7️⃣Admin Analytics Dashboard
Admin users can:

Analyze clinics with the highest number of services

View the most attended animal types

Track client activity by month

Analyze overall platform usage trends

📍 Route:
/admin

8️⃣ Veterinarian Analytics Dashboard
Veterinarian users can:

View analytics for their own clinic only

Analyze top clients by number of visits

Identify most requested services

Track services performed over time (daily / monthly)

📍 Route:
/veterinarian

9️⃣Data Flow
Frontend (Next.js)
        ↓ HTTPS (REST)
Backend Analytics API
        ↓ SQL
PostgreSQL (Supabase)

 🔟Common Issues
Charts not displaying?
Ensure the backend API is running

Verify .env.local contains the correct API URL

Check browser console for CORS or fetch errors

Confirm required query parameters (e.g. clinic_id, year) are provided
