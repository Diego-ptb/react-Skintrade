module.exports = function (config) {
  config.set({
    // Framework de testing
    frameworks: ['jasmine'],

    // Archivos a incluir
    files: [
      'src/**/*.spec.js',
      'src/**/*.js',
      'src/**/*.jsx'
    ],

    // Archivos a excluir
    exclude: [
      'src/index.js',
      'src/reportWebVitals.js'
    ],

    // Preprocesadores: compilan JSX y miden cobertura
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'src/**/*.jsx': ['webpack', 'coverage'],
      'src/**/*.spec.js': ['webpack']
    },

    // Configuración de Webpack para React
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ],
                plugins: [
                  // Instrumenta el código para cobertura, pero ignora tests
                  ['istanbul', { exclude: ['**/*.spec.js', '**/tests/**'] }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // Reporteros que muestran progreso y cobertura
    reporters: ['progress', 'coverage'],

    // Configuración del reporte de cobertura
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },         // Reporte visual (index.html)
        { type: 'lcov', subdir: 'lcov' },         // Reporte compatible con CI
        { type: 'text-summary' },                 // Resumen en consola
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
      ],
      check: {
        global: {
          statements: 70,
          branches: 50,
          functions: 70,
          lines: 70
        }
      }
    },

    // Puerto del servidor local de Karma
    port: 9876,

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // Navegador usado para ejecutar los tests
    browsers: ['ChromeHeadless'],

    // Configuración para entornos restringidos (como CETECOM)
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },

    singleRun: false,
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    concurrency: Infinity
  });
};
