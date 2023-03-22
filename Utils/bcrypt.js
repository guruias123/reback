import  bcrypt from "bcryptjs";

export const bcryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, bcryptedPassword) => {
    return await bcrypt.compare(password, bcryptedPassword);
}