# nestjs-prisma-postgres

This repository provides a boilerplate for building a scalable backend API with **NestJS**, **Prisma**, and **Postgres**. It includes essential configurations, setup instructions, and best practices for managing data and handling requests.

##  Contents
- [Controllers](#controllers)
- [Providers](#providers)
- [DTO Validation](#dto-validation)
- [REST API](#rest-api)
- [Essential Additions](#essential-additions)
  - [Global Exception Handling](#global-exception-handling)
  - [Logging](#logging)
  - [Rate Limiting](#rate-limiting)
  - [Validation Pipe](#validation-pipe)
  - [CORS](#cors)
- [Prisma Setup](#prisma-setup)
- [Helpful Links](#helpful-links)

## Introduction
This project is structured to provide a clean and modular setup for REST APIs, featuring **NestJS** as the framework, **Prisma** as the ORM, and **PostgreSQL** as the database. It includes configurations for DTO validation, rate limiting, global exception handling, and file-based logging.

## Getting Started

### Prerequisites
- **Node.js** installed
- **PostgreSQL** database setup
- **Neon Postgres** account for database management (optional): [Neon Console](https://console.neon.tech/app/projects)

### Installation
Install the NestJS CLI globally:
```bash
npm i -g @nestjs/cli

# Generate a new project:
nest new project-name

#Navigate to the project directory and install dependencies:
cd project-name
npm install

# Create a new module, service, and controller
nest g module users
nest g controller users
nest g service users

# Generate CRUD resources for employees
nest g resource employees

#Rate Limiting |Install the @nestjs/throttler package:
npm i @nestjs/throttler --save

# DTO Validation |Install the required dependencies:
npm i class-validator class-transformer
npm i @nestjs/mapped-types -D



# Prisma Setup | To set up Prisma, follow these steps:

#1. Set the DATABASE_URL in the .env file to point to your PostgreSQL database. For more information, read the Prisma getting started guide.

#2. Install Prisma as a dev dependency:
npm i prisma -D

#3. Initialize Prisma
npx prisma init

#4. To synchronize your Prisma schema with your database:
npx prisma migrate dev --name init

#5. After modifying the schema, regenerate the Prisma client:
npx prisma generate
npx prisma migrate dev --name init

#6. For existing databases, pull the schema:
npx prisma db pull
```

# Helpful Links
## Neon Postgres Console
https://console.neon.tech/app/projects

## Prisma Documentation
https://www.prisma.io/docs

## Prisma Error Message Reference
https://nestjs-prisma.dev/docs/logging-middleware/

## Prisma NestJs | nestjs-prisma Package Documentation
https://nestjs-prisma.dev/docs/logging-middleware/