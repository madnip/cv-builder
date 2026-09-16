# Database Design Core Schema

## Organizations
- `id`, `name`, `status`, `created_at`, `updated_at`

## Users
- `id`, `name`, `email`, `password`, `organization_id`, `role` (SUPER_ADMIN, OWNER, MANAGER, STAFF), `timestamps`, `soft_deletes`

## Subscriptions
- `id`, `organization_id`, `plan_type` (STARTER, PROFESSIONAL, AGENCY), `status`, `limits`, `timestamps`

## Applicants
- `id`, `organization_id`, `full_name`, `email`, `phone`, `whatsapp`, `date_of_birth`, `nationality`, `passport_number`, `passport_issue_date`, `passport_expiry_date`, `identity_number`, `address`, `metadata` (JSON), `timestamps`

## Applications
- `id`, `organization_id`, `applicant_id`, `application_number`, `visa_type`, `destination_country`, `institution`, `course`, `intake`, `assigned_user_id`, `priority`, `status`, `application_date`, `timestamps`

## Documents
- `id`, `organization_id`, `applicant_id`, `application_id` (nullable), `category`, `status` (MISSING, UPLOADED, PROCESSING, EXTRACTED, NEEDS_REVIEW, VERIFIED, REJECTED, EXPIRED), `file_path`, `mime_type`, `original_name`, `tags` (JSON), `notes`, `timestamps`

## Document Extractions
- `id`, `document_id`, `ocr_text`, `ai_structured_data` (JSON), `provider`, `confidence`, `status`, `timestamps`

## Application Checklists & Items
- `id`, `application_id`, `name`, `timestamps`
- `id`, `checklist_id`, `document_category`, `is_required`, `status`, `timestamps`

## Tasks & Notifications
- `id`, `organization_id`, `title`, `description`, `assigned_to`, `application_id`, `priority`, `status`, `due_date`, `timestamps`

## Share Links & Audit Logs
- `id`, `organization_id`, `application_id`, `token`, `expires_at`, `usage_limit`, `timestamps`
- `id`, `organization_id`, `user_id`, `action`, `model_type`, `model_id`, `ip_address`, `user_agent`, `details` (JSON), `timestamps`
