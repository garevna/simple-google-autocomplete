import { host } from '../configs'

export async function getBuildings () {
  let result = []
  var currentPage = 1
  do {
    const response = await (await fetch(`${host}/building?per_page=40&page=${currentPage}`)).json()
    var { data, page, pages } = response
    result = result.concat(data.map(item => item.address))
    currentPage = page + 1
  } while (page < pages)

  return result
}
