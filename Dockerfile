FROM node:22-slim AS builder

WORKDIR /app

# Déclaration des arguments de build et variables d'environnement
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Installation de python3 et build-essential (requis pour node-gyp sur Debian)
RUN apt-get update && apt-get install -y python3 build-essential

# Copie intégrale de tout le projet en premier
COPY . .

# Suppression nucléaire de toute trace de modules ou lock généré sous Windows
RUN rm -rf node_modules package-lock.json

# Installation des paquets en incluant les optionnels pour Tailwind Oxide
RUN npm install --include=optional

# Build final de l'application
RUN npm run build

# Stage 2: Serve avec Nginx
FROM nginx:alpine

# Copie du dossier 'dist' généré par Vite vers le dossier par défaut de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# On inclut une configuration Nginx personnalisée si besoin, sinon on garde l'originale
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80 pour le conteneur
EXPOSE 80

# Lancement de Nginx
CMD ["nginx", "-g", "daemon off;"]
