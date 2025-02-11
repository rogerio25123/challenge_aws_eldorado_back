const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Device = require("../models/device");

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

router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // 🔹 Verifica se há dispositivos vinculados à categoria
        const devicesCount = await Device.count({ where: { categoryId: req.params.id } });
        if (devicesCount > 0) {
            return res.status(400).json({ message: "Cannot delete category. There are devices linked to it." });
        }

        // 🔹 Tenta excluir a categoria
        await category.destroy();
        return res.json({ message: "Category deleted successfully" });

    } catch (error) {
        console.error("❌ Error deleting category:", error); // Log mais detalhado
        return res.status(500).json({ error: error.message || "An error occurred while deleting the category." });
    }
});



module.exports = router;
