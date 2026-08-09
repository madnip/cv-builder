# Module List

## Core Modules

### 1. Authentication & Authorization
- Registration, Login, Logout, Password Reset.
- Email/Phone verification.
- 2FA (Two-Factor Authentication).
- Role-based Access Control (RBAC) for Admin Panel.

### 2. User Profile & Dashboard
- User demographics, security settings, notification preferences.
- Summary dashboard (balances, recent activity, active investments).

### 3. Investment Engine
- Investment plan configuration (min/max, rate, frequency, duration, cap).
- Historical snapshotting of plan terms upon investment.
- Management of active and completed investments.

### 4. Wallet & Ledger System
- Internal accounting ledger.
- Separation of balances (Main, Available, Investment, Earnings, Commission).
- Audit trails for every balance movement.

### 5. Deposit System
- Deposit request generation with payment instructions.
- Verification (manual initially).
- Configurable payment providers.

### 6. Withdrawal System
- Withdrawal request handling.
- Balance validation and security checks.
- Admin review/approval workflow.

### 7. Earnings / Return Engine
- Scheduled calculation of returns based on investment plan rules.
- Idempotent earning record generation.
- Crediting to user wallets.

### 8. Referral & Affiliate Engine
- Multi-level referral tracking.
- Commission configuration and calculation.
- Separate accounting for referral earnings.

### 9. KYC (Know Your Customer)
- Configurable application fields.
- Admin activation/deactivation control.
- Temporary Google Drive storage integration.
- Admin review workflow (Approve/Reject/Resubmit).

### 10. Admin Panel
- Comprehensive management of users, investments, wallets, and KYC.
- Detailed reports and system settings.
- Security and audit logs.

### 11. Support System
- Ticket creation and management.
- Communication between users and support admins.

### 12. Notification System
- Configurable templates.
- Multi-channel delivery (In-app, Email, SMS).
- Triggered by key system events.

### 13. Public Website
- Landing pages (Home, About, Plans, Affiliate, FAQ, Contact, Terms, Privacy).
- Responsive, modern, and trustworthy design.
