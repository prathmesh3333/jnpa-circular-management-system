const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed'));
    }
});

// 🔼 Upload Circular
router.post('/upload', upload.single('pdf'), (req, res) => {
    const { title, department, description } = req.body;
    const pdf_filename = req.file?.filename;

    if (!title || !department || !description || !pdf_filename) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Find uploaded_by user ID from users table
    const userQuery = 'SELECT id FROM users WHERE department = ? LIMIT 1';
    db.query(userQuery, [department], (err, result) => {
        if (err || result.length === 0) {
            console.error('❌ User lookup error:', err || 'No user found for department');
            return res.status(500).json({ message: 'No user found for department' });
        }

        const uploaded_by = result[0].id;

        const insertQuery = `
            INSERT INTO circulars (title, department, description, pdf_filename, uploaded_by, uploaded_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;

        db.query(insertQuery, [title, department, description, pdf_filename, uploaded_by], (err) => {
            if (err) {
                console.error('❌ Insert error:', err);
                return res.status(500).json({ message: 'Database insert error' });
            }
            console.log('✅ Circular inserted:', title);
            res.status(200).json({ message: 'Uploaded successfully' });
        });
    });
});

// 🔽 Get Circulars
router.get('/getCirculars', (req, res) => {
    const { department } = req.query;
    let query = 'SELECT * FROM circulars';
    const params = [];

    if (department && department !== 'Admin') {
        query += ' WHERE department = ?';
        params.push(department);
    }

    query += ' ORDER BY uploaded_at DESC, id DESC';

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('❌ Fetch error:', err);
            return res.status(500).json({ message: 'Database fetch error' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const circulars = results.map(item => ({
            id: item.id,
            title: item.title,
            department: item.department,
            description: item.description,
            pdfUrl: baseUrl + item.pdf_filename,
            uploaded_by: item.uploaded_by,
            uploaded_at: item.uploaded_at
        }));

        res.json(circulars);
    });
});

// 🗑️ Delete Circular
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const getQuery = 'SELECT pdf_filename FROM circulars WHERE id = ?';

    db.query(getQuery, [id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Circular not found' });
        }

        const filePath = path.join(__dirname, '../uploads', result[0].pdf_filename);

        fs.unlink(filePath, (fsErr) => {
            if (fsErr) {
                console.warn('⚠️ File deletion warning:', fsErr.message);
            }

            const deleteQuery = 'DELETE FROM circulars WHERE id = ?';
            db.query(deleteQuery, [id], (delErr) => {
                if (delErr) {
                    return res.status(500).json({ message: 'Database delete error' });
                }
                console.log(`🗑️ Deleted circular ID ${id}`);
                res.status(200).json({ message: 'Circular deleted successfully' });
            });
        });
    });
});

module.exports = router;
