function newSearch(event) {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault()
  (async () => {
      const searchQuery = botanicalName;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: JSON.stringify(searchQuery);,
        redirect: 'follow'
      };
      
      const resp = await fetch("/api/plants/search", requestOptions)
      if(resp.ok) {
          // Handle goods here
          const json = await resp.json()
          
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
      } else {
          // Handle error here
          
      }
    // getDataAsst().get("api/plants/search", botanicalName);

  })();
}
