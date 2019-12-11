#http://0.0.0.0:5000/api/v1/docs/

init:
	git submodule update --init --recursive

ocean:
	barge/start_ocean.sh --no-commons --local-spree-node

tutorial:
	scripts/keeper.sh
	yarn start:react

commons-ui:
	cd commons && scripts/keeper.sh
	cd commons && npm start

deploy:
	yarn --cwd contracts test:spree
