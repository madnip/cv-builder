# Security Guidelines

## Multi-Tenant Isolation
- DOXIQA uses strict `organization_id` scoping for all primary models.
- **NEVER** trust user input IDs. All queries fetching `Applicant`, `Application`, `Document`, `Task`, etc., must explicitly append `where('organization_id', auth()->user()->organization_id)`.
- Use Laravel Global Scopes and/or Policies to enforce this automatically where possible.

## Data Privacy & Storage
- Documents contain sensitive identity and financial data.
- **NEVER** save uploaded files into the `public/` directory.
- All files must go to a private disk (e.g., `storage/app/private/documents/`).
- Access to files is brokered through application routes that verify user session, organization ownership, and document permissions.
- Validate MIME types rigorously (JPG, PNG, PDF) on upload to prevent malicious payload execution.

## Auditing and Tracking
- Any sensitive administrative action or financial modification (subscription, usage limits) must generate an audit log record.
- Actions like document viewing, download, verification, rejection, and user creation must be recorded in the `audit_logs` table.

## AI and User Ledger
- Financial, business rule, and quota limitations are processed strictly server-side.
- Ensure jobs are idempotent to avoid double-processing when processing queues or retrying failed OCR tasks.
