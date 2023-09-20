var Server = require('stratum').Server;

// these settings can be changed using Server.defaults as well, for every new server up
var server = Server.create({
    /**
     * RPC to listen interface for this server
     */
    rpc: {
        /**
         * Bind to address
         *
         * @type {String} 
         */
        host: 'localhost',
        /**
         * RPC port
         *
         * @type {Number} 
         */
        port: 1337,
        /**
         * RPC password, this needs to be a SHA256 hash, defaults to 'password'
         * To create a hash out of your password, launch node.js and write
         *
         * require('crypto').createHash('sha256').update('password').digest('hex');
         *
         * @type {String} 
         */
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        /**
         * Mode to listen. By default listen only on TCP, but you may use 'http' or 'both' (deal
         * with HTTP and TCP at same time)
         */
        mode: 'tcp'
    },
    /**
     * The server settings itself
     */
    settings: {
        /**
         * Address to set the X-Stratum header if someone connects using HTTP
         * @type {String} 
         */
        hostname: 'localhost',
        /**
         * Max server lag before considering the server "too busy" and drop new connections
         * @type {Number} 
         */
        toobusy: 70,
        /**
         * Bind to address, use 0.0.0.0 for external access
         * @type {string} 
         */
        host: 'localhost',
        /**
         * Port for the stratum TCP server to listen on
         * @type {Number} 
         */
        port: 8888
    }
});

server.on('mining', function (req, deferred) {
    switch (req.method) {
        case 'subscribe':
            // req.params[0] -> if filled, it's the User Agent, like CGMiner/CPUMiner sends
            // Just resolve the deferred, the promise will be resolved and the data sent to the connected client
            deferred.resolve([subscription, extranonce1, extranonce2_size]);
            break;
    }
});

server.listen();