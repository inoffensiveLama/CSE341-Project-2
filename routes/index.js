const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //swagger.tags=["Home"]
    res.send("Hello World!")
});

router.use("/pokemon", require("./pokemon"));

router.use("/types", require("./types"));

module.exports = router;