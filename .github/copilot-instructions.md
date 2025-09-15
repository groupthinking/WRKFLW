# ConstructionOnline WRKFLW - Copilot Instructions

ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Overview
WRKFLW is a construction management monorepo containing a starter implementation for ConstructionOnline MVP. The repository includes a TypeScript Express backend, React frontend, Expo React Native mobile app, and Terraform infrastructure configuration. The current implementation is a multi-timezone clock demo that demonstrates the full stack architecture.

## Working Effectively

### Prerequisites and Environment Setup
- Node.js v20.19.5 and npm 10.8.2 are available and working
- The repository uses npm workspaces with 4 sub-projects: backend, frontend, mobile, infra
- All package installations and builds have been validated to work

### Initial Setup Commands
Run these commands in order to set up the development environment:

```bash
# Install root workspace dependencies - takes 6 seconds, NEVER CANCEL
npm install

# Install missing TypeScript definitions for backend (required)
cd backend && npm install --save-dev @types/cors @types/luxon

# Install missing TypeScript definitions for frontend (required)  
cd frontend && npm install --save-dev @types/react @types/react-dom typescript
```

### Build and Test Commands
Execute these commands to build and validate the codebase:

```bash
# Build backend - takes 2 seconds
cd backend && npm run build

# Build frontend - takes 5 seconds  
cd frontend && npm run build

# Start backend development server
cd backend && npm run dev
# Backend will be available at http://localhost:4000

# Start frontend development server (in new terminal)
cd frontend && npm start  
# Frontend will be available at http://localhost:3000

# Start both backend and frontend concurrently from root
npm start
```

### Critical Build Information
- **NEVER CANCEL** any npm install or build commands - they complete quickly (under 10 seconds each)
- Root dependency installation: 6 seconds
- Backend build: 2 seconds  
- Frontend build: 5 seconds
- Backend startup: instant
- Frontend startup: 10-15 seconds
- Mobile app **WILL FAIL** due to network restrictions preventing access to api.expo.dev - this is expected

### Working Applications and Validation

#### Backend API (Express + TypeScript)
- **Location**: `backend/src/index.ts`  
- **Port**: 4000
- **Endpoints**:
  - GET `/api/health` - Health check
  - GET `/api/timezones` - List default timezones
  - POST `/api/time` - Get current time for specified timezones
- **Validation**: All endpoints tested and working
- **Example**: `curl http://localhost:4000/api/health` returns `{"status":"ok","now":"..."}`

#### Frontend Web App (React + TypeScript)  
- **Location**: `frontend/src/App.tsx`
- **Port**: 3000
- **Functionality**: Multi-timezone clock with add/remove timezone capability
- **Validation**: Fully tested - can add timezones (e.g., "Asia/Shanghai"), remove timezones, real-time clock updates
- **Screenshot**: ![Working Frontend](https://github.com/user-attachments/assets/e514cdd2-4d6d-4207-af32-9a62eb33f5de)
- **Manual Testing**: Always test timezone addition/removal functionality after making changes

#### Mobile App (Expo React Native)
- **Location**: `mobile/App.js`
- **Status**: **CANNOT RUN** - fails with network errors trying to reach api.expo.dev
- **Expected Error**: `FetchError: request to https://api.expo.dev/v2/versions/latest failed`
- **Note**: This is expected in sandboxed environments. Do not attempt to fix - document as limitation

#### Infrastructure (Terraform)
- **Location**: `infra/terraform/main.tf`
- **Contents**: AWS S3 bucket configuration for asset storage
- **Note**: Cannot be applied without AWS credentials

## Repository Structure Reference

### Root Directory
```
├── package.json          # Workspace configuration, concurrently script
├── README.md             # Basic setup instructions  
├── PRD.md               # Comprehensive product requirements (290 lines)
├── openapi.yaml         # API specification stub
├── graphql/schema.graphql # GraphQL schema stub
├── seed-data.json       # Sample data (users, projects, tasks)
├── backend/             # Express TypeScript API
├── frontend/            # React TypeScript web app
├── mobile/              # Expo React Native app (non-functional)
└── infra/               # Terraform AWS configuration
```

### Backend Structure
```
backend/
├── package.json         # Express, cors, luxon dependencies
├── tsconfig.json        # TypeScript configuration
└── src/index.ts         # Main server file with timezone API
```

### Frontend Structure  
```
frontend/
├── package.json         # React, react-scripts dependencies
├── tsconfig.json        # TypeScript configuration (created during setup)
├── public/index.html    # HTML template
└── src/
    ├── index.tsx        # React root
    └── App.tsx          # Main timezone clock component
```

## Development Workflow

### Making Changes
1. **Always start both backend and frontend** before testing changes:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2  
   cd frontend && npm start
   ```

2. **Test API changes**: Use curl to test backend endpoints:
   ```bash
   curl http://localhost:4000/api/health
   curl http://localhost:4000/api/timezones
   ```

3. **Test frontend changes**: Navigate to http://localhost:3000 and test:
   - Add a new timezone (e.g., "Europe/Paris")  
   - Remove an existing timezone
   - Verify times update every second
   - Verify proper error handling for invalid timezones

### Production Builds
```bash
# Build for production
cd backend && npm run build && npm start
cd frontend && npm run build
```

### Troubleshooting Common Issues

#### Frontend Module Resolution Error
If you see `Module not found: Error: Can't resolve './App'`:
- Ensure `frontend/tsconfig.json` exists (it gets created during setup)
- Verify `@types/react` and `@types/react-dom` are installed

#### Backend Type Errors
If you see TypeScript errors for `cors` or `luxon`:
- Install missing types: `npm install --save-dev @types/cors @types/luxon`

#### Port Already in Use
If backend fails with `EADDRINUSE` on port 4000:
- Stop existing processes: `pkill -f "npm run dev"`
- Or use different port: `PORT=4001 npm run dev`

## Key Files for Common Tasks

### API Development
- Modify `backend/src/index.ts` for new endpoints
- Update `openapi.yaml` for API documentation
- Reference `seed-data.json` for data structure examples

### Frontend Development  
- Modify `frontend/src/App.tsx` for UI changes
- Component uses React hooks (useState, useEffect)
- Styling is inline (no CSS files)

### Adding Dependencies
```bash
# Backend dependencies
cd backend && npm install <package>

# Frontend dependencies  
cd frontend && npm install <package>

# Root dependencies (affects all workspaces)
npm install <package> -w backend -w frontend
```

## Validation Requirements

### Always Test These Scenarios
1. **Backend API**: All 3 endpoints respond correctly
2. **Frontend Clock**: 
   - Shows current time for all default timezones
   - Can add new timezone (try "Asia/Kolkata")
   - Can remove timezone (click Remove button)
   - Times update every second
3. **Error Handling**: Try invalid timezone like "Invalid/Zone"

### Never Skip These Steps
- Run both `npm run build` commands before committing
- Start both services and verify they work together
- Test at least one complete user scenario (add/remove timezone)
- Verify no console errors in browser developer tools

## Expected Limitations
- **Mobile app cannot start** due to network restrictions - this is expected
- **No linting/testing infrastructure** - only build validation available
- **No CI/CD pipelines** - manual testing required
- **No database** - all data is in-memory/client-side

This codebase provides a solid foundation for construction management features but currently implements only timezone functionality as a proof of concept.