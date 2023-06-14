install:
	npm ci

bin-gendiff:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run
