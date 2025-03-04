export default {
  classes: true,
  reset: true,
  borders: {
    radii: [2, 4, 8, 9999],
    widths: [1, 2, 4],
  },
  breakpoints: {
    lg: '48em',
  },
  fonts: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
    serif: 'Georgia, Cambria, Times New Roman, Times, serif',
    mono: 'Source Code Pro, Roboto Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
  grid: {
    steps: 6,
  },
  spaceScale: {
    steps: 6,
    viewportMin: 320,
    viewportMax: 1500,
    baseMin: 16,
    baseMax: 18,
    // baseMax: 16,
    // scaleMin: 'minor-third',
    // scaleMax: 'perfect-fourth',
    scaleMin: 'major-second', // 1.125,
    scaleMax: 'major-third', //1.25,
  },
  typeScale: {
    steps: 6,
    viewportMin: 320,
    viewportMax: 1500,
    baseMin: 16,
    baseMax: 18,
    // baseMax: 16,
    // scaleMin: 'minor-third',
    // scaleMax: 'perfect-fourth',
    scaleMin: 'major-second', // 1.125,
    scaleMax: 'major-third', //1.25,
  },
  color: {
    scales: {
      gray: "#808080"
    },
    spots: {
    },
  },
  customProperties: {
  },
}
