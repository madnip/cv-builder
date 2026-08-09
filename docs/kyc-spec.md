# KYC (Know Your Customer) Specification

## Status Overview
- **Initial State:** The KYC module MUST be fully built from day one, but it is strictly **DISABLED** by default.
- **Activation:** Can only be activated by an Admin via Settings after legal/compliance approval.

## Configuration Options
- **Mode:** Disabled, Optional, Required.
- **Enforcement:** Admin can toggle requiring KYC for specific actions (e.g., Withdrawals, Deposits, Investments).
- **Form Fields:** Configurable list of required data (Name, DOB, Address, ID Type, ID Number).

## Temporary Storage (Google Drive)
- Direct server storage of sensitive documents is avoided.
- Initially, the system integrates with the Google Drive API.
- Files are uploaded to a private, secure, Admin-controlled Google Drive folder.
- Only the `drive_file_id` and document metadata are stored in the application database.
- Links must NEVER be public.

## User Flow
1. User navigates to KYC section.
2. Fills out forms and uploads images.
3. System validates file types/sizes, pushes files to Google Drive, and creates a `kyc_applications` record with status `Pending`.

## Admin Review Workflow
1. Admin views pending applications.
2. Admin uses the internal panel to view user details and the restricted Google Drive documents.
3. Admin records a decision (Approve, Reject, Request Resubmission) with internal notes.
4. An `audit_logs` entry is securely recorded.
5. If Approved, user status updates, lifting restrictions.