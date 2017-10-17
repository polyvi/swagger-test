import * as program from 'commander'
import * as fs from 'fs'
import { compile } from './spec'

import * as request from 'request-promise-native'

const YAML = require('yamljs')

program
    .version('0.0.1')
    .option('-a,--api <value>', 'Url of spec-host')
    .option('-f --file <value>', 'local file path')
    .option('-s,--server <value>', 'Root url of api-server')
    .parse(process.argv)

if (program.api) {
    console.log('Use Remote File.')
    request(program.api)
        .then(spec => {
            compile(YAML.parse(spec), program.server)
        })
        .catch(err => {
            console.log(err)
        })
} else if (program.file) {
    console.log('Use Local File.', program.file)
    fs.readFile(program.file, 'utf8', (err, spec) => {
        compile(YAML.parse(spec), program.server)
    })
} else
    console.log('No Arguments.')