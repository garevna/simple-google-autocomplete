const polygonTypes = ['ServiceAvailable', 'BuildCommenced', 'ComingSoon']

/* =================== Old API ======================== */

export const getPolygons = async function () {
  const response = await fetch('https://dka.dgtek.net/api/frontend/polygons')
  if (response.status !== 200) return { status: response.status, result: 'Error reading polygons data' }

  let features = []
  try {
    features = (await response.json()).features
  } catch (err) {
    return { status: 422, result: 'Invalid polygons data structure' }
  }

  const polygons = Object.assign({}, ...polygonTypes.map(type => ({ [type]: [] })))

  features.forEach((feature) => {
    const type = feature.properties.typeOf
    const coordinates = feature.geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] }))
    const polygon = new window.google.maps.Polygon({ paths: coordinates })
    polygons[type].push(polygon)
  })

  return { status: 200, result: polygons }
}
