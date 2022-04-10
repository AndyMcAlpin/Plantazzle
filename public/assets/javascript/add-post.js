async function uploadPlantPicture(selector, plantBasicId) {
  const file = document.querySelector(selector).files[0]
  const body = new FormData()
  body.append('file', file, file.name)
  body.append('PlantBasicId', plantBasicId)

  return fetch('/api/plants/upload_photo', {
    method: 'post',
    body
  }).then(resp => resp.json())
    .then(console.log)
    .catch(console.error)
}

function newFormHandler(event) {
  event.preventDefault();

  (async () => {
    const DA = getDataAsst()
    const [botanicalName, commonName] = await DA.getInputValue('#botanical-name', '#common-name')
    const [family, origin, plantType, growthRate, height, flowers, toxicity] =
      DA.getEmptyOrValue('#family', '#origin', '#plant-type', '#growth-rate', '#height', '#flowers', '#toxicity')
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


    try {
      const response = await fetch('/api/plants/upload_photo', {
        method: 'post',
        body
      })

      const json = await response.json()
      document.location = '/'
    } catch (err) {
      alert('You broke me bro!!')
    }
  })()
}

function updateFileName(event) {
  document.querySelector('[plant-file]').innerText = event.target.files[0].name
}

document.querySelector('#plant-picture').addEventListener('change', updateFileName)
document.querySelector('#new-plant-basic').addEventListener('submit', newFormHandler);

for(const [selector, value] of Object.entries({
  "#botanical-name": "qwe",
  "#common-name": "asd",
  "#family": "zzxc",
  "#origin": "qwe",
  "#plant-type": "asd",
  "#zone": "qwez",
  "#growth-rate": "asd",
  "#height": "qwe",
  "#flowers": "qwe",
  "#toxicity": "qwe"
})) {
  document.querySelector(selector).value = value
}
