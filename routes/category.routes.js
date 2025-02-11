const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// 🔹 Criar categoria (POST /categories)
router.post("/", async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔹 Listar categorias (GET /categories)
router.get("/", async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
});

// 🔹 Buscar categoria por ID (GET /categories/:id)
router.get("/:id", async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    category ? res.json(category) : res.status(404).json({ message: "Categoria não encontrada" });
});

// 🔹 Atualizar categoria (PUT /categories/:id)
router.put("/:id", async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    try {
        await category.update(req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔹 Deletar categoria (DELETE /categories/:id)
router.delete("/:id", async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    await category.destroy();
    res.json({ message: "Categoria deletada com sucesso" });
});

module.exports = router;
