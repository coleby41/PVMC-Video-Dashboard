
const SHEET_NAME = 'Software Updates';
const SPREADSHEET_ID = '13z8eAD1Iay7FJLI4i3mBQNG2J3lILXDYHaqCxHc-Mbs'; 

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getAll') {
      return getAllUpdates();
    }
    
    // Default: return all updates
    return getAllUpdates();
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    
      sheet.appendRow([
        'Software Name',
        'Version',
        'Update Date',
        'Updated By',
        'Category',
        'Notes',
        'Issues Resolved',
        'Timestamp'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0D47A1');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Append the new row
    sheet.appendRow([
      data.softwareName,
      data.version,
      data.updateDate,
      data.updatedBy,
      data.category,
      data.notes,
      data.issues || '',
      data.timestamp
    ]);
    
    sheet.autoResizeColumns(1, 8);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Update recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getAllUpdates() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'success',
        'data': []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const updates = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      updates.push({
        softwareName: row[0],
        version: row[1],
        updateDate: row[2],
        updatedBy: row[3],
        category: row[4],
        notes: row[5],
        issues: row[6],
        timestamp: row[7]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'data': updates
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Search function for future enhancements
function searchUpdates(searchTerm) {
  const allUpdates = getAllUpdates();
  const data = JSON.parse(allUpdates.getContent()).data;
  
  const filtered = data.filter(update => 
    update.softwareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.updatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'data': filtered
  })).setMimeType(ContentService.MimeType.JSON);
}