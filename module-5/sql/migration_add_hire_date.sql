
-- Add Hire_Date column if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'employees'
      AND column_name = 'hire_date'
  ) THEN
    ALTER TABLE Employees ADD COLUMN Hire_Date DATE;
  END IF;
END $$;

-- Example: backfill with sample dates (optional)
UPDATE Employees
SET Hire_Date = COALESCE(Hire_Date, DATE '2022-01-01' + (random() * 365)::int);
