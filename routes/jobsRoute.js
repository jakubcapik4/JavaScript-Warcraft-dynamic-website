const express = require("express");
const router = express.Router();
const db = require("../data/database");
const appData = require("../util/app-data");
 
// Trasa pre zoznam prác
router.get("/visitUs", async (req, res) => {
    try {
        console.log("Fetching jobs from database...");
        const [jobs] = await db.query("SELECT * FROM jobs");
        console.log("Jobs fetched:", jobs);
        res.render("visitUs", { jobs, inputData: req.session.inputData || {} });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).render("500");
    }
});
 
// Trasa pre detaily práce
router.get("/visitUs/:id", async (req, res) => {
    const jobId = req.params.id;
    try {
        const [rows] = await db.query("SELECT * FROM career_portal.jobs WHERE id = ?", [jobId]);
        if (rows.length === 0) return res.status(404).render("404");
        res.render("visitUs-details", { job: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).render("500");
    }
});
 
router.get("/visitUs", (req, res) => {
    res.render("visitUs");
});

//Upraveny kod
router.get("/visitUs/:id/reviews", async (req, res) => {
    try {
      const records = await appData.getJobsData(/*req.params.id*/);
      return res.status(200).json(records);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;