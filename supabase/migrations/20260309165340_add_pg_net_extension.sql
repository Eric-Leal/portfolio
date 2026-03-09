-- 1. Garante que a extensão pg_net esteja habilitada (permite HTTP assíncrono em triggers)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

