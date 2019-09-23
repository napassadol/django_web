'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('productCtrl', ['$rootScope', '$scope', '$uibModal', '$filter', 'ngTableParams', 'toaster', 'productApi',
    function ($rootScope, $scope, $uibModal, $filter, ngTableParams, toaster, productApi) {
        var vm = this
        vm.product = []
        getList()

        function getList(){
            productApi.List().then(
                function(response){
                    vm.product = response.plain()
                    $scope.tableParams = new ngTableParams({
                        page: 1, // show first page
                        count: 5, // count per page
                        filter: {
                            name: '', // initial filter
                            serial: '',
                            company__name: ''
                        }
                    }, {
                        total: vm.product.length, // length of data
                        getData: function ($defer, params) {
                            // use build-in angular filter
                            var orderedData = params.filter() ? $filter('filter')(vm.product, params.filter()) : vm.product;
                            $scope.products = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            params.total(orderedData.length);
                            $defer.resolve($scope.products);
                        }
                    });
                }
            )
        }
    }
])
