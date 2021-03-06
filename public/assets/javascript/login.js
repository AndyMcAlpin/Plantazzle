const dataAsst = {
  getInputValue(...selectors) {
    return new Promise((resolve, reject) => {
      const values = []
      for(const selector of selectors) values.push(document.querySelector(selector).value.trim())

      for(const value of values) {
        if (!value) return reject({
          reason: 'empty',
          values
        })
      }
      return resolve(values)
    })
  },
  ajax(url, method, body, options= {}, headers = {}) {
    return fetch(url, {
      ...options,
      body: JSON.stringify(body),
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })
  },
  get(url) { return this.ajax(url, 'get') },
  post(url, body) { return this.ajax(url, 'post', body) },
  put(url, body) { return this.ajax(url, 'put', body) },
  delete(url, body) { return this.ajax(url, 'delete', body) }
}

async function loginFormHandler(event) {
    event.preventDefault();

    try {
      const [ username, password ] = await dataAsst.getInputValue('#username-login', '#password-login')
      const response = await dataAsst.post('/api/users/login', { username, password })
      if(response.ok) return document.location.replace('/')
      else console.log(response.statusText)
    } catch(err) {
      if(err.reason === 'empty') {
        // one of the values were empty
        // Handle this from the form side.
      }
    }
  }
  
async function signupFormHandler(event) {
  event.preventDefault();
  try {
    const selectors = ['#first-name', '#last-name', '#email', '#zip-code', '#username', '#password1', '#password2']
    const [ firstName, lastName, email, zipCode, username, pass1, pass2 ] = await dataAsst.getInputValue(...selectors)
    if(pass1 !== pass2) return // handle mismatch passwords
    const password = pass1
    const response = await dataAsst.post('/api/users', { firstName, lastName, email, username, password, zipCode })
    if(response.ok) return document.location.replace('/')
    console.error(response.statusText) // Handle error
  } catch(err) {
    if(err.reason === 'empty') {
      // one of the values were empty
      // Handle this from the form side.
    }
  }
}

(() => {
  run = [
    { selector: '#login-form', handler: loginFormHandler },
    { selector: '#sign-up', handler: signupFormHandler }
  ]
  const get = obj => obj.element = document.querySelector(obj.selector)

  for(let obj of run) {
    get(obj)
    if(obj.element) obj.element.addEventListener('submit', obj.handler)
  }
})()
  