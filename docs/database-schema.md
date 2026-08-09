# Database ERD/Schema Overview

## Core Tables and Relationships

### User & Authentication
*   **users**: `id`, `name`, `username`, `email`, `password`, `referral_code`, `referred_by`, `status`, `2fa_secret`, `created_at`, `updated_at`, `deleted_at`.
*   **user_profiles**: `id`, `user_id`, `phone`, `country`, `address`, `avatar`, `notification_prefs`.
*   **roles**: `id`, `name`, `guard_name`.
*   **permissions**: `id`, `name`, `guard_name`.
*   **role_permissions**: Mapping table.

### Investment System
*   **investment_plans**: `id`, `name`, `min_amount`, `max_amount`, `return_rate`, `return_frequency`, `duration`, `cap`, `status`, `terms`.
*   **investments**: `id`, `user_id`, `plan_id`, `amount`, `status`, `start_date`, `end_date`, `total_earnings`, `total_paid`.
*   **investment_terms**: `id`, `investment_id`, `snapshot_data` (JSON of plan details at time of investment).

### Wallet & Ledger
*   **wallets**: `id`, `user_id`, `type` (main, available, investment, earnings, commission), `balance`.
*   **ledger_entries**: `id`, `user_id`, `wallet_id`, `type`, `amount`, `currency`, `direction` (debit/credit), `status`, `reference_id`, `description`, `created_at`.
*   **wallet_transactions**: High-level transaction wrapper mapping to multiple ledger entries.

### Deposits & Withdrawals
*   **deposits**: `id`, `user_id`, `payment_method_id`, `amount`, `currency`, `status`, `reference`, `proof_data`, `admin_notes`, `created_at`, `updated_at`.
*   **withdrawals**: `id`, `user_id`, `payment_method_id`, `destination`, `amount`, `currency`, `status`, `reference`, `admin_notes`, `created_at`, `updated_at`.
*   **payment_methods**: `id`, `provider`, `name`, `currency`, `config_data` (encrypted), `min_amount`, `max_amount`, `status`.

### Earnings & Referrals
*   **earnings**: `id`, `user_id`, `investment_id`, `period`, `rate`, `base_amount`, `calculated_amount`, `status`, `reference`, `created_at`, `paid_at`.
*   **referrals**: Mapping of inviter to invitee. (Usually handled by `referred_by` on users table, but could be a separate table for complex hierarchy).
*   **referral_levels**: `id`, `level`, `commission_rate`.
*   **commissions**: `id`, `user_id`, `referred_user_id`, `level`, `amount`, `transaction_reference`, `status`, `created_at`.

### KYC System
*   **kyc_applications**: `id`, `user_id`, `status` (pending, approved, rejected), `submitted_at`, `reviewed_at`, `reviewed_by`.
*   **kyc_documents**: `id`, `application_id`, `document_type`, `drive_file_id`, `status`.
*   **kyc_reviews**: `id`, `application_id`, `admin_id`, `decision`, `notes`, `created_at`.

### System & Support
*   **notifications**: `id`, `user_id`, `type`, `data`, `read_at`, `created_at`.
*   **support_tickets**: `id`, `user_id`, `category`, `subject`, `status`, `created_at`.
*   **support_messages**: `id`, `ticket_id`, `user_id`, `message`, `is_admin`, `created_at`.
*   **settings**: `key`, `value`, `type`, `group`.
*   **audit_logs**: `id`, `user_id`, `action`, `target_type`, `target_id`, `old_value`, `new_value`, `ip_address`, `created_at`.

## Key Indexing Strategy
- Primary Keys on `id`.
- Foreign Keys securely linked (e.g., `user_id` -> `users.id`).
- Indexes on `user_id`, `status`, `created_at`, and `reference` fields in all transactional tables.
- Unique constraints on `username`, `email`, and `referral_code`.