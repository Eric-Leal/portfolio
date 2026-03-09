-- 1. Tabela de Visitantes (Guests)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  name TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL, 
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- 2. POLICIES
-- Qualquer usuário pode ver perfis para mostrar no Guestbook
CREATE POLICY "Allow public read access on guests" 
ON public.guests FOR SELECT 
USING (true);

-- 3. FUNÇÃO DO TRIGGER
-- Esta função extrai os dados do metadados do Google/GitHub
-- Adicionado SET search_path para evitar avisos de 'mutable search_path'
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

-- 4. O TRIGGER
-- Executa a função sempre que um novo usuário é criado no Auth
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_guest();