# DeForm Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Local Development Setup

1. Clone the repository

```bash
    git clone https://github.com/masterifeanyi/deform.git
    cd deform
```

2. Install dependencies

```bash
    npm install
```

3. Set up PostgreSQL database
   
```bash
    # macOS (with Homebrew)
    brew install postgresql
    brew services start postgresql
    createdb deform_db

    # Ubuntu/Debian
    sudo apt install postgresql
    sudo service postgresql start
    sudo -u postgres createdb deform_db
```

4. Configure environment variables

```bash
    cp .env.example .env.local
    # Edit .env.local with your database credentials
```

5. Run database migrations

```bash
    npm run prisma:migrate
```

6. Start development server

```bash
    npm run dev
```

## Commands

- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:migrate` - Create and apply new migration
- `npm run prisma:generate` - Regenerate Prisma Client