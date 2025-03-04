const express = require('express');
const handlerValidator = require('../middlewares/handlerValidator');
const { floorSchema } = require('../validators/floorSchema');
const { getState, postState } = require('../controllers/floorController');

const router = express.Router();

/**
 * @swagger
 * /api/floor:
 *   get:
 *     summary: Obtener datos de ejemplo
 *     description: Retorna los datos almacenados en la caché.
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 value:
 *                   type: string
 */
router.get('/', getState);

/**
 * @swagger
 * /api/floor:
 *   post:
 *     summary: Almacenar datos de ejemplo
 *     description: Almacena un valor en la caché.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               floor:
 *                 type: number
 *                 description: Valor a almacenar en la caché.
 *     responses:
 *       200:
 *         description: Datos almacenados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 floor:
 *                   type: number
 */
router.post('/', handlerValidator(floorSchema), postState);

module.exports = router;