export default function AXADashboard() {
  return (
    <div className="dashboard-iframe-wrapper">
      <iframe
        src={`${import.meta.env.BASE_URL}dashboards/axa.html`}
        title="AXA Germany Intelligence Brief — Data Innovation Lab 2016–2018"
        className="dashboard-iframe"
        loading="lazy"
      />
    </div>
  )
}
