'use strict';
app.controller('dataVirtualCtrl', ['$rootScope', '$scope', '$uibModal', '$filter', 'ngTableParams', 'toaster', 'dataRegisterApi',
    function ($rootScope, $scope, $uibModal, $filter, ngTableParams, toaster, dataRegisterApi) {
        var vm = this;
        vm.graph = [];
        vm.virtual = false;
        
        vm.readHCode = function(){
            dataRegisterApi.readHarmonize().then(
                function(response){
                    vm.harmonize_list = response.data;
                }
            );
        };

        vm.getColumn = function(){
            dataRegisterApi.getColumn({
                'harmonize': vm.plot.harmonize
            }).then(
                function(response){
                    if(response.status == 'success'){
                        vm.column = response.data;
                        vm.column.push('date');
                    }
                    else{
                        vm.compair = undefined;
                        vm.column = undefined;
                    }
                }
            );
        };

        vm.plotChart = function(form){
            if(form.$valid){
                toaster.pop('success', 'Plot Chart', '');
                dataRegisterApi.plotChart(
                    {
                        'harmonize': vm.plot.harmonize,
                        'x_axis': vm.plot.x_axis,
                        'y_axis': vm.plot.y_axis
                    }
                ).then(
                    function(response){
                        if(response.status == 'success'){
                            vm.virtual = true;
                            plotData(response.plain().data);
                        }
                    }
                );
            }
            else{
                toaster.pop('error', 'Error', 'Require input message');
            }
        };

        vm.plotMap = function(form){
            if(form.$valid){
                toaster.pop('success', 'Plot Map', '');
                dataRegisterApi.plotMap(
                    {
                        'harmonize': vm.plot.harmonize,
                        'x_axis': vm.plot.x_axis,
                        'y_axis': vm.plot.y_axis
                    }
                ).then(
                    function(response){
                        if(response.status == 'success'){
                            vm.virtual = true;
                            plotMap(response.plain().data);
                        }
                    }
                );
            }
            else{
                toaster.pop('error', 'Error', 'Require input message');
            }
        };

        function plotData(res_data){
            let data = [];
            let layout = {};
            for(let i = 0; i < res_data.id.length; i++){
                res_data.date[i] = new Date(res_data.date[i]);
            }
            data.push(
                {
                    x: res_data[vm.plot.x_axis],
                    y: res_data[vm.plot.y_axis],
                    mode: 'markers',
                    type: 'scatter',
                    name: vm.plot.trace_name,
                    marker: { size: 6 }
                }
            );
            layout = {
                xaxis: {
                    range: [ Math.min(res_data[vm.plot.x_axis]), Math.max(res_data[vm.plot.y_axis]) ],
                    title: vm.plot.x_axis
                },
                yaxis: {
                    range: [Math.min(res_data[vm.plot.y_axis]), Math.max(res_data[vm.plot.y_axis])],
                    title: vm.plot.y_axis
                },
                title: vm.plot.chart_name
            };
            if(vm.graph.includes(vm.plot.chart_name)){
                $(document).ready(function(){
                    Plotly.plot( document.getElementById(vm.plot.chart_no), data, layout);
                });
            }
            else{
                vm.graph.push(vm.plot.chart_name);
                $(document).ready(function(){
                    Plotly.newPlot( document.getElementById(vm.plot.chart_no), data, layout);
                });
            }
        }

        function MapUnpack(data, name){
            let result = [];   
            let step = [];
            for(let i = 0; i < data.length; i++){
                for(let j = 0; j < 12; j++){
                    step.push({
                        label: data[i]['data'][j].month.toString() + '/' + data[i].year.toString(),
                        method: 'animate',
                        args: [[data[i]['data'][j].month.toString() + '/' + data[i].year.toString()], {
                            mode: 'immediate',
                            transition: {duration: 300},
                            frame: {duration: 300, 'redraw': false}
                        }]
                    });
                    result.push({
                        data: [{
                            z: [],
                            location: []
                        }],
                        name: data[i]['data'][j].month.toString() + '/' + data[i].year.toString()
                    });
                    for(let k = 0; k < data[i]['data'][j]['data'].length; k++){
                        result[result.length-1]['data'][0].z.push(data[i]['data'][j]['data'][k][name]);
                        result[result.length-1]['data'][0].location.push(data[i]['data'][j]['data'][k]['country_name']);
                    }
                }
            }
            return {result: result, step: step};
        }

        function plotMap(res_data){
            // console.log(MapUnpack(res_data[0]['data'],'country_code'));
            var map_data = MapUnpack(res_data,vm.plot.y_axis);
            var map_data_result = map_data.result;
            var map_data_step = map_data.step;
            var layout = {
                title: vm.plot.chart_name,
                width: 900,
                height:	900,
                geo: {
                    showcoastlines: true,
                    coastlinewidth: 0.5,
                    projection:{
                        type: 'mercator',
                        scale: 1
                    }
                },
                updatemenus: [{
                    x: 0.1,
                    y: 0,
                    yanchor: 'top',
                    xanchor: 'right',
                    showactive: false,
                    direction: 'left',
                    type: 'buttons',
                    pad: {'t': 87, 'r': 10},
                    buttons: [{
                        method: 'animate',
                        args: [null, {
                            fromcurrent: true,
                            transition: {
                                duration: 200,
                            },
                            frame: {
                                duration: 500,
                                redraw: false
                            }
                        }],
                        label: 'Play'
                    }, {
                        method: 'animate',
                        args: [
                            [null],
                            {
                                mode: 'immediate',
                                transition: {
                                    duration: 0
                                },
                                frame: {
                                    duration: 0,
                                    redraw: false
                                }
                            }
                        ],
                        label: 'Pause'
                    }]
                }],
                sliders: [{
                    active: 0,
                    steps: map_data_step
                }],
                x: 0.1,
                len: 0.9,
                xanchor: 'left',
                y: 0,
                yanchor: 'top',
                pad: {t: 50, b: 10},
                currentvalue: {
                    visible: true,
                    prefix: 'Year:',
                    xanchor: 'right',
                    font: {
                        size: 20,
                        color: '#666'
                    }
                },
                transition: {
                    duration: 300,
                    easing: 'cubic-in-out'
                }
            };
      
            var data = [{
                type: 'choropleth',
                locationmode: 'country names',
                locations: map_data_result[0].data[0].location,
                z: map_data_result[0].data[0].z,
                colorscale: [
                    [0,'rgb(220, 220, 220)'],[0.35,'rgb(106, 137, 247)'],
                    [0.5,'rgb(90, 120, 245)'], [0.6,'rgb(70, 100, 245)'],
                    [0.7,'rgb(40, 60, 190)'],[1,'rgb(5, 10, 172)']
                ],
                autocolorscale: false,
                reversescale: false,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.5
                    }
                },
                tick0: 0,
                zmin: 0,
                dtick: 0,
                colorbar: {
                    autotic: false,
                    tickprefix: '',
                    title: vm.plot.y_axis
                }
            }];
            // Plotly.newPlot(vm.plot.chart_no, data, layout, {showLink: false});
            Plotly.newPlot(vm.plot.chart_no, data, layout).then(function() {
                Plotly.addFrames(vm.plot.chart_no, map_data_result);
            });            
        }
    }
]);
