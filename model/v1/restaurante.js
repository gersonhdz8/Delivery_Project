import connect from "../../db/connectDB.js";
import insertWithTransaction from "../../helper/transaction.js";

const collection= "restaurantes"
const db = (await connect()).db().collection(collection);

export default class RestauranteModel {
    static async obtenerRestaurantes() {
        try {
            return await db.find().toArray();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async obtenerRestaurante(id) {
        try {
            const getRestaurantes= await db.findOne({ id: id });
            if(!getRestaurantes)
            {   
                console.log("Restaurante no encontrado")
                return {status:400, message: "Restaurante no encontrado"}
            }
            return getRestaurantes
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async crearRestaurante(restaurante) {
        try {
            restaurante.id = await getNextSequenceValue("restaurantes");
            return await db.insertOne(restaurante);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async actualizarRestaurante(id, restaurante) {
        try {
            const updateRestaurante= await db.updateOne(
                { id: id },
                { $set: restaurante }
            );
            if(updateRestaurante.acknowledged && updateRestaurante.matchedCount>0)
            {
                console.log("Datos actualizados correctamente");
                return {status:400, message:"Datos actualizados correctamente" }
            }
            return updateRestaurante
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async eliminarRestaurante(id) {
        try {
            const removeRestaurante= await db.deleteOne({ id: id });
            if(removeRestaurante.acknowledged && removeRestaurante.deletedCount>0)
            {
                console.log("Cliente eliminado correctamente");
                return  {status:400, message: "Cliente eliminado Correctamente"} 
            }
            return removeRestaurante
        } catch (error) {
            return Promise.reject(error);
        }
    }

}