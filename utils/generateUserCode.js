exports.generateUserCode = (roleName) => {
    const prefix = roleName.substring(0, 3).toUpperCase();
    const random = Math.floor(Math.random() * 900000);

    return `${prefix}-${random}`;
}