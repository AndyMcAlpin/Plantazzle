const { User } = require('./models')
var username = 'belford4'
var password = 'qwer'

User.authenticate(username, password)
  .then(function (user) {
    if (!user)
      return false
    // user
    console.log(user)
  })
// User.authenticate('shell', 'qwe')
