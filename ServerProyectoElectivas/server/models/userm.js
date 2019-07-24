const moongose = require('mongoose');
const Schema = moongose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String
});

const User = moongose.model('user',userSchema);

module.exports = User;