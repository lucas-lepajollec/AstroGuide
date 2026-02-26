# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Déclaration des arguments de build et variables d'environnement
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN apk add --no-cache python3 make g++
RUN npm install

# Copie du reste des fichiers du projet
COPY . .

# Build de l'application React/Vite
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
