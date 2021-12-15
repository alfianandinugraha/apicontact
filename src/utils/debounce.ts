function debounce<T>(cb: (param: T) => void, delay = 500) {
  let timer: any

  return (param: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb(param)
    }, delay)
  }
}

export default debounce
