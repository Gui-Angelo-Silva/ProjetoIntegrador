# Use a imagem base do PostgreSQL
FROM postgres:latest

# Copie o script SQL para o diretório de inicialização
# O PostgreSQL executará automaticamente os arquivos .sql, ncontrados em /docker-entrypoint-initdb.d/ durante a inicialização do banco de dados
COPY ./sgedDB.sql /docker-entrypoint-initdb.d/sgedDB.sql
