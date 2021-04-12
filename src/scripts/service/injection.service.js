export const makeInjectionStyle = (style) => {
  let styleElement = document.createElement('link')
  styleElement.setAttribute('href', style)
  styleElement.setAttribute('rel', 'stylesheet')
  styleElement.setAttribute('type', 'text/css')

  document.head.prepend(styleElement)
}

export const makeInjectionScript = (script) => {
  let scriptElement = document.createElement('script')
  scriptElement.setAttribute('src', script)

  document.body.append(scriptElement)
}
