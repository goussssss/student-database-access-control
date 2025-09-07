🔐 Google Sheets Resume Protection System
🚀 Quick Setup
1. Configure Variables
javascript
const resumeColumn = 3;     // Column C = Resume column
const emailColumn = 7;      // Column G = Student email column  
const coordinators = ['email1@rvei.edu.in', 'email2@rvei.edu.in']; // Coordinator emails
2. Installation
Open Script Editor: Extensions > Apps Script

Paste Code: Replace all code with the provided script

Save Project: Ctrl + S

Run Function: Click ▶️ Run button

Authorize: Grant required permissions

3. Share Settings
Share sheet with students as EDITOR access

Coordinators should also have editor access

⚡ Usage
Run protectResumeColumn() to apply protections

Run resetAndProtect() to reset all protections

Re-run after adding new students

🔒 Protection Features
✅ Students edit only their own resume cell

✅ Students get warnings when editing others' cells

✅ Coordinators can edit all cells

✅ Other student data (USN, Name, CGPA) remains protected

✅ Automatic batch processing for large datasets

⚠️ Important Notes
Students must have EDITOR access (not viewer)

Email in student column must match Google account exactly

Re-run script when adding new students
