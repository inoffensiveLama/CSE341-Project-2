const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World!")
});

router.use("/pokemon", require("./pokemon"));

module.exports = router;