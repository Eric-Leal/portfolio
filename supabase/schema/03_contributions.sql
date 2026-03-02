-- ─── Tabela: contributions ────────────────────────────────────────────────────
-- Armazena o total de atividades (commits, PRs, reviews, etc.) por dia e usuário.

CREATE TABLE IF NOT EXISTS public.contributions (
  id        UUID    DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  user_id   UUID    NOT NULL,
  date      DATE    NOT NULL,
  count     INT     NOT NULL DEFAULT 0,

  CONSTRAINT contributions_count_positive CHECK (count >= 0)
);

-- ─── Índices ─────────────────────────────────────────────────────────────────
-- Otimiza buscas por range de datas dentro de um usuário
CREATE INDEX IF NOT EXISTS contributions_user_date_idx
  ON public.contributions (user_id, date DESC);

-- Otimiza buscas globais por data (relatórios, admin)
CREATE INDEX IF NOT EXISTS contributions_date_idx
  ON public.contributions (date DESC);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Leitura pública: qualquer visitante pode ver o heatmap do portfólio
CREATE POLICY "contributions_public_read"
  ON public.contributions
  FOR SELECT
  USING (true);

-- Escrita: apenas o próprio usuário pode inserir/alterar seus dados
CREATE POLICY "contributions_owner_insert"
  ON public.contributions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contributions_owner_update"
  ON public.contributions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contributions_owner_delete"
  ON public.contributions
  FOR DELETE
  USING (auth.uid() = user_id);
