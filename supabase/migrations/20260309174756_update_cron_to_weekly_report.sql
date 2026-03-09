-- 1. Remove o cron job antigo que apenas fazia um SELECT
SELECT cron.unschedule('keep-supabase-alive');

-- 2. Agenda o novo cron para toda segunda-feira às 09:00 AM
-- O cron '0 9 * * 1' significa: Minuto 0, Hora 9, Qualquer dia do mês, Qualquer mês, Segunda-feira (1)
SELECT cron.schedule(
  'weekly-system-report',
  '0 9 * * 1',
  $$
  SELECT
    net.http_post(
      url     := 'https://kiyhlrcnfutcsiswtwny.supabase.co/functions/v1/send-discord-report',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body    := jsonb_build_object('type', 'WEEKLY_REPORT')
    );
  $$
);