const mongoose = require('mongoose')

const healthTrainingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            // sparse: true, //permet d'avoir plusieurs null
            // default: 'formation sanitaire non spécifiée'
        }
    },
    { timestamps: true }
)

const healthTrainingModel = mongoose.model('Health_training', healthTrainingSchema);

module.exports = healthTrainingModel