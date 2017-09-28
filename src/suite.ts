import * as R from 'ramda'

import { xTest2url, xTest2string } from './testcase'

import * as fs from 'fs'

const moment = require('moment')

const handleMethod = R.compose(
    R.reduce(
        (acc, [responseCode, responseBody]) =>
            R.merge(acc,
                R.mapObjIndexed(
                    (testcaseBody, testcaseName, obj) =>
                        R.merge(testcaseBody, { responseCode: responseCode }),
                    responseBody['x-test']
                )
            ),
        {}),
    R.toPairs,
    R.prop('responses')
)

const handleRawPath = R.compose(
    R.reduce(
        (acc, [key, value]) =>
            R.merge(acc,
                R.map(
                    obj => R.merge(obj, { method: key }),
                    handleMethod(value))),
        {}),
    R.toPairs
)

const handlePath = (pathBody, path) =>
    R.compose(
        R.map(
            xTest =>
                R.merge(xTest, { path: path })),
        handleRawPath
    )(pathBody)

const path2identifier = path => R.replace(/[/{}]/g, '_', path)

const suiteBody2string = (path, xTests) =>
    R.reduce(
        (acc, xTest) => acc + xTest2string(path, xTest),
        '',
        R.toPairs(xTests))

const suite2string = (beforeEach, path, body) =>
    `
@suite("${path}")
class TestSuite${path2identifier(path)} {
    ${beforeEach}
    ${suiteBody2string(path, body)}
}`

const suite2file = (server, before, beforeEach, path, body) => {
    const fd = fs.openSync(`${__dirname}/../../apitest/${path2identifier(path)}.test.ts`, 'w')
    console.log(`${path2identifier(path)}.test.ts`)
    fs.writeSync(fd,
        `//generated time: ${moment().format()}
import * as assert from "assert"
import { suite, test } from "mocha-typescript"
const request = require("supertest")("${server}")

${before}

`)
    fs.writeSync(fd, suite2string(beforeEach, path, body))
    fs.closeSync(fd)
}

export {
    handlePath,
    path2identifier,
    suite2string,
    suite2file
}