create or replace function public.verify_admin_login(
  p_user_id text,
  p_password text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_record jsonb;
begin
  select to_jsonb(admin_row) - 'password'
  into admin_record
  from public.admin as admin_row
  where (
    to_jsonb(admin_row)->>'userId' = p_user_id
    or to_jsonb(admin_row)->>'userid' = p_user_id
  )
  and to_jsonb(admin_row)->>'password' = p_password
  limit 1;

  return admin_record;
end;
$$;

revoke all on function public.verify_admin_login(text, text) from public;
grant execute on function public.verify_admin_login(text, text) to anon, authenticated;