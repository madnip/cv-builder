# Referral & Commission Specification

## Concept
A distinct, independent engine that rewards users for bringing in new participants. It is entirely separate from the investment return calculations.

## Hierarchy Structure
- Users have a unique `referral_code`.
- When User B registers using User A's code, User A is recorded as `referred_by` for User B.
- Validations exist to prevent:
  - Self-referrals (A referring A).
  - Circular referrals (A refers B, B refers A).

## Commission Configuration
Admin can configure multi-level commission structures:
- Level 1 (Direct): e.g., 5%
- Level 2: e.g., 2%
- Level 3: e.g., 1%

## Triggering Events
Commissions can be configured to trigger on specific actions:
- On Deposit (e.g., 5% of deposited amount).
- On Investment (e.g., 5% of invested amount).

## Processing Flow
1. User B makes a $1000 investment.
2. The `ReferralEngine` intercepts the event.
3. It checks User B's upline (User A).
4. If Level 1 is 5%, the engine calculates $50.
5. It verifies this specific transaction hasn't already paid a commission to User A (Idempotency check via `transaction_reference`).
6. A `commissions` record is created.
7. A ledger transaction credits $50 to User A's "Commission Balance".
8. The engine moves to Level 2 (User A's inviter) and repeats the process based on Level 2 rates.