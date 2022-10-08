# stage 1

FROM node:14 AS my-app-build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/SortingAlgorithms /usr/share/nginx/html
EXPOSE 80
