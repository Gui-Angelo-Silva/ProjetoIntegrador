# Usar uma imagem base do Node.js
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY ./package*.json ./
RUN npm install  # Instala as dependências

# Copia o restante dos arquivos da aplicação
COPY . ./

# Compila a aplicação para produção
RUN npm run build  # Compila a aplicação

# Usar uma imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Copia os arquivos compilados para o diretório de distribuição do Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copia a configuração do Nginx customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta padrão do Nginx
EXPOSE 80

# O Nginx já é iniciado por padrão, não é necessário especificar um comando aqui
