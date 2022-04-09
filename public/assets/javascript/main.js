let isGreen = false
function pm(selector) {
  const dom = document.querySelector(`[plant-modal="${selector}"]`)
  if(!dom) throw new Error(`plant-modal="${selector}" is not found.`)
  return {
    get(selector, callback) {
      callback(pm(selector))
      return this
    },
    addClass(...classes) {
      dom.classList.add(...classes)

      return this
    },
    removeClass(...classes) {
      dom.classList.remove(...classes)

      return this
    },
    hide() {
      return this.addClass('is-hidden')
    },
    show() {
      return this.removeClass('is-hidden')
    },
    text(text) {
      dom.innerText = text

      return this
    },
    outerHTML(html) {
      dom.outerHTML = html

      return this
    },
    innerHTML(html) {
      dom.innerHTML = html

      return this
    }
  }
}

function fillOutPM(selector, data) {
  const dom = pm(selector)
  if(!data) return dom.hide(`<`)
  dom.show()
  for(const [key, val] of Object.entries(data)) {
    switch(key) {
      case 'botanicalName':
        if(data.commonName) {
          pm(key).outerHTML(`<h3 
    class="is-size-3 has-text-centered modal-card-title" 
    plant-modal="${key}">${val}
        <legend class="is-size-4 has-text-center" plant-modal="commonName">${data.commonName}</legend>
    </h3>`)
        } else {
          pm(key).text(val)
        }
        break;
      case 'commonName':
        break;
      default:
        pm(key).text(val)
        break;
    }
  }
}

function getDataAsst() {
  return {
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
      }).then(resp => resp.json())
    },
    get(url) { return this.ajax(url, 'get') },
    post(url, body) { return this.ajax(url, 'post', body) },
    put(url, body) { return this.ajax(url, 'put', body) },
    delete(url, body) { return this.ajax(url, 'delete', body) }
  }
}

document.addEventListener('readystatechange', () => {
  if(document.readyState !== 'complete') return

  setupPage()
})

function renderAndApplyToModal() {
  document.addEventListener('click', event => {
    const selector = '[plant-id]'
    let target = event.target

    //
    if(!target.matches(selector)) {
      target = target.closest(selector)
      if(!target) return // is not needed
    }

    // If reached then target has plant-id attribute
    getDataAsst().get(`/api/plants/${target.getAttribute('plant-id')}`)
      .then(json => {
        fillOutPM('PlantCare', json.PlantCare)
        fillOutPM('PlantGrowing', json.PlantGrowing)
        fillOutPM('PlantBasics', {
          botanicalName: json.botanicalName,
          commonName: json.commonName,
          family: json.family,
          flowers: json.flowers,
          growthRate: json.growthRate,
          height: json.height,
          origin: json.origin,
          plantType: json.plantType,
          toxicity: json.toxicity,
          zone: json.zone
        })
        openModal(document.querySelector('#plant-modal'))
      })
      .catch(console.error)
  })
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) )
}

function applyRandomBackgroundColor() {
  const tiles = document.querySelectorAll('[random-bulma-color]')

  for(let tile of tiles) {
    const colorClass = ['is-primary', 'is-info']
    tile.classList.add((isGreen = !isGreen) === true ? 'is-primary' : 'is-info')
  }
}

// Functions to open and close a modal
function openModal($el) {
  $el.classList.add('is-active');
}

function closeModal($el) {
  $el.classList.remove('is-active');
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}

function applyModalScripts() {
  // Add a click event on various child elements to close the parent modal
  document
    .querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')
    .forEach(element => {
      const modal = element.closest('.modal')
      if(!modal) return

      element.addEventListener('click', event => {
        closeModal(modal)
      })
    })

// Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });

  document.body.addEventListener('click', event => {
    const target = event.target
    // If open-modal attribute does not exist then stop.
    if(!target.matches('[open-modal]')) return

    const modal = document.querySelector(target.getAttribute('open-modal') || '.modal')

    // If the modal could not be located then stop.
    if(!modal) return

    openModal(modal)
  })
}

function setupPage() {
  applyRandomBackgroundColor()
  applyModalScripts()
  renderAndApplyToModal()
}



/*

if(target.matches('[plant-id]'))
      renderAndApplyToModal(target.getAttribute('plant-id'))

if(target.closest('[plant-id]')) // need to get the entire element instead of just hte sides of it.

      renderAndApplyToModal(target.closest('[plant-id]').getAttribute('plant.id'))
 */