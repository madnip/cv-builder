# Admin Flow

## 1. Authentication & Security
- Admin logs in via a secure route.
- 2FA is mandatory for high-level admin roles.
- All sensitive actions are logged in the `audit_logs`.

## 2. Dashboard Overview
- Admin views system health: Total Active Users, Pending Deposits/Withdrawals, Pending KYC, Total Investments, System Stats.

## 3. Financial Management
- **Deposits:** Admin reviews pending deposits, checks transaction references, and clicks "Approve" or "Reject". Approving automatically updates user balances via transactional database operations.
- **Withdrawals:** Admin reviews pending requests, performs risk checks, processes the payment externally, and marks the request as "Approved" (or "Rejected").
- **Ledger/Wallets:** Admin can view the global ledger, user-specific ledgers, and perform manual adjustments (requires detailed reasoning and logs).

## 4. Investment & Plan Configuration
- Admin can Create, Update, or Disable Investment Plans.
- Updates to plans only affect *future* investments; historical investments rely on their snapshotted terms.

## 5. KYC Review
- Admin navigates to the KYC module.
- Reviews user details and attached Google Drive documents.
- Makes a decision: Approve, Reject, or Request Resubmission.
- Adds internal notes for the decision.

## 6. User Management & Support
- Admin views user profiles, investment history, and transaction logs.
- Can restrict accounts (suspend) or modify user roles/permissions.
- Admin manages Support Tickets, assigning them, replying, and closing.

## 7. System Configuration
- Admin manages global settings: Enabling/Disabling features (Registration, KYC, Withdrawals).
- Configures Notification templates, Referral Levels, and Payment Provider details.

## 8. Reporting
- Admin generates reports for Financials (Deposits, Earnings), User Growth, and Commissions.
- Exports data as needed for accounting purposes.