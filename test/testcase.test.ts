import * as assert from "assert"
import { suite, test } from "mocha-typescript"

import { parameters2queryString, xTest2url, replaceUrlParameters } from "../src/testcase"

@suite("api spec compiler tests")
class CompilerTest {
    @test("parameters to queryString")
    testParameters2queryString() {
        assert.equal(parameters2queryString({
            page_index: 1,
            page_size: 20,
            keywords: 'swagger'
        }), "page_index=1&page_size=20&keywords=swagger", )
    }

    @test("x-test to url")
    testXTest2url() {
        assert.equal(xTest2url('/user', {
            parameters: {
                page_index: 1
            }
        }), "/user?page_index=1")
    }

    @test("replaceUrlParameters")
    testReplaceUrlParameters() {
        assert.equal(replaceUrlParameters('/user/{id}', { id: 1 }), "/user/1")
    }
}
