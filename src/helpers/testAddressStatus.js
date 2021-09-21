import { host, polygonTypes } from '../configs'

export async function testAddressStatus () {
  const { lat, lng } = window[Symbol.for('global.addressData')].coordinates
  // const response = await fetch('https://dka.dgtek.net/api/frontend/polygons')

  const latLng = new window.google.maps.LatLng(lat, lng)

  window[Symbol.for('global.addressData')].status = 'Not available'

  for (const type of polygonTypes) {
    const response = await fetch(`${host}/polygons/${type}`)

    if (response.status !== 200) return Object.assign(window[Symbol.for('global.addressData')], { error: 'Failed to read polygons data: remote server error' })

    const polygons = (await response.json()).data.map(item => item.geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] })))

    for (const coordinates of polygons) {
      const polygon = new window.google.maps.Polygon({ paths: coordinates })
      if (window.google.maps.geometry.poly.containsLocation(latLng, polygon)) return Object.assign(window[Symbol.for('global.addressData')], { status: type })
    }
  }
}
