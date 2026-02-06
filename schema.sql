-- TABLA DE PERSISTENCIA PARA D9 MARKETING
-- Ejecuta este script en el SQL Editor de Supabase (https://supabase.com/dashboard/project/cxoelkljufyhnlwfhfgb/sql/new)

-- 1. Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS public.ninja_storage (
    id BIGINT PRIMARY KEY,
    app_state JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.ninja_storage ENABLE ROW LEVEL SECURITY;

-- 3. Crear política de acceso total para pruebas (MVP)
-- NOTA: En producción se recomienda filtrar por auth.uid()
DROP POLICY IF EXISTS "Permitir todo" ON public.ninja_storage;
CREATE POLICY "Permitir todo" ON public.ninja_storage FOR ALL USING (true) WITH CHECK (true);

-- 4. Insertar fila inicial si el usuario aún no existe (id 1 por defecto)
INSERT INTO public.ninja_storage (id, app_state)
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;
