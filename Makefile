default: init install

init:
	git submodule update --init --recursive
	cd contracts && openzeppelin init

install:
	cd commons && npm install
	cd contracts && yarn

ocean:
	barge/start_ocean.sh --no-commons --local-spree-node

commons-ui:
	cd commons && scripts/keeper.sh
	cd commons && npm start

test:
	yarn --cwd contracts test

migrate:
	yarn --cwd contracts migrate
