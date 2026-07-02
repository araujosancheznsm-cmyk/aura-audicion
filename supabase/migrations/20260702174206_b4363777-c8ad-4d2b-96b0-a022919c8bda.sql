
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- Hearing aids
CREATE TABLE public.hearing_aids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  type TEXT NOT NULL,
  technology TEXT,
  hearing_loss_level TEXT,
  short_description TEXT,
  full_description TEXT,
  bluetooth BOOLEAN NOT NULL DEFAULT false,
  rechargeable BOOLEAN NOT NULL DEFAULT false,
  color TEXT,
  warranty TEXT NOT NULL DEFAULT '1 año',
  main_image_url TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  compatible_accessories JSONB NOT NULL DEFAULT '[]'::jsonb,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.hearing_aids TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hearing_aids TO authenticated;
GRANT ALL ON public.hearing_aids TO service_role;
ALTER TABLE public.hearing_aids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads active" ON public.hearing_aids
  FOR SELECT TO anon USING (active = true);

CREATE POLICY "Auth reads all" ON public.hearing_aids
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins insert" ON public.hearing_aids
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update" ON public.hearing_aids
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete" ON public.hearing_aids
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER hearing_aids_updated
BEFORE UPDATE ON public.hearing_aids
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX hearing_aids_active_sort_idx ON public.hearing_aids (active, sort_order);
CREATE INDEX hearing_aids_brand_idx ON public.hearing_aids (brand);
