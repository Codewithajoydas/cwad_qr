# CWAD QR

A customizable QR code generator and browser-based QR scanner built with React, TypeScript, and Vite. Cwad QR supports multiple QR content types, live previews, detailed visual customization, image exports, and camera-based scanning.

The repository is organized as an npm-workspaces monorepo with a React/Vite web application, an Express API, and reusable shared packages.

<p align="center">
  <strong>Create. Customize. Connect.</strong>
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [QR Code Generator](#qr-code-generator)
  - [QR Code Scanner](#qr-code-scanner)
  - [Web Application](#web-application)
  - [API](#api)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [API Endpoints](#api-endpoints)
- [QR Customization Reference](#qr-customization-reference)
- [Camera and Browser Permissions](#camera-and-browser-permissions)
- [Development Workflow](#development-workflow)
- [Docker](#docker)
- [Testing and Code Quality](#testing-and-code-quality)
- [Architecture Notes](#architecture-notes)
- [Current Scope and Limitations](#current-scope-and-limitations)
- [Contributing](#contributing)
- [License](#license)

## Overview

Cwad QR provides two main tools:

1. **QR Generator** — create QR codes from common information types, customize their appearance, preview changes, and export the result.
2. **QR Scanner** — use a device camera to scan QR codes and inspect the decoded content.

The frontend performs QR generation and camera scanning in the browser. The repository also contains a small Express API with health and readiness endpoints, plus shared TypeScript and validation packages.

## Features

### QR Code Generator

Choose a content category and enter the information to encode.

Supported categories:

| Category | Encoded information |
|---|---|
| Link | Website URL |
| Contact | Contact details using vCard data |
| Wi-Fi | Network name, password, security type, and hidden-network setting |
| Email | Email address, subject, and message |
| Phone | Phone number |
| SMS | Phone number and message |
| Text | Plain text |
| PDF | Public PDF URL |
| Image | Public image URL |
| Location | Latitude, longitude, and optional location name |
| Bitcoin | Bitcoin address, amount, label, and message |
| Event | Event title, location, start/end time, and description |

Generator capabilities:

- Live QR preview that updates when content or design settings change.
- Input validation for required fields and supported content types.
- URL normalization for Link, PDF, and Image content.
- Structured payload generation for vCard, Wi-Fi, email, phone, SMS, geographic location, Bitcoin, and calendar event data.
- Copy the encoded payload to the clipboard.

### QR Code Customization

Customize the QR code through the generator's customization panel.

**Colors and presets**

- Classic
- Midnight
- Ocean
- Forest
- Berry
- Sunset
- Custom data/dot color
- Custom background color
- Custom finder-frame color
- Custom finder-eye color
- Transparent background option

**Shapes and layout**

- Data module shapes: square, circle, and rounded.
- Finder outer-frame shapes: square, rounded, extra-rounded, and circle.
- Finder inner-eye shapes: square, rounded, and circle.
- Quiet-zone/margin adjustment.

**Center logo**

- Upload an image to use as the center logo.
- Adjust logo size, aspect ratio, corner radius, and surrounding clearance.
- Option to clear QR dots behind the logo.
- Remove the uploaded logo and return to a QR code without a logo.

**Advanced settings**

- QR output size.
- Error correction levels: L, M, Q, and H.
- Automatic QR version or a manually selected version from 1 to 40.
- Export format selection.
- Raster export scale.
- JPEG quality.
- Custom download filename.

### QR Code Export

Export generated QR codes in:

- **PNG** — raster image with transparency support.
- **JPEG** — raster image with configurable quality.
- **SVG** — scalable vector image.

The export settings include a filename. PNG and JPEG exports also support a configurable scale. JPEG does not support transparency, so transparent backgrounds are rendered with a white background for JPEG output.

### QR Code Scanner

The scanner uses the device camera to detect and decode QR codes.

Current scanner functionality:

- Start and stop camera scanning.
- Prefer the rear-facing camera when the browser/device supports it.
- List available cameras after camera permission is granted.
- Switch between available cameras.
- Display friendly camera labels such as Front Camera, Back Camera, Webcam, or Other Camera.
- Toggle the flashlight when the active camera supports it.
- Display the decoded QR content.
- Classify common payloads as Website, Email, Phone, Wi-Fi, Contact, SMS, Location, or Plain Text.
- Display Wi-Fi network name, password, and encryption information for recognized Wi-Fi payloads.
- Copy the scanned result.
- Clear the current result.

The scanner only displays the flashlight control when the active camera reports flashlight support.

## Technology Stack

### Web application

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| TypeScript | Static typing |
| Vite | Development server and build tooling |
| React Router | Client-side routing |
| Tailwind CSS 4 | Styling |
| shadcn-style UI components | Interface components |
| Lucide React | Icons |
| `@ttsalpha/qrcode` | QR generation, rendering, and export |
| `qr-scanner` | Browser camera QR scanning |
| Vitest | Web application tests |

### API and shared packages

| Technology | Purpose |
|---|---|
| Node.js | API runtime |
| Express 5 | HTTP API |
| TypeScript | API and shared-package types |
| Zod | Environment and data validation |
| Helmet | HTTP security headers |
| CORS | Cross-origin request configuration |
| Pino / pino-http | Structured HTTP logging |
| Vitest | API and shared-package tests |
| Turborepo | Monorepo task orchestration |
| npm Workspaces | Package management |

## Repository Structure

```text
cwad_qr/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── routes/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── tests/
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   └── ui/
│       │   ├── config/
│       │   ├── lib/
│       │   ├── pages/
│       │   │   ├── GenerateQR.tsx
│       │   │   └── Scanner.tsx
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       ├── tests/
│       ├── .env.example
│       ├── package.json
│       └── vite.config.ts
│
├── packages/
│   ├── config/
│   ├── types/
│   ├── utils/
│   └── validation/
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker/
│   ├── api.Dockerfile
│   └── web.Dockerfile
├── .env.example
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.base.json
├── turbo.json
└── README.md
```

## Requirements

Before getting started, install:

- [Node.js](https://nodejs.org/) 20 or later.
- npm (the repository declares npm `12.0.2` as its package manager).
- [Git](https://git-scm.com/).
- Docker Desktop is optional and only needed for the containerized workflow.

Check your installed versions:

```bash
node --version
npm --version
git --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Codewithajoydas/cwad_qr.git
cd cwad_qr
```

### 2. Install dependencies

Run this command from the repository root:

```bash
npm install
```

The project uses npm Workspaces, so install dependencies from the root rather than installing each workspace independently.

### 3. Configure environment variables

Create local environment files from the examples.

**macOS / Linux**

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

**Windows PowerShell**

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

Review the values in the [Environment Variables](#environment-variables) section.

### 4. Start the development environment

From the repository root:

```bash
npm run dev
```

The root development script starts the workspace development tasks through Turborepo.

Default local addresses:

| Service | URL |
|---|---|
| Web application | http://localhost:5173 |
| API | http://localhost:4000 |
| API health | http://localhost:4000/api/v1/health |
| API readiness | http://localhost:4000/api/v1/ready |

## Environment Variables

### API — `apps/api/.env`

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Runtime environment (`development`, `test`, or `production`) | `development` |
| `PORT` | API server port | `4000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

Example:

```env
NODE_ENV=development
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

### Web — `apps/web/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API base URL exposed to the Vite application | `http://localhost:4000` |

Example:

```env
VITE_API_URL=http://localhost:4000
```

**Security note:** Vite variables prefixed with `VITE_` are exposed to browser-side code. Never store passwords, private API keys, tokens, or other secrets in `VITE_*` variables.

## Available Scripts

Run root-level scripts from the repository root.

| Command | Description |
|---|---|
| `npm run dev` | Start workspace development tasks |
| `npm run build` | Build all configured workspaces |
| `npm run start` | Run workspace production start tasks |
| `npm run lint` | Run ESLint across workspaces |
| `npm run typecheck` | Run TypeScript checks across workspaces |
| `npm run test` | Run workspace tests |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting without modifying files |
| `npm run clean` | Run workspace clean tasks |

Build before starting the production applications:

```bash
npm run build
npm run start
```

### Run workspace-specific commands

API tests:

```bash
npm run test --workspace=@cwad/api
```

Web tests:

```bash
npm run test --workspace=@cwad/web
```

Validation package tests:

```bash
npm run test --workspace=@cwad/validation
```

## Application Routes

The React application currently registers these routes:

| Route | Page | Description |
|---|---|---|
| `/` | QR Generator | Create and customize QR codes |
| `/scanner` | QR Scanner | Scan QR codes using a camera |

## API Endpoints

The Express API currently exposes a root status response and two versioned health endpoints.

### API root

```http
GET /
```

Returns basic API service information.

### Health check

```http
GET /api/v1/health
```

Example response:

```json
{
  "status": "ok",
  "service": "api",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

The timestamp is generated when the endpoint is called.

### Readiness check

```http
GET /api/v1/ready
```

Example response:

```json
{
  "status": "ready",
  "service": "api"
}
```

These endpoints currently report API process health/readiness. They do not check a database, cache, queue, or other external dependency.

## QR Customization Reference

| Setting | Available options |
|---|---|
| Data/dot color | Custom color |
| Background | Custom color or transparent |
| Finder frame color | Custom color |
| Finder eye color | Custom color |
| Color presets | Classic, Midnight, Ocean, Forest, Berry, Sunset |
| Data module shape | Square, Circle, Rounded |
| Finder outer shape | Square, Rounded, Extra-rounded, Circle |
| Finder inner shape | Square, Rounded, Circle |
| Margin | 0–20 modules |
| Logo size | Adjustable |
| Logo aspect ratio | Automatic, Square, Landscape, Wide, Portrait |
| Logo corner radius | Adjustable |
| Logo clearance | Adjustable |
| QR output size | 128–2048 px |
| Error correction | L, M, Q, H |
| QR version | Automatic or Version 1–40 |
| Export formats | PNG, JPEG, SVG |
| Raster export scale | 1×–4× |
| JPEG quality | Adjustable |

Customization options are constrained by the QR renderer and QR encoding rules. A fixed QR version may not fit every payload.

## Camera and Browser Permissions

The scanner needs browser camera access.

- Allow camera permission when the browser asks.
- Camera access generally requires a secure context: use `localhost` during local development and HTTPS in production.
- Camera availability and labels depend on the browser, operating system, and connected hardware.
- Front/back camera labels are best-effort friendly names derived from the device-provided camera label. Some devices expose generic names.
- Flashlight controls are only available when the active camera/browser reports flashlight support.
- A desktop webcam can also be used if the browser exposes it as a camera device.

If the camera does not start, check browser permissions, confirm that another application is not exclusively using the camera, and verify that the page is running in a secure context.

## Development Workflow

A typical local development workflow:

```bash
# Install dependencies
npm install

# Start web and API
npm run dev

# Run checks
npm run lint
npm run typecheck
npm run test

# Create production builds
npm run build
```

Before submitting a change:

1. Keep changes within the relevant workspace where possible.
2. Run linting and type checks.
3. Run the relevant workspace tests.
4. Verify QR generation and export after changing generator behavior.
5. Verify camera permission, camera switching, and scanning after changing scanner behavior.

## Docker

Docker is optional.

Build and start the configured services:

```bash
docker compose up --build
```

Stop the services:

```bash
docker compose down
```

The repository includes separate Dockerfiles for the API and web application:

- `docker/api.Dockerfile`
- `docker/web.Dockerfile`

## Testing and Code Quality

The repository uses Vitest for tests and includes workspace-level scripts for:

- ESLint
- TypeScript type checking
- Vitest tests
- Prettier formatting checks

Run all root checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run format:check
```

The GitHub Actions workflow is configured to install dependencies, typecheck, lint, test, and build the workspaces.

## Architecture Notes

### Monorepo

The repository uses npm Workspaces and Turborepo to organize applications and shared packages.

### Web application

The web application is a React/Vite single-page application. React Router handles the registered generator and scanner routes.

QR generation and scanning are handled in the browser through dedicated libraries:

- `@ttsalpha/qrcode` for QR rendering and export.
- `qr-scanner` for camera-based QR decoding.

### API

The API is an Express application. Its current middleware stack includes:

1. Helmet security headers.
2. CORS configuration.
3. JSON request parsing with a 1 MB limit.
4. HTTP request logging through Pino.
5. Versioned health/readiness routes.
6. Not-found and centralized error handlers.

### Shared packages

| Package | Responsibility |
|---|---|
| `@cwad/types` | Shared TypeScript contracts |
| `@cwad/validation` | Shared Zod validation schemas |
| `@cwad/utils` | Framework-independent reusable utilities |
| `@cwad/config` | Shared configuration primitives |

## Current Scope and Limitations

This README describes the implementation currently present in the repository.

- QR generation and camera scanning are implemented in the web application.
- The API currently provides service status, health, and readiness endpoints.
- No database-backed QR history or user account/authentication flow is documented in the current implementation.
- The scanner currently scans using a live camera; image-file scanning is not documented as an implemented feature.
- Camera names and flashlight availability depend on browser/device capabilities.
- The navigation includes links beyond the two routes currently registered in the application; verify route implementation before relying on additional pages.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run lint, typecheck, and tests.
5. Open a pull request with a clear description of the change.

For substantial changes, consider opening an issue first to discuss the proposed implementation.

## License

No license file or explicit license declaration was found in the repository at the time this README was prepared. Unless a license is added by the repository owner, the project should not be assumed to be open source under a particular license.

---

**Repository:** [Codewithajoydas/cwad_qr](https://github.com/Codewithajoydas/cwad_qr)

