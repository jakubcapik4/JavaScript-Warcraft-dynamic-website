const express = require('express');
const router = express.Router();
const dataHandler = require('../util/app-data');

router.get("/", async (req, res) => {
    try {
        const subscriptionData = await dataHandler.getSubscriptionData();
        // Filter podľa mena
        subscriptionData.sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
        });
        res.render("index", { 
            numberOfSubscriptions: subscriptionData.length,
            subscriptions: subscriptionData,
            error: req.query.error || null // Ak je chyba v query, zobrazí sa
        });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Server Error');
    }
});

router.post("/", async (req, res) => {
    try {
        await dataHandler.saveSubscriptionData(req.body);
        res.redirect("/confirm");
    } catch (error) {
        console.error('Error saving subscription:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            // Presmerovanie späť na formulár s chybovou správou
            res.redirect("/?error=Email%20už%20existuje");
        } else {
            res.status(500).send('Error saving subscription');
        }
    }
});

router.get("/confirm", (req, res) => {
    res.render("confirm");
});

module.exports = router;