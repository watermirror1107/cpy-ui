process.env.NODE_ENV = 'test'
process.env.BABEL_ENV = 'coverage'
process.env.COVERAGE = 'true'

process.argv = [
  process.argv[0],
  require.resolve('mochapack/bin/mochapack'),
  ...process.argv.slice(2)
]

require('mochapack/lib/cli')
