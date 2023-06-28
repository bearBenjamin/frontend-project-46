install:
	npm ci

bin-gendiff:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
<<<<<<< HEAD
	npm run test

test-coverage:
	npm test
=======
	npm test
>>>>>>> 0fee33cd178f864b4175c55d67565f16222073d1
