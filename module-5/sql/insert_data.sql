
-- Seed Departments
INSERT INTO Departments (Dept_Name)
VALUES ('Human Resources'), ('Engineering'), ('Finance')
ON CONFLICT (Dept_Name) DO NOTHING;

-- Seed Employees
INSERT INTO Employees (First_Name, Last_Name, Dept_ID, Job_Title) VALUES
('John',  'Doe',    (SELECT Dept_ID FROM Departments WHERE Dept_Name='Human Resources'), 'HR Manager'),
('Jane',  'Smith',  (SELECT Dept_ID FROM Departments WHERE Dept_Name='Engineering'),     'Software Engineer'),
('Carlos','Garcia', (SELECT Dept_ID FROM Departments WHERE Dept_Name='Engineering'),     'DevOps Engineer'),
('Linda', 'Brown',  (SELECT Dept_ID FROM Departments WHERE Dept_Name='Finance'),         'Accountant'),
('James', 'Wilson', (SELECT Dept_ID FROM Departments WHERE Dept_Name='Human Resources'), 'Recruiter')
ON CONFLICT DO NOTHING;

-- Seed Salaries (assumes Emp_IDs assigned sequentially)
-- More robust: reference by name -> Emp_ID
INSERT INTO Salaries (Emp_ID, Amount)
SELECT Emp_ID, amt
FROM (
  VALUES
    ((SELECT Emp_ID FROM Employees WHERE First_Name='John'  AND Last_Name='Doe'),     70000.00),
    ((SELECT Emp_ID FROM Employees WHERE First_Name='Jane'  AND Last_Name='Smith'),   95000.00),
    ((SELECT Emp_ID FROM Employees WHERE First_Name='Carlos'AND Last_Name='Garcia'),  88000.00),
    ((SELECT Emp_ID FROM Employees WHERE First_Name='Linda' AND Last_Name='Brown'),   65000.00),
    ((SELECT Emp_ID FROM Employees WHERE First_Name='James' AND Last_Name='Wilson'),  60000.00)
) AS s(Emp_ID, amt)
WHERE s.Emp_ID IS NOT NULL
ON CONFLICT DO NOTHING;
