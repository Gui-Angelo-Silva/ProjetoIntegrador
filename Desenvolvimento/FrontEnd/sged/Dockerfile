# Dockerfile do frontend
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY ./package*.json ./
RUN npm install  # Instala as dependências

# Copia o restante dos arquivos da aplicação
COPY . ./

# Adiciona a variável de ambiente diretamente no build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

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
