module.exports = function(conf) {
  let { title = '', jsr = [], cssr = [], icon = '' } = conf
  jsr = jsr.map(js => `<script src="${js}"></script>`).join('')
  cssr = cssr.map(css => `<link rel="stylesheet" href="${css}"/>`).join('')

  return `  <!DOCTYPE html>
  <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <meta name="format-detection" content="email=no,address=no,telephone=no">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title}</title>
      <link rel="shortcut icon" href="${icon}" type="image/x-icon">
      ${cssr}
    </head>

    <body>
      <div id="app"></div>
      ${jsr}
    </body>

  </html>`
}
