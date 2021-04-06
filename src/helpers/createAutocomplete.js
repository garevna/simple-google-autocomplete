export const createAutocomplete = function (inputElement) {
  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, { componentRestrictions: { country: 'au' } })
  autocomplete.addListener('place_changed', async () => {
    const place = autocomplete.getPlace()
    inputElement.value = place.formatted_address
  })
  return autocomplete
}
