const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;


// =====================================================
// FILE STATICI
// =====================================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// =====================================================
// PAGINA CHI SONO
// =====================================================

app.get("/chi-sono.html", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "chi-sono.html")
    );

});


// =====================================================
// PAGINA COMPETENZE
// =====================================================

app.get("/competenze.html", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "competenze.html")
    );

});


// =====================================================
// PAGINA CERTIFICAZIONI
// =====================================================

app.get("/certificazioni.html", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "certificazioni.html")
    );

});


// =====================================================
// PAGINA PROGETTI
// =====================================================

app.get("/progetti.html", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "progetti.html")
    );

});


// =====================================================
// AVVIO SERVER
// =====================================================

app.listen(PORT, () => {

    console.log(
        `Server avviato su http://localhost:${PORT}`
    );

});