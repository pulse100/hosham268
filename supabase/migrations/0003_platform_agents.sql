-- وكلاء الاشتراك في الدورة الإلكترونية (منصة أبواب) — نفس بنية hm_sellers
create table if not exists public.hm_platform_agents (like public.hm_sellers including defaults including constraints);
alter table public.hm_platform_agents add primary key (id);

alter table public.hm_platform_agents enable row level security;
create policy "hm_platform_agents: public read active" on public.hm_platform_agents for select using (is_active or public.hm_is_admin());
create policy "hm_platform_agents: admin insert" on public.hm_platform_agents for insert with check (public.hm_is_admin());
create policy "hm_platform_agents: admin update" on public.hm_platform_agents for update using (public.hm_is_admin()) with check (public.hm_is_admin());
create policy "hm_platform_agents: admin delete" on public.hm_platform_agents for delete using (public.hm_is_admin());
