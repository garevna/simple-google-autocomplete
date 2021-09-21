import { host } from '../configs'

export async function searchAddressInDB () {
  Object.assign(window[Symbol.for('global.addressData')], {
    status: null,
    buildingId: null
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

  const { coordinates, status, _id: buildingId, estimatedServiceDeliveryTime } = response.data

  Object.assign(window[Symbol.for('global.addressData')], {
    coordinates,
    status,
    buildingId,
    estimatedServiceDeliveryTime,
    error: null
  })
}
