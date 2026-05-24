# Digital Garden Architecture Documentation

This document serves as the absolute technical reference blueprint for the **Ewan** fullstack media application. It outlines the current state of development, architectural patterns, directory topography, and configuration maps implemented across the media processing and database layers.

---

## 1. Directory Topology

The project utilizes a strict modular architecture within the Next.js App Router context. Core application infrastructures are divided into isolated layers separating data mutation blocks, types, layout components, and api routers.

```text
DIGITAL-GARDEN/
├── app/
│   ├── api/
│   │   └── sign-cloudinary-params/
│   │       └── route.ts                 # Secure signing server endpoint
│   ├── utils/
│   │   ├── cloudinary/
│   │   │   └── cloudinary.ts            # Configured Cloudinary Node SDK instance
│   │   └── supabase/
│   │       └── client.ts                # Initialized client-side Supabase engine
│   ├── types/
│   │   └── posts.ts                     # Strong domain application type definitions
│   ├── components/
│   │   └── CldUploadWidget.tsx          # Client-side interactive upload container
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                         # Client-side testing workspace view
├── .env                                 # Local environment runtime variable sheets
├── package.json
└── tsconfig.json


***What I've Done so far***
- [x] Setup Cloundinary and Supabase
- [x] Created API route for signing Cloudinary upload parameters
- [x] Developed client-side upload widget component
- [x] Test out Supabase Create and Get operations for media records

Next Steps:
- [ ] Implement Supabase Update and Delete operations
- [ ] Integrate Supabase and Cloudinary flows for seamless media management
- [x] Tanstack Query integration for efficient data fetching and caching