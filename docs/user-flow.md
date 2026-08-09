# User Flow

## 1. Onboarding
- **Visit Website:** User browses public pages (Home, Plans, About).
- **Registration:** User enters Name, Username, Email, Password, and optional Referral Code.
- **Verification:** User verifies email (if enabled in settings).
- **Login:** User authenticates. Optional 2FA challenge.

## 2. Dashboard Access
- User views summary: Total Balance, Active Investments, Earnings, and Recent Transactions.
- Quick actions available: Deposit, Invest, Withdraw.

## 3. KYC (If Enabled)
- User prompted to complete KYC before certain actions (e.g., investing or withdrawing).
- User submits personal details and uploads required documents.
- Application status changes to "Pending".
- Upon Admin approval, status updates to "Approved", unlocking restricted features.

## 4. Funding the Account (Deposit)
- User selects "Deposit".
- Chooses Payment Method and enters Amount.
- System provides payment instructions.
- User makes payment external to the system and submits a transaction reference/proof.
- Status is "Pending" until Admin approval.
- Upon approval, the User's "Available Balance" is credited.

## 5. Investing
- User browses Investment Plans.
- Selects a plan, enters an amount (must be within plan limits and available balance).
- System validates funds, creates an `investments` record, and snapshots plan terms.
- Funds are debited from "Available Balance" and credited to "Investment Balance".

## 6. Earning & Referrals
- Earnings are automatically calculated and credited to the "Earnings Balance" based on the investment schedule.
- If the user referred others, commissions are calculated and credited to the "Commission Balance" when referrals perform eligible actions.

## 7. Withdrawing Funds
- User selects "Withdraw".
- Validates sufficient funds in appropriate balances.
- Selects Withdrawal Method and destination details.
- Status is "Pending" until Admin review.
- Upon Admin approval, funds are deducted from the user's balance and processed externally.

## 8. Support
- User can open a support ticket if issues arise, track responses, and communicate with Admin.