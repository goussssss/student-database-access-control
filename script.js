function protectResumeColumn() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const resumeColumn = 3; // Column C   
  const emailColumn = 7;  // Column G     column with students college email

  // Clear ALL existing protections
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE)
    .concat(sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET));

  protections.forEach(prot => {
    try {
      prot.remove();
    } catch (e) {
      // Silent catch
    }
  });

  // Get all data in one batch
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const emailRange = sheet.getRange(2, emailColumn, lastRow - 1, 1);
  const emails = emailRange.getValues().flat();

  const coordinators = ['rvit22bec036.rvitm@rvei.edu.in'];
  const owner = Session.getEffectiveUser().getEmail();

  const unprotectedRanges = [];

  // Protect each resume cell
  emails.forEach((email, index) => {
    if (!email || typeof email !== 'string') return;

    const cleanEmail = email.toString().trim().toLowerCase();
    if (!cleanEmail) return;

    const row = index + 2;
    const cell = sheet.getRange(row, resumeColumn);

    try {
      const protection = cell.protect()
        .setDescription(`Protected: ${cleanEmail}`);

      // Remove any existing editors first
      const currentEditors = protection.getEditors();
      if (currentEditors.length > 0) {
        protection.removeEditors(currentEditors);
      }

      // Add editors one by one (CORRECT METHOD)
      protection.addEditor(cleanEmail);
      protection.addEditor(owner);
      coordinators.forEach(coordinator => protection.addEditor(coordinator));

      unprotectedRanges.push(cell);

    } catch (e) {
      Logger.log(`Error row ${row}: ${e}`);
    }
  });

  // Protect entire sheet but exclude resume column
  if (unprotectedRanges.length > 0) {
    const sheetProtection = sheet.protect()
      .setDescription('Main Sheet Protection')
      .setUnprotectedRanges(unprotectedRanges)
      .setWarningOnly(false);

    // Set editors for sheet protection
    const currentEditors = sheetProtection.getEditors();
    if (currentEditors.length > 0) {
      sheetProtection.removeEditors(currentEditors);
    }

    sheetProtection.addEditor(owner);
    coordinators.forEach(coordinator => sheetProtection.addEditor(coordinator));
  }

  SpreadsheetApp.getUi().alert('✅ Protection applied! Students can only edit their own resume cells.');
}