const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name role is required'],
            default: "admin"
        }
    },
    { timestamps: true }
)

const RoleModel = mongoose.model('Role', roleSchema);

module.exports = RoleModel