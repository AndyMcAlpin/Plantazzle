const {Router} = require("express")
const router = Router()

const hb = require("handlebars")




router.get ("/profile", (req, res) => {
    hb.registerPartial("button", "{{MyButton}}") 
    res.render ("profile")
}) 


module.exports = router