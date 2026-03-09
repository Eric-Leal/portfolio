-- 2. Função PL/pgSQL que dispara a Edge Function via pg_net (funciona local e em produção)
CREATE OR REPLACE FUNCTION public.notify_discord_on_message_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url     := 'https://kiyhlrcnfutcsiswtwny.supabase.co/functions/v1/send-discord-report',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body    := jsonb_build_object('type', TG_OP, 'record', jsonb_build_object('id', NEW.id))
  );
  RETURN NEW;
END;
$$;

-- 3. Remove o trigger antigo se existir e recria com a nova função
DROP TRIGGER IF EXISTS on_message_activity_report ON public.messages;

CREATE TRIGGER on_message_activity_report
  AFTER INSERT OR UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_discord_on_message_activity();

