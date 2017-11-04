import * as program from 'commander'
import { compile } from './spec'

const $RefParser = require('json-schema-ref-parser')
const parser = new $RefParser()

program
    .version('0.0.1')
    .option('-a,--api <value>', 'Url of spec-host or a local file path')
    .option('-s,--server <value>', 'Root url of api-server')
    .parse(process.argv)

if (program.api) {
    parser.dereference(program.api)
        .then(function (spec) {
            compile(spec, program.server)
        })
        .catch(console.log)
} else
    console.log('No Arguments.')