# DOXIQA Architecture

## Overview
DOXIQA is an AI Document Operations SaaS intended for Visa & Education Agencies to streamline processing applicant documents via OCR, AI extraction, and cross-document validation.

## Hosting Compatibility
- **Environment**: Shared cPanel Hosting compatible
- **Stack**:
  - Backend: Laravel (PHP 8.2+ compatible)
  - Database: MySQL/MariaDB
  - Frontend: Blade, Tailwind CSS, Alpine.js
- **No Dependencies on**: Docker, Node.js server runtime, Redis (for initial deployment), VPS root access, or Supervisor.

## Multi-Tenant Design
- Users, applicants, applications, documents, and configurations are strictly isolated by `organization_id`.
- Tenant context is enforced centrally via Laravel Policies and standard query scoping.

## OCR & AI Architecture
- **OCR Abstracted**: Implements an `OcrServiceInterface` so processing is vendor-agnostic.
- **AI Extraction Abstracted**: Implements a `DocumentAiServiceInterface` that mandates structured JSON outputs for document classification, field extraction, validation against expected formats, and cross-document inconsistencies.
- **Workflow**: Queue background tasks via a database-backed job runner or scheduled cron processes to prevent blocking HTTP requests.

## Storage Architecture
- Uses local storage (`storage/app/private/`) initially due to shared hosting constraints.
- Sensitive documents strictly isolated from public HTTP access, provided via signed temporary URLs or authorized proxy endpoints.
- Extensible storage structure capable of accommodating AWS S3 or compatible equivalents without heavy refactoring.
