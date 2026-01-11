FROM alpine:latest
WORKDIR /app
COPY . .
CMD ["echo", "¡Aplicación ejecutándose!"]