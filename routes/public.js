const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const { createUser, getUserBy } = require("../util/app-data");

router.get("/signUp", (req, res) => {
    const inputData = req.session.inputData || {};
    req.session.inputData = null;
    res.render("signUp", { inputData });
});

router.post("/signUp", async (req, res) => {
    const { name, password, email, phone, address, country } = req.body;
    const inputData = { ...req.body };

    try {
        const existingUser = await getUserBy("email", email);

        if (existingUser.length > 0) {
            inputData.errorMessage = "Email is already being used!";
            req.session.inputData = inputData;
            req.session.save(() => {
                res.redirect("/signUp");
            });
            return;
        }

        if (!name || !password || !email) {
            inputData.errorMessage = "Missing required fields";
            req.session.inputData = inputData;
            req.session.save(() => {
                res.redirect("/signUp");
            });
            return;
        }

        const salt = crypto.randomBytes(16).toString("hex");
        const hashedPwd = crypto
            .pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex");

        await createUser([name, hashedPwd, email, phone, address, country, salt]);
        req.session.inputData = null;
        res.redirect("/login");
    } catch (error) {
        console.error(error.message);
        inputData.errorMessage = error.code === "ER_DUP_ENTRY" ? "Email is already being used!" : "An error occurred";
        req.session.inputData = inputData;
        req.session.save(() => {
            res.redirect("/signUp");
        });
    }
});

router.get("/login", (req, res) => {
    const inputData = req.session.inputData || {};
    req.session.inputData = null;
    res.render("login", { inputData });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const inputData = { email, password };

    try {
        const existingUser = await getUserBy("email", email);

        if (existingUser.length === 0) {
            inputData.errorMessage = "Invalid email or password";
            req.session.inputData = inputData;
            req.session.save(() => {
                res.redirect("/login");
            });
            return;
        }

        const hashedPwd = crypto
            .pbkdf2Sync(password, existingUser[0].salt, 1000, 64, "sha512")
            .toString("hex");

        if (existingUser[0].password === hashedPwd) {
            req.session.user = {
                id: existingUser[0].user_id,
                email: existingUser[0].email,
                name: existingUser[0].name,
            };
            req.session.isAdmin/*inputData = null*/ = existingUser.isAdmin === 1;
            req.session.save(() => {
                res.redirect("/expansions");
            });
        } else {
            inputData.errorMessage = "Invalid email or password";
            req.session.inputData = inputData;
            req.session.save(() => {
                res.redirect("/login");
            });
        }
    } catch (error) {
        console.error(error);
        inputData.errorMessage = "An error occurred during login";
        req.session.inputData = inputData;
        req.session.save(() => {
            res.redirect("/login");
        });
    }
});

router.post("/logout", (req, res) => {
    req.session.user = null;
    req.session.inputData = null;
    req.session.save(() => {
        res.redirect("/");
    });
});

module.exports = router;