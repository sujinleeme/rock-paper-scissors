type GetOptions = <T>(e: T) => {
  label: keyof T
  value: T[keyof T]
}[]

export const getOptions: GetOptions = (e) => {
  return Object.keys(e)
    .filter((i) => isNaN(Number(i)) === true)
    .map((d) => ({
      label: d as keyof typeof e,
      value: e[d as keyof typeof e],
    }))
}
