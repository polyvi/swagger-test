import { Trace } from 'debug-trace-fn'
const trace = Trace('trace')

import * as R from 'ramda'

const parameters2queryString = params =>
    R.reduce(
        (str, [key, value]) =>
            str + (str == "" ? '' : '&') + key + '=' + value,
        "",
        R.toPairs(params))

const replaceUrlParameters = (path, parameters) =>
    R.reduce(
        (acc, [key, value]) => R.replace('{' + key + '}', '' + value, acc),
        path,
        R.toPairs(parameters)
    )

const xTest2url = (path, xTest) =>
    replaceUrlParameters(path, xTest['uri-parameters']) + (xTest['parameters'] ? '?' : '') + parameters2queryString(xTest['parameters'])

const body2string = body =>
    body ? `.send(${JSON.stringify(body)})
`: ''

const xTest2string = (path, [key, value]) =>
    `
    @test("${key}")
    async ${key} () {
        ${value['before'] || ''}
        let res = await request
            .${value['method']}("${xTest2url(path, value)}")
            ${body2string(value['body'])}
        ${value['after'] || ''}
    }
`

export {
    parameters2queryString,
    replaceUrlParameters,
    xTest2url,
    xTest2string
}