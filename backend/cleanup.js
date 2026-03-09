const fs = require('fs');
const path = require('path');
const db = require('./db'); // adjust if your DB file is elsewhere

const uploadsFolder = path.join(__dirname, 'uploads');

function cleanupOrphanedCirculars() {
    const selectQuery = 'SELECT id, file_url FROM circulars';

    db.query(selectQuery, async (err, results) => {
        if (err) {
            console.error('❌ Error fetching from DB:', err);
            return;
        }

        let deletedCount = 0;

        for (const row of results) {
            const filePath = path.join(uploadsFolder, row.file_url);
            if (!fs.existsSync(filePath)) {
                // file doesn't exist, remove from database
                db.query('DELETE FROM circulars WHERE id = ?', [row.id], (delErr) => {
                    if (delErr) {
                        console.error(`❌ Error deleting ID ${row.id}:`, delErr);
                    } else {
                        console.log(`🗑️ Removed DB entry for missing file (ID: ${row.id})`);
                        deletedCount++;
                    }
                });
            }
        }

        setTimeout(() => {
            console.log(`✅ Cleanup complete. Removed ${deletedCount} record(s).`);
            process.exit(0);
        }, 500); // give time for all async deletes to finish
    });
}

cleanupOrphanedCirculars();
