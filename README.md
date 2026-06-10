# QuickDzyn

QuickDzyn is a full-stack digital product and template marketplace platform. It allows administrators to manage and showcase UI kits, design templates, blog posts, pricing plans, and page content through a dedicated administration interface, while presenting a modern, animated storefront for end users.

The project is structured as a monorepo containing a Next.js frontend client and an Express + Mongoose (MongoDB) backend server.

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
  - [Backend Server Setup](#backend-server-setup)
  - [Frontend Client Setup](#frontend-client-setup)
  - [Database Seeding](#database-seeding)
- [API Reference](#api-reference)
- [Render Deployment Guide](#render-deployment-guide)
  - [MongoDB Database Setup](#1-mongodb-database-setup)
  - [Backend Server Deployment](#2-backend-server-deployment)
  - [Frontend Client Deployment](#3-frontend-client-deployment)
  - [Production Environment Variables Reference](#production-environment-variables-reference)
  - [Production Considerations & Disk Limitations](#production-considerations--disk-limitations)

---

## System Architecture

The repository contains two main packages:
- `client/`: A Next.js Web application implementing the App Router, client-side routing, dashboard displays, and state management.
- `server/`: An Express.js REST API using TypeScript, structured with standard controllers, routes, models, and middleware.

```
quickdzyn/
├── client/                 # Next.js Application
│   ├── app/                # Pages, layouts, and routing
│   ├── components/         # Reusable UI components
│   ├── lib/                # API wrapper and configuration utilities
│   ├── public/             # Static assets (fonts, icons, public images)
│   └── package.json
├── server/                 # Express REST API
│   ├── src/
│   │   ├── config/         # Database and third-party configuration
│   │   ├── controllers/    # Route handler logic
│   │   ├── middleware/     # Auth and error middlewares
│   │   ├── models/         # MongoDB schemas (Mongoose)
│   │   ├── routes/         # Express routers
│   │   ├── index.ts        # Entrypoint
│   │   └── seed.ts         # DB seeding script
│   ├── uploads/            # Temporary file uploads directory
│   └── package.json
└── README.md
```

---

## Tech Stack

### Frontend (Client)
- **Framework**: Next.js (React 19, TypeScript)
- **Styling**: TailwindCSS, CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Architecture**: Base UI React, Radix UI primitives, class-variance-authority, and shadcn/ui styles.

### Backend (Server)
- **Runtime & Language**: Node.js, TypeScript
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose ODM
- **File Uploads**: Multer
- **Authentication**: JWT (JSON Web Tokens)

---

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18.x or v20.x recommended)
- npm (Node Package Manager)
- A running MongoDB instance (local or MongoDB Atlas cluster)

---

## Local Development Setup

### Backend Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `server.env` file in the root of the `server/` directory and configure the variables as needed:
   ```ini
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/quickdzyn
   ADMIN_EMAIL=admin@quickdzyn.com
   ADMIN_PASSWORD=yoursecurepassword
   ADMIN_JWT_SECRET=your_jwt_signing_secret_key
   ```

4. Start the development server (runs with hot-reloads via `ts-node-dev`):
   ```bash
   npm run dev
   ```

The backend server will run by default on `http://localhost:5000`.

### Database Seeding

To seed your MongoDB instance with mock design templates and test data:
```bash
# From the server/ directory
npx ts-node src/seed.ts
```
This script will connect to the database configured in `server.env`, clear any existing records in the `designs` collection, and write initial records.

### Frontend Client Setup

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `client.env` file in the root of the `client/` directory:
   ```ini
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:3000`.

---

## API Reference

The backend exposes the following API routes under the `/api` namespace:

### Authentication
- `POST /api/admin/login` - Admin login endpoint. Returns a JWT token.

### Designs / Templates
- `GET /api/designs` - Retrieve all designs (public).
- `GET /api/designs/:slug` - Retrieve a specific design by its URL slug (public).
- `POST /api/designs` - Create a new design (Admin only).
- `PUT /api/designs/:id` - Update an existing design by ID (Admin only).
- `DELETE /api/designs/:id` - Delete a design by ID (Admin only).

### Blogs
- `GET /api/blogs` - Retrieve all blog articles (public).
- `GET /api/blogs/:slug` - Retrieve a specific blog article by slug (public).
- `POST /api/blogs` - Create a blog article (Admin only).
- `PUT /api/blogs/:id` - Update an existing blog article (Admin only).
- `DELETE /api/blogs/:id` - Delete a blog article (Admin only).

### Pricing Plans
- `GET /api/pricing` - Retrieve pricing tiers (public).
- `POST /api/pricing` - Create a new pricing tier (Admin only).
- `PUT /api/pricing/:id` - Update a pricing tier (Admin only).
- `DELETE /api/pricing/:id` - Delete a pricing tier (Admin only).

### System Content (FAQs, Static Copy)
- `GET /api/content` - Retrieve all page content (public).
- `GET /api/content/:key` - Retrieve page content elements matching a specific identifier (public).
- `PUT /api/content/:key` - Create or update content blocks matching the key (Admin only).

### File Uploads
- `POST /api/upload` - Single/multiple file uploads (expects file data in multipart/form-data under the `files` key). Returns the array of absolute URLs mapping the uploaded resources.

---

## Render Deployment Guide

Follow this guide to deploy QuickDzyn to Render. The platform will require one MongoDB instance, one Web Service for the backend Express API, and one Web Service for the frontend Next.js client.

### 1. MongoDB Database Setup
Render does not host managed MongoDB databases. You must use an external provider. The recommended provider is MongoDB Atlas (which offers a free tier):
1. Sign up/log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Shared Cluster (free tier).
3. Under Database Access, create a database user and note the username and password.
4. Under Network Access, allow access from anywhere (`0.0.0.0/0`) or find your Render service IP ranges. (Allowing `0.0.0.0/0` is the standard approach for Render).
5. Click **Connect** -> **Drivers**, select Node.js, and copy your connection string (`MONGO_URI`). Ensure you replace `<password>` with the actual password of your created database user.

### 2. Backend Server Deployment
To host the Express API on Render:
1. Log in to the Render Dashboard and click **New** -> **Web Service**.
2. Connect your Git repository.
3. In the setup page, configure the following settings:
   - **Name**: `quickdzyn-backend`
   - **Language/Runtime**: `Node`
   - **Branch**: `main` (or your active release branch)
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add the required backend values (detailed in the reference table below).
5. Click **Deploy Web Service**. Render will build and expose the backend. Note down its URL (e.g., `https://quickdzyn-backend.onrender.com`).

### 3. Frontend Client Deployment
The Next.js client is configured for SSR and custom server capabilities, meaning it must run as a Node Web Service (rather than a Static Site).
1. Go to the Render Dashboard and click **New** -> **Web Service**.
2. Connect the same Git repository.
3. Configure the following settings:
   - **Name**: `quickdzyn-frontend`
   - **Language/Runtime**: `Node`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, configure the frontend variables (detailed in the reference table below).
5. Click **Deploy Web Service**. Next.js will build the project and deploy it.

> **Important (Next.js Build-Time Variables Gotcha)**:
> In Next.js, variables prefixed with `NEXT_PUBLIC_` are embedded into the client-side JavaScript bundle during the build phase (`next build`). This means `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` MUST be specified in the environment variables tab on Render *prior* to triggering the build. If they are changed later, a redeployment (rebuild) is required for the client-side code to receive the updated values.

---

### Production Environment Variables Reference

#### Backend Service Environment Variables (`server`)

| Variable Name | Purpose | Example / Recommended Value |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server (Render sets this automatically). | `10000` (handled by Render) |
| `MONGO_URI` | Connection URI for the MongoDB Atlas database. | `mongodb+srv://user:pass@cluster.mongodb.net/quickdzyn?retryWrites=true&w=majority` |
| `ADMIN_EMAIL` | Admin login email credential. | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | Admin login password credential. | `A_Strong_Random_Password_Here` |
| `ADMIN_JWT_SECRET` | Secret key used to sign and verify administrative JWT tokens. | `A_Secure_32_Character_Hexadecimal_String` |

#### Frontend Service Environment Variables (`client`)

| Variable Name | Purpose | Example / Recommended Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The public base URL of the hosted backend Express API. | `https://quickdzyn-backend.onrender.com` |
| `NEXT_PUBLIC_SITE_URL` | The public URL of this Next.js website. | `https://quickdzyn.onrender.com` |

---

### Production Considerations & Disk Limitations

#### Local File Uploads (Multer)
The server uses Multer to save uploaded files (images, designs, screenshots) to local disk storage (`server/uploads/`).
On Render, standard Web Service filesystems are **ephemeral**. Any files saved locally inside the container will be deleted when the service restarts, scales down, or redeploys.

If you deploy this application in production:
1. **Render Persistent Disks (Paid option)**: You can mount a persistent volume at `/server/uploads` in your Render Web Service configuration. This preserves files across restarts.
2. **Cloud Object Storage (Recommended)**: For production, modify `server/src/routes/uploadRoutes.ts` to upload files directly to a cloud service such as AWS S3, Cloudinary, or Google Cloud Storage, instead of saving them to disk.
