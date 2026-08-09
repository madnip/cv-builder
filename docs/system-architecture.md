# System Architecture

## Overview
A secure, scalable web application for an investment and affiliate platform, designed initially for cPanel shared hosting with a migration path to a VPS environment without application rewrites.

## Technology Stack
**Backend:**
- PHP 8.2+ (Laravel framework)
- MySQL/MariaDB database

**Frontend:**
- Blade templates
- Tailwind CSS
- Alpine.js or lightweight JavaScript
- Mobile-first, fully responsive design

## Infrastructure
**Initial (cPanel):**
- Apache/Nginx web server
- MySQL/MariaDB
- Cron Jobs for scheduled tasks
- SMTP for email notifications
- Private Google Drive for temporary KYC storage

**Future (VPS/Cloud):**
- Cloudflare (Edge/WAF)
- Nginx (Web Server)
- PHP-FPM
- MySQL/PostgreSQL
- Redis (Caching/Sessions)
- Queue Workers (Asynchronous jobs)
- Dedicated Object Storage (KYC and files)
- Docker (where appropriate)

## Key Architecture Principles
1. **Modular:** Separation of concerns (Investment Engine, Wallet Ledger, Referral Engine, KYC System, etc.).
2. **Service-Oriented:** Internal services handle distinct business rules (e.g., EarningEngineService).
3. **Secure:** Input validation, strict server-side calculations, encryption, role-based access control.
4. **Configuration-Driven:** All business rules (rates, caps, durations) configured via database/admin.
5. **Migration-Friendly:** Abstractions for queues, storage, and payments to easily transition to VPS.
6. **Idempotent Processes:** Cron jobs and scheduled tasks designed to avoid duplicate executions.
7. **Transactional:** Database transactions and locking mechanisms for all financial operations.
