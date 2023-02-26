export const capitalize = ([firstLetter, ...restOfWord]) =>
  firstLetter.toUpperCase() + restOfWord.join('');

export const getHeights = () => {
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--hero-height', `${window.innerHeight}px`)
  }

  const examplesHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--example-height', `${window.innerHeight - 60}px`)
  }

  if (window.innerWidth <= 750) {
    appHeight()
  }

  if (window.innerWidth <= 600) {
    examplesHeight()
  }
}
