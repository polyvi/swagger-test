import * as program from 'commander'
import { Trace } from 'debug-trace-fn'
const trace = Trace('trace')
import { compile } from './spec'

import * as request from 'request-promise-native'

const YAML = require('yamljs')

program
    .version('0.0.1')
    .option('-a,--api <value>', 'Url of spec-host')
    .option('-s,--server <value>', 'Root url of api-server')
    .parse(process.argv)

request(program.api)
    .then(spec => {
        compile(YAML.parse(spec), program.server)
    })
    .catch(err => {
        trace(err)
    })
