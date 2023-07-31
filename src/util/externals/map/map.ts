class MapHelper {
  async searchAddress(address: string, countryCode: string) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?country=${countryCode}&proximity=ip&types=address&access_token=${process.env.MAPBOX_TOKEN}`)
        .then(response => response.json())
        .then(data => {
          const {features} = data;
          resolve({
            location: features[0].center,
            address: features[0].place_name
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default MapHelper
