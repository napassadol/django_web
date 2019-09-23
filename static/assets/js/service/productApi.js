app.service('productApi', function(Restangular) {

    // this.registerHarmonize = function (parameter) {
    //     return Restangular.all('datastore/register_harmonize').post(parameter);
    // };
    this.List = function() {
        return Restangular.one('product/list').get();
    };
});