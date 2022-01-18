#
# Docker NodeJS Typescript Starter
# Example Dockerfile
#
FROM node:17.3.1-alpine3.14 AS build

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache \
  build-base \
  gcc \
  g++ \
  make

# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY . .

# Create environment file
RUN cp .env.example .env

# Create environment file
RUN cp .env_test.example .env_test

# Install dependencies
RUN npm install

FROM node:alpine as app

## Copy built node modules and binaries without including the toolchain
COPY --from=build /app .

WORKDIR /app

CMD [ "/app/scripts/run.sh" ]
