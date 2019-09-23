'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': '/static/bower_components/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': '/static/bower_components/chartjs/Chart.min.js',
        'ckeditor-plugin': '/static/bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['/static/bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['/static/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '/static/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['/static/bower_components/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['/static/bower_components/spectrum/spectrum.js', '/static/bower_components/spectrum/spectrum.css'],
        'jcrop-plugin': ['/static/bower_components/Jcrop/js/jquery.Jcrop.min.js', '/static/bower_components/Jcrop/css/jquery.Jcrop.min.css'],
        
        //*** Service
        // 'loginApi': '/static/assets/js/service/loginApi.js',
        // 'orderApi': '/static/assets/js/service/orderApi.js',
        'productApi': '/static/assets/js/service/productApi.js',
        'companyApi': '/static/assets/js/service/companyApi.js',
		
        //*** Controllers
        'dashboardCtrl': '/static/assets/js/controllers/dashboardCtrl.js',
        'productCtrl': '/static/assets/js/controllers/product/productCtrl.js',
        'companyCtrl': '/static/assets/js/controllers/company/companyCtrl.js',
        // 'loginCtrl': '/static/assets/js/controllers/login/loginCtrl.js',

        'iconsCtrl': '/static/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': '/static/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': '/static/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': '/static/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': '/static/assets/js/controllers/ngTableCtrl.js',
        'cropCtrl': '/static/assets/js/controllers/cropCtrl.js',
        'asideCtrl': '/static/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': '/static/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': '/static/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': '/static/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': '/static/assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': '/static/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': '/static/assets/js/controllers/nestableCtrl.js',
        'validationCtrl': ['/static/assets/js/controllers/validationCtrl.js'],
        'userCtrl': ['/static/assets/js/controllers/userCtrl.js'],
        'selectCtrl': '/static/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': '/static/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': '/static/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': '/static/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': '/static/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': '/static/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': '/static/assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': '/static/assets/js/controllers/dynamicTableCtrl.js',
        'notificationIconsCtrl': '/static/assets/js/controllers/notificationIconsCtrl.js',
        'dateRangeCtrl': '/static/assets/js/controllers/daterangeCtrl.js',
        'notifyCtrl': '/static/assets/js/controllers/notifyCtrl.js',
        'sliderCtrl': '/static/assets/js/controllers/sliderCtrl.js',
        'knobCtrl': '/static/assets/js/controllers/knobCtrl.js',
        'crop2Ctrl': '/static/assets/js/controllers/crop2Ctrl.js',
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['/static/bower_components/AngularJS-Toaster/toaster.js', '/static/bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['/static/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '/static/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['/static/bower_components/ng-table/dist/ng-table.min.js', '/static/bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.mask',
        files: ['/static/bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['/static/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '/static/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['/static/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['/static/bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['/static/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['/static/bower_components/angular-chart.js/dist/angular-chart.min.js', '/static/bower_components/angular-chart.js/dist/angular-chart.min.css']
    }, {
        name: 'flow',
        files: ['/static/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['/static/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['/static/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '/static/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['/static/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['/static/bower_components/ng-notify/dist/ng-notify.min.js', '/static/bower_components/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['/static/bower_components/angular-xeditable/dist/js/xeditable.min.js', '/static/bower_components/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['/static/bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['/static/bower_components/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['/static/bower_components/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['/static/bower_components/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['/static/bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});