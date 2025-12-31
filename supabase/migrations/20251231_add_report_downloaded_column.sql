-- Add report_downloaded column to interviews table for Free plan restriction
alter table interviews add column if not exists report_downloaded boolean default false;
