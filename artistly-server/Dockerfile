FROM mcr.microsoft.com/dotnet/sdk:8.0 as build-env
WORKDIR /app

# Copy csproj files and restore dependencies
COPY WebAPI/*.csproj ./
RUN dotnet restore

# Copy the entire solution
COPY . ./

# Publish both projects
WORKDIR /app
RUN dotnet publish WebAPI/WebAPI.csproj -c Release -o out/WebAPI
RUN dotnet publish Domain/Domain.csproj -c Release -o out/Domain

# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:8.0 as final-env
WORKDIR /app
COPY --from=build-env /app/out/WebAPI ./WebAPI
COPY --from=build-env /app/out/Domain ./Domain

# Copy the JSON file from local machine to Docker container
COPY WebAPI/artistly-f46e4-firebase-adminsdk-b83ks-87d75650bf.json ./artistly-f46e4-firebase-adminsdk-b83ks-87d75650bf.json

ENTRYPOINT [ "dotnet", "WebAPI/WebAPI.dll" ]
