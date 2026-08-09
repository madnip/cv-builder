# Testing Strategy

## Overview
A comprehensive testing approach focusing heavily on financial integrity, concurrency, and security, utilizing Laravel's testing suite (PHPUnit/Pest).

## 1. Automated Testing (Unit & Feature)
### Financial Integrity Tests
- **Wallet Ledger:** Assert that every credit/debit creates a correct `ledger_entry`.
- **Negative Balances:** Attempt to withdraw or invest more than the available balance; assert rejection.
- **Investment Snapshots:** Change a plan's rate after an investment is made; assert the calculation still uses the original snapshotted rate.
- **Idempotency:** Force the Earnings Cron Job to run twice in the same period; assert only one return is credited.
- **Concurrency (Race Conditions):** Simulate simultaneous withdrawal requests to ensure database locking prevents double spending.

### Core Logic Tests
- **Referrals:** Test direct and multi-level commission payouts. Assert protections against self-referrals.
- **Authentication:** Test Registration, Login, 2FA, and Password Resets.
- **KYC Routing:** Assert that users cannot perform restricted actions when KYC is enabled but not approved.

## 2. Security Testing
- **Role Permissions:** Attempt to access admin routes with a standard user account. Attempt sensitive admin actions with read-only admin roles.
- **Input Validation:** Test extreme inputs (negative numbers, excessively large numbers, strings in numeric fields) on financial endpoints.
- **Mass Assignment:** Verify `$fillable` arrays on all models.

## 3. Manual Testing
- **UI/UX:** Test responsiveness on Desktop, Tablet, and Mobile across major browsers.
- **Payment Flow:** Perform manual testing of the Deposit (upload proof, admin approve) and Withdrawal workflows.
- **KYC Upload:** Manually test the integration with Google Drive to ensure files upload securely and links are restricted.

## 4. cPanel Deployment Testing
- Verify Cron Jobs execute correctly in the shared hosting environment.
- Verify symlinks and file permissions are secure.
- Verify SMTP configuration.