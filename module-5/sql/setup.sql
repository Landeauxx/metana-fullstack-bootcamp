
-- Run this while connected to the default 'postgres' database
-- Creates database, user, and grants access

-- Create the database
CREATE DATABASE company_records;

-- Create the user (CHANGE THE PASSWORD!)
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'db_user') THEN
      CREATE USER db_user WITH PASSWORD 'change_me_please';
   END IF;
END
$$;

-- Grant privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE company_records TO db_user;
