app.service('companyApi', function(Restangular) {

    // this.registerHarmonize = function (parameter) {
    //     return Restangular.all('datastore/register_harmonize').post(parameter);
    // };
    this.List = function() {
        return Restangular.one('company/list').get();
    };

    this.edit = function(parameter) {
        return Restangular.all('company/edit').post(parameter);
    };

    this.delete = function(parameter) {
        return Restangular.all('company/delete').post(parameter);
    };

    this.add = function(parameter) {
        return Restangular.all('company/add').post(parameter);
    };
});