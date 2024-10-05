const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //swagger.tags=["Home"]
    res.send("Hello World!")
});

router.use("/pokemon", require("./pokemon"));

router.use("/types", require("./types"));


router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;