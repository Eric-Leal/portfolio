-- 1. Remove o cron job antigo se existir
SELECT cron.unschedule('weekly-system-report');

-- 2. Agenda o novo cron para rodar a cada 6 dias às 09:00 AM
-- O formato '0 9 */6 * *' significa: Minuto 0, Hora 9, A cada 6 dias, Todos os meses, Qualquer dia da semana
SELECT cron.schedule(
  'weekly-system-report',
  '0 9 */6 * *',
  $$
  SELECT
    net.http_post(
      url     := 'https://kiyhlrcnfutcsiswtwny.supabase.co/functions/v1/send-discord-report',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body    := jsonb_build_object('type', 'WEEKLY_REPORT')
    );
  $$
);