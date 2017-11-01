import * as assert from "assert"
import { suite, test } from "mocha-typescript"

import { path2identifier } from "../src/suite"

@suite("api spec compiler tests")
class CompilerTest {
    @test("path to identifier")
    testPath2identifier() {
        assert.equal(path2identifier('/user/{id}/follow'), '_user__id__follow')
    }

    @test("path with queryString to identifier")
    testPathQueryString2identifier() {
        assert.equal(path2identifier('/user/{id}/follow?page=1'), '_user__id__follow_page_1')
    }
}
