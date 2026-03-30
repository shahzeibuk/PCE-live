/** Build a Google Maps embed URL for branch local SEO (iframe src). */

export function getBranchMapEmbedUrl(branch: {
  address: string
  city: string
  google_map_link?: string | null
}): string {
  const link = branch.google_map_link?.trim()
  if (link) {
    if (link.includes('/maps/embed')) return link
    const placeMatch = link.match(/place\/([^/]+)/)
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      return `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`
    }
  }
  const q = encodeURIComponent(`${branch.address}, ${branch.city}, Pakistan`)
  return `https://maps.google.com/maps?q=${q}&output=embed`
}
