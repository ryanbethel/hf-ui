import { getStyles } from '@paramour/arc-plugin-paramour-css'
export default function Head({ req }) {
  const edash = req.query.hasOwnProperty('edash')
  const paramour = req.query.hasOwnProperty('paramour')


  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Enhance Starter Project</title>
        <link rel="icon" href="/_public/favicon.svg" />

        ${paramour ? `
        ${getStyles.linkTag()}
        <link rel="stylesheet" href="/_public/hf-custom-properties-paramour.css" />
        ` : `
        <link rel="stylesheet" href="/_public/hf-custom-properties.css" />
        `}
        <link rel="stylesheet" href="/_public/hf-color-mode.css" />
        <link rel="stylesheet" href="/_public/hf-basic-reset.css" />
  <meta
    name="description"
    content="The HTML first full stack web framework."
  />
        <script src="/_public/initialize-dark-light.js"></script>
      </head >
    `;
}
