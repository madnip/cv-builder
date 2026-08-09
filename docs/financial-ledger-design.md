# Financial Ledger Design

## Concept
The application maintains a strict double-entry-like internal accounting ledger. All balance changes are represented by immutable ledger entries. Balances displayed to users are derived from or strictly synchronized with these ledger entries.

## Separation of Accounts
- **Internal User Ledger:** Represents what the system *owes* the user.
- **Company Settlement Account (External):** The actual real-world bank/crypto wallet where funds sit.
*Crucially: The application does NOT use the settlement account balance to determine user balances.*

## Wallet Types per User
1.  **Main/Available Balance:** Funds available for investment or withdrawal.
2.  **Investment Balance:** Funds currently locked in active investment plans.
3.  **Earnings Balance:** Returns generated from investments.
4.  **Commission Balance:** Earnings from referral activities.

## Ledger Entry Structure
Every movement creates a record in `ledger_entries`:
- `id` (Primary Key)
- `user_id`
- `wallet_id` (Link to specific wallet type)
- `type` (Enum: deposit, investment, return, commission, withdrawal, refund, adjustment)
- `amount` (Absolute value)
- `direction` (Enum: credit, debit)
- `status` (Enum: pending, completed, failed, reversed)
- `reference_id` (Polymorphic/String link to the triggering entity, e.g., Deposit ID)
- `description`
- `created_at`

## Transactional Integrity
- All ledger updates must be wrapped in database transactions (`DB::transaction()`).
- Database-level locking (e.g., `lockForUpdate()`) must be used when reading a wallet balance before a deduction to prevent race conditions (e.g., double spend on withdrawals).
- No ledger entry can be physically deleted; reversals are handled by creating a new compensating entry.