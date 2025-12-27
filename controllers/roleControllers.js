const asyncHandler = require('express-async-handler');
const Role = require('../models/roleModel')

// Creer un role
const createRole = asyncHandler(async (req, res) => {
    const {name} = req.body

    if(!name)
    {
        return res.status(400).json({error: 'Veuillez remplir ce champ'})
    }

    const roleExist = await Role.findOne({name: name})

    if(roleExist)
    {
        res.status(409)
        throw new Error('Ce role existe deja!')
    }

    const nameRole = await Role.create({name: name})
    
    if(nameRole)
    {
        return res.status(201).json(
            {
                success: 'Role créé avec succès!'
            }
        )
    }
})

// Modifier un role
const updateRole = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    const role = await Role.findById(req.params.id)

    if (!Role) {
        res.status(400)
        throw new Error("Ce role n'existe pas")
    }

    const updatedRole = await Role.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        { new: true }
    )

    res.status(200).json({
        success: 'Role modifié avec succès',
        role: updatedRole
    })
})

// Supprimer un role
const deleteRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id)

    if (!role) {
        res.status(400)
        throw new Error("Ce role n'existe pas")
    }

    const deletedRole = await Role.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Role supprimé",
        role: deletedRole
    })
})

// Afficher un seul role
const getRole = asyncHandler(async (req, res) => {
    const role = Role.findById(req.params.id)

    if(!role)
    {
        res.status(404)
        throw new Error("Role indisponible")
    }

    res.status(200).json({
        role
    })
})

// Afficher tous les roles
const getAllRole = asyncHandler(async (req, res) => {
    const role = Role.find()

    if(role.length === 0)
    {
        res.status(404)
        throw new Error("Aucun Role")
    }

    res.status(200).json({
        role
    })
})

module.exports = {
    createRole,
    updateRole,
    deleteRole, 
    getRole,
    getAllRole
}