# Use a imagem base do PostgreSQL
FROM postgres:latest

# Copie o script SQL para o diretório de inicialização
COPY ./sgedDB.sql /docker-entrypoint-initdb.d/sgedDB.sql
