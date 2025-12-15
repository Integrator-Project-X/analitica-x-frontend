export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Analítica X</h1>
      <p>Ir a dashboards:</p>

      <ul>
        <li>
          <a href="/admin">Admin Dashboard</a>
        </li>
        <li>
          <a href="/veterinarian">Veterinaria Dashboard</a>
        </li>
      </ul>
    </main>
  )
}
