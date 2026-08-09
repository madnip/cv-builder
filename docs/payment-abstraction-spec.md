# Payment Abstraction Specification

## Concept
The application must not be hard-coded to a single payment gateway, bank, or crypto exchange initially. It requires a flexible abstraction layer to accommodate the final chosen provider.

## Interface Design
A standard `PaymentProviderInterface` is defined:
```php
interface PaymentProviderInterface {
    public function generateDepositInstructions(float $amount, string $currency): array;
    public function processWebhook(array $payload): bool;
    public function processWithdrawal(string $destination, float $amount, string $currency): array;
}
```

## Provider Configuration
Handled in the database (`payment_methods` table), allowing Admin to configure:
- Status (Enabled/Disabled)
- Accepted Currency/Network
- API Credentials (stored encrypted)
- Minimum/Maximum limits

## Initial Implementation (Manual)
Before a live API is integrated:
- The `ManualPaymentProvider` is used.
- It provides static instructions (e.g., "Send BTC to this address").
- The user uploads a transaction hash/receipt.
- Admin manually verifies the external ledger and clicks "Approve" in the dashboard.
- Approving triggers the ledger entry.

## Security
- API keys and Webhook secrets are encrypted at rest using Laravel's encryption.
- Secrets are NEVER exposed to the frontend UI.
- Webhooks must be verified cryptographically based on provider specs.