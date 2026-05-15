FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["StoreManager.API.csproj", "."]
RUN dotnet restore "StoreManager.API.csproj"
COPY . .
RUN dotnet build "StoreManager.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StoreManager.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StoreManager.API.dll"]
