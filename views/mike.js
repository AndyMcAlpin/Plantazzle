const {Router} = require("express")
const router = Router()

const hb = require("handlebars")




router.get ("/test", (req, res) => {
    hb.registerPartial("button", "{{MyButton}}") 

    res.render ("Profile")
})

router.get('/online/', (req,res) => {

    res.render('')
})


router.get('/sign-up', (req, res) => {
    res.render('sign_up')
})

router.get('/chat', (req, res) => {
   res.render('chat')
})




module.exports = router