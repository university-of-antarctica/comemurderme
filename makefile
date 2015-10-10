
watch:
	watchify src/client.js -o build/bundle.js -v &

server:
	sudo nodemon src/server.js &