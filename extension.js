(function(ext) {

    var userCount = 0;

    function checkUserCount() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://api.scratch.mit.edu/analytics/realtime',
                success: function (response) { 
                    userCount = response.item;
                    resolve();
                },
                error: function (error) {
                    console.log(error);
                    reject();
                }
            });
        });
    }

    window.setInterval(function () {
        checkUserCount();
    }, 10000);

    checkUserCount();

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
            return {status: 2, msg: 'Ready'};
    };

    ext.getUserCount = function() {
        return userCount;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['r', 'user count', 'getUserCount'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('realtime-users', descriptor, ext);

})({});