const router = require('express').Router();
const { auth } = require('../middleware/authMiddleware');
const Student = require('../models/Student');

// @route   GET /api/student/profile
// @desc    Get logged-in student's profile
// @access  Private (Student only)
router.get('/profile', auth, async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.user.email });
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/student/profile
// @desc    Update logged-in student's profile
// @access  Private (Student only)
router.put('/profile', auth, async (req, res) => {
    const { name, email, course } = req.body;
    try {
        let student = await Student.findOne({ email: req.user.email });
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

module.exports = router;