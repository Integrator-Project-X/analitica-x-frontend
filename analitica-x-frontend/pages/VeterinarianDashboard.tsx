import React from "react";
import KpiCard from "../components/KpiCard";
import { useFetch } from "../hooks/useFetch";

interface VetKpis {
  total_clients: number;
  total_services: number;
  total_amount: number;
}

interface Props {
  clinicId: number;
}

export default function VeterinarianDashboard({ clinicId }: Props) {
  const { data: kpis, loading } = useFetch<VetKpis>(
    "https://analitica-x.onrender.com/veterinarian/analytics/kpis/summary",
    { clinic_id: clinicId }
  );

  if (loading) return <p>Cargando KPIs...</p>;
  if (!kpis) return <p>No hay datos disponibles</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Veterinaria</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard title="Clientes Atendidos" value={kpis.total_clients ?? 0} />
        <KpiCard title="Servicios Realizados" value={kpis.total_services ?? 0} />
        <KpiCard title="Ingresos" value={kpis.total_amount != null ? `$${kpis.total_amount}` : '-'} />
        <KpiCard
          title="Ticket Promedio"
          value={
            kpis && kpis.total_clients > 0 && kpis.total_amount
              ? `$${(kpis.total_amount / kpis.total_clients).toFixed(2)}`
              : '-'
          }
        />
      </div>

      {/* Aquí tus gráficos específicos por clínica */}
    </div>
  );
}
