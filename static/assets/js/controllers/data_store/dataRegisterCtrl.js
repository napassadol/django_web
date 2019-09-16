'use strict';
app.controller('dataRegisterCtrl', ['$rootScope', '$scope', '$uibModal', '$filter', 'ngTableParams', 'toaster', 'dataRegisterApi',
    function ($rootScope, $scope, $uibModal, $filter, ngTableParams, toaster, dataRegisterApi) {
        var vm = this;
        vm.thread = {};
        vm.thread.percent = 0;
        vm.percent = {
            'width': '0%'
        };
        Pusher.logToConsole = true;

        var pusher = new Pusher('da783ba1529d017fd021', {
            cluster: 'ap1',
            forceTLS: true
        });

        var channel = pusher.subscribe('thread');
        channel.bind('pull_data', 
            function(data) {
                vm.thread = JSON.parse(JSON.stringify(data));
                if(vm.thread.status == 'running'){
                    vm.percent.width = vm.thread.percent.toString() + '%';
                }
                $scope.$apply();
            }
        );
        
        vm.readHCode = function(){
            dataRegisterApi.readHarmonize().then(
                function(response){
                    vm.harmonize_list = response.data;
                    vm.tableParams = new ngTableParams({
                        page: 1,
                        count: 5,
                        filter: {
                            code: '',
                            name: ''
                        }
                    }, {
                        total: vm.harmonize_list.length,
                        getData: function ($defer, params) {
                            vm.filtered_hlist = params.filter() ? $filter('filter')(vm.harmonize_list, params.filter()) : vm.harmonize_list;
                            $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            params.total(vm.filtered_hlist.length);
                            $defer.resolve($scope.users);
                        }
                    });
                }
            );
        };

        vm.addHarmonize = function(code, name, year){
            dataRegisterApi.registerHarmonize({
                'code': code,
                'name': name,
                'year': year
            }).then(
                function(response){
                    if(response.status != 'success'){
                        console.log('addHarmonize is fail:', response.error_detail);
                    }
                    else{
                        vm.readHCode();
                    }
                }
            );
        };
    }
]);
