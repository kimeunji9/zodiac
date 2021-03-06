const getCookieValue = (key: any) => {
  const cookieKey = key + "="
  let result = ""
  const cookieArr = document.cookie.split(";")
    
  for(let i = 0; i < cookieArr.length; i++) {
    if(cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1)
    }

    if(cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length)
      return result
    }
  }
  return result
}

function resetCookie() {
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
  })
}

export {
  getCookieValue,
  resetCookie
}