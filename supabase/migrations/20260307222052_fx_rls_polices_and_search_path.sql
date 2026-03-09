-- 1. CORREÇÃO DE SEGURANÇA NA FUNÇÃO DE TRIGGER
-- Adicionando explicitamente o search_path para evitar o aviso de 'role mutable search_path'
CREATE OR REPLACE FUNCTION public.handle_new_guest()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.guests (id, name, profile_image)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer SET search_path = public;

-- 2. OTIMIZAÇÃO DE PERFORMANCE NAS POLICIES DE MESSAGES
-- Substituindo auth.uid() por (SELECT auth.uid()) para evitar re-avaliação por linha

-- Atualizando a política de INSERT
DROP POLICY IF EXISTS "Allow authenticated insert on messages" ON public.messages;
CREATE POLICY "Allow authenticated insert on messages" 
ON public.messages FOR INSERT 
WITH CHECK ((SELECT auth.uid()) = guest_id);

-- Atualizando a política de UPDATE
DROP POLICY IF EXISTS "Allow individual update on messages" ON public.messages;
CREATE POLICY "Allow individual update on messages" 
ON public.messages FOR UPDATE 
USING ((SELECT auth.uid()) = guest_id) 
WITH CHECK ((SELECT auth.uid()) = guest_id);

-- Atualizando a política de DELETE
DROP POLICY IF EXISTS "Allow individual delete on messages" ON public.messages;
CREATE POLICY "Allow individual delete on messages" 
ON public.messages FOR DELETE 
USING ((SELECT auth.uid()) = guest_id);