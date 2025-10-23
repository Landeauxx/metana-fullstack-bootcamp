
-- Connect to the company_records DB before running this file
-- \c company_records

CREATE TABLE IF NOT EXISTS Departments (
  Dept_ID SERIAL PRIMARY KEY,
  Dept_Name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Employees (
  Emp_ID SERIAL PRIMARY KEY,
  First_Name VARCHAR(50) NOT NULL,
  Last_Name VARCHAR(50) NOT NULL,
  Dept_ID INT REFERENCES Departments(Dept_ID) ON DELETE SET NULL,
  Job_Title VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Salaries (
  Salary_ID SERIAL PRIMARY KEY,
  Emp_ID INT NOT NULL REFERENCES Employees(Emp_ID) ON DELETE CASCADE,
  Amount NUMERIC(10,2) NOT NULL CHECK (Amount >= 0)
);
