install:
	npm ci

bin-gendiff:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test
