/** Build a Google Maps embed URL for branch local SEO (iframe src). */

function toEmbedByQuery(query: string): string {
  return `https://www.google.com/maps?output=embed&q=${encodeURIComponent(query)}`
}

function extractQueryFromGoogleMapsLink(link: string): string | null {
  try {
    const url = new URL(link)
    const q = url.searchParams.get('q') || url.searchParams.get('query')
    if (q?.trim()) return q.trim()

    // Handles URLs like /maps/@24.8607,67.0011,15z
    const coordsMatch = url.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
    if (coordsMatch?.[1] && coordsMatch?.[2]) {
      return `${coordsMatch[1]},${coordsMatch[2]}`
    }

    // Handles long URLs with !3d<lat>!4d<lng>
    const latLngPbMatch = link.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)
    if (latLngPbMatch?.[1] && latLngPbMatch?.[2]) {
      return `${latLngPbMatch[1]},${latLngPbMatch[2]}`
    }

    // Handles URLs like /maps/place/Some+Place
    // Keep this after coordinates so we prefer exact pin location.
    const placeMatch = url.pathname.match(/\/place\/([^/]+)/)
    if (placeMatch?.[1]) {
      return decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')).trim()
    }
  } catch {
    // Ignore malformed URLs; fallback query will be used.
  }

  return null
}

export function getBranchMapEmbedUrl(branch: {
  address: string
  city: string
  google_map_link?: string | null
}): string {
  const branchQuery = `${branch.address}, ${branch.city}, Pakistan`
  const link = branch.google_map_link?.trim()

  // Priority 1: use admin-provided Google Maps link whenever possible.
  if (link) {
    if (link.includes('/maps/embed')) return link

    const extractedQuery = extractQueryFromGoogleMapsLink(link)
    if (extractedQuery) return toEmbedByQuery(extractedQuery)

    // Fallback for short/odd Google Maps links:
    // pass the full link as query so Google resolves that exact location.
    return toEmbedByQuery(link)
  }

  // Priority 2: branch address/city when no map link is provided.
  return toEmbedByQuery(branchQuery)
}
