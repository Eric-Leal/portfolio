-- ─── Migration: create_contributions ─────────────────────────────────────────
-- Criado em: 2026-03-01
-- Descrição: Tabela de contribuições diárias para o heatmap do portfólio.

CREATE TABLE IF NOT EXISTS public.contributions (
  id        UUID    DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  user_id   UUID    NOT NULL,
  date      DATE    NOT NULL,
  count     INT     NOT NULL DEFAULT 0,

  CONSTRAINT contributions_count_positive CHECK (count >= 0)
);

-- Índice principal: user_id + date (queries mais comuns)
CREATE INDEX IF NOT EXISTS contributions_user_date_idx
  ON public.contributions (user_id, date DESC);

-- Índice secundário: somente date (para relatórios globais)
CREATE INDEX IF NOT EXISTS contributions_date_idx
  ON public.contributions (date DESC);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Leitura pública (heatmap visível para todos os visitantes)
CREATE POLICY "contributions_public_read"
  ON public.contributions FOR SELECT
  USING (true);

-- Apenas o dono pode gravar seus próprios dados
CREATE POLICY "contributions_owner_insert"
  ON public.contributions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contributions_owner_update"
  ON public.contributions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contributions_owner_delete"
  ON public.contributions FOR DELETE
  USING (auth.uid() = user_id);
