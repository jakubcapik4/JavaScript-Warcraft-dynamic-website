const express = require("express");
const router = express.Router();
const { getSubscriptionData, saveSubscriptionData } = require("../util/app-data");

router.get("/", async (req, res) => {
    try {
        const subscriptions = await getSubscriptionData();
        res.render("index", { 
            numberOfSubscriptions: subscriptions.length, 
            user: req.session.user || null,
            error: null // Definuj error ako null, ak nie je žiadna chybová správa
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
});

router.post("/", async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        await saveSubscriptionData({ name, email, phone });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.render("index", { 
            error: "Failed to save subscription. Please try again.",
            numberOfSubscriptions: (await getSubscriptionData()).length,
            user: req.session.user || null
        });
    }
});

router.get("/expansions", (req, res) => {
    res.render("expansions");
});

router.get("/lore", (req, res) => {
    res.render("lore");
});

module.exports = router;