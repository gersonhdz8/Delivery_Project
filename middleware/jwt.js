import { SignJWT, jwtVerify } from "jose"
import dotenv from 'dotenv';
import connect from "../db/connectDB.js";
import { ObjectId } from "mongodb";
const db = (await connect()).db()

dotenv.config();

const crearToken = async (id, rol) => {
    const encoder = new TextEncoder();
    const jwtConstructor = await new SignJWT({ id, rol})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_SECRET));
    return jwtConstructor;
}

const validarToken = async (token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const { id, rol } = jwtData.payload;
        const con = db.collection(rol);
        const getUser = await con.findOne({ _id: new ObjectId(id) });
        if (!getUser) return false;
        getUser.rol = rol;
        return getUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    crearToken,
    validarToken
}