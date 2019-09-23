'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('companyCtrl', ['$rootScope', '$scope', '$uibModal', '$filter', 'ngTableParams', 'toaster', 'companyApi',
    function ($rootScope, $scope, $uibModal, $filter, ngTableParams, toaster, companyApi) {
        var vm = this
        vm.company = []
        getList()

        function gentable(){
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 5, // count per page
                filter: {
                    name: ''
                }
            }, {
                total: vm.company.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')(vm.company, params.filter()) : vm.company;
                    $scope.companys = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    $defer.resolve($scope.companys);
                }
            });
        }
        function getList(){
            companyApi.List().then(
                function(response){
                    vm.company = response.plain()
                    gentable()
                }
            )
        }

        vm.delete = function(data){
            companyApi.delete(data).then(
                function(response){
                    getList()
                }
            )
        }

        vm.add = function(){
            var modalInstance = $uibModal.open({
                templateUrl : '/static/assets/views/company/company_detail.html',
                size : 'lg',
                backdrop: 'static',
                controller : modalFunction,
                controllerAs : 'ctrl',
                resolve:{
                  vm: vm,
                }
            }); // end modalInstance
            function modalFunction(vm, companyApi, $uibModal, $uibModalInstance) {
                var vmModal = this
                vmModal.company = {}
                vmModal.company.info = {}

                vmModal.save = function(){
                    companyApi.add(vmModal.company).then(
                        function(response){
                            getList()
                            vmModal.cancel()
                        }
                    )
                }

                vmModal.cancel = function() {
                    $uibModalInstance.close();
                }
            }
        }

        vm.edit = function(data){
            var modalInstance = $uibModal.open({
                templateUrl : '/static/assets/views/company/company_detail.html',
                size : 'lg',
                backdrop: 'static',
                controller : modalFunction,
                controllerAs : 'ctrl',
                resolve:{
                  vm: vm,
                }
            }); // end modalInstance
            function modalFunction(vm, companyApi, $uibModal, $uibModalInstance) {
                var vmModal = this
                vmModal.company = data

                vmModal.save = function(){
                    companyApi.edit(vmModal.company)
                    vmModal.cancel()
                }

                vmModal.cancel = function() {
                    $uibModalInstance.close();
                }
            }
        }
    }
])
