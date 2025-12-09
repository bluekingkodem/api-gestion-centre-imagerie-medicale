const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            sparse: true, //permet d'avoir plusieurs null
            default: null
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'suspended'],
            default: 'active'
        },
        id_role: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Role'
        },
        id_disc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discipline'
        },
        id_health_t: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Health_training'
        }
    },
    { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel