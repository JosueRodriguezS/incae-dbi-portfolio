export default function DBVertriebDashboard() {
  return (
    <div className="dashboard-iframe-wrapper">
      <iframe
        src="https://vertrieb-pulse.lovable.app"
        title="DB Vertrieb Operational Agility Dashboard"
        className="dashboard-iframe"
        loading="lazy"
        allow="clipboard-write; fullscreen"
      />
    </div>
  )
}
