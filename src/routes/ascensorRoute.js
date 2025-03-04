const express = require('express');
const handlerValidator = require('../middlewares/handlerValidator');
const { ascensorSchema } = require('../validators/ascensorSchema');
const { getState, postState } = require('../controllers/ascensorController');

const router = express.Router();

/**
 * @swagger
 * /api/ascensor:
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
 * /api/ascensor:
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
 *               value:
 *                 type: string
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
 *                 value:
 *                   type: string
 */
router.post('/', handlerValidator(ascensorSchema), postState);

module.exports = router;