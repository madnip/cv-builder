# Security Specification

## Core Defenses
- **HTTPS Enforcement:** Mandatory for all traffic.
- **CSRF & XSS:** Laravel's built-in protections used strictly.
- **SQL Injection:** Eloquent ORM parameterized queries used exclusively.
- **Authentication:** Brute-force protection (rate limiting), secure sessions, and secure cookies.
- **Passwords:** Bcrypt/Argon2 hashing. No plaintext storage.

## Financial Security
- **Server-Side Trust:** Frontend calculations (balances, rates, returns) are purely cosmetic. All financial logic re-calculates and validates server-side.
- **Transactions:** `DB::transaction()` is mandatory for any operation altering a user's balance.
- **Race Conditions:** `lockForUpdate()` is used when querying balances prior to deduction to prevent concurrent withdrawal/investment exploits.
- **Idempotency:** Unique reference constraints prevent processing the same deposit, earning, or withdrawal twice.

## Data Protection
- **API Secrets:** Encrypted in the database.
- **KYC Data:** Temporary storage in a private Google Drive. Links are never public.
- **Audit Logs:** All sensitive admin actions (approvals, setting changes, manual adjustments) log the actor, action, IP, timestamp, and before/after states.

## Access Control
- Strict Role-Based Access Control (RBAC).
- Super Admins have full access; sub-admins (Support, Financial) have restricted views and capabilities.