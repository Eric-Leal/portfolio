-- Habilita a extensão pg_cron no esquema extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;


-- Agenda uma tarefa chamada 'keep-supabase-alive'
-- O cron '0 0 */3 * *' significa: Meia-noite, a cada 3 dias.
SELECT cron.schedule(
  'keep-supabase-alive',
  '0 0 */3 * *',
  'SELECT count(*) FROM public.guests'
);