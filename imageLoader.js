export default function imageLoader({src, width, quality}) {
  return `https://christopher-fiallos.com/${src}?w=${width}&quality=${quality || 75}`
}
