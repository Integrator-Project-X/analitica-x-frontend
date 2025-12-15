import React from "react";
import KpiCard from "../components/KpiCard";
import { useFetch } from "../hooks/useFetch";

interface AdminKpis {
  total_clients: number;
  total_services: number;
  total_amount: number;
}

export default function AdminDashboard() {
  const { data: kpis, loading } = useFetch<AdminKpis>(
    "https://analitica-x.onrender.com/admin/analytics/kpis/summary"
  );

  if (loading) return <p>Cargando KPIs...</p>;
  if (!kpis) return <p>No hay datos disponibles</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard title="Total Clientes" value={kpis.total_clients ?? 0} />
        <KpiCard title="Total Servicios" value={kpis.total_services ?? 0} />
        <KpiCard title="Ingresos Totales" value={kpis.total_amount != null ? `$${kpis.total_amount}` : '-'} />
        <KpiCard
          title="Ticket Promedio"
          value={
            kpis && kpis.total_clients > 0 && kpis.total_amount
              ? `$${(kpis.total_amount / kpis.total_clients).toFixed(2)}`
              : '-'
          }
        />
      </div>

      {/* Aquí irían tus gráficos con chart.js o react-chartjs-2 */}
    </div>
  );
}
