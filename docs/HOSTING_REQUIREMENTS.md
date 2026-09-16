# Hosting Requirements

DOXIQA is designed to be deployable on standard shared cPanel hosting.

## Requirements
- **PHP**: 8.2 or higher
- **Extensions required**:
  - BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
  - GD or ImageMagick (for document previews/thumbnails)
- **Database**: MySQL 5.7+ or MariaDB 10.3+
- **Web Server**: Apache

## Limits and Constraints
- Maximum upload size (`upload_max_filesize`): Set to at least 20M, preferable 50M.
- Maximum POST size (`post_max_size`): Set to at least 20M, preferable 50M.
- Max execution time (`max_execution_time`): Set to at least 120s due to potential local processing before queue offload.
- Max memory limit (`memory_limit`): 256M recommended.

## Background Jobs (Cron)
Since cPanel lacks Supervisor, queue processing must be driven by standard cron.
```
* * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
```

## Directory Permissions
Directories requiring write permissions:
- `storage/`
- `bootstrap/cache/`

## Deployment Steps
1. Create Database and DB User in cPanel.
2. Upload codebase (excluding node_modules if building locally).
3. Run `composer install --optimize-autoloader --no-dev`.
4. Copy `.env.example` to `.env` and configure DB, Mail, App settings.
5. Generate APP_KEY (`php artisan key:generate`).
6. Run migrations (`php artisan migrate --force`).
7. Point Apache/cPanel domain document root to `public/`.
8. Configure cPanel cron for `schedule:run`.
