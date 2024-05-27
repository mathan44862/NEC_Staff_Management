const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    id: { type: String, unique: true, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    role: { type: String, required: true, enum: ['admin', 'user', 'principal'] },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('staff', userSchema);

module.exports = UserModel;
