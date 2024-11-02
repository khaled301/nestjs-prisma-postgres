# nestjs-prisma-postgres


### Neon Postgres
https://console.neon.tech/app/projects


### Commands
```
npm i -g @nestjs/cli
new new project-name

nest g module users
nest g controller users
nest g service users

# generate crud with module, service and controller
nest g resource employees

# rate limiting
npm i @nestjs/throttler --save

# production dependencies
npm i class-validator class-transformer

# dev dependencies
npm i @nestjs/mapped-types -D 

# Prisma
npm i prisma -D
npx prisma init

# Migrate Prisma Model
npx prisma migrate dev --name init

# after changing the schema
npx prisma generate
npx prisma migrate dev --name init
```

## Prisma Instructions:
Steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started

2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, 
mongodb or cockroachdb.

3. Run prisma db pull to turn your database schema into a Prisma schema.
```
 prisma db pull
```

4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
```
prisma generate
```

5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

6. Error Message Reference 
https://www.prisma.io/docs/orm/reference/error-reference

7. Helpful nestjs-prisma package
https://nestjs-prisma.dev/docs/logging-middleware/