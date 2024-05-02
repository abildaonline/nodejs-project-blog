const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User;
try {
    User = mongoose.model('user');
} catch (error) {
    const UserSchema = new Schema({
        email: String,
        full_name: String,
        password: String,
        isAdmin: Boolean,
        toWatch: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
        watched: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
    });
    User = mongoose.model('user', UserSchema);
}

module.exports = User;
