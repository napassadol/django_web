app.service('dataRegisterApi', function(Restangular) {

    this.registerHarmonize = function (parameter) {
        return Restangular.all('datastore/register_harmonize').post(parameter);
    };

    this.readHarmonize = function () {
        return Restangular.all('datastore/register_harmonize').one('').get();
    };

    this.getColumn = function (parameter) {
        return Restangular.all('datastore/get_column').post(parameter);
    };

    this.plotChart = function(parameter){
        return Restangular.all('datastore/plot_data').post(parameter);
    }

    this.plotMap = function(parameter){
        return Restangular.all('datastore/plot_map').post(parameter);
    }
});