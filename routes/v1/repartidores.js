import { Router } from 'express';
import RepartidorController from '../../controller/v1/repartidor.js';

const router = Router();

router
.get('/', RepartidorController.obtenerRepartidores)
.get('/cedula/:cedula', RepartidorController.obtenerRepartidorPorCedula)
.get('/correo/:correo', RepartidorController.obtenerRepartidorPorCorreo)
.get('/:id', RepartidorController.obtenerRepartidor)
.post('/', RepartidorController.crearRepartidor)
.put('/:id', RepartidorController.actualizarRepartidor)
.delete('/:id', RepartidorController.eliminarRepartidor)

export default router;