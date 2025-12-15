'use client'

import { useEffect, useState } from 'react'
import { fetchData } from '@/lib/api'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import LineChart from '@/components/charts/LineChart'
import KpiCard from '@/components/KpiCard'

export default function AdminDashboard() {
  const [clinics, setClinics] = useState<any>(null)
  const [animals, setAnimals] = useState<any>(null)
  const [clientsByMonth, setClientsByMonth] = useState<any>(null)
  const [kpis, setKpis] = useState<any>(null)

  useEffect(() => {
    fetchData('/admin/analytics/clinics').then(setClinics)
    fetchData('/admin/analytics/animals').then(setAnimals)
    fetchData('/admin/analytics/clients-by-month').then(setClientsByMonth)
    fetchData('/admin/analytics/kpis/summary')
      .then((res) => {
        const normalized = res?.data ?? (Array.isArray(res) ? res[0] : res)
        setKpis(normalized)
      })
      .catch(() => setKpis(null))
  }, [])

  if (!clinics || !animals || !clientsByMonth || !kpis) {
    return <p>Cargando métricas...</p>
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard title="Total Clientes" value={kpis.total_clients} />
        <KpiCard title="Total Servicios" value={kpis.total_services} />
        <KpiCard title="Ingresos Totales" value={typeof kpis.total_amount === 'number' ? `$${kpis.total_amount.toLocaleString()}` : kpis.total_amount} />
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
        <h2 className="text-xl mb-2">Clínicas con más servicios</h2>
        <BarChart data={clinics} />
      </section>

      <section>
        <h2 className="text-xl mb-2">Servicios por tipo de animal</h2>
        <PieChart data={animals} />
      </section>

      <section>
        <h2 className="text-xl mb-2">Clientes por mes</h2>
        <LineChart data={clientsByMonth} />
      </section>
    </div>
  )
}
