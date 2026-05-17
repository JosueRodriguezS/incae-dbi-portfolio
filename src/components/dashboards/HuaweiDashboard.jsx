export default function HuaweiDashboard() {
  return (
    <div className="dashboard-iframe-wrapper">
      <iframe
        src={`${import.meta.env.BASE_URL}dashboards/huawei.html`}
        title="Dashboard Huawei — Alineamiento Dinámico"
        className="dashboard-iframe"
        loading="lazy"
      />
    </div>
  )
}
