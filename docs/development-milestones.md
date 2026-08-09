# Development Milestones

## Milestone 1: Foundation & Architecture (Current)
- Complete system architecture design.
- Define database schemas and relationships.
- Document all core specifications (Financial, KYC, Security, etc.).
- Review and freeze requirements.

## Milestone 2: Core Backend & Database
- Setup Laravel project.
- Implement Database Migrations and Seeders.
- Build robust Authentication & Authorization (Roles/Permissions).
- Implement basic Admin and User dashboards (UI skeletons).

## Milestone 3: Financial Engine
- Develop Wallet and Ledger systems (double-entry logic, transactions).
- Implement Investment Engine (plan configurations, snapshotting).
- Build the Earnings Engine (Cron-based calculation).
- Develop the Referral & Commission engine.

## Milestone 4: Transactions & Integrations
- Build Deposit workflow (manual verification).
- Build Withdrawal workflow (admin approval).
- Implement the Payment Abstraction layer.
- Integrate Google Drive for temporary KYC storage.

## Milestone 5: UI/UX & Public Site
- Develop fully responsive public pages.
- Polish User Dashboard (Mobile-first).
- Polish Admin Panel (Reporting, User Management, Settings).

## Milestone 6: Testing & Hardening
- Write automated tests (Unit and Feature) for financial transactions.
- Perform security testing (concurrency, race conditions, penetration).
- Setup audit logging.
- Finalize documentation.

## Milestone 7: Deployment & Soft Launch
- Deploy to cPanel staging environment.
- Conduct closed testing.
- Launch production environment (KYC off, manual processing).