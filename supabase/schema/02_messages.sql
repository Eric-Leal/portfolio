-- Tabela de Mensagens (Messages)
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE NOT NULL,
  content VARCHAR(500) NOT NULL,
  pinned BOOLEAN DEFAULT FALSE NOT NULL,
  liked BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL ,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL 
);

-- Habilitar RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 1. Qualquer tipo de usuário pode ver as mensagens
CREATE POLICY "Allow public read access on messages" 
ON public.messages FOR SELECT 
USING (true);

-- 2. Apenas usuários autenticados podem criar mensagens (validando o dono)
-- Otimizado com (SELECT auth.uid()) para melhor performance
CREATE POLICY "Allow authenticated insert on messages" 
ON public.messages FOR INSERT 
WITH CHECK ((SELECT auth.uid()) = guest_id);

-- 3. Apenas o dono da mensagem pode editar (UPDATE)
-- Otimizado com (SELECT auth.uid()) para melhor performance
CREATE POLICY "Allow individual update on messages" 
ON public.messages FOR UPDATE 
USING ((SELECT auth.uid()) = guest_id) 
WITH CHECK ((SELECT auth.uid()) = guest_id);

-- 4. Apenas o dono da mensagem pode excluir (DELETE)
-- Otimizado com (SELECT auth.uid()) para melhor performance
CREATE POLICY "Allow individual delete on messages" 
ON public.messages FOR DELETE 
USING ((SELECT auth.uid()) = guest_id);


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