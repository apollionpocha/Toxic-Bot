console.log('Starting...')
let cluster = require('cluster')
let path = require('path')
let fs = require('fs')
let package = require('./package.json')
const moment = require("moment-timezone")
const time = moment.tz('Africa/Nairobi').format("HH:mm:ss")
const CFonts = require('cfonts')
const Readline = require('readline')
const yargs = require('yargs/yargs')
const { color } = require('./lib/color')
const { say } = CFonts
const rl = Readline.createInterface(process.stdin, process.stdout)

say('Toxic\nMD', {
  font: 'block',
  align: 'center',
  colors: ['blue']
})
say(`Simple Whatsapp Bot By @𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧`, {
  font: 'console',
  align: 'center',
  colors: ['green']
})

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [path.join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['magenta']
  })
  say('🌎 C Loading SOURCE...', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  say('📑 Installing PLUGINS...', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  say('✅ DONE follow me on Instagram as xh_clinton!', {
    font: 'console',
    align: 'center',
    colors: ['green']
  })
  cluster.setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = cluster.fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[❗] Exited with code:', code)
    if (code === 0) return
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0])
      start(file)
     })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')