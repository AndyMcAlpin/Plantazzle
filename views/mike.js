const {Router} = require("express")
const router = Router()

const hb = require("handlebars")




router.get ("/test", (req, res) => {
    hb.registerPartial("button", "{{MyButton}}") 

    res.render ("Profile")
})

router.get('/modal', (req,res) => {

    res.render('Profile')

    res.render ("profile")
})

//router.get('/chat', (req, res) => {
   // res.render('chat')

})


module.exports = router