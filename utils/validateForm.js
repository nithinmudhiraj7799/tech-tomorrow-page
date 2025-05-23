// validateForm.js

module.exports = function validateForm(input = {}) {
    const { name, email, message } = input;

    if (!name || !email || !message) {
        return { valid: false, message: 'All fields (name, email, message) are required.' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return { valid: false, message: 'Invalid email format.' };
    }

    return { valid: true };
};
