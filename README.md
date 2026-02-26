<div align="center">
  <img src="public/favicon.ico" alt="AstroGuide Logo" width="100" />
  <h1>🚀 AstroGuide</h1>
  <p><strong>Interactive 3D Space Exploration Application</strong></p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

  <br />
</div>

AstroGuide is a high-performance, immersive web application designed to explore the cosmos. Built with React and Three.js, it offers a cinematic 3D view of planetary orbits, interactive 2D star maps, and accurate celestial size comparisons.

## ✨ Features

- **🌐 Immersive 3D Scene**: Explore the solar system, stars, and black holes with realistic textures, lighting, and cinematic orbital camera controls.
- **🗺️ Interactive 2D Map (Radar)**: A fluid, infinitely zoomable 2D radar map with vector scaling. Pan, zoom, and select constellations up to 20x magnification.
- **📏 Size Comparison Mode**: Visually compare the exact scale of planets, stars, and galaxies from smallest to largest side-by-side. 
- **📱 Fully Responsive**: Custom-built mobile interface with off-canvas hamburger menus, bottom sheets, and touch-optimized controls without sacrificing desktop layouts.
- **⚡ High Performance**: Dynamically halts the WebGL render loop when the 3D scene is inactive, ensuring a perfectly smooth UI even on low-end devices.

---

## 🛠️ Tech Stack

| Category         | Technologies Used                                                                 |
| ---------------- | --------------------------------------------------------------------------------- |
| **Frontend Core**| React 18, TypeScript, Vite                                                        |
| **3D Rendering** | Three.js, React Three Fiber (@react-three/fiber), Drei (@react-three/drei)        |
| **2D / Styling** | Tailwind CSS, Lucide React (Icons), Motion (Animations)                           |
| **State**        | Zustand (Global State Management)                                                 |
| **Deployment**   | Docker (Multi-stage build), Nginx                                                 |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed on your machine.
If deploying via containers, ensure [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) are available.

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/astroguide.git
   cd astroguide
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be running at `http://localhost:5173`.*

---

## 🐳 Deployment (Docker & NAS)

AstroGuide includes a multi-stage `Dockerfile` (Node builder + Nginx static server) optimized for production, keeping the final image lightweight and fast.

### 1. Build and Run via Docker CLI

You can pass environment variables (like API configurations, if ever needed) during the build phase using `--build-arg`.

```bash
# Build the image using a specific build argument
docker build --build-arg VITE_API_URL="https://api.example.com" -t astroguide-app .

# Run the container (Mapping port 2502 on the host to port 80 in Nginx)
docker run -d -p 2502:80 --name astroguide-instance astroguide-app
```

### 2. Deploy via Docker Compose (Recommended)

The provided `docker-compose.yml` makes NAS or Server deployment a one-line process. 

1. Review/Edit the `docker-compose.yml` if you need to map a port other than `2502` or pass `args`.
2. Start the service:
   ```bash
   docker-compose up -d --build
   ```

AstroGuide will now be independently accessible on your server at `http://<YOUR_SERVER_IP>:2502` and will automatically restart on server reboots.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/your-username/astroguide/issues) if you have any ideas.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
