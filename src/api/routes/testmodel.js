import { Router } from "express";

import TestModelService from "../../services/testmodel.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/testmodel.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: TestModel
 *   description: API for managing TestModel objects
 *
 * /test-model:
 *   get:
 *     tags: [TestModel]
 *     summary: Get all the TestModel objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of TestModel objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestModel'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await TestModelService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /test-model:
 *   post:
 *     tags: [TestModel]
 *     summary: Create a new TestModel
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestModel'
 *     responses:
 *       201:
 *         description: The created TestModel object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestModel'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await TestModelService.create(req.validatedBody);
    res.status(201).json(obj);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /test-model/{id}:
 *   get:
 *     tags: [TestModel]
 *     summary: Get a TestModel by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TestModel object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestModel'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await TestModelService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /test-model/{id}:
 *   put:
 *     tags: [TestModel]
 *     summary: Update TestModel with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestModel'
 *     responses:
 *       200:
 *         description: The updated TestModel object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestModel'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await TestModelService.update(
        req.params.id,
        req.validatedBody
      );
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      if (error.isClientError()) {
        res.status(400).json({ error });
      } else {
        next(error);
      }
    }
  }
);

/** @swagger
 *
 * /test-model/{id}:
 *   delete:
 *     tags: [TestModel]
 *     summary: Delete TestModel with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete("/:id", requireValidId, async (req, res, next) => {
  try {
    const success = await TestModelService.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

export default router;
