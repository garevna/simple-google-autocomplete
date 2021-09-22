export async function searchAddressInDB () {
  const host = window[Symbol.for('api.host')]

  Object.assign(window[Symbol.for('global.addressData')], {
    status: null,
    buildingId: null,
    estimatedServiceDeliveryTime: ''
  })

  const resp = await fetch(`${host}/building/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_KEY
    },
    body: JSON.stringify({ address: window[Symbol.for('global.addressData')].address })
  }).catch(error => Object.assign(window[Symbol.for('global.addressData')], { error }))

  const response = await resp.json()

  if (!response.data) return console.clear()

  const { addressComponents, coordinates, status, _id: buildingId, estimatedServiceDeliveryTime } = response.data

  Object.assign(window[Symbol.for('global.addressData')], {
    addressComponents,
    coordinates,
    status,
    buildingId,
    estimatedServiceDeliveryTime,
    error: null
  })
}
