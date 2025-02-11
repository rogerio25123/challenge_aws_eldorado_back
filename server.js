const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", require("./routes/category.routes"));
app.use("/devices", require("./routes/device.routes"));

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado.");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch(err => console.error("Erro ao sincronizar banco:", err));
