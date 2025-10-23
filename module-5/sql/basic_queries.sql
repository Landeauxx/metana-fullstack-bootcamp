
-- 1) All employees
SELECT * FROM Employees;

-- 2) Employees by department (example: Engineering)
SELECT e.*
FROM Employees e
JOIN Departments d ON e.Dept_ID = d.Dept_ID
WHERE d.Dept_Name = 'Engineering';

-- 3) Employees with salary greater than 80000
SELECT e.Emp_ID, e.First_Name, e.Last_Name, s.Amount
FROM Employees e
JOIN Salaries s ON e.Emp_ID = s.Emp_ID
WHERE s.Amount > 80000;

-- 4) Delete an employee by Emp_ID (example: delete Emp_ID = 5)
-- CAUTION: This permanently removes the row and cascades salary via FK
-- DELETE FROM Employees WHERE Emp_ID = 5;
