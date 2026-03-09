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