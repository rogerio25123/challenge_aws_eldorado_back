const express = require("express");
const router = express.Router();
const Device = require("../models/device");
const Category = require("../models/category");

// 🔹 Criar dispositivo (POST /devices)
router.post("/", async (req, res) => {
    try {
        const device = await Device.create(req.body);
        res.status(201).json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔹 Listar dispositivos (GET /devices)
router.get("/", async (req, res) => {
    const devices = await Device.findAll({ include: { model: Category, as: "category" } });
    res.json(devices);
});

// 🔹 Buscar dispositivo por ID (GET /devices/:id)
router.get("/:id", async (req, res) => {
    const device = await Device.findByPk(req.params.id, { include: { model: Category, as: "category" } });
    device ? res.json(device) : res.status(404).json({ message: "Dispositivo não encontrado" });
});

// 🔹 Atualizar dispositivo (PUT /devices/:id)
router.put("/:id", async (req, res) => {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ message: "Dispositivo não encontrado" });

    try {
        await device.update(req.body);
        res.json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔹 Deletar dispositivo (DELETE /devices/:id)
router.delete("/:id", async (req, res) => {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ message: "Dispositivo não encontrado" });

    await device.destroy();
    res.json({ message: "Dispositivo deletado com sucesso" });
});

module.exports = router;
