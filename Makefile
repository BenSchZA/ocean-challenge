init:
	git submodule update --init --recursive

ocean:
	barge/start_ocean.sh --no-commons 
	#--local-spree-node

tutorial:
	scripts/keeper.sh
	yarn start:react

commons-ui:
	cd commons && scripts/keeper.sh
	cd commons && yarn start

deploy:
	yarn --cwd contracts test:spree
