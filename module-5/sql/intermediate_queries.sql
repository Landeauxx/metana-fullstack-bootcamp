
-- 1) Employee details with department info
SELECT e.Emp_ID, e.First_Name, e.Last_Name, e.Job_Title, d.Dept_Name
FROM Employees e
LEFT JOIN Departments d ON e.Dept_ID = d.Dept_ID
ORDER BY e.Emp_ID;

-- 2) Total salary expenditure per department
SELECT d.Dept_Name, SUM(s.Amount) AS Total_Salary
FROM Departments d
JOIN Employees e ON d.Dept_ID = e.Dept_ID
JOIN Salaries s ON e.Emp_ID = s.Emp_ID
GROUP BY d.Dept_Name
ORDER BY d.Dept_Name;

-- 3) Average salary across the company
SELECT ROUND(AVG(s.Amount), 2) AS Average_Salary
FROM Salaries s;
