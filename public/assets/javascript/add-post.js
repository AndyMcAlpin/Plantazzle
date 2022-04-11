function newFormHandler(event) {
  event.preventDefault();

  (async () => {
    const DA = getDataAsst()
    const [botanicalName, commonName] = await DA.getInputValue('#botanical-name', '#common-name')
    const [
      family,
      origin,
      plantType,
      growthRate,
      height,
      flowers,
      toxicity,
      light,
      temperature,
      humidity,
      soil,
      watering,
      fertilizing,
      leafCare,
      repotting,
      pruningShaping,
    ] =
      DA.getEmptyOrValue(
        '#family',
        '#origin',
        '#plant-type',
        '#growth-rate',
        '#height',
        '#flowers',
        '#toxicity',
        '#light',
        '#temperature',
        '#humidity',
        '#soil',
        '#watering',
        '#fertilizing',
        '#leafCare',
        '#repotting',
        '#pruningShaping',
      )
    const file = document.querySelector('#plant-picture').files[0]

    const body = new FormData()
    body.append('file', file, file.name)
    body.append('botanicalName', botanicalName)
    body.append('commonName', commonName)
    body.append('family', family)
    body.append('origin', origin)
    body.append('plantType', plantType)
    body.append('growthRate', growthRate)
    body.append('height', height)
    body.append('flowers', flowers)
    body.append('toxicity', toxicity)
    body.append('light', light)
    body.append('temperature', temperature)
    body.append('humidity', humidity)
    body.append('soil', soil)
    body.append('watering', watering)
    body.append('fertilizing', fertilizing)
    body.append('leafCare', leafCare)
    body.append('repotting', repotting)
    body.append('pruningShaping', pruningShaping)

    try {
      const response = await fetch('/api/plants/upload_photo', {
        method: 'post',
        body
      })

      if(response.ok) return document.location = '/'
      const json = await response.json()
      switch(json.code) {
        case 400:
          const botanicalName = document.querySelector('#botanical-name')
          botanicalName.classList.add('is-danger')
          botanicalName.classList.remove('is-primary')
          if(!botanicalName.closest('.control').querySelector('.has-text-danger'))
          botanicalName.closest('.control').insertAdjacentHTML('beforeend',
              `<span class="has-text-danger">Botanical Name already exists</span>`)
          break
        default:

          break
      }
    } catch (err) {
      alert('You broke me bro!!')
    }
  })()
}

function updateFileName(event) {
  document.querySelector('[plant-file]').innerText = event.target.files[0].name
}

document.querySelector('#plant-picture').addEventListener('change', updateFileName)
document.querySelector('#new-plant').addEventListener('submit', newFormHandler)
