'use strict';


app.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/');

    // // add a response interceptor
    // RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    //     var extractedData;

    //     // .. to look for getList operations
    //     if (operation === "getList") {
    //         // .. and handle the data and meta data
    //         extractedData = data.results;

    //         // Add properties for list data
    //         extractedData.meta = data.meta;
    //         extractedData.links = data.links;
    //     } else {
    //         extractedData = data;
    //     }
    //     return extractedData;
    // });
});
