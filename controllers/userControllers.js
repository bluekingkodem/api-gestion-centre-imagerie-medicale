const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const Role = require('../models/roleModel')
const HealthT = require('../models/healthTrainingModel')
const Discipline = require('../models/disciplineModel')

const { generateUserCode } = require('../utils/generateUserCode')
const { generateJWTtoken } = require('../utils/generateJWTtoken')

const register = asyncHandler(async (req, res) => {
    const { name, surname, age, contact, email, password, address, city } = req.body

    if (!name || !contact || !email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(409).json({ error: 'Cet utilisateur existe deja!' })
    }

    code = generateUserCode("admin")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const role = await Role.findOne({ name: "admin" })

    if (!role) {
        res.status(400).json({ error: "Ce role n'existe pas" })
    }

    const newUser = await User.create({
        code: code,
        name,
        surname,
        age,
        contact,
        email,
        password: hashedPassword,
        address,
        city,
        id_role: role._id
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            success: 'Utilsateur créé avec succès',
            token: generateJWTtoken(newUser._id)
        })
    }
    else {
        res.status(400).json({ error: 'Utilisateur invalide' })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs' })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ error: 'Email incorrect' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ error: 'Mot de passe incorrect' })
    }

    res.json(
        {
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // 👈 IMPORTANT
            token: generateJWTtoken(user._id),
        }
    )


})

const createUser = asyncHandler(async (req, res) => {
    const { name, surname, age, contact, email, password, address, city, discipline, health_training, role } = req.body

    if (!name || !contact || !email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    const user = await User.findOne({ email: email })

    if (user) {
        return res.status(409).json({ error: 'Cet utilisateur existe deja' })
    }

    let disc = await Discipline.findOne({ name: discipline })

    if (!disc) {
        disc = await Discipline.findOneAndUpdate(
            { name: "discipline non spécifiée" },
            { name: "discipline non spécifiée" },
            { new: true, upsert: true }
        );
    }

    let healthT = await HealthT.findOne({ name: health_training })

    if (!healthT) {
        healthT = await HealthT.findOneAndUpdate(
            { name: "formation sanitaire non spécifiée" },
            { name: "formation sanitaire non spécifiée" },
            { new: true, upsert: true }
        );
    }

    const roleUser = await Role.findOne({ name: role })

    if (!roleUser) return res.status(400).json({ error: "Rôle invalide" });

    const code = generateUserCode(roleUser.name)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        code: code,
        name,
        surname,
        age,
        contact,
        email,
        password: hashedPassword,
        address,
        city,
        id_role: roleUser._id,
        id_disc: disc._id,
        id_healthT: healthT._id
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            success: 'Utilsateur créé avec succès',
            token: generateJWTtoken(newUser._id)
        })
    }
    else {
        res.status(400).json({ error: 'Utilisateur invalide' })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { name, surname, age, contact, address, city, discipline, health_training } = req.body

    if (!name || !contact) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    let disc = await Discipline.findOne({ name: discipline })

    if (!disc) {
        disc = await Discipline.findOneAndUpdate(
            { name: "discipline non spécifiée" },
            { name: "discipline non spécifiée" },
            { new: true, upsert: true }
        );
    }

    let healthT = await HealthT.findOne({ name: health_training })

    if (!healthT) {
        healthT = await HealthT.findOneAndUpdate(
            { name: "formation sanitaire non spécifiée" },
            { name: "formation sanitaire non spécifiée" },
            { new: true, upsert: true }
        );
    }

    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(400).json({ error: "Cet utilisateur n'existe pas" })
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            name,
            surname,
            age,
            contact,
            address,
            city,
            id_disc: disc._id,
            id_healthT: healthT._id
        },
        { new: true }
    )

    res.status(200).json({
        success: 'Utilisateur modifié avec succès',
        user: updatedUser
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(400).json({ error: "Cet utilisateur n'existe pas" })
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Utilisateur supprimé",
        user: deletedUser
    })
})

module.exports = {
    register,
    login,
    createUser,
    updateUser,
    deleteUser
}