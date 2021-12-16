module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
