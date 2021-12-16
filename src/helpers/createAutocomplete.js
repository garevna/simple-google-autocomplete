import { streetTypes } from '../configs'
import { clearAddressData, normalizeAddress } from './'

export const createAutocomplete = async function (inputElement) {
  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, { componentRestrictions: { country: 'au' } })
  autocomplete.addListener('place_changed', async () => {
    clearAddressData()

    const place = autocomplete.getPlace()

    window[Symbol.for('global.addressData')].url = place.url

    const { lat, lng } = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }

    const {
      street_number: number,
      route: fullStreetName,
      locality: city,
      administrative_area_level_2: admin,
      administrative_area_level_1: state,
      postal_code: postCode
    } = Object.assign({}, ...place.address_components.map(item => ({ [item.types[0]]: item.short_name })))

    const tmp = fullStreetName.toUpperCase().split(' ')
    const googleStreetType = tmp.pop()

    const details = {
      number1: number.split('-')[0],
      number2: number.split('-')[1] || '',
      number,
      street: tmp.join(' '),
      streetType: streetTypes.getGeoscapeStreetType(googleStreetType),
      city,
      admin,
      state,
      postCode
    }

    Object.assign(window[Symbol.for('global.addressData')], { addressComponents: details })

    window[Symbol.for('global.addressData')].address = `${number} ${details.street} ${details.streetType}, ${city.toUpperCase()} ${state} ${postCode}`
    window[Symbol.for('global.addressData')].coordinates = [lng, lat]

    inputElement.value = normalizeAddress(place.formatted_address)
    window.dispatchEvent(new CustomEvent('address-selected', {
      detail: window[Symbol.for('global.addressData')]
    }))
  })

  return autocomplete
}
