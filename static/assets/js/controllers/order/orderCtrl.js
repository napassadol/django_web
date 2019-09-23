'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('orderCtrl', ['$rootScope', '$scope', '$uibModal', '$filter', 'ngTableParams', 'toaster', 'orderApi',
    function ($rootScope, $scope, $uibModal, $filter, ngTableParams, toaster, orderApi) {
        var vm = this
        vm.data = {}
        vm.data.status = ["All", "Pickup", "Checking Order", "Delivery", "Complete"]
        vm.status = vm.data.status[0]
        vm.order = []

        vm.order.push({
            'id': 1,
            'name': 'Basil',
            'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
            'status': 1
        })
        vm.order.push({
            'id': 2,
            'name': 'Mint',
            'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
            'status': 2
        })
        vm.order.push({
            'id': 3,
            'name': 'Onion',
            'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
            'status': 3
        })å

        vm.cvtStatus = function(x){
            return vm.data.status[x]
        }

        vm.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 2, // count per page
            sorting: {
                name: 'asc' // initial sorting
            }
        }, {
            total: vm.order.length, // length of data
            getData: function ($defer, params) {
                vm.order = params.sorting() ? $filter('orderBy')(vm.order, params.orderBy()) : vm.order;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        vm.search_order = function(){
            var parameters = {
                'order_id': vm.order_id,
                'order_name': vm.order_name,
                'order_status': vm.status,
                'start_date': vm.start_date,
                'end_date': vm.end_date
            }
            orderApi.order_search(parameters).then(
                function(response){
                    toaster.pop({
                        type: 'info',
                        title: 'Search',
                        body: '',
                        timeout: 2000
                    });  
                }
            )
        }

        vm.remove = function(order){
            orderApi.order_remove(order.id)
        }

        vm.view_order = function(order){
            var modalInstance = $uibModal.open({
                templateUrl : '/static/assets/views/order/order_detail.html',
                size : 'lg',
                backdrop: 'static',
                controller : modalFunction,
                controllerAs : 'ctrl',
                resolve:{
                  vm: vm,
                }
            }); // end modalInstance
            function modalFunction(vm, orderApi, $uibModal, $uibModalInstance) {
                var vmModal = this

                vmModal.order = order

                vmModal.save = function(){
                    orderApi.order_save(vmModal.order).then(
                        function(response){
                            toaster.pop({
                                type: 'success',
                                title: 'Saved',
                                body: 'Order ID: ' + vmModal.order.id + " has been saved",
                                timeout: 2000
                            });   
                        }
                    )
                    vmModal.cancel()     
                }

                vmModal.cancel = function() {
                    $uibModalInstance.close();
                }
            }
        }
    }
])
