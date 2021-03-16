let AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let bucketName = 'usu-cs5260-dallinpacker-web'

var bucketParams = {
    Bucket : bucketName,
};

s3.listObjects(bucketParams, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        let requests = data.Contents;
        requests.sort((a, b) => (a.Key > b.Key) ? 1 : -1);
        if (requests.length > 0) {
            let request = requests.shift();
            console.log('request found: ' + request.key);
            deleteRequest(request);
        } else {
            console.log('no requests found');
            sleep(100);
        }
    }
});

function deleteRequest(request) {
    let params = {
        Bucket: bucketName,
        Key: request.Key
    };
    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log('request ' + request.Key + ' removed from ' + bucketName);
        }
    });
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
