# cPanel Deployment Architecture

## Prerequisites
- cPanel account with PHP 8.2+ and MySQL/MariaDB.
- SSL Certificate installed for the domain.
- Composer availability via SSH (or local vendor packaging).

## Directory Structure
To secure the application on cPanel, the standard Laravel structure is adapted:
- `public_html/` (Web Root): Contains the contents of Laravel's `public` directory (`index.php`, CSS, JS).
- `/home/user/application/`: Contains the core Laravel files (`app`, `config`, `routes`, `.env`).
- `index.php` is modified to point to the secure paths outside `public_html`.

## Configuration Steps
1.  **Database:** Create MySQL database and user via cPanel; update `.env`.
2.  **Environment:** Set `APP_ENV=production`, `APP_DEBUG=false`, and configure `APP_URL`. Ensure `.env` is outside the public web root.
3.  **Storage:** Create symlink via artisan command (if shell access available) or PHP script to link `storage/app/public` to `public_html/storage`. Private KYC documents remain isolated.
4.  **Mail:** Configure SMTP settings using cPanel's email accounts.
5.  **Cron Jobs:** Set up the Laravel scheduler via cPanel Cron Jobs interface:
    `* * * * * /usr/local/bin/php /home/user/application/artisan schedule:run >> /dev/null 2>&1`
6.  **Queues:** Since this is initial shared hosting, the queue driver in `.env` is typically set to `sync` or `database`. Heavy background jobs must be optimized.

## Future VPS Migration
The application is designed to be easily lifted from cPanel to a VPS. The `.env` variables will shift (e.g., `QUEUE_CONNECTION=redis`), but the core codebase remains intact.