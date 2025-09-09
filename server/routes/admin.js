const router = require('express').Router();
const { auth, adminAuth } = require('../middleware/authMiddleware');
const Student = require('../models/Student');

// @route   GET /api/admin/students
// @desc    Get all students
// @access  Private (Admin only)
router.get('/students', auth, adminAuth, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/admin/students
// @desc    Add a new student
// @access  Private (Admin only)
router.post('/students', auth, adminAuth, async (req, res) => {
    const { name, email, course } = req.body;
    try {
        const newStudent = new Student({
            name,
            email,
            course
        });
        const student = await newStudent.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/admin/students/:id
// @desc    Update a student record
// @access  Private (Admin only)
router.put('/students/:id', auth, adminAuth, async (req, res) => {
    const { name, email, course } = req.body;
    try {
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        student.name = name || student.name;
        student.email = email || student.email;
        student.course = course || student.course;

        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/admin/students/:id
// @desc    Delete a student record
// @access  Private (Admin only)
// @route   DELETE /api/admin/students/:id
// @desc    Delete a student record
// @access  Private (Admin only)
router.delete('/students/:id', auth, adminAuth, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;