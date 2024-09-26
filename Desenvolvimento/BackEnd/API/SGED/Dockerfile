# Usar uma imagem base do SDK do .NET para construir a aplicação
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo .csproj e restaura as dependências
COPY ./*.csproj ./
RUN dotnet restore

# Copia o restante dos arquivos da aplicação
COPY . ./

# Compila a aplicação
RUN dotnet publish -c Release -o out

# Usar uma imagem base do runtime do .NET para executar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos compilados da etapa de build
COPY --from=build /app/out .

# Expõe a porta da aplicação
EXPOSE 5000

# Define o comando para rodar a aplicação
ENTRYPOINT ["dotnet", "SGED.dll"]
