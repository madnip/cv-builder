# Investment Calculation Specification

## Core Principles
1.  **Strict Rule Engine:** All calculations happen server-side based on database configurations. No frontend JavaScript calculations are trusted.
2.  **Snapshotting:** When an investment is made, the current terms of the plan are serialized and stored. Future changes to the plan do not retroactively affect existing investments.
3.  **No Implied Ownership:** Investment amounts represent a specific calculation contract, NOT a percentage of company ownership.

## Investment Plan Configuration
Admin configures the following per plan:
- `min_amount`: Minimum required to invest.
- `max_amount`: Maximum allowed limit.
- `return_rate`: Percentage (e.g., 10%).
- `return_frequency`: Hourly, Daily, Weekly, Monthly.
- `duration`: Number of periods or days.
- `cap`: Maximum total return allowed (optional).

## Calculation Logic
If Plan A is configured at 10% daily for 10 days:
- User invests $600.
- Daily Return = $600 * 0.10 = $60.
- This logic is executed by a Cron Job processing the `EarningsEngine`.

## Earning Engine Execution (Idempotency)
- A scheduled task runs (e.g., hourly).
- It selects all active investments due for a return.
- For each, it calculates the return amount based on the snapshotted rate and base amount.
- **Idempotency Check:** Before creating an earning record, the system checks if a record for that specific `investment_id` and `calculation_period` already exists.
- If not, it creates an `earnings` record and credits the user's Earnings Wallet via a ledger transaction.
- Once total earnings reach the `duration` limit or `cap`, the investment status is updated to `completed`.