'use client'

import { useEffect, useState } from 'react'
import { fetchData } from '@/lib/api'
import BarChart from '@/components/charts/BarChart'
import LineChart from '@/components/charts/LineChart'
import KpiCard from '@/components/KpiCard'

const CLINIC_ID = 1
const YEAR = 2025

export default function VetDashboard() {
  const [topServices, setTopServices] = useState<any>(null)
  const [servicesByPeriod, setServicesByPeriod] = useState<any>(null)
  const [kpis, setKpis] = useState<any>(null)

  useEffect(() => {
    fetchData(`/veterinarian/analytics/top-services?clinic_id=${CLINIC_ID}`).then(setTopServices)
    fetchData(`/veterinarian/analytics/services-by-period?clinic_id=${CLINIC_ID}&year=${YEAR}`).then(setServicesByPeriod)
    fetchData(`/veterinarian/analytics/kpis/summary?clinic_id=${CLINIC_ID}`)
      .then((res) => {
        const normalized = res?.data ?? (Array.isArray(res) ? res[0] : res)
        setKpis(normalized)
      })
      .catch(() => setKpis(null))
  }, [])

  if (!topServices || !servicesByPeriod || !kpis) {
    return <p>Cargando métricas...</p>
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard Veterinaria</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard title="Clientes Atendidos" value={kpis.total_clients} />
        <KpiCard title="Servicios Realizados" value={kpis.total_services} />
        <KpiCard title="Ingresos" value={typeof kpis.total_amount === 'number' ? `$${kpis.total_amount.toLocaleString()}` : kpis.total_amount} />
        <KpiCard
          title="Ticket Promedio"
          value={
            kpis && kpis.total_clients > 0 && typeof kpis.total_amount === 'number'
              ? `$${(kpis.total_amount / kpis.total_clients).toFixed(2)}`
              : '-'
          }
        />
      </div>

      <section>
        <h2 className="text-xl mb-2">Servicios más solicitados</h2>
        <BarChart data={topServices} />
      </section>

      <section>
        <h2 className="text-xl mb-2">Servicios por fecha</h2>
        <LineChart data={servicesByPeriod} />
      </section>
    </div>
  )
}
