import * as R from 'ramda'

import { handlePath, suite2string, suite2file } from './suite'

const handlePaths = R.compose(
    R.pickBy((val, key) => R.keys(val).length > 0),//过滤掉没有xTest测试案例的path
    R.mapObjIndexed(handlePath)
)

const handleSpec = spec => ({
    'x-test': spec['x-test'],
    paths: handlePaths(spec['paths'])
})

const paths2string = (beforeEach, paths) =>
    R.compose(
        R.reduce(
            (acc, [key, value]) =>
                acc + suite2string(key, value, beforeEach),
            ""),
        R.toPairs,
    )(paths)

const compile = (spec, server) =>
    R.compose(
        R.forEachObjIndexed((value, key, obj) =>
            suite2file(server, spec['x-test']['before'], spec['x-test']['beforeEach'], key, value)),
        R.prop('paths'),
        handleSpec
    )(spec)

export {
    compile
}
