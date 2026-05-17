# Josué Rodríguez · Portafolio INCAE DBI

Portafolio profesional construido con **Vite + React** para el curso
**Digital Business Intelligence** de INCAE Business School (2026).

🌐 **Live:** https://josuerodriguezs.github.io/incae-dbi-portfolio/

---

## Stack

| Herramienta | Uso |
|---|---|
| Vite 6 + React 18 | Framework y bundler |
| Recharts | Dashboards FCC y RAPS |
| Lucide React | Íconos en el dashboard RAPS |
| GitHub Actions | CI/CD automático |
| GitHub Pages | Hosting estático |

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre **http://localhost:5173/incae-dbi-portfolio/** en tu navegador.

```bash
npm run build    # genera la carpeta dist/
npm run preview  # sirve el build localmente
```

---

## Agregar un nuevo dashboard

1. **Crea tu componente React** en `src/components/dashboards/NombreDashboard.jsx`:

```jsx
export default function NombreDashboard() {
  return (
    <div>
      {/* Tu componente aquí */}
    </div>
  )
}
```

2. **Registra el proyecto** en `src/components/Projects.jsx`.
   Agrega un import al inicio del archivo:

```js
import NombreDashboard from './dashboards/NombreDashboard'
```

   Y una entrada al array `PROJECTS`:

```js
{
  id: 'nombre-caso',
  num: '04',
  title: 'Caso Nombre',
  subtitle: 'Descripción breve del análisis',
  description: 'Párrafo explicativo del caso y qué mide el dashboard.',
  tags: ['Tag1', 'Tag2', 'React'],
  component: NombreDashboard,
},
```

3. **Commit y push** → GitHub Actions hace el deploy automáticamente.

---

## Dashboard Huawei (iframe)

El dashboard Huawei usa Chart.js puro (no React), por lo que se sirve
como archivo HTML independiente y se incrusta vía `<iframe>`.

- Fuente: `public/dashboards/huawei.html`
- Para actualizarlo: reemplaza ese archivo y haz push.

---

## Configurar GitHub Pages (primera vez)

1. Ve al repositorio → **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. El primer push a `main` dispara el workflow automáticamente

El sitio estará disponible en:
`https://josuerodriguezs.github.io/incae-dbi-portfolio/`

---

## Estructura del proyecto

```
incae-dbi-portfolio/
├── .github/workflows/deploy.yml   ← CI/CD automático
├── public/
│   └── dashboards/
│       └── huawei.html            ← Dashboard Huawei (iframe)
├── src/
│   ├── components/
│   │   ├── dashboards/
│   │   │   ├── FCCDashboard.jsx   ← Re-export de FCC_Dashboard_S3_v2.jsx
│   │   │   ├── HuaweiDashboard.jsx← Wrapper iframe
│   │   │   └── RAPSDashboard.jsx  ← Re-export de RAPS_Dashboard.jsx
│   │   ├── AboutCourse.jsx
│   │   ├── Contact.jsx
│   │   ├── Hero.jsx
│   │   ├── Nav.jsx
│   │   └── Projects.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── FCC_Dashboard_S3_v2.jsx        ← Fuente del dashboard FCC
├── RAPS_Dashboard.jsx             ← Fuente del dashboard RAPS
├── index.html                     ← Entry point de Vite
├── package.json
└── vite.config.js
```
