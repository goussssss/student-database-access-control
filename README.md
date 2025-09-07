
## 🚀 Quick Setup

### 1. Installation

1. **Open Script Editor**: Go to **Extensions > Apps Script** in your Google Sheet.
2. **Paste Code**: Replace all code in the script editor with the provided script.
3. **Save Project**: Press **Ctrl + S** (or **Cmd + S** on Mac) to save the project.
4. **Run Function**: Click the **▶️ Run** button in the Apps Script editor. 
5. **Authorize**: Grant the necessary permissions when prompted by the script it may ask permissions twice.

### 2. Configure Variables

In your Apps Script editor, configure the following variables according to your Google Sheets setup:

```javascript
const resumeColumn = 3;     // Column C = Resume column
const emailColumn = 7;      // Column G = Student email column  
```

### 3. Share Settings

- **Share the sheet** with students as **EDITOR** access.
- **Coordinators** should also have **EDITOR** access.

### 4. After running this script
- **Protect** the **NAME,USN,mail-id,phone-no,CGPA** columns like you protect normally

## ⚠️ Important Notes

- **Students must have EDITOR access** (not viewer) in order to be able to edit their own resume column.
- **Email in student column must match Google account exactly**: Mismatched emails may prevent the protection from being applied correctly.



## 🔒 Protection Features

- ✅ **Students edit only their own resume cell**: Students can only edit the resume in the column assigned to them.
- ✅ **Students get warnings when editing others' cells**: Any attempt to edit other students' cells will trigger a warning.
- ✅ **Coordinators can edit all cells**: Coordinators can edit all cells in the sheet without restriction.






