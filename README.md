# swagger-test
autogenerate mocha-tests from a swagger spec

## Usage
```bash
docker pull luckymark/swagger-test
docker run -it -v ${PWD}/apitest:/home/apitest luckymark/swagger-test node ./dist/src/app.js -a ${url-of-spec or filename} -s ${url-root-of-api-server} 

ls ./apitest
```
then you can run test:
```bash
docker run -it -v ${PWD}/apitest:/home/apitest luckymark/swagger-test npm run apitest
```

## please check: [sample.yml](./test/spec/sample.yml)