'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise('/app/dashboard');
        //
        // Set up the states
        $stateProvider.state('app', {
            url: '/app',
            templateUrl: 'static/assets/views/app.html',
            resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
            abstract: true
        }).state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'static/assets/views/dashboard/dashboard.html',
            resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
        }).state('app.register', {
            url: '/dashboard',
            templateUrl: 'static/assets/views/register/register.html',
        }).state('app.product', {
            url: '/product',
            templateUrl: '/static/assets/views/product/product.html',
            resolve: loadSequence('ngTable', 'productCtrl', 'productApi')
        }).state('app.company', {
            url: '/company',
            templateUrl: '/static/assets/views/company/company.html',
            resolve: loadSequence('ngTable', 'companyCtrl', 'companyApi')
            // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            // title: 'register',
            // ncyBreadcrumb: {
            //     label: 'Dashboard'
            // }
            // }).state('app.pagelayouts', {
            //     url: '/ui',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'Page Layouts',
            //     ncyBreadcrumb: {
            //         label: 'Page Layouts'
            //     }
            // }).state('app.pagelayouts.fixedheader', {
            //     url: "/fixed-header",
            //     templateUrl: "static/assets/views/dashboard-2.html",
            //     resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            //     title: 'Fixed Header',
            //     ncyBreadcrumb: {
            //         label: 'Fixed Header'
            //     },
            //     controller: function ($scope) {
            //         $scope.setLayout();
            //         $scope.app.layout.isNavbarFixed = true;
            //     }
            // }).state('app.pagelayouts.fixedsidebar', {
            //     url: "/fixed-sidebar",
            //     templateUrl: "static/assets/views/dashboard-3.html",
            //     resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            //     title: 'Fixed Sidebar',
            //     ncyBreadcrumb: {
            //         label: 'Fixed Sidebar'
            //     },
            //     controller: function ($scope) {
            //         $scope.setLayout();
            //         $scope.app.layout.isSidebarFixed = true;
            //     }
            // }).state('app.pagelayouts.fixedheadersidebar', {
            //     url: "/fixed-header-and-sidebar",
            //     templateUrl: "static/assets/views/dashboard-4.html",
            //     resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            //     title: 'Fixed Header &amp; Sidebar',
            //     ncyBreadcrumb: {
            //         label: 'Fixed Header & Sidebar'
            //     },
            //     controller: function ($scope) {
            //         $scope.setLayout();
            //         $scope.app.layout.isSidebarFixed = true;
            //         $scope.app.layout.isNavbarFixed = true;
            //     }
            // }).state('app.pagelayouts.fixedfooter', {
            //     url: "/fixed-footer",
            //     templateUrl: "static/assets/views/dashboard-5.html",
            //     resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
            //     title: 'Fixed Footer',
            //     ncyBreadcrumb: {
            //         label: 'Fixed Footer'
            //     },
            //     controller: function ($scope) {
            //         $scope.setLayout();
            //         $scope.app.layout.isFooterFixed = true;
            //     }
            // }).state('app.pagelayouts.boxedpage', {
            //     url: "/boxed-page",
            //     templateUrl: "static/assets/views/dashboard.html",
            //     resolve: loadSequence('dashboardCtrl', 'd3', 'ui.knob'),
            //     title: 'Boxed Page',
            //     ncyBreadcrumb: {
            //         label: 'Boxed Page'
            //     }
            // }).state('app.layouts', {
            //     url: "/layouts",
            //     templateUrl: "static/assets/views/layouts.html",
            //     title: 'Layouts',
            //     ncyBreadcrumb: {
            //         label: 'Layouts'
            //     }
            // }).state('app.ui', {
            //     url: '/ui',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'UI Elements',
            //     ncyBreadcrumb: {
            //         label: 'UI Elements'
            //     }
            // }).state('app.ui.elements', {
            //     url: '/elements',
            //     templateUrl: "static/assets/views/ui_elements.html",
            //     title: 'Elements',
            //     icon: 'ti-layout-media-left-alt',
            //     ncyBreadcrumb: {
            //         label: 'Elements'
            //     }
            // }).state('app.ui.buttons', {
            //     url: '/buttons',
            //     templateUrl: "static/assets/views/ui_buttons.html",
            //     title: 'Buttons',
            //     resolve: loadSequence('laddaCtrl'),
            //     ncyBreadcrumb: {
            //         label: 'Buttons'
            //     }
            // }).state('app.ui.links', {
            //     url: '/links',
            //     templateUrl: "static/assets/views/ui_links.html",
            //     title: 'Link Effects',
            //     ncyBreadcrumb: {
            //         label: 'Link Effects'
            //     }
            // }).state('app.ui.icons', {
            //     url: '/icons',
            //     templateUrl: "static/assets/views/ui_icons.html",
            //     title: 'Font Awesome Icons',
            //     ncyBreadcrumb: {
            //         label: 'Font Awesome Icons'
            //     },
            //     resolve: loadSequence('iconsCtrl')
            // }).state('app.ui.lineicons', {
            //     url: '/line-icons',
            //     templateUrl: "static/assets/views/ui_line_icons.html",
            //     title: 'Linear Icons',
            //     ncyBreadcrumb: {
            //         label: 'Linear Icons'
            //     },
            //     resolve: loadSequence('iconsCtrl')
            // }).state('app.ui.lettericons', {
            //     url: '/letter-icons',
            //     templateUrl: "static/assets/views/ui_letter_icons.html",
            //     title: 'Letter Icons',
            //     ncyBreadcrumb: {
            //         label: 'Letter Icons'
            //     }
            // }).state('app.ui.modals', {
            //     url: '/modals',
            //     templateUrl: "static/assets/views/ui_modals.html",
            //     title: 'Modals',
            //     ncyBreadcrumb: {
            //         label: 'Modals'
            //     },
            //     resolve: loadSequence('asideCtrl')
            // }).state('app.ui.toggle', {
            //     url: '/toggle',
            //     templateUrl: "static/assets/views/ui_toggle.html",
            //     title: 'Toggle',
            //     ncyBreadcrumb: {
            //         label: 'Toggle'
            //     }
            // }).state('app.ui.tabs_accordions', {
            //     url: '/accordions',
            //     templateUrl: "static/assets/views/ui_tabs_accordions.html",
            //     title: "Tabs & Accordions",
            //     ncyBreadcrumb: {
            //         label: 'Tabs & Accordions'
            //     },
            //     resolve: loadSequence('vAccordionCtrl')
            // }).state('app.ui.panels', {
            //     url: '/panels',
            //     templateUrl: "static/assets/views/ui_panels.html",
            //     title: 'Panels',
            //     ncyBreadcrumb: {
            //         label: 'Panels'
            //     }
            // }).state('app.ui.notifications', {
            //     url: '/notifications',
            //     templateUrl: "static/assets/views/ui_notifications.html",
            //     title: 'Notifications',
            //     ncyBreadcrumb: {
            //         label: 'Notifications'
            //     },
            //     resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl', 'notificationIconsCtrl', 'notifyCtrl', 'ngNotify')
            // }).state('app.ui.sliders', {
            //     url: '/sliders',
            //     templateUrl: "static/assets/views/ui_sliders.html",
            //     title: 'Sliders',
            //     ncyBreadcrumb: {
            //         label: 'Sliders'
            //     },
            //     resolve: loadSequence('sliderCtrl')
            // }).state('app.ui.treeview', {
            //     url: '/treeview',
            //     templateUrl: "static/assets/views/ui_tree.html",
            //     title: 'TreeView',
            //     ncyBreadcrumb: {
            //         label: 'Treeview'
            //     },
            //     resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
            // }).state('app.ui.knob', {
            //     url: '/knob',
            //     templateUrl: "static/assets/views/ui_knob.html",
            //     title: 'Knob component',
            //     ncyBreadcrumb: {
            //         label: 'Knob component'
            //     },
            //     resolve: loadSequence('d3', 'ui.knob', 'knobCtrl')
            // }).state('app.ui.media', {
            //     url: '/media',
            //     templateUrl: "static/assets/views/ui_media.html",
            //     title: 'Media',
            //     ncyBreadcrumb: {
            //         label: 'Media'
            //     }
            // }).state('app.ui.nestable', {
            //     url: '/nestable2',
            //     templateUrl: "static/assets/views/ui_nestable.html",
            //     title: 'Nestable List',
            //     ncyBreadcrumb: {
            //         label: 'Nestable List'
            //     },
            //     resolve: loadSequence('jquery-nestable-plugin', 'ng-nestable', 'nestableCtrl')
            // }).state('app.ui.typography', {
            //     url: '/typography',
            //     templateUrl: "static/assets/views/ui_typography.html",
            //     title: 'Typography',
            //     ncyBreadcrumb: {
            //         label: 'Typography'
            //     }
            // }).state('app.table', {
            //     url: '/table',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'Tables',
            //     ncyBreadcrumb: {
            //         label: 'Tables'
            //     }
            // }).state('app.table.basic', {
            //     url: '/basic',
            //     templateUrl: "static/assets/views/table_basic.html",
            //     title: 'Basic Tables',
            //     ncyBreadcrumb: {
            //         label: 'Basic'
            //     }
            // }).state('app.table.responsive', {
            //     url: '/responsive',
            //     templateUrl: "static/assets/views/table_responsive.html",
            //     title: 'Responsive Tables',
            //     ncyBreadcrumb: {
            //         label: 'Responsive'
            //     }
            // }).state('app.table.dynamic', {
            //     url: '/dynamic',
            //     templateUrl: "static/assets/views/table_dynamic.html",
            //     title: 'Dynamic Tables',
            //     ncyBreadcrumb: {
            //         label: 'Dynamic'
            //     },
            //     resolve: loadSequence('dynamicTableCtrl')
            // }).state('app.table.data', {
            //     url: '/data',
            //     templateUrl: "static/assets/views/table_data.html",
            //     title: 'ngTable',
            //     ncyBreadcrumb: {
            //         label: 'ngTable'
            //     },
            //     resolve: loadSequence('ngTable', 'ngTableCtrl')
            // }).state('app.table.export', {
            //     url: '/export',
            //     templateUrl: "static/assets/views/table_export.html",
            //     title: 'Table'
            // }).state('app.form', {
            //     url: '/form',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'Forms',
            //     ncyBreadcrumb: {
            //         label: 'Forms'
            //     }
            // }).state('app.form.elements', {
            //     url: '/elements',
            //     templateUrl: "static/assets/views/form_elements.html",
            //     title: 'Forms Elements',
            //     ncyBreadcrumb: {
            //         label: 'Elements'
            //     },
            //     resolve: loadSequence('monospaced.elastic', 'ui.mask', 'touchspin-plugin', 'selectCtrl')
            // }).state('app.form.pickers', {
            //     url: '/pickers',
            //     templateUrl: "static/assets/views/form_pickers.html",
            //     title: 'Pickers',
            //     ncyBreadcrumb: {
            //         label: 'Pickers'
            //     },
            //     resolve: loadSequence('dateRangeCtrl', 'spectrum-plugin', 'angularSpectrumColorpicker')
            // }).state('app.form.xeditable', {
            //     url: '/xeditable',
            //     templateUrl: "static/assets/views/form_xeditable.html",
            //     title: 'Angular X-Editable',
            //     ncyBreadcrumb: {
            //         label: 'X-Editable'
            //     },
            //     resolve: loadSequence('xeditable', 'checklist-model', 'xeditableCtrl')
            // }).state('app.form.texteditor', {
            //     url: '/editor',
            //     templateUrl: "static/assets/views/form_text_editor.html",
            //     title: 'Text Editor',
            //     ncyBreadcrumb: {
            //         label: 'Text Editor'
            //     },
            //     resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
            // }).state('app.form.wizard', {
            //     url: '/wizard',
            //     templateUrl: "static/assets/views/form_wizard.html",
            //     title: 'Form Wizard',
            //     ncyBreadcrumb: {
            //         label: 'Wizard'
            //     },
            //     resolve: loadSequence('wizardCtrl', 'ngNotify')
            // }).state('app.form.validation', {
            //     url: '/validation',
            //     templateUrl: "static/assets/views/form_validation.html",
            //     title: 'Form Validation',
            //     ncyBreadcrumb: {
            //         label: 'Validation'
            //     },
            //     resolve: loadSequence('validationCtrl')
            // }).state('app.form.cropping', {
            //     url: '/image-cropping',
            //     templateUrl: "static/assets/views/form_image_cropping.html",
            //     title: 'Image Cropping',
            //     ncyBreadcrumb: {
            //         label: 'Image Cropping'
            //     },
            //     resolve: loadSequence('ngImgCrop', 'cropCtrl', 'jcrop-plugin', 'crop2Ctrl')
            // }).state('app.form.upload', {
            //     url: '/file-upload',
            //     templateUrl: "static/assets/views/form_file_upload.html",
            //     title: 'Multiple File Upload',
            //     ncyBreadcrumb: {
            //         label: 'File Upload'
            //     },
            //     resolve: loadSequence('angularFileUpload', 'uploadCtrl')
            // }).state('app.pages', {
            //     url: '/pages',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'Pages',
            //     ncyBreadcrumb: {
            //         label: 'Pages'
            //     }
            // }).state('app.pages.user', {
            //     url: '/user',
            //     templateUrl: "static/assets/views/pages_user_profile.html",
            //     title: 'User Profile',
            //     ncyBreadcrumb: {
            //         label: 'User Profile'
            //     },
            //     resolve: loadSequence('flow', 'userCtrl')
            // }).state('app.pages.invoice', {
            //     url: '/invoice',
            //     templateUrl: "static/assets/views/pages_invoice.html",
            //     title: 'Invoice',
            //     ncyBreadcrumb: {
            //         label: 'Invoice'
            //     }
            // }).state('app.pages.timeline', {
            //     url: '/timeline',
            //     templateUrl: "static/assets/views/pages_timeline.html",
            //     title: 'Timeline',
            //     ncyBreadcrumb: {
            //         label: 'Timeline'
            //     },
            //     resolve: loadSequence('ngMap')
            // }).state('app.pages.calendar', {
            //     url: '/calendar',
            //     templateUrl: "static/assets/views/pages_calendar.html",
            //     title: 'Calendar',
            //     ncyBreadcrumb: {
            //         label: 'Calendar'
            //     },
            //     resolve: loadSequence('mwl.calendar', 'calendarCtrl')
            // }).state('app.pages.messages', {
            //     url: '/messages',
            //     templateUrl: "static/assets/views/pages_messages.html",
            //     resolve: loadSequence('inboxCtrl')
            // }).state('app.pages.messages.inbox', {
            //     url: '/inbox/:inboxID',
            //     templateUrl: "static/assets/views/pages_inbox.html",
            //     controller: 'ViewMessageCrtl'
            // }).state('app.pages.blank', {
            //     url: '/blank',
            //     templateUrl: "static/assets/views/pages_blank_page.html",
            //     ncyBreadcrumb: {
            //         label: 'Starter Page'
            //     }
            // }).state('app.utilities', {
            //     url: '/utilities',
            //     template: '<div ui-view class="fade-in-up"></div>',
            //     title: 'Utilities',
            //     ncyBreadcrumb: {
            //         label: 'Utilities'
            //     }
            // }).state('app.utilities.search', {
            //     url: '/search',
            //     templateUrl: "static/assets/views/utility_search_result.html",
            //     title: 'Search Results',
            //     ncyBreadcrumb: {
            //         label: 'Search Results'
            //     }
            // }).state('app.utilities.pricing', {
            //     url: '/pricing',
            //     templateUrl: "static/assets/views/utility_pricing_table.html",
            //     title: 'Pricing Table',
            //     ncyBreadcrumb: {
            //         label: 'Pricing Table'
            //     }
            // }).state('app.maps', {
            //     url: "/maps",
            //     templateUrl: "static/assets/views/maps.html",
            //     resolve: loadSequence('ngMap', 'mapsCtrl'),
            //     title: "Maps",
            //     ncyBreadcrumb: {
            //         label: 'Maps'
            //     }
            // }).state('app.charts', {
            //     url: "/charts",
            //     templateUrl: "static/assets/views/charts.html",
            //     resolve: loadSequence('chartjs', 'chart.js', 'chartsCtrl'),
            //     title: "Charts",
            //     ncyBreadcrumb: {
            //         label: 'Charts'
            //     }


        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: 'static/assets/views/utility_404.html',
        }).state('error.500', {
            url: '/500',
            templateUrl: 'static/assets/views/utility_500.html',
        })
        .state('login', {
            url: '/login',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            abstract: true
        }).state('login.signin', {
            url: '/signin',
            // resolve: loadSequence('loginCtrl', 'loginApi'),
            templateUrl: '/static/assets/views/login/login_login.html'
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: 'static/assets/views/login_forgot.html'
        }).state('login.registration', {
            url: '/registration',
            resolve: loadSequence('registerCtrl', 'registerApi'),
            templateUrl: '/static/assets/views/register/login_registration.html'
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: 'static/assets/views/login_lock_screen.html'
        })

        // Landing Page route
            .state('landing', {
	    url: '/landing-page',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true,
	    resolve: loadSequence('jquery-appear-plugin', 'ngAppear', 'countTo')
            }).state('landing.welcome', {
	    url: '/welcome',
	    templateUrl: 'static/assets/views/landing_page.html'
            });
        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
                    }]
            };
        }
    }
]);