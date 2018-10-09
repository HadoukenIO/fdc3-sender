const liveServer = require('live-server');
const openfinLauncher = require('openfin-launcher');
const path = require('path');

//Update our config and launch openfin.
function launchOpenFin(configPath) {
    openfinLauncher.launchOpenFin({ configPath })
        .then(() => process.exit())
        .catch(err => console.log(err));
}

const sender = path.resolve('public/sender/app.json');

const serverParams = {
    root: path.resolve('public'),
    port: 5555,
    open: false,
    logLevel: 2
};


//Start the server server and launch our app.
liveServer.start(serverParams).on('listening', () => {
    launchOpenFin(sender);
});
