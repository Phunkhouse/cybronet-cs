export default function webpackScripts() {
  // IMPORT ALL IMAGES IN IMG FOLDER
  function importAll(r) {
    r.keys().forEach(r)
  }

  importAll(require.context('../img/', true, /\.(png|jpg|jpeg|gif|svg|webp)$/))
}
