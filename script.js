function protectResumeColumn() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const resumeColumn = 3; // Column C     give resume column nuber
  const emailColumn = 7;  // Column G     give column number with college-email id

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

  let processedCount = 0;
  const BATCH_SIZE = 20; // Process 20 at a time

  // Process in batches with delays - ONLY INDIVIDUAL CELL PROTECTIONS
  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);

    batch.forEach((email, batchIndex) => {
      if (!email || typeof email !== 'string') return;

      const cleanEmail = email.toString().trim().toLowerCase();
      if (!cleanEmail) return;

      const row = i + batchIndex + 2;
      const cell = sheet.getRange(row, resumeColumn);

      try {
        const protection = cell.protect()
          .setDescription(`Protected: ${cleanEmail}`);

        // Remove any existing editors first
        const currentEditors = protection.getEditors();
        if (currentEditors.length > 0) {
          protection.removeEditors(currentEditors);
        }

        // Add editors one by one
        protection.addEditor(cleanEmail);
        protection.addEditor(owner);
        coordinators.forEach(coordinator => protection.addEditor(coordinator));

        processedCount++;

      } catch (e) {
        Logger.log(`Error row ${row}: ${e}`);
      }
    });

    // Add delay between batches to avoid quota limits
    if (i + BATCH_SIZE < emails.length) {
      Utilities.sleep(2000); // 2 second delay between batches
    }
  }

  SpreadsheetApp.getUi().alert(`✅ Protection applied! Processed ${processedCount} cells. Students can only edit their own resume cells.`);
}

// 🔄 RESET AND APPLY CORRECT PROTECTIONS
function resetAndProtect() {
  // First remove all protections
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE)
    .concat(sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET));

  protections.forEach(prot => {
    try {
      prot.remove();
    } catch (e) {
      // Silent catch
    }
  });

  // Now apply the correct protections
  protectResumeColumn();
}