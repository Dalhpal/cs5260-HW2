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
        console.log(requests);
    }
});
