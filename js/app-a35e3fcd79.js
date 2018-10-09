'use strict';

/**
 * @ngdoc overview
 * @name wApp
 * @description
 * # wApp
 *
 * Main module of the application.
 */
angular.module('deep-diff',[]).factory('_deep', ["$window", function ($window) {
    return $window.DeepDiff;
}]);

angular
    .module('adminPanel', [
        //'ngAnimate',
        //'ngCookies',
        'ckEditorDirective',
        'ngResource',
        'dndLists',
        //'ngRoute',
        //'ngSanitize',
        'ui.bootstrap',
        //'ngTouch',
        'ngNotify',
        'multipleSelect',
        'treeGrid',
        'ngFileUpload',
        'ngTagsInput',
        'ui.mask',
        'deep-diff',
        'angularUtils.directives.dirPagination',
        'ui.router',
        'satellizer',
        'angular.filter',
        'angular-loading-bar',
        'mm.acl',
        'ngJalaaliFlatDatepicker',
        'interactDirective',
        'angular-js-xlsx',
        'angular-barcode',
        //'colorpicker.module',
        'packDirective',
        'colorpicker.module'
        // 'uiGmapgoogle-maps'
        // 'chart.js'
    ]);

angular.module('adminPanel').directive("fileread", [
    function() {
        return {
            scope: {
                fileread: "=",
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]);

angular.module('adminPanel').filter('jalaliDate', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        //return date.fromNow() + " " + date.format(format);
        return date.format(format);
    }
});
angular.module('adminPanel').filter('range', ["$filter", function($filter) {
    return function(input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i=min; i<max; i++)
            input.push({
                id:i,
                name:$filter('persian')(i)
            });
        return input;
    };
}]);
angular.module('adminPanel').filter('persian', function () {
    return function (inputNumber) {
        //console.log(inputNumber);
        if (inputNumber ||inputNumber===0)
            return persianJs(inputNumber.toString()).englishNumber().toString();
    }
});
angular.module('adminPanel').directive('bahmanGrid', ["AclService", "$http", function (AclService,$http) {
    return {
        restrict:'EA',
        //require: '^data',
        scope:{
            data:"=data",
            theads:'=theads',
            detailRows:'=detailRows',
            entries:'=entries',
            showEntries:'=showEntries',
            currentPage:"=currentPage",
            totalItem:'=totalItem',
            button:'=button',
            headerTitle:'=headerTitle',
            packHeader:"=packHeader",
            detailSearch:"=",
            stocks:"=stocks",
            couriers:"=couriers",
            counts:"=counts",
            permissionGroups:"=permissionGroups",
            sendTypes:"=sendTypes",
            selectAllCheckBox:"=selectAllCheckBox",
            orderLevels:"=orderLevels",

            loadAll:"&",
            createNew:"&",
            findById:"&",
            rejectProduct:"&",
            importFromCsv:"&",
            confirmAll:"&",
            selectAll:"&",
            blindConfirm:"&",
            deleteById:"&",
            getValueOfAttribute:"&",
            getItemOfTableById:"&",
            changeDiscountState:"&",
            addToDiscount:"&",
            addToPack:"&",
            addToCampaign:"&",
            selectAllProduct:"&",
            deleteProduct:"&",
            restoreAll:"&",
            showBarcode:"&",
            getProductsById:"&",
            addProductToPrice:"&",
            addToCategory:"&",
            showProductPack:"&",
            changePackHeader:"&",
            showProductDiscount:"&",
            openOrder:"&",
            createLinkedProduct:"&",
            assignOrder:"&",
            collectOrder:"&",
            checkProduct:"&",
            sendOrder:"&",
            printBahook:"&",
            printPost:"&",
            removeLinkedProduct:"&",
            collectProduct:"&collectProduct",
            assignOrderToCourier:"&assignOrderToCourier",
            assignOrdersToCourier:"&assignOrdersToCourier",
            sendOrders:"&sendOrders",
            selectAllOrder:"&selectAllOrder",
            polling:"&polling",
            removePoll:"&removePoll",
            removePackage:"&removePackage",
            linkSelectedProducts:"&linkSelectedProducts",
            insertToCampaign:"&insertToCampaign",
            setdatereadyforPost:"&setdatereadyforPost",
            postSettings:"&postSettings",
            questionPost:"&questionPost",
            export:"&export",
            readyOrderForSend:"&readyOrderForSend",
            readyOrdersForSend:"&readyOrdersForSend",
            printReceipt:"&printReceipt",
            showQueries:"&showQueries",
            updateQueries:"&updateQueries",
            removeQuery:"&removeQuery",
            collectOrders:"&collectOrders",
            increase:"&increase"
        },
        templateUrl:'/views/directive/bahman-grid.html',
        link: function (scope,element,attr) {

            scope.getExcel=function () {
                console.log(1);
                var ws = XLSX.utils.json_to_sheet(
                    scope.data,
                    {
                        header:scope.theads.map(function (item) {
                            return item.name;
                        })
                    });

                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "unknown");

                /* generate an XLSX file */
                XLSX.writeFile(wb, "ئنل ورود اطلاعات.xlsx");
            }

            scope.campaign=false;
            scope.can = AclService.can;
            scope.temp=[];

            scope.toggle=function (item) {
                console.log(item);
                scope.campaign=!item;
            };

            scope.datepickerConfig = {
                //allowFuture: false,
                dateFormat: 'YYYY-MM-DD'
                //gregorianDateFormat: 'YYYY/DD/MM'
                //minDate: moment.utc('2008', 'YYYY')
            };

            scope.loadLoadAll= function () {
                setTimeout(function () {
                    scope.loadAll();

                },100);
            };
            scope.changeEntries= function (count) {
                //console.log(count);
                scope.showEntries=count;
                scope.loadLoadAll();
                //scope.findById({id:31811});
                //scope.loadAll();
            };
            scope.onSearchInputKeyPress= function (event) {
                if(event.charCode==13){
                    //$scope.searchProduct(value);
                    scope.loadAll();
                }
            };
            scope.isDateValid= function (start, end) {
                return moment().isBetween(start, end);
            };
            scope.isDateValid();
            scope.onDropDownChange= function () {
                scope.loadAll();
            };
            scope.sort= function (index) {

                if(scope.theads[index].sortable){
                    //console.log(index);
                    if(scope.theads[index].sorting==null){
                        scope.theads[index].sorting=0;
                    }
                    //console.log(scope.theads[index]);
                    scope.theads.forEach(function (item,i) {
                        if(i==index){
                            if(scope.theads[index].sorting=='DESC'){
                                scope.theads[index].sorting='ASC';
                            }else {
                                scope.theads[index].sorting='DESC';
                            }

                        }else {
                            item.sorting=null;
                        }
                    });
                    scope.loadAll();
                }
            };
            scope.getItemOfTableById= function (table, value) {
                if(scope.temp[table]==undefined){//if table not set set it and child
                    scope.temp[table]={};
                    scope.temp[table][value]="";
                }else if(scope.temp[table][value]==undefined){//if child not set ,set it
                    scope.temp[table][value]="";
                }else if(scope.temp[table][value]!=undefined){//if both set return
                    return ;
                }
                //get table item
                $http.post('/admin/api/getItemOfTableById',{
                    item:[table,value]
                },{cache:true}).then(function (response) {
                    scope.temp[table][value]=response.data;
                });
            };
        }
    }
}]);

// angular.module('adminPanel').config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//     GoogleMapApi.configure({
//         //  key: 'your api key',
//         //    v: '3.20',
//         libraries: 'places'
//     });
// }])

angular.module('adminPanel').config(["AclServiceProvider", "$locationProvider", "$stateProvider", "$urlRouterProvider", "$authProvider", "$httpProvider", "$provide", function (AclServiceProvider,$locationProvider,$stateProvider, $urlRouterProvider,$authProvider,$httpProvider,$provide) {
    //now i am tired and cant learn
    redirectWhenLoggedOut.$inject = ["$q", "$injector"];
    var myConfig = {
        storage: 'localStorage',
        storageKey: 'AppAcl'
    };
    AclServiceProvider.config(myConfig);
    function redirectWhenLoggedOut($q, $injector) {

        return {

            responseError: function(rejection) {

                // Need to use $injector.get to bring in $state or else we get
                // a circular dependency error
                var $state = $injector.get('$state');

                // Instead of checking for a status code of 400 which might be used
                // for other reasons in Laravel, we check for the specific rejection
                // reasons to tell us if we need to redirect to the login state
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                // Loop through each rejection reason and redirect to the login
                // state if one is encountered
                angular.forEach(rejectionReasons, function(value, key) {

                    if(rejection.data && rejection.data.error === value) {

                        // If we get a rejection corresponding to one of the reasons
                        // in our array, we know we need to authenticate the user so
                        // we can remove the current user from local storage
                        localStorage.removeItem('user');

                        // Send the user to the auth state so they can login
                        $state.go('auth');
                    }
                });

                return $q.reject(rejection);
            }
        }
    }

    // Setup for the $httpInterceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');
    $urlRouterProvider.otherwise('/auth');
    $authProvider.loginUrl = '/admin/api/authenticate';
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
    $stateProvider
        .state('printInvoice',{
            url:'/printInvoice',

            views:{
                'print':{
                    controller:'printInvoiceController',
                    templateUrl:'/views/orders/printInvoice.html'
                },
                params: {
                    'order':0,
                    'products':0,
                    'productCount':0,
                    'discountValue':0,
                    'totalPayment':0,
                    'period':0
                }
            }
        })
        .state('auth',{
            url:'/auth',
            controller:'authController',
            views:{
                'main':{
                    templateUrl:'/views/auth/auth.html',
                    controller:'authController'
                }
            }
        })
        .state('printPostInvoice',{
            url:'/printPostInvoice?q',
            controller:'printPostInvoiceController',
            views:{
                'main':{
                    templateUrl:'/views/print/printPostInvoiceController.html',
                    controller:'printPostInvoiceController'
                }
            }
        })
        .state('printSummaryPostInvoice',{
            url:'/printSummaryPostInvoice?q',
            controller:'printSummaryPostInvoiceController',
            views:{
                'main':{
                    templateUrl:'/views/print/printSummaryPostInvoiceController.html',
                    controller:'printSummaryPostInvoiceController'
                }
            }
        })
        .state('printOrderReceipt',{
            url:'/printOrderReceipt.js?q',
            controller:'printOrderReceiptController',
            views:{
                'main':{
                    templateUrl:'/views/print/printOrderReceipt.html',
                    controller:'printOrderReceiptController'
                }
            }
        })
        .state('printA4Order',{
            url:'/printA4Order.js?q',
            controller:'printA4OrderController',
            views:{
                'main':{
                    templateUrl:'/views/print/printA4Order.html',
                    controller:'printA4OrderController'
                }
            }
        })
        .state('printCollectingPaper',{
            url:'/printCollectingPaper.js?q',
            controller:'printCollectingPaperController',
            views:{
                'main':{
                    templateUrl:'/views/print/printCollectingPaper.html',
                    controller:'printCollectingPaperController'
                }
            }
        })
        .state('dashboard',{
            url:'/',
            controller:'dashboardController',
            views:{
                'header':{
                    templateUrl:'/views/shared/main-header.html',
                    controller:'dashboardController'
                },
                'sidebar':{
                    templateUrl:'/views/shared/main-sidebar.html',
                    controller:'sidebarController'
                },
                'footer':{
                    templateUrl:'/views/shared/main-footer.html'
                },
                'main':{
                    templateUrl:'/views/dashboard/main.html',
                    controller:'dashboardController'
                },
                'control-sidebar':{
                    templateUrl:'/views/shared/control-sidebar.html',
                    controller:'dashboardController'
                }
            }
        })
        .state('dashboard.product',{
            url:'product',
            controller:'productController',
            templateUrl:'/views/product/main.html',
            params:{
                obj:null
            },
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("product_list")){
                        //console.log(1);
                        return true;
                    }else {
                        //$state.go('dashboard');
                        //console.log(1);
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.category',{
            url:'category',
            controller:'categoryController',
            templateUrl:'/views/category/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q,AclService) {
                    if(AclService.can("category_list")){
                        return true;
                    }else{
                        return $q.reject('Unauthorized')
                    }
                }]
            }
        })
        .state('dashboard.questionResult',{
            url:'questionResult',
            controller:'questionResultController',
            templateUrl:'/views/orders/questionResult.html'
        })
        .state('dashboard.attribute',{
            url:'attribute',
            controller:'attributeController',
            templateUrl:'/views/attribute/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("attribute_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.productLog',{
            url:'productLog?id',
            controller:'productLogController',
            templateUrl:'/views/productLog/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("product_log_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        //.state('dashboard.fieldLog',{
        //    url:'fieldLog',
        //    controller:'fieldLogController',
        //    templateUrl:'/views/fieldLog/main.html'
        //})
        .state('dashboard.userManagement',{
            url:'userManagement',
            controller:'userManagementController',
            templateUrl:'/views/userManagement/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("user_management")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.role',{
            url:'role',
            controller:'roleController',
            templateUrl:'/views/role/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("role_management")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.permission',{
            url:'permission',
            controller:'permissionController',
            templateUrl:'/views/permission/main.html'
        })
        .state('dashboard.point',{
            url:'point',
            controller:'pointController',
            templateUrl:'/views/point/main.html'
        })
        .state('dashboard.advanceSearch',{
            url:'advanceSearch',
            controller:'advanceSearchController',
            templateUrl:'/views/advanceSearch/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("advance_search")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.confirmProducts',{
            url:'confirmProducts?confirm',
            controller:'confirmProductsController',
            templateUrl:'/views/confirmProducts/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("confirm_product_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }

        })
        .state('dashboard.unConfirmProduct',{
            url:'unConfirmProduct',
            controller:'unConfirmProductController',
            templateUrl:'/views/unConfirmProduct/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("return_product")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.attributeTable',{
            url:'attributeTable',
            controller:'attributeTableController',
            templateUrl:'/views/attributeTable/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("attributeTable_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.menuOrder',{
            url:'menuOrder',
            controller:'menuOrderController',
            templateUrl:'/views/menuOrder/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("menu_order")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.menuPicture',{
            url:'menuPicture',
            controller:'menuPictureController',
            templateUrl:'/views/menuPicture/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("menu_picture")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.discount',{
            url:'discount',
            controller:'discountController',
            templateUrl:'/views/discount/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("discount_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.discountMethod',{
            url:'discountMethod',
            controller:'discountMethodController',
            templateUrl:'/views/discount/discountMethod.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("discount_method_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.discountType',{
            url:'discountType',
            controller:'discountTypeController',
            templateUrl:'/views/discount/discountType.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("discount_type_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.productPack',{
            url:'productPack',
            controller:'productPackController',
            templateUrl:'/views/productPack/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("pack_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.campaign',{
            url:'campaign',
            controller:'campaignController',
            templateUrl:'/views/campaign/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("campaign_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.deletedProduct',{
            url:'deletedProduct',
            controller:'deletedProductsController',
            templateUrl:'/views/deletedProducts/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("deleted_product_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.discountLog',{
            url:'discountLog',
            controller:'discountLogController',
            templateUrl:'/views/discount/discountLog.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("discount_log_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.prices',{
            url:'prices',
            controller:'pricesController',
            templateUrl:'/views/discount/prices.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("prices_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.skills',{
            url:'skills',
            controller:'skillsController',
            templateUrl:'/views/skills/main.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("skills_list")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.criticalTemplateList',{
            url:'criticalTemplateList',
            controller:'criticalTemplateController',
            templateUrl:'/views/criticalTemplate/main.html',
            //resolve:{
            //    'acl':['$q','AclService', function ($q, AclService) {
            //        if(AclService.can("prices_list")){
            //            return true;
            //        }else {
            //            return $q.reject('Unauthorized');
            //        }
            //    }]
            //}
        })
        .state('dashboard.recommendedPack',{
            url:'recommendedPack',
            controller:'recommendedPackController',
            templateUrl:'/views/productPack/recommendedPack.html',
            resolve:{
                'acl':['$q','AclService', function ($q, AclService) {
                    if(AclService.can("recommendedPack")){
                        return true;
                    }else {
                        return $q.reject('Unauthorized');
                    }
                }]
            }
        })
        .state('dashboard.orders',{
            url:'orders',
            controller:'ordersController',
            templateUrl:'/views/orders/main.html',
            //resolve:{
            //    'acl':['$q','AclService', function ($q, AclService) {
            //        if(AclService.can("prices_list")){
            //            return true;
            //        }else {
            //            return $q.reject('Unauthorized');
            //        }
            //    }]
            //}
        })

        .state('dashboard.orders.allOrders',{
            url:'/allOrders',
            views: {
                "allOrders": {
                    templateUrl: "/views/orders/allOrders.html",
                    controller:"allOrdersController"
                }
            }
        })
        .state('dashboard.orders.collecting',{
            url:'/collecting',
            views: {
                "collecting": {
                    templateUrl: "/views/orders/collecting.html",
                    controller:"collectingController"
                }
            }
        })
        .state('dashboard.orders.packingOrders',{
            url:'/packingOrders',
            views: {
                "packingOrders": {
                    templateUrl: "/views/orders/packing.html",
                    controller:"packingOrdersController"
                }
            }
        })
        .state('dashboard.orders.readyForSend',{
            url:'/readyForSend',
            views: {
                "readyForSend": {
                    templateUrl: "/views/orders/readyForSend.html",
                    controller:"readyForSendController"
                }
            }
        })
        .state('dashboard.orders.sendOrders',{
            url:'/sendOrders',
            views: {
                "sendOrders": {
                    templateUrl: "/views/orders/sendOrders.html",
                    controller:"sendOrdersController"
                }
            }
        })
        .state('dashboard.orders.ordersPoll',{
            url:'/ordersPoll',
            views: {
                "ordersPoll": {
                    templateUrl: "/views/orders/ordersPoll.html",
                    controller:"ordersPollController"
                }
            }
        })
        .state('dashboard.orders.hamkaranOrder',{
            url:'/hamkaranOrder',
            views: {
                "hamkaranOrder": {
                    templateUrl: "/views/orders/hamkaranOrder.html",
                    controller:"hamkaranOrderController"
                }
            }
        })
        .state('dashboard.sendType',{
            url:'sendType',
            templateUrl: "/views/orders/sendType.html",
            controller:"sendTypeController"

        })
        .state('dashboard.ordersForManager',{
            url:'ordersForManager',
            controller:'ordersForManagerController',
            templateUrl:'/views/ordersForManager/main.html',
        })
        .state('dashboard.couriers',{
            url:'couriers',
            controller:'couriersController',
            templateUrl:'/views/couriers/main.html',
        })
        .state('dashboard.stocks',{
            url:'stocks',
            controller:'stocksController',
            templateUrl:'/views/orders/stock.html',
        })
        .state('dashboard.pollQuestions',{
            url:'pollQuestions',
            controller:'pollQuestionsController',
            templateUrl:'/views/orders/pollQuestions.html',
        })
        .state('dashboard.packages',{
            url:'packages',
            controller:'packagesController',
            templateUrl:'/views/orders/packages.html',
        })
        .state('dashboard.ordersForManager.allOrdersForManager',{
            url:'/allOrdersForManager',
            views: {
                "allOrdersForManager": {
                    templateUrl: "/views/ordersForManager/allOrdersForManager.html",
                    controller:"allOrdersForManagerController"
                }
            }
        })
        .state('dashboard.activateForeignStock',{
            url:'activateForeignStock',
            templateUrl: "/views/activateForeignStock/main.html",
            controller:"activateForeignStockController",
        })
        .state('dashboard.deactivateForeignStock',{
            url:'deactivateForeignStock',
            controller:'deactivateForeignStockController',
            templateUrl:"/views/deactivateForeignStock/main.html",
        })
        .state('dashboard.elasticSearch',{
            url:'elasticSearch',
            controller:'elasticSearchController',
            templateUrl:"/views/elasticSearch/main.html",
        })
        .state('dashboard.statistic',{
            url:'statistic',
            controller:'statisticController',
            templateUrl:"/views/statistic/main.html",
        });
}]);

angular.module('adminPanel').run(['$rootScope','$state','$http', function ($rootScope, $state,$http) {

    $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
        console.log(1);
        if(error === "Unauthorized"){
            $state.go('dashboard');
        }
    });

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams, error) {

        $http.pendingRequests.forEach(function(request) {
            if (request.cancel) {
                request.cancel.resolve();
            }
        });

    })
}]);

angular.module('adminPanel').run(['AclService','$http','getUnConfirmProductCount','getRejectedProduct',"getUnConfirmEditedProduct","getGostareshProduct",'getDeletedProducts', function (AclService,$http,getUnConfirmProductCount,getRejectedProduct,getUnConfirmEditedProduct,getGostareshProduct,getDeletedProducts) {
    //console.log(1);
    getUnConfirmProductCount.count();
    getRejectedProduct.count();
    getUnConfirmEditedProduct.count();
    getGostareshProduct.count();
    getDeletedProducts.count();
    if(!AclService.resume()){
        $http.get('/admin/api/getAllWithPermission').then(function (response) {
            //console.log(response.data);
            var acl={};
            for(var i=0;i<response.data.length;i++){

                acl[response.data[i].name]= response.data[i].permissions.map(function (item) {
                    return item.name;
                });
            }
            //AclService.flushRoles();
            //var userRole=JSON.parse(localStorage.getItem('user')).roles;
            //if (userRole){
            //    for(var i=0;i<userRole.length;i++){
            //        AclService.attachRole(userRole[i].name);
            //    }
            //}
            //console.log(localStorage.getItem('user'));
            //AclService.flushRoles();
            AclService.setAbilities(acl);

            //console.log(JSON.parse(localStorage.user).id);
        });
    }
}]);
angular.module('adminPanel').service('getUnConfirmProductCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/getUnConfirmProductCount')
            .then(function (response) {
                $rootScope.confirmProductCount=response.data;
            }, function (response) {
                console.warn(response);
            })
    }
}]);
angular.module('adminPanel').service('getRejectedProduct', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/getRejectedProductCount')
            .then(function (response) {
                $rootScope.rejectedProduct=response.data;
            }, function (response) {
                console.warn(response);
            })
    }
}]);
angular.module('adminPanel').service('getUnConfirmEditedProduct', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/getUnConfirmEditedProductCount')
            .then(function (response) {
                $rootScope.unConfirmEditedProduct=response.data;
            }, function (response) {
                console.warn(response);
            })
    }
}]);
angular.module('adminPanel').service('getGostareshProduct', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/getGostareshProductCount')
            .then(function (response) {
                $rootScope.gostareshProduct=response.data;
            }, function (response) {
                console.warn(response);
            })
    }
}]);

angular.module('adminPanel').service('getDeletedProducts', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/getDeletedProductCount')
            .then(function (response) {
                $rootScope.deletedProduct=response.data;
            }, function (response) {
                console.warn(response);
            })
    }
}]);

//angular.module('adminPanel').config( function ($httpProvider) {
//
//    $httpProvider.interceptors.push(
//        function ($q, $rootScope) {
//            return {
//                'request': function (config) {
//                    $rootScope.$broadcast('loading-started');
//                    return config || $q.when(config);
//                },
//                'response': function (response) {
//                    $rootScope.$broadcast('loading-complete');
//                    return response || $q.when(response);
//                }
//            };
//        });
//});
//
//angular.module('adminPanel').directive("loadingIndicator", function () {
//    return {
//        restrict : "A",
//        template: "<div id='loader'></div>",
//        link : function (scope, element, attrs) {
//            element.css({"display" : "none"});
//            scope.$on("loading-started", function (e) {
//                element.css({"display" : ""});
//            });
//            scope.$on("loading-complete", function (e) {
//                element.css({"display" : "none"});
//            });
//        }
//    };
//});

//angular.module('adminPanle').filter('date', function () {
//    return function (input) {
//        return new Date(input*1000);
//    }
//})

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

angular.module('adminPanel').directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return value;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

angular.module('adminPanel').directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return value;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});

angular.module('adminPanel').directive('nameValidator', function () {
    return {
        restrict:'A',
        link: function (scope,elem,attr,ctrl) {
            scope.$watch(attr.fName, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            scope.$watch(attr.lName, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var validator= function () {
                ctrl.$setValidity('nameValidator',attr.fName.length+attr.lName.length>0);
            };
            ctrl.$parsers.push(validator);
            ctrl.$formatters.push(validator);
        }
    }
});

angular.module('adminPanel').directive('linkedAttributes', function () {
    return {
        restrict:'A',
        require: 'ngModel',
        scope:{
            attributes:"=",
            field:"=",
            modelArr : '=ngModel'
        },
        link: function (scope,elem,attr,ctrl) {

            //listen to change of value for select and table fields .other automaticlly detected
            scope.$watch("field.value", function () {
                if(scope.modelArr.length==0 ||!scope.attributes || scope.field.is_linked_attribute!=1){
                    ctrl.$setValidity('linkedAttributes', true);

                }else{
                    if(scope.field.type==13){
                        var values=scope.modelArr.map(function (item) {
                            return item.id
                        });
                        for(var i=0;i<values.length;i++){
                            if(scope.attributes.filter(function (attribute) {
                                    return attribute.attribute_id==scope.field.attribute_id;
                                }).map(function (attribute) {
                                    return Number(attribute.value);
                                }).includes(values[i])){
                                ctrl.$setValidity('linkedAttributes',false);
                                break;
                            }else{
                                ctrl.$setValidity('linkedAttributes',true);
                            }

                        }
                    }else if(scope.field.type==3){
                        var values=scope.modelArr;
                        for(var i=0;i<values.length;i++){
                            if(scope.attributes.filter(function (attribute) {
                                    return attribute.attribute_id==scope.field.attribute_id;
                                }).map(function (attribute) {
                                    return attribute.value;
                                }).includes(values[i])){
                                ctrl.$setValidity('linkedAttributes',false);
                                break;
                            }else{
                                ctrl.$setValidity('linkedAttributes',true);
                            }
                        }
                    }


                }
                ctrl.$setViewValue(ctrl.$viewValue);
            },true);

            var duplicateValidator= function (value) {
                if (isEmpty(value) || !scope.attributes || scope.field.is_linked_attribute!=1) {
                    ctrl.$setValidity('linkedAttributes', true);
                    return value;
                }
                else {
                    ctrl.$setValidity('linkedAttributes',! scope.attributes.filter(function (attribute) {
                        return attribute.attribute_id==scope.field.attribute_id;
                    }).map(function (attribute) {
                        return attribute.value;
                    }).includes(value));

                    return value;

                }
            };
            ctrl.$parsers.push(duplicateValidator);
            ctrl.$formatters.push(duplicateValidator);
        }
    }
});

CKEDITOR.plugins.add( 'hcard', {
    requires: 'widget',

    init: function( editor ) {
        editor.widgets.add( 'hcard', {
            allowedContent: 'span(!h-card); a[href](!u-email,!p-name); span(!p-tel)',
            requiredContent: 'span(h-card)',
            pathName: 'hcard',

            upcast: function( el ) {
                return el.name == 'span' && el.hasClass( 'h-card' );
            }
        } );

        // This feature does not have a button, so it needs to be registered manually.
        editor.addFeature( editor.widgets.registered.hcard );

        // Handle dropping a contact by transforming the contact object into HTML.
        // Note: All pasted and dropped content is handled in one event - editor#paste.
        editor.on( 'paste', function( evt ) {
            var contact = evt.data.dataTransfer.getData( 'contact' );
            if ( !contact ) {
                return;
            }
            // if(contact.type="image"){
            //     console.log(1);
            //     evt.data.dataValue = '<span tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_inline cke_widget_image cke_image_nocaption" data-cke-display-name="تصویر" data-cke-widget-id="1" role="region" aria-label=" تصویر widget" style="float: left;"><img alt="" height="299" data-cke-saved-src="/image/about/files/%7B%7Bimage.productId%7D%7D/photos%20back%20cover/1/lg.jpg" src="/image/about/files/%7B%7Bimage.productId%7D%7D/photos%20back%20cover/1/lg.jpg" width="136" data-cke-widget-data="%7B%22hasCaption%22%3Afalse%2C%22src%22%3A%22%2Fimage%2Fabout%2Ffiles%2F%257B%257Bimage.productId%257D%257D%2Fphotos%2520back%2520cover%2F1%2Flg.jpg%22%2C%22alt%22%3A%22%22%2C%22width%22%3A%22136%22%2C%22height%22%3A%22299%22%2C%22lock%22%3Atrue%2C%22align%22%3A%22left%22%2C%22classes%22%3Anull%7D" data-cke-widget-upcasted="1" data-cke-widget-keep-attr="0" data-widget="image" class="cke_widget_element"><span class="cke_reset cke_widget_drag_handler_container" style="background: url(&quot;http://94.183.117.225/bower_components/ckeditor/plugins/widget/images/handle.png&quot;) rgba(220, 220, 220, 0.5); top: -15px; left: 0px; display: block;"><img class="cke_reset cke_widget_drag_handler" data-cke-widget-drag-handler="1" src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" width="15" title="کلیک و کشیدن برای جابجایی" height="15" role="presentation" draggable="true"></span><span class="cke_image_resizer" title="کلیک و کشیدن برای تغییر اندازه">​</span></span>';
            // }else
            evt.data.dataValue = ' {{'+contact.type+'.'+contact.name+'}}  ';
        } );
    }
} );



angular.module('adminPanel').directive('myElem',
    function () {
        return {
            restrict: 'E',
            replace:true,
            scope:{
                date:"="
            },
            template: '<div id="chartdiv" style="min-width: 310px; height: 400px; margin: 0 auto"></div>',
            link: function (scope, puelement, attrs) {

                var chart = false;

                var initChart = function() {
                    if (chart) chart.destroy();
                    var config = scope.config || {};
                    console.log(scope.data);
                    // chart = AmCharts.makeChart("chartdiv", {
                    //     "type": "xy",
                    //     "theme": "light",
                    //     "dataDateFormat": "YYYY-MM-DD HH:NN",
                    //     "startDuration": 1.5,
                    //     "chartCursor": {},
                    //     "graphs": [{
                    //         "bullet": "diamond",
                    //         "lineAlpha": 0.7,
                    //         "lineThickness": 2,
                    //         "lineColor": "#b0de09",
                    //         "xField": "date1",
                    //         "yField": "y1"
                    //     }, {
                    //         "bullet": "round",
                    //         "lineAlpha": 0.7,
                    //         "lineThickness": 2,
                    //         "lineColor": "#fcd202",
                    //         "xField": "date2",
                    //         "yField": "y2"
                    //     }],
                    //     "valueAxes": [{
                    //         "id": "v1",
                    //         "axisAlpha": 0,
                    //         "type": "date",
                    //         "minPeriod": "mm"
                    //     }, {
                    //         "id": "v2",
                    //         "axisAlpha": 0,
                    //         "position": "bottom",
                    //         "labelFunction":function (value, formattedValue, valueAxis) {
                    //             console.log(value);
                    //             // return "سل";
                    //             if(value % 1 === 0 && $scope.chartOrderCounter<$scope.orderLogs.length){
                    //                 var log=$scope.orderLogs[$scope.chartOrderCounter++];
                    //
                    //                 if( log){
                    //                     console.log(log);
                    //                     return log.name;
                    //                 }else{
                    //                     console.log(log);
                    //                     return value;
                    //                 }
                    //                 return "3";
                    //             }else{
                    //                 return "2";
                    //             }
                    //         }
                    //         // "type": "date"
                    //     }],
                    //     "dataProvider": $scope.chartorder
                    // });


                };
                initChart();

            }//end watch
        }
    }) ;
/**
 * Created by alireza-pc on 12/10/2017.
 */
angular.module('adminPanel').controller('activateForeignStockController', ["$scope", "ngNotify", "$http", "$uibModal", "Upload", function ($scope,ngNotify,$http,$uibModal,Upload) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.title='فعال کردن انبار خارجی';
    $scope.stocks=[];
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.loadAll=function () {
        $scope.browse=false;
        $http.get('/admin/api/activateForeignStock/getAllStock').then(function (resposne) {
            $scope.stocks=resposne.data;
        });
    };

    $scope.changeStock=function () {
        if($scope.selectedStock){
            $scope.browse=true;
        }
    };

    $scope.read=function (workbook) {
        $scope.csv=[];
        console.log(workbook);
        workbook.SheetNames.forEach(function(sheetName) {
            console.log(sheetName);
            var csv = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            $scope.csv=$scope.csv.concat(csv); //example [{id:'123',barcode:'123213123123'}]
            console.log($scope.csv);
        });
    };

    $scope.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
    };

    $scope.save=function () {
        $http.post('/admin/api/activateForeignStock/save',{
            barcodes:$scope.csv.map(function (item) {
                return item.barcode;
            }),
            stockAbbr:$scope.selectedStock
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
        },function (response) {
            ngNotify.set('خطا','error');
        })
    }
}]);

/**
 * Created by alireza on 12/30/16.
 */

angular.module('adminPanel').controller('advanceSearchController', ["$uibModal", "AclService", "_deep", "$scope", "$resource", "ngNotify", "$http", function ($uibModal,AclService,_deep,$scope,$resource,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    

    $scope.title='جستجوی  پیشرفته';
    $scope.categories=[];//category that i must get attribute base on it
    $scope.tree=[{}];//first must set it
    $scope.attributes=null;
    $scope.staticAttribute=[
        {id:"name",name:'name',caption:'نام',type:3,table:13},
        {id:"lName",name:'lName',caption:'نام لاتین',type:3,table:13},
    ];
    $scope.categoryAttribute=[
        {id:"name",name:'name',caption:'نام',type:3,table:13}
    ];
    $scope.idOfAllProduct=[];
    $scope.conditionGroup=[];
    $scope.conditionGroupStatic=[];
    $scope.conditionGroupCategory=[];
    $scope.selectAllProductState=false;
    $scope.temp=[];
    $scope.con=[
        {
            name:'مشابه',
            filter:'like'
        },
        {
            name:'برابر',
            filter:'='
        },
        {
            name:'بزرگتر',
            filter:'>'
        },
        {
            name:'کوچکتر',
            filter:'<'
        },
        {
            name:'مخالف',
            filter:'!='
        }
    ];
    //get persons and publishers
    {
        // $http.get('/admin/api/person').then(function (response) {
        //     $scope.persons = response.data;
        //     //console.log( response.data);
        // }, function (response) {
        //     console.warn(response);
        // });
        // $http.get('/admin/api/publisher').then(function (response) {
        //     $scope.publishers = response.data;
        //     //console.log( response.data);
        // }, function (response) {
        //     console.warn(response);
        // });
        $scope.getPersonById = function (id) {
            return $scope.persons.filter(function (person) {
                return person.id == id;
            });
        };
        $scope.getPublisherById = function (id) {
            return $scope.publishers.filter(function (publisher) {
                return publisher.id == id;
            })[0];
        };
    }
    if(AclService.can('add_product_to_discount')){
        $http.get('/admin/api/advanceSearch/getAllDiscounts').then(function (response) {
            $scope.button.discount.discounts=response.data;
            console.log($scope.button);
        });
    }
    if(AclService.can('add_product_to_campaign')){
        $http.get('/admin/api/advanceSearch/getAllCampaign').then(function (response) {
            $scope.button.campaign.campaigns=response.data;
        });
    }

    if(AclService.can('add_product_to_pack')){
        $http.get('/admin/api/advanceSearch/getAllPack').then(function (response) {
            $scope.button.pack.packs=response.data;
        });
    }

    $scope.insertToCampaign=function (name) {
        $http.post('/admin/api/advanceSearch/insertToCampaign',{
            name:name
        }).then(function (response) {
            $scope.button.campaign.campaigns=response.data;
        })
    };

    $scope.addToDiscount= function (discountId) {
        var products;
        console.log($scope.selectAllProductState);
        if($scope.selectAllProductState){

            products=$scope.idOfAllProduct;
        }else {
            products=$scope.products.filter(function (product) {
                    return product.select===true;
                })
                .map(function (product) {
                    return product.id
                });
        }
        console.log(products);
        $http.post('/admin/api/advanceSearch/addToDiscount',{
            products:products,
            productForSql:products.join(','),// return 1,2,3,4 from [1,2,3,4]
            discountId:discountId,
            serializeQuery:$scope.serializeQuery,
            conditionsName:$scope.conditionsName
        }).then(function (response) {
            ngNotify.set('محصولات انتخاب شده به تخفیف'+response.data+' اضافه شد ');
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.getName=function (attribute,value) {
        return $http.post('/admin/api/advanceSearch/getName', {
            attribute:attribute,
            value:value
        }).then(function(response){
            return response.data.map(function(item){
                return item.name;
            });
        });
    };

    $scope.getCategories=function (attribute,value) {
        // return $http.post('/admin/api/advanceSearch/getCategories', {
        //     attribute:attribute,
        //     value:value
        // }).then(function(response){
        //     return response.data.map(function(item){
        //         return item.name;
        //     });
        // });

        return $scope.categoryList.filter(function (item) {
            return item.name.search(value)>-1
        }).map(function (item) {
            return {'name':item.name,'view':item.parent.name+" > "+item.name};
        })
    };

    $scope.addToCampaign= function (campaignId) {
        var products;
        console.log($scope.selectAllProductState);
        if($scope.selectAllProductState){

            products=$scope.idOfAllProduct;
        }else {
            products=$scope.products.filter(function (product) {
                return product.select==true;
            })
                .map(function (product) {
                    return product.id
                });
        }
        $http.post('/admin/api/advanceSearch/addToCampaign',{
            products:products,
            campaignId:campaignId,
            serializeQuery:$scope.serializeQuery,
            conditionsName:$scope.conditionsName
        }).then(function (response) {
            ngNotify.set('محصولات انتخاب شده به کمپین '+response.data+' اضافه شد ');
        }, function (response) {
            console.warn(response);
        })
    };

    $scope.addToPack= function (packId) {
        var products;
        console.log($scope.selectAllProductState);
        if($scope.selectAllProductState){

            products=$scope.idOfAllProduct;
        }else {
            products=$scope.products.filter(function (product) {
                    return product.select==true;
                })
                .map(function (product) {
                    return product.id
                });
        }
        $http.post('/admin/api/advanceSearch/addToPack',{
            products:products,
            packId:packId
        }).then(function (response) {
            ngNotify.set('محصولات انتخاب شده به پک '+response.data+' اضافه شد ');
        }, function (response) {
            console.warn(response);
        })
    };

    $scope.allProduct= function () {
        //console.log($scope.selectAllProductState);
        $scope.selectAllProductState=!$scope.selectAllProductState;
        $scope.selectAll();
    };

    $scope.headerTitle='نتایج جستجو';
    $scope.theads=[
        {
            field:'command',
            displayName:'',
            template:'' +
            '<a  target="_blank" href="/admin/data#/productLog?id={{item.id}}" class="pull-left product-icon" ><i class="fa fa-history"></i></a>' +
            '<a  class="pull-left product-icon" ng-click="addProductToPrice({id:item.id})"><i class="fa fa-usd"></i></a>'
            //sortable:true,
            //filterable:true,
            //sorting:'DESC'
        },
        {
            field:'select',
            displayName:'انتخاب',
            displayNameTemplate:"" +
            "<span>" +
            "   <label for='selectAll'>انتخاب همه</label>" +
            "   <input id='selectAll' type='checkbox' ng-click='selectAll()' >" +
            "</span>",
            template:"<label for=\"{{$parent.$parent.$index+1}}\">انتخاب</label> " +
            "<input id=\"{{$parent.$parent.$index+1}}\" type=\"checkbox\" ng-model=\"item.select\" placeholder=\"انتخاب\">",
            //sortable:true,
            //filterable:true,
            //sorting:'DESC'
        },
        {
            field:'fieldable_id',
            displayName:'شمارنده',
            template:'<span>{{item.id}}</span>',
            sortable:true,
            //filterable:true,
            sorting:'DESC'
        },
        {
            field:'name',
            displayName:'نام محصول',
            width:300,
            //filterable:true,
            //editable:true,
            //template:"" +
            //"<a href='' ng-click=\"findById({$id:item.disc_method_id})\">" +
            //"   {{item.disc_method}}" +
            //"</a>",
            //sortable:true
        },
        //{
        //    field:'disc_type',
        //    displayName:'نوع تخفیف',
        //    filterable:true,
        //    editable:true,
        //    sortable:true
        //},
        //{
        //    field:'disc_column',
        //    displayName:'ستون تخفیف',
        //    filterable:true,
        //    editable:true,
        //    sortable:true
        //},
        //{
        //    field:'disc_calculation',
        //    displayName:'محاسبه تخفیف',
        //    filterable:true,
        //    editable:true,
        //    sortable:true
        //    //template:"<span>{{item.disc_valid_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
        //}
    ];
    $scope.entries=[10,25,50,100];
    $scope.showEntries='25';

    $scope.currentPage='1';
    $scope.button= {
        selectAllProduct:true,
        discount:{
            show:true,
            permission:AclService.can('add_product_to_discount'),
            discounts:$scope.discounts
        },
        pack:{
            show:true,
            permission:AclService.can('add_product_to_pack'),
            packs:$scope.packs
        },
        category:{
            show:true,
            permission:AclService.can('add_product_to_category'),
        },

        campaign:{
            show:true,
            permission:AclService.can('add_product_to_campaign'),
            campaigns:$scope.campaigns
        }

        //createNew:true
        //loadAllFunction:$scope.loadAll()
    };

    //i duplicate it one for co_defs and one for on-click why?
    $scope.addToCategories= function(category){

        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories=$scope.categories.filter(function (cat) {
                return cat.id!=category.id;
            })
        }
        //console.log($scope.categories);
    };
    $scope.addToCategories2= function(category){
        category.checkbox=!category.checkbox;
        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories = $scope.categories.filter(function (cat) {
                return cat.id != category.id;
            })
        }
        //console.log($scope.categories);
    };
    $scope.col_defs=[{
        field:'checkbox',
        displayName:'انتخاب',
        cellTemplate:"<input type='checkbox'  ng-model='row.branch[col.field]'  ng-click='cellTemplateScope.addToCategories(row.branch)'>" ,
        cellTemplateScope:{
            addToCategories:$scope.addToCategories
        }
    }];

    $scope.getAttributes= function () {
        $scope.selectProductCheck=false;
        $http.post('/admin/api/advanceSearch/getAttributeByCategory',
            {
                category: $scope.categories.map(function (item) {
                        return item.id;
                    })
            }).then(function (response) {
            $scope.attributes=response.data;
            $scope.attributes.forEach(function (attribute,index) {
                var col={};
                col.field=attribute.id;
                col.displayName=attribute.caption;
                col.template="" +
                    "<span>" +
                    //"   {{item.fields|getValueOfAttribute:thead.field}}" +
                    "   <span ng-repeat='item in item.fields|getValueOfAttribute:thead.field'  >" +
                    "       <span ng-if=\"item.table!=null\" ng-init=\"getItemOfTableById(item.table,item.value)\">" +
                    "           <span ng-if='item.table==5' compile='temp[item.table][item.value][0].text'>" +
                    //"           {{temp[item.table][item.value][0].text}} " +
                    "           </span>" +
                    "           <span ng-if='item.table!=5'>" +
                    "           {{temp[item.table][item.value][0].name}} " +
                    "           </span>" +
                    "           " +
                    "       <br></span>" +
                    "       <span ng-if=\"item.table==null\">{{item.value}}</span>" +
                    "   </span>" +
                    "   </span>" +
                    "</span>";
                if(attribute.table){
                    col.width=400;
                }
                //else{
                //    col.width=100;
                //}
                $scope.theads.push(col);
                //console.log(col);
            });
            $scope.addConditionGroup($scope.conditionGroup);
            $scope.addConditionGroup($scope.conditionGroupStatic);
            $scope.addConditionGroup($scope.conditionGroupCategory);

            //console.log(response.data);
        }, function (response) {
            $scope.attributes=null;
        });

    };

    $scope.addConditionGroup= function (conditionGroup) {
        var conditions=[{
            operator:'or'
        }];
        conditions.operator='or';
        conditionGroup.push(conditions);
        //$scope.conditionGroup[0][0].operator='or';
        //console.log($scope.conditionGroup);
    };

    $scope.removeCondition= function (parentIndex,index,conditionGroup) {
        conditionGroup[parentIndex].splice(index,1);
        if(conditionGroup[parentIndex].length==0){
            conditionGroup.splice(parentIndex,1);
        }
    };

    $scope.addCondition= function (parentIndex,conditionGroup) {
        console.log(conditionGroup[parentIndex]);
        var condition={
            operator:'or'
        };
        conditionGroup[parentIndex].push(condition);
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    //convert tree to flat i think.
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $scope.loadAll= function () {
        $scope.title='جستجوی  پیشرفته';
        $scope.products=null;
        $scope.categories=[];
        $scope.attributes=null;
        $scope.conditionGroup=[];
        $scope.conditionGroupStatic=[];
        $scope.conditionGroupCategory=[];
        $scope.operandBetweenAttribute="or";
        $scope.operandBetweenAttribute2="or";//for category
        $http.get('/admin/api/category').then(function (response) {
            $scope.categoryList=response.data.filter(function (category) {
                return category.parent!=null;
            });
            $scope.tree=convertToTree(response.data);
        });
    };

    $scope.setAttributeType= function (condition,attributes) {
        var attribute=attributes.filter(function (attribute) {
            return attribute.id===condition.attribute;
        });
        condition.attributeType=attribute[0].type;
        condition.attributeTable=attribute[0].table;
        condition.conditionList= $scope.getConditions(condition.attributeType);
        console.log(condition)
    };

    $scope.getConditions= function (type) {
        //console.log(type);
        if(type ==undefined){
            return ;
        }else
        if([1,3,13,14].indexOf(type)>=0){
            return [
                {
                    name:'مشابه',
                    filter:'like'
                },
                {
                    name:'برابر',
                    filter:'='
                },
                {
                    name:'مخالف',
                    filter:'not like'
                }
            ];
        }else if([2,4].indexOf(type)>=0){
            return [
                {
                    name:'برابر',
                    filter:'='
                },
                {
                    name:'بزرگتر',
                    filter:'>'
                },
                {
                    name:'کوچکتر',
                    filter:'<'
                },
                {
                    name:'مخالف',
                    filter:'<>'
                }
            ];
        }else{
            return[
                {
                    name:'برابر',
                    filter:'='
                },
                {
                    name:'مخالف',
                    filter:'<>'
                }
            ];
        }
    };

    $scope.checkNumber = function (number) {
        //console.log(!isNaN(parseFloat(number)));
        if((!isNaN(parseFloat(number)) && isFinite(number))){
            return number;
        }else{
            //ngNotify.set('لطفا عدد وارد کنید','error');
            return "";
        }
        //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
    };

    $scope.selectAll= function () {
        //console.log(1);
        $scope.selectProductCheck=!$scope.selectProductCheck;
        $scope.products.filter(function (product) {
            product.select=$scope.selectProductCheck;
        });
        //console.log($scope.products);
    };

    $scope.search= function (button) {
        if(button){
            $scope.idOfAllProduct=[];
        }
        if($scope.form.$invalid){
            ngNotify.set('فیلد های غیر ضروری را حذف کنید','error');
            return ;
        }
        $scope.selectAllProductState=false;
        console.log($scope.conditionGroup);

        $scope.attr=[];
        $scope.conditionGroup.forEach(function (group) {
            group.forEach(function (condition) {
                $scope.attr.push(condition.attribute);
            })
        });
        console.log(Array.from(new Set( $scope.attr)));
        //return;
        console.log($scope.currentPage);
        $http.post('/admin/api/advanceSearch/search',{
            conditionGroups:$scope.conditionGroup,
            conditionGroupStatic:$scope.conditionGroupStatic,
            conditionGroupCategory:$scope.conditionGroupCategory,
            attributes:Array.from(new Set( $scope.attr)),
            operator:$scope.conditionGroup.map(function (item) {
                return item.operator;
            }),
            operatorStatic:$scope.conditionGroupStatic.map(function (item) {
                return item.operator;
            }),
            operatorCategory:$scope.conditionGroupCategory.map(function (item) {
                return item.operator;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            idOfAllProduct:$scope.idOfAllProduct,
            operandBetweenAttribute:$scope.operandBetweenAttribute,
            operandBetweenAttribute2:$scope.operandBetweenAttribute2//for category
        }).then(
            function (response) {
                $scope.products=response.data.products;
                $scope.idOfAllProduct=response.data.count;//get id for select all product
                $scope.totalItem=response.data.count.length;//
                $scope.numPages=response.data.count/$scope.showEntries;
                $scope.serializeQuery=response.data.serializeQuery;
                console.log($scope.idOfAllProduct);
            }
        );
        //console.log($scope.conditions);
    };

    $scope. selectAllProduct= function () {
        for(var product in $scope.products){
            $scope.products[product].select=!$scope.products[product].select;
        }
    };

    $scope.addProductToPrice= function (id) {
        var modalInstance=$uibModal.open({
            animation:true,
            controller:'priceModalController',
            templateUrl:'price.html',
            size:'lg',
            resolve:{
                'product_id': function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function () {
            ngNotify.set('با موفقیت ثبت شد');
        }, function () {

        })
    };

    $scope.addToCategory= function () {
        var products;
        console.log($scope.selectAllProductState);
        if($scope.selectAllProductState){

            products=$scope.idOfAllProduct;
        }else {
            products=$scope.products.filter(function (product) {
                    return product.select==true;
                })
                .map(function (product) {
                    return product.id
                });
        }
        console.log(products);
        if(products.length==0){
            ngNotify.set('حداقل یک محصول را انتخاب کنید','error');
        }else {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'addProductToCategoryController',
                templateUrl:'addProductToCategory.html',
                size:'lg',
                resolve:{
                    'products': function() {
                        return products;
                    }
                }
            });

            modalInstance.result.then(function () {
                ngNotify.set('ثبت شد.');
            }, function () {

            })
        }

    }
}]);

angular.module('adminPanel').controller('addProductToCategoryController', ["$scope", "$uibModalInstance", "$http", "products", function ($scope,$uibModalInstance,$http,products) {
    $scope.tree=[{}];
    $scope.col_defs=[
        {
            field:'id',
            displayName:'شمارنده',
            filterable: true
        },
        {
            field:'description',
            displayName:'توضیحات'
        },
        {
            field:'checkbox',
            displayName:'انتخاب',
            cellTemplate:"<span type='checkbox'  ng-model='row.branch[col.field]' ng-show='row.branch.children.length==0'>" +
            "               <span ng-show='row.branch[col.field]' class='glyphicon glyphicon-ok'></span>" +
            "             </span>" ,
            cellTemplateScope:{
                addToCategories:$scope.addToCategories
            }
        }];
    $scope.expanding_property = {
        field: "name",
        displayName: "نام",
        filterable: true
    };
    $scope.categories=[];//category that must save
    $scope.addToCategories2= function(category){
        //console.log(category);
        if(category.children.length!=0){
            return;
        }
        category.checkbox=!category.checkbox;
        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories = $scope.categories.filter(function (cat) {
                return cat.id != category.id;
            })
        }
        //console.log($scope.categories);
        //getAttributeByCategory();
        //console.log($scope.categories);
    };
    $scope.addToCategories= function(category){
        //console.log(category);
        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories=$scope.categories.filter(function (cat) {
                return cat.id!=category.id;
            })
        }
        //console.log($scope.categories);
        //getAttributeByCategory();
    };
    $scope.chooseCategory= function () {
        if($scope.quickCategory){
            //expand tree .first get name by id then send it to expandTo
            $scope.expandTo= $scope.categoryList.filter(function (category) {
                return category.id==$scope.quickCategory;
            })[0].name;
            console.log( $scope.expandTo);
            $scope.addToCategories2($scope.categoryList.filter(function (category) {
                return category.id==$scope.quickCategory;
            })[0]);
        }
        $scope.quickCategory="";
    };
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $http.get('/admin/api/advanceSearch/getAllCategory').then(function (response) {
        $scope.tree=convertToTree(response.data);
        $scope.categoryList=response.data.filter(function (category) {
            return category.parent!=null;
        });
    });

    $scope.save= function () {
        $http.post('/admin/api/advanceSearch/saveCategory',{
            'products':products,
            'categories':$scope.categories.map(function (category) {
                return category.id;
            })
        }).then(function (response) {
            $uibModalInstance.close();
        })
    };

    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);

angular.module('adminPanel').controller('priceModalController', ["$scope", "$uibModalInstance", "$http", "product_id", function ($scope,$uibModalInstance,$http,product_id) {
    $scope.price={};
    $http.get('/admin/api/price/getProductById/'+product_id).then(function (response) {
        $scope.product=response.data;
        $scope.price.product_id=response.data.id;
    }, function (response) {
        console.warn(response);
    });

    $scope.checkNumber = function (number) {
        //console.log(!isNaN(parseFloat(number)));
        if((!isNaN(parseFloat(number)) && isFinite(number))){
            return number;
        }else{
            //ngNotify.set('لطفا عدد وارد کنید','error');
            return "";
        }
        //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
    };

    $scope.save= function () {
        $http.post('/admin/api/price/save',{
            price:$scope.price
        }).then(function (response) {
            //ngNotify.set('با موفقیت ذخیره شد');
            //$scope.loadAll();
            $uibModalInstance.close();
        }, function (response) {
            console.log(response);
        })
    };

    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);

/**
 * Created by alireza on 12/5/16.
 */
angular.module('adminPanel')
.controller('attributeController',["$location", "Upload", "AclService", "$scope", "$resource", "$http", "ngNotify", "$uibModal", function($location,Upload,AclService,$scope,$resource,$http,ngNotify,$uibModal){
    $scope.title='';
    $scope.attributes=null;
    $scope.attribute=null;
    $scope.row=null;

    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });

    $scope.discountMethodCaption="ویژگی ها";
    //$scope.title='لیست روش های تخفیف';
    $scope.theads=[
        {
            field:'attributes.id',
            displayName:'شماره ویژگی',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'attributes.name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({$id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            width:200
        },
        {
            field:'attributes.caption',
            displayName:'عنوان',
            template:"<span>{{item.caption}}</span>",
            filterable:true,
            sortable:true,
            width:200
        },
        {
            field:'attributes.type',
            displayName:'نوع',
            filterable:true,
            template:"" +
            "<span>{{item.type}}</span>",
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option label=\"\" value=\"\" selected=\"selected\"></option>" +
            "   <option label=\"رشته\" value=1 >رشته</option>" +
            "   <option label=\"عدد\" value=2>عدد</option>" +
            "   <option label=\"انتخاب\" value=3>انتخاب</option>" +
            "   <option label=\"تاریخ\" value=4>تاریخ</option>" +
            "   <option label=\"دودویی\" value=5>دودویی</option>" +
            "   <option label=\"عکس\" value=11>عکس</option>" +
            "   <option label=\"جدول\" value=13>جدول</option>" +
            "   <option label=\"HTML\" value=14>HTML</option>" +
            "   </select>" +
            "</div>",
            width:200
        },
        {
            field:'table',
            displayName:'نام جدول'
        },
        {
            field:'default',
            displayName:'پیشفرض'
        }
    ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_attribute'
        }
        //loadAllFunction:$scope.loadAll()
    };
    $http.get('/admin/api/type').then(function (response) {

        $scope.types=response.data;
        //console.log($scope.types);
    });
    $scope.getTypeById= function (id) {
        return $scope.types.filter(function (type) {
            return type.id==id;
        })[0].name;
    };

    $scope.checkName= function (value) {
        console.log('asdf');
        if(!value){
            return value;
        }
        var english = /^[A-Za-z0-9'";:)(*&^%$#@!~`|\\/.,-\_ +]*$/;
        var value=String( value).match(english);
        if(value==null)
        return null;
        else return value[0];
        //console.log(String( value).match(english));
        //return String( value).match(english);
    };

    $scope.$watch('attribute.name', function (value) {
        $scope.attributeNamesimilar=null;
        $http.get('/admin/api/getSimilarAttributeName/'+value).then(function (response) {
            $scope.attributeNamesimilar=response.data.filter(function (item) {
                return item.id!=$scope.attribute.id;
            });
        }, function (response) {
            console.warn(response);
        })
    });
    $scope.$watch('attribute.caption', function (value) {
        $scope.attributeCaptionsimilar=null;
        $http.get('/admin/api/getSimilarAttributeCaption/'+value).then(function (response) {
            $scope.attributeCaptionsimilar=response.data.filter(function (item) {
                return item.id!=$scope.attribute.id;
            });
        }, function (response) {
            console.warn(response);
        })
    });

    var Attribute=$resource('/admin/api/attribute/:id');
    var AttributeTable=$resource('/admin/api/attributeTable/:id');

    $scope.checkNumber = function (number) {
        return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
    };

    $scope.$on('$viewContentLoaded',function(){
        $scope.loadAll();
    });

    $scope.loadAll=function(){
        $scope.files=[];
        $scope.fileSrc=[];
        $scope.title='ویژگی ها';
        //$scope.showEntries='50';
        $scope.attribute=null;
        $scope.row=null;

        $http.post('/admin/api/attribute/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.attributes=response.data.attributes;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.createNew=function(){
        $scope.title='ویژگی جدید';
        $http.get('/admin/api/attributeGroup').then(function(response){
            $scope.attributeGroups=response.data;
            $scope.attribute={};
            $scope.row={};
            $scope.attribute.attribute_group_id=parseInt(response.data[0].id);
            $scope.attribute.type=parseInt($scope.types[0].id);
        },function(response){
            console.log(response);
        });

    };



    $scope.initDefaultForTableField= function (field) {
        if(field.default){
            $http.post('/admin/api/getItemsOfTableByIds',{
                item:[field.table,JSON.parse(field.default),0]
            }).then(function (response) {
                //console.log(response.data);
                field.default= response.data.table;
            }, function (response) {
                console.warn(response);
            })
        }else {
            field.default=[];
        }

    };

    $scope.initDefault= function () {
        if($scope.attribute.type==13 ||$scope.attribute.type==3){
            $scope.attribute.default=[];
        }else{
            $scope.attribute.default="";
        }
        console.log($scope.attribute);
        $http.get('/admin/api/getAttributeTableByType/'+$scope.attribute.type).then(function (response) {
            $scope.attributeTables=response.data;
        }, function (response) {
            console.warn(response);
        });

    };

    $scope.findById=function($id){
        Attribute.get({id:$id},function(data){
            $scope.row={};
            $scope.attribute=data;
            //console.log($scop/e.attribute);
            $scope.title='ویژگی '+data.caption;
            $scope.attribute.selects=JSON.parse($scope.attribute.selects);
            $scope.attribute.attribute_group_id=parseInt($scope.attribute.attribute_group_id);
            $scope.attribute.type=parseInt($scope.attribute.type);

            if($scope.attribute.imageName){
                $scope.getImage($scope.attribute.name);
            }
            //$scope.attribute.select.removeEditedTagInDatabase=[];
            //$http.get('/admin/api/type').then(function (response) {
            //
            //    $scope.types=response.data;
            //    console.log($scope.types);
            //});

            $http.get('/admin/api/attributeGroup').then(function (response) {
                $scope.attributeGroups=response.data;
            }, function (response) {
                console.log(response);
            });
            //AttributeTable.query(function (data) {
            //    $scope.attributeTables=data;
            //}, function (response) {
            //    console.log(response);
            //});
            $http.get('/admin/api/getAttributeTableByType/'+$scope.attribute.type).then(function (response) {
                $scope.attributeTables=response.data;
            }, function (response) {
                console.warn(response);
            });
            //console.log($scope.attribute  );
            if($scope.attribute.selects!=undefined){
                //$scope.attribute.selects=JSON.parse($scope.attribute.selects);
                $scope.attribute.default=$scope.attribute.selects.filter(function (item) {
                    console.log(item);
                    console.log(data.default);
                    return item==data.default;
                })[0];
            }

            if($scope.attribute.type==13)
                $scope.initDefaultForTableField($scope.attribute);
            //$scope.initDefault();
            //$scope.attribute.default=[];
            //console.log($scope.attribute);
        },function(response){
            console.log(response);
        })
    };

    $scope.console= function () {
        console.log($scope.attribute);
    };

    $scope.getImage=function (attributeName ) {
        var d=new Date();
        var xhr=new XMLHttpRequest();
        xhr.open('GET',"/image/attribute/"+attributeName+"/sm.jpg?"+ d.getDate(),true);
        xhr.responseType='blob';
        xhr.onload= function (event) {
            //console.log(event);
            var fileReader=new FileReader();
            fileReader.readAsDataURL(event.target.response);
            fileReader.onloadend= function () {
                // if(field){
                    $scope.fileSrc.push(fileReader);
                    console.log($scope.fileSrc);
                // }
                //else
                //    $scope.fileSrc.push(fileReader.result);
                //console.log($scope.fileSrc);
                // if(field){
                    $scope.files.push(new File([event.target.response], "filename", {type: "image/png"}));
                // }
            };
        };
        xhr.send();
    };

    $scope.imageUpload=function (element) {
        var countImagePassLimit=0;
        if(element.files[0]["size"]<500000){
            $scope.files.push(element.files[0]);
        }else{
            countImagePassLimit+=1;
        }
        if(countImagePassLimit>0){
            ngNotify.set(  "حجم عکس بیش از حد مجاز است","error");
            countImagePassLimit=0;
            return;
        }
        var fileSrc=element.files;
        // console.log(fileSrc);
        for (var i = 0; i < fileSrc.length; i++) {
            // console.log(fileSrc[i]["size"]);
            if(fileSrc[i]["size"]<500000){
                var file=fileSrc[i];
                var reader=new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend=$scope.imageIsLoaded;
            }

        }
    };
    $scope.dateInMiliSecond= function () {
        return Date.parse(new Date()).toString().slice(0,10);
    };
    $scope.imageIsLoaded= function (e) {
        $scope.$apply(function () {
            $scope.fileSrc.push(e.target);//change e.target.result to e.target
        })
    };

    var makeString= function (selects) {
        if(selects)
        return  selects.map(function (select) {
            return select.text;
        });
    };

    $scope.checkOutRequired= function (attribute) {
        console.log(attribute);
        if(attribute.is_linked_attribute==true){
            attribute.required=true;
        }

    };

    $scope.removeImage= function (index) {
        $scope.files.splice(index,1);
        $scope.fileSrc.splice(index,1);
        $scope.attribute.imageName=null;
    };

    $scope.save=function(){
        //console.log($scope.attribute.removeTagInDatabase);
        //console.log($scope.attribute.editedTagInDatabase);
        console.log($scope.attribute);
        //return ;

        if($scope.form.$invalid){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            return;
        }else if($scope.attributeNamesimilar.filter(function (item) {
                return item.name==$scope.attribute.name;
            }).length>0){
            ngNotify.set("لطفا نام دیگری برای ویژکی وارد کنید.(نام ویژکی تکراری است)" ,'error');
            return;
        }
        else if($scope.attributeCaptionsimilar.filter(function (item) {
                return item.caption==$scope.attribute.caption;
            }).length>0){

            ngNotify.set("لطفا عنوان دیگری برای این ویژکی وارد کنید(عنوان تکراری است)" ,'error');
            return;
        }
        //console.log($scope.attribute);
        //return ;
        //change select from ['text':'asdf'] to ['asdf']
        if($scope.attribute.type==3){
            //$scope.attribute.default=$scope.attribute.default.text;
            $scope.attribute.selects=makeString($scope.attribute.selects);
            if($scope.attribute.default!=null && $scope.attribute.default.length==0){
                $scope.attribute.default="";
            }
        }else{

        }
        if($scope.attribute.type==13){
            $scope.attribute.default=JSON.stringify($scope.attribute.default.map(function (item ) {
                return item.id;
            }));
        }


        //else if($scope.attribute.default.length==0){
        //    $scope.attribute.default=null;
        //}

        //console.log($scope.attribute);
        //return;
        Attribute.save({
            'attribute':$scope.attribute
        },function(data){
            if($scope.files.length>0 && $scope.attribute.imageName!==$scope.attribute.name && $scope.attribute.imageName!==null ){
                Upload.upload({
                    url:location.protocol+"//"+$location.host()+'/admin/api/attribute/saveFile',
                    data: {
                        'file':$scope.files[0],
                        'name':$scope.attribute.name
                    }
                })
            }
            $scope.loadAll();
        },function(response){
            console.log(response);
        })
    };
    $scope.createNewTable= function () {
        var modalInstance=$uibModal.open({
            animation:true,
            controller:'CreateTableController',
            templateUrl:'createTable.html',
            resolve:{
                'table': function () {
                    return $scope.attribute.table;
                }
            }
        });
        modalInstance.result.then(function () {
            AttributeTable.query(function (data) {
                $scope.attributeTables=data;
            }, function (response) {
                console.log(response);
            });
            ngNotify.set( );
        }, function () {
            ngNotify.set("هیچ تغییری ثبت نشد" );
        })
    };

}]);

angular.module('adminPanel').controller('CreateTableController', ["$resource", "$scope", "$uibModalInstance", "table", function ($resource,$scope,$uibModalInstance,table) {
    $scope.table={};
    $scope.delimeter=',';
    var AttributeTable=$resource('/admin/api/attributeTable/:id');
    AttributeTable.get({id:table}, function (data) {
        $scope.table=data;
    });
    $scope.fileNameChanged= function (ele) {
        $scope.table.fileContent=null;
        var file=ele.files;
        //console.log(file);
        var reader=new FileReader();
        reader.onload= function(){
            $scope.table.fileContent = reader.result.split($scope.delimeter);
            $scope.$apply();
            //console.log($scope.fileContent);
        };
        reader.readAsText(ele.files[0]);
    };
    $scope.ok= function () {
        if($scope.form.$invalid)
        {
            return;
        }
        else {
            console.log($scope.table);
            if($scope.table.data!=undefined)
                $scope.table.data=$scope.table.data.map(function (item) {
                    return item.text;
                });
            AttributeTable.save({
                'table':$scope.table
            }, function (data) {
                console.log(data);
                $uibModalInstance.close();
            }, function (response) {
                console.warn(response);
            });
        }
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);

angular.module('adminPanel').controller('removeConfirmController', ["$scope", "$http", "tag", "$uibModalInstance", function ($scope,$http,tag,$uibModalInstance) {
    //console.log(tag);
    $http.get('/admin/api/getProductBySelectAttribute/'+tag).then(function (response) {
        $scope.products=response.data;
    });

    $scope.ok= function (bool,products) {
        console.log(products,bool);
        if(products==0){//count
            $uibModalInstance.close(bool);
        }else {
            $uibModalInstance.dismiss();
        }

    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);
    /**
 * Created by alireza on 3/1/17.
 */
angular.module('adminPanel')
    .controller('attributeTableController', ["AclService", "$scope", "$http", "ngNotify", "$uibModal", "Upload", "$q", "$location", function (AclService,$scope, $http,ngNotify,$uibModal,Upload,$q,$location) {

        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 1000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });

        $scope.can=AclService.can;

        $scope.button={
            createNew:{
                permission:'add_data_to_table'
            },
            importFromCsv:{
                permission:'add_data_to_table'
            }

        };

        $scope.entries=[10,25,50,100];

        $scope.showEntries='50';

        $scope.attributeTables=[];

        $scope.createNewColumn= function (id) {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'CreateNewColumn',
                templateUrl:'createNewColumn.html',
                resolve:{
                    'colId': function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function () {
                $scope.loadAll();
                ngNotify.set("ثبت شد" );
            }, function () {
                ngNotify.set("هیچ تغییری ثبت نشد" );
            })
        };

        $scope.checkName= function (value) {
            if(!value){
                return value;
            }
            var english = /^[A-Za-z0-9'";:)(*&^%$#@!~`|\\/.,-\_ +]*$/;
            var value=String( value).match(english);
            if(value==null)
            {
                //ngNotify.set('لطفا به صورت لاتین وارد کنید','error');
                return null;
            }
            else return value[0];
            //console.log(String( value).match(english));
            //return String( value).match(english);
        };

        $scope.$on('$viewContentLoaded', function () {
            $scope.loadAll();
        });

        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            };
        };

        $scope.loadAll= function () {
            $scope.theads=[
                {
                    field:'id',
                    displayName:'ردیف',
                    filterable:true,
                    sortable:true,
                    template:'<a href="" ng-click="can(\'edit_data_in_table\')&&findById({id:item.id})">{{item.id}}</a>',
                    sorting:'DESC'
                },
                //{
                //    field:'name',
                //    displayName:'نام',
                //    filterable:true
                //},
                //{
                //    field:'lName',
                //    displayName:'نام لاتین',
                //    filterable:true
                //},
                //{
                //    field:'phone',
                //    displayName:'تلفن',
                //    filterable:true
                //},
                //{
                //    field:'picture',
                //    displayName:'تصویر',
                //    filterable:true
                //},
                //{
                //    field:'address',
                //    displayName:'آدرس',
                //    filterable:true
                //},
                //{
                //    field:'link',
                //    displayName:'لینک',
                //    filterable:true
                //}
            ];
            $scope.currentPage=1;
            $scope.showEntries=50;
            $scope.attributeTable=null;
            $http.get('/admin/api/attributeTable').then(function (response) {
                $scope.attributeTables=response.data;
                var newTable={};
                newTable.table_columns=[];
                $scope.attributeTables.push(newTable);
                $scope.attributeTablesCopy=angular.copy($scope.attributeTables);
                $http.get('/admin/api/tableColumn/index').then(function (response) {
                    $scope.cols=response.data;
                        $scope.attributeTables.forEach(function (attributeTable,index) {
                        var column;
                        var pos=[];
                        $scope.cols.forEach(function (col,colIndex) {
                            //console.log($scope.attributeTables[index].table_columns[colIndex]);
                            if(index==0){
                                var column={field:col.name,displayName:col.caption,filterable:true,sortable:true};
                                if(col.type==="text"){
                                    column.template="" +
                                        "   <span ng-bind-html=\"item[\'"+col.name+"\']\">" +
                                        "   </span>"
                                }
                                $scope.theads.push(column);
                            }
                            //console.log(attributeTable.table_columns.map(function (item) {
                            //    return item.name;
                            //}).indexOf(col.name));
                            if(attributeTable.table_columns.map(function (item) {
                                    return item.name;
                                }).indexOf(col.name)>=0){
                                pos=attributeTable.table_columns.map(function (item) {
                                    return item.name;
                                }).indexOf(col.name);
                                $scope.attributeTables[index].table_columns[pos].boolean=true;
                                // console.log($scope.attributeTables[index].table_columns[pos]);
                            }else {
                                // console.log(attributeTable.table_columns);
                                attributeTable.table_columns.push(angular.copy(col));
                            }
                        });
                        $scope.attributeTables[index].table_columns= attributeTable.table_columns.sort(sortByProperty('id'));
                        // console.log($scope.attributeTables[index]);
                    });

                    //console.log($scope.attributeTables);
                });
                console.log($scope.attributeTables);
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.getIndex= function (col) {
            return $scope.attributeTable.table_columns.indexOf(col);
        };

        $scope.saveTable= function (index) {
            var table=$scope.attributeTables[index];
            console.log(table);
            //return ;
            //table.boolean.filter(function (item) {
            //    return item;
            ////}).length;
            if(table.name==undefined){
                ngNotify.set("لطفا نام جدول را وارد کنید",'error');
            }else if(table.caption==undefined){
                ngNotify.set("لطفا هنوان جدول را وارد کنید",'error');
            }
            //else if(table.lName_col+table.name_col+table.phone_col+table.address_col+table.pic_col+table.link_col==0){
            //    ngNotify.set("لطفا حداقل یک ستون را انتخاب کنید",'error');
            //}
            else{
                $http.post('/admin/api/attributeTable/saveTable',{
                    table:table,
                    checked:table.table_columns.filter(function (item) {
                        return item.boolean!=null && item.boolean!=false;
                    }).map(function (item) {
                        return item.id;
                    }),
                    oldtable:$scope.attributeTablesCopy[index]
                }).then(function (response) {
                    //console.log(response.data);
                    $scope.loadAll();
                })
            }
        };

        $scope.findById= function (id) {

            //$scope.theads=$scope.theads.filter(function (item,index) {
            //    return index==0||$scope.attributeTable.table_columns[index-1].boolean==true;
            //});
            //var deleteColumn={
            //    field:'delete',
            //    displayName:'',
            //    //filterable:true,
            //    template:'<a href="" ng-click="findById({id:item.id})">{{item.id}}</a>',
            //    boolean:true
            //};
            //$scope.theads.push(deleteColumn);
            //console.log($scope.theads);
            $scope.itemImages=[];
            $scope.tableItem=null;
            //$scope.table

            //console.log(id);
            //console.log($scope.attributeTables[id-1]);
            if(!id){
                id=$scope.attributeTable.id;//TODO know how attributeTable changed
                //console.log($scope.attributeTable);
            }
            $http.post('/admin/api/attributeTable/getTableItems',
                {
                    theads:$scope.theads,
                    currentPage:$scope.currentPage,
                    showEntries:$scope.showEntries,
                    id:id,
                    sort:$scope.theads.filter(function (item) {
                        return item.sorting!=null;
                    })[0]
                }
            ).then(function (response) {
                $scope.attributeTable=$scope.attributeTables.filter(function (item) {
                    return item.id==id;
                })[0];
                $scope.tableData=response.data.table;
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
                $scope.theads=$scope.theads.filter(function (item,index) {
                    if(item.field=='delete'){
                        return false;
                    }
                    return item.field=='id'||$scope.attributeTable.table_columns.filter(function (col) {
                            return col.name==item.field;
                        })[0].boolean==true;
                });
                //console.log($scope.attributeTable);
                var deleteColumn={
                    field:'delete',
                    displayName:'',
                    //filterable:true,
                    template:'<button href="" class="btn btn-adn" ng-click="deleteById({id:item.id})">حذف</button>',
                    boolean:true
                };
                $scope.theads.push(deleteColumn);
                //console.log($scope.attributeTable);
                //$scope.attributeTableCopy=angular.copy($scope.attributeTables);
            });
        };

        $scope.deleteById= function (id) {
            console.log(id);
            console.log($scope.attributeTable);
            //return;

            var modalInstance=$uibModal.open({
                animation:true,
                controller:'deleteRecordController',
                templateUrl:'/views/attributeTable/deleteRecord.html',
                resolve:{
                    'table': function () {
                        return $scope.attributeTable.id;
                    },
                    'recordId': function () {
                        return id
                    }
                }
            });
            modalInstance.result.then(function () {
                //ngNotify.set(len+"رکورد ثبت شد"  );
                $http.post('/admin/api/attributeTable/deleteRecord',{
                    id:id,
                    table:$scope.attributeTable.id
                }).then(function (response) {
                    console.log(response.data);
                    $scope.findById($scope.attributeTable.id);
                }, function (response) {
                    console.log(response);
                });
            }, function () {
                //ngNotify.set("هیچ تغییری ثبت نشد" );
            })
        };

        $scope.createNewTable= function () {
            $scope.tableItem={};
            $scope.editor=null;
        };

        $scope.checkNumber = function (number) {
            //console.log(!isNaN(parseFloat(number)));
            if((!isNaN(parseFloat(number)) && isFinite(number))){
                return number;
            }else{
                //ngNotify.set('لطفا عدد وارد کنید','error');
                return "";
            }
            //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
        };

        $scope.openEditor= function (col,value) {
            //console.log(field);
            //console.log(editor);
            $scope.editor={};
            $scope.editor.isActive=true;
            $scope.editor.value=value;
            $scope.editor.col=col;
            //$scope.activeTab=4;
            //$scope.editor={};
            //console.log($scope.editor);
        };
    
        $scope.uploadImage=function (element) {
            if(!$scope.itemImages[element.id]){
                $scope.itemImages[element.id]={
                    files:[],
                    fileSrc:[]
                };
            }
            var countImagePassLimit=0;
            if(element.files[0]["size"]<500000){
                $scope.itemImages[element.id].files.push(element.files[0]);
            }else{
                countImagePassLimit+=1;
            }
            if(countImagePassLimit>0){
                ngNotify.set(  "حجم عکس بیش از حد مجاز است","error");
                countImagePassLimit=0;
                return;
            }
            var fileSrc=element.files;
            // console.log(fileSrc);
            for (var i = 0; i < fileSrc.length; i++) {
                // console.log(fileSrc[i]["size"]);
                if(fileSrc[i]["size"]<500000){
                    var file=fileSrc[i];
                    var reader=new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend=function (e) {
                        $scope.$apply(function () {
                            // $scope.itemImages[id].fileSrc=e.target.result;
                            $scope.itemImages[element.id].fileSrc.push(e.target.result);//change e.target.result to e.target
                        })
                    };
                }
            }
            console.log($scope.itemImages);
        };

        $scope.fieldRemoveImage=function (name,index) {
            $scope.itemImages[name].fileSrc.splice(index,1);
            $scope.itemImages[name].files.splice(index,1);
        }

        $scope.getImage=function (imageName,name ) {
            var xhr=new XMLHttpRequest();
            xhr.open('GET',imageName+"?"+ Date.now(),true);
            xhr.responseType='blob';
            xhr.onload= function (event) {
                var fileReader=new FileReader();
                if(event.target.status!==404){
                    fileReader.readAsDataURL(event.target.response);
                    fileReader.onloadend= function (e) {
                        $scope.$apply(function () {
                            $scope.itemImages[name].fileSrc.push(fileReader.result);
                        });
                        $scope.itemImages[name].files.push(new File([event.target.response], "filename", {type: "image/png"}));
                    };
                }
            };
            xhr.send();
        };
        
        $scope.getContent = function(index) {
            //var index =$scope.fields.map(function (item) {
            //    return item.attribute_id;
            //}).indexOf(parseInt(index));
            // console.log($scope.editor);
            // console.log($scope.tableItem);
            // console.log($scope.editor.value);
            $scope.tableItem[$scope.editor.col.name]=angular.copy( $scope.editor.value);
            //$scope.fields[index]=
            //$scope.activeTab=3;
            $scope.editor.isActive=false;
            $scope.editor=null;//empty editor for next time use

            //console.log($scope.editor.field.editor);
            //console.log( $scope.fields);
        };

        $scope.backToDynamicAttributeTab= function () {
            $scope.editor.isActive=false;
            $scope.editor=null;//empty editor for next time use
        };

        $scope.searchItem= function (value,col) {
            if(value){
                $http.post('/admin/api/searchItem',{
                    value:value,
                    colName:col.name,
                    table:$scope.attributeTable.id
                }).then(function (response) {
                    $scope.recommendedProduct=response.data.filter(function(item){
                        return $scope.tableItem.id!=item.id;
                    });
                    //console.log($scope.recommendedProduct[0][col.name].trim()===$scope.tableItem[col.name]);
                    //console.log(1);
                    if($scope.recommendedProduct.filter(function (item) {
                            return item[col.name].trim()==$scope.tableItem[col.name];
                        }).length>0){
                        //$scope.tableItem[col.name].invalid=true;

                        //$scope.form[col.caption].$setValidity("similar", true);
                        $scope.form[col.caption].$invalid=true;
                        console.log($scope.tableItem[col.name]);
                    }else{
                        //$scope.tableItem[col.name].invalid=false;
                        //$scope.form[col.caption].$setValidity("similar", false);
                        //console.log(0);
                        $scope.form[col.caption].$invalid=false;
                    }
                    //console.log($scope.form[col.caption]);
                    //$scope.tableItem[col.name]
                    $scope.colName=col.name;
                }, function (response) {
                    //console.log(response.data);
                })
            }
        };

        $scope.findItemById= function (id) {
            console.log($scope.attributeTable);
            //$scope.attributeTable=$scope.attributeTables[$scope.attributeTable.id-1];
            $scope.editor=null;

            $scope.tableItem=$scope.tableData.filter(function (item) {
                return item.id==id;
            })[0];
            console.log($scope.tableItem);

            $scope.attributeTable.table_columns.forEach(function (col) {
                console.log(col.type);
                if(col.type=="image"){
                    $scope.itemImages[col.name]={
                        files:[],
                        fileSrc:[]
                    };
                    $scope.getImage($scope.tableItem[col.name],col.name);
                }
                if(col.type=="string"){
                    $scope.$watch('tableItem.'+col.name, function (value) {
                        $scope.productNamesimilar=null;
                        //console.log(value);
                        //if(value){
                        //    $http.post('/admin/api/searchItem',{
                        //        value:value,
                        //        colName:col.name,
                        //        table:$scope.attributeTable.id
                        //    }).then(function (response) {
                        //        $scope.recommendedProduct=response.data.filter(function(item){
                        //            return $scope.tableItem.id!=item.id;
                        //        });
                        //        //console.log($scope.recommendedProduct[0][col.name].trim()===$scope.tableItem[col.name]);
                        //        //console.log(1);
                        //        if($scope.recommendedProduct.filter(function (item) {
                        //                return item[col.name].trim()==$scope.tableItem[col.name];
                        //            }).length>0){
                        //            $scope.tableItem[col.name].invalid=true;
                        //            //$scope.form[col.caption].$setValidity("similar", true);
                        //            //$scope.form[col.caption].$invalid=true;
                        //            console.log(1);
                        //        }else{
                        //            $scope.tableItem[col.name].invalid=false;
                        //            //$scope.form[col.caption].$setValidity("similar", false);
                        //            //console.log(0);
                        //            //$scope.form[col.caption].$invalid=false;
                        //        }
                        //        //console.log($scope.form[col.caption]);
                        //        //$scope.tableItem[col.name]
                        //        $scope.colName=col.name;
                        //    }, function (response) {
                        //        //console.log(response.data);
                        //    })
                        //}
                    },true);
                }
                //else if(col.type="boolean"){
                //    $scope.tableItem[col.name]=$scope.tableItem[col.name]=="true";
                //}
            });


            //console.log($scope.tableItem);
        };



        $scope.saveItem= function () {
            $scope.queryList=[];
            var valid=true;
            //console.log($scope.form);
            $scope.attributeTable.table_columns.forEach(function (col) {
                //console.log(col);
                //console.log(col.type);
                //console.log(col.name);
                //console.log(col.boolean);
                //console.log($scope.form[col.caption].$invalid);

                if(col.boolean && col.type=="string" &&$scope.form[col.caption].$invalid){
                    ngNotify.set(col.caption+' تکراری است ','error');
                    valid=false;
                }
            });
            if(valid){
                $http.post('/admin/api/attributeTable/saveTableItem',{
                    tableItem:$scope.tableItem,
                    attributeTable:$scope.attributeTable
                }).then(function (response) {
                    if(response.data) {
                        // console.log($scope.itemImages);
                        for (var property in $scope.itemImages) {
                            for (var i = 0; i < $scope.itemImages[property].files.length; i++) {
                                // console.log($scope.itemImages[i].files);
                                $scope.queryList.push(
                                    Upload.upload({
                                        url: location.protocol + "//" + $location.host() + '/admin/api/attributeTable/saveFile',
                                        data: {
                                            'file': $scope.itemImages[property].files[i],
                                            'name': property,
                                            'imageCode': response.data,
                                            'tableName': $scope.attributeTable.name,
                                            'no':i+1
                                        }
                                    })
                                )
                            }
                        }
                        $q.all($scope.queryList).then(function (resp) {
                            $scope.itemImages=[];
                            $scope.findById($scope.attributeTable.id);
                        });
                    }else{
                        $scope.findById($scope.attributeTable.id);
                    }
                }, function (response) {
                    console.warn(response);
                })
            }

            //return ;

        };

        $scope.save= function () {
            if($scope.form.$invalid){
                ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
                return;
            }else{

                $http.post('/admin/api/saveAttributeTable',{
                    'attributeTable':$scope.attributeTable
                }).then(function (response) {
                    $scope.loadAll();
                })
            }
        };

        $scope.importFromCsv= function () {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'ImportFromCsvController',
                templateUrl:'ImportFromCsv.html',
                resolve:{
                    'table': function () {
                        return $scope.attributeTable.id;
                    },
                    'attributeTable': function () {
                        return $scope.attributeTable
                    }
                }
            });
            modalInstance.result.then(function (len) {
                ngNotify.set(len+"رکورد ثبت شد"  );
                $scope.findById($scope.attributeTable.id);
            }, function () {
                ngNotify.set("هیچ تغییری ثبت نشد" );
            })
        };

    }]);
angular.module('adminPanel').controller('deleteRecordController', ["$http", "$scope", "$uibModalInstance", "table", "recordId", function ($http,$scope,$uibModalInstance,table,recordId){
    $http.post('/admin/api/getUsedRecords',{
        table:table,
        recordId:recordId
    }).then(function (response) {
        console.log(response.data);
        $scope.productCount=response.data.length;
    }, function (resposne) {
        console.log(resposne)
    });

    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
    $scope.ok= function () {
        $uibModalInstance.close();
    }

}]);
angular.module('adminPanel').controller('ImportFromCsvController', ["$http", "$resource", "$scope", "$uibModalInstance", "table", "attributeTable", function ($http,$resource,$scope,$uibModalInstance,table,attributeTable) {
    $scope.table={};
    $scope.delimeter=',';
    var AttributeTable=$resource('/admin/api/attributeTable/:id');
    AttributeTable.get({id:table}, function (data) {
        $scope.table=data;
    });
    $scope.attributeTable=attributeTable;
    var columns=$scope.attributeTable.table_columns.filter(function (item) {
        return item.boolean==true;
    });
    $scope.fileNameChanged= function (ele) {
        $scope.table.fileContent=null;
        var file=ele.files;
        //console.log(file);
        var reader=new FileReader();
        reader.onload= function(){
            $scope.table.fileContent = reader.result.split('\n');
            $scope.$apply();
            //console.log($scope.fileContent);
            for(var i =0 ;i<$scope.table.fileContent.length;i++){
                var row= $scope.table.fileContent[i].split($scope.delimeter);
                var temp={};
                for(var j=0;j<columns.length;j++){
                    temp[columns[j].name]=row[j];
                }
                $scope.table.fileContent[i]=temp;
            }
            //console.log($scope.table.fileContent);
        };
        reader.readAsText(ele.files[0]);
    };
    $scope.ok= function () {
        //console.log($scope.table.fileContent);
        //return;
        if($scope.form.$invalid)
        {
            return;
        }
        else {
            //console.log($scope.table);
            $http.post('/admin/api/attributeTable/saveTableItems',{
                attributeTable:$scope.attributeTable,
                table:$scope.table,
                delimeter:$scope.delimeter

            }).then(function (response) {
                //console.log(response.data);
                $uibModalInstance.close($scope.table.fileContent.length);
            }, function (response) {
                console.warn(response);
            });
        }
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);

angular.module('adminPanel').controller('CreateNewColumn', ["$http", "$scope", "$uibModalInstance", "colId", function ($http,$scope,$uibModalInstance,colId) {

    $scope.colTypes=[
        {
            name:'دودویی',
            value:'boolean'
        },
        {
            name:'رشته',
            value:'string'
        },
        {
            name:'متن',
            value:'text'
        },
        {
            name:'عدد',
            value:'integer'
        },
        {
            name:'رنگ',
            value:'char'
        },
        {
            name:'عکس',
            value:'image'
        }
    ];

    $scope.colInputs=[
        {
            name:'کادر تأیید',
            value:'checkbox'
        },
        {
            name:'رشته',
            value:'text'
        },
        {
            name:'متن',
            value:'editor'
        },
        {
            name:'عدد',
            value:'number'
        },
        {
            name:'رنگ',
            value:'color'
        }
    ];

    if(colId){
        $http.get('/admin/api/tableColumn/show/'+colId).then(function (response) {
            $scope.col=response.data;
        })
    }
    $scope.checkName= function (value) {
        if(!value){
            return value;
        }
        var english = /^[A-Za-z0-9'";:)(*&^%$#@!~`|\\/.,-\_ +]*$/;
        var value=String( value).match(english);
        if(value==null)
        {
            //ngNotify.set('لطفا به صورت لاتین وارد کنید','error');
            return null;
        }
        else return value[0];
        //console.log(String( value).match(english));
        //return String( value).match(english);
    };

    $scope.ok= function () {
        console.log(1);
        $http.post('/admin/api/tableColumn/save',{
            col:$scope.col
        }).then(function (response) {
            console.log(response.data);
            $uibModalInstance.close();
        })
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    };
}]);
/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('authController', ["$scope", "$auth", "$state", "$http", "$rootScope", "AclService", function ($scope,$auth,$state,$http,$rootScope,AclService) {

        //console.log("asdf");
        $scope.login= function () {
            $scope.loginError=false;
            $auth.login({email:$scope.email,password:$scope.password}).then(function () {
                return $http.get('/admin/api/authenticate/user');

            }, function (error) {
                $scope.loginError = true;
                $scope.loginErrorText = error.data.error;
                console.log($scope.loginErrorText);
            }).then(function (response) {
                console.log(response.data);
                var user = JSON.stringify(response.data.user);
                localStorage.setItem('user',user);
                $rootScope.authenticated=true;
                $rootScope.currentUser=response.data.user;
                $state.go('dashboard',{});
                AclService.flushRoles();
                var userRole=JSON.parse(localStorage.getItem('user')).roles;
                for(var i=0;i<userRole.length;i++){
                    AclService.attachRole(userRole[i].name);
                }
            })
        }
    }]);

/**
 * Created by alireza on 4/26/17.
 */
angular.module('adminPanel').controller('campaignController', ["$scope", "ngNotify", "$http", "$uibModal", "Upload", function ($scope,ngNotify,$http,$uibModal,Upload) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.product=null;
    $scope.productCampaignCaption="کمپین";
    $scope.productListCaption="لیست کمپین ها";
    $scope.products=null;
    $scope.title='لیست کمپین ها';
    $scope.theads=[
        {
            field:'id',
            displayName:'شماره کمپین',
            template:'' +
            '<span>' +
            '   <a href="/campaign?cam={{item.id}}">{{item.id|persian}}</a>' +
            '</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC'
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true
        },
        //{
        //    field:'type',
        //    displayName:'نوع',
        //    filterable:true,
        //    editable:true,
        //    sortable:true
        //},
        // {
        //     field:'start_date',
        //     displayName:'تاریخ شروع',
        //     //filterable:true,
        //     editable:true,
        //     sortable:true,
        //     template:"<span>{{item.start_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
        //     filtering:"" +
        //     "<div class='input-group'>" +
        //     "<input  type=\"text\" class=\"form-control\" " +
        //     "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
        //     "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
        //     "</div>"
        // },
        // {
        //     field:'end_date',
        //     displayName:'تاریخ پایان',
        //     filterable:true,
        //     editable:true,
        //     sortable:true,
        //     template:"<span>{{item.end_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
        //     filtering:"" +
        //     "<div class='input-group'>" +
        //     "<input  type=\"text\" class=\"form-control\" " +
        //     "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
        //     "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
        //     "</div>"
        // },
        // {
        //     field:'disc_description',
        //     displayName:'تخفیف',
        //     filterable:true,
        //     editable:true,
        //     sortable:true
        // },
        // {
        //     field:'products',
        //     displayName:'محصولات',
        //     template:"" +
        //     "<span>" +
        //     "   <ul class='list-unstyled'>" +
        //     "       <li ng-repeat='product in item.products'>{{product.id}}." +
        //     "           <span ng-show='product.name'>{{product.name}}</span>" +
        //     "           <span ng-show='!product.name'>{{product.lName}}</span>" +
        //     "       </li>" +
        //     "   </ul>" +
        //     "</span>",
        //     filterable:true
        // }
    ];
    $scope.datepickerConfig = {
        //allowFuture: false,
        dateFormat: 'YYYY-MM-DD hh:mm:ss'
        //gregorianDateFormat: 'YYYY/DD/MM'
        //minDate: moment.utc('2008', 'YYYY')
    };
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'edit_campaign'
        }
        //loadAllFunction:$scope.loadAll()
    };
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.nextPage= function (page) {
        $scope.page=page;
    };
    $scope.loadAll= function () {
        $scope.campaignHeader=0;
        $scope.productTheads=[
            {
                field:'id',
                displayName:'شماره محصول',
                template:'<a href="/product/{{item.id}}">{{item.id|persian}}</a>',
                sortable:true,
                filterable:true,
                sorting:'DESC'
            },
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}} {{item.lName}}" +
                "</a>",
                sortable:true
            },
            // {
            //     field:'x',
            //     displayName:'x',
            //     template:"" +
            //     "<span>" +
            //     "   {{item.x}} " +
            //     "</span>"
            // },
            // {
            //     field:'y',
            //     displayName:'y',
            //     template:"" +
            //     "<span>" +
            //     "   {{item.y}} " +
            //     "</span>"
            // },
            {
                field:'action',
                displayName:'',
                template:"" +
                "<button class='btn btn-adn' ng-click='deleteById({id:item.id})'>حذف</button>"
            },
            // {
            //     field:'campaignHeader',
            //     displayName:'سر گروه',
            //     template:"" +
            //     "<input type='radio' name='campaignHeader' ng-model='campaignHeader' " +
            //     "ng-value='item.id' ng-click='changecampaignHeader({id:item.id})' ng-checked='campaignHeader==item.id'>"
            // }
        ];
        $scope.page=1;
        $scope.id=null;
        $scope.product=null;
        $scope.title='لیست کمپین ها';
        $scope.campaign=null;
        $http.post('/admin/api/campaign/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.campaigns=response.data.campaigns;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };
    // $scope.changecampaignHeader= function (id) {
    //     $scope.campaignHeader=id;
    // };
    $scope.createNew= function () {
        //$scope.campaigns=null;
        // $scope.campaignHeader=0;
        $scope.campaign={};
        // $http.get('/admin/api/campaign/getAllDiscount').then(function (resp) {
        //     $scope.discounts=resp.data;
        // });
        $scope.loadAllProduct();
    };

    $scope.findById= function (id) {
        // var d=new Date();
        $scope.page=1;
        //$scope.campaigns=null;
        $http.post('/admin/api/campaign/show',{
            id:id
        }).then(function (response) {
            // $http.get('/admin/api/campaign/getAllDiscount').then(function (resp) {
            //     $scope.discounts=resp.data;
            // });
            $scope.campaign=response.data;
            $scope.campaignHeader=$scope.campaign.description;

            $scope.loadAllProduct(id);
            // $scope.campaign.extension=$scope.campaign.icon.split(".").pop();
            // $scope.getImage($scope.campaign.icon);
            // $scope.campaign.image="/image/campaign/"+$scope.campaign.icon+"?"+ d.getDate();
        });
    };

    // $scope.getImage= function (icon) {
    //     //console.log(id);
    //     var d=new Date();
    //     var xhr=new XMLHttpRequest();
    //     xhr.open('GET','/image/campaign/'+icon+"?"+ d.getDate(),true);
    //     xhr.responseType='blob';
    //     xhr.onload= function (event){
    //         var fileReader=new FileReader();
    //         fileReader.readAsDataURL(event.target.response);
    //         $scope.file= new File([event.target.response], "filename", {type: "image/png"});
    //         fileReader.onloadend= function () {
    //             $scope.campaign.image=fileReader.result;
    //         };
    //     };
    //     xhr.send();
    // };
    //
    // $scope.imageUpload= function (element,categoryId) {
    //     console.log(element.id);
    //     console.log(element.files);
    //     $scope.campaign.extension=element.files[0].name.split(".").pop();//set extension for save file name in db
    //     $scope.file=element.files[0];
    //     var reader=new FileReader();
    //     reader.readAsDataURL(element.files[0]);
    //     reader.onloadend=$scope.imageIsLoaded;
    // };

    // $scope.imageIsLoaded= function (e) {
    //     $scope.$apply(function () {
    //         $scope.campaign.image=e.target.result;//change e.target.result to e.target
    //         console.log(e.target);
    //     })
    // };

    $scope.loadAllProduct= function (id) {
        if(id){
            $scope.id=id;
        }

        $http.post('/admin/api/campaign/getProductsOfCampaign',{
            theads:$scope.productTheads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            id:id||$scope.id,
            sort:$scope.productTheads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            $scope.products = response.data.products;
            //$scope.products.filter(function (product) {
            //
            //    if(product.id==$scope.campaign.description){
            //        product.campaignHeader=product.id;
            //    }
            //});
            $scope.totalItem = response.data.count;
            $scope.numPages = response.data.count / $scope.showEntries;
        });
    };

    $scope.selectProduct= function (product) {
        if($scope.campaign.id){
            $http.post('/admin/api/addProductToCampaign',{
                campaign: $scope.id,
                product:product.id
            }).then(function (response) {
                //if(response.data!=1){
                //    ngNotify.set('این محصول قبلا اضافه شده است',error);
                //}else {
                $scope.loadAllProduct();
                //}
            });
        }else {
            $scope.products.push(product);
        }
    };

    $scope.deleteById= function (id) {
        //console.log(id);
        if($scope.campaign.id){
            $http.post('/admin/api/deleteProductFromCampaign',{
                campaign: $scope.id,
                product:id
            }).then(function (response) {
                $scope.loadAllProduct();
            });
        }else {
            $scope.products= $scope.products.filter(function (product) {
                return product.id!=id;
            })
        }
        //$scope.products= $scope.products.filter(function (product) {
        //    return product.id!=id;
        //});
    };

    $scope.$watch('productSearch', function (value) {
        $scope.productNamesimilar=null;
        //console.log(value);
        if(value){
            $http.get('/admin/api/campaign/search/'+value).then(function (response) {
                $scope.recommendedProduct=response.data;
            }, function (response) {
                console.log(response.data);
            })
        }
    });

    $scope.chooseProductById= function () {
        if($scope.productId){
            $http.post('/admin/api/addProductToCampaignById',{
                product: $scope.productId,
                //fk:$scope.discount.disc_group_fk,
                group: $scope.id
            }).then(function (response) {
                if(response.data){
                    console.log($scope.products);
                    $scope.products.push(response.data);
                    //$scope.loadAllProduct();
                }else
                    $scope.loadAllProduct();
            });
        }
    };

    $scope.read = function (workbook) {
        /* DO SOMETHING WITH workbook HERE */
        $scope.csv=[];
        workbook.SheetNames.forEach(function(sheetName) {
            //console.log(sheetName);
            var csv = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            $scope.csv=$scope.csv.concat(csv); //example [{id:'123',barcode:'123213123123'}]
        });
        console.log($scope.csv[0].id==undefined);
        if($scope.csv[0].id==undefined){
            $http.post('/admin/api/campaign/addProductToCampaignByBarcode',{
                campaignId:$scope.campaign.id,
                barcodes:$scope.csv.map(function (item) {
                    return item.barcode;
                })
            }).then(function (response) {
                if(!$scope.campaign.id){
                    $scope.products= $scope.products.concat(response.data);
                }else {
                    $scope.loadAllProduct();
                }
            });
        }else {
            $http.post('/admin/api/campaign/addProductToCampaignByIds',{
                campaignId:$scope.campaign.id,
                ids:$scope.csv.map(function (item) {
                    return item.id;
                })
            }).then(function (response) {
                if(!$scope.campaign.id){
                    $scope.products= $scope.products.concat(response.data);
                }else {
                    $scope.loadAllProduct();
                }
            });
        }
        //console.log($scope.csv[0].id==undefined)

        //console.log($scope.csv);
    };
    $scope.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
    };



    $scope.save= function () {
        console.log($scope.campaignHeader);
        //return ;
        $http.post('/admin/api/campaign/save',{
            campaign:$scope.campaign,
            products:$scope.products,
            campaignHeader:$scope.campaignHeader
        }).then(function (response) {
            // if(!isEmpty( response.data.icon) && response.data.icon!="" ){
            //     Upload.upload({
            //         url:"/admin/api/campaign/saveCampaignImage",
            //         data:{
            //             'file':$scope.file,
            //             'icon':response.data.icon,
            //         }
            //     }).then(function (resp) {
            //         ngNotify.set("با موفقیت ذخیره شد");
            //         $scope.loadAll();
            //     });
            // }else{
                ngNotify.set("ثبت شد" );
                $scope.loadAll();
            // }
        }, function (response) {
            console.log(response);
        })
    }
}]);


'use strict';

/**
 * @ngdoc function
 * @name wApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wApp
 */
angular.module('adminPanel')
    .controller('categoryController', ["AclService", "$scope", "$resource", "ngNotify", "$http", "$uibModal", function (AclService,$scope,$resource,ngNotify,$http,$uibModal) {
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });

        $scope.title="لیست دسته بندی ها";
        $scope.category=null;
        $scope.categories=null;
        $scope.attributes=[];
        $scope.attributeList=[];
        $scope.parentAttributes=null;
        $scope.staticAttribute=[
            {name:'نام',type:'رشته'},
            {name:'وزن',type:'عددی'},
            {name:'قیمت',type:'عددی'},
            {name:'طول',type:'عددی'},
            {name:'عرض',type:'عددی'},
            {name:'ارتفاع',type:'عددی'},
            {name:'بارکد',type:'عددی'},
            {name:'نام لاتین',type:'رشته'},
            {name:'توضیحات',type:'رشته'},
            {name:'جزءیات',type:'رشته'},
            {name:'تصویر',type:'تصویر'}
        ];
        $scope.tree=[{}];
        $http.get('/admin/api/type').then(function (response) {
            $scope.types=response.data;
        });
        //];//TODO update multiselect min file

        var convertToTree= function (categoryList) {
            var map = {}, node, roots = [];
            for (var i = 0; i < categoryList.length; i += 1) {
                node = categoryList[i];
                node.children = [];
                map[node.id] = i; // use map to look-up the parents
                if (node.parent_id !== null) {
                    categoryList[map[node.parent_id]].children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots
        };

        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            };
        };


        var initAttributes= function ($id) {
            //create helper to get diff (parent Attribute and all attribute)
            Array.prototype.diff= function (a) {
                return this.filter(function (item) {
                    return a.map(function (attribute) {
                            return attribute.id;
                        }).indexOf(item.id)<0;
                })
            };
            $http.get('/admin/api/getAttribute').then(function (response) {
                var allAttribute=response.data;
                //همه محصولات
                if($scope.category.parent_id)
                $http.get('/admin/api/getParentAttribute/'+$scope.category.parent_id).then(function (response) {

                    $scope.parentAttributes=response.data;
                    $scope.parentAttributesId=$scope.parentAttributes.map(function (attribute) {
                        return attribute.id;
                    });
                    //get attributes that not use in parent
                    $scope.unUsedattributeList=allAttribute.diff($scope.parentAttributes);
                });

                //get attribute that set for this category
                $scope.attributes=response.data.filter(function(attribute){
                    return attribute.category_id===$id ;
                });
                $scope.attributesForAdminOrder= angular.copy($scope.attributes).sort(sortByProperty('admin_order'));
                //someArray.sort(sortByProperty('id'));
                //console.log($scope.attributes);
            }, function (response) {
                console.log(response);
            });
        };

        $scope.afterRemoveItem = function(item){
            $scope.attributesForAdminOrder=$scope.attributesForAdminOrder.filter(function (attribute) {
                return attribute.id!=item.id;
            });
            console.log(item);
            // perform operation on this item after removing it.
        };

        $scope.afterSelectItem = function(item){
            $scope.attributesForAdminOrder.push(item);
            console.log(item);
            // perform operation on this item after selecting it.
        };

        var Category=$resource('/admin/api/category/:id');
        $scope.$on('$viewContentLoaded', function () {
            $scope.loadAll();
        });
        $scope.loadAll= function () {
            Category.query(function (data) {
                $scope.parentAttributes=null;
                $scope.products=null;
                $scope.categories=angular.copy(data);
                $scope.tree=convertToTree(data);
                $scope.title="دسته بندی";
                $scope.category=null;
                $scope.attributes=[];
                $scope.selectedCategory=$scope.tempSelectedCategory;
                //console.log($scope.categories);
            }, function (response) {
                console.log(response);
            });
        };

        $scope.expanding_property_in_product_list = {
            field: "id",
            displayName: "نام",
            filterable: true,
            cellTemplate:"<span>{{row.branch.name}}</span>"
        };

        $scope.createNew=function(parent){
            //initAttributes(0);
            $http.get('/admin/api/getProductByCategory/'+parent.id).then(function (response) {
                $scope.products=response.data;
                console.log(parent);
                $scope.category={};
                $scope.category.parent_name=parent.name;
                $scope.category.parent=[{id:parent.id,name:parent.name}];
                $scope.category.parent_id=parent.id;
                //false:allow to add category for this category ,true:not allow
                if($scope.products.length>0 && false){
                    $scope.category=null;
                    ngNotify.set('این دسته بندی خود دارای کالا میباشد','error')
                }
                initAttributes($scope.category.id);
                console.log($scope.category);
            }, function (response) {
                console.log(response);
            });
            $scope.category={};
            //TODO correct parent init
            $scope.category.parent_id=parent.id;
            $scope.category.parent_name=parent.name;
            $scope.category.order=parent.children.length;
            $scope.category.id=0;//set for get no attribute
            $scope.title="دسته بندی جدید برای "+parent.name;
            //get product of category if exist

        };

        $scope.findById=function($id){
            //$scope.tempSelectedCategory=$id;
            console.log($scope.selectedCategory);
            if(!$scope.can('edit_category')){
                return
            }
            Category.get({id:$id},function(data){
                $scope.category=data;
                var parent=$scope.categories.filter(function (category) {
                    return category.id==data.parent_id;
                });
                console.log(parent);
                $scope.category.parent_id=parent[0].id;
                $scope.category.parent_name=parent[0].name;
                $scope.category.parent=[{id:parent[0].id,name:parent[0].name}];
                $scope.title='اصلاح '+data.name;
                initAttributes($scope.category.id);
                //initAttributes($id)
            },function(response){
                console.log(response);
            })
        };
        $scope.deletedCategory=[];
        var getChildren=function(category){
            //console.log(category);

            if(category.children.length==0){
                $scope.deletedCategory.push(category);
            }
            for(var i=0;i<category.children.length;i++){
                getChildren(category.children[i]);
            }
        };
        $scope.remove= function (category) {
            //$http.get('/admin/api/categoryRelation/'+category.id).then(function (response) {
            //    console.log(response.data);
            //}, function (response) {
            //    console.warn(response);
            //})
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'removeCategoryController',
                templateUrl:'removeCategory.html',
                resolve:{
                    'categories': function () {
                        //return category.id;
                        getChildren(category);
                        return $scope.deletedCategory;
                        //console.log($scope.deletedCategory)
                    },
                    'categoryId': function () {
                        return category.id;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                //console.log(response);
                $http.delete('/admin/api/category/'+response).then(function (response) {
                    $scope.loadAll();
                    ngNotify.set( "دسته بندی حذف شد");
                    $scope.deletedCategory=[];
                }, function (response) {
                    console.warn(response);
                });
            }, function () {
                $scope.deletedCategory=[];
                //console.log($scope.deletedCategory);
            })
        };
        $scope.can = AclService.can;
        console.log($scope.can("remove_category"));
        $scope.col_defs=[
            {
                field:'id',
                displayName:'شمارنده',
                filterable: true
            },
            {
            cellTemplate:"<a class='btn-lg' href='' ng-show=\'can(\"add_category\")\' ng-click='cellTemplateScope.createNew(row.branch)'><span class='glyphicon glyphicon-plus-sign'></span></a>" +
            "<a class='btn-lg' href='' ng-show=\'can(\"remove_category\")\' ng-click='cellTemplateScope.remove(row.branch)'><span class='glyphicon glyphicon-remove-sign text-red'></span></a>" ,
            cellTemplateScope:{
                createNew:$scope.createNew,
                remove:$scope.remove
            }
        }];

        $scope.save= function () {
            if($scope.form.$invalid)
            {
                ngNotify.set($scope.form.$invalid+"خطا" ,'error');
                return;
            }
            //$scope.attributesForAdminOrder.forEach(function (item,index) {
            //
            //});
            console.log($scope.attributes);
            Category.save({
                'attributeOrder':$scope.attributesForAdminOrder,
                'category':$scope.category,
                'attributes':JSON.stringify( $scope.attributes)
            }, function (data) {
                $scope.tempSelectedCategory=data.id;
                //console.log($scope.selectedCategory);
                $scope.loadAll();
            }, function (response) {
                console.warn(response)
            });
        }
    }]);

angular.module('adminPanel').controller('removeCategoryController', ["$scope", "$http", "categories", "categoryId", "$uibModalInstance", function ($scope,$http,categories,categoryId,$uibModalInstance) {
    //console.log(categories);
    $http.post('/admin/api/categoryRelation',{
        categories:categories.map(function (item) {
            if(item==undefined){//all products
                return 0;
            }
            return item.id;
        })
    }).then(function (response) {
        console.log(response.data);
        //if(response.data.length==0){
        //    $scope.categories=categories;
        //}else {
        $scope.categoriesWithProduct=response.data;
        console.log(categories);
        $scope.allCategories=categories;
        //}
        //console.log(response.data);
    }, function (response) {
        console.warn(response);
    });

    $scope.ok= function () {
        $uibModalInstance.close(categoryId);
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    }
}]);
/**
 * Created by alireza on 2/6/17.
 */
angular.module('adminPanel')
    .controller('confirmProductsController', ["$scope", "$resource", "ngNotify", "$http", "$uibModal", "getUnConfirmProductCount", "$stateParams", function ($scope,$resource,ngNotify,$http,$uibModal,getUnConfirmProductCount,$stateParams) {
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
        $scope.showEntries=10;
        $scope.title="";
        $scope.products=null;//list of all product
        $scope.product=null;
        $scope.currentPage=1;
        $scope.showEntries='50';
        $scope.temp=[];
        $scope.entries=[10,25,50,100];

        $scope.theads=[
            {
                field:'index',
                displayName:'ردیف',
                template:"<span>{{$parent.$parent.$index+1 | persian }}</span>"
            },
            {
                field:'id',
                displayName:'کد محصول',
                filterable:true,
                template:'<a href="/product/{{item.id}}">{{item.id |persian}}</a>',
                sortable:true,
                width:50,
                sorting:'DESC'
            },
            //TODO search for lName
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "</a>",
                sortable:true
            },
            {
                field:'lName',
                displayName:'نام لاتین',
                filterable:'true',
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">{{item.lName}}</a>"
            },
            {
                field:'price',
                displayName:'قیمت',
                filterable:true,
                template:"<span >{{item.price | persian}}</span>",
                width:80,
                sortable:true
            },
            {
                field:'barcode',
                displayName:'بارکد',
                filterable:true,
                width:100,
                sortable:true
            },
            {
                field:'category',
                displayName:'دسته بندی',
                template:"<span ng-repeat='category in item.categories'>{{category.name}}</span>",
                width:100,
                filterable:true
            },
            {
                field:'uDate',
                displayName:'تاریخ اخرین ویرایش',
                sortable:true,
                template:"<span>{{item.uDate | jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}}</span>",
                width:100
            },
            // {
            //     field:'gBook_id',
            //     displayName:'گسترش',
            //     sortable:true,
            //     // template:"<span>{{item.uDate | jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}}</span>",
            //     width:100,
            //     filterable:true,
            //     filtering:"" +
            //     "<div class='form-group'>" +
            //     "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            //     "   <option value=''> </option>" +
            //     "   <option value='0'> گسترش</option>" +
            //     "   <option value='1'>غیر گسترش</option>" +
            //     "   </select>"
            // },
            {
                field:'confirm',
                displayName:'انتخاب محصول',
                displayNameTemplate:"" +
                "<span>" +
                "   <label for='selectAll'>انتخاب همه</label>" +
                "   <input id='selectAll'  type='checkbox' ng-click='selectAll()' >" +
                "</span>",
                template:"<label for=\"{{$parent.$parent.$index+1}}\">انتخاب</label> " +
                "<input id=\"{{$parent.$parent.$index+1}}\" type=\"checkbox\" ng-model=\"item.confirm\" placeholder=\"انتخاب\">",
                width:80,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='0'> تایید نشده</option>" +
                "   <option value='2'>بازگشت داده شده</option>" +
                "   <option value='3'>کالا های گسترش</option>" +
                "   <option value='4'>بازبینی شده منتظر تایید</option>" +
                "   </select>" +
                "</div>"
            }
        ];

        $scope.button={
            confirmAll:{
                permission:'confirm_product'
            },
            //selectAllProduct:true,
            //blindConfirm:{
            //    permission:'confirm_product'
            //}

        };

        $scope.allProduct= function () {
            //console.log($scope.selectAllProductState);
            $scope.selectAllProductState=!$scope.selectAllProductState;
            $scope.selectAll();
        };

        var ConfirmProducts=$resource('/admin/api/confirmProducts/:id');

        $scope.onSearchInputKeyPress= function (event) {
            if(event.charCode==13){
                //$scope.searchProduct(value);
                $scope.loadAll();
            }
        };

        $scope.blindConfirm= function () {
            $http.get('/admin/api/blindConfirm/Confirm').then(function (response) {
                //console.log(response);
                $scope.loadAll();
            }, function (response) {
                console.log(response);
            })
        };

        $scope.confirmAll= function () {
            var products;
            if($scope.selectAllProductState){

                products=$scope.idOfAllProduct;
            }else {
                products=$scope.products.filter(function (product) {
                        return product.confirm==true;
                    })
                    .map(function (product) {
                        return product.id
                    });
            }
            //var products=$scope.products.filter(function (product) {
            //    return product.confirm==true;
            //}).map(function (product) {
            //    return product.id;
            //});
            $http.post('/admin/api/confirmProducts/confirmSelected',{
                selected:products
            }).then(function (response) {
                //console.log(response.data);
                getUnConfirmProductCount.count();
                $scope.loadAll();
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.getItemOfTableById= function (value,table) {
            if($scope.temp[table]==undefined){//if table not set set it and child
                $scope.temp[table]={};
            }
            $http.post('/admin/api/getItemOfTableById',{
                item:[table,value]
            }).then(function (response) {
                $scope.temp[table][value]=response.data;
            });
        };

        $scope.selectAll= function () {
            //console.log(1);
            $scope.productSelectAllCheck=!$scope.productSelectAllCheck;
            $scope.products.forEach(function (product) {
                //console.log(product);
                product.confirm=$scope.productSelectAllCheck;
            });
        };

        $scope.$on('$viewContentLoaded', function () {
            if($stateParams.confirm){
                for(var i=0;i<$scope.theads.length;i++){
                    if($scope.theads[i].field==="confirm"){
                        $scope.theads[i].filter=$stateParams.confirm;
                        break;
                    }
                }
            }
            $scope.loadAll();
        });

        $scope.loadAll= function () {
            $scope.selectAllProductState=false;
            $scope.title="تایید محصولات";
            $scope.product=null;
            $scope.productSelectAllCheck=false;
            $scope.selectAllCheckbox=false;
            $http.post('/admin/api/confirmProducts',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined && thead.filter!="";
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.products=response.data.products;
                $scope.foreignStocks=response.data.foreignStocks;
                $scope.idOfAllProduct=response.data.count;
                $scope.totalItem=response.data.count.length;
                $scope.numPages=response.data.count/$scope.showEntries;
            })
        };

        var getFields= function (fields) {
            var finalFields={};
            fields.forEach(function (field) {
                if(!finalFields[field.attribute_id]){
                    finalFields[field.attribute_id]=[];
                }
                finalFields[field.attribute_id].push(field.value);
            });
            console.log(finalFields);
            return finalFields;
        };

        $scope.findById= function ($id) {

            $scope.imageDate=(new Date()).getTime();

            $scope.products=null;
            ConfirmProducts.get({id:$id}, function (data) {
                $scope.product=data.product;
                $scope.categories=data.categories;
                $scope.fieldsForPack =getFields(data.product.fields);
                //console.log(data);
                $scope.getImage($scope.product.image,false);
                console.log($scope.product);
                //$scope.title='تایید محصول'+$scope.product.name;
            })
        };

        $scope.getImage= function (imageName,field) {
            $http.post("/admin/api/getFiles",{
                'name':imageName,
                'attributeLabel': field.name
            }).then( function (response) {
                console.log(response.data);
                if(typeof response.data =='string'){

                }else if(field==false){
                    var regex = /..\/public\/image\/pic\/new\/[0-9]*\/.*\/.*/g;
                    $scope.product.Images=response.data.filter(function (file) {
                        return  !file.dirname.match(regex) && file.filename=='sm';
                    });
                    console.log($scope.product.Images);
                    //    response.data.filter(function (file) {
                    //    return file.filename=='lg' && file.dirname.length<=response.data[0].dirname.length+1;
                    //});
                    $scope.product.Images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                }
                else{
                    field.images=response.data.filter(function (file) {
                        return file.filename=='sm' && file.dirname.indexOf(field.name);
                    });
                    field.images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                    console.log(field.images);
                }


            }, function (response) {
                console.log(response.status);
            });
        };

        $scope.confirm= function () {
            //console.log(1);
            //var author=
            $http.post('/admin/api/confirmProducts/confirmSelected',{
                selected:[$scope.product.id]
            }).then(function (response) {
                //console.log(response.data);
                getUnConfirmProductCount.count();
                $scope.loadAll();
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.rejectProduct= function () {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'rejectProductController',
                templateUrl:'rejectProduct.html',
                resolve:{
                    'product_id': function () {
                        return $scope.product.id;
                    }
                }
            });
            modalInstance.result.then(function () {
                $scope.loadAll();
            }, function (response) {

            });
        };
        
        $scope.imageClick=function (dirname) {
            // console.log(dirname);
            // var modalInstance=$uibModal.open({
            //     animation:true,
            //     windowClass: 'modal-window-xlg',
            //     controller:'showImageController',
            //     templateUrl:'/views/confirmProducts/showImage.html',
            //     resolve:{
            //         'dirname': function () {
            //             return dirname;
            //         }
            //     }
            // });
            // modalInstance.result.then(function (response) {
            //
            // },function (response) {
            //
            // })
            $scope.modalStyle={
                "display":"block"
            };

            $scope.imageToShow=dirname;
        };

        $scope.closeImageModal=function () {
            $scope.modalStyle={
                "display":"none"
            };
        };

        $scope.recommendPack= function () {
            $scope.writer=angular.copy($scope.product);
            console.log($scope.categories);
            var modalInstance=$uibModal.open({
                animation:true,
                windowClass: 'modal-window-xlg  recommended-pack-in-confrm',
                controller:'recommendPackController',
                templateUrl:'/views/confirmProducts/recommendedPack.html',
                size: 'lg',
                resolve:{
                    "categories": function () {
                        return $scope.categories;
                    },
                    'product': function () {
                        return $scope.product;
                    },
                    'fields':function(){
                        return $scope.fieldsForPack;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                //$scope.loadAll();
                console.log(response);
                //$scope.packCreated=true;
            }, function (response) {
                console.log(response);
            });
        };

        $scope.selectReview=function () {
            var modalInstance=$uibModal.open({
                animation:true,
                // windowClass: 'modal-window-xlg  recommended-pack-in-confrm',
                controller:'selectReviewController',
                templateUrl:'/views/confirmProducts/selectReview.html',
                size: 'lg',
                resolve:{
                    "categories": function () {
                        return $scope.categories;
                    },
                    'product': function () {
                        return $scope.product;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                //$scope.loadAll();
                console.log(response);
                //$scope.packCreated=true;
            }, function (response) {
                console.log(response);
            });
        }
    }]);

angular.module('adminPanel').controller('showImageController', ["$scope", "$uibModalInstance", "dirname", function ($scope,$uibModalInstance,dirname) {
    console.log(dirname);
    $scope.dirname=dirname;
}]);
angular.module('adminPanel').controller('selectReviewController', ["$interpolate", "ngNotify", "$uibModalInstance", "$http", "$scope", "categories", "product", function ($interpolate,ngNotify,$uibModalInstance,$http, $scope, categories,product) {
    $http.post('/admin/api/confirmProduct/getReviewByCategory',{
        categories:categories[0].map(function (category) {
            return category.id;
        }),
        product:product
    }).then(function (response) {
        $scope.templates=response.data.templates;
        $scope.fields=response.data.fields;
        $scope.existedAttributes=Object.keys($scope.fields);
        console.log($scope.existedAttributes);
        //var html=$scope.templates[10].sub_templates[0].text;
        $scope.templates.forEach(function (template) {
            template.text="";

            template.sub_templates.forEach(function (sub_template) {
                var attributes= sub_template.text.match(/fields\.(.*?) }}/g);
                //if is raw text
                if(!attributes){
                    template.text+=$interpolate(sub_template.text)($scope);
                }else{
                    console.log(attributes);
                    if( !attributes.some(function (v) {
                            //console.log(v.substring(7, v.length-3));
                            //console.log($scope.existedAttributes.indexOf(v.substring(7, v.length-3)));
                            return $scope.existedAttributes.indexOf(v.substring(7, v.length-3))<0;
                        })){
                        template.text+=$interpolate(sub_template.text)($scope);
                    }
                }


            })
        })

    });

    $scope.select= function (id) {
        $http.post('/admin/api/confirmProduct/saveReview',{
            text:$scope.templates[id].text,
            productId:product.id
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
            $uibModalInstance.close();
        });
        //console.log($scope.templates[id].text);
    }
}]);
angular.module('adminPanel').controller('recommendPackController', ["ngNotify", "$uibModalInstance", "$http", "$scope", "categories", "fields", "product", function (ngNotify,$uibModalInstance,$http, $scope, categories,fields,product) {
    //$scope.productToConfirm=product;
    product.selected=true;
    $scope.productItself=product;
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.temp=[];
    $scope.hardCodePackProduct=null;
    $scope.recommendedPacks=null;
    $scope.selectProductCheck=false;
    $scope.pack={};
    $scope.pack.start_date=moment().format('YYYY-MM-DD hh:mm:ss');
    $scope.pack.end_date=moment('2018-03-20 12:03:31').format('YYYY-MM-DD hh:mm:ss');
    //$scope.packCreated=false;
    $http.get('/admin/api/confirmProduct/getAllDiscount').then(function (resp) {
        $scope.discounts=resp.data;
    });
    console.log(fields);
    $scope.datepickerConfig = {
        //allowFuture: false,
        dateFormat: 'YYYY-MM-DD hh:mm:ss'
        //gregorianDateFormat: 'YYYY/DD/MM'
        //minDate: moment.utc('2008', 'YYYY')
    };
    $http.post('/admin/api/getRecommendedPack',{
        categories:categories[0].map(function (category) {
            return category.id;
        }),
        fields:fields,
        product_id:product.id,
        product_price:product.price
    }).then(function (response) {
        $scope.recommendedPacks=response.data.recommendedPack;
        $scope.allProduct=[];
        $scope.recommendedPacks.forEach(function (recommendedPack) {
            $scope.allProduct=$scope.allProduct.concat(recommendedPack.products);
            //product.selected=true;
            //recommendedPack.products.push(product);
        });
        //hard code pack recommend
        $scope.hardCodePackProduct=response.data.writers.concat(response.data.publishers);
        $scope.series=response.data.seri;

        //console.log(product);
        //product.fields=product.fields.filter(function (field) {
        //    return (field.table==1 && field.attribute_id==6)||(field.table==2 && field.attribute_id==8)||(field.table==7 && field.attribute_id==47);
        //});
        //product.selected=true;

        $scope.hardCodePackProduct=$scope.hardCodePackProduct.concat($scope.series);
        //end hard code recommend

        $scope.oldPacks=response.data.oldPacks;
        $scope.oldPacks.forEach(function (oldPack) {
            oldPack.products.forEach(function (product) {
                product.selected=true;
            });
            oldPack.products=oldPack.products.concat($scope.allProduct);
            //remove duplicate product if exist
            var flag={};
            oldPack.products=oldPack.products.filter(function (product) {
                if(flag[product.id]){
                    return false;
                }
                flag[product.id]=true;
                return true;
            });
            //oldPack.products.push()
        });
        //
        //
        //$scope.products.push(product);
        //$scope.series.push(product);
        //
        $scope.pack.name="پک"+" "+ product.name+"-"+product.lName;
        $scope.pack.description=product.id;
    });
    $scope.getItemOfTableById= function (value,table) {
        if(table==null){
            return;
        }
        if($scope.temp[table]==undefined){//if table not set set it and child
            $scope.temp[table]={};
        }
        $http.post('/admin/api/getItemOfTableById',{
            item:[table,value]
        },{cache:true}).then(function (response) {
            $scope.temp[table][value]=response.data;
            //console.log($scope.temp);
        });
    };

    $scope.edit= function (oldPack) {
        var selectedProduct;
        selectedProduct= oldPack.products.filter(function (product) {
            return product.selected==true;
        });

        if(!oldPack.start_date || !oldPack.end_date){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            //return;
        }else if(selectedProduct.length==1){
            ngNotify.set("لطفا حداقل یک محصول انتخاب کنید" ,'error');
        }
        //else if(selectedProduct.length>3){
        //    ngNotify.set("لطفا حداکثر ۳ محصول انتخاب کنید" ,'error');
        //}
        else {
            $http.post('/admin/api/confirmProduct/savePack',{
                pack:oldPack,
                products:selectedProduct.map(function (product) {
                    return product.id
                })
            }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                //$scope.loadAll();
                $uibModalInstance.close();
            }, function (response) {
                console.log(response);
            })
        }
    };

    $scope.saveHardCodePack= function () {
        var selectedProduct=[];
        //$scope.recommendedPacks.forEach(function (recommendedPack) {
        //    selectedProduct=selectedProduct.concat( recommendedPack.products.filter(function (product) {
        //        return product.selected;
        //    }));
        //});
        selectedProduct=$scope.hardCodePackProduct.filter(function (product) {
            return product.selected;
        });
        selectedProduct.push(product);
        console.log(selectedProduct);
        //var selectedProduct;
        //selectedProduct= products.filter(function (product) {
        //    return product.selected==true;
        //});

        //return ;
        //var product

        if(!$scope.pack.start_date || !$scope.pack.end_date){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            //return;
        }else if(selectedProduct.length==1){
            ngNotify.set("لطفا حداقل یک محصول انتخاب کنید" ,'error');
        }
        //else if( selectedProduct.length>3){
        //    ngNotify.set("لطفا حداکثر ۳ محصول انتخاب کنید" ,'error');
        //}
        else {
            $http.post('/admin/api/confirmProduct/savePack',{
                pack:$scope.pack,
                products:selectedProduct.map(function (product) {
                    return product.id
                })
            }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                //$scope.loadAll();
                $uibModalInstance.close();
            }, function (response) {
                console.log(response);
            })
        }
    };

    $scope.save= function (products) {
        //console.log($scope.pack);
        //console.log($scope.products);
        //console.log($scope.series);
        var selectedProduct=[];
        $scope.recommendedPacks.forEach(function (recommendedPack) {
            selectedProduct=selectedProduct.concat( recommendedPack.products.filter(function (product) {
                return product.selected;
            }));
        });
        selectedProduct.push(product);
        console.log(selectedProduct);
        //var selectedProduct;
        //selectedProduct= products.filter(function (product) {
        //    return product.selected==true;
        //});

        //return ;
        //var product

        if(!$scope.pack.start_date || !$scope.pack.end_date){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            //return;
        }else if(selectedProduct.length==1){
            ngNotify.set("لطفا حداقل یک محصول انتخاب کنید" ,'error');
        }
        //else if( selectedProduct.length>3){
        //    ngNotify.set("لطفا حداکثر ۳ محصول انتخاب کنید" ,'error');
        //}
        else {
            $http.post('/admin/api/confirmProduct/savePack',{
                pack:$scope.pack,
                products:selectedProduct.map(function (product) {
                        return product.id
                    })
            }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                //$scope.loadAll();
                $uibModalInstance.close();
            }, function (response) {
                console.log(response);
            })
        }
    };
    $scope.selectAll= function (products) {
        //console.log(1);
        $scope.selectProductCheck=!$scope.selectProductCheck;
        products.filter(function (product) {
            product.selected=$scope.selectProductCheck;
        });
        //console.log($scope.products);
    };

    $scope.return= function () {
        $uibModalInstance.dismiss();
    }
}]);
angular.module('adminPanel').controller('rejectProductController', ["getRejectedProduct", "getGostareshProduct", "getUnConfirmEditedProduct", "$uibModalInstance", "$http", "$scope", "product_id", "getUnConfirmProductCount", function (getRejectedProduct,getGostareshProduct,getUnConfirmEditedProduct,$uibModalInstance,$http, $scope, product_id,getUnConfirmProductCount) {
    $scope.reject= function () {
        $http.post('/admin/api/rejectProduct',{
            selected:[product_id],//use list maybe next time want to select multi product to reject
            rejectDescription:$scope.rejectDescription
        }).then(function (response) {
            getUnConfirmProductCount.count();
            getRejectedProduct.count();    getUnConfirmEditedProduct.count();    getGostareshProduct.count();
            $uibModalInstance.close();
            //$scope.loadAll();
        }, function (response) {
            console.warn(response);
        })
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    }
}]);
/**
 * Created by alireza on 9/21/17.
 */
angular.module('adminPanel').controller('criticalTemplateController', ["$uibModal", "AclService", "$scope", "ngNotify", "$http", function ($uibModal,AclService,$scope,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.criticalTemplateCaption="نقد قالبی";
    $scope.tree=[{}];//first must set it
    $scope.categoryList=[];
    $scope.theads=[
        {
            field:'review_template.review_template_id',
            displayName:'شماره نقد قالبی',
            template:'<span>{{item.review_template_id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({$id:item.review_template_id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            width:200
        },
        {
            field:'operatorName',
            displayName:'نام نویسنده ',
            template:"<span>{{item.operatorName}}</span>",
            filterable:true,
            sortable:true,
            width:200
        }
    ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_attribute'
        }
        //loadAllFunction:$scope.loadAll()
    };

    //quick category
    $scope.chooseCategory= function (quickCategory) {
        console.log(quickCategory);
        console.log(quickCategory);
        if(quickCategory){
            //expand tree .first get name by id then send it to expandTo
            $scope.expandTo= $scope.categoryList.filter(function (category) {
                return category.id==quickCategory;
            })[0].name;
            console.log( $scope.expandTo);
            $scope.addToCategories2($scope.categoryList.filter(function (category) {
                return category.id==quickCategory;
            })[0]);
        }
        quickCategory="";
    };

    $scope.addToCategories= function(category){

        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories=$scope.categories.filter(function (cat) {
                return cat.id!==category.id;
            })
        }
        //console.log($scope.categories);
    };
    $scope.addToCategories2= function(category){
        console.log(category);
        category.checkbox=!category.checkbox;
        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories = $scope.categories.filter(function (cat) {
                return cat.id !== category.id;
            })
        }
        //console.log($scope.categories);
    };
    $scope.col_defs=[{
        field:'checkbox',
        displayName:'انتخاب',
        cellTemplate:"<input type='checkbox'  ng-model='row.branch[col.field]'  ng-click='cellTemplateScope.addToCategories(row.branch)'>" ,
        cellTemplateScope:{
            addToCategories:$scope.addToCategories
        }
    }];
    //convert tree to flat i think.
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    // $scope.editorToolbar=[{ name: 'styles', groups: [ 'styles' , 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph', 'basicstyles', 'cleanup'] }];



    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function () {
        $scope.category=false;
        $scope.showAttributes=false;
        $scope.attributes=[];
        $scope.criticalTemplate=null;
        $scope.requiredAttribute=null;
        $scope.notRequiredAttribute=null;
        $scope.subContents=[{text:""}];
        $scope.categories=[];
        $scope.mainContent="";
        $http.post('/admin/api/criticalTemplate/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined && thead.filter!="";
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            $scope.criticalTemplates=response.data.criticalTemplates;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        });
        // if($scope.categoryList.length===0){
            $http.get('/admin/api/category').then(function (response) {
                $scope.categoryList=response.data.filter(function (category) {
                    return category.parent!==null;
                });
                $scope.tree=convertToTree(response.data);
            });
        // }
    };

    $scope.createNew= function () {
        $scope.criticalTemplate={};
        $scope.category=true;
    };

    $scope.findById= function (id) {
        $scope.category=true;
        $scope.criticalTemplate=$scope.criticalTemplates.filter(function (item) {
            return item.review_template_id==id;
        })[0];

        console.log($scope.criticalTemplate);
        console.log(id);

        $http.post('/admin/api/criticalTemplate/getSubTemplateById',{
            review_template_id: $scope.criticalTemplate.review_template_id
        }).then(function (response) {
            $scope.subContents=response.data;
            $scope.mainContent=$scope.subContents.map(function (content) {
                return content.text;
            }).join(' ');
        });
        $scope.criticalTemplate.categories.forEach(function (category) {
            // $scope.addToCategories2(category);
            $scope.chooseCategory(category.id);
        });
    };

    $scope.save=function () {
        var attribtues=$scope.mainContent.match(/{{([^{}]+)}}/g);

        // $scope.subContents.forEach(function (subContent) {
        //     attribtues= attribtues.concat(subContent.match(/{{(.*?)}}/g));
        // })
        // console.log(attribtues);
        // return ;

        var replacement={
            '{{':"",
            '}}':""
        };
        $scope.criticalTemplate.attributes=[];
        //create helper fields
        //save property of attribute
        if(!attribtues){
            ngNotify.set('حداقل از یک ویژگی استفاده کنید','error');
        }
        attribtues.forEach(function (attribtue) {
            var item=attribtue.replace(/{{|}}/gi,function (matched) {
                return replacement[matched];
            }).split('.');
            if(item[0]==="table"){
                //
                $scope.criticalTemplate.attributes.push({
                    name:item[1],
                    type:item[0],
                    attributeName:item[1].split('_')[0],
                    columnName:item[1].split('_')[1],
                    tableName:item[1].split('_')[2]
                })
            }else{
                $scope.criticalTemplate.attributes.push({
                    name:item[1],
                    type:item[0],
                    attributeName:item[1].slice(1)
                })
            }
        });
        console.log($scope.criticalTemplate.attributes);
        $http.post('/admin/api/criticalTemplate/save',{
            categories:$scope.categories.map(function (category) {
                return category.id;
            }),
            subContents:$scope.subContents,
            criticalTemplate:$scope.criticalTemplate
            // attributes:attribtues
        }).then(function (response) {
            ngNotify.set('با موفقیت ذخیره شد');
            $scope.loadAll();
        })
    };

    //get attributes for drag and drop
    $scope.getAttributes= function () {
        if(!$scope.criticalTemplate.name){
            ngNotify.set('نام نقد قالبی اجباریست',"error");
            return;
        }
        $http.post('/admin/api/criticalTemplate/getAttributeByCategory',{
            'category' : $scope.categories.map(function (category) {
                return category.id;
            })
        }).then(function (response) {

            //static attributes
            $scope.attributes[0]=[
                {
                    name:'name',
                    caption:'نام',
                    type:'product'
                },
                {
                    name:'lName',
                    caption:'نام لاتین',
                    type:'product'
                },
                {
                    name:'barcode',
                    caption:'بارکد',
                    type:'product'
                },
                {
                    name:'price',
                    caption:'قیمت',
                    type:'product'
                },
                {
                    name:'weight',
                    caption:'وزن',
                    type:'product'
                },
                {
                    name:'length',
                    caption:'طول',
                    type:'product'
                },
                {
                    name:'width',
                    caption:'ارتفاع',
                    type:'product'
                },
                {
                    name:'height',
                    caption:'عرض',
                    type:'product'
                },
                {
                    name:'description',
                    caption:'توضیحات',
                    type:'product'
                },
                {
                    name:'details',
                    caption:'جزئیات',
                    type:'product'
                },
                {
                    name:'categories',
                    caption:'دسته بندی',
                    type:'categories'
                }
            ];

            //dynamic attributes required
            $scope.attributes[1]=response.data.attributes.filter(function (attribute) {
                return attribute.required===1 && attribute.table!==5;
            }).map(function (attribute) {
                return {
                    'name':attribute.name,
                    'caption':attribute.caption,
                    'type':'attribute'
                }
            });

            //dynamic attributes not required
            $scope.attributes[2]=response.data.attributes.filter(function (attribute) {
                return attribute.required!==1 && attribute.table!==5;
            }).map(function (attribute) {
                return {
                    'name':attribute.name,
                    'caption':attribute.caption,
                    type:'attribute'
                }
            });


            //dynamic attributes  with review
            $scope.attributes[3]=response.data.attributes.filter(function (attribute) {
                if(attribute.table==5)
                    console.log(attribute.table);
                return attribute.table===5;
            }).map(function (attribute) {
                return {
                    'name':attribute.name,
                    'caption':attribute.caption,
                    type:'review'
                }
            });

            //get table attributes
            $scope.attributes[4]=response.data.attributes.filter(function (attribute) {
                return attribute.table && attribute.type===13;
            }).map(function (attribute) {
                return {
                    'name':"S"+attribute.name,
                    'caption':attribute.caption,
                    type:'similar',
                }
            });


            console.log($scope.attributes[3]);

            $scope.attributes[5]=response.data.attributes.filter(function (attribute) {
                return attribute.type===11;
            }).map(function (attribute) {
                return {
                    'name':attribute.name,
                    'caption':attribute.caption,
                    type:'attribute'
                }
            });

            //get column of table for attributes
            $scope.attributesHeaders=[
                {
                    id:0,
                    caption:"ویژگی های ثابت"
                },
                {
                    id:1,
                    caption:"ویژگی های ضروری"
                },
                {
                    id:2,
                    caption:"ویژگی غیر ضروری"
                },
                {
                    id:3,
                    caption:"نقد"
                },
                {
                    id:4,
                    caption:"محصول این ویژگی"
                },

                {
                    id:5,
                    caption:"عکس"
                }
            ];
            response.data.attributes.filter(function (attribute) {
                return attribute.table && attribute.type===13;
            }).forEach(function (attribute,index) {
                $scope.attributesHeaders.push({
                    id:index+6,
                    caption:attribute.caption
                });
                var attributeTable=response.data.attributeTables.filter(function (attributeTable) {
                    return attributeTable.id===attribute.table
                })[0];
                $scope.attributes[index+6]=attributeTable.table_columns.map(function (item) {
                    return {
                        'name':attribute.name+"_"+item.name+"_"+attributeTable.name,
                        'caption':item.caption,
                        type:'table',
                    }
                })
            });




            // response.data.attributeTables.forEach(function (attributeTable,index) {
            //     $scope.attributesHeaders.push({
            //         id:index+4,
            //         caption:"جدول "+attributeTable.caption
            //     });
            //     $scope.attributes[index+4]=attributeTable.table_columns.map(function(item){
            //         return {
            //             'name':attributeTable.name+"_"+item.name,
            //             'caption':item.caption,
            //             type:'table',
            //         }
            //     });
            // });

            console.log($scope.attributes[3]);


            console.log($scope.attributes);
        })
    };

    $scope.updateMainContent= function () {

        $scope.mainContent=$scope.subContents.map(function (content) {
            return content.text;
        }).join(' ');
        // $scope.criticalTemplate.attribtues=$scope.mainContent.match(/\{\{([^{}]+)\}\}/g);
        //console.log($scope.mainContent)
    };

    $scope.addContent= function (index) {
        // $scope.subContents.push({text:" "});
        if(index>=0){
            $scope.subContents.splice(index+1,0,{text:"" +
            "<p style='font-size: 14px'>123</p>"});
        }else {
            $scope.subContents.splice(0,0,{text:"" +
            "<p style='font-size: 14px'>123</p>"});
        }
    };

    $scope.removeContent= function (index) {
        $scope.subContents.splice(index,1);
    }

    $scope.showAndHideAttributes=function () {
        $scope.showAttributes=!$scope.showAttributes;
    }

    $scope.emptyAttribute=function () {
        $scope.attributes=[];
    }

}]);
/**
 * Created by alireza on 12/26/16.
 */
angular.module('adminPanel')//$auth
    .controller('dashboardController', ["AclService", "$scope", "$rootScope", "$state", "$http", "$auth", function (AclService,$scope,$rootScope,$state,$http,$auth) {
        $scope.text3=$scope.text1+$scope.text2;
        if(!$rootScope.authenticated){
            $http.get('/admin/api/authenticate/user').then(function (response) {
                $rootScope.authenticated=true;
                $rootScope.currentUser=response.data.user;
            });
        }

        $scope.logout= function () {
            $auth.logout().then(function () {
                AclService.flushStorage();
                //localStorage.removeItem('AppAcl');
                localStorage.removeItem('user');
                $rootScope.authenticated=false;
                $rootScope.currentUser=null;
                $state.go('auth',{});
                //console.log('adsf');
            })
        };

        $rootScope.controlSidebar=false;
        $scope.openControlSidebar= function () {

            $rootScope.controlSidebar=!$rootScope.controlSidebar;
            //console.log($scope.controlSidebar);
        };

        $scope.activateDeveloperState= function () {
            $http.get('/admin/api/setting/activateDeveloperState').then(function (response) {

            }, function (response) {
                console.warn(response);
            });
        };

        $scope.clearCloudFlareCache= function () {
            $http.get('/admin/api/setting/clearCloudFlareCache').then(function (response) {

            }, function (response) {
                console.warn(response);
            });
        }

        $scope.clearServerCache= function () {
            $http.get('/admin/api/setting/clearServerCache').then(function (response) {

            }, function (response) {
                console.warn(response);
            });
        }

        $scope.runJabariQuery=function () {
            $http.get('/admin/api/setting/runJabariQuery').then(function (response) {

            }, function (response) {
                console.warn(response);
            });
        }

        $rootScope.toggle=false;
        $scope.toggleSideBar=function () {
            $rootScope.toggle=!$rootScope.toggle;
        }

    }]);

/**
 * Created by alireza-pc on 12/10/2017.
 */
angular.module('adminPanel').controller('deactivateForeignStockController', ["$scope", "ngNotify", "$http", "$uibModal", "Upload", function ($scope,ngNotify,$http,$uibModal,Upload) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.title='عیر فعال کردن انبار خارجی';
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.loadAll=function () {
        $scope.browse=false;
        $http.get('/admin/api/deactivateForeignStock/getAllStock').then(function (resposne) {
            $scope.stocks=resposne.data;
        })
    };

    $scope.changeStock=function () {
        if($scope.selectedStock){
            $scope.browse=true;
        }
    };

    $scope.read=function (workbook) {
        $scope.csv=[];
        workbook.SheetNames.forEach(function(sheetName) {
            //console.log(sheetName);
            var csv = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            $scope.csv=$scope.csv.concat(csv); //example [{id:'123',barcode:'123213123123'}]
        });
    };

    $scope.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
    };

    $scope.save=function () {
        $http.post('/admin/api/deactivateForeignStock/save',{
            barcodes:$scope.csv.map(function (item) {
                return item.barcode;
            }),
            stockAbbr:$scope.selectedStock
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
        },function (response) {
            ngNotify.set('خطا','error');
        })
    }
}]);

/**
 * Created by alireza on 5/17/17.
 */
angular.module('adminPanel')
    .controller('deletedProductsController', ["$scope", "$http", "$uibModal", "getDeletedProducts", "getUnConfirmProductCount", function ($scope,$http,$uibModal,getDeletedProducts,getUnConfirmProductCount) {
        $scope.showEntries=10;
        $scope.title="";
        $scope.products=null;//list of all product
        $scope.product=null;
        $scope.currentPage=1;
        $scope.showEntries='50';
        $scope.temp=[];
        $scope.entries=[10,25,50,100];

        $scope.theads=[
            {
                field:'index',
                displayName:'ردیف',
                template:"<span>{{$parent.$parent.$index+1 | persian }}</span>"
            },
            {
                field:'id',
                displayName:'کد محصول',
                filterable:true,
                template:'<a href="/product/{{item.id}}">{{item.id |persian}}</a>',
                sortable:true,
                width:50,
                sorting:'DESC'
            },
            //TODO search for lName
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "   <span ng-if=\"item.lName\">" +
                "       {{item.lName}}" +
                "   </span>" +
                "</a>",
                sortable:true
            },
            {
                field:'lName',
                displayName:'نام لاتین',
                filterable:'true',
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">{{item.lName}}</a>"
            },
            {
                field:'price',
                displayName:'قیمت',
                filterable:true,
                template:"<span >{{item.price | persian}}</span>",
                width:80,
                sortable:true
            },
            {
                field:'barcode',
                displayName:'بارکد',
                filterable:true,
                width:100,
                sortable:true
            },
            {
                field:'category',
                displayName:'دسته بندی',
                template:"<span ng-repeat='category in item.categories'>{{category.name}}</span>",
                width:100
            },
            {
                field:'uDate',
                displayName:'تاریخ حذف محصول',
                sortable:true,
                template:"<span>{{item.dDate | jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}}</span>",
                width:100
            },
            {
                field:'confirm',
                displayName:'انتخاب محصول',
                displayNameTemplate:"" +
                "<span>" +
                "   <label for='selectAll'>انتخاب همه</label>" +
                "   <input id='selectAll' type='checkbox' ng-click='selectAll()' >" +
                "</span>",
                template:"<label for=\"{{$parent.$parent.$index+1}}\">انتخاب</label> " +
                "<input id=\"{{$parent.$parent.$index+1}}\" type=\"checkbox\" ng-model=\"item.state\" placeholder=\"انتخاب\">",
                width:80
            }
        ];

        $scope.button={
            restoreAll:{
                permission:'restore_product'
            },
            selectAllProduct:true,
            //blindConfirm:{
            //    permission:'confirm_product'
            //}

        };

        $scope.allProduct= function () {
            //console.log($scope.selectAllProductState);
            $scope.selectAllProductState=!$scope.selectAllProductState;
            $scope.selectAll();
        };

        $scope.restoreAll= function () {
            var products;
            if($scope.selectAllProductState){

                products=$scope.idOfAllProduct;
            }else {
                products=$scope.products.filter(function (product) {
                        return product.state==true;
                    })
                    .map(function (product) {
                        return product.id
                    });
            }
            //var products=$scope.products.filter(function (product) {
            //    return product.confirm==true;
            //}).map(function (product) {
            //    return product.id;
            //});
            $http.post('/admin/api/deletedProduct/restoreSelected',{
                selected:products
            }).then(function (response) {
                //console.log(response.data);
                getDeletedProducts.count();
                getUnConfirmProductCount.count();
                $scope.loadAll();
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.getItemOfTableById= function (value,table) {
            if($scope.temp[table]==undefined){//if table not set set it and child
                $scope.temp[table]={};
            }
            $http.post('/admin/api/getItemOfTableById',{
                item:[table,value]
            }).then(function (response) {
                $scope.temp[table][value]=response.data;
            });
        };

        $scope.selectAll= function () {
            //console.log(1);
            $scope.productSelectAllCheck=!$scope.productSelectAllCheck;
            $scope.products.forEach(function (product) {
                //console.log(product);
                product.state=$scope.productSelectAllCheck;
            });
        };

        $scope.$on('$viewContentLoaded', function () {
            $scope.loadAll();
        });

        $scope.loadAll= function () {
            $scope.selectAllProductState=false;
            $scope.title="محصولات حذف شده";
            $scope.product=null;
            $scope.productSelectAllCheck=false;
            $scope.selectAllCheckbox=false;
            $http.post('/admin/api/deletedProduct/index',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.products=response.data.products;
                $scope.idOfAllProduct=response.data.count;
                $scope.totalItem=response.data.count.length;
                $scope.numPages=response.data.count/$scope.showEntries;
            })
        };

        $scope.findById= function ($id) {
            $scope.products=null;
            $http.get('/admin/api/deletedProduct/'+$id).then(function (response) {
                $scope.product=response.data.product;
                $scope.categories=response.data.categories;
                //console.log(data);
                $scope.getImage($scope.product.image,false);
                console.log($scope.product);
            });
            //ConfirmProducts.get({id:$id}, function (data) {
            //
            //    //$scope.title='تایید محصول'+$scope.product.name;
            //})
        };

        $scope.getImage= function (imageName,field) {
            $http.post("/admin/api/getFiles",{
                'name':imageName,
                'attributeLabel': field.name
            }).then( function (response) {
                if(typeof response.data =='string'){

                }else
                if(field==false){
                    var regex = /..\/public\/image\/pic\/new\/[0-9]*\/.*\/.*/g;
                    $scope.product.Images=response.data.filter(function (file) {
                        return  !file.dirname.match(regex) && file.filename=='lg';
                    });
                    console.log($scope.product.Images);
                    //    response.data.filter(function (file) {
                    //    return file.filename=='lg' && file.dirname.length<=response.data[0].dirname.length+1;
                    //});
                    $scope.product.Images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                }
                else{
                    field.images=response.data.filter(function (file) {
                        return file.filename=='sm' && file.dirname.indexOf(field.name);
                    });
                    field.images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                }

            }, function (response) {
                console.log(response.status);
            });
        };

        $scope.restore= function () {
            //console.log(1);
            //var author=
            $http.post('/admin/api/deletedProduct/restoreSelected',{
                selected:[$scope.product.id]
            }).then(function (response) {
                //console.log(response.data);
                getDeletedProducts.count();
                getUnConfirmProductCount.count();
                $scope.loadAll();
            }, function (response) {
                console.warn(response);
            });
        };

        //$scope.rejectProduct= function () {
        //    var modalInstance=$uibModal.open({
        //        animation:true,
        //        controller:'rejectProductController',
        //        templateUrl:'rejectProduct.html',
        //        resolve:{
        //            'product_id': function () {
        //                return $scope.product.id;
        //            }
        //        }
        //    });
        //    modalInstance.result.then(function () {
        //        $scope.loadAll();
        //    }, function (response) {
        //
        //    });
        //};
    }]);

/**
 * Created by alireza on 4/18/17.
 */
angular.module('adminPanel').controller('discountController', ["$uibModal", "AclService", "$scope", "ngNotify", "$http", function ($uibModal,AclService,$scope,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.packDiscountMethod=[
        {
            disc_method_id:2,
            disc_method:'درصد'
        }
    ];

    $scope.discountListCaption="تخفیف ها";
    $scope.categories=[];//category that must save
    $scope.title='لیست تخفیف ها';
    $scope.theads=[
        {
            field:'disc_id',
            displayName:'شماره تخفیف',
            template:'<span>{{item.disc_id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC'
        },
        {
            field:'disc_description',
            displayName:'توضیحات',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.disc_id})\">" +
            "   {{item.disc_description}}" +
            "</a>",
            sortable:true
        },
        {
            field:'disc_code',
            displayName:'کد تخفیف',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_aux',
            displayName:'کد مستعار',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_type',
            displayName:'نوع',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_method',
            displayName:'روش',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_value_discounted',
            displayName:'مقدار تخفیف',
            filterable:true,
            template:"" +
            "<span>" +
            "   <span ng-if='item.disc_method_calculation_fk==1'>{{item.disc_value_discounted |persian}} %</span>" +
            "   <span ng-if='item.disc_method_calculation_fk!=1'>{{item.disc_value_discounted |persian}} </span>" +
            "</span>",
            editable:true,
            sortable:true
        },
        {
            field:'disc_valid_date',
            displayName:'تاریخ شروع',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.disc_valid_date!=\"0000-00-00 00:00:00\"'>{{item.disc_valid_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>"
        },
        {
            field:'disc_expire_date',
            displayName:'تاریخ انقضا',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.disc_expire_date!=\"0000-00-00 00:00:00\"''>{{item.disc_expire_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>"
        },
        {
            field:'disc_status',
            displayName:'وضعیت',
            template:'' +
            //'<span ng-switch="item.disc_status">' +
            //'   <span ng-switch-when="0">' +
            //'       غیر فعال' +
            //'   </span>' +
            //'   <span ng-switch-when="1">' +
            '   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1">' +
            '       <input type="checkbox" ng-model="item.disc_status" ' +
            '           ng-checked="item.disc_status"  ng-disabled="!item.validDate"' +
            '           ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})">' +
            '            <div class="slider round" ng-show="item.validDate"></div>' +
            '            <div ng-show="!item.validDate">منقضی شده</div>' +
            '               ' +
            '   </label>',
            //'       فعال' +
            //'   </span>' +
            //'</span>' ,

            filterable:true,
            editable:true,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> فعال</option>" +
            "   <option value='0'> غیر فعال</option>" +
            "   </select>" +
            "</div>"
        },
        {
            field:'discount_usage',
            displayName:'تعداد استفاده شده',
            template:"<span style='font-size: 200%;'>{{item.discount_usage|persian}}</span>",
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'parent',
            displayName:'تخفیف پدر',
            template:"<span>{{item.parent.disc_description}}</span>",
            //filterable:true,
            //editable:true,
            //sortable:true
        },
        {
            field:'',
            displayName:'',
            template:"<span ng-if='item.queries.length'>" +
            "   <a href='' class='btn btn-primary' ng-click='showQueries({id:item.disc_id})'>شرایط</a>" +
            // "   <a href='' class='btn btn-primary' ng-click='updateQueries({id:item.disc_id})'>به روز رسانی </a>" +
            "</span>",

        }
    ];
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.currentPage='1';
    $scope.tree=[{}];
    $scope.button= {
        createNew:{
            show:true,
            permission:AclService.can('add_discount')
        },
        update:{
            show:true,
            permission:AclService.can('discount_list')
        },
    };


    $scope.updateQueries=function (id) {

        $http.get('/admin/api/updateQueries')
            .then(function (response) {
                ngNotify.set("به روزرسانی کامل شد");
            });
    }

    //quick category
    $scope.chooseCategory= function () {
        if($scope.quickCategory){
            //expand tree .first get name by id then send it to expandTo
            $scope.expandTo= $scope.categoryList.filter(function (category) {
                return category.id==$scope.quickCategory;
            })[0].name;
            console.log( $scope.expandTo);
            $scope.addToCategories2($scope.categoryList.filter(function (category) {
                return category.id==$scope.quickCategory;
            })[0]);
        }
        $scope.quickCategory="";
    };
    //i duplicate it one for co_defs and one for on-click why?
    $scope.addToCategories= function(category){
        console.log(category);
        if(category.checkbox){
            $scope.categories.push(category)
        }else {
            $scope.categories=$scope.categories.filter(function (cat) {
                return cat.id!=category.id;
            })
        }
        //console.log($scope.categories);
        //getAttributeByCategory();
    };
    $scope.addToCategories2= function(category){
        console.log(category);
        //if(category.children.length!=0){
        //    return;
        //}
        category.checkbox=!category.checkbox;
        if(category.checkbox && $scope.categories.indexOf(category)==-1){
            $scope.categories.push(category)
        }else {
            $scope.categories = $scope.categories.filter(function (cat) {
                return cat.id != category.id;
            })
        }
        //console.log($scope.categories);
        //getAttributeByCategory();
        //console.log($scope.categories);
    };
    $scope.col_defs=[
        {
            field:'id',
            displayName:'شمارنده',
            filterable: true,
            cellTemplate:"<a href='' ng-click='cellTemplateScope.addToCategories(row.branch)'>{{row.branch['id']}}</a>",
            cellTemplateScope:{
                addToCategories: $scope.addToCategories2
            }
        },
        {
            field:'description',
            displayName:'توضیحات',
            cellTemplate:"<a href='' ng-click='cellTemplateScope.addToCategories(row.branch)'>{{row.branch['description']}}</a>",
            cellTemplateScope:{
                addToCategories:$scope.addToCategories2
            }
        },
        {
            field:'checkbox',
            displayName:'انتخاب',
            cellTemplate:"<span type='checkbox'  ng-model='row.branch[col.field]' >" +
            "               <span ng-show='row.branch[col.field]' class='glyphicon glyphicon-ok'></span>" +
            "             </span>" ,
            cellTemplateScope:{
                addToCategories:$scope.addToCategories2
            }
        }];
    $scope.expanding_property = {
        field: "name",
        displayName: "نام",
        filterable: true,
        cellTemplate:"<a href='' ng-click='cellTemplateScope.addToCategories(row.branch)'>{{row.branch['name']}}</a>",
        cellTemplateScope:{
            addToCategories:$scope.addToCategories
        }
    };

    $scope.next= function (value) {
        console.log($scope.discount.disc_type_fk);
        if($scope.page==4 && $scope.typePage4.$invalid ){
            ngNotify.set('لطفا فیلد ها لازم را پر کنید','error');
        }
        else if($scope.page==4){
            if($scope.discountPage4Type==4){
                $scope.discount.disc_type_fk=7;
                $scope.discount.disc_group='هدیه';
                $scope.page=value;
                $scope.discount.disc_method_fk=9;
            }
            else if($scope.discountPage4Type==2){
                $scope.discount.disc_group='';
                $scope.discount.disc_type_fk=5;
                $scope.page=value;
            }else if($scope.discountPage4Type==3){
                $scope.discount.disc_group='';
                $scope.discount.disc_type_fk=6;
                $scope.page=value;
            }
            else if($scope.discount.disc_type_fk==5 || !$scope.discount.disc_type_fk){
                //set default for disc_type in coded discount
                $scope.discount.disc_group='';
                $scope.discount.disc_type_fk=1;
                $scope.page=value;
            }else {
                $scope.page=value;
            }
        }
        else if($scope.page==1 && $scope.type.$invalid )
        {
            ngNotify.set('لطفا فیلد ها لازم را پر کنید','error');
        }
        else if($scope.page==2 && value==3 && $scope.attribute.$invalid){
            ngNotify.set('لطفا فیلد ها لازم را پر کنید','error');
        }else {
            $scope.page=value;
        }
    };

    $scope.getParentDiscount= function () {
        console.log($scope.discount);
        $scope.discountType=angular.copy( $scope.discount.disc_type_fk);
        //console.log($scope.discount.disc_parent_fk!==undefined);
        //console.log($scope.discount.disc_parent_fk!==0);
        if($scope.discount.disc_type_fk==3){
            var parentDiscount=$scope.parentDiscounts.filter(function (discount) {
                return discount.disc_id==$scope.discount.disc_parent_fk;
            })[0];
            console.log($scope.parentDiscounts);
            console.log(parentDiscount);
            //$scope.discount.disc_description=parentDiscount.disc_description;
            $scope.discount.disc_method_fk=parentDiscount.disc_method_fk;
            $scope.discount.disc_valid_date=parentDiscount.disc_valid_date;
            $scope.discount.disc_expire_date=parentDiscount.disc_expire_date;
            $scope.discount.disc_status=parentDiscount.disc_status;
            $scope.discount.disc_value_discounted=parentDiscount.disc_value_discounted;
            $scope.discount.disc_value_required=parentDiscount.disc_value_required;
            $scope.discount.disc_user_usage_limit=parentDiscount.disc_user_usage_limit;
            $scope.discount.disc_usage_limit=parentDiscount.disc_usage_limit;
            $scope.discount.disc_quantity_required=parentDiscount.disc_quantity_required;
            $scope.discount.disc_group=parentDiscount.disc_group;
            $scope.discount.disc_type_fk=$scope.discountType;
            //console.log($scope.discount.disc_parent_fk);
            $scope.loadAllProduct($scope.discount.disc_parent_fk);
            $scope.parentSet=true;
            console.log($scope.discount);
            //$scope.discount=angular.copy( parentDiscount);
        }
        //else{
        //    if($scope.discount.disc_id){
        //        $scope.findById($scope.discount.disc_id);
        //    }else {
        //        $scope.createNew();
        //    }
        //    $scope.discount.disc_type_fk=$scope.discountType;
        //    $scope.parentSet=null;
        //}
        //console.log($scope.discount);
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.datepickerConfig = {
        //allowFuture: false,
        dateFormat: 'YYYY-MM-DD'
        //gregorianDateFormat: 'YYYY/DD/MM'
        //minDate: moment.utc('2008', 'YYYY')
    };
    $scope.loadAll= function () {
        $scope.gifts=[];
        $scope.highDiscountForCategory=[];
        $scope.highDiscount=[];
        $scope.discountPage4Type=1;
        $scope.discountMaximumMessage="";
        $http.get('/admin/api/discount/getCategory').then(function (response) {
            $scope.categoryList=response.data;//i change and i think it not used
            $scope.tree=convertToTree(response.data);
            $scope.searchedCategory=$scope.searchedCategoryTemp;
        });
        $scope.productTheads=[
            {
                field:'id',
                displayName:'شماره محصول',
                //template:'<span>{{item.id|persian}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC'
            },
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "   <span ng-show='!item.name'>{{item.lName}}</span>" +
                "</a>",
                sortable:true
            },
            {
                field:'action',
                displayName:'',
                template:"" +
                "<button class='btn btn-adn' ng-click='deleteById({id:item.id})' ng-show='item.dDate==null' >حذف</button>" +
                "<span ng-show='item.dDate!=null'>غیر فعال</span>"
            }
        ];
        $scope.entries=[10,25,50,100];
        $scope.showEntriesProduct="10";
        $scope.page=4;
        $scope.currentPageProduct='1';
        $scope.parentSet=false;
        $scope.title='لیست تخفیف ها';
        $scope.products=null;
        $scope.discount=null;
        $scope.id=null;
        $scope.productSearch=null;
        $scope.productId=null;
        $http.post('/admin/api/discount/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined && thead.filter!="";
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {

            $scope.discounts=response.data.discounts;
            // console.log($scope.discounts);
            console.log(moment().format("MM-DD-YYYY hh:mm:ss"));
            $scope.discounts.forEach(function (discount) {
                if(moment().isBefore(discount.disc_valid_date)){
                    discount.validDate=4;
                }else if(!moment().isBetween(discount.disc_valid_date,discount.disc_expire_date,null,'[]')){
                    discount.validDate=false;
                }else{
                    discount.validDate=true;
                }
            });
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;

        }, function (response) {
            console.warn(response);
        });
    };


    $scope.changeDiscountState= function (id,state) {
        console.log(state);
        $http.post('/admin/api/discount/changeState',{
            id:id,
            state:state
        }).then(function (response) {

        }, function (response) {
            console.log(response);
        });
    };
    //change price input base on method change
    $scope.changePriceInput= function () {
        $scope.calculation= $scope.discountMethods.filter(function (method) {
            return method.disc_method_id==$scope.discount.disc_method_fk;
        })[0].disc_method_calculation_fk;
    };



    $scope.createNew= function () {
        //$scope.discounts=null;
        $scope.discount={};
        $http.get('/admin/api/discount/getAllDiscountTypes').then(function (resp) {
            $scope.discountTypes=resp.data.discount_type;
            $scope.skills=resp.data.skills;
        });
        $http.get('/admin/api/discount/getAllDiscountMethods').then(function (resp) {
            $scope.discountMethods=resp.data;
        });
        $http.post('/admin/api/discount/getAllDiscount',{
            id:0
        }).then(function (response) {
            $scope.parentDiscounts=response.data;
            //$scope.parentDiscounts.unshift({disc_description:'',disc_id:""});
        });
        $scope.products=[];
        //$scope.loadAllProduct();
        $scope.title='ایجاد تخفیف';
        $scope.discount.disc_valid_time=new Date();
        $scope.discount.disc_expire_time=new Date();

    };
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $scope.findById= function (id) {
        //$scope.discounts=null;
        $scope.title='ویرایش تخفیف';
        //console.log(id);
        $http.post('/admin/api/discount/show',{
            id:id
        }).then(function (response) {
            $http.get('/admin/api/discount/getAllDiscountTypes').then(function (resp) {
                $scope.discountTypes=resp.data.discount_type;
                $scope.skills=resp.data.skills;
            });
            $http.get('/admin/api/discount/getAllDiscountMethods').then(function (resp) {
                $scope.discountMethods=resp.data;
                $scope.changePriceInput();
            });

            //console.log(response.data);
            $http.get('/admin/api/discount/getCategory').then(function (resp) {
                $scope.categories=resp.data.filter(function (category) {
                    return response.data[0].categories.map(function (category) {
                            return category.id;
                        }).indexOf(category.id)!=-1;
                });

                for(var i=0;i<resp.data.length;i++){
                    if($scope.categories.indexOf(resp.data[i])!=-1){
                        resp.data[i].checkbox=true;
                    }
                }
                $scope.categoryList=resp.data.filter(function (category) {
                    return category.parent!=null;
                });

                $scope.tree=convertToTree(resp.data);

            });

            $scope.discount=response.data[0];
            //console.log($scope.discount);
            $scope.discount.disc_status=$scope.discount.disc_status==1?"true":"false";
            $http.post('/admin/api/discount/getAllDiscount',{
                id:id
            }).then(function (response) {
                $scope.parentDiscounts=response.data;
                //$scope.parentDiscounts.unshift({disc_description:'',disc_id:""});
            });
            $scope.loadAllProduct(id);
            if($scope.discount.disc_type_fk==5){
                $scope.discountPage4Type=2;
            }else if($scope.discount.disc_type_fk==6){
                $scope.discountPage4Type=3;
            }
            else if($scope.discount.disc_type_fk==7){
                $scope.discountPage4Type=4;
            }
            else{
                $scope.discountPage4Type=1;
            }
            //get gift products
            if($scope.discount.disc_type_fk===7){
                $http.post('/admin/api/discount/getGiftProducts',{
                    discountId:$scope.discount.disc_id
                }).then(function (response) {
                    $scope.gifts=response.data;
                })
            }

            $scope.discount.disc_valid_time=new Date($scope.discount.disc_valid_date);
            $scope.discount.disc_expire_time=new Date($scope.discount.disc_expire_date);
            $scope.discount.disc_gift_is_exponentially=$scope.discount.disc_gift_is_exponentially==1;
            $scope.discount.skills=$scope.discount.skills[0].id;
            console.log($scope.discount);
        })
    };
    $scope.checkNumber = function (number) {
        //console.log(!isNaN(parseFloat(number)));
        if((!isNaN(parseFloat(number)) && isFinite(number))){
            return number;
        }else{
            //ngNotify.set('لطفا عدد وارد کنید','error');
            return "";
        }
        //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
    };

    $scope.checkPercentage= function (value) {
        if((!isNaN(parseFloat(value)) && isFinite(value))){
            if(value>100 || value<0) {
                return null;
            }else {
                return value;
            }
        }else{
            return "";
        }

    };
    $scope.checkDate= function (value) {
        if(!value){
            return value;
        }
        var english = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
        var value=String( value).match(english);
        if(value==null)
        {
            //ngNotify.set('لطفا به صورت لاتین وارد کنید','error');
            return null;
        }
        else return value[0];
        //console.log(String( value).match(english));
        //return String( value).match(english);
    };
    $scope.loadAllProduct= function (id) {
        if(id){
            $scope.id=id;
        }

        $http.post('/admin/api/discount/getProductsOfDiscount',{
            theads:$scope.productTheads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPageProduct,
            showEntries:$scope.showEntriesProduct,
            id:id||$scope.id,
            sort:$scope.productTheads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            $scope.products = response.data.products;
            $scope.totalItem = response.data.count;
            $scope.numPages = response.data.count / $scope.showEntriesProduct;
        });
    };

    $scope.$watch('productSearch', function (value) {
        $scope.productNamesimilar=null;
        //console.log(value);
        if(value){
            $http.get('/admin/api/discount/search/'+value).then(function (response) {
                $scope.recommendedProduct=response.data;
            }, function (response) {
                console.log(response.data);
            })
        }
    });

    $scope.selectProduct= function (product) {

        if(product.id && $scope.discount.disc_group_fk){
            $http.post('/admin/api/addProductToDiscount',{
                group: $scope.id,
                product:product.id
            }).then(function (response) {
                console.log(product);
                //if(response.data!=1){
                //    ngNotify.set('این محصول قبلا اضافه شده است',error);
                //}else {
                $scope.loadAllProduct();
                //}
            });
        }
        else {

            $scope.products.push(product);
            //$scope.loadAllProduct();
            console.log($scope.products);
        }
        //$scope.products.push(product);
    };

    $scope.chooseProductById= function () {
        $scope.productIds=$scope.productId.split(",");
        if($scope.productId){
            $http.post('/admin/api/addProductToDiscountById',{
                product: $scope.productIds,
                fk:$scope.discount.disc_group_fk,
                group: $scope.id
            }).then(function (response) {
                 if(response.data){
                     console.log($scope.products);
                     $scope.products=$scope.products.concat(response.data);
                 }
                //$scope.loadAllProduct();
                $scope.loadAllProduct();
            });
        }
    };

    $scope.deleteById= function (id) {
        //console.log(id);
        if(id && $scope.discount.disc_group_fk){
            $http.post('/admin/api/deleteProductFromDiscount',{
                group: $scope.id,
                product:id
            }).then(function (response) {
                $scope.loadAllProduct();
            });
        }else{
            $scope.products= $scope.products.filter(function (product) {
                return product.id!=id;
            })
        }
    };

    $scope.checkDiscountMaximum= function () {
        if($scope.calculation==1){
            var highDiscount= $scope.products.filter(function (product) {
                if(product.discount){
                    return product.discount<$scope.discount.disc_value_discounted
                }
            });
            if(highDiscount.length>0){
                switch ($scope.discount.disc_pass_discount_maximum){
                    case 1:
                        $scope.productListCaption="نوع اعمال تخفیف:"+"اعمال تخفیف کامل";
                        break;
                    case 2:
                        $scope.productListCaption="نوع اعمال تخفیف:"+"اعمال تخفیف حداکثر به میزان سقف تخفیف";
                        break;
                    case 3:
                        $scope.productListCaption="نوع اعمال تخفیف:"+"عدم اعمال تخفیف";
                        break;
                }
                //if($scope.discount.disc_pass_discount_maximum){
                //    switch
                //}
            }
        }
    };

    $scope.checkProductsDiscount= function () {
        if($scope.calculation==1){
             $scope.highDiscount= $scope.products.filter(function (product) {
                if(product.discount){
                    return product.discount<$scope.discount.disc_value_discounted
                }
            });
            console.log($scope.categories);
            if($scope.categories.length>0){
                $http.post('/admin/api/discount/getHighDiscountForCategory',{
                    categories:$scope.categories.map(function (category) {
                        return category.id;
                    }),
                    disc_value_discounted:$scope.discount.disc_value_discounted
                }).then(function (response) {
                     $scope.highDiscountForCategory=response.data;
                    if($scope.highDiscount.length>0 || $scope.highDiscountForCategory.length>0){
                        var modalInstance=$uibModal.open({
                            animation:true,
                            controller:"highDiscountController",
                            templateUrl:"highDiscount.html",
                            resolve:{
                                "highDiscount": function () {
                                    return $scope.highDiscount;
                                },
                                'result': function () {
                                    return $scope.discount.disc_pass_discount_maximum;
                                },
                                'highDiscountForCategory': function () {
                                    return $scope.highDiscountForCategory;
                                }
                            }
                        });

                        modalInstance.result.then(function (result) {
                            $scope.discount.disc_pass_discount_maximum=result;
                            $scope.save();
                        }, function () {

                        });
                    }else{
                        $scope.discount.disc_pass_discount_maximum=1;
                        $scope.save();
                    }
                    //console.log(response.data);
                    //return ;
                })
            }
            //return;
            //console.log($scope.highDiscount);
            else if($scope.highDiscount.length>0){
                var modalInstance=$uibModal.open({
                    animation:true,
                    controller:"highDiscountController",
                    templateUrl:"highDiscount.html",
                    resolve:{
                        "highDiscount": function () {
                            return $scope.highDiscount;
                        },
                        'result': function () {
                            return $scope.discount.disc_pass_discount_maximum;
                        },
                        'highDiscountForCategory': function () {
                            return 0;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    $scope.discount.disc_pass_discount_maximum=result;
                    $scope.save();
                }, function () {

                });
            }else {
                $scope.discount.disc_pass_discount_maximum=1;
                $scope.save();

            }
        }else{
            $scope.discount.disc_pass_discount_maximum=1;
            $scope.save();
        }
    };
    
    $scope.addNewGift=function (id) {
        $http.post("/admin/api/discount/addNewGift",{
            productId:id
        }).then(function (response) {
            $scope.gifts.push(response.data);
        })
    };
    $scope.removeGift=function (index) {
        $scope.gifts.splice(index,1);
    }

    $scope.save= function () {
        // if($scope.products.length>0 && !$scope.discount.disc_group){
        //     ngNotify.set('لطفا نام گروه محصولات را وارد کنید','error');
        //     return ;
        // }
        //return ;
        console.log($scope.discount);
        //return ;


        $http.post('/admin/api/discount/save',{
            discount:$scope.discount,
            products:$scope.products.map(function (product) {
                return product.id;
            }),
            categories:$scope.categories.map(function (category) {
                if(category)
                return category.id;
            }),
            ConditionalProductIds:$scope.highDiscount.concat($scope.highDiscountForCategory)
                .map(function (products) {
                    if(products)
                    return products.id;
                }),
            ConditionalProducts:$scope.highDiscount.concat($scope.highDiscountForCategory),
            //ids of product that add as product
            conditionalProductNotCategory:$scope.highDiscount.map(function (products) {
                if(products)
                return products.id;
            }),
            //ids of products that add as category
            conditionalProductNotProduct:$scope.highDiscountForCategory.map(function (products) {
                if(products)
                return products.id;
            }),
            gifts:$scope.gifts.map(function (value) {
                return value.id;
            })
        }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                $scope.loadAll();
        }, function (response) {
            console.log(response);
        })
    }

    $scope.showQueries=function (id) {
        var modalInstance=$uibModal.open({
            animation:true,
            keyboard:false,
            size:'xlg',
            controller: 'showQueryDiscountController',
            templateUrl:'/views/discount/showQuery.html',
            resolve:{
                'id': function () {
                    return id;
                },
                'type':function(){
                    return "discount"
                }
            }
        });
    }
}]);

angular.module('adminPanel').controller('highDiscountController', ["$scope", "$uibModalInstance", "highDiscount", "result", "highDiscountForCategory", function ($scope,$uibModalInstance,highDiscount,result,highDiscountForCategory) {
    $scope.result=result;
    $scope.products=highDiscount;
    if(highDiscountForCategory){
        $scope.productForCategory=highDiscountForCategory;
    }

    console.log($scope.productForCategory);
    $scope.passDiscountMaximumType=[
        {
            id:1,
            name:"اعمال تخفیف کامل"
        },
        {
            id:2,
            name:"اعمال تخفیف حداکثر به میزان سقف تخفیف"
        },
        {
            id:3,
            name:"عدم اعمال تخفیف"
        }
    ];
    $scope.save= function () {
        console.log($scope.result);
        //return;
        $uibModalInstance.close($scope.result);
    };
    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    }
}]);


angular.module('adminPanel')
    .controller('showQueryDiscountController', ["$scope", "$uibModalInstance", "id", "type", "$http", function ($scope,$uibModalInstance,id,type,$http) {

        $scope.theads=[
            {
                field:'id',
                displayName:'شماره ',
                template:'<span>{{item.id}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC'
            },
            {
                field:'name',
                displayName:'نام ',
                filterable:true,
                editable:true,
                template:"" +
                "   <span>{{item.name}}</span>",
                sortable:true
            },
            {
                field:'cDate',
                displayName:'تاریخ ایجاد',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.cDate!=\"0000-00-00 00:00:00\"'>{{item.cDate}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'',
                displayName:' ',
                template:'<span>' +
                '   <a href="" ng-click="removeQuery({id:item.id})">حذف</a>' +
                '</span>',

            },

        ];
        $scope.datepickerConfig = {
            //allowFuture: false,
            dateFormat: 'YYYY-MM-DD hh:mm:ss'
            //gregorianDateFormat: 'YYYY/DD/MM'
            //minDate: moment.utc('2008', 'YYYY')
        };
        $scope.entries=[10,25,50,100];
        $scope.showEntries='50';
        $scope.productDiscountCaption="لیست شرایط";

        $scope.removeQuery=function (id) {
            $http.post("/admin/api/removeQuery",{
                queryId:id,
                type:type
            }).then(function (response) {
                $scope.loadAll();
            })
        };

        $scope.loadAll= function () {
            $http.post('/admin/api/getQueries',{
                id:id,
                type:type,
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.queries=response.data.queries;
                // console.log($scope.discounts);
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            });
        };
        $scope.loadAll();

        $scope.ok= function () {
            $uibModalInstance.close();
        };

        $scope.cancel= function () {
            $uibModalInstance.dismiss();
        };
    }]);
/**
 * Created by alireza on 5/18/17.
 */
angular.module('adminPanel').controller('discountLogController', ["$uibModal", "$scope", "$resource", "ngNotify", "$http", "$stateParams", function ($uibModal,$scope,$resource,ngNotify,$http,$stateParams) {
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.theads=[
        {
            field:'disc_id',
            displayName:'کد تخفیف',
            //template:'<a href="/product/{{item.product_id}}">{{item.product_id}}</a>',
            sortable:true,
            filterable:true,
        },
        {
            field:'disc_description',
            displayName:'نام',
            filterable:true,
            editable:true,
            //template:"" +
            //"<a href='' ng-click=\"findById({$id:item.product_id})\">" +
            //"   {{item.name}}" +
            //"   <span >" +
            //"       {{item.lName}}" +
            //"   </span>" +
            //"</a>",
            sortable:true
        },
        {
            field:'disc_type',
            displayName:'نوع تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_method',
            displayName:'روش تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_code',
            displayName:'کد تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_value_required',
            displayName:'حداقل مقدار برای فعال شدن تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_value_discounted',
            displayName:'مقدار تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_valid_date',
            displayName:'تاریخ شروع',
            template:"<span>{{item.disc_valid_date|jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}} </span>",
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_expire_date',
            displayName:'تاریخ انقضا',
            template:"<span>{{item.disc_expire_date|jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}} </span>",
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_status',
            displayName:'وضعیت تخفیف',
            filterable:'true',
            sortable:true
        },
        {
            field:'disc_parent',
            displayName:'سرگروه',
            filterable:'true',
            sortable:true
        },
        {
            field:'products',
            displayName:'محصولات',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="getProductsById({id:item.id})">لیست محصولات</a>' +
            '</span>'
        },
        {
            field:'user',
            displayName:'کاربر',
            template:"<span>{{item.user.fName}} {{item.user.lName}}</span>"
        },
        //{
        //    field:'created_at',
        //    displayName:'تاریخ',
        //    template:"<span>{{item.created_at|jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}} </span>",
        //    sortable:true,
        //    sorting:'DESC'
        //},
        {
            field:'created_at',
            displayName:'تاریخ',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.created_at!=\"0000-00-00 00:00:00\"''>{{item.created_at|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'DESC',
        }
    ];

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.loadAll= function () {
        //console.log(1);
        $scope.title="لاگ تخفیف";
        $scope.discount=null;
        $http.post('/admin/api/discountLog/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.discounts=response.data.discounts;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.getProductsById= function (id) {
        var modalInstance=$uibModal.open({
            animation:true,
            size:'lg',
            controller:'showDiscountProductController',
            templateUrl:'showDiscountProduct.html',
            resolve:{
                "discountId": function () {
                    return id;
                }
            }
        });

    }
}]);
angular.module('adminPanel').controller('showDiscountProductController', ["$http", "$scope", "discountId", function ($http,$scope,discountId) {
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.theads=[
        {
            field:'id',
            displayName:'کد محصول',
            //template:'<a href="/product/{{item.product_id}}">{{item.product_id}}</a>',
            sortable:true,
            filterable:true,
            sorting:'DESC'
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'confirm',
            displayName:'وضعیت محصول',
            template:'' +
            '<span ng-switch="item.confirm">' +
            '   <span ng-switch-when="0">' +
            '       تایید نشده' +
            '   </span>' +
            '   <span ng-switch-when="1">' +
                '       تایید شده' +
            //'       <a class="text-red pull-left product-icon" ng-click="rejectProduct({$id:item.id})" ng-show="can(\'return_product\')" ><i class="fa fa-ban"></i></a>' +
            '   </span>' +
            '   <span ng-switch-when="2">' +
            '       بازگشت داده شده' +
            '   </span>' +
            '</span>',
            filterable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='0'> تایید نشده</option>" +
            "   <option value='1'> تایید شده</option>" +
            "   <option value='2'>بازگشت داده شده</option>" +
            "   </select>" +
            "</div>"
        }
    ];
    $scope.loadAll= function () {
        $http.post('/admin/api/discountLog/getDiscountProductsById',{
            discountId:discountId,
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            $scope.products=response.data.products;
            //$scope.discounts=response.data.discounts;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        })
    };

    $scope.loadAll();

}]);
angular.module('adminPanel').controller('discountMethodController', ["$scope", "ngNotify", "$http", function ($scope,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.discountMethodCaption="روش تخفیف";
    $scope.title='لیست روش های تخفیف';
    $scope.theads=[
        {
            field:'disc_method_id',
            displayName:'شماره روش تحقیق',
            template:'<span>{{item.disc_method_id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC'
        },
        {
            field:'disc_method',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.disc_method_id})\">" +
            "   {{item.disc_method}}" +
            "</a>",
            sortable:true
        },
        {
            field:'disc_type',
            displayName:'نوع تخفیف',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_column',
            displayName:'ستون تخفیف',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'disc_calculation',
            displayName:'محاسبه تخفیف',
            filterable:true,
            editable:true,
            sortable:true
            //template:"<span>{{item.disc_valid_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
        },
        {
            field:'disc_method_status',
            displayName:'وضعیت',
            template:'' +
                //'<span ng-switch="item.disc_status">' +
                //'   <span ng-switch-when="0">' +
                //'       غیر فعال' +
                //'   </span>' +
                //'   <span ng-switch-when="1">' +
            '   <label class="switch" ng-init="item.disc_method_status=item.disc_method_status==1">' +
            '       <input type="checkbox" ng-model="item.disc_method_status" ' +
            '           ng-checked="item.disc_method_status"' +
            '           ng-change="changeDiscountState({id:item.disc_method_id,state:item.disc_method_status})">' +
            '            <div class="slider round"></div>' +
            '               ' +
            '   </label>',
            //'       فعال' +
            //'   </span>' +
            //'</span>' ,

            filterable:true,
            editable:true,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> فعال</option>" +
            "   <option value='0'> غیر فعال</option>" +
            "   </select>" +
            "</div>"
        }
    ];
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_discount_method'
        }
        //loadAllFunction:$scope.loadAll()
    };
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $scope.title='لیست روش های تخفیف';
        $scope.discountMethod=null;
        $http.post('/admin/api/discountMethod/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.discountMethods=response.data.discountMethods;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.changeDiscountState= function (id,state) {
        console.log(state);
        $http.post('/admin/api/discountMethod/changeState',{
            id:id,
            state:state
        }).then(function (response) {

        }, function (response) {
            console.log(response);
        });
    };

    $scope.createNew= function () {
        $scope.discountMethods=null;
        $scope.discountMethod={};
        $http.get('/admin/api/discountMethod/getAllDiscountTypes').then(function (resp) {
            $scope.discountTypes=resp.data;
        });
        $http.get('/admin/api/discountMethod/getAllDiscountCalculations').then(function (resp) {
            $scope.discountCalculation=resp.data;
        });
        $http.get('/admin/api/discountMethod/getAllDiscountColumns').then(function (resp) {
            $scope.discountColumns=resp.data;
        });
        //$http.get('/admin/api/discount/getAllDiscountMethods').then(function (resp) {
        //    $scope.discountMethods=resp.data;
        //});
    };

    $scope.findById= function (id) {
        $scope.discountMethods=null;
        $http.post('/admin/api/discountMethod/show',{
            id:id
        }).then(function (response) {
            $http.get('/admin/api/discountMethod/getAllDiscountTypes').then(function (resp) {
                $scope.discountTypes=resp.data;
            });
            $http.get('/admin/api/discountMethod/getAllDiscountCalculations').then(function (resp) {
                $scope.discountCalculation=resp.data;
            });
            $http.get('/admin/api/discountMethod/getAllDiscountColumns').then(function (resp) {
                $scope.discountColumns=resp.data;
            });
            $scope.discountMethod=response.data;
        })
    };

    $scope.save= function () {
        console.log($scope.discountMethod);
        //return ;
        $http.post('/admin/api/discountMethod/save',{
            discount:$scope.discountMethod
        }).then(function (response) {
            ngNotify.set('با موفقیت ذخیره شد');
            $scope.loadAll();
        }, function (response) {
            console.log(response);
        })
    }
}]);

angular.module('adminPanel').controller('discountTypeController', ["$scope", "ngNotify", "$http", function ($scope,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.discountTypeCaption="نوع تخفیف";
    $scope.title='لیست انواع تخفیف';
    $scope.theads=[
        {
            field:'disc_type_id',
            displayName:'شماره نوع تخفیف',
            template:'<span>{{item.disc_type_id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'disc_type',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.disc_type_id})\">" +
            "   {{item.disc_type}}" +
            "</a>",
            sortable:true
            //width:200
        }
    ];
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_discount_type'
        }
    };
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $scope.title='لیست روش های تخفیف';
        $scope.discountType=null;
        $http.post('/admin/api/discountType/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.discountTypes=response.data.discountTypes;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };
    $scope.createNew= function () {
        $scope.discountTypes=null;
        $scope.discountType={};

    };

    $scope.findById= function (id) {
        $scope.discountTypes=null;
        $http.post('/admin/api/discountType/show',{
            id:id
        }).then(function (response) {
            $scope.discountType=response.data;
        })
    };

    $scope.save= function () {
        console.log($scope.discountType);
        //return ;
        $http.post('/admin/api/discountType/save',{
            discount:$scope.discountType
        }).then(function (response) {
            ngNotify.set('با موفقیت ذخیره شد');
            $scope.loadAll();
        }, function (response) {
            console.log(response);
        })
    }
}]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('elasticSearchController', ["$scope", "$auth", "$state", "$http", "$rootScope", "AclService", function ($scope,$auth,$state,$http,$rootScope,AclService) {

        //console.log("asdf");
        $scope.getCount=function () {
            $http.get("/admin/api/elasticsearch/getCount/"+$scope.tableName).then(function (value) {
                $scope.count=value.data;
            });
        };
        $scope.skip=0;
        $scope.take=100;
        $scope.start=function () {

            $http.post("/admin/api/elasticsearch/indexAttribute",{
                indexName:$scope.indexName,
                typeName:$scope.indexType,
                tableName:$scope.tableName,
                take:$scope.take,
                skip:$scope.skip
            }).then(function (value) {

                if($scope.skip<$scope.count){
                    console.log(value.data);
                    $scope.start();
                    $scope.skip+=100;
                }

            })
        }
    }]);

/**
 * Created by alireza on 12/26/16.
 */
angular.module('adminPanel').controller('fieldLogController', ["$scope", "$resource", "ngNotify", "$http", function ($scope,$resource,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.showEntries=10;
    $scope.title="";
    $scope.products=null;//list of all product
    $scope.fields=null;
    $scope.node=[];
    $scope.temp=[];

    var Product=$resource('/admin/api/product/:id');

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $scope.title="لاگ فیلد ها";
        $scope.showEntries='50';
        $scope.fields=null;
        Product.query(function (data) {
            $scope.products=data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.getValueOfAttribute= function (values, attribute) {
        console.log(values);
        return values.filter(function (value) {
            return value.attribute_id==attribute.id;
        });
    };

    $scope.getItemOfTableById= function (table, value) {
        if($scope.temp[table]==undefined){//if table not set set it and child
            $scope.temp[table]={};
            $scope.temp[table][value]="";
        }else if($scope.temp[table][value]==undefined){//if child not set ,set it
            $scope.temp[table][value]="";
        }else if($scope.temp[table][value]!=undefined){//if both set return
            return ;
        }
        //get table item
        $http.post('/admin/api/getItemOfTableById',{
            item:[table,value]
        }).then(function (response) {
            $scope.temp[table][value]=response.data;
        });
    };

    $scope.findById= function ($id) {
        $scope.product=$scope.products.filter(function (item) {
            return item.id==$id;
        })[0];
        //console.log($scope.product[0].name);
        $http.get('/admin/api/fieldLog/'+$id).then(function (response) {
            $scope.fields=response.data.fieldLog;
            $scope.attributes=response.data.attributes;
        });//change to post request
    }

}]);
/**
 * Created by alireza on 3/18/17.
 */
angular.module('adminPanel').controller('menuOrderController', ["$scope", "$http", function ($scope,$http) {

    $scope.categories=null;
    $scope.tree=[{}];
    $scope.list=[];
    jQuery(".dropdown-content").menuAim();
    var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
                categoryList[map[node.parent_id]].children=categoryList[map[node.parent_id]].children.sort(sortByProperty('order'))
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $http.get("/admin/api/getCategories").then(function (response) {
            $scope.categories=response.data;
            $scope.tree=convertToTree($scope.categories)[0].children[0].children;
            console.log($scope.tree);
        })
    };

    $scope.selectLevel1= function (index) {
        //console.log($scope.tree[index]);
        $scope.level2=null;
        $scope.level3=null;
        $scope.level1=index;
    };
    $scope.selectLevel2= function (index) {
        //console.log($scope.tree[$scope.level1].children[index]);
        $scope.level3=null;
        $scope.level2=index;
    };
    $scope.selectLevel3= function (index) {
        //console.log($scope.tree[$scope.level1].children[index]);
        $scope.level3=index;
    };

    $scope.reorder= function (list) {
        //console.log(topCategory);
        list.forEach(function (item,index) {
            item.order=index;
        });
        //list= Array.from(new Set(list));
        //console.log($scope.tree+);
    };

    var flatCategory= function (categories) {
        for(var i=0;i<categories.length;i++){
            if(categories[i].children){
                flatCategory(categories[i].children);
            }
            delete categories[i].children;
            $scope.list.push(categories[i]);

        }
        //console.log($scope.list);
    };

    $scope.save= function () {
        $scope.list=[];
        flatCategory($scope.tree);
        $http.post('/admin/api/saveOrder',{
            ids:$scope.list.map(function (item) {
                return item.id;
            }),
            categories:$scope.list
        }).then(function (response) {
            //console.log(response);
            $scope.loadAll();
        }, function (response) {
            console.warn(response);
        });
        //console.log($scope.list);
        //console.log($scope.tree);
        //console.log($scope.categories);
    }
}]);

/**
 * Created by alireza on 3/21/17.
 */
angular.module('adminPanel').controller('menuPictureController', ["$scope", "$http", "Upload", "ngNotify", function ($scope,$http,Upload,ngNotify) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.categories=null;
    $scope.tree=[{}];
    $scope.list=[];
    //$scope.mainMenu=null;
    jQuery(".dropdown-content").menuAim();
    var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
                categoryList[map[node.parent_id]].children=categoryList[map[node.parent_id]].children.sort(sortByProperty('order'))
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $scope.getImage= function (icon) {
        //console.log(id);
        var d=new Date();
        var xhr=new XMLHttpRequest();
        xhr.open('GET','/image/menu/'+icon+"?"+ d.getDate(),true);
        xhr.responseType='blob';
        xhr.onload= function (event){
            var fileReader=new FileReader();
            fileReader.readAsDataURL(event.target.response);
            $scope.file= new File([event.target.response], "filename", {type: "image/png"});
            fileReader.onloadend= function () {
                $scope.$apply(function () {
                    $scope.imageMenu=fileReader.result;
                });
            };
        };
        xhr.send();
    };

    $scope.showPreview= function (id) {
        var d=new Date();
        $scope.mainMenu=$scope.tree.filter(function (item) {
            return item.id==id;
        })[0];
        $scope.mainMenu.extension=$scope.mainMenu.icon.split(".").pop();
        $scope.getImage($scope.mainMenu.icon);
        //$scope.imageMenu="/image/menu/"+$scope.mainMenu.icon+"?"+ d.getDate();
    };
    $scope.imageIsLoaded= function (e) {
        $scope.$apply(function () {
            $scope.imageMenu=e.target.result;//change e.target.result to e.target
            console.log(e.target);
        })
    };
    $scope.imageUpload= function (element,categoryId) {
        console.log(element.id);
        console.log(element.files);
        $scope.mainMenu=$scope.tree.filter(function (item) {
            return item.id==element.id;
        })[0];
        $scope.mainMenu.extension=element.files[0].name.split(".").pop();//set extension for save file name in db
        $scope.file=element.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(element.files[0]);
        reader.onloadend=$scope.imageIsLoaded;
    };
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $http.get("/admin/api/getCategories").then(function (response) {
            $scope.categories=response.data;
            $scope.tree=convertToTree($scope.categories)[0].children[0].children;

            $scope.firstDepth=$scope.categories.filter(function (item) {
                if(item.id===2999){
                    $scope.tree.push(item);
                }
                return item.depth===2;
            });
            console.log($scope.tree);
        })
    };
    $scope.saveCategory= function () {
        console.log($scope.mainMenu);
        $http.post('/admin/api/saveXAndY',{
            category:$scope.mainMenu
        }).then(function (response) {
            Upload.upload({
                url:"/admin/api/saveMainMenuImage",
                data:{
                    'file':$scope.file,
                    'categoryId':response.data.id,
                    'icon':response.data.icon,
                    'icon_resize':response.data.icon_resize
                }
            }).then(function (resp) {
                ngNotify.set("با موفقیت ذخیره شد");
            });
            console.log(response);
        }, function (response) {
            console.warn(response);
        })
    }
}]);

/**
 * Created by alireza on 7/8/17.
 */
angular.module('adminPanel').controller('ordersController', ["$scope", "ngNotify", "$state", "getAllOrders", "$rootScope", "getOperatorOrderCount", "getPackingOrdersCount", "getSendOrdersCount", "getOrdersPollCount", "getReadyOrderForSendCount", function ($scope,ngNotify,$state,getAllOrders,$rootScope,getOperatorOrderCount,getPackingOrdersCount,getSendOrdersCount,getOrdersPollCount,getReadyOrderForSendCount) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.showEntries=10;
    $scope.title="پنل سفارشات";
    $rootScope.tabs = [
        { title: "سفارشات", route: "allOrders", active: true },
        { title: "جمع آوری", route: "collecting", active: true },
        { title: "بسته بندی", route: "packingOrders", active: true },
        { title: "آماده ارسال", route: "readyForSend", active: true },
        { title: "ارسال", route: "sendOrders", active: true },
        { title: "نظر سنجی", route: "ordersPoll", active: true },
        { title: " همکاران سیستم", route: "hamkaranOrder", active: true },
    ];

    getAllOrders.count();
    getOperatorOrderCount.count();
    getSendOrdersCount.count();
    getPackingOrdersCount.count();
    getPackingOrdersCount.count();
    getOrdersPollCount.count();
    getReadyOrderForSendCount.count();
    $scope.changeState= function (state,section) {
        $state.go("dashboard.orders."+state);
        $scope.section=section;
    };
}]);

/**
 * Created by alireza on 8/21/17.
 */
/**
 * Created by alireza on 7/8/17.
 */
angular.module('adminPanel').controller('ordersForManagerController', ["$scope", "ngNotify", "$state", "getAllOrders", "$rootScope", function ($scope,ngNotify,$state,getAllOrders,$rootScope) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.showEntries=10;
    $scope.title="پنل سفارشات (مدیر)";
    $rootScope.managerTabs = [
        { title: "سفارشات", route: "allOrdersForManager", active: true },
        { title: "My Tab 3", route: "tab3", active: false },
        { title: "My Tab 4", route: "tab3", active: false },
        { title: "My Tab 5", route: "tab3", active: false },
        { title: "My Tab 6", route: "tab3", active: false }
    ];

    //getAllOrders.count();
    //getOperatorOrderCount.count();
    $scope.changeState= function (state,section) {
        $state.go("dashboard.ordersForManager."+state);
        $scope.section=section;
    };
}]);


/**
 * Created by alireza on 12/29/16.
 */
angular.module('adminPanel').controller('permissionController', ["AclService", "$scope", "$resource", "ngNotify", "$http", function (AclService,$scope,$resource,ngNotify,$http) {
    $scope.title='';
    $scope.permissions=null;
    $scope.permission=null;
    $scope.row=null;

    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });

    $scope.permissionCaption="دسترسی ها";
    //$scope.title='لیست روش های تخفیف';
    $scope.theads=[
        {
            field:'permissions.id',
            displayName:'شماره ویژگی',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'permissions.name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"can(\'permission_manger\')&&findById({$id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            width:200
        },
        {
            field:'permissions.display_name',
            displayName:'عنوان',
            template:"<span>{{item.display_name}}</span>",
            filterable:true,
            sortable:true,
            width:200
        },
        {
            field:'permission_group',
            displayName:'گروه',
            filterable:true,
            template:"" +
            "<span>{{item.permissionGroupName}}</span>",
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\"" +
            "       ng-options='permissionGroup.id as permissionGroup.name for permissionGroup in permissionGroups'>" +
            "       <option value=''></option>" +
            "   </select>" +
            "</div>",
            width:200
        }
    ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'permission_manger'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.$on('$viewContentLoaded',function(){
        $scope.loadAll();
    });

    $scope.loadAll=function(){
        $scope.title='دسترسی ها';
        //$scope.showEntries='50';
        $scope.permission=null;
        $scope.row=null;

        $http.post('/admin/api/permission/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined && thead.filter!="";
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.permissions=response.data.permissions;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $http.get('/admin/api/permission/getPermissionGroup').then(function(response){
                $scope.permissionGroups=response.data;
            },function(response){
                console.log(response);
            });
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.createNew=function(){
        $scope.title='دسترسی جدید';
        $scope.permission={};
    };

    $scope.findById= function (id) {
        $http.get('/admin/api/permission/'+id).then(function (response) {
            $scope.permission=response.data;
        });
    };

    $scope.save=function () {
        $http.post('/admin/api/permission/save',{
            permission:$scope.permission
        }).then(function () {
            ngNotify.set('با موفقیت ذخیره شد');
            $scope.loadAll();
        })
    }


}]);

/**
 * Created by alireza on 12/29/16.
 */
angular.module('adminPanel').controller('pointController', ["AclService", "$scope", "$resource", "ngNotify", "$http", function (AclService,$scope,$resource,ngNotify,$http) {
    $scope.title='';
    $scope.permissions=null;
    $scope.permission=null;
    $scope.row=null;

    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });

    $scope.pointCaption="امتیاز ها";
    //$scope.title='لیست روش های تخفیف';
    $scope.theads=[
        {
            field:'id',
            displayName:'شماره ',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"can(\'point_manger\')&&findById({$id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            width:200
        },
        {
            field:'caption',
            displayName:'عنوان',
            template:"<span>{{item.caption}}</span>",
            filterable:true,
            sortable:true,
            width:200
        },
        {
            field:'score',
            displayName:'امتیاز',
            template:"<span>{{item.score}}</span>",
            filterable:true,
            sortable:true,
            width:200
        }
    ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'point_manger'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.$on('$viewContentLoaded',function(){
        $scope.loadAll();
    });

    $scope.loadAll=function(){
        $scope.title='امتیاز ها';
        //$scope.showEntries='50';
        $scope.point=null;
        $scope.row=null;

        $http.post('/admin/api/point/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined && thead.filter!="";
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.points=response.data.points;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.createNew=function(){
        $scope.title='امتیاز جدید';
        $scope.point={};
    };

    $scope.findById= function (id) {
        $http.get('/admin/api/point/'+id).then(function (response) {
            $scope.point=response.data;
        });
    };

    $scope.save=function () {
        $http.post('/admin/api/point/save',{
            point:$scope.point
        }).then(function () {
            ngNotify.set('با موفقیت ذخیره شد');
            $scope.loadAll();
        })
    }


}]);

/**
 * Created by alireza on 5/23/17.
 */
angular.module('adminPanel')
    .controller('pricesController',["AclService", "$scope", "$resource", "$http", "ngNotify", "$uibModal", function(AclService,$scope,$resource,$http,ngNotify,$uibModal){
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
        $scope.priceListCaption="لیست قیمت ها"
        $scope.theads=[
            {
                field:'product_id',
                displayName:'ردیف',
                template:'<span>{{item.id|persian}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC',
                width:100
            },
            {
                field:'name',
                displayName:'نام محصول',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"can(\'edit_price\')&&findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "</a>",
                sortable:true,
                width:200
            },
            {
                field:'value',
                displayName:'مقدار',
                template:"<span>{{item.value|persian}}</span>",
                filterable:true,
                sortable:true,
                width:200
            },
            {
                field:'startDate',
                displayName:'تاریخ شروع',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.startDate!=\"0000-00-00 00:00:00\"'>{{item.startDate|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'endDate',
                displayName:'تاریخ پایان',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.endDate!=\"0000-00-00 00:00:00\"'>{{item.endDate|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'disc_description',
                displayName:'تخفیف',
                editable:true,
                sortable:true,
                filterable:true
            }
        ];
        $scope.can = AclService.can;
        $scope.entries=[10,25,50,100];
        $scope.showEntries='50';
        $scope.button= {
            createNew:{
                show:true,
                permission:'add_price'
            }
            //loadAllFunction:$scope.loadAll()
        };

        $scope.checkDate= function (value) {
            if(!value){
                return value;
            }
            var english = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
            var value=String( value).match(english);
            if(value==null)
            {
                //ngNotify.set('لطفا به صورت لاتین وارد کنید','error');
                return null;
            }
            else return value[0];
            //console.log(String( value).match(english));
            //return String( value).match(english);
        };
        $scope.datepickerConfig = {
            //allowFuture: false,
            dateFormat: 'YYYY-MM-DD hh:mm:ss'
            //gregorianDateFormat: 'YYYY/DD/MM'
            //minDate: moment.utc('2008', 'YYYY')
        };

        $scope.chooseProduct= function () {
            $http.get('/admin/api/price/getProductById/'+$scope.chosenProduct).then(function (response) {
                $scope.product=response.data;
                $scope.price.product_id=response.data.id;
            }, function (response) {
                console.warn(response);
            })
        };

        $scope.checkNumber = function (number) {
            //console.log(!isNaN(parseFloat(number)));
            if((!isNaN(parseFloat(number)) && isFinite(number))){
                return number;
            }else{
                //ngNotify.set('لطفا عدد وارد کنید','error');
                return "";
            }
            //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
        };

        $scope.$on('$viewContentLoaded',function(){
            $scope.loadAll();
        });

        $scope.loadAll=function(){
            $scope.title='لیست ویژگی ها';
            $scope.showEntries='50';
            $scope.price=null;
            $scope.product=null;
            //$scope.row=null;

            $http.post('/admin/api/price/index',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                //console.log(response.data);
                $scope.prices=response.data.prices;
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.createNew= function () {
            $scope.prices=null;
            $scope.price={};
        };

        $scope.findById= function (id) {
            //$scope.prices=null;
            $http.get('/admin/api/price/show/'+id).then(function (response) {
                $scope.price=response.data[0];
                console.log($scope.price);
                $scope.chosenProduct=response.data[0].product_id;
                $scope.chooseProduct();
            }, function (response) {
                console.warn(response);
            })
        };

        $scope.save= function () {
            //console.log($scope.price);
            //return ;
            $http.post('/admin/api/price/save',{
                price:$scope.price
            }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                $scope.loadAll();
            }, function (response) {
                console.log(response);
            })
        }
    }]);
'use strict';

/**
 * @ngdoc function
 * @name wApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wApp
 */
angular.module('adminPanel')
    .controller('productController', ["$interval", "AclService", "$scope", "$rootScope", "$resource", "ngNotify", "$http", "Upload", "$uibModal", "$q", "getUnConfirmProductCount", "getRejectedProduct", "getUnConfirmEditedProduct", "getGostareshProduct", "$stateParams", "$state", "getDeletedProducts", "$location", function ($interval,AclService,$scope,$rootScope,$resource,ngNotify,$http,Upload,$uibModal,$q,getUnConfirmProductCount,getRejectedProduct,getUnConfirmEditedProduct,getGostareshProduct,$stateParams,$state,getDeletedProducts,$location) {

        ngNotify.config({
            theme: 'pure',
            position: 'down',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
        $scope.showEntries=10;
        $scope.title="";
        $scope.products=null;//list of all product
        $scope.productOld=null;
        $scope.fieldsOld=[];
        $scope.row=null;//use for change page (from list to form and reverse)
        $scope.categories=[];//category that must save
        $scope.categoryold=[];
        $scope.categoryList=[];//category to select
        $scope.categoryId=null;
        $scope.activeTab=1;
        $scope.sameBarcode=null;
        $scope.persons=null;
        $scope.tree=[{}];
        $scope.files=[];
        $scope.fileSrc=[];
        $scope.showEntries='50';
        $scope.categoryIdForSearch=[];//use for searching
        $scope.temp=[];
        $scope.languages=[
            {name:'فارسی',id:1}
        ];

        $scope.rejectProduct= function (id) {

            var modalInstance=$uibModal.open({
                animation:true,
                controller:'rejectProductController',
                templateUrl:'rejectProduct.html',
                resolve:{
                    'product_id': function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function () {
                $scope.loadAll();
            }, function (response) {

            });
        };

        $scope.entries=[10,25,50,100];
        $scope.changeEntries= function (count) {
            $scope.showEntries=count;
            $scope.loadAll();
        };
        $scope.theads=[
            {
                field:'select',
                displayName:'انتخاب',
                displayNameTemplate:"" +
                "<span>" +
                "   <label for='selectAll'>انتخاب همه</label>" +
                "   <input id='selectAll' type='checkbox' ng-model='selectAllCheckBox' ng-click='selectAll({checkbox:selectAllCheckBox})' >" +
                "</span>",
                template:"<label for=\"{{$parent.$parent.$index+1}}\"></label> " +
                "<input id=\"{{$parent.$parent.$index+1}}\" type=\"checkbox\" ng-model=\"item.selected\" placeholder=\"انتخاب\">",
                //sortable:true,
                //filterable:true,
                //sorting:'DESC'
            },
            {
                field:'index',
                displayName:'ردیف',
                template:"<span>{{$parent.$parent.$index+1|persian}}</span>",
                width:30
            },
            {
                field:'id',
                displayName:'کد محصول',
                filterable:true,
                template:'<a href="/product/{{item.id}}">{{item.id|persian}}</a>',
                sortable:true,
                width:100,
                sorting:'DESC'
            },
            //TODO search for lName
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"can(\'edit_product\') && findById({$id:item.id,linked_id:item.linked_id,product_id:item.product_id})\" style='font-size: 13px;'>" +
                "   {{item.name}}" +
                //"   <span ng-if=\"item.lName\">" +
                //"       {{item.lName}}" +
                //"   </span>" +
                "</a>",
                width:400,
                sortable:true
            },
            {
                field:'lName',
                displayName:'نام لاتین',
                filterable:'true',
                template:"" +
                "<a href='' ng-click=\"can(\'edit_product\') && findById({$id:item.id,linked_id:item.linked_id,product_id:item.product_id})\" style='font-size: 13px;'>{{item.lName}}</a>",
                width:100
            },
            //{
            //    field:'price',
            //    displayName:'قیمت',
            //    template:"<span >{{item.price | persian}}</span>",
            //    filterable:true,
            //    width:70,
            //    sortable:true
            //},
            {
                field:'barcode',
                displayName:'بارکد',
                filterable:true,
                template:"" +
                "<span>" +
                "   <a href='' ng-click='showBarcode({barcode:item})'>{{item.barcode}}</a>" +
                "</span>" +
                "",
                width:130,
                sortable:true
            },
            {
                field:'category',
                displayName:'دسته بندی',
                template:"<span ng-repeat='category in item.categories'>{{category.name}} </span>",
                width:100
            },
            {
                field:'confirm',
                displayName:'وضعیت محصول',
                template:'' +
                '<span ng-switch="item.confirm">' +
                '   <span ng-switch-when="0">' +
                '       <a class="text-red pull-left product-icon"  ng-click="rejectProduct({$id:item.id})" ng-show="can(\'return_product\')" ><abbr title="رد محصول"><i class="fa fa-ban"></i></abbr></a>' +
                '   </span>' +
                '   <span ng-switch-when="1">' +
                //'       تایید شده' +
                '       <a class="text-red pull-left product-icon" ng-click="rejectProduct({$id:item.id})" ng-show="can(\'return_product\')" ><abbr title="رد محصول"><i class="fa fa-ban"></i></abbr></a>' +
                '   </span>' +
                '   <span ng-switch-when="2">' +
                '   </span>' +
                '</span>' +
                '       <a href="/admin/data2#/productLog?id={{item.id}}" class="pull-left product-icon" ><abbr title="لاگ محصول"><i class="fa fa-history"></i></abbr></a>' +
                '       <a href="" ng-click="showProductPack({id:item.id})" class="pull-left product-icon" ><abbr title="پک محصول"><i class="fa fa-dropbox"></i></abbr></a>' +
                '       <a href="" ng-click="showProductDiscount({id:item.id})" class="pull-left product-icon" ><abbr title="تخفیف های محصول"><i class="fa fa-tag"></i></abbr></a>' +
                '       <a href="" ng-click="createLinkedProduct({id:item.linked_id,product_id:item.product_id})" ng-show="item.linked_id" class="pull-left product-icon" ><abbr title="ایجاد محصول مرتبط"><i class="fa fa-link"></i></abbr></a>' +
                '       <a href="" ng-click="removeLinkedProduct({id:item.linked_id,product_id:item.product_id})" ng-show="item.linked_id" class="pull-left product-icon" ><abbr title="حذف ارتباط"><i class="fa fa-unlink"></i></abbr></a>' +
                '       <a href="" ng-click="deleteProduct({id:item.id})" ng-show="can(\'safe_delete_product\')" class="pull-left product-icon text-yellow" ><abbr title="حذف محصول"><i class="fa fa-trash"></i></abbr></a>',
                filterable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                    "   <option value=''> </option>" +
                    "   <option value='0'> تایید نشده</option>" +
                    "   <option value='1'> تایید شده</option>" +
                    "   <option value='2'>بازگشت داده شده</option>" +
                    "   <option value='3'>کالا های گسترش</option>" +
                    "   <option value='4'>بازبینی شده منتظر تایید</option>" +
                "   </select>" +
                "</div>"
            }

        ];

        $scope.selectAll=function (checkBox) {
            console.log(checkBox);
            $scope.selectAllCheckBox=checkBox;
            $scope.products.filter(function (product) {
                product.selected=checkBox;
            });
        };

        $scope.checkPercentage= function (value) {
            if(value>100 || value<0) {
                return null;
            }else {
                return value;
            }
        };

        $scope.showBarcode= function (barcode) {
            var modalInstance=$uibModal.open({
                animation:true,
                size:'sm',
                controller:'showBarcodeController',
                templateUrl:'showBarcode.html',
                resolve:{
                    barcode: function () {
                        return barcode.barcode;
                    },
                    product: function () {
                        return barcode;
                    }
                }
            });

            modalInstance.result.then(function () {

            })
        };
        $scope.can = AclService.can;
        $scope.button={
            createNew:{
                show:true,
                permission:AclService.can('add_product')
            },
            linkSelectedProducts:{
                show:true,
                permission:AclService.can('add_product')
            }
        };
        $scope.showProductPack= function (id) {
            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                size:'lg',
                controller: 'showProductPackController',
                templateUrl:'/views/product/showProductPack.html',
                resolve:{
                    'productId': function () {
                        return id;
                    }
                }
            });
        };

        $scope.showProductDiscount= function (id) {
            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                size:'xlg',
                controller: 'showProductDiscountController',
                templateUrl:'/views/product/showProductDiscount.html',
                resolve:{
                    'productId': function () {
                        return id;
                    }
                }
            });
        };

        $scope.deleteProduct= function (id) {
            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                size:'sm',
                controller: 'DeleteProductController',
                templateUrl:'deleteProduct.html'
            });
            modalInstance.result.then(function () {
                $http.post('/admin/api/product/deleteProduct',{
                    productId:id
                }).then(function (response) {
                    $scope.loadAll();
                    getDeletedProducts.count();
                    getUnConfirmProductCount.count();
                }, function (response) {
                    console.warn(response);
                })
            }, function () {

            });

        };

        $scope.removeLinkedProduct= function (id, product_id) {

            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                size:'lg',
                resolve:{
                    'productId': function () {
                        return id;
                    }
                },
                controller: 'removeLinkController',
                templateUrl:'/views/product/removeLink.html'
            });
        };

        $scope.createLinkedProduct= function (id,product_id) {
            //isLinkedProduct==true

            $http.post('/admin/api/product/getLinkedProductByProductId',{
                productId:product_id
            }).then(function (response) {
                $scope.linkedProductAndAttribute=response.data;
                $scope.linkedAttributes=[];
                response.data.forEach(function (product,index) {
                    if(index==0){
                        $scope.linkedAttributes=product.fields;
                    }else{
                        $scope.linkedAttributes.concat(product.fields);
                    }
                });

            });
            $scope.isLinkedProduct=product_id;
            $scope.findById(id);
        };
        
        $scope.next= function (step, form) {
            if(step==1){
                $scope.editedFieldData=angular.copy($scope.fields);
                //console.log($scope.editedFieldData);
                $scope.activeTab=step;
                return;
            }else if(step==2){
                $scope.activeTab=step;
                return;
            }
            else if($scope.categories.length==0){
                ngNotify.set('حداقل یک دسته بندی را انتخاب کنید','error');
                return;
                //must get file and fill file
                //||$scope.file.length==0
            }else if(form.$invalid ){
                $scope.innerForm.$submitted=true;
                ngNotify.set("لطفا فیلد های لازم را پر کنید" ,'error');
                return;
            }else if(step==4 && $scope.innerForm2.$invalid){
                return false
            }else{
                $scope.activeTab=step;
                return true;
            }
        };
        //help function to convert flat category to tree
        var convertToTree= function (categoryList) {
            var map = {}, node, roots = [];
            for (var i = 0; i < categoryList.length; i += 1) {
                node = categoryList[i];
                node.children = [];
                map[node.id] = i; // use map to look-up the parents
                if (node.parent_id !== null) {
                    categoryList[map[node.parent_id]].children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots
        };

        var sortByProperty = function (property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            };
        };

        var getAttributeByCategory= function () {
            if($scope.categories.length){
                $http.post('/admin/api/getAttributeByCategory',{
                        'category' :  $scope.categories.map(function (category) {
                            return category.id;
                        })
                    })
                    .then(function (response) {
                        $scope.fields=angular.copy(response.data.sort(sortByProperty('admin_order')));

                        // convert "["\u0646\u0648\u0632\u0627\u062f","\u0646\u0648\u062c\u0648\u0627\u0646"]" to array for select attributes
                        $scope.fields.forEach(function (item, index) {
                            if(item.selects!=null){
                                item.selects=$scope.convertToArray(index);
                            }
                        });

                        $scope.imageInCategoryAttribute=$scope.fields.filter(function (field) {
                            return field.type==11;
                        });
                        //console.log($scope.imageInCategoryAttribute);
                        if($scope.row!={ } && $scope.fields.length!=0){
                            getFieldDataByProduct();
                        }
                        //console.log($scope.fields);
                    });
            }


        };
        var tree;
        $scope.my_tree = tree = {};
        //quick category
        $scope.chooseCategory= function (id) {
            if(id){
                // expand tree .first get name by id then send it to expandTo
                $scope.expandTo= $scope.categoryList.filter(function (category) {
                    return category.id==id;
                })[0].name;

                $scope.addToCategories2($scope.categoryList.filter(function (category) {
                    return category.id==id;
                })[0]);
            }else
            if($scope.quickCategory){
                //expand tree .first get name by id then send it to expandTo
                $scope.expandTo= $scope.categoryList.filter(function (category) {
                    return category.id==$scope.quickCategory;
                })[0].name;

                $scope.addToCategories2($scope.categoryList.filter(function (category) {
                    return category.id==$scope.quickCategory;
                })[0]);
            }
            if(!id){
                $scope.quickCategory="";
            }

        };
        //i duplicate it one for co_defs and one for on-click why?
        $scope.addToCategories= function(category){
            //console.log(category);
            if(category.checkbox){
                $scope.categories.push(category)
            }else {
                $scope.categories=$scope.categories.filter(function (cat) {
                    return cat.id!=category.id;
                })
            }
            //console.log($scope.categories);
            getAttributeByCategory();
        };

        $scope.removeCategory=function (id) {
            $scope.categories=$scope.categories.filter(function (cat) {
                return cat.id!=id;
            })
            getAttributeByCategory();
        }
        $scope.addToCategories2= function(category){
            //console.log(category);
            if(category.children.length!=0){
                return ;
            }
            category.checkbox=!category.checkbox;
            if(category.checkbox){
                $scope.categories.push(category)
            }else {
                $scope.categories = $scope.categories.filter(function (cat) {
                    return cat.id != category.id;
                })
            }
            //console.log($scope.categories);
            getAttributeByCategory();
            //console.log($scope.categories);
        };

        $scope.col_defs_in_product_list=[
            {
                field:'total',
                displayName:'تعداد کالا',
                cellTemplate:"<span style='margin-right: 60%;' class='badge' ng-show='row.branch[col.field]'>{{row.branch[col.field] | persian}}</span>"
            }
        ];
        $scope.expanding_property_in_product_list = {
            field: "id",
            displayName: "نام",
            filterable: true,
            cellTemplate:"<span>{{row.branch.name}}</span>"
        };
        var getChildren=function(category){
            //console.log(category);

            if(category.children.length==0){
                $scope.categoryIdForSearch.push(category);
            }
            for(var i=0;i<category.children.length;i++){
                getChildren(category.children[i]);
            }
        };
        $scope.setCategoryIdForSearch= function (branch) {
            $scope.searchedCategoryTemp=branch.id;
            //console.log(branch);
            $scope.categoryIdForSearch=[];
            getChildren(branch);
            $scope.categoryIdForSearch=$scope.categoryIdForSearch.map(function (category) {
                if(category.id==undefined)
                    return 0;
                return category.id;
            });
            //console.log($scope.categoryIdForSearch);
            //console.log(branch);
            $scope.loadAll();
        };

        $scope.col_defs=[
            {
                field:'id',
                displayName:'شمارنده',
                filterable: true
            },
            {
                field:'description',
                displayName:'توضیحات'
            },
            {
                field:'checkbox',
                displayName:'انتخاب',
                cellTemplate:"<span type='checkbox'  ng-model='row.branch[col.field]' ng-show='row.branch.children.length==0'>" +
                "               <span ng-show='row.branch[col.field]' class='glyphicon glyphicon-ok'></span>" +
                "             </span>" ,
                cellTemplateScope:{
                    addToCategories:$scope.addToCategories
                }
            }];
        $scope.expanding_property = {
            field: "name",
            displayName: "نام",
            filterable: true
        };
        //its used for validation in static attributes;
        $scope.checkNumber = function (number) {
            //console.log(!isNaN(parseFloat(number)));
            if((!isNaN(parseFloat(number)) && isFinite(number))){
                return number;
            }else{
                //ngNotify.set('لطفا عدد وارد کنید','error');
                return "";
            }
            //return (!isNaN(parseFloat(number)) && isFinite(number)) ? number : "";
        };
        $scope.checkName= function (value) {
            if(!value){
                return value;
            }
            var english = /^[A-Za-z0-9'";:)(*&^%$#@!~`|\\/.,-\_ +]*$/;
            var value=String( value).match(english);
            if(value==null)
            {
                //ngNotify.set('لطفا به صورت لاتین وارد کنید','error');
                return null;
            }
            else return value[0];
            //console.log(String( value).match(english));
            //return String( value).match(english);
        };
        $scope.convertToArray= function (index) {
            return JSON.parse($scope.fields[index].selects);
        };
        $scope.selectValue= function (index) {
            var value=JSON.parse($scope.fields[index].value);
            if(typeof value === "string"){
                return [value];
            }
            else{
                return value;
            }
        };
        function cleanResponse(resp) {
            return JSON.parse(angular.toJson(resp));
            //return angular.toJson(resp);
        }
        var Product=$resource('/admin/api/product/:id');

        //tell operator the similar name .
        {
            var escapeRegExp=function(string) {
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            };

            $scope.$watch('product.name', function (value) {
                $scope.productNamesimilar=null;
                //console.log(value);
                if(value){
                    $http.get('/admin/api/getSimilar/'+value).then(function (response) {
                        $scope.productNamesimilar=response.data;
                    }, function (response) {

                    })
                }









            });
        }

        $scope.$watch('quickCategory', function (value) {
            $scope.quickCategoryimilar=null;
            //console.log(value);
            if(value){
                $http.get('/admin/api/getSimilarCategory/'+value).then(function (response) {
                    $scope.quickCategoryimilar=response.data;
                }, function (response) {

                });
            }
        });

        $scope.$watch('[product.name, product.lName]', function () {
            $scope.nameValidator=$scope.product.name+$scope.product.lName;
        });

        $scope.$watch('product.barcode', function (value) {
            $scope.sameBarcode=null;
            if(value){
                $http.get('/admin/api/getSimilarBarcode/'+value).then(function (response) {
                    //check if there is any similar
                    if(response.data.length>0 &&$scope.product.name!=response.data[0].name)
                        $scope.sameBarcode=response.data;
                }, function (response) {

                })
            }
            //console.log($scope.products );
            //angular.forEach($scope.products, function (product) {
            //    if(product.barcode==value){
            //        $scope.sameBarcode=product.name;
            //    }
            //});
        });

        $scope.onSearchInputKeyPress= function (event) {
            if(event.charCode==13){
                //$scope.searchProduct(value);
                $scope.loadAll();
            }
        };

        //search input in products list
        //$scope.searchProduct= function (value) {
        //    $http.post('/admin/api/searchProduct',{
        //        name:value
        //    }).then(function (response) {
        //        //console.log(response.data);
        //        $scope.products=response.data;
        //    }, function (response) {
        //        console.warn(response);
        //    })
        //};

        $scope.initDefaultForTableField= function (field) {
            if(field.default)
                $http.post('/admin/api/getItemsOfTableByIds',{
                    item:[field.table,JSON.parse(field.default)]
                }).then(function (response) {
                    //console.log(response.data);
                    field.default= response.data.table.map(function (item) {
                        return item.name;
                    }).join();
                }, function (response) {
                    console.warn(response);
                })
        };


        $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code|link image',
            image_title:true,
            automatic_uploads: true,
            images_upload_url: '/admin/api/saveEditorImage',
            file_picker_types: 'image',
            images_upload_base_path: '/some/basepath',
            images_reuse_filename: true,
            file_picker_callback: function(cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function() {
                    var file = this.files[0];

                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var blobInfo = blobCache.create(id, file);
                    blobCache.add(blobInfo);

                    cb(blobInfo.blobUri(), { title: file.name });
                };

                input.click();
            }
        };//not used

        $scope.editorOptions={
            language: 'fa'
            //uiColor: '#000000'
        };//not used

        $scope.openEditor= function (field,index) {

            // console.log(editor);
            // console.log($scope.editor.field.editor);
            $scope.editor={};
            // console.log($scope.editor.field.editor);
            $scope.editor.field=angular.copy( field );
            $scope.editor.fieldIndex=index;
            $scope.activeTab=4;
            //$scope.editor={};
            // console.log($scope.editor.field.editor);
        };

        $scope.getContent = function(index) {
            //console.log(index);
            var index =$scope.fields.map(function (item) {
                return item.attribute_id;
            }).indexOf(parseInt(index));
            //return index;
            //console.log(index);
            $scope.fields[index]=angular.copy( $scope.editor.field);
            $scope.activeTab=3;
            delete $scope.editor.field.editor;//empty editor for next time use
            // console.log($scope.editor.field.editor);
            // console.log( $scope.fields);
        };

        $scope.backToDynamicAttributeTab= function () {
            $scope.editor.field.editor='';
            $scope.activeTab=3;
        };

        $scope.changeConfirm= function (value) {

            $scope.theads.filter(function (item) {
                return item.field=='confirm'
            })[0].filter=value;

            $scope.loadAll();
        };

        $scope.$on('$viewContentLoaded', function () {
            //console.log($stateParams.obj);
            if($stateParams.obj!=null){
                $scope.findById($stateParams.obj);
                $scope.row={};
            }
            else
                $scope.loadAll();
        });

        $scope.loadAll= function () {
            $scope.linkedProductIsSame=0;
            $scope.linkedAttributes=[];
            $scope.linkedProductAndAttribute=[];
            $scope.isLinkedProduct=null;
            $scope.linked_id=null;
            console.log($scope.tree);
            if(!$scope.tree[0].children){
                $http.get('/admin/api/product/getCategories').then(function (response) {
                    $scope.categoryListInProductList=response.data;//i change and i think it not used
                    $scope.tree=convertToTree(response.data);
                    $scope.searchedCategory=$scope.searchedCategoryTemp;
                });
            }

            //$interval(function () {
            //
            //    console.log($scope.searchedCategory);
            //},2000);

            $scope.editedFieldData=null;
            //$scope.editor=null;
            $scope.productNamesimilar=null;
            $scope.sameBarcode=null;
            $scope.title="محصولات";
            $scope.row=null;
            $scope.product={};
            $scope.productOld={};
            $scope.categories=[];
            $scope.categoriesOld=[];
            $scope.activeTab=1;
            $scope.fields=null;
            $scope.fieldsOld=[];
            $scope.categoryId=null;
            $scope.files=[];
            $scope.fileSrc=[];
            //console.log($scope.showEntries);
            $http.post('/admin/api/searchProduct',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                categoryIds:$scope.categoryIdForSearch,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                //console.log(response.data);
                $scope.products=response.data.products;
                $scope.foreignStocks=response.data.foreignStocks;
                // console.log($scope.foreignStocks);
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            }, function (response) {
                console.warn(response);
            });
        };
        //change to form and then get all category for select attribute base on it
        $scope.createNew= function () {
            $scope.title="محصول جدید";
            $scope.row={ };
            $scope.product.discount=100;//just for now we set it and hidden
            //$http.get('/admin/api/category').then(function (response) {
            //
            //    $scope.categoryList=response.data.filter(function (category) {
            //        return category.parent!=null;
            //    });
            //    $scope.tree=convertToTree(response.data);
            //    //getAttributeByCategory();
            //});
            $scope.categoryList=$scope.categoryListInProductList.filter(function (category) {
                return category.parent!=null;
            });
        };

        $scope.getItemOfTableById= function (value,table) {
            if($scope.temp[table]==undefined){//if table not set set it and child
                $scope.temp[table]={};
            }
            $http.post('/admin/api/getItemOfTableById',{
                item:[table,value]
            }).then(function (response) {
                $scope.temp[table][value]=response.data;
            });
        };

        //get field item that set for product
        var getFieldDataByProduct= function () {
            $http.post('/admin/api/getFieldDataByProduct',{
                'productId': $scope.product.id
            }).then(function (response) {
                //console.log($scope.fields);
                var fieldThatHaveValue=[];
                for(var i=0;i<response.data.length;i++){
                    var field=$scope.fields.filter(function (item,index) {
                        return item.attribute_id===response.data[i].attribute_id;
                    })[0];
                    //TODO next time i have been in bahman must check it

                    if(field==undefined){
                        continue;
                    }
                    fieldThatHaveValue.push(field.id);
                    //console.log(field);
                    //html
                    if(field.type==14){
                        $http.post('/admin/api/getReviewById',
                            {
                                item:[response.data[i].value,field.attribute_id]
                            }).then(function (response) {
                            //console.log(response);
                            var index=$scope.fields.map(function (item) {
                                return item.attribute_id
                            }).indexOf(response.data.attribute);
                            if($scope.fields[index].is_linked_attribute && $scope.isLinkedProduct && $scope.linked_id==null){

                            }else{
                                $scope.fields[index].editor=response.data.review.text;
                                $scope.fields[index].reviewId=response.data.id;
                                $scope.fields[index].oldEditor=response.data.review.text;
                            }
                        });
                    }
                    //image
                    else if(field.type==11){
                        if($scope.isLinkedProduct && field.is_linked_attribute && $scope.linked_id==null ){

                        }else {
                            if(field.files==undefined)
                                field.files=[];
                            if(field.fileSrc==undefined)
                                field.fileSrc=[];
                            field.value=response.data[i].value;
                            field.oldImageName=response.data[i].value;
                            $scope.getImage(field.value,field);

                        }
                    }
                    //select
                    else if(field.type==3){
                        //console.log($scope.isLinkedProduct);
                        //console.log(field.is_linked_attribute);
                        //console.log(field.name);
                        if($scope.isLinkedProduct && field.is_linked_attribute && $scope.linked_id==null ){

                        }else {
                            if(field.value==undefined){
                                field.value=[];
                            }
                            if(field.oldValue==undefined)
                                field.oldValue=[];
                            field.value.push(response.data[i].value);
                            //for check change in dialog box
                            field.oldValue.push(response.data[i].value);
                        }
                    }
                    else if(field.type==2){
                        field.value=Number( response.data[i].value);
                    }
                    //convert string true to true in boolean fields
                    else if(field.type==5){
                        if($scope.isLinkedProduct && field.is_linked_attribute ){

                        }else {
                            field.value=response.data[i].value=="1";
                        }
                    }//merge table item to one field and get name for id
                    else if(field.type==13){
                        if(field.value==undefined){
                            field.value=[];
                            //field.oldValue=[];
                        }
                        if(field.oldValue==undefined)
                            field.oldValue=[];

                        $http.post('/admin/api/product/getItemOfTable',{
                            item:[field.table,response.data[i].value,field.attribute_id]
                        }).then(function (response) {
                            var index=$scope.fields.map(function (item) {
                                return item.attribute_id
                            }).indexOf(response.data.attribute);
                            if($scope.fields[index].is_linked_attribute && $scope.isLinkedProduct && $scope.linked_id==null){

                            }else {
                                //check if table item exist in list when add category
                                if($scope.fields[index].value.map(function (item) {
                                        return item.id
                                    }).indexOf(response.data.table[0].id)<0){
                                    $scope.fields[index].value.push(response.data.table[0]);
                                    //for check change in dialog box
                                    $scope.fields[index].oldValue.push(response.data.table[0]);
                                }

                            }
                        });
                    }
                    else {
                        if($scope.isLinkedProduct && field.is_linked_attribute && $scope.linked_id==null ){

                        }else {
                            field.value=response.data[i].value;
                        }
                    }
                }

                //get last edited field if exist
                if($scope.editedFieldData!=null){
                    for(var i=0;i<$scope.fields.length;i++){
                        var field=$scope.editedFieldData.filter(function (field) {
                            return field.attribute_id==$scope.fields[i].attribute_id;
                        })[0];
                        if(field!=undefined)
                            $scope.fields[i].value=field.value;
                    }
                }
                //console.log(fieldThatHaveValue);
                for(var i=0;i<$scope.fields.length;i++){
                    if(fieldThatHaveValue.indexOf($scope.fields[i].id)<0){
                        if($scope.fields[i].default){
                            //table
                            if($scope.fields[i].type==13){
                                if(JSON.parse( $scope.fields[i].default).length>0)
                                {
                                    $http.post('/admin/api/getItemsOfTableByIds',{
                                        item:[$scope.fields[i].table,JSON.parse($scope.fields[i].default),$scope.fields[i].attribute_id]
                                    }).then(function (response) {
                                        var index=$scope.fields.map(function (item) {
                                            return item.attribute_id
                                        }).indexOf(response.data.attribute);
                                        //console.log(response.data.table);
                                        $scope.fields[index].value=response.data.table;
                                        //for check change in dialog box
                                        $scope.fields[index].oldValue=angular.copy($scope.fields[index].value);
                                    });
                                }
                            }
                            //select
                            else if($scope.fields[i].type==3){
                                if($scope.fields[i].value==undefined){
                                    $scope.fields[i].value=[];
                                }
                                if($scope.fields[i].oldValue==undefined)
                                    $scope.fields[i].oldValue=[];
                                $scope.fields[i].value.push( $scope.fields[i].default);
                                //for check change in dialog box
                                $scope.fields[i].oldValue=angular.copy($scope.fields[i].value);
                            }
                            //convert string true to true in boolean fields
                            else if($scope.fields[i].type==5){
                                $scope.fields[i].value=$scope.fields[i].default=="true";
                            }
                            else if($scope.fields[i].type==11){
                                continue;
                            }else if($scope.fields[i].type==2 || $scope.fields[i].type==4){

                                $scope.fields[i].value=parseInt( $scope.fields[i].default);
                            }
                            else {
                                $scope.fields[i].value=$scope.fields[i].default;
                            }
                        }
                    }
                }
                if($scope.isLinkedProduct && $scope.linked_id==null){
                    $scope.product.barcode=null;
                    delete $scope.product.id;
                    delete $scope.productOld.id;
                }

                //console.log($scope.fields);
                $scope.fieldsOld=angular.copy($scope.fields);
            })
        };

        $scope.findById= function ($id,linked_id,product_id) {
            if(linked_id){
                $scope.linked_id=linked_id;//edit linked product
                $scope.isLinkedProduct=product_id;
                $http.post('/admin/api/product/getLinkedProductByProductId',{
                    productId:product_id,
                    linked_id:linked_id
                }).then(function (response) {
                    $scope.linkedAttributes=[];
                    response.data.forEach(function (product,index) {
                        if(index==0){
                            $scope.linkedAttributes=product.fields;
                        }else{
                            $scope.linkedAttributes.concat(product.fields);
                        }

                    });

                    $scope.linkedProductAndAttribute=response.data;
                });
            }
            // console.log(linked_id);
            // console.log(product_id);
            //console.log($id);
            $scope.row={ };
            // $scope.products=[];
            Product.get({id:$id}, function (data) {
                //$http.get('/admin/api/product/getCategories').then(function (response) {
                    $scope.categories=$scope.categoryListInProductList.filter(function (category) {
                        return data.categories.map(function (category) {
                                return category.id;
                            }).indexOf(category.id)!=-1;
                    });
                    $scope.categoriesOld=angular.copy( $scope.categories);
                    //add checkbox model to each leaf
                    for(var i=0;i<$scope.categoryListInProductList.length;i++){
                        if($scope.categories.indexOf($scope.categoryListInProductList[i])!=-1){
                            $scope.categoryListInProductList[i].checkbox=true;
                        }
                    }

                    $scope.categoryList=$scope.categoryListInProductList.filter(function (category) {
                        return category.parent!=null;
                    });
                    if($scope.tree.length==0){
                        $scope.tree=convertToTree(response.data);
                    }

                    //console.log($scope.tree);
                    $scope.product=data;
                    $scope.product.discount=100;//just for now we set it and hidden
                    //call function to get image count
                    if($scope.isLinkedProduct && $scope.linked_id==null){

                    }else{
                        if($scope.product.image){
                            $scope.getImage($scope.product.image,false);
                        }
                    }
                    $scope.product.imageName=$scope.product.image;
                    $scope.product.oldImageName=$scope.product.image;

                    //console.log($scope.product);
                    //console.log( $scope.product.oldImageName);
                    $scope.productOld=angular.copy($scope.product);
                    $scope.title="اصلاح : "+$scope.product.name;
                    //delete this product from product list to check name and barcode
                    //$scope.products=$scope.products.filter(function (item) {
                    //    return item.id !=$scope.product.id;
                    //});
                    getAttributeByCategory();
                    //console.log($scope.fileSrc.length);
                //});
            }, function (response) {
                // console.log(response);
            });

        };
        //use to create name for image
        $scope.dateInMiliSecond= function () {
            return Date.parse(new Date()).toString().slice(0,10);
        };
        //ng-click in remove image
        $scope.removeImage= function (index) {
            $scope.files.splice(index,1);
            $scope.fileSrc.splice(index,1);
            $scope.product.imageName=$scope.files.length>0;
            //console.log($scope.product);
            //console.log(index);
            //console.log($scope.files);
            //console.log($scope.fileSrc);
        };
        //get image for product
        $scope.getImage= function (imageName,field) {

            if(field==false){
                $http.post("/admin/api/getPictureInStaticSection",{
                    'name':imageName
                }).then(function (response) {
                    var regex = /..\/public\/image\/pic\/new\/[0-9]*\/.[^0-9]/g;
                    var files=response.data.filter(function (file) {
                        return  !file.match(regex);
                    });
                    for(var i=0;i<files.length;i++){
                        if(i==0){
                            $scope.picMessage=files.length;
                        }
                        // console.log(d.getDate());
                        $http({
                            url:files[i].replace('../public/','/')+'/'+"lg.jpg?"+ Date.now(),
                            method:"GET",
                            params: i+1,
                            responseType:"blob"
                        })
                        .then(function (response) {
                            //console.log(response);
                            var fileReader=new FileReader();
                            fileReader.readAsDataURL(response.data);
                            fileReader.onloadend= function () {
                                //console.log(fileReader);
                                fileReader.id=response.config.params;
                                $scope.fileSrc.push(fileReader);
                                var file=new File([response.data], "filename", {type: "image/png"});
                                file.id=response.config.params;
                                $scope.files.push(file);
                                //console.log($scope.files);
                                //console.log($scope.fileSrc);

                                //if all image loaded, message hide
                                if($scope.fileSrc.length===$scope.picMessage){
                                    $scope.picMessage=false;
                                    $scope.fileSrc.sort(function (a, b) {
                                        return a.id- b.id;
                                    });
                                    $scope.files.sort(function (a, b) {
                                        return a.id- b.id;
                                    })
                                }
                            };
                        });
                    }

                });
            }else {
                $http.post("/admin/api/getFiles",{
                    'name':imageName,
                    'attributeLabel': field.name
                }).then( function (response) {
                    var files=response.data.filter(function (file) {
                        return file.filename=='lg' && file.dirname.indexOf(field.name);
                    });
                    //console.log(files);
                    for(var i=0;i<files.length;i++){
                        if(i==0){
                            field.picMessage=files.length;
                        }
                        var xhr=new XMLHttpRequest();
                        xhr.open('GET',files[i].dirname.replace('../public/','/')+'/'+files[i].basename+"?"+ Date.now(),true);
                        xhr.responseType='blob';
                        xhr.onload= function (event) {
                            //console.log(event);
                            var fileReader=new FileReader();
                            fileReader.readAsDataURL(event.target.response);
                            fileReader.onloadend= function () {
                                if(field){
                                    $scope.$apply(function () {
                                        field.fileSrc.push(fileReader.result);
                                    });
                                    if(field.fileSrc.length===field.picMessage){
                                        field.picMessage=false;
                                    }
                                }
                                //else
                                //    $scope.fileSrc.push(fileReader.result);
                                //console.log($scope.fileSrc);
                                if(field){
                                    field.files.push(new File([event.target.response], "filename", {type: "image/png"}));
                                }
                            };
                        };
                        xhr.send();
                    }
                });
            }

        };
        $scope.sendToAttributePicture= function (field,index,file) {
            //console.log(field);
            //console.log(file);
            //console.log( $scope.files[index]);
            if(field.files==null){
                field.files=[];
                field.fileSrc=[];
            }
            field.files.push( $scope.files[index]);
            field.fileSrc.push( file.result);
            field.value=$scope. dateInMiliSecond();
            $scope.removeImage(index);
        };

        //add selected image to image list to upload
        $scope.imageUpload= function (element) {
            var countImagePassLimit=0;
            //console.log($scope.product);
            for(var i=0;i<element.files.length;i++){
                // console.log(element.files[i]["size"]);
                if(element.files[i]["size"]<500000){
                    $scope.files.push(element.files[i]);
                }else{
                    countImagePassLimit+=1;
                }
            }

            if(countImagePassLimit>0){
                ngNotify.set(" حجم "+countImagePassLimit+" عکس بیش از حد مجاز است","error");
                countImagePassLimit=0;
            }

            $scope.product.imageName=$scope.files.length>0;
            var fileSrc=element.files;
            // console.log(fileSrc);
            for (var i = 0; i < fileSrc.length; i++) {
                // console.log(fileSrc[i]["size"]);
                if(fileSrc[i]["size"]<500000){
                    var file=fileSrc[i];
                    var reader=new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend=$scope.imageIsLoaded;
                }

            }
            //delete element.files;
        };
        $scope.imageIsLoaded= function (e) {
            $scope.$apply(function () {
                $scope.fileSrc.push(e.target);//change e.target.result to e.target
            })
        };

        //add selected image to image list to upload
        $scope.fieldImageUpload= function (element) {
            var countImagePassLimit=0;
            // console.log(element.data_attribute_id);
            var id =$scope.fields.map(function (item) {
                return item.attribute_id;
            }).indexOf(parseInt(element.id));
            //console.log(id);
            //console.log($scope.fields[parseInt(element.id)+1]);
            if($scope.fields[id].files==undefined)
                $scope.fields[id].files=[];
            if($scope.fields[id].fileSrc==undefined)
                $scope.fields[id].fileSrc=[];

            for(var i=0;i<element.files.length;i++){
                if(element.files[i]["size"]<500000){
                    $scope.fields[id].files.push(element.files[i]);
                }else{
                    countImagePassLimit+=1;
                }

            }

            if(countImagePassLimit>0){
                ngNotify.set(" حجم "+countImagePassLimit+" عکس بیش از حد مجاز است","error");
                countImagePassLimit=0;
            }

            var fileSrc=element.files;
            for (var i = 0; i < fileSrc.length; i++) {
                if(fileSrc[i]["size"]<500000){
                    var file=fileSrc[i];
                    var reader=new FileReader();
                    reader.onload= function (e) {
                        $scope.$apply(function () {
                            $scope.fields[id].fileSrc.push(e.target.result);
                        })
                    };
                    reader.readAsDataURL(file);
                }
            }

            //console.log($scope.fields[element.id].files);
            //console.log($scope.fields[element.id].fileSrc);
            //console.log($scope.fields);
            //delete element.files;
        };
        //ng-click in remove image
        $scope.fieldRemoveImage= function (field,index) {
            // console.log(field);

            field.fileSrc.splice(index,1);
            field.files.splice(index,1);
            field.value=$scope.dateInMiliSecond();
        };

        $scope.openProductDetail= function (id) {
            //console.log(id);
            $http.get('/admin/api/productDetail/'+id).then(function (response) {
                var modalInstance=$uibModal.open({
                    animation:true,
                    keyboard:false,
                    size:'lg',
                    resolve:{
                        'product': function () {
                            return response.data;
                        }
                    },
                    controller: 'ProductDetailCtrl',
                    templateUrl:'ProductDetail.html'
                });
                modalInstance.result.then(function (id) {
                    //console.log(id);
                    $scope.editedFieldData=null;
                    $scope.productNamesimilar=null;
                    $scope.sameBarcode=null;
                    $scope.title="محصولات";
                    $scope.row=null;
                    $scope.product={};
                    $scope.productOld={};
                    $scope.categories=[];
                    $scope.categoriesOld=[];
                    $scope.activeTab=1;
                    $scope.fields=null;
                    $scope.fieldsOld=[];
                    $scope.categoryId=null;
                    $scope.files=[];
                    $scope.fileSrc=[];
                    $scope.findById(id);
                }, function () {

                });
            })
        };
        //dialog for show changes
        $scope.openDialog= function () {


            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                resolve:{
                    'product': function () {
                        return $scope.product;
                    },
                    'oldProduct': function () {
                        return $scope.productOld;
                    },
                    'category': function () {
                        return $scope.categories.map(function (item) {
                            return item.name;
                        });
                    },
                    'oldCategory': function () {
                        return $scope.categoriesOld.map(function (item) {
                            return item.name;
                        });
                    },
                    'field': function () {
                        return  $scope.fields;
                    },
                    'oldField': function () {
                        return $scope.fieldsOld;
                    },
                    'tables': function () {
                        return $scope.tables;
                    },
                    'isLinkedProduct': function () {
                        return $scope.isLinkedProduct;
                    }

                },
                controller: 'ModalInstanceCtrl',
                templateUrl:'modalContent.html'
            });
            //check attribute if product with this attribute exist

            var fields=$scope.fields.filter(function (field) {
                return field.is_linked_attribute==1;
            });
            // console.log($scope.linkedProductAndAttribute);
            // console.log([1,2]==[2,1]);
            var diffResult={};

            for(var i=0;i<$scope.linkedProductAndAttribute.length;i++){
                var result=1;
                fields.forEach(function (field) {
                    if(!diffResult[field.attribute_id]){
                        diffResult[field.attribute_id]=true;
                    }
                    if(field.type==13){
                        field.value.forEach(function (person) {
                            diffResult[field.attribute_id]*=$scope.linkedProductAndAttribute[i].fields.filter(function (fi) {
                                return fi.attribute_id==field.attribute_id;
                            }).map(function (f) {
                                return f.value;
                            }).includes(String( person.id));
                        });
                    }else if(field.type==3){
                        field.value.forEach(function (select) {
                            diffResult[field.attribute_id]*=$scope.linkedProductAndAttribute[i].fields.filter(function (fi) {
                                return fi.attribute_id==field.attribute_id;
                            }).map(function (f) {
                                return f.value;
                            }).includes(select);
                        });
                    }else if(field.type==4 || field.type==2){
                        // console.log($scope.linkedProductAndAttribute[i].fields);
                        // console.log(field.caption);
                        var temp=$scope.linkedProductAndAttribute[i].fields.filter(function (fi) {
                            return fi.attribute_id==field.attribute_id;
                        });
                        if(temp.length){
                            diffResult[field.attribute_id]*=temp[0].value==String( field.value);
                        }
                    }
                    else{
                        var temp=$scope.linkedProductAndAttribute[i].fields.filter(function (fi) {
                            return fi.attribute_id==field.attribute_id;
                        });
                        if(temp.length){
                            diffResult[field.attribute_id]*=temp[0].value==field.value;
                        }
                    }
                });
                // console.log(diffResult);
                for(var property in diffResult){
                    result*=diffResult[property];
                }
                // console.log(result);
                if(result==1){
                    $scope.linkedProductIsSame=$scope.linkedProductAndAttribute[i].id;
                    break;
                }
            }
            //if change ===true mean no change
            modalInstance.result.then(function (change) {
                //if product with this attributes exist
                // console.log($scope.linkedProductIsSame)
                if($scope.linkedProductIsSame!=0 && false){
                    ngNotify.set(".محصولی مشابه با این ویژگی ها وجود دارد"+'شماره محصول مشابه : '+$scope.linkedProductIsSame ,'error');
                    $scope.linkedProductIsSame=0;
                    return ;
                }
                $scope.change=change;
                $scope.change.fields.forEach(function (field ,index) {
                    if(field.changeOthers){
                        $scope.fields[index].changeOthers=field.changeOthers;
                    }
                });
                $scope.activeTab=3;
                //$scope.fields=angular.copy( $scope.change.fields );
                $scope.product=angular.copy( $scope.change.prod );
                delete change.fields;
                delete change.prod;

                //when open modal , image deleted .so copy it again

                $scope.product.linked_id=angular.copy( $scope.isLinkedProduct);
                //console.log($scope.fields);
                //console.log($scope.row);
                $scope.save();
                //console.log($scope.row);
            }, function () {
                $scope.activeTab=3;
            })
        };
        $scope.save= function () {
            // console.log($scope.fields);
            if(!$scope.form.$invalid ){//&& $scope.sameBarcode==null
                $scope.upload($scope.files,cleanResponse($scope.product),$scope.categories.map(function (category) {
                    return category.id;
                }), $scope.fields.filter(function (form) {
                    if(form!=null && form.is_linked_attribute==1){
                        return true;//send linked attribute
                    }
                    if (form.type==14){
                        // console.log(form.editor);
                        return form.editor!=undefined;
                    }
                    else
                    //bool
                    if(form.type==5){
                        if(form.required)
                            return JSON.stringify(form.value).length>0;
                        else{
                            if(form.value)
                                return true;
                        }
                    }
                    //table
                    else if(form.type==13 ||form.type==3){
                        return form.value.length>0
                    }
                    //image
                    else if(form.type==11){

                        if(form.value==undefined){
                            return false;
                        }
                        else if(form.files!=undefined && form.files.length==0){//use to know is empty or not
                            form.file=false;
                            //console.log(form);
                            return true;
                        }
                        return true;
                    }
                    else if(form.value){
                        return true;
                    }

                }),$scope.change);

            }else
            {
                ngNotify.set("لطفا فیلد ها لازم را پر کنید" ,'error');
            }
        };
        $scope.upload= function (file,product,category,field,change) {
            //return ;
            var imageCode=0;

            var fieldFileLength=0;
            var fieldFile=angular.copy(field);
            //copy from fields and then delete file from data that have file on it to make request small
            fieldFile=fieldFile.filter(function(field){
                if(field.type==11){
                    delete field['files'];
                    delete field['fileSrc'];
                }
                return true;
            });
            field=field.filter(function(field){
                if(field.type==11 && field.files){
                    fieldFileLength+=field.files.length;
                    // console.log(field);
                }
                return field.type==11;
            });
            //console.log(fieldFile);
            //console.log(field);
            $scope.queryList=[];
            $http.post('/admin/api/product',{
                'product':product,
                'categories': category,
                'fields':fieldFile,
                'change':change,
                'foreignStocks':$scope.foreignStocks
            })
            //Upload.upload({
            //    url:'/admin/api/product',
            //    data:{
            //        'product':product,
            //        'categories': category,
            //        'fields':fieldFile,
            //        'change':change
            //    }
            //})
                .then(function (response) {
                //use to detect if field file have file or not
                //return ;
                //console.log(file.length);
                //console.log(fieldFileLength);
                if(file.length>0 || fieldFileLength>0){
                    ///if image change upload it
                    if(response.data.id && product.imageName!=$scope.productOld.imageName)
                        $http.post(location.protocol+"//"+$location.host()+'/admin/api/deleteImageDirectory',{
                            'imageCode':response.data.id
                        }).then(function () {
                            for(var i=0;i<file.length;i++) {
                                // console.log(file[i]);
                                $scope.queryList.push(Upload.upload({
                                    url:location.protocol+"//"+$location.host()+'/admin/api/saveFile',
                                    data: {
                                        'file':file[i],
                                        'name':product.imageName,
                                        'no':i+1,
                                        'imageCode':response.data.id
                                    }
                                }));
                            }
                        })

                    field.forEach(function (item, index) {
                        if(item.files){
                            if(item.value!==response.data.id){
                                $http.post(location.protocol+"//"+$location.host()+'/admin/api/deleteImageDirectory',{
                                    'imageCode':response.data.id,
                                    'attributeLabel':item.name
                                }).then(function () {
                                    for(var i=0;i<item.files.length;i++) {
                                        // if image change upload it

                                        $scope.queryList.push( Upload.upload({
                                            url:location.protocol+"//"+$location.host()+'/admin/api/saveFile',
                                            data: {
                                                'file':item.files[i],
                                                'name':item.value,
                                                'imageCode':response.data.id,
                                                'no':i+1,
                                                'attributeLabel':item.name
                                            }
                                        }).then(function (resp) {
                                            //$scope.loadAll();
                                            //ngNotify.set("با موفقیت ثبت شد" );
                                        }));
                                    }
                                    // }
                                })
                            }
                        }
                    });
                    $q.all($scope.queryList).then(function (resp) {
                        if($stateParams.obj==null){
                            $scope.loadAll();
                            getUnConfirmProductCount.count();
                            getRejectedProduct.count();    getUnConfirmEditedProduct.count();    getGostareshProduct.count();
                        }else{
                            $scope.loadAll();
                            getUnConfirmProductCount.count();
                            getRejectedProduct.count();    getUnConfirmEditedProduct.count();    getGostareshProduct.count();
                            $state.go('dashboard.unConfirmProduct')
                        }
                        ngNotify.set("با موفقیت ثبت شد" );
                    }, function (resp) {

                    }, function (evn) {
                        // console.log(evn);
                    })
                }else {
                    if($stateParams.obj==null){
                        $scope.loadAll();
                        getUnConfirmProductCount.count();
                        getRejectedProduct.count();    getUnConfirmEditedProduct.count();    getGostareshProduct.count();
                    }else{
                        $scope.loadAll();
                        getUnConfirmProductCount.count();
                        getRejectedProduct.count();    getUnConfirmEditedProduct.count();    getGostareshProduct.count();
                        $state.go('dashboard.unConfirmProduct')
                    }
                    ngNotify.set("با موفقیت ثبت شد" );
                }
            });
            //console.log(imageCode);



            //if(imageCode)
            //fieldFile.forEach(function (item, index) {
            //    for(var i=0;i<item.files.length;i++) {
            //        //console.log(item.value[i]);
            //        Upload.upload({
            //            url:'/admin/api/saveFile',
            //            data: {
            //                'file':item.files[i],
            //                'name':item.value,
            //                'no':i,
            //                'imageCode':imageCode
            //            }
            //        }).then(function (resp) {
            //            $scope.loadAll();
            //            ngNotify.set("با موفقیت ثبت شد" );
            //        }, function (resp) {
            //        });
            //    }
            //});

        };

        $scope.linkSelectedProducts=function () {

            var modalInstance=$uibModal.open({
                animation:true,
                keyboard:false,
                size:'lg',
                resolve:{
                    'products': function () {
                        return $scope.products.filter(function (product) {
                            return product.selected;
                        });
                    }
                },
                controller: 'linkSelectedProductsController',
                templateUrl:'/views/product/linkSelectedProducts2.html'
            });
            //get products that have link
            // var linkedProduct= $scope.products.filter(function(product){
            //     return product.product_id && product.selected;
            // }).map(function(product){
            //     return {"produc_id":product.product_id,'linked_id':product.linked_id};
            // });
            // var modalInstance=$uibModal.open({
            //     animation:true,
            //     keyboard:false,
            //     size:'lg',
            //     resolve:{
            //         'productsToLink': function () {
            //             return $scope.products.filter(function (product) {
            //                 return product.selected;
            //             })
            //                 .map(function (product) {
            //                     return product.id;
            //                 });
            //         },
            //         'linkedProduct':function () {
            //             return linkedProduct;
            //         }
            //     },
            //     controller: 'linkSelectedProductsController',
            //     templateUrl:'/views/product/linkSelectedProducts.html'
            // });
            // modalInstance.result.then(function () {
            //     $scope.loadAll();
            // })
        }
    }]);

angular.module('adminPanel')
    .controller('linkSelectedProductsController', ["$scope", "$uibModalInstance", "$http", "products", function ($scope,$uibModalInstance,$http,products) {//,productsToLink,linkedProduct
        $scope.products=products;
        var categories=[];
        $scope.products.filter(function (product) {
            categories=categories.concat( product.categories.map(function (category) {
                return category.id;
            }));
        });

        $scope.update=function () {
            $http.get("/admin/api/product/updateLink").then(function (value) {
                console.log(value.data);
            })
        }

        // console.log(categories);
        // return ;
        $http.post("/admin/api/product/getLinkedAttribute",{
            categories:Array.from(new Set(categories))
        }).then(function (response) {
            $scope.attributes=response.data;
        });

        $scope.save=function () {
            var valueToInsert=[];
             $scope.products.filter(function (product) {
                 $scope.attributes.forEach(function (attribute) {
                     if(attribute.selected){
                         valueToInsert.push({
                             'product_id':$scope.products[0].id,
                             'linked_id':product.id,
                             'attribute_id':attribute.id
                         })
                     }
                 })
            });
            var valueToRemove=$scope.products.map(function (product) {
                return product.id
            });
            $http.post("/admin/api/product/linkProducts",{
                valueToInsert:valueToInsert,
                valueToRemove:valueToRemove
            }).then(function (response) {
                $uibModalInstance.close();
            })
        };

        {
            // $scope.haveLink = linkedProduct.map(function (product) {
            //     return product.linked_id;
            // });
            //
            // $scope.addGroup = function () {
            //     $scope.linkedProduct.push({
            //         linked_products: [$scope.productsToLink[0]]
            //     })
            // }
            //
            // $scope.removeProduct = function (parentIndex, index) {
            //     // console.log(parentIndex)
            //     // console.log(index)
            //     // console.log($scope.linkedProduct);
            //     // console.log($scope.linkedProduct[parentIndex]);
            //     // console.log($scope.linkedProduct[parentIndex-1]);
            //
            //     $scope.linkedProduct[parentIndex].linked_products.splice(index, 1);
            // }
            //
            // $scope.selectedProduct = productsToLink;
            // $scope.temp = [];
            // $scope.getItemOfTableById = function (value, table) {
            //     if ($scope.temp[table] == undefined) {//if table not set set it and child
            //         $scope.temp[table] = {};
            //     }
            //     $http.post('/admin/api/getItemOfTableById', {
            //         item: [table, value]
            //     }).then(function (response) {
            //         $scope.temp[table][value] = response.data;
            //     });
            // };
            //
            // $http.post('/admin/api/product/getProductsForLinkThem', {
            //     productsToLink: productsToLink,
            //     linkedProduct: linkedProduct.map(function (product) {
            //         return product.produc_id;
            //     })
            // }).then(function (response) {
            //     $scope.linkedProduct = response.data.linkedProduct;
            //     if ($scope.linkedProduct.length === 0) {
            //         $scope.linkedProduct.push({});
            //     }
            //     $scope.productsToLink = response.data.productsToLink;
            // });
            //
            // $scope.save = function () {
            //     console.log($scope.linkedProduct);
            //     var valueToInsert = [];
            //     var valueToRemove = [];
            //     $scope.linkedProduct.forEach(function (group) {
            //         valueToRemove.push(group.id);
            //         if (group.linked_products && group.linked_products.length) {
            //             var attributes = [];
            //             console.log(group);
            //             group.linked_products.filter(function (product) {
            //                 attributes = attributes.concat(product.fields.map(function (field) {
            //                     return field.id;
            //                 }))
            //
            //             });
            //             attributes = Array.from(new Set(attributes));
            //
            //             group.linked_products.forEach(function (product) {
            //                 attributes.forEach(function (attribute) {
            //                     valueToInsert.push({
            //                         product_id: group.linked_products[0].id,
            //                         linked_id: product.id,
            //                         attribute_id: attribute
            //                     })
            //                 });
            //             })
            //         }
            //     });
            //
            //     $http.post('/admin/api/product/setLinkToProducts', {
            //         productIdToInsert: valueToInsert,
            //         productIdToRemove: valueToRemove
            //     }).then(function (response) {
            //         $uibModalInstance.close();
            //     })
            // }
        }
    }]);
angular.module('adminPanel')
    .controller('showBarcodeController', ["$scope", "barcode", "product", function ($scope, barcode,product) {
        $scope.barcodeText=barcode;
        $scope.product=product;
        // console.log(product);
        $scope.print= function () {
            var printContent=document.getElementById('printArea').innerHTML;
            var popupWin=window.open('','_blank','width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('' +
                '<html>' +
                '   <head>' +
                '       <style>' +
                '           .top{' +
                '               line-height: 20px;' +
                '               text-align: center;' +
                '               z-index: 10;' +
                '               width: 100%;' +
                '               height: 100%;' +
                '               position: absolute;' +
                '               top: 0;' +
                '               left: 0;' +
                '               }' +
                '           .center{' +
                '               line-height: 20px;' +
                '               text-align: center;' +
                '               width: 100%;' +
                '               height: 100%;' +
                '               position: absolute;' +
                '               top: 10px;' +
                '               left: 0;' +
                '               }' +
                '           .bottom{' +
                '               line-height: 20px;' +
                '               text-align: center;' +
                '               z-index: 10;' +
                '               width: 100%;' +
                '               height: 100%;' +
                '               position: absolute;' +
                '               top: 141px;' +
                '               left: 0;' +
                '               }' +
                //'           @page{' +
                //'                   size:A5;' +
                //'                   margin:0' +
                //'                }' +
                //'           @media print{' +
                //'                   html,body{' +
                //'                               width: 210mm;' +
                //'                               height:297mm' +
                //'                           }' +
                //'                   .page{' +
                //'                           ' +
                //'                       }'+
                //'                }' +
                '       </style>' +
                '   </head>' +
                '   <body onload=\"window.print()\">' +
                '   <div>' +
                '       <div class="top" >فروشگاه آنلاین باهوک</div>' +
                '       <div class="center" >'+printContent+'</div>' +
                '       <div class="bottom" >'+$scope.product.name+'</div>' +
                '   </div>' +
                '   </body>' +
                '</html>');
            popupWin.document.close();
        }
    }]);
angular.module('adminPanel')
    .controller('ModalInstanceCtrl', ["$scope", "$uibModalInstance", "_deep", "tables", "product", "oldProduct", "category", "oldCategory", "field", "oldField", "isLinkedProduct", function ($scope,$uibModalInstance,_deep,tables,product,oldProduct,category,oldCategory,field,oldField,isLinkedProduct){
        $scope.productDiff=_deep.diff(oldProduct,product);
        // console.log($scope.productDiff);
        $scope.product=product;
        $scope.categoryDiff=_deep.diff(oldCategory,category);
        $scope.fields=field;
        $scope.isLinkedProduct=isLinkedProduct;
        $scope.oldField=oldField;
        $scope.checkDiff= function (value, oldValue) {
            return _deep.diff(value,oldValue)!==undefined;
        };
        $scope.diffOldField=[];
        $scope.getOldField= function (name) {

            var item= $scope.oldField.filter(function (item) {
                return item.name==name;
            });
            $scope.diffOldField.push( item[0]);
            return item;
        };
        //console.log($scope.fields);
        $scope.fieldDiff=$scope.fields.filter(function (item) {
            //console.log(item);
            //for table field
            if(item.type==13||item.type==3){
                //if field not have value before and not touch
                if(item.value.length==0&&item.oldValue==undefined)
                    return false;
                return $scope.checkDiff(item.value,item.oldValue);
            }//for image field
            //else if(item.type===11){
            //    return item.value!=item.oldImageName;
            //}
            //for date
            else if(item.type==14){
                return $scope.checkDiff(item.editor,item.oldEditor);
            }
            else if(item.type===4){
                if(item.value==""){
                    item.value=undefined;
                }
                return item.value!=$scope.getOldField(item.name)[0].value;
            }//other
            else{
                return item.value!=$scope.getOldField(item.name)[0].value;
            }
        });

        $scope.setChangeOthers= function (attribute_id,changeOthers) {
            var index=$scope.fields.map(function (item) {
                return item.attribute_id
            }).indexOf(attribute_id);

            $scope.fields[index].changeOthers=changeOthers;
        };

        $scope.setChangeOthersForStaticAttribute= function (attribute,changeOthers) {
            // console.log(attribute);
            // console.log(changeOthers);
            if(!$scope.product.changeOthers){
                $scope.product.changeOthers={};
            }
            if(changeOthers){
                if(attribute=="imageName"){
                    $scope.product.changeOthers["image"]=$scope.product.id;
                }else
                    $scope.product.changeOthers[attribute]=$scope.product[attribute];
            }else{
                delete $scope.product.changeOthers[attribute];
            }
            // console.log($scope.product.changeOthers);
        };

        $scope.ok= function () {
            // console.log($scope.fields);
            //$scope.categoryDiff==undefined &&$scope.productDiff==undefined&&$scope.fieldDiff.length==0
            $uibModalInstance.close({category:$scope.categoryDiff!=undefined,product:$scope.productDiff!=undefined,field:$scope.fieldDiff.length!=0,fields:$scope.fields,prod:$scope.product});
        };
        $scope.cancel= function () {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
angular.module('adminPanel')
    .controller('ProductDetailCtrl', ["$scope", "$uibModalInstance", "product", "$http", function ($scope,$uibModalInstance,product,$http) {
        $scope.temp=[];

        $scope.product=product;

        $scope.getImage= function (imageName,field) {
            $http.post("/admin/api/getFiles",{
                'name':imageName,
                'attributeLabel': field.name
            }).then( function (response) {
                if(typeof response.data =='string'){

                }else
                if(field==false){
                    //rashti trick if len of dir larger than other means attribute image
                    $scope.product.Images=response.data.filter(function (file) {
                        return file.filename=='sm' && file.dirname.length<=response.data[0].dirname.length+1;
                    });
                    $scope.product.Images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                }else{
                    field.images=response.data.filter(function (file) {
                        return file.filename=='sm' && file.dirname.indexOf(field.name);
                    });
                    field.images.forEach(function (file) {
                        file.dirname= file.dirname.replace('../public/','/');
                    });
                }
                //console.log(response.data);

            }, function (response) {
                // console.log(response.status);
            });
        };

        $scope.getImage(product.image,false);

        $scope.getItemOfTableById= function (value,table) {
            if($scope.temp[table]==undefined){//if table not set set it and child
                $scope.temp[table]={};
            }
            $http.post('/admin/api/getItemOfTableById',{
                item:[table,value]
            }).then(function (response) {
                $scope.temp[table][value]=response.data;
            });
        };

        $scope.ok= function () {
            //$scope.categoryDiff==undefined &&$scope.productDiff==undefined&&$scope.fieldDiff.length==0
            $uibModalInstance.close(product.id);
        };
        $scope.cancel= function () {
            $uibModalInstance.dismiss('cancel');
        }
    }]);

angular.module('adminPanel')
    .controller('DeleteProductController', ["$scope", "$uibModalInstance", function ($scope,$uibModalInstance) {
        $scope.ok= function () {
            $uibModalInstance.close();
        };

        $scope.cancel= function () {
            $uibModalInstance.dismiss();
        };
    }]);
angular.module('adminPanel')
    .controller('removeLinkController', ["$http", "$scope", "$uibModalInstance", "productId", function ($http,$scope,$uibModalInstance,productId) {
        $scope.loadAll= function () {
            $http.post('/admin/api/product/getLinkedAttributeByProductId',{
                productId:productId
            }).then(function (response) {
                $scope.attributes=response.data;
            })
        };

        $scope.loadAll();
        $scope.removeLink= function (attribute_id,product_id,index) {
            $http.post('/admin/api/product/removeLink',{
                attribute_id:attribute_id,
                product_id:product_id
            }).then(function (response) {
                $scope.attributes.splice(index,1);
                if($scope.attributes.length==0){
                    $uibModalInstance.close();
                }
            })
        };
        $scope.close= function () {
            $uibModalInstance.close();
        };

    }]);
angular.module('adminPanel')
    .controller('showProductPackController', ["$scope", "$uibModalInstance", "productId", "$http", function ($scope,$uibModalInstance,productId,$http) {
        $scope.theads=[
            {
                field:'id',
                displayName:'شماره بسته',
                template:'<span>{{item.id|persian}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC'
            },
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "</a>",
                sortable:true
            },
            //{
            //    field:'type',
            //    displayName:'نوع',
            //    filterable:true,
            //    editable:true,
            //    sortable:true
            //},
            {
                field:'start_date',
                displayName:'تاریخ شروع',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span>{{item.start_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'end_date',
                displayName:'تاریخ پایان',
                filterable:true,
                editable:true,
                sortable:true,
                width:20,
                template:"<span>{{item.end_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'disc_description',
                displayName:'تخفیف',
                filterable:true,
                editable:true,
                sortable:true
            },
            {
                field:'products',
                displayName:'محصولات',
                template:"" +
                "<span>" +
                "   <ul class='list-unstyled'>" +
                "       <li ng-repeat='product in item.products'>{{product.id}}." +
                "           <span ng-show='product.name'>{{product.name}}</span>" +
                "           <span ng-show='!product.name'>{{product.lName}}</span>" +
                "       </li>" +
                "   </ul>" +
                "</span>",
                width:200,
                filterable:true
            }
        ];
        $scope.datepickerConfig = {
            //allowFuture: false,
            dateFormat: 'YYYY-MM-DD hh:mm:ss'
            //gregorianDateFormat: 'YYYY/DD/MM'
            //minDate: moment.utc('2008', 'YYYY')
        };
        $scope.entries=[10,25,50,100];
        $scope.showEntries='25';
        $scope.productPackCaption="لیست پک ها"

        $scope.loadAll= function () {
            $http.post('/admin/api/product/getProductPack',{
                productId:productId,
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.packs=response.data.packs;
                // console.log($scope.packs);
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            });
        };
        $scope.loadAll();

        $scope.ok= function () {
            $uibModalInstance.close();
        };

        $scope.cancel= function () {
            $uibModalInstance.dismiss();
        };
    }]);

angular.module('adminPanel')
    .controller('showProductDiscountController', ["$scope", "$uibModalInstance", "productId", "$http", function ($scope,$uibModalInstance,productId,$http) {
        $scope.theads=[
            {
                field:'disc_id',
                displayName:'شماره تخفیف',
                template:'<span>{{item.disc_id|persian}}</span>',
                sortable:true,
                filterable:true,

            },
            {
                field:'disc_description',
                displayName:'نام تخفیف',
                filterable:true,
                editable:true,
                template:"" +
                "   <span>{{item.disc_description}}</span>",
                sortable:true
            },
            {
                field:'disc_code',
                displayName:'کد تخفیف',
                filterable:true,
                editable:true,
                sortable:true
            },
            {
                field:'disc_type',
                displayName:'نوع',
                filterable:true,
                editable:true,
                sortable:true
            },
            {
                field:'disc_method',
                displayName:'روش',
                filterable:true,
                editable:true,
                sortable:true
            },
            {
                field:'disc_value_discounted',
                displayName:'مقدار تخفیف',
                filterable:true,
                template:"" +
                "<span>" +
                "   <span ng-if='item.disc_method_calculation_fk==1'>{{item.disc_value_discounted |persian}} %</span>" +
                "   <span ng-if='item.disc_method_calculation_fk!=1'>{{item.disc_value_discounted |persian}} </span>" +
                "</span>",
                editable:true,
                sortable:true
            },
            {
                field:'disc_valid_date',
                displayName:'تاریخ شروع',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.disc_valid_date!=\"0000-00-00 00:00:00\"'>{{item.disc_valid_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'disc_expire_date',
                displayName:'تاریخ انقضا',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.disc_expire_date!=\"0000-00-00 00:00:00\"''>{{item.disc_expire_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'disc_status',
                displayName:'وضعیت',
                template:'' +
                    '<span ng-switch="item.disc_status">' +
                    '   <span ng-switch-when="0">' +
                    '       غیر فعال' +
                    '   </span>' +
                    '   <span ng-switch-when="1">' +
                //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
                '       فعال' +
                '   </span>' +
                '</span>' ,

                filterable:true,
                editable:true,
                sortable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='1'> فعال</option>" +
                "   <option value='0'> غیر فعال</option>" +
                "   </select>" +
                "</div>"
            },
            {
                field:'username',
                displayName:'کاربر',
                template:"<span>{{item.username}}</span>",
                //filterable:true,
                //editable:true,
                //sortable:true
            },
            {
                field:'updated_at',
                displayName:'تاریخ ایجاد',
                //filterable:true,
                sorting:'DESC',
                editable:true,
                sortable:true,
                template:"<span ng-if='item.disc_expire_date!=\"0000-00-00 00:00:00\"''>{{item.updated_at|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
        ];
        $scope.datepickerConfig = {
            //allowFuture: false,
            dateFormat: 'YYYY-MM-DD hh:mm:ss'
            //gregorianDateFormat: 'YYYY/DD/MM'
            //minDate: moment.utc('2008', 'YYYY')
        };
        $scope.entries=[10,25,50,100];
        $scope.showEntries='50';
        $scope.productDiscountCaption="لیست تخفیف ها";

        $scope.loadAll= function () {
            $http.post('/admin/api/product/getProductDiscount',{
                productId:productId,
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.discounts=response.data.discounts;
                // console.log($scope.discounts);
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            });
        };
        $scope.loadAll();

        $scope.ok= function () {
            $uibModalInstance.close();
        };

        $scope.cancel= function () {
            $uibModalInstance.dismiss();
        };
    }]);
/**
 * Created by alireza on 12/26/16.
 */
angular.module('adminPanel').controller('productLogController', ["$scope", "$resource", "ngNotify", "$http", "$stateParams", function ($scope,$resource,ngNotify,$http,$stateParams) {
    ngNotify.config({
        theme: 'pure',
        position: 'down',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.temp=[];
    //console.log($stateParams);
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.changeEntries= function (count) {
        $scope.showEntries=count;
        $scope.loadAll();
    };
    $scope.changeEntriesProduct= function (count) {
        $scope.showEntries=count;
        $scope.findById();
    };
    $scope.theads=[
        {
            field:'product_id',
            displayName:'کد کالا',
            template:'<a href="/product/{{item.product_id}}">{{item.product_id}}</a>',
            sortable:true,
            filterable:true,
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.product_id})\">" +
            "   {{item.name}}" +
            "   <span >" +
            "       {{item.lName}}" +
            "   </span>" +
            "</a>",
            sortable:true
        },
        {
            field:'lName',
            displayName:'نام لاتین',
            filterable:'true',
            sortable:true
        },
        {
            field:'barcode',
            displayName:'بارکد',
            filterable:'true',
            sortable:true
        },
        {
            field:'price',
            displayName:'قیمت',
            filterable:'true',
            sortable:true
        },
        {
            field:'weight',
            displayName:'وزن',
            filterable:'true',
            sortable:true
        },
        {
            field:'length',
            displayName:'طول',
            filterable:'true',
            sortable:true
        },
        {
            field:'height',
            displayName:'عرض',
            filterable:'true',
            sortable:true
        },
        {
            field:'width',
            displayName:'ارتفاع',
            filterable:'true',
            sortable:true
        },
        {
            field:'description',
            displayName:'توضیحات',
            filterable:'true',
            sortable:true
        },
        {
            field:'details',
            displayName:'جزییات',
            filterable:'true',
            sortable:true
        },
        {
            field:'logType',
            displayName:'نوع لاگ',
            //filterable:true,
            filterable:'true',
            template:"" +
            "<span ng-if='item.logType==0'>ویرایش</span>" +
            "<span ng-if='item.logType==1'>ایجاد</span>"+
            "<span ng-if='item.logType==2'>ویرایش ویژگی داینامیک</span>",
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option label=\"\" value=\"\" selected=\"selected\"></option>" +
            "   <option label=\"ویرایش\" value='0' >ویرایش</option>" +
            "   <option label=\"ایجاد\" value='1'>ایجاد</option>" +
            "   <option label=\"ویرایش ویژگی داینامیک\" value='2'>ویرایش ویژگی داینامیک</option>" +
            "   </select>" +
            "</div>",
        },
        {
            field:'user',
            displayName:'کاربر',
            template:"<span>{{item.user.fName}} {{item.user.lName}}</span>",
            filterable:'true'
        },
        {
            field:'created_at',
            displayName:'تاریخ',
            template:"<span>{{item.created_at|jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}} </span>",
            sortable:true,
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'DESC'
        }
    ];
    //$scope.button= {
    //        loadAll:true,
    //        loadAllFunction:$scope.loadAll()
    //    };
    $scope.showEntries=10;
    $scope.title="";
    $scope.products=null;//list of all product
    $scope.product=null;

    var Product=$resource('/admin/api/product/:id');

    $scope.$on('$viewContentLoaded', function () {
        if($stateParams.id!=null){
            $scope.findById($stateParams.id);
        }else
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        //console.log(1);
        $scope.title="لاگ محصولات";
        $scope.product=null;
        $http.post('/admin/api/productLog/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined && thead.filter!="";
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.products=response.data.products;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };
    $scope.getItemOfTableById= function (table, value,index,attributeName) {
        //if($scope.temp[table]==undefined){//if table not set set it and child
        //    $scope.temp[table]={};
        //    $scope.temp[table][value]="";
        //}else if($scope.temp[table][value]==undefined){//if child not set ,set it
        //    $scope.temp[table][value]="";
        //}else if($scope.temp[table][value]!=undefined && $scope.temp[table][value]!=""){//if both set return
        //    //return;
        //    console.log($scope.temp[table]);
        //    console.log(value);
        //    $scope.product[index][attributeName].push($scope.temp[table][value]);
        //    return ;
        //}
        //get table item
        if($scope.temp[table]==undefined){//if table not set set it and child
            $scope.temp[table]={};
        }
        $http.post('/admin/api/getItemOfTableById',{
            item:[table,value]
        }).then(function (response) {
            if(typeof $scope.product[index][attributeName] !='object' ){
                $scope.product[index][attributeName]=[];
            }
            $scope.product[index][attributeName].push(response.data[0].name);
            $scope.temp[table][value]=response.data[0].name;
        });
        //console.log($scope.temp);
    };
    $scope.findById= function ($id) {
        console.log($id);
        $scope.title="لاگ محصول";
        $scope.productTheads=[
            {
                field:'user',
                displayName:'کاربر',
                template:"<span>{{item.user.fName}} {{item.user.lName}}</span>",

            },
            {
                field:'time',
                displayName:'تاریخ',
                template:"<span>{{item.date*1000|jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}} </span>",

            },
            {
                field:'name',
                displayName:'نام',
                template:'<span>{{item.name}}</span>',

            },
            {
                field:'lName',
                displayName:'نام لاتین',

                //template:"<span ng-class=\"{'danger':data[$index]lName!=data[$index-1].lName && $index!=0}\">{{$index}}</span>"
            },
            {
                field:'barcode',
                displayName:'بارکد',

            },
            {
                field:'price',
                displayName:'قیمت',

            },
            {
                field:'weigth',
                displayName:'وزن',

            },
            {
                field:'length',
                displayName:'طول',

            },
            {
                field:'width',
                displayName:'عرض',

            },
            {
                field:'height',
                displayName:'ارتفاع',

            },
            {
                field:'description',
                displayName:'توضیحات',

            },
            {
                field:'details',
                displayName:'جزییات',

            }


        ];
        if($id){
            $scope.id=$id;
            $scope.currentPageProduct=1;
            $scope.showEntriesProduct='50';
        }

        $http.post('/admin/api/productLog/show',{
            currentPage:$scope.currentPageProduct,
            showEntries:$scope.showEntriesProduct,
            id:$id||$scope.id
        }).then(function (response) {

            $scope.product=response.data.products;
            $scope.totalItemProduct=response.data.count;
            $scope.numPagesProduct=response.data.count/$scope.showEntriesProduct;

            $http.post('/admin/api/fieldLog/getFieldLogByDate',{
                id:$scope.product[0].product_id,
                dates:$scope.product.map(function (item) {
                    return item.date;
                })
            }).then(function (response) {
                response.data.attributes.forEach(function (attribute,index) {
                    var col={};
                    col.displayName=attribute.caption;
                    col.field=attribute.name;

                    if(attribute.type==13){
                        col.template="<ul ><li ng-repeat='person in item[thead.field]'>{{person}}</li></ul>";
                        col.width=100;
                    }
                    $scope.productTheads.push(col);
                });
                //console.log(response.data.fieldLog);
                $scope.product.forEach(function (product, productIndex) {
                    response.data.attributes.forEach(function (attribute,index) {
                        var value=response.data.fieldLog.filter(function (log) {
                            return log.date==product.date && log.attribute_id==attribute.id;
                        });
                        // console.log(value);

                        if(attribute.type==13){
                            if(product[attribute.name]==null){
                                product[attribute.name]=[]
                            }
                            //console.log(attribute.name);
                            //console.log(value);
                            if(value.length!=0)
                            for(var i =0 ;i<value.length;i++){
                                $scope.getItemOfTableById(attribute.table,value[i].value,productIndex,attribute.name);
                            }
                        }else {
                            //console.log(attribute.name);
                            //console.log();
                            if(value.length!=0){
                                value.forEach(function(item){
                                    if(!product[attribute.name]){
                                        product[attribute.name]=item.value;
                                    }else{
                                        product[attribute.name]=item.value+" , "+product[attribute.name];
                                    }
                                });


                            }

                        }
                    });
                });
                // console.log($scope.product);
            })
        });

    }

}]);
/**
 * Created by alireza on 4/26/17.
 */
angular.module('adminPanel').controller('productPackController', ["$scope", "ngNotify", "$http", "$uibModal", "Upload", function ($scope,ngNotify,$http,$uibModal,Upload) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.product=null;
    $scope.productPackCaption="پک محصولات";
    $scope.productListCaption="لیست محصولات";
    $scope.products=null;
    $scope.title='لیست پک ها';
    $scope.theads=[
        {
            field:'id',
            displayName:'شماره بسته',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC'
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true
        },
        //{
        //    field:'type',
        //    displayName:'نوع',
        //    filterable:true,
        //    editable:true,
        //    sortable:true
        //},
        {
            field:'start_date',
            displayName:'تاریخ شروع',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span>{{item.start_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>"
        },
        {
            field:'end_date',
            displayName:'تاریخ پایان',
            filterable:true,
            editable:true,
            sortable:true,
            template:"<span>{{item.end_date|jalaliDate : 'hh:mm:ss jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>"
        },
        {
            field:'disc_description',
            displayName:'تخفیف',
            filterable:true,
            editable:true,
            sortable:true
        },
        {
            field:'products',
            displayName:'محصولات',
            template:"" +
            "<span>" +
            "   <ul class='list-unstyled'>" +
            "       <li ng-repeat='product in item.products'>{{product.id}}." +
            "           <span ng-show='product.name'>{{product.name}}</span>" +
            "           <span ng-show='!product.name'>{{product.lName}}</span>" +
            "       </li>" +
            "   </ul>" +
            "</span>",
            filterable:true
        }
    ];
    $scope.datepickerConfig = {
        //allowFuture: false,
        dateFormat: 'YYYY-MM-DD hh:mm:ss'
        //gregorianDateFormat: 'YYYY/DD/MM'
        //minDate: moment.utc('2008', 'YYYY')
    };
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_pack'
        }
        //loadAllFunction:$scope.loadAll()
    };
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.nextPage= function (page) {
        $scope.page=page;
    };
    $scope.loadAll= function () {
        $scope.packHeader=0;
        $scope.productTheads=[
            {
                field:'id',
                displayName:'شماره محصول',
                template:'<a href="/product/{{item.id}}">{{item.id|persian}}</a>',
                sortable:true,
                filterable:true,
                sorting:'DESC'
            },
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}} {{item.lName}}" +
                "</a>",
                sortable:true
            },
            {
                field:'x',
                displayName:'x',
                template:"" +
                "<span>" +
                "   {{item.x}} " +
                "</span>"
            },
            {
                field:'y',
                displayName:'y',
                template:"" +
                "<span>" +
                "   {{item.y}} " +
                "</span>"
            },
            {
                field:'action',
                displayName:'',
                template:"" +
                "<button class='btn btn-adn' ng-click='deleteById({id:item.id})'>حذف</button>"
            },
            {
                field:'packHeader',
                displayName:'سر گروه',
                template:"" +
                "<input type='radio' name='packHeader' ng-model='packHeader' " +
                "ng-value='item.id' ng-click='changePackHeader({id:item.id})' ng-checked='packHeader==item.id'>"
            }
        ];
        $scope.page=1;
        $scope.id=null;
        $scope.product=null;
        $scope.title='لیست پک ها';
        $scope.pack=null;
        $http.post('/admin/api/pack/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.packs=response.data.packs;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };
    $scope.changePackHeader= function (id) {
        $scope.packHeader=id;
    };
    $scope.createNew= function () {
        //$scope.packs=null;
        $scope.packHeader=0;
        $scope.pack={};
        $http.get('/admin/api/pack/getAllDiscount').then(function (resp) {
            $scope.discounts=resp.data;
        });
        $scope.loadAllProduct();
    };

    $scope.findById= function (id) {
        var d=new Date();
        $scope.page=1;
        //$scope.packs=null;
        $http.post('/admin/api/pack/show',{
            id:id
        }).then(function (response) {
            $http.get('/admin/api/pack/getAllDiscount').then(function (resp) {
                $scope.discounts=resp.data;
            });
            $scope.pack=response.data;
            $scope.packHeader=$scope.pack.description;

            $scope.loadAllProduct(id);
            $scope.pack.extension=$scope.pack.icon.split(".").pop();
            $scope.getImage($scope.pack.icon);
            $scope.pack.image="/image/pack/"+$scope.pack.icon+"?"+ d.getDate();
        });
    };

    $scope.getImage= function (icon) {
        //console.log(id);
        var d=new Date();
        var xhr=new XMLHttpRequest();
        xhr.open('GET','/image/pack/'+icon+"?"+ d.getDate(),true);
        xhr.responseType='blob';
        xhr.onload= function (event){
            var fileReader=new FileReader();
            fileReader.readAsDataURL(event.target.response);
            $scope.file= new File([event.target.response], "filename", {type: "image/png"});
            fileReader.onloadend= function () {
                $scope.pack.image=fileReader.result;
            };
        };
        xhr.send();
    };

    $scope.imageUpload= function (element,categoryId) {
        console.log(element.id);
        console.log(element.files);
        $scope.pack.extension=element.files[0].name.split(".").pop();//set extension for save file name in db
        $scope.file=element.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(element.files[0]);
        reader.onloadend=$scope.imageIsLoaded;
    };

    $scope.imageIsLoaded= function (e) {
        $scope.$apply(function () {
            $scope.pack.image=e.target.result;//change e.target.result to e.target
            console.log(e.target);
        })
    };

    $scope.loadAllProduct= function (id) {
        if(id){
            $scope.id=id;
        }

        $http.post('/admin/api/pack/getProductsOfPack',{
            theads:$scope.productTheads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            id:id||$scope.id,
            sort:$scope.productTheads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            $scope.products = response.data.products;
            //$scope.products.filter(function (product) {
            //
            //    if(product.id==$scope.pack.description){
            //        product.packHeader=product.id;
            //    }
            //});
            $scope.totalItem = response.data.count;
            $scope.numPages = response.data.count / $scope.showEntries;
        });
    };

    $scope.selectProduct= function (product) {
        if($scope.pack.id){
            $http.post('/admin/api/addProductToPack',{
                pack: $scope.id,
                product:product.id
            }).then(function (response) {
                //if(response.data!=1){
                //    ngNotify.set('این محصول قبلا اضافه شده است',error);
                //}else {
                $scope.loadAllProduct();
                //}
            });
        }else {
            $scope.products.push(product);
        }
    };

    $scope.deleteById= function (id) {
        //console.log(id);
        if($scope.pack.id){
            $http.post('/admin/api/deleteProductFromPack',{
                pack: $scope.id,
                product:id
            }).then(function (response) {
                $scope.loadAllProduct();
            });
        }else {
            $scope.products= $scope.products.filter(function (product) {
                return product.id!=id;
            })
        }
        //$scope.products= $scope.products.filter(function (product) {
        //    return product.id!=id;
        //});
    };

    $scope.$watch('productSearch', function (value) {
        $scope.productNamesimilar=null;
        //console.log(value);
        if(value){
            $http.get('/admin/api/pack/search/'+value).then(function (response) {
                $scope.recommendedProduct=response.data;
            }, function (response) {
                console.log(response.data);
            })
        }
    });

    $scope.chooseProductById= function () {
        if($scope.productId){
            $http.post('/admin/api/addProductToPackById',{
                product: $scope.productId,
                //fk:$scope.discount.disc_group_fk,
                group: $scope.id
            }).then(function (response) {
                if(response.data){
                    console.log($scope.products);
                    $scope.products.push(response.data);
                    //$scope.loadAllProduct();
                }else
                    $scope.loadAllProduct();
            });
        }
    };

    $scope.read = function (workbook) {
        /* DO SOMETHING WITH workbook HERE */
        $scope.csv=[];
        workbook.SheetNames.forEach(function(sheetName) {
            //console.log(sheetName);
            var csv = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            $scope.csv=$scope.csv.concat(csv); //example [{id:'123',barcode:'123213123123'}]
        });
        console.log($scope.csv[0].id==undefined);
        if($scope.csv[0].id==undefined){
            $http.post('/admin/api/pack/addProductToPackByBarcode',{
                packId:$scope.pack.id,
                barcodes:$scope.csv.map(function (item) {
                    return item.barcode;
                })
            }).then(function (response) {
                if(!$scope.pack.id){
                    $scope.products= $scope.products.concat(response.data);
                }else {
                    $scope.loadAllProduct();
                }
            });
        }else {
            $http.post('/admin/api/pack/addProductToPackByIds',{
                packId:$scope.pack.id,
                ids:$scope.csv.map(function (item) {
                    return item.id;
                })
            }).then(function (response) {
                if(!$scope.pack.id){
                    $scope.products= $scope.products.concat(response.data);
                }else {
                    $scope.loadAllProduct();
                }
            });
        }
        //console.log($scope.csv[0].id==undefined)

        //console.log($scope.csv);
    };
    $scope.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
    };



    $scope.save= function () {
        console.log($scope.packHeader);
        //return ;
        $http.post('/admin/api/pack/save',{
            pack:$scope.pack,
            products:$scope.products,
            packHeader:$scope.packHeader
        }).then(function (response) {
            if(!isEmpty( response.data.icon) && response.data.icon!="" ){
                Upload.upload({
                    url:"/admin/api/pack/savePackImage",
                    data:{
                        'file':$scope.file,
                        'icon':response.data.icon,
                    }
                }).then(function (resp) {
                    ngNotify.set("با موفقیت ذخیره شد");
                    $scope.loadAll();
                });
            }else{
                ngNotify.set("ثبت شد" );
                $scope.loadAll();
            }
        }, function (response) {
            console.log(response);
        })
    }
}]);


/**
 * Created by alireza on 5/6/17.
 */
angular.module('adminPanel').controller('recommendedPackController', ["$scope", "ngNotify", "$http", "$uibModal", "AclService", function ($scope,ngNotify,$http,$uibModal,AclService) {

    $scope.title='تنظیمات پک پیشنهادی';
    $scope.tree=[{}];
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    var convertToTree= function (categoryList) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node.id] = i; // use map to look-up the parents
            if (node.parent_id !== null) {
                categoryList[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    };

    $scope.recommendedPackTitle="تنظیمات پک ";
    //$scope.title='لیست روش های تخفیف';
    $scope.theads=[
        {
            field:'index',
            displayName:'ردیف',
            template:"<span>{{$parent.$parent.$index+1|persian}}</span>",
            width:10
        },
        {
            field:'recommended_Category_name',
            displayName:'دسته بندی ها',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"can(\'add_recommendedPack\')&&findById({$id:item.date})\">" +
            "   <span ng-bind-html='item.recommended_Category_name'></span>" +
            //"   <span>" +
            //"       " +
            //"   </span>" +
            //"   <span ng-repeat=\'category in  item.recommended_categories\'>" +
            //
            //"       <span ng-if='category.pivot.date==item.date'>" +
            //"       | {{category.name}}" +
            //"       </span>" +
            //
            //"   </span>" +
            //"   " +
            "</a>",
            sortable:true,
            sorting:'DESC',
            width:500
        },
        {
            field:'recommended_attribute_name',
            displayName:'ویژگی ها',
            filterable:true,
            editable:true,
            template:"" +
            "<span ng-bind-html='item.recommended_attribute_name'>" +

            "   " +
            "</span>",
            sortable:true,
            width:100
        }
    ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.button= {
        createNew:{
            show:true,
            permission:'add_recommendedPack'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.col_defs=[{
        cellTemplate:"<a class='btn-lg' href='' ng-show=\'can(\"add_category\")\' ng-click='cellTemplateScope.createNew(row.branch)'><span class='glyphicon glyphicon-plus-sign'></span></a>" +
        "<a class='btn-lg' href='' ng-show=\'can(\"remove_category\")\' ng-click='cellTemplateScope.remove(row.branch)'><span class='glyphicon glyphicon-remove-sign text-red'></span></a>" ,
        cellTemplateScope:{
            createNew:$scope.createNew,
            remove:$scope.remove
        }
    }];

    $scope.loadAll= function () {
        $scope.recommended_categories_name=null;
        $scope.recommended_attribute_name=null;
        $scope.date=null;
        $scope.title='تنظیمات پک ';
        //$scope.showEntries='50';
        $scope.recommended_categories=null;

        $http.post('/admin/api/recommendedPack/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.categories=response.data.categories;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $http.get("/admin/api/recommendedPack/getCategories",{

            }).then(function (response) {
                $scope.categoryList=response.data;
                $scope.tree=convertToTree(response.data);
            }, function (response) {
                console.warn(response);
            })
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.createNew= function () {
        $scope.recommended_categories=[ ];
    };

    var uniqueAttributes= function (recommended_categories) {
        var uniqe=[],values=[];
        recommended_categories.forEach(function (category) {
            category.attributes.forEach(function (attribute) {
                if(values.indexOf(attribute.id)==-1){
                    values.push(attribute.id);
                }else if(uniqe.indexOf(attribute.id)>-1){

                }else if(values.indexOf(attribute.id)>-1){
                    uniqe.push(attribute.id);
                }
            })
        });
        return uniqe;
    };

    $scope.findById=function(date){
        $scope.recommended_categories=[ ];
        $http.get('/admin/api/recommendedPack/show/'+date).then(function (response) {
            $scope.recommended_categories=response.data.recommended_categories;
            $scope.date=response.data.date;
            //$http.post('/admin/api/recommendedPack/getAttributeByCategoryId',{
            //    categories:$scope.recommended_categories
            //}).then(function (response) {
            //    $scope.attributes=response.data;
            //});
            $scope.recommended_categories_name="";
            $scope.recommended_categories.forEach(function (category) {
                $http.post('/admin/api/recommendedPack/getAttributeByCategoryId',{
                    category:category,
                    usedAttribute:category.recommended_attributes.map(function (attribute) {
                        return attribute.id;
                    })
                }).then(function (response) {
                    category.attributes=response.data.attributes;
                    category.abbr="";

                    response.data.categoryTree.forEach(function (cat,index) {

                        category.abbr+=cat.name;
                        if(index!=response.data.categoryTree.length-1){
                            category.abbr+=" > ";
                        }

                    });

                    console.log(category.abbr);
                });
            });

        });
        //$http.get('/admin/api/recommendedPack/getRecommendedCategories/'+$id).then(function (response) {
        //    $scope.category=response.data;
        //    $scope.category.recommended_categories.forEach(function (category) {
        //        $http.post('/admin/api/recommendedPack/getAttributeByCategoryId',{
        //            category:category
        //        }).then(function (response) {
        //            category.attributes=response.data;
        //        });
        //    })
        //}, function (response) {
        //    console.warn(response);
        //});
    };

    var isInArray=function(objectArray,item){
        var inArray = false;
        for(var i=0;i<objectArray.length;i++) {
            if (objectArray[i]["id"] == item.id) {
                inArray = true;
            }
        }
        return inArray;

    };

    $scope.addToRecommendedCategory= function (category) {
        if(!$scope.recommended_categories){
            $scope.recommended_categories=[];
        }
        //category to add
        var cat={
            id:category.id,
            name:category.name
        };

        //if(!isInArray($scope.recommended_categories,cat)){
            $scope.recommended_categories.push(cat);
            $http.post('/admin/api/recommendedPack/getAttributeByCategoryId',{
                category:cat,
                usedAttribute:[]
            }).then(function (response) {
                cat.attributes=response.data.attributes;
                console.log(cat.abbr);
                cat.abbr="";
                response.data.categoryTree.forEach(function (c,index) {
                    cat.abbr+=c.name;
                    if(index!=response.data.categoryTree.length-1){
                        //$scope.recommended_categories_name+=" > ";
                        cat.abbr+=" > ";
                    }
                });
            });
            console.log($scope.recommended_categories);
        //}
    };
    $scope.chooseCategory= function () {
        if($scope.quickCategory){
            if((!isNaN(parseFloat($scope.quickCategory)) && isFinite($scope.quickCategory))){
                var category=$scope.categoryList.filter(function (category) {
                    return category.id==$scope.quickCategory;
                })[0];
                 $scope.expandTo=category.name;
                $scope.addToRecommendedCategory(category);
            }else{
                $scope.expandTo= $scope.categoryList.filter(function (category) {
                    return category.name.includes($scope.quickCategory);
                })[0].name;
            }
            //expand tree .first get name by id then send it to expandTo

            console.log( $scope.expandTo);
        }
        $scope.quickCategory="";
    };
    $scope.removeCategory= function (index) {
        $scope.recommended_categories.splice(index,1);
    };

    $scope.save=function(){
        var date=Date.now();
        console.log($scope.recommended_categories);
        $scope.categoryTable=[];
        $scope.attributeTable=[];
        $scope.recommended_attribute_name="";
        $scope.recommended_categories_name=$scope.recommended_categories.map(function (category) {
            $scope.recommended_attribute_name+=category.recommended_attributes.map(function (attribute) {
                return attribute.caption;
            }).join(" , ")+"</br>";
            return category.abbr
        }).join('</br>');


        for(var i=0;i<$scope.recommended_categories.length;i++){
            $scope.recommended_categories.forEach(function (category,index) {
                //if(category.id!=$scope.recommended_categories[i].id){
                    $scope.categoryTable.push({
                        category_id:$scope.recommended_categories[i].id,
                        recommended_category_id:category.id,
                        date:date,
                        recommended_Category_name:$scope.recommended_categories_name,
                        recommended_attribute_name:$scope.recommended_attribute_name
                    });
                    category.recommended_attributes.forEach(function (attribute) {
                        $scope.attributeTable.push({
                            category_id:$scope.recommended_categories[i].id,
                            recommended_category_id:category.id,
                            attribute_id:attribute.id,
                            date:date,
                        })
                    })
                //}
            });
        }

        console.log($scope.categoryTable);
        console.log($scope.attributeTable);


        $http.post('/admin/api/recommendedPack/save',{
            category_recommended_category:$scope.categoryTable,
            recommended_category_attribute:$scope.attributeTable,
            date:$scope.date,
            recommended_categories: $scope.recommended_categories
        }).then(function (response) {
            ngNotify.set( "با موفقیت ذخیره شد");
            $scope.loadAll();
            $scope.category=null;
        })
    };

    $scope.cancel= function () {
        $scope.recommended_categories=null;
    }
}]);
/**
 * Created by alireza on 12/29/16.
 */
angular.module('adminPanel').controller('roleController', ["AclService", "$scope", "$resource", "ngNotify", "$http", function (AclService, $scope,$resource,ngNotify,$http) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.showEntries=10;
    $scope.title="";
    $scope.roles=null;//list of all user
    $scope.role=null;

    $scope.theads=[
        {
            field:'id',
            displayName:'کد محصول',
            filterable:true,
            template:'<span >{{item.id|persian}}</span>',
            sortable:true,
            width:120,
            sorting:'DESC'
        },
        {
            field:'name',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.id})\" >" +
            "   {{item.name}} " +
                //"   <span ng-if=\"item.lName\">" +
                //"       {{item.lName}}" +
                //"   </span>" +
            "</a>",
            sortable:true,
            width:120
        },
        {
            field:'display_name',
            displayName:'عنوان نقش',
            filterable:true,
            editable:true,
            sortable:true,
            width:120
        },
        {
            field:'description',
            displayName:'توضیحات',
            filterable:true,
            editable:true,
            sortable:true,
            width:300
        },
        {
            field:'permission',
            displayName:'دسترسی ها',
            template:"" +
            "   <ul class='list-unstyled list-inline'>" +
            "       <li ng-repeat='permission in item.permissions'>{{permission.display_name}}</li>" +
            "   </ul>   "
        }
    ];
    $scope.showEntries='50';
    $scope.entries=[10,25,50,100];

    $scope.button={
        createNew:{
            show:true,
            permission:AclService.can('role_management')
        }
    };

    var Role=$resource('/admin/api/role/:id');

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $scope.allPermissionChecked=false;
        $scope.title="نقش ها";
        $scope.permissions=null;
        $scope.showEntries='50';
        $scope.role=null;
        $http.post('/admin/api/role/getAll',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            categoryIds:$scope.categoryIdForSearch,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.roles=response.data.roles;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    //$scope.checkPermissionGroup= function (value) {
    //
    //};

    $scope.checkAll= function () {
        $scope.allPermissionChecked=!$scope.allPermissionChecked;
        $scope.permissions.filter(function (permission) {
            permission.state=$scope.allPermissionChecked;
        });
    };

    $scope.findById= function ($id) {
        Role.get({id:$id}, function (data) {
            $scope.role=data;
            $http.get('/admin/api/roles/getAllPermission').then(function (response) {
                $scope.permissions=response.data;
                $scope.role.permissions.forEach(function (item) {
                    $scope.permissions.filter(function (permission) {
                        return permission.id==item.id;
                    })[0].state=true;
                })
            });
        });
    };

    $scope.createNew= function () {
        $scope.role={};
        $http.get('/admin/api/roles/getAllPermission').then(function (response) {
            $scope.permissions=response.data;
            //$scope.role.permissions.forEach(function (item) {
            //    $scope.permissions.filter(function (permission) {
            //        return permission.id==item.id;
            //    })[0].state=true;
            //})
        });
        //$scope.role.level=1;
    };

    $scope.save= function () {
        var permissions= $scope.permissions.filter(function (item) {
            return item.state==true;
        }).map(function (item) {
            return item.id;
        });
        //console.log(roles);
        //return roles;
        $http.post('/admin/api/role',{
            permissions:permissions,
            roleId:$scope.role
        }).then( function (response) {
            ngNotify.set("با موفقیت ذخیره شد" );
            $scope.loadAll();
        }, function (response) {
            console.warn(response);
        });
        //Role.save({
        //
        //}, function (data) {
        //    $scope.loadAll();
        //}, function (response) {
        //    console.warn(response);
        //});
    }

}]);

/**
 * Created by alireza on 4/7/17.
 */
angular.module('adminPanel')
.controller('sidebarController', ["AclService", "$scope", "$rootScope", "$http", function (AclService,$scope,$rootScope, $http) {
    $scope.can = AclService.can;
}]);
/**
 * Created by alireza on 5/23/17.
 */
angular.module('adminPanel')
    .controller('skillsController',["AclService", "$scope", "$resource", "$http", "ngNotify", "$uibModal", function(AclService,$scope,$resource,$http,ngNotify,$uibModal){
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
        $scope.skillListCaption="لیست مهارت ها";
        $scope.theads=[
            {
                field:'id',
                displayName:'ردیف',
                template:'<a href="/register?skill={{item.id}}" target="_blank">{{item.id|persian}}</a>',
                sortable:true,
                filterable:true,
                sorting:'DESC',
                width:100
            },
            {
                field:'name',
                displayName:'نام مهارت',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"can(\'edit_skill\')&&findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "</a>",
                sortable:true,
                width:200
            },
            {
                field:'link',
                displayName:'لینک',
                filterable:true,
                editable:true,
                template:"" +
                "<a  href='{{item.link}}' target='_blank'>" +
                "   {{item.link}}" +
                "</a>",
                sortable:true,
                width:200
            },
            {
                field:'action',
                displayName:'',
                filterable:true,
                editable:true,
                template:"" +
                "<a class='btn btn-primary' href='' ng-click=\"can(\'edit_skill\')&&deleteById({$id:item.id})\">" +
                "   حذف" +
                "</a>",
                sortable:true,
                width:200
            },

        ];
        $scope.can = AclService.can;
        $scope.entries=[10,25,50,100];
        $scope.showEntries='50';
        $scope.button= {
            createNew:{
                show:true,
                permission:'add_skill'
            }
            //loadAllFunction:$scope.loadAll()
        };

        $scope.datepickerConfig = {
            //allowFuture: false,
            dateFormat: 'YYYY-MM-DD hh:mm:ss'
            //gregorianDateFormat: 'YYYY/DD/MM'
            //minDate: moment.utc('2008', 'YYYY')
        };



        $scope.$on('$viewContentLoaded',function(){
            $scope.loadAll();
        });

        $scope.loadAll=function(){
            $scope.title='لیست ویژگی ها';
            $scope.showEntries='50';
            $scope.skill=null;
            //$scope.row=null;

            $http.post('/admin/api/skill/index',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                //console.log(response.data);
                $scope.skills=response.data.skills;
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.createNew= function () {
            $scope.skills=null;
            $scope.skill={};
        };

        $scope.findById= function (id) {
            //$scope.skills=null;
            $http.get('/admin/api/skill/show/'+id).then(function (response) {
                $scope.skill=response.data[0];
            }, function (response) {
                console.warn(response);
            })
        };

        $scope.save= function () {
            //console.log($scope.skill);
            //return ;
            $http.post('/admin/api/skill/save',{
                skill:$scope.skill
            }).then(function (response) {
                ngNotify.set('با موفقیت ذخیره شد');
                $scope.loadAll();
            }, function (response) {
                console.log(response);
            })
        }

        $scope.deleteById=function (id) {
            $http.post('/admin/api/skill/delete',{
                id:id
            }).then(function (response) {
                ngNotify.set('با موفقیت حذف شد');
                $scope.loadAll();
            }, function (response) {
                console.log(response);
            })
        }
    }]);
/**
 * Created by alireza on 2/6/17.
 */
angular.module('adminPanel')
    .controller('unConfirmProductController', ["$scope", "$resource", "ngNotify", "$http", "$uibModal", "$state", function ($scope,$resource,ngNotify,$http,$uibModal,$state) {
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
        $scope.showEntries=10;
        $scope.title="";
        $scope.products=null;//list of all product
        $scope.product=null;
        $scope.currentPage=1;
        $scope.showEntries='50';
        $scope.temp=[];
        $scope.entries=[10,25,50,100];


        $scope.theads=[
            {
                field:'index',
                displayName:'ردیف',
                template:"<span>{{$parent.$parent.$index+1 | persian }}</span>",
                width:50
            },
            {
                field:'id',
                displayName:'کد محصول',
                filterable:true,
                template:'<span>{{item.id |persian}}</span>',
                sortable:true,
                width:50,
            },
            //TODO search for lName
            {
                field:'name',
                displayName:'نام',
                filterable:true,
                editable:true,
                template:"" +
                "<a href='' ng-click=\"findById({$id:item.id})\">" +
                "   {{item.name}}" +
                "   <span ng-if=\"item.lName\">" +
                "       {{item.lName}}" +
                "   </span>" +
                "</a>",
                sortable:true,
                width:300
            },
            {
                field:'rejectDescription',
                displayName:'توضیح'
                //filterable:true,
                //width:100
                //sortable:true
            },
            {
                field:'uDate',
                displayName:'تاریخ بازگشت محصول',
                sortable:true,
                template:"<span>{{item.uDate | jalaliDate : 'jYYYY/jMM/jDD hh:mm:ss'|persian}}</span>",
                width:100,
                sorting:'DESC'
            }
        ];

        $scope.button={
            //unConfirmAll:true,
            //selectAll:true
        };

        var ConfirmProducts=$resource('/admin/api/confirmProducts/:id');

        $scope.onSearchInputKeyPress= function (event) {
            if(event.charCode==13){
                //$scope.searchProduct(value);
                $scope.loadAll();
            }
        };

        //$scope.confirmAll= function () {
        //    var products=$scope.products.filter(function (product) {
        //        return product.unconfirm==1;
        //    }).map(function (product) {
        //        return product.id;
        //    });
        //    $http.post('/admin/api/confirmProducts/unConfirmSelected',{
        //        selected:products
        //    }).then(function (response) {
        //        console.log(response.data);
        //        $scope.loadAll();
        //    }, function (response) {
        //        console.warn(response);
        //    });
        //};

        //$scope.getItemOfTableById= function (value,table) {
        //    if($scope.temp[table]==undefined){//if table not set set it and child
        //        $scope.temp[table]={};
        //    }
        //    $http.post('/admin/api/getItemOfTableById',{
        //        item:[table,value]
        //    }).then(function (response) {
        //        $scope.temp[table][value]=response.data;
        //    });
        //};

        //$scope.selectAll= function () {
        //    //console.log(1);
        //    $scope.products.forEach(function (product) {
        //        //console.log(product);
        //        product.confirm=true;
        //    });
        //};

        $scope.$on('$viewContentLoaded', function () {
            $scope.loadAll();
        });

        $scope.loadAll= function () {
            $scope.title="محصولات بازگشت داده شده";
            $scope.product=null;
            $scope.selectAllCheckbox=false;
            $http.post('/admin/api/unConfirmProducts',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                $scope.products=response.data.products;
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            })
        };

        $scope.findById= function ($id) {
            //$scope.products=null;
            //ConfirmProducts.get({id:$id}, function (data) {
            //    $scope.product=data;
            //    $scope.getImage(data.image,false);
            //    //$scope.title='تایید محصول'+$scope.product.name;
            //})

            $state.go('dashboard.product',{
                obj:$scope.products.filter(function (item) {
                    return item.id==$id;
                })[0].id
            })
        };

        //$scope.getImage= function (imageName,field) {
        //    $http.post("/admin/api/getFiles",{
        //        'name':imageName,
        //        'attributeLabel': field.name
        //    }).then( function (response) {
        //        if(typeof response.data =='string'){
        //
        //        }else
        //        if(field==false){
        //            //rashti trick if len of dir larger than other means attribute image
        //            $scope.product.Images=response.data.filter(function (file) {
        //                return file.filename=='sm' && file.dirname.length<=response.data[0].dirname.length+1;
        //            });
        //            $scope.product.Images.forEach(function (file) {
        //                file.dirname= file.dirname.replace('../public/','/');
        //            });
        //        }
        //        else{
        //            field.images=response.data.filter(function (file) {
        //                return file.filename=='sm' && file.dirname.indexOf(field.name);
        //            });
        //            field.images.forEach(function (file) {
        //                file.dirname= file.dirname.replace('../public/','/');
        //            });
        //        }
        //
        //    }, function (response) {
        //        console.log(response.status);
        //    });
        //};
        //
        //$scope.confirm= function () {
        //    console.log(1);
        //    $http.post('/admin/api/confirmProducts/unConfirmSelected',{
        //        selected:[$scope.product.id]
        //    }).then(function (response) {
        //        console.log(response.data);
        //        $scope.loadAll();
        //    }, function (response) {
        //        console.warn(response);
        //    });
        //}
    }]);

/**
 * Created by alireza on 12/28/16.
 */
angular.module('adminPanel').controller('userManagementController', ["AclService", "$scope", "$resource", "ngNotify", "$http", function (AclService,$scope,$resource,ngNotify,$http) {
    $scope.text3=$scope.text1+$scope.text2;
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    //$scope.showEntries=10;
    $scope.title="";
    $scope.users=null;//list of all user
    $scope.page=null;

    $scope.theads=[
        {
            field:'id',
            displayName:'شماره کاربر',
            filterable:true,
            template:'<span >{{item.id|persian}}</span>',
            sortable:true,
            width:120,
            sorting:'DESC'
        },
        {
            field:'lName',
            displayName:'نام',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.id})\" >" +
            "   {{item.fName}}  {{item.lName}}" +
                //"   <span ng-if=\"item.lName\">" +
                //"       {{item.lName}}" +
                //"   </span>" +
            "</a>",
            sortable:true,
            width:120
        },
        {
            field:'email',
            displayName:'ایمیل',
            filterable:true,
            editable:true,
            template:"" +
            "<a href='' ng-click=\"findById({$id:item.id})\" >" +
            "   {{item.email}}" +
                //"   <span ng-if=\"item.lName\">" +
                //"       {{item.lName}}" +
                //"   </span>" +
            "</a>",
            sortable:true,
            width:120
        },
        {
            field:'role',
            displayName:'نقش',
            template:"" +
            "   <ul class='list-unstyled list-inline'>" +
            "       <li ng-repeat='role in item.roles'>{{role.display_name}}</li>" +
            "   </ul>   "
        }
    ];
    $scope.changeEntries= function (count) {
        $scope.showEntries=count;
        $scope.loadAll();
    };
    $scope.showEntries='50';
    $scope.entries=[10,25,50,100];

    var User=$resource('/admin/api/user/:id');

    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $scope.title="کاربران";
        $scope.user=null;
        $scope.roles=null;
        //$scope.showEntries='50';
        $scope.page=null;
        $http.post('/admin/api/user/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            categoryIds:$scope.categoryIdForSearch,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.users=response.data.users;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.findById= function ($id) {
        User.get({id:$id}, function (data) {
            $scope.user=data;
            $scope.user.password=null;
            $scope.page={};
            $http.get('/admin/api/roles',{cache:true}).then(function (response) {
                $scope.roles=response.data;
                $scope.user.roles.forEach(function (item) {
                    $scope.roles.filter(function (role) {
                        return role.id==item.id;
                    })[0].state=true;
                });
                console.log($scope.roles);
            })
        })
    };

    //$scope.createNew= function () {
    //    $scope.user={};
    //    $scope.page={};
    //};

    $scope.save= function () {
        //localStorage.removeItem('AppAcl');
        ////AclService.flushRoles();
        //var userRole=JSON.parse(localStorage.getItem('user')).roles;
        //console.log(userRole);
        //if(!AclService.resume()){
        //    $http.get('/admin/api/getAllWithPermission').then(function (response) {
        //        console.log(response.data);
        //        var acl={};
        //        for(var i=0;i<response.data.length;i++){
        //
        //            acl[response.data[i].name]= response.data[i].permissions.map(function (item) {
        //                return item.name;
        //            });
        //        }
        //
        //        for(var i=0;i<userRole.length;i++){
        //
        //            AclService.attachRole(userRole[i].name);
        //        }
        //        //console.log(localStorage.getItem('user'));
        //        AclService.setAbilities(acl);
        //        console.log(acl);
        //        //console.log(JSON.parse(localStorage.user).id);
        //    });
        //}

        var roles= $scope.roles.filter(function (item) {
            return item.state==true;
        }).map(function (item) {
            return item.id;
        });
        //console.log(roles);
        //return roles;
        User.save({
            roles:roles,
            userId:$scope.user.id
        }, function (data) {
            ngNotify.set("با موفقیت ذخیره شد" );
            $scope.loadAll();
        }, function (response) {
            console.warn(response);
        })
    }

}]);
/**
 * Created by M.Rastgou on 10/7/2017.
 */
angular.module('iframe',[]).directive('iframeSetDimensionsOnload', [function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('load', function(){
                /* Set the dimensions here,
                 I think that you were trying to do something like this: */
                console.log(element[0]);
                var iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
                var iFrameWidth = '100%';
                element.css('width', iFrameWidth);
                element.css('height', iFrameHeight);
            })
        }
    }}]);

/**
 * Created by alireza on 4/26/17.
 */
angular.module('interactDirective',[]).directive('interact', function () {
    return {
        restrict:'EA',
        scope:{
            image   :'=',
            x       :'=x',
            y       :'=y',
            zoom    :'=zoom'
        },
        //template:'' +
        //'<div id="drag-1" class="draggable">' +
        //'   <img ng-src="{{image}}" alt="" height="auto" width="400px" >' +
        //'   ' +
        //'</div>',
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl
        },
        link: function (scope) {
            console.log(scope);
            //scope.product=attr.product;
            scope.$watch('x', function () {
                changePosition(scope.x,scope.y);
            },true);
            scope.$watch('y', function () {
                changePosition(scope.x,scope.y);
            },true);
            // target elements with the "draggable" class

            interact('.draggable')
                .draggable({
                    // enable inertial throwing
                    inertia: true,
                    //snap: {
                    //    targets: [
                    //        interact.createSnapGrid({ x: 1, y: 1 })
                    //    ],
                    //    //range: Infinity,
                    //    relativePoints: [ { x: 0, y: 0 } ]
                    //},
                    autoScroll: true,

                    // call this function on every dragmove event
                    onmove: dragMoveListener,
                    // call this function on every dragend event
                    onend: function (event) {
                        var textEl = event.target.querySelector('p');

                        textEl && (textEl.textContent =
                            'moved a distance of '
                            + (Math.sqrt(event.dx * event.dx +
                                event.dy * event.dy)|0) + 'px');
                    }
                });

            function changePosition(x,y){
                // if(product){
                //     console.log(scope.product);
                //     angular.element("#drag-"+scope.product.id).attr('data-x',x);
                //     angular.element("#drag-"+scope.product.id).attr('data-y',y);
                //     el=angular.element("#drag-"+scope.product.id)[0];
                //     //el.css(' -webkit-transform','translate(' + x + 'px, ' + y + 'px)');
                //     //el.css(' transform','translate(' + x + 'px, ' + y + 'px)');
                //     el.style.webkitTransform =
                //         el.style.transform =
                //             'translate(' + x + 'px, ' + y + 'px)';
                //     console.log(scope.product);
                //     //scope.x=x;
                //     //scope.y=y;
                //     //scope.product.x=x;
                //     //scope.product.y=y;
                //     //if(!scope.$$phase) {
                //     //    scope.$apply(function(){
                //     //        scope.x=x;
                //     //        scope.y=y;
                //     //        scope.product.x=x;
                //     //        scope.product.y=y;
                //     //    })
                //     //}
                // }else if(image){
                    angular.element(".draggable").attr('data-x',x);
                angular.element(".draggable").attr('data-y',y);

                // console.log(angular.element(".draggable"));

                var el=angular.element(".draggable")[0];
                //el.css(' -webkit-transform','translate(' + x + 'px, ' + y + 'px)');
                    //el.css(' transform','translate(' + x + 'px, ' + y + 'px)');
                    el.style.webkitTransform =
                        el.style.transform =
                            'translate(' + x + 'px, ' + y + 'px)';
                    if(!scope.$$phase) {
                        scope.$apply(function(){
                            scope.x=x;
                            scope.y=y;
                        })
                    }
                // }

            }
            function dragMoveListener (event) {

                //console.log(event.target);
                var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                //console.log(x,y);
                // translate the element
                target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                //scope.x=x;
                //scope.y=y;
                if(!scope.$$phase) {
                    scope.$apply(function(){
                        scope.x=x;
                        scope.y=y;

                        // scope.product.x=x;
                        // scope.product.y=y;
                    })
                }
            }

            // this is used later in the resizing and gesture demos
            window.dragMoveListener = dragMoveListener;
            window.changePosition=changePosition;
        }
    }
});


angular.module('packDirective',[]).directive('draggablePack', ["$document", function ($document) {
    return {
        restrict:'EA',
        scope:{
            product   :'=product',
        },
        link: function (scope, elm, attrs) {
            var startX, startY, initialMouseX, initialMouseY;
            console.log(scope.product);

            elm.css({
                position: 'absolute',background:'blue',
                width: '50px',
                height: '50px',
                '-webkit-border-radius':'50px' ,
                '-moz-border-radius': '50px',
                'border-radius': '50px',
                top:  scope.product.y,
                left:scope.product.x,
                'text-align': 'center'
            });
            //console.log(scope.product);
            elm.bind('mousedown', function($event) {
                startX = elm.prop('offsetLeft');
                startY = elm.prop('offsetTop');
                initialMouseX = $event.clientX;
                initialMouseY = $event.clientY;
                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
                return false;
            });

            function mousemove($event) {
                var dx = $event.clientX - initialMouseX;
                var dy = $event.clientY - initialMouseY;
                elm.css({
                    top:  startY + dy + 'px',
                    left: startX + dx + 'px'
                });
                //console.log(scope.product);
                scope.product.y=startY + dy;
                scope.product.x=startX + dx;
                scope.$apply();
                return false;
            }
            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    }
}]);
/**
 * Created by alireza on 4/23/17.
 */
angular.module('adminPanel').filter('getItemOfTableById', ["$http", function ($http) {
    return function (field) {
        //console.log(field);
        //return field.value;
        $http.post('/admin/api/getItemOfTableById',{
            item:[field.table,field.value]
        }).then(function (response) {
            field.value= response.data;
            //return response.data;
        });
        return field;
    }
}]);

/**
 * Created by alireza on 4/23/17.
 */
angular.module('adminPanel').filter('getValueOfAttribute', function () {
    return function (fields, attributeId) {
        //console.log(fields,attributeId);
        return fields.filter(function (value) {
            //console.log(value);
            return value.id==attributeId;
        });
    }
});

/**
 * Created by alireza on 8/30/17.
 */
angular.module('adminPanel').filter('range', function() {
    return function(input, max) {
        var counts=[
            {
                id:1,
                name:'۱'
            },
            {
                id:2,
                name:'۲'
            },
            {
                id:3,
                name:'۳'
            },
            {
                id:4,
                name:'۴'
            },
            {
                id:5,
                name:'۵'
            },{
                id:6,
                name:'۶'
            },
            {
                id:7,
                name:'۷'
            },
            {
                id:8,
                name:'۸'
            },{
                id:9,
                name:'۹'
            },{
                id:10,
                name:'۱۰'
            }
        ];
        max = parseInt(max);
        //console.log(counts.splice(max, 10));
        //console.log(max);
        return counts.splice(max, 10);
    };
});
/**
 * Created by M.Rastgou on 3/28/2018.
 */
angular.module('adminPanel').service('convertToTree', function() {
    this.convert = function (categoryList,id,parentId) {
        var map = {}, node, roots = [];
        for (var i = 0; i < categoryList.length; i += 1) {
            node = categoryList[i];
            node.children = [];
            map[node[id]] = i; // use map to look-up the parents
            if (node[parentId] !== null) {
                categoryList[map[node[parentId]]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots
    }
});
/**
 * Created by alireza on 7/9/17.
 */
angular.module('adminPanel').service('getAllOrders', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/orders/allOrdersCount',{
                ignoreLoadingBar: true
            })
            .then(function (response) {
                $rootScope.tabs[0].count=response.data;
                //console.log($rootScope.tabs);
        });
    }
}]);

angular.module('adminPanel').service('getOperatorOrderCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/orders/getOperatorOrderCount')
            .then(function (response) {
                $rootScope.tabs[1].count=response.data;
                //console.log($rootScope.tabs);
            });
    }
}]);

angular.module('adminPanel').service('getPackingOrdersCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/packingOrders/getPackingOrdersCount')
            .then(function (response) {
                $rootScope.tabs[2].count=response.data;
                //console.log($rootScope.tabs);
            });
    }
}]);

angular.module('adminPanel').service('getReadyOrderForSendCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/readyOrderForSend/getReadyOrderForSendCount')
            .then(function (response) {
                $rootScope.tabs[3].count=response.data;
                //console.log($rootScope.tabs);
            });
    }
}]);

angular.module('adminPanel').service('getSendOrdersCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/sendOrders/getSendOrdersCount')
            .then(function (response) {
                $rootScope.tabs[4].count=response.data;
                //console.log($rootScope.tabs);
            });
    }
}]);

angular.module('adminPanel').service('getOrdersPollCount', ["$rootScope", "$http", function ($rootScope,$http) {
    this.count= function () {
        $http.get('/admin/api/ordersPoll/getOrdersPollCount')
            .then(function (response) {
                $rootScope.tabs[5].count=response.data;
                //console.log($rootScope.tabs);
            });
    }
}]);
/**
 * Created by alireza on 7/9/17.
 */


/**
 * Created by alireza_pc on 1/10/2018.
 */
angular.module('adminPanel').service("Image",function () {
    this.getImage=function (path,field) {
        var d=new Date();
        var xhr=new XMLHttpRequest();
        xhr.open('GET',path+ d.getDate(),true);
        xhr.responseType='blob';
        xhr.onload= function (event) {
            //console.log(event);
            var fileReader=new FileReader();
            fileReader.readAsDataURL(event.target.response);
            fileReader.onloadend= function () {
                if(field){
                    field.fileSrc.push(fileReader.result);
                }
                //else
                //    $scope.fileSrc.push(fileReader.result);
                //console.log($scope.fileSrc);
                if(field){
                    field.files.push(new File([event.target.response], "filename", {type: "image/png"}));
                }
            };
        };
        xhr.send();
    }

})
/**
 * Created by alireza on 7/8/17.
 */
angular.module('adminPanel').controller('allOrdersController', ["$q", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "getOperatorOrderCount", "getAllOrders", "$uibModal", "$window", function ($q,$state,$timeout,$http,$scope,ngNotify,AclService,getOperatorOrderCount,getAllOrders,$uibModal,$window) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'orders.id',
            displayName:'ردیف',
            template:'<span>{{item.id}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'name_copy',
            displayName:'خریدار',
            template:'<span>{{item.name_copy}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'email',
            displayName:'ایمیل',
            template:'<span>{{item.email}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'weight',
            displayName:'وزن',
            template:'<span>{{item.weight|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'sendType',
            displayName:'نوع ارسال',
            template:'' +
            '<span ng-switch="item.sendType">' +
            '   <span ng-switch-when="0">' +
            '       پیشتاز' +
            '   </span>' +
            '   <span ng-switch-when="1">' +
                //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
            '       پیک' +
            '   </span>' +
            '</span>' ,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> پیک</option>" +
            "   <option value='0'>پیشتاز</option>" +
            "   </select>" +
            "</div>",
            width:100
        },
        {
            field:'payType',
            displayName:'نوع پرداخت',
            template:'' +
            '<span ng-switch="item.payType">' +
            '   <span ng-switch-when="0">' +
            '       در محل' +
            '   </span>' +
            '   <span ng-switch-when="1">' +
                //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
            '       درگاه' +
            '   </span>' +
            '</span>' ,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> درگاه</option>" +
            "   <option value='0'>در محل</option>" +
            "   </select>" +
            "</div>",
            width:100
        },
        {
            field:'orders.oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'h:mm a jYYYY/jMM/jDD '|persian}} </span>" +
            "<span ng-if='item.oDate==null'>" +
            "{{item.uDate|jalaliDate : 'h:mm a jYYYY/jMM/jDD '|persian}}" +
            "</span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'state_copy',
            displayName:'استان',
            template:'<span>{{item.state_copy}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'address_copy',
            displayName:'آدرس',
            template:'<span>{{item.address_copy|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'orders.status',
            displayName:'وضعیت',
            template:'<span>{{item.name}}-{{item.status}}</span>',
            sortable:true,
            filterable:true,
            width:100,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\" " +
            "       ng-options='orderLevel.id as orderLevel.name for orderLevel in orderLevels'>" +
            "   </select>" +
            "</div>"
        },
        {
            field:'operation',
            displayName:'',
            template:'' +
            //'   <a   style="color: #f7b424;" href="" ng-click="can(\'send_to_operator\') &&  " class="pull-left product-icon" ><i class="fa fa-user-plus"></i></a>' +//
            '   <a style="color:#7cbf44" href="" ng-click="openOrder({id:item.id,order:item})" class="pull-left product-icon" ><i class="fa fa-search"></i></a>' +
            '   <a style="color: #f7b424;" href="" ng-click="can(\'send_to_operator\') && assignOrder({id:item.id,status:item.status}) " class="pull-left product-icon" ><i class="fa fa-user-plus"></i></a>' +//
            '',
            width:100
        }
    ];



    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.lastOrderId=0;
    $scope.notifications=[2];
    //$scope.title="پنل سفارشات";
    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        }
    ];
    //var Role=$resource('/admin/api/permission/:id');
    //
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll(true);
        //cfpLoadingBarProvider.includeBar=false;
    });
    $scope.loadAll= function (reload) {
        // console.log(reload);

        var cancel = $q.defer();
        var request = {
            method: "post",
            url: '/admin/api/orders/index',
            data: {
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined && thead.filter!="";
                }),
                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0],
                lastOrderId:$scope.lastOrderId,
                reload:reload,
                detailSearch:$scope.detailSearch.filter(function (search) {
                    return search.value!=undefined && search.value!="";
                })
            },
            timeout: cancel.promise, // cancel promise, standard thing in $http request
            cancel: cancel, // this is where we do our magic,
            ignoreLoadingBar: true
        };

        $http(request).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;

            $scope.orderLevels=response.data.orderLevels;
            $scope.orderLevels.unshift(
                {
                    id:"",
                    name:""
                },
                {
                    id:1001,
                    name:"سفارش تایید نشده"
                },
                {
                    id:1000,
                    name:"همه سفارشات"
                }
            );
            console.log(reload);
            if(reload){
                Notification.requestPermission(function (permission) {
                    var notification=new Notification("سفارش جدید");
                    setTimeout(function () {
                        notification.close();
                    },10000);
                });


                if($state.is('dashboard.orders.allOrders')){
                    console.log($scope.notifications);
                    $scope.lastOrderId=response.data.lastOrderId;
                    $timeout(function(){
                        var reload=true;
                        $scope.loadAll(reload);
                        getAllOrders.count();
                        getOperatorOrderCount.count();

                    },5000);
                }
            }


        }, function (response) {
            if($state.is('dashboard.orders.allOrders')){
                console.warn(response);
                var reload=true;
                $scope.loadAll(reload);
            }
        });
    };


    $scope.openOrder= function (id,order) {
        if([1,2,23,22].indexOf(order.status)<0){
            var orderInformation=$uibModal.open({
                animation:true,
                controller:'orderInformationController',
                templateUrl:'/views/orders/orderInformation.html',
                windowClass: 'modal-window-xlg',
                resolve:{
                    'orderId': function () {
                        return id;
                    },
                    'order': function () {
                        return order;
                    }
                }
            });
            orderInformation.result.then(function (response) {
                var printInstance=$uibModal.open({
                    animation:true,
                    controller:'printOrderController',
                    templateUrl:'/views/orders/printOrder.html',
                    windowClass: 'modal-print-a5',
                    resolve:{
                        'products': function () {
                            return response.products;
                        },
                        'productCount': function () {
                            return response.productCount;
                        },
                        'totalPayment': function () {
                            return response.totalPayment;
                        },
                        'discountValue': function () {
                            return response.discountValue;
                        },
                        'period': function () {
                            return response.period;
                        },
                        'order': function () {
                            return order
                        },
                        'client':function () {
                            return response.client;
                        },
                        'aPriceT':function () {
                            return response.aPriceT;
                        },
                        'tPriceT':function () {
                            return response.tPriceT;
                        },
                        'tdiscountT':function () {
                            return response.tdiscountT;
                        },
                        'fPrice':function () {
                            return response.fPrice;
                        },
                        'stocks':function () {
                            return response.stocks;
                        }
                    }
                });
                printInstance.result.then(function () {
                    $scope.printPostCover(order,response);
                },function () {
                    $scope.printPostCover(order,response);
                })
            },function () {

            })
        }
        else{

            var modalInstance=$uibModal.open({
                animation:true,
                controller:'checkOrderController',
                templateUrl:'/views/orders/checkOrder.html',
                windowClass: 'modal-window-xlg',
                resolve:{
                    'orderId': function () {
                        return id;
                    },
                    'order': function () {
                        return order
                    }
                }
            });
            modalInstance.result.then(function (response) {
                $scope.collectingPaper(response,order);


            },function (reason) {
                $scope.collectingPaper(response,order);
            });
        }

    };

    $scope.printPostCover=function (order,response) {
        if(order.sendType===0){
            var printInstance=$uibModal.open({
                animation:true,
                controller:'printPostCoverController',
                templateUrl:'/views/orders/printPostCover.html',
                windowClass: 'modal-print-a5',
                resolve:{
                    'order': function () {
                        return order
                    },
                    'client':function () {
                        return response.client;
                    }
                }
            });

            printInstance.result.then(function (value) {

                $scope.printTransaction(order);
            },function (reason) {
                $scope.printTransaction(order);
            })
        }else{
            $scope.printTransaction(order);
        }
    }

    $scope.printTransaction=function (order) {
        if(order.payType===1){

            $http.post('/admin/api/orders/getTransaction',{
                orderId:order.id
            }).then(function (response) {
                $uibModal.open({
                    animation:true,
                    controller:'printTransactionController',
                    templateUrl:'/views/orders/printTransaction.html',
                    windowClass: 'modal-print-a5',
                    resolve:{
                        'gateway_transaction': function () {
                            return response.data;
                        },
                        'order':function () {
                            return order;
                        }
                    }
                });
            })

        }
    }

    $scope.checkOrder=function (id) {

    };

    $scope.collectingPaper=function (response,order) {
        $uibModal.open({
            animation:true,
            controller:'showCollectingPaperDialog',
            template:'' +
            '<button ng-click="print()" class="btn btn-primary"> پرینت فاکتور جمع آوری</button>',
            windowClass: 'modal-print-a5',
            resolve:{
                'products': function () {
                    return response.products;
                },
                'productCount': function () {
                    return response.productCount;
                },
                'totalPayment': function () {
                    return response.totalPayment;
                },
                'discountValue': function () {
                    return response.discountValue;
                },
                'period': function () {
                    return response.period;
                },
                'order': function () {
                    return order
                },
                'client':function () {
                    return response.client;
                },
                'aPriceT':function () {
                    return response.aPriceT;
                },
                'tPriceT':function () {
                    return response.tPriceT;
                },
                'tdiscountT':function () {
                    return response.tdiscountT;
                },
                'fPrice':function () {
                    return response.fPrice;
                },
                'stocks':function () {
                    return response.stocks;
                }
            }
        });
    }

    $scope.assignOrder= function (id,status) {
        console.log(status);
        var modalInstance = $uibModal.open({
            animation:true,
            controller:'assignOrderController',
            templateUrl:'/views/orders/assignOrder.html',
            resolve:{
                'orderId': function () {
                    return id;
                },
                'status': function () {
                    return status;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.loadAll();
        }, function (response) {

        });
    }


}]);

angular.module('adminPanel').controller('printTransactionController', ["$scope", "$uibModal", "gateway_transaction", "order", "$uibModalInstance", "$window", function ($scope,$uibModal,gateway_transaction,order,$uibModalInstance,$window) {
    $scope.transactions=gateway_transaction;
    $scope.order=order;
    $scope.printA5=function () {
        var usercss = '@page { size: landscape A5 }';

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = usercss;
        document.body.appendChild(css);
        window.print();
    };
}]);

angular.module('adminPanel').controller('printPostCoverController', ["$scope", "$uibModal", "order", "$uibModalInstance", "$window", "client", function ($scope,$uibModal,order,$uibModalInstance,$window,client) {
    $scope.order=order;
    $scope.client=client;
    $scope.print=function () {
        var usercss = '@page { size: landscape A5 }';

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = usercss;
        document.body.appendChild(css);
        window.print();
    };
}]);

angular.module('adminPanel').controller('showCollectingPaperDialog', ["fPrice", "tdiscountT", "tPriceT", "aPriceT", "client", "$state", "period", "discountValue", "totalPayment", "$http", "$scope", "ngNotify", "products", "$uibModal", "order", "productCount", "$uibModalInstance", "$window", "stocks", function (fPrice,tdiscountT,tPriceT,aPriceT,client,$state,period,discountValue,totalPayment,$http,$scope,ngNotify,products,$uibModal,order,productCount,$uibModalInstance,$window,stocks) {
    $scope.print=function () {
        var query={
            'order':order,
            'products':products,
            'productCount':productCount,
            'discountValue':discountValue,
            'totalPayment':totalPayment,
            'period':period,
            'fPrice':fPrice,
            'tdiscountT':tdiscountT,
            'tPriceT':tPriceT,
            'aPriceT':aPriceT,
            'client':client,
            'stocks':stocks
        };
        console.log(1);
        $scope.query=encodeURIComponent( JSON.stringify( query));
        $window.open('/admin/data2#/printCollectingPaper.js?q='+$scope.query, '_blank');
    };
}]);
angular.module('adminPanel').controller('printOrderController', ["fPrice", "tdiscountT", "tPriceT", "aPriceT", "client", "$state", "period", "discountValue", "totalPayment", "$http", "$scope", "ngNotify", "products", "$uibModal", "order", "productCount", "$uibModalInstance", "$window", "stocks", function (fPrice,tdiscountT,tPriceT,aPriceT,client,$state,period,discountValue,totalPayment,$http,$scope,ngNotify,products,$uibModal,order,productCount,$uibModalInstance,$window,stocks) {
    $scope.print=function () {
       if ($scope.products.length>3){
           $scope.printA4();
       }else{
           $scope.printA5();
       }
       // $uibModalInstance.close();
    };
    $scope.printA5=function () {
        var usercss = '@page { size: landscape A5 }';

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = usercss;
        document.body.appendChild(css);
        window.print();
    };
   $scope.printA4=function () {

       var query={
           'order':$scope.$order,
           'products':$scope.products,
           'productCount':$scope.productCount,
           'discountValue':$scope.discountValue,
           'totalPayment':$scope.totalPayment,
           'period':$scope.period,
           'fPrice':$scope.fPrice,
           'tdiscountT':$scope.tdiscountT,
           'tPriceT':$scope.tPriceT,
           'aPriceT':$scope.aPriceT,
           'client':$scope.client
       };

       $scope.query=encodeURIComponent( JSON.stringify( query));
       $window.open('/admin/data2#/printA4Order.js?q='+$scope.query, '_blank');

       // var usercss = '@page { size : portrait A4 }';
       //
       // var css = document.createElement("style");
       // css.type = "text/css";
       // css.innerHTML = usercss;
       // var originalContents = document.body.innerHTML;
       // // var printReport= ;
       // document.body.innerHTML = document.getElementById("print-content").parentElement.innerHTML;
       // document.body.appendChild(css);
       // window.print();
       //     document.body.innerHTML = originalContents;
   };
   //console.log(stocks);
   $scope.$order=order;

   $scope.discountValue=discountValue;
   $scope.totalPayment=totalPayment;
   $scope.client=client;
   $scope.period=period;
   $scope.stocks=stocks;
    $scope.productCount=0;
    $scope.aPriceT=0;
    $scope.tPriceT=0;
    $scope.tdiscountT=0;
    $scope.products=products.filter(function (product) {
        product.number=0;

        $scope.stocks.forEach(function (item) {
            // console.log(item.abbr+"_collected");
            product.number+=product["stock_"+ item.abbr+"_collected"];
        });

        if(product.number>0){

            product.selectedStockCount=0;
            $scope.productCount+=product.number;
            $scope.aPriceT+=product.Aprice;
            $scope.tdiscountT+=product.Adiscount*product.number;
            $scope.tPriceT+=(product.Aprice*product.number);
        }
        return product.number>0;
    });
    $scope.fPrice=$scope.tPriceT-$scope.tdiscountT;

    $scope.printRaw=function () {

        var url= $state.href('printInvoice',{
            'order':$scope.$order,
            'products':$scope.products,
            'productCount':$scope.productCount,
            'discountValue':$scope.discountValue,
            'totalPayment':$scope.totalPayment,
            'period':$scope.period
        });

        window.open(url,'_blank');
    };

}]);




angular.module('adminPanel').controller('checkOrderController', ["$window", "AclService", "$filter", "ngNotify", "$uibModalInstance", "$http", "$scope", "orderId", "$uibModal", "order", function ($window,AclService,$filter,ngNotify,$uibModalInstance,$http, $scope, orderId,$uibModal,order) {
    $scope.order=order;
    $scope.sorting="";
    $scope.temp=[];
    $scope.counts=[
        {
            id:0,
            name:'۰'

        },
        {
            id:1,
            name:'۱'
        },
        {
            id:2,
            name:'۲'
        },
        {
            id:3,
            name:'۳'
        },
        {
            id:4,
            name:'۴'
        },
        {
            id:5,
            name:'۵'
        },{
            id:6,
            name:'۶'
        },
        {
            id:7,
            name:'۷'
        },
        {
            id:8,
            name:'۸'
        },{
            id:9,
            name:'۹'
        },{
            id:10,
            name:'۱۰'
        }
    ];
    $scope.sendTypes=[
        {
            id:0,
            name:'پیشتاز'
        },
        {
            id:1,
            name:'پیک'
        }
    ];
    $scope.getHistory= function () {
        $http.post('/admin/api/orders/getHistory',{
            orderId:$scope.order.id
        }).then(function (response) {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'userOrderHistoryController',
                templateUrl:'/views/orders/userOrderHistory.html',
                resolve:{
                    'history': function () {
                        return response.data;
                    }
                }
            });
        });
    };

    $scope.getItemOfTableById= function (value,table) {
        if($scope.temp[table]==undefined){//if table not set set it and child
            $scope.temp[table]={};
        }
        $http.post('/admin/api/getItemOfTableById',{
            item:[table,value]
        }).then(function (response) {
            $scope.temp[table][value]=response.data;
            // console.log($scope.temp);
        });
    };

    $scope.products=[];


    $scope.orderByStock=function (name) {
        console.log(name);

        $scope.sorting=name;
    };


    $scope.orderByStock("stock_20");

    $scope.hoverIn=function (product) {
        product.showImage=true;
    };
    $scope.hoverOut=function (product) {
        product.showImage=false;
    };

    $scope.loadAll= function (id) {

        $scope.selectAll=false;
        $http.post('/admin/api/orders/checkOrderById',{
            orderId:id?id:orderId,
            payType:order.payType,
            sendType:order.sendType,
            user_id:order.user_id
        }).then(function (response) {
            $scope.client=response.data.client;
            $scope.products=response.data.products;
            $scope.stocks=response.data.stocks;
            $scope.counts=$scope.counts.slice(0, $scope.products.count);
            $scope.productCount=0;
            $scope.aPriceT=0;
            $scope.tPriceT=0;
            $scope.tdiscountT=0;
            $scope.products.forEach(function (product) {
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=product['order_products_stock_'+stock.abbr];
                });

                product.selectedStockCount=0;
                $scope.selectStock(product);


                //number of product can't be zero

                if(product.count>$scope.counts.length-1){
                    for (var i=$scope.counts.length; i<=product.count; i++)
                        $scope.counts.push({
                            id:i,
                            name:$filter('persian')(i)
                        });
                }
                if(product.approved_count===null){
                    product.number=product.count;
                }else{
                    product.number=product.approved_count;
                }

                $scope.productCount+=product.number;
                $scope.aPriceT+=product.Aprice;
                $scope.tdiscountT+=product.disc_quantity_required>0? product.Adiscount:product.Adiscount*product.number;
                $scope.tPriceT+=(product.Aprice*product.number);

            });
            $scope.fPrice=$scope.tPriceT-$scope.tdiscountT;

            /////////////////////    send date
            $scope.send_periods=response.data.send_periods;
            //$scope.order_sends=response.data.order_sends;
            $scope.selectedPeriod=null;
            if(response.data.order_sends){
                $scope.selectedPeriod={
                    periodId:response.data.order_sends.period_id,
                    send_date:response.data.order_sends.send_date
                };
            }

            $scope.normalDay=$scope.send_periods.filter(function (period) {
                return period.type=="normal";
            });
            $scope.holiday=$scope.send_periods.filter(function (period) {
                return period.type=="holiday";
            });
            $scope.deliverySchedule=[];
            for(var i=0 ; i<4;i++){
                var schedule={
                    id:i,
                    day:moment().add(i, 'days').format('dddd'),
                    date:moment().add(i, 'days').format('jMM/jDD'),
                    send_date:moment().add(i, 'days').format('YYYY-MM-DD')
                };
                $scope.deliverySchedule.push(schedule);

            }
            ///////////////////////////////end send date

            ////////////////////////////    rejected Reason
            if( response.data.order_status!=null &&response.data.order_status.status==1){
                $scope.description=response.data.order_status.message;
                $scope.rejectOrder=response.data.order_status.order_level_id;
            }
            ///////////////////////////end rejected reason
            ///////////////////////////new aggregation
            $scope.similarOrder=response.data.similarOrder;
            ///////////////////////////end new aggregation
            ///////////////////////////end rejected reason

            ///////////////////////////order aggregation
            {
            $scope.similarOrder=response.data.similarOrder;
            $scope.similarProduct=response.data.similarOrder;
            //    .map(function (order) {
            //    return order.products;
            //});
            // console.log($scope.similarProduct);
            $scope.aggregate={
                productCount:0,
                aPriceT:0,
                tdiscountT:0,
                tPriceT:0,
                fPrice:0
            };
            $scope.similarProduct.forEach(function (product) {
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=product['order_products_stock_'+stock.abbr];
                });

                product.selectedStockCount=0;
                $scope.selectStock(product);
                product.number=product.approved_count;
                $scope.aggregate.productCount+=product.number;
                $scope.aggregate.aPriceT+=product.Aprice;
                $scope.aggregate.tdiscountT+=product.Adiscount*product.number;
                $scope.aggregate.tPriceT+=(product.Aprice*product.number);

            });
            $scope.aggregate.fPrice=$scope.aggregate.tPriceT-$scope.aggregate.tdiscountT;
            // console.log($scope.similarProduct);
            // console.log($scope.aggregate);
            }
            ///////////////////////////end order aggregation
            ///////////////////////////order log
            $scope.orderLogs=response.data.orderLog;
            ///////////////////////////end order log

            // $scope.order.boxNumber=0;
        })
    };

    $scope.selectPeriod= function (period_id,date) {
        $scope.selectedPeriod={};
        $scope.selectedPeriod.periodId=period_id;
        $scope.selectedPeriod.send_date=date;
    };

    $scope.changeProductNum= function (productId) {
        $scope.productCount=0;
        $scope.aPriceT=0;
        $scope.tPriceT=0;
        $scope.tdiscountT=0;
        $scope.products.forEach(function (product) {

            if(product.id==productId){
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=0;
                });
            }
            product.selectedStockCount=0;
            $scope.productCount+=product.number;
            $scope.aPriceT+=product.Aprice;
            $scope.tdiscountT+=product.Adiscount*product.number;
            $scope.tPriceT+=(product.Aprice*product.number);
            $scope.selectStock(product);
        });
        $scope.fPrice=$scope.tPriceT-$scope.tdiscountT;
    };

    $scope.changeProductNumForAggregate= function (productId) {
        $scope.aggregate.productCount=0;
        $scope.aggregate.aPriceT=0;
        $scope.aggregate.tPriceT=0;
        $scope.aggregate.tdiscountT=0;
        $scope.similarProduct.forEach(function (product) {

            if(product.id==productId){
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=0;
                });
            }
            product.selectedStockCount=0;
            $scope.aggregate.productCount+=product.number;
            $scope.aggregate.aPriceT+=product.Aprice;
            $scope.aggregate.tdiscountT+=product.Adiscount*product.number;
            $scope.aggregate.tPriceT+=(product.Aprice*product.number);
            $scope.selectStock(product);
        });
        $scope.aggregate.fPrice=$scope.aggregate.tPriceT-$scope.aggregate.tdiscountT;
    }

    $scope.selectStock= function (product, abbr)
    {
        product.selectedStockCount=0;
        // console.log(product);

        for( var el in product.selectedStock ) {
            product.selectedStockCount+=product.selectedStock[el];

        }
    };

    $scope.decrease=function (product,increaseDecreaseOrder) {
        product.count-=increaseDecreaseOrder;

    };

    $scope.increase=function (product,increaseDecreaseOrder) {
        console.log(increaseDecreaseOrder);
        product.count+=increaseDecreaseOrder;
        if(product.count>$scope.counts.length){
            $scope.counts.push({
                id:increaseDecreaseOrder,
                name:$filter('persian')(increaseDecreaseOrder)
            });
        }

        // console.log(product);
        // console.log(product.count);
    };


    $scope.loadAll();

    $scope.confirmOrder= function () {
        // console.log($scope.products);
        // console.log($scope.selectedPeriod);
        // console.log($scope.order.id);



        $scope.products.forEach(function (product) {
            if(product.selectedStockCount<product.number){

                $scope.selectedProductError=true;
                return ;
            }
        });
        if($scope.selectedProductError){
            ngNotify.set('محصولات انتخاب شده از انبار، کمتر مقدار درخواستی است.','error');
            $scope.selectedProductError=false;
            return ;
        }
        // console.log($scope.selectedPeriod);
        if($scope.selectedPeriod==null && order.sendType==1){
            // console.log(order.sendType);
            ngNotify.set('حداقل یکی از زمان بندی های تحویل را انتخاب کنید.','error');
            return ;
        }
        if(order.sendType===0&&$scope.selectedPeriod){
            $scope.selectedPeriod.send_date=null;
        }

        // var win = window.open('','','width=200,height=100');
        $http.post('/admin/api/orders/confirmOrder',{
            orderId:$scope.order.id,
            sendType:order.sendType,
            products:$scope.products,
            period:$scope.selectedPeriod,
            basketPriceNoDiscout:$scope.tPriceT,
            basketPrice:$scope.tPriceT-$scope.tdiscountT,
            totalPayment:$scope.fPrice,
            stocks:$scope.stocks,
            orders:$scope.order,
            stuffs:$scope.products.filter(function (product) {
                    return product.number>0;
                })
                .map(function (product) {
                // if(product.number){
                    return {
                        Name:product.name||product.lName,
                        Price:(product.Aprice*10) - ((product.Adiscount*10)*product.number),
                        Weight:product.Aweight,
                        Count:product.number,
                        Description:" ",
                        // percentDiscount:(product.Adiscount*product.number*100)/(product.Aprice)
                    }
                // }
            })
        }).then(function (response) {
            // win.location = '/admin/api/order/'+$scope.order.id+'/printing';
            // win.open();
            ngNotify.set('سفارش تایید شد');
            $scope.stockMessage={};//message send to each message
            $scope.products.forEach(function (product) {
                $scope.stocks.forEach(function (stock) {
                    if(product.selectedStock[stock.abbr]>0){
                        if(!$scope.stockMessage[stock.abbr]){
                            $scope.stockMessage[stock.abbr]=[];
                        }
                        $scope.stockMessage[stock.abbr].push({productId:product.id,name:product.name,lName:product.lName,barcode:product.barcode,count:product.selectedStock[stock.abbr],stockName:stock.name});
                    }
                })
            });
            // console.log($scope.stockMessage);
            $http.post('/admin/api/orders/sendMessage',{
                stockMessage:$scope.stockMessage
            },{
                ignoreLoadingBar: true
            });
            $uibModalInstance.close({
                products:$scope.products,
                productCount:$scope.productCount,
                totalPayment:$scope.fPrice,
                discountValue:$scope.tdiscountT,
                period:$scope.selectedPeriod,
                client:$scope.client,
                aPriceT:$scope.aPriceT,
                tPriceT:$scope.tPriceT,
                tdiscountT:$scope.tdiscountT,
                fPrice:$scope.fPrice,
                stocks:$scope.stocks
            });
        }, function (response) {
            
        });
    };



    $scope.selectAllOrders=function (checkbox) {
        // console.log(checkbox);
        $scope.selectAll=checkbox;
        $scope.similarOrder.filter(function (order) {
            order.selected=checkbox;
        });
    };

    $scope.aggregateOrder= function () {
        if($scope.similarOrder.filter(function (order) {
                return order.selected==true;
            }).length===0){
            ngNotify.set('حداقل یک سفارش برای تجمیع انتخاب کنید','error');
            return
        }
        $scope.similarOrder.push(
            {
                id:$scope.order.id,
                selected:true
            }
        );
        var orders=$scope.similarOrder.filter(function (order) {
            return order.selected==true;
        }).map(function (order) {
            return order.id;
        });
       $http.post('/admin/api/orders/aggregateOrder',{
           orderId:$scope.order.id,
           orders:orders
       }).then(function (response) {
            $scope.order=response.data;
            $scope.loadAll(response.data.id);
       });
    };
    // cancel_order_by_operator
    $scope.can = AclService.can;
    if($scope.can("cancel_order_by_operator")){
        $scope.rejectedReasons=[
            {
                id:21,
                name:'لغو سفارش'
            },
            {
                id:22,
                name:'عدم پاسخگویی'
            },
            {
                id:23,
                name:'تماس کاربر'
            },
            {
                id:24,
                name:'لغو سفارش توسط کاربر'
            }
        ];
    }else{
        $scope.rejectedReasons=[
            {
                id:22,
                name:'عدم پاسخگویی'
            },
            {
                id:23,
                name:'تماس کاربر'
            },
            {
                id:24,
                name:'لغو سفارش توسط کاربر'
            }
        ];
    }


    /*
    * عدم پاسخگویی 22
    * تماس کاربر 23
    * لغو سفارش توسط کاربر 24
    * */
    $scope.return = function () {
        if(!$scope.rejectOrder){
            ngNotify.set('لطفا یکی از علل بازگشت را انتخاب کنید','error');
            return;
        }
        if($scope.rejectOrder==21){
            $scope.products.map(function (value) {
                return {
                    id:value.id,
                    count:value.count,
                    qty:value.qty
                }
            })
        }
        $http.post('/admin/api/orders/returnOrder',{
            orderId:$scope.order.id,
            rejectedReason:$scope.rejectOrder,
            rejectedReasonMessage:$scope.description,
            products: $scope.products
        }).then(function (response) {
            ngNotify.set('سفارش بازگشت داده شد');
            $uibModalInstance.dismiss();
        })
    };


    $scope.addProductToOrder=function (id) {

        if($scope.products.filter(function (item) {
                return item.detail!="OPERATOR_ADDED" && item.id==id;
            }).length>0){
            ngNotify.set('محصول تکراری است');
            return ;
        }

        $http.post('/admin/api/orders/addProductToOrder',{
            orderId:$scope.order.id,
            productId:id
        }).then(function (response) {
            // $scope.order=response.data;
            $scope.loadAll($scope.order.id);
        });
    };


}]);

angular.module('adminPanel').controller('userOrderHistoryController', ["ngNotify", "$uibModalInstance", "$http", "$scope", "history", function (ngNotify,$uibModalInstance,$http, $scope, history) {
    $scope.history=history;
}]);
/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('collectingController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "getOperatorOrderCount", "getAllOrders", "$uibModal", "getPackingOrdersCount", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,getOperatorOrderCount,getAllOrders,$uibModal,getPackingOrdersCount) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : ' hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        {
            field:'orders.status',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="collectOrder({order:item})" class="btn btn-primary" ng-disabled="item.status!=26">بسته بندی سفارش</a>' +
            '</span>',
            width:100,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='4'> تأیید نهایی خریدار</option>" +
            "   <option value='26'>منتظر بسته بندی </option>" +
            "   </select>" +
            "</div>"
        }
    ];

    $scope.detailRows=[
        {
            field:'id',
            displayName:'شماره محصول',
            template:'' +
            '<span>' +
            '   {{row.id}}' +
            '</span>',
            width:100
        },
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.image}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           <select name="" id="" ng-model="row.pivot[\'stock_\'+stock.abbr+\'_collected\']"' +
            '           ng-options="count.id as count.name for count in counts.slice(0,row.pivot[\'order_products_stock_\'+stock.abbr]+1)"' +
    '                   ng-change="collectProduct({product:row,fieldName:\'stock_\'+stock.abbr+\'_collected\',count:row.pivot[\'stock_\'+stock.abbr+\'_collected\'],order:item})"' +
            '           style="text-decoration: none;border: none;background: white;"></select>' +
            '       <div ng-show="row.pivot.approved_count>99">\n' +
            '                            <input type="number" class="form-control" ng-model="increaseDecreaseOrder" style="width: 65px;display: inline;" >\n' +
            '                            <!--<a href="" ng-if="can(\'increase_decrease_order\')" ng-click="can(\'increase_decrease_order\')&&decrease(product,increaseDecreaseOrder)" ><span class="glyphicon glyphicon-remove text-red"></span></a>-->\n' +
            '                            <a href=""  ng-click="increase({product:product,increaseDecreaseOrder:increaseDecreaseOrder})" ><span class="glyphicon glyphicon-plus"></span></a>\n' +
            '                        </div>' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];
    $scope.counts=[];
    for (var i=0 ;i<100;i++){
        $scope.counts.push({
            id:i,
            name:$filter('persian')(i)
        })
    }
    // $scope.counts=[
    //     {
    //         id:0,
    //         name:'۰'
    //
    //     },
    //     {
    //         id:1,
    //         name:'۱'
    //     },
    //     {
    //         id:2,
    //         name:'۲'
    //     },
    //     {
    //         id:3,
    //         name:'۳'
    //     },
    //     {
    //         id:4,
    //         name:'۴'
    //     },
    //     {
    //         id:5,
    //         name:'۵'
    //     },{
    //         id:6,
    //         name:'۶'
    //     },
    //     {
    //         id:7,
    //         name:'۷'
    //     },
    //     {
    //         id:8,
    //         name:'۸'
    //     },{
    //         id:9,
    //         name:'۹'
    //     },{
    //         id:10,
    //         name:'۱۰'
    //     }
    // ];

    $scope.increase=function (product,increaseDecreaseOrder) {

        $scope.counts.push({
            id:increaseDecreaseOrder,
            name:$filter('persian')(increaseDecreaseOrder)
        });


        // console.log(product);
        // console.log(product.count);
    };

    $scope.collectProduct= function (product,fieldName,count,order) {
        //if($scope.orderReadyToCollect.length>0){
        //    ngNotify.set('شسیب','error');
        //    return ;
        //}
        if(product){
            $http.post('/admin/api/collectingOrders/collectProduct',{
                productId:product.id,
                fieldName:fieldName,
                count:count,
                orderId:order.id
            },{
                ignoreLoadingBar: true
            }).then(function (response) {

            }, function (response) {
                console.warn(response);
            });
        }
        order.status=26;
        order.products.forEach(function (product) {
            $scope.stocks.forEach(function (stock) {
                if(product.pivot['order_products_stock_'+stock.abbr]!==null && product.pivot['order_products_stock_'+stock.abbr]!=product.pivot['stock_'+stock.abbr+'_collected']){
                    // console.log(product);
                    // console.log(stock.abbr);
                    // console.log(product.pivot['order_products_stock_'+stock.abbr]);
                    // console.log(product.pivot['stock_'+stock.abbr+'_collected']);
                    order.status=4;
                }
            });
        });
        if(order.status===26){
            $http.post('/admin/api/collectingOrders/readyOrderForPacking',{
                orderId:order.id,
                orderStatus:order.status
            },{
                ignoreLoadingBar: true
            }).then(function (response) {
                $scope.loadAll();
            });
        }

    };

    $scope.collectOrder= function (order) {

        if(order.status==26)
        $http.post('/admin/api/collectingOrders/collectOrder',{
            id:order.id
        }).then(function (response) {
            $scope.loadAll();
        });
    };

    $scope.checkProduct= function (product,order) {
        //when detail button clicked product == 0 else checkbox clicked
        if(product!=0){
            $http.post('/admin/api/collectingOrders/checkProduct',{
                id:product.id,
                orderId:order.id,
                collected:product.pivot.collected
            },{
                ignoreLoadingBar: true
            }).then(function (response) {

            });
        }

        order.ready=true;
        order.products.forEach(function (product) {
            if(!product.pivot.collected){
                order.ready=false;
            }
        });
    };
    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        }
    ];

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    //
    //$scope.forceCollect= function () {
    //    var modalInstance=$uibModal.open({
    //        animation:true,
    //        controller:'forceCollectOrderController',
    //        templateUrl:'/views/orders/forceCollectOrder.html',
    //        //windowClass: 'modal-window-xlg',
    //        resolve:{
    //            'orders': function () {
    //                return $scope.orderReadyToCollect
    //            }
    //        }
    //    });
    //    modalInstance.result.then(function (response) {
    //        console.log(1);
    //
    //    }, function (response) {
    //        console.log(2);
    //        $scope.forceCollect();
    //    })
    //}

    $scope.loadAll= function (reload) {
        $http.post('/admin/api/collectingOrders/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;
            $scope.orderReadyToCollect=$scope.orders.filter(function (order) {
                return order.status==26
            });
            if($scope.orderReadyToCollect.length>0){
                var modalInstance=$uibModal.open({
                    animation:true,
                    controller:'forceCollectOrderController',
                    templateUrl:'/views/orders/forceCollectOrder.html',
                    backdrop  : 'static',
                    keyboard  : false,
                    //windowClass: 'modal-window-xlg',
                    resolve:{
                        'orders': function () {
                            return $scope.orderReadyToCollect
                        }
                    }
                });
                modalInstance.result.then(function (response) {
                    $scope.loadAll();
                    getOperatorOrderCount.count();
                    getPackingOrdersCount.count();
                }, function (response) {
                })
            }
            //$scope.lastOrderId=response.data.lastOrderId;
            //if($state.is('dashboard.orders.allOrders')){
            //    console.log(1);
            //    $timeout(function(){
            //        var reload=true;
            //        $scope.loadAll(reload);
            //        getAllOrders.count();
            //    },5000);
            //}
        }, function (response) {
            console.warn(response);
        });
    };
}]);
angular.module('adminPanel').controller('forceCollectOrderController', ["ngNotify", "$uibModalInstance", "$http", "$scope", "orders", function (ngNotify,$uibModalInstance,$http, $scope, orders) {
    $scope.orders=orders;
    $scope.collectOrder= function (order,index) {
        $http.post('/admin/api/collectingOrders/collectOrder',{
            id:order.id
        }).then(function (response) {
            $scope.orders.splice(index,1);
            if($scope.orders.length==0){
                $uibModalInstance.close();
            }
        });
    }
}]);
/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('couriersController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "getOperatorOrderCount", "getAllOrders", "$uibModal", "getPackingOrdersCount", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,getOperatorOrderCount,getAllOrders,$uibModal,getPackingOrdersCount) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption="لیست پیک ها ";
    $scope.title="پیک ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>' +
            '   {{item.id}}' +
            '</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'fname',
            displayName:'نام ',
            template:'' +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({id:item.id})\">" +
            "   {{item.fname}}" +
            "</a>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'lname',
            displayName:'نام خانوادگی',
            template:'' +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({id:item.id})\">" +
            "   {{item.lname}}" +
            "</a>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'tel',
            displayName:'تلفن',
            template:'' +
            "<span >" +
            "   {{item.tel}}" +
            "</span>",
            sortable:true,
            filterable:true,
            width:100
        }
    ];

    $scope.button= {
        createNew:{
            show:true,
            permission:'add_attribute'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function () {
        $scope.courier=null;
        $http.post('/admin/api/courier/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            console.log(response.data.Couriers);
            $scope.couriers=response.data.Couriers;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.findById=function (id) {
        $http.get('/admin/api/courier/show/'+id).then(function (response) {
            $scope.courier=response.data;
        })
    };

    $scope.createNew=function () {
        $scope.courier={};
    }

    $scope.save=function () {
        $http.post('/admin/api/courier/save',{
            Courier:$scope.courier
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
            $scope.loadAll();
        })
    }
}]);

/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('hamkaranOrderController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "$uibModal", "getSendOrdersCount", "getOrdersPollCount", "$window", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,$uibModal,getSendOrdersCount,getOrdersPollCount,$window) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.couriers=[];
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'select',
            displayName:'انتخاب',
            displayNameTemplate:"" +
            "<span>" +
            "   <label for='selectAll'>انتخاب همه</label>" +
            "   <input id='selectAll' type='checkbox' ng-click='selectAllOrder({checkbox:selectAllCheckBox})' ng-model='selectAllCheckBox' >" +
            "</span>",
            template:"" +
            "<input  type=\"checkbox\" ng-model=\"item.selected\">",
            width:100
            //sortable:true,
            //filterable:true,
            //sorting:'DESC'
        },
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'name_copy',
            displayName:'نام خریدار',
            template:'<span>{{item.name_copy}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : 'hh:mm jYYYY/jMM/jDD hh:mm'|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        {
            field:'orders.sendType',
            displayName:'',
            template:'' +
            '<span style="white-space: nowrap">' +
            '   <span ng-if="item.sendType==1">' +
            'پیک' +
            '   <span ng-if="item.sendType==0">' +
            'پست' +
            '   </span>' +
            '</span>',
            width:100,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> پیک</option>" +
            "   <option value='0'>پست</option>" +
            "   </select>" +
            "</div>"
        },
        {
            field:'action2',
            displayNameTemplate:''
            +
            '<span>' +
            '   <a href="" ng-click="sendOrders()" class="btn btn-primary">' +
            'تایید انتخاب شده ها' +
            '   </a>' +
            '</span>',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="sendOrder({order:item})"  class="btn btn-success">تایید</a>' +
            '</span>',
            width:100
        }
    ];



    $scope.sendTypes=[
        {
            id:0,
            name:'پیشتاز'
        },
        {
            id:1,
            name:'پیک'
        },
    ];
    $scope.detailRows=[
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.image}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{row.pivot[\'stock_\'+stock.abbr+\'_collected\'] |persian}}' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];
    $scope.counts=[
        {
            id:0,
            name:'۰'

        },
        {
            id:1,
            name:'۱'
        },
        {
            id:2,
            name:'۲'
        },
        {
            id:3,
            name:'۳'
        },
        {
            id:4,
            name:'۴'
        },
        {
            id:5,
            name:'۵'
        },{
            id:6,
            name:'۶'
        },
        {
            id:7,
            name:'۷'
        },
        {
            id:8,
            name:'۸'
        },{
            id:9,
            name:'۹'
        },{
            id:10,
            name:'۱۰'
        }
    ];

    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        }
    ];






    $scope.sendOrders=function () {
        var orders=$scope.orders.filter(function (order) {
            return order.selected===true;
        }).map(function (order) {
            return order.id;
        });

        if(orders.length>0){
            $http.post('/admin/api/hamkaranOrder/sendSelectedOrders',{
                orders:orders
            }).then(function (response) {
                $scope.loadAll();
                getSendOrdersCount.count();
                getOrdersPollCount.count();
            },function (response) {
                ngNotify.set("error","خطا در ارسال سفارش")
            });
        }
    };


    $scope.sendOrder=function (order) {
        $http.post('/admin/api/hamkaranOrder/sendOrders',{
            order:order,
        }).then(function (response) {
            $scope.loadAll();
            getSendOrdersCount.count();
            getOrdersPollCount.count();
        })
    };

    // $scope.button= {
    //     sendOrder:{
    //         show:true,
    //         permission:AclService.can('add_product_to_pack'),
    //         // discounts:$scope.discounts
    //     }
    // };

    $scope.selectAllOrder=function (checkBox) {
        console.log(checkBox);
        $scope.selectAllCheckBox=checkBox;
        $scope.orders.filter(function (order) {
            order.selected=checkBox;
        });
    }

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function (selectedOrders) {
        $http.post('/admin/api/hamkaranOrder/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;
            // $scope.button.courier.couriers=response.data.couriers;
            $scope.orders.forEach(function (order) {
                if(selectedOrders.indexOf(order.id)>-1){
                    order.selected=true;
                }
            })
        }, function (response) {
            console.warn(response);
        });
    };

    // $scope.printReceipt=function () {
    //     var url=$scope.orders.filter(function (order) {
    //         return order.selected;
    //     }).map(function (order) {
    //         return {
    //             hashId:order.ATR+"-"+order.hashID,
    //             ParcelCode:order.ParcelCode,
    //             name_copy:order.name_copy,
    //             sendType:order.sendType===1?"پیک":"پست"
    //         }
    //     });
    //     $scope.url=encodeURIComponent( JSON.stringify( url));
    //     $window.open('/admin/data2#/printOrderReceipt.js?q='+$scope.url, '_blank');
    // };


}]);



/**
 * Created by alireza on 7/8/17.
 */
angular.module('adminPanel').controller('operatorOrdersController', ["$http", "$scope", "ngNotify", "AclService", function ($http,$scope,ngNotify,AclService) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });

    $scope.caption=" ",
        $scope.theads=[
            {
                field:'orders.id',
                displayName:'ردیف',
                template:'<span>{{item.id|persian}}</span>',
                sortable:true,
                filterable:true,
                sorting:'asc',
                width:100
            },
            {
                field:'hashID',
                displayName:'کد رهگیری',
                template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'name_copy',
                displayName:'خریدار',
                template:'<span>{{item.name_copy}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'weight',
                displayName:'وزن',
                template:'<span>{{item.weight}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'sendType',
                displayName:'نوع ارسال',
                template:'' +
                '<span ng-switch="item.sendType">' +
                '   <span ng-switch-when="0">' +
                '       پیشتاز' +
                '   </span>' +
                '   <span ng-switch-when="1">' +
                    //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
                '       پیک' +
                '   </span>' +
                '</span>' ,
                sortable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='1'> پیک</option>" +
                "   <option value='0'>پیشتاز</option>" +
                "   </select>" +
                "</div>",
                width:100
            },
            {
                field:'payType',
                displayName:'نوع پرداخت',
                template:'' +
                '<span ng-switch="item.payType">' +
                '   <span ng-switch-when="0">' +
                '       در محل' +
                '   </span>' +
                '   <span ng-switch-when="1">' +
                    //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
                '       درگاه' +
                '   </span>' +
                '</span>' ,
                sortable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='1'> درگاه</option>" +
                "   <option value='0'>در محل</option>" +
                "   </select>" +
                "</div>",
                width:100
            },
            {
                field:'cDate',
                displayName:'جزئیات سفارش',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.disc_valid_date!=\"0000-00-00 00:00:00\"'>{{item.cDate|jalaliDate : 'jYYYY/jMM/jDD hh:mm'|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'state_copy',
                displayName:'استان',
                template:'<span>{{item.state_copy}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'address_copy',
                displayName:'آدرس',
                template:'<span>{{item.address_copy|persian}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'name',
                displayName:'وضعیت',
                template:'<span>{{item.name}}-{{item.status}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'operation',
                displayName:'',
                template:'<a href="" ng-click="openOrder({id:item.id})" class="pull-left product-icon" ><i class="fa fa-dropbox"></i></a>',
                width:100
            }
        ];
    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.title="پنل سفارشات";

    //var Role=$resource('/admin/api/permission/:id');
    //
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });
    $scope.loadAll= function () {
        $http.post('/admin/api/orders/operatorOrdersIndex',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            //console.log(response.data);
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };
}]);

/**
 * Created by M.Rastgou on 10/10/2017.
 */
angular.module('adminPanel').controller('orderInformationController', ["$filter", "ngNotify", "$uibModalInstance", "$http", "$scope", "orderId", "$uibModal", "order", "$window", function ($filter,ngNotify,$uibModalInstance,$http, $scope, orderId,$uibModal,order,$window) {
    $scope.order=order;
    $scope.temp=[];
    $scope.getHistory= function () {
        $http.post('/admin/api/orders/getHistory',{
            orderId:$scope.order.id
        }).then(function (response) {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'userOrderHistoryController',
                templateUrl:'/views/orders/userOrderHistory.html',
                resolve:{
                    'history': function () {
                        return response.data;
                    }
                }
            });
        })
    };

    // $scope.satisfaction = 0;
    $scope.max = 10;
    $scope.isReadonly = true;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.getItemOfTableById= function (value,table) {
        if($scope.temp[table]==undefined){//if table not set set it and child
            $scope.temp[table]={};
        }
        $http.post('/admin/api/getItemOfTableById',{
            item:[table,value]
        }).then(function (response) {
            $scope.temp[table][value]=response.data;
            console.log($scope.temp);
        });
    };

    $scope.loadAll= function (id) {

        $http.post('/admin/api/orders/getOrderInformationById',{
            orderId:id?id:orderId,
            payType:order.payType,
            sendType:order.sendType,
            user_id:order.user_id
        }).then(function (response) {
            $scope.orderLevels=response.data.order_levels;
            $scope.questions=response.data.satisfaction;
            $scope.client=response.data.client;
            $scope.products=response.data.products;
            $scope.stocks=response.data.stocks;
            // $scope.counts=$scope.counts.slice(0, $scope.products.count);
            $scope.productCount=0;
            $scope.aPriceT=0;
            $scope.tPriceT=0;
            $scope.tdiscountT=0;
            $scope.products.forEach(function (product) {
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=product['order_products_stock_'+stock.abbr];
                });

                product.selectedStockCount=0;
                $scope.selectStock(product);

                //number of product can't be zero
                if(product.approved_count===null){
                    product.number=product.count;
                }else{
                    product.number=product.approved_count;
                }

                $scope.productCount+=product.number;
                $scope.aPriceT+=product.Aprice;
                $scope.tdiscountT+=product.Adiscount*product.number;
                $scope.tPriceT+=(product.Aprice*product.number);

            });
            $scope.fPrice=$scope.tPriceT-$scope.tdiscountT;

            /////////////////////    send date
            $scope.send_periods=response.data.send_periods;
            //$scope.order_sends=response.data.order_sends;
            $scope.selectedPeriod=null;
            if(response.data.order_sends){
                $scope.selectedPeriod={
                    // periodId:response.data.order_sends.period_id,
                    send_date:response.data.order_sends.send_date,
                    send_period:$scope.send_periods.filter(function (period) {
                        return period.id===response.data.order_sends.period_id;
                    })[0]
                };
            }

            ///////////////////////////////end send date

            ////////////////////////////    rejected Reason
            if( response.data.order_status!=null &&response.data.order_status.status==1){
                $scope.description=response.data.order_status.message;
                $scope.rejectOrder=response.data.order_status.order_level_id;
            }
            ///////////////////////////end rejected reason

            ///////////////////////////order log
            $scope.orderLogs=response.data.orderLog;
            ///////////////////////////end order log
            ///////////////////////////order log chart


            $scope.data= $scope.orderLogs.map(function (value,index) {
                if(index!==0){
                    var date1 = new Date($scope.orderLogs[index-1].cDate);
                    var date2 = new Date(value.cDate);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());


                    var diffDate=moment.duration(timeDiff);
                    var customDescription="" +
                        "<span>" +
                        "   <span>تاریخ ثبت:</span>" +
                        "   <span>"+$filter("jalaliDate")(value.cDate,'jYYYY/jMM/jDD hh:mm')+"</span>" +
                        "   <div>" +
                        "مدت معطل" +
                        "       دقیقه" +
                        diffDate._data.minutes +
                        "     ساعت"+
                        diffDate._data.hours+
                        "     روز"+
                        diffDate._data.days+
                        "   </div>" +
                        "   <div>" +
                        "       " +
                            value.fName +" "+value.lName +
                        "   </div>" +
                        "</span>";

                    return {
                        name:value.name,
                        points:timeDiff,
                        customDescription:customDescription,
                        customLabel:value.lName+"  "+
                        $filter("jalaliDate")(value.cDate,'jYYYY/jMM/jDD hh:mm')
                    }
                }else{
                    var date1 = new Date(order.oDate);
                    var date2 = new Date(value.cDate);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

                    var diffDate=moment.duration(timeDiff);
                    var customDescription="" +
                        "<span>" +
                        "   <span>تاریخ ثبت:</span>" +
                        "   <span>"+$filter("jalaliDate")(value.cDate,'jYYYY/jMM/jDD hh:mm')+"</span>" +
                        "   <div>" +
                        "مدت معطل" +
                        "       دقیقه" +
                        diffDate._data.minutes +
                        "     ساعت"+
                        diffDate._data.hours+
                        "     روز"+
                        diffDate._data.days+
                        "   </div>" +
                        "   <div>" +
                        "       " +
                            value.fName +" "+value.lName+
                        "   </div>" +
                        "</span>";


                    return {
                        name:value.name,
                        points:timeDiff,
                        customDescription:customDescription,
                        customLabel:value.lName+"  "+
                            $filter("jalaliDate")(value.cDate,'jYYYY/jMM/jDD hh:mm')
                    }
                }


            }).filter(function (value) {
                return value;
            });

            console.log($scope.data);

            var chart = AmCharts.makeChart("chartdiv",
                {
                    "type": "serial",
                    "theme": "light",
                    "dataProvider": $scope.data,
                    "valueAxes": [
                    //     {
                    //     // "maximum": 80000,
                    //     "minimum": -1000,
                    //     "axisAlpha": 0,
                    //     "dashLength": 4,
                    //     "position": "left",
                    //     "labelsEnabled": false
                    // },
                        {
                        "id": "durationAxis",
                        "duration": "mm",
                        "durationUnits": {
                            "hh": "h ",
                            "mm": "min",
                            "DD": "day",
                        },
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "labelsEnabled": false,
                        "position": "right",
                        "title": "duration"
                    }],
                    "startDuration": 1,
                    "graphs": [
                    //     {
                    //     // "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                    //     "bulletOffset": 10,
                    //     "bulletSize": 52,
                    //     "colorField": "color",
                    //     "cornerRadiusTop": 8,
                    //     // "customBulletField": "bullet",
                    //     "fillAlphas": 0.8,
                    //     "lineAlpha": 0,
                    //     "type": "column",
                    //     "valueField": "points",
                    //     "balloonText": "[[customDescription]]",
                    //     "labelText": "[[customLabel]]",
                    //
                    //     // "balloonFunction":function (graphDataItem, graph) {
                    //     //     console.log(graphDataItem);
                    //     //     console.log(graph);
                    //     //     // var date=new Date(graphDataItem.dataContext.points);
                    //     //     var diffDate=moment.duration(graphDataItem.dataContext.points);
                    //     //     // console.log(moment.duration(graphDataItem.dataContext.points));
                    //     //     return diffDate._data.minutes;
                    //     //     // console.log(date.getMinutes());
                    //     //
                    //     // }
                    // },
                        {
                        "bullet": "square",
                        "bulletBorderAlpha": 1,
                        "bulletBorderThickness": 1,
                        "dashLengthField": "dashLength",
                        "legendValueText": "[[customDescription]]",
                        "balloonText": "[[customDescription]]",
                        "title": "duration",
                        "fillAlphas": 0,
                        "valueField": "points",
                        "valueAxis": "durationAxis"
                    }],
                    "marginTop": 50,
                    "marginRight": 5,
                    "marginLeft": 5,
                    "marginBottom": 5,
                    "autoMargins": true,
                    "categoryField": "name",
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "inside": true,
                        "tickLength": 0
                    },
                    "export": {
                        "enabled": true
                    }
                });
            ///////////////////////////end order log chart

        })
    };

    $scope.selectPeriod= function (period_id,date) {
        $scope.selectedPeriod={};
        $scope.selectedPeriod.periodId=period_id;
        $scope.selectedPeriod.send_date=date;
    };

    $scope.saveParcelCode=function () {
        $http.post('/admin/api/orders/saveParcelCode',{
            ParcelCode:$scope.order.ParcelCode,
            orderId:$scope.order.id
        }).then(function (value) {

        });
    };
    $scope.printCollectingPaper=function () {
        var query={
            'order':$scope.order,
            'products':$scope.products,
            'productCount':$scope.productCount,
            'discountValue':$scope.discountValue,
            'totalPayment':$scope.totalPayment,
            'period':$scope.period,
            'fPrice':$scope.fPrice,
            'tdiscountT':$scope.tdiscountT,
            'tPriceT':$scope.tPriceT,
            'aPriceT':$scope.aPriceT,
            'client':$scope.client,
            'stocks':$scope.stocks
        };

        $scope.query=encodeURIComponent( JSON.stringify( query));
        $window.open('/admin/data2#/printCollectingPaper.js?q='+$scope.query, '_blank');
    };

    $scope.changeProductNum= function (productId) {
        $scope.productCount=0;
        $scope.aPriceT=0;
        $scope.tPriceT=0;
        $scope.tdiscountT=0;
        $scope.products.forEach(function (product) {

            if(product.id==productId){
                product.selectedStock={};
                $scope.stocks.forEach(function (stock) {
                    product.selectedStock[stock.abbr]=0;
                });
            }
            product.selectedStockCount=0;
            $scope.productCount+=product.number;
            $scope.aPriceT+=product.Aprice;
            $scope.tdiscountT+=product.Adiscount*product.number;
            $scope.tPriceT+=(product.Aprice*product.number);
            $scope.selectStock(product);
        });
        $scope.fPrice=$scope.tPriceT-$scope.tdiscountT;
    };


    $scope.selectStock= function (product, abbr)
    {
        product.selectedStockCount=0;
        console.log(product);

        for( var el in product.selectedStock ) {
            product.selectedStockCount+=product.selectedStock[el];
            console.log(product.selectedStock[el]);
        }
    };


    $scope.loadAll();

    $scope.print=function () {
        $uibModalInstance.close({
            products:$scope.products,
            productCount:$scope.productCount,
            totalPayment:$scope.fPrice,
            discountValue:$scope.tdiscountT,
            period:$scope.selectedPeriod,
            client:$scope.client,
            aPriceT:$scope.aPriceT,
            tPriceT:$scope.tPriceT,
            tdiscountT:$scope.tdiscountT,
            fPrice:$scope.fPrice,
            stocks:$scope.stocks
        });
    }



}]);

/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('ordersPollController', ["$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "$uibModal", "getOrdersPollCount", function ($state,$timeout,$http,$scope,ngNotify,AclService,$uibModal,getOrdersPollCount) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.couriers=[];
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'name_copy',
            displayName:'نام خریدار',
            template:'<span>{{item.name_copy}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'ParcelCode',
            displayName:'بارکد مرسوله پستی',
            template:'<span>{{item.ParcelCode}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : 'hh:mm jYYYY/jMM/jDD hh:mm'|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        // {
        //     field:'orders.sendType',
        //     displayName:'',
        //     template:'' +
        //     '<span style="white-space: nowrap">' +
        //     '   <span ng-if="item.sendType==1">' +
        //     'پیک' +
        //     '       ' +
        //     '   ' +
        //     '   <select name="" id="" ng-model="item.courier_id"  class="form-control"' +
        //     '       ng-options="courier.id as  (courier.fname +\' \'+ courier.lname ) for courier in couriers">' +
        //     '       <option value="">--انتخاب پیک--</option>' +
        //     '   </select>' +
        //     '   <a href="" ng-click="assignOrderToCourier({courier:item.courier_id,order_id:item.id})">اختصاص سفارش</a>' +
        //     '   </span>' +
        //     '   <span ng-if="item.sendType==0">' +
        //     '   پست' +
        //     '   </span>' +
        //     '   ' +
        //     '</span>',
        //     width:100,
        //     sortable:true,
        //     filtering:"" +
        //     "<div class='form-group'>" +
        //     "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
        //     "   <option value=''> </option>" +
        //     "   <option value='1'> پیک</option>" +
        //     "   <option value='0'>پست</option>" +
        //     "   </select>" +
        //     "</div>"
        // },
        {
            field:'status',
            displayName:'',
            template:'' +
            '<span>' +
            // '   <a href="" class="" ng-click="questionPost({parcelCode:item.ParcelCode,orderId:item.id})" ng-if="item.status==28 && item.sendType==0">استعلام وضعیت از پست</a>' +
            // '   <span ng-if="((item.status==31 || item.status==35 || item.status==36 ) && item.sendType==0)||(item.status==28 && item.sendType==1)">آماده نظر سنجی</span>' +
            '   <span >{{item.name}}' +
            '   <span ng-if="item.sendType==1">پیک - </span>' +
            '   </span>' +
            '   <a style="color:#7cbf44" href="" ng-click="polling({order:item})" class="pull-left product-icon" ><i class="fa fa-question "></i></a>' +
            '</span>',
            width:100,
            filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='28'> ارسال سفارش </option>" +
                "   <option value='31'>ارسال شده (پست) </option>" +
                "   <option value='32'> عدم قبول (پست)</option>" +
                "   <option value='33'> پیش برگشتی (پست)</option>" +
                "   <option value='34'>  برگشتی نهایی (پست)</option>" +
                "   <option value='35'> واریز به ادمین مالی (پست)</option>" +
                "   <option value='36'>  وصول شده (پست)</option>" +
                "   </select>" +
                "</div>"
        }
    ];



    $scope.sendTypes=[
        {
            id:0,
            name:'پیشتاز'
        },
        {
            id:1,
            name:'پیک'
        },
    ];
    $scope.detailRows=[
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.id}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{row.pivot[\'stock_\'+stock.abbr+\'_collected\'] |persian}}' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];
    $scope.counts=[
        {
            id:0,
            name:'۰'

        },
        {
            id:1,
            name:'۱'
        },
        {
            id:2,
            name:'۲'
        },
        {
            id:3,
            name:'۳'
        },
        {
            id:4,
            name:'۴'
        },
        {
            id:5,
            name:'۵'
        },{
            id:6,
            name:'۶'
        },
        {
            id:7,
            name:'۷'
        },
        {
            id:8,
            name:'۸'
        },{
            id:9,
            name:'۹'
        },{
            id:10,
            name:'۱۰'
        }
    ];

    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        },
        {
            name:'from',
            value:'',
            filtering:""+
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='item.value' placeholder='از تاریخ' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "</div>",
        },
        {
            name:'to',
            value:'',
            filtering:""+
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='item.value' placeholder='تا تاریخ' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "</div>",

        }
    ];


    $scope.polling=function (order) {
        var pollingOrder=$uibModal.open({
            animation:true,
            size:'lg',
            controller:'pollingOrderController',
            templateUrl:'/views/orders/pollingOrder.html',
            // windowClass: 'modal-window-xlg',
            resolve:{
                'order': function () {
                    return order
                }
            }
        });
        pollingOrder.result.then(function () {
            $scope.loadAll();
            getOrdersPollCount.count();
        })
    };


    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function (reload) {
        $http.post('/admin/api/ordersPoll/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;

        }, function (response) {
            console.warn(response);
        });
    };

    $scope.questionPost=function (parcelCode,orderId) {
        $http.post('/admin/api/ordersPoll/questionPost',{
            parcelCode:parcelCode,
            orderId:orderId
        }).then(function (value) {
            if(value.data.status){
                ngNotify.set(value.data.message);
                $scope.orders.forEach(function (value2) {
                    if(value2.id===orderId){
                        value2.status=31;
                    }
                })
            }else{
                ngNotify.set(value.data.message,'error');
            }
        })
    }
}]);


/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('packagesController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption="لیست دسته بندی   ";
    $scope.title="دسته بندی  ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>' +
            '   {{item.id}}' +
            '</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'name',
            displayName:'نام ',
            template:'' +
            "<a href='' ng-click=\"can(\'manage_package\')&&findById({id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'caption',
            displayName:'عنوان',
            template:'' +
            "   <span> {{item.caption}}</span>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'weight',
            displayName:'وزن',
            template:'' +
            "   <span> {{item.weight}}</span>",
            sortable:true,
            filterable:true,
            width:100
        }
    ];

    $scope.button= {
        createNew:{
            show:true,
            permission:'manage_package'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.removePoll=function (id) {
        $http.post('/admin/api/package/removePackage',{
            id:id
        }).then(function (response) {
            $scope.loadAll();
        })
    };

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function () {
        $scope.answers=[];
        $scope.package=null;
        $http.post('/admin/api/package/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            console.log(response.data.packages);
            $scope.packages=response.data.packages;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.findById=function (id) {
        $http.get('/admin/api/package/show/'+id).then(function (response) {
            $scope.package=response.data;
        })
    };

    $scope.createNew=function () {
        $scope.package={};
    };

    $scope.save=function () {
        if($scope.form.$invalid){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            return;
        }
        $http.post('/admin/api/package/save',{
            package:$scope.package,
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
            $scope.loadAll();
        })
    };


}]);

/**
 * Created by alireza on 9/18/17.
 */
angular.module('adminPanel').controller('packingOrdersController', ["$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "getPackingOrdersCount", "getReadyOrderForSendCount", "$uibModal", function ($state,$timeout,$http,$scope,ngNotify,AclService,getPackingOrdersCount,getReadyOrderForSendCount,$uibModal) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        {
            field:'action2',
            displayName:'',
            template:'' +
            '<span style="white-space: nowrap">' +
            // '   <a href="" ng-click="printBahook({order:item})" class="btn btn-primary" >پرینت باهوک</a>' +
            // '   <a href="" ng-click="printPost({order:item})" ng-if="item.printBahook==true&&item.sendType==0" class="btn btn-info" >پرینت پست</a>' +
            '   <a href="" ' +
            '       ng-click="sendOrder({order:item})" class="btn btn-success" >بسته بندی سفارش</a>' +
            '</span>',
            width:100
        }
    ];

    $scope.detailRows=[
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.image}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{row.pivot[\'stock_\'+stock.abbr+\'_collected\'] |persian}}' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];


    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        }
    ];

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });

    $scope.loadAll= function (reload) {
        $http.post('/admin/api/packingOrders/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;
            //$scope.lastOrderId=response.data.lastOrderId;
            //if($state.is('dashboard.orders.allOrders')){
            //    console.log(1);
            //    $timeout(function(){
            //        var reload=true;
            //        $scope.loadAll(reload);
            //        getAllOrders.count();
            //    },5000);
            //}
        }, function (response) {
            console.warn(response);
        });
    };
    // $scope.printBahook=function (order) {
    //     var modalInstance=$uibModal.open({
    //         animation:true,
    //         controller:'printBahookInvoiceController',
    //         templateUrl:'/views/orders/printBahookInvoice.html',
    //         windowClass: 'modal-print-a5',
    //         backdrop  : 'static',
    //         keyboard  : false,
    //         resolve:{
    //             'order': function () {
    //                 return order;
    //             }
    //         }
    //     });
    //     modalInstance.result.then(function (response) {
    //         console.log(response);
    //         order.printBahook=response.printBahook;
    //     })
    // };
    //
    // $scope.printPost=function (order) {
    //     var modalInstance=$uibModal.open({
    //         animation:true,
    //         controller:'printPostInvoiceController',
    //         windowClass: 'modal-print-a5',
    //         templateUrl:'/views/orders/printPostInvoice.html',
    //         keyboard  : false,
    //         resolve:{
    //             'order': function () {
    //                 return order;
    //             }
    //         }
    //     });
    //     modalInstance.result.then(function (response) {
    //         order.printPost=response.printPost;
    //     })
    // };

    $scope.sendOrder= function (order) {
        // if((order.printBahook==null && order.sendType==1)||(order.sendType==0&&order.printPost==null)){
        //     return;
        // }
        // console.log(order.sendType);
        if(order.sendType===0){
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'selectPackageForPostController',
                templateUrl:'/views/orders/selectPackageForPost.html',
                // windowClass: 'modal-print-a5',
                // backdrop  : 'static',
                // keyboard  : false,
                resolve:{
                    'order': function () {
                        return order;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                $scope.loadAll();
                getPackingOrdersCount.count();
                getReadyOrderForSendCount.count();
            },function (reason) {

            })
        }
        else{
            $http.post('/admin/api/packingOrders/packingOrders',{
                order:order
            }).then(function (response) {
                $scope.loadAll();
                getPackingOrdersCount.count();
                getReadyOrderForSendCount.count();
            })
        }
        // return

        // console.log(order);
        // var modalInstance=$uibModal.open({
        //     animation:true,
        //     controller:'printPackingPaperController',
        //     templateUrl:'/views/orders/printPackingPaper.html',
        //     resolve:{
        //         'order': function () {
        //             return order;
        //         }
        //     }
        // });
        // modalInstance.result.then(function (orderId) {
        // });
    }
}]);
angular.module('adminPanel').controller('selectPackageForPostController', ["ngNotify", "$uibModalInstance", "$http", "$scope", "order", function (ngNotify,$uibModalInstance,$http, $scope,order) {
    $scope.order=order;
    $scope.productsWeight=0;
    $scope.order.products.forEach(function (value) {
        $scope.productsWeight+=value.weight;
    });
    $scope.packageWeight=0;

    $scope.getPackages=function () {
        $http.get('/admin/api/packingOrders/getPackages').then(function (response) {
            $scope.packages=response.data;
        })
    };
    
    $scope.estimateWeight=function () {
        $scope.packageWeight=$scope.packages.filter(function (item) {
            return item.id===$scope.selectedPackage;
        })[0].weight;
        $scope.tWeight= $scope.productsWeight+$scope.packageWeight;
    };
    
    $scope.getPackages();
    $scope.save=function () {
        $http.post('/admin/api/packingOrders/packingOrders',{
            order:order,
            listOfProduct:order.products.filter(function (product) {
                return product.pivot.approved_count>0;
            }).map(function (product) {
                // console.log(product.pivot.post_Id);
                return {
                    Id:product.pivot.post_Id,
                    Count:product.pivot.approved_count,
                    DisCount:product.pivot.Adiscount
                }
            }),
            packageWeight:$scope.packageWeight,
            additionalWeight:$scope.additionalWeight||0,
            stuffToAddWeight:order.products.filter(function (product) {
                return product.pivot.approved_count>0;
            }).map(function (product) {
                // console.log(product.pivot.post_Id);
                return {
                    postId:product.pivot.post_Id,
                    weight:product.pivot.Aweight*product.pivot.approved_count
                }
            })[0]
        }).then(function (response) {
            $scope.close();
        })
    };

    $scope.close=function () {
        $uibModalInstance.close();
    }
}]);
// angular.module('adminPanel').controller('printBahookInvoiceController', function (ngNotify,$uibModalInstance,$http, $scope,order) {
//     $scope.order=order;
//     var printBahook=null;
//     $scope.print=function () {
//         printBahook=true;
//         $scope.printA5();
//         $uibModalInstance.close({printBahook:printBahook});
//     };
//     $scope.printA5=function () {
//         var usercss = '@page { size: landscape A5 ;margin: 25mm 5mm 5mm 5mm;}';
//
//         var css = document.createElement("style");
//         css.type = "text/css";
//         css.innerHTML = usercss;
//         document.body.appendChild(css);
//         window.print();
//     };
//     $scope.close=function () {
//         $uibModalInstance.close({printBahook:printBahook});
//     }
//
// });
// angular.module('adminPanel').controller('printPackingPaperController', function (ngNotify,$uibModalInstance,$http, $scope,order) {
//     console.log(order);
//     $scope.order=order;
//     //$scope.order.sendType=0;
//     $scope.printBahook=false;
//     $scope.printPost=false;
//     $scope.printingPost= function () {
//         $scope.printPost=true;
//     };
//
//     $scope.packingOrder= function () {
//         $http.post('/admin/api/packingOrders/packingOrders',{
//             orderId:$scope.order.id
//         }).then(function (response) {
//             $uibModalInstance.close();
//         })
//     }
//
//
// });
/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('pollQuestionsController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "convertToTree", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,convertToTree) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.tree=[{}];



    $scope.caption="لیست سوالات ها ";
    $scope.title="سوالات ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>' +
            '   {{item.id}}' +
            '</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'text',
            displayName:'سوال ',
            template:'' +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({id:item.id})\">" +
            "   {{item.text}}" +
            "</a>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'description',
            displayName:'توضیحات',
            template:'' +
            "   <span> {{item.description}}</span>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'type',
            displayName:'کاربرد',
            template: '<a ng-show="item.type === 2" style="color:green;font-size: 16px;" >سفارشات</a>' +
            '<a  ng-show="item.type === 1" style="color:lightsalmon;font-size: 16px;" >نظرسنجی </a>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'ask_in_first_order',
            displayName:'در اولین سفارش پرسیده شود',
            template:'' +
            "   <span ng-if=\"item.ask_in_first_order\"> بله</span>" +
            "   <span ng-if=\"!item.ask_in_first_order\"> خیر</span>",
            sortable:true,
            filterable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option label=\"\" value=\"\" selected=\"selected\"></option>" +
            "   <option label=\"بله\" value=1 > بله</option>" +
            "   <option label=\"خیر\" value=0>خیر</option>" +
            "   </select>" +
            "</div>",
            width:100
        },
        {
            field:'answers',
            displayName:'پاسخ',
            template:'' +
            "<span >" +
            "   <ul class=\"list list-unstyled\">" +
            "   <li ng-repeat=\"answer in item.answers\">" +
            "   <span ng-if='answer.depth===0'></span>" +
            "       {{answer.text}}" +
            "   </li>" +
            "   </ul>" +
            "</span>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            "<span >" +
            "   <button class=\"btn btn-danger\" ng-click=\"removePoll({id:item.id})\">حذف</button> " +
            "</span>",
            sortable:true,
            filterable:true,
            width:100
        }
    ];

    $scope.button= {
        createNew:{
            show:true,
            permission:'add_attribute'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.removePoll=function (id) {
        $http.post('/admin/api/pollQuestion/removePoll',{
            id:id
        }).then(function (response) {
            $scope.loadAll();
        })
    };

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function () {
        $scope.answers=[];
        $scope.answerToRemove=[];
        $scope.pollQuestion=null;
        $scope.tempAnswerId=100;
        $http.post('/admin/api/pollQuestion/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            console.log(response.data.pollQuestions);
            $scope.pollQuestions=response.data.pollQuestions;
            $scope.questionTypes=response.data.questionTypes;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.findById=function (id) {
        $http.get('/admin/api/pollQuestion/show/'+id).then(function (response) {
            $scope.pollQuestion=response.data;
            $scope.pollQuestion.ask_in_first_order=$scope.pollQuestion.ask_in_first_order===1;
            $scope.answers=response.data.answers;
            $scope.tree=[
                {
                    text:'پاسخ ها',
                    score:0,
                    children:convertToTree.convert($scope.answers,'id','parent_id')
                }
            ];
        })
    };

    $scope.createNew=function () {
        $scope.pollQuestion={
            text:"",
            description:""
        };
        $scope.answers=[];
        $scope.tree=[
            {
                text:'پاسخ ها',
                score:0,
                children:[]
            }
        ];
        $http.post('/admin/api/pollQuestion/save',{
            pollQuestion:$scope.pollQuestion
        }).then(function (response) {
            $scope.pollQuestion=response.data;
            $scope.pollQuestion.ask_in_first_order=$scope.pollQuestion.ask_in_first_order===1;
        })
    };

    $scope.save=function () {
        if($scope.form.$invalid){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            return;
        }
        $http.post('/admin/api/pollQuestion/save',{
            pollQuestion:$scope.pollQuestion,picture: $scope.uploadme
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
            $scope.loadAll();
        })
    };


    $scope.removeAnswer=function (branch) {
        if(!branch.children.length){
            $http.post('/admin/api/pollQuestion/removeAnswer',{
                answerId:branch.id,
                questionId:$scope.pollQuestion.id
            }).then(function (response) {
                $scope.answers=response.data;
                $scope.tree=[
                    {
                        text:'پاسخ ها',
                        score:0,
                        children:convertToTree.convert($scope.answers,'id','parent_id')
                    }
                ];
            })
        }

    };

    $scope.editAnswer=function (branch) {
        $scope.answer={
            text:branch.text,
            score:branch.score,
            id:branch.id
        };
    };

    $scope.createNewAnswer=function (branch) {
        // $scope.branch=null;
        $scope.answer={
            text:"",
            score:0,
            parent_id:branch.id
        };
    };

    $scope.saveAnswer=function () {
        $http.post('/admin/api/pollQuestion/saveAnswer',{
            answer:$scope.answer,
            questionId:$scope.pollQuestion.id
        }).then(function (response) {
            $scope.answers=response.data;
            $scope.tree=[
                {
                    text:'پاسخ ها',
                    score:0,
                    children:convertToTree.convert($scope.answers,'id','parent_id')
                }
            ];
            $scope.answer=null;
        })
    };

    $scope.expanding_property_in_product_list = {
        field: "id",
        displayName: "نام",
        filterable: true,
        cellTemplate:"<span>{{row.branch.text}}:{{row.branch.score}}</span>"
    };

    $scope.col_defs=[
        {
            field:'id',
            displayName:'شمارنده',
            filterable: true
        },
        {
            cellTemplate:"<a class='btn-lg' href=''  ng-click='cellTemplateScope.createNew(row.branch,true)'><span class='glyphicon glyphicon-plus-sign'></span></a>" +
            "<a class='btn-lg' href=''  ng-click='cellTemplateScope.remove(row.branch,tree_rows)'><span class='glyphicon glyphicon-remove-sign text-red'></span></a>" ,
            cellTemplateScope:{
                createNew:$scope.createNewAnswer,
                remove:$scope.removeAnswer
            }
        }
    ];


}]);

/**
 * Created by M.Rastgou on 10/17/2017.
 */
angular.module('adminPanel').controller('pollingOrderController', ["$uibModal", "ngNotify", "$uibModalInstance", "$http", "$scope", "order", function ($uibModal,ngNotify,$uibModalInstance,$http, $scope,order) {
    $scope.order=order;

    // $scope.satisfaction = 0;
    // $scope.max = 10;
    // $scope.isReadonly = false;
    //
    // $scope.hoveringOver = function(value) {
    //     $scope.overStar = value;
    //     $scope.percent = 100 * (value / $scope.max);
    // };

    $scope.getHistory= function () {
        $http.post('/admin/api/orders/getHistory',{
            orderId:$scope.order.id
        }).then(function (response) {
            var modalInstance=$uibModal.open({
                animation:true,
                controller:'userOrderHistoryController',
                templateUrl:'/views/orders/userOrderHistory.html',
                resolve:{
                    'history': function () {
                        return response.data;
                    }
                }
            });
        })
    };

    $scope.loadAll= function () {
        $http.get('/admin/api/ordersPoll/getQuestions/'+order.user_id).then(function (response) {
            $scope.questions=response.data;
        });
    };

    $scope.changeScore=function (question,answer) {
        question.score=answer.score;
        var children = question.answers.filter(function (item) {
            return item.parent_id===answer.id;
        });
        var elementToRemove = angular.element( document.querySelector( '#question-'+question.id+"-"+answer.depth ) );
        elementToRemove.remove();
        if(children.length){
            var answerConainer= angular.element(document.querySelector('#question-'+question.id));
            var domString="<ul class='list list-unstyled' id='question-"+question.id+"-"+answer.depth+"' style='border-top:1px solid black'>";

            children.forEach(function (answer) {
                domString+="" +
                    "<li style='direction: ltr'>" +
                    "   <label for='"+answer.id+"' >"+answer.text+" " +
                    "   <input type='radio' name='"+question.id+"' id='"+answer.id+"' ng-value='answer.id' ng-model='question.answer_id' ng-change='changeScore(question,answer)' > </label> " +
                    "</li>";
            });
            domString+="</ul>";
            answerConainer.append(domString);
        }

    };

    $scope.finish=function () {
        // console.log($scope.questions);
        // return ;

        $http.post('/admin/api/ordersPoll/finishOrder',{
            orderId:order.id,
            questions:$scope.questions.map(function (question) {
                return {
                    'order_id':order.id,
                    'question_id':question.id,
                    'answer_id':question.answer_id
                }
            }),
            satisfaction:$scope.questions.map(function (question) {
                return question.score;
            }).reduce(function (total, num) {
                return total+num;
            })
        }).then(function (response) {
            $uibModalInstance.close();
        });
    };

    $scope.loadAll();

}]);
/**
 * Created by M.Rastgou on 10/7/2017.
 */
angular.module('adminPanel')
    .controller('printInvoiceController',["$scope", "$http", "$stateParams", function($scope,$http,$stateParams){
        $scope.$order=$stateParams.order;
        $scope.products=$stateParams.products;
        $scope.productCount=$stateParams.productCount;
        $scope.discountValue=$stateParams.discountValue;
        $scope.totalPayment=$stateParams.totalPayment;
        $scope.period=$stateParams.period;
    }]);

/**
 * Created by alireza on 5/23/17.
 */
angular.module('adminPanel').controller('questionResultController',["AclService", "$scope", "$window", "$resource", "$http", "ngNotify", "$uibModal", function(AclService,$scope ,$window,$resource,$http,ngNotify,$uibModal){
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 2000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });


        $scope.tagCaption="نتایج نظرسنجی  "
        $scope.theads=[
            {
                field:'qText',
                displayName:'شناسه',
                template:'<span>{{item.qText}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC',
                width:100
            },
            {
                field:'answerId',
                displayName:'گزینه',
                template:'<span>{{item.answerId}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC',
                width:100
            },
            {
                field:'total',
                displayName:'جمع کل',
                template:'<span>{{item.total}}</span>',
                sortable:true,
                filterable:true,
                sorting:'DESC',
                width:100
            },
        ];
        // $scope.can = AclService.can;
        $scope.entries=[10,25,50,100];
        $scope.showEntries='50';
        $scope.button= {
            createNew:{
                show:true,
            }
            // loadAllFunction:$scope.loadAll()
        };

        $scope.loadAll=function(){
            $scope.title='لیست  ';
            $scope.showEntries='10';
            $scope.tags=null;
            $scope.active=null;
            // $scope.product=null;
            //$scope.row=null;

            $http.post('/admin/api/resultQuestion/index',{
                theads:$scope.theads.filter(function (thead) {
                    return thead.filter!=undefined;
                }),


                currentPage:$scope.currentPage,
                showEntries:$scope.showEntries,
                sort:$scope.theads.filter(function (item) {
                    return item.sorting!=null;
                })[0]
            }).then(function (response) {
                console.log(response);
                $scope.answers=response.data.answers;
                $scope.totalItem=response.data.count;
                $scope.numPages=response.data.count/$scope.showEntries;
            }, function (response) {
                console.warn(response);
            });
        };

        $scope.$on('$viewContentLoaded',function(){
            $scope.loadAll();
        });
        $scope.createNew= function () {
            $scope.tags={};
        };

        // Add new record
        $scope.save = function(){
            if($scope.innerFormCat.$invalid){
                ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
                return;
            }
            $http({
                method: 'post',
                url: '/admin/blog/tag/insert',
                data: {tags:$scope.tags},
            }).then(function successCallback(response) {
                // console.log(response.data);
                $scope.loadAll();
                // $scope.result=response.data;
                ngNotify.set('با موفقیت ذخیره شد');
                // $scope.users.push(response.data[0]);
            });
        };

        $scope.deleteById = function (id) {
            var confirm=$window.confirm('آیا از حذف مطمئنن هستید؟');
            // console.log(id);
            if(confirm)
            {
                $http.post('/admin/blog/tag/delTag', {
                    id: id
                }).then(function (response) {
                    // console.log(response);
                    $scope.loadAll();
                    // $scope=response;
                    // $scope.attributes=response.data;
                });
            }
        };
        $scope.findById= function (id) {
            $http.post('/admin/blog/tag/findById', {
                id: id
            }).then(function (response) {
                console.log(response);
                $scope.tags=response.data.tags;
            });
        };

        // update new record
        $scope.update = function(){
            if($scope.innerFormCat.$invalid){
                ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
                return;
            }
            // console.log($scope);
            // console.log($scope.active);
            $http({
                method: 'post',
                url: '/admin/blog/tag/updateTag',
                data: {tags:$scope.tags,active:$scope.active},
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.loadAll();
                ngNotify.set('با موفقیت ویرایش شد');
                // $scope.result=response.data;
                // $scope.users.push(response.data[0]);
            });
        };

    }]);
/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('readyForSendController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "$uibModal", "getReadyOrderForSendCount", "getSendOrdersCount", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,$uibModal,getReadyOrderForSendCount,getSendOrdersCount) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.couriers=[];
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'select',
            displayName:'انتخاب',
            displayNameTemplate:"" +
            "<span>" +
            "   <label for='selectAll'>انتخاب همه</label>" +
            "   <input id='selectAll' type='checkbox' ng-click='selectAllOrder({checkbox:selectAllCheckBox})' ng-model='selectAllCheckBox' >" +
            "</span>",
            template:"" +
            "<input  type=\"checkbox\" ng-model=\"item.selected\">",
            width:100
            //sortable:true,
            //filterable:true,
            //sorting:'DESC'
        },
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : 'hh:mm jYYYY/jMM/jDD hh:mm'|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        {
            field:'orders.sendType',
            displayName:'',
            template:'' +
            '<span style="white-space: nowrap">' +
            '   <span ng-if="item.sendType==1">' +
            'پیک' +
            '       ' +
            '   ' +
            '   <select name="" id="" ng-model="item.courier_id"  class="form-control"' +
            '       ng-options="courier.id as  (courier.fname +\' \'+ courier.lname ) for courier in couriers">' +
            '       <option value="">--انتخاب پیک--</option>' +
            '   </select>' +
            '   <a href="" ng-click="assignOrderToCourier({courier:item.courier_id,order_id:item.id})">اختصاص سفارش</a>' +
            '   </span>' +
            '   <span ng-if="item.sendType==0">' +
            'پست' +
            // "<div >" +
            '   <a href="" ng-click="postSettings({order:item})" class="btn btn-primary" >تنظیمات پست</a>' +
            // "<abbr ng-if=\"item.datereadyforPost!=null\" title=\"تاریخ تحویل به پست\">{{item.datereadyforPost|jalaliDate : 'jYYYY/jMM/jDD'|persian}}</abbr>" +
            // "<button ng-model=\"item.datereadyforPost\" ng-jalaali-flat-datepicker>انتخاب تاریخ</button>" +
            // // "<button type='button' " +
            // // "   style=\"direction: ltr\" ng-model='item.datereadyforPost' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\"><i class='fa fa-calendar'></i></button >" +
            // // "{{item.datereadyforPost|jalaliDate : 'jYYYY/jMM/jDD'|persian}}" +
            // "<a  href=\"\" ng-click='setdatereadyforPost({datereadyforPost:item.datereadyforPost,order_id:item.id})'>تعیین تاریخ  تحویل به پست</a>" +
            // "</div>" +
            '   </span>' +
            '   ' +
            '</span>',
            width:100,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> پیک</option>" +
            "   <option value='0'>پست</option>" +
            "   </select>" +
            "</div>"
        },
        {
            field:'action2',
            displayNameTemplate:'' +
            '<span>' +
            '   <a href="" ng-click="export()">' +
            '       <i class="fa fa-file-excel-o"></i>' +
            '   </a>' +
            '</span>',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="readyOrderForSend({order:item})"  class="btn btn-success">آماده ارسال</a>' +
            '</span>',
            width:100
        }
    ];



    $scope.sendTypes=[
        {
            id:0,
            name:'پیشتاز'
        },
        {
            id:1,
            name:'پیک'
        },
    ];
    $scope.detailRows=[
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.image}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{row.pivot[\'stock_\'+stock.abbr+\'_collected\'] |persian}}' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];
    $scope.counts=[
        {
            id:0,
            name:'۰'

        },
        {
            id:1,
            name:'۱'
        },
        {
            id:2,
            name:'۲'
        },
        {
            id:3,
            name:'۳'
        },
        {
            id:4,
            name:'۴'
        },
        {
            id:5,
            name:'۵'
        },{
            id:6,
            name:'۶'
        },
        {
            id:7,
            name:'۷'
        },
        {
            id:8,
            name:'۸'
        },{
            id:9,
            name:'۹'
        },{
            id:10,
            name:'۱۰'
        }
    ];

    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        }
    ];

    $scope.assignOrderToCourier=function (courier,order_id) {
        if(courier){
            $http.post('/admin/api/readyOrderForSend/assignOrderToCourier',{
                courier:courier,
                order_id:order_id
            }).then(function (response) {
                $scope.loadAll();
                // getreadyOrderForSendCount.count();
            });
        }else{
            ngNotify.set('حداقل یک پیک انتخاب کنید','error');
        }

    };

    $scope.setdatereadyforPost=function (datereadyforPost,order_id) {
        if(datereadyforPost){
            // console.log( $filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD'));
            $http.post('/admin/api/readyOrderForSend/setDateReadyForPost',{
                datereadyforPostShamsi:$filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD'),
                datereadyforPost:datereadyforPost,
                order_id:order_id
            }).then(function (response) {
                $scope.loadAll();
                // getreadyOrderForSendCount.count();
            });
        }else{
            ngNotify.set('تاریخ تعیین نشده است','error');
        }

    };



    $scope.assignOrdersToCourier=function (courier) {
        var orders=$scope.orders.filter(function (order) {
            return order.selected===true && order.sendType===1;
        }).map(function (order) {
            return order.id;
        });
        if(orders.length>0){
            $http.post('/admin/api/readyOrderForSend/assignOrdersToCourier',{
                courier:courier,
                orders:orders
            }).then(function (response) {
                $scope.loadAll($scope.orders.filter(function (order) {
                    return order.selected===true;
                }).map(function (order) {
                    return order.id;
                }));
                // getreadyOrderForSendCount.count();
            });
        }
    };

    $scope.readyOrdersForSend=function () {
        var orders=$scope.orders.filter(function (order) {
            return order.selected===true;
        }).map(function (order) {
            return order.id;
        });
        if(orders.length>0){
            $http.post('/admin/api/readyOrderForSend/readySelectedOrders',{
                orders:orders
            }).then(function (response) {
                $scope.loadAll();
                getReadyOrderForSendCount.count();
                getSendOrdersCount.count();
            },function (response) {
                ngNotify.set("error","خطا در آماده ارسال")
            });
        }
    };


    $scope.readyOrderForSend=function (order) {
        $http.post('/admin/api/readyOrderForSend/readyOrderForSend',{
            order:order,
        }).then(function (response) {
            $scope.loadAll();
            getReadyOrderForSendCount.count();
            getSendOrdersCount.count();
        })
    };

    $scope.button= {
        readyOrdersForSend:{
            show:true,
            permission:AclService.can('add_product_to_pack'),
            // discounts:$scope.discounts
        },
        courier:{
            show:true,
            permission:AclService.can('add_product_to_pack'),
            couriers:$scope.couriers
        }
    };

    $scope.selectAllOrder=function (checkBox) {
        console.log(checkBox);
        $scope.selectAllCheckBox=checkBox;
        $scope.orders.filter(function (order) {
            order.selected=checkBox;
        });
    };

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function (selectedOrders) {
        $http.post('/admin/api/readyOrderForSend/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;
            $scope.couriers=response.data.couriers;
            $scope.button.courier.couriers=response.data.couriers;
            $scope.orders.forEach(function (order) {
                if(selectedOrders.indexOf(order.id)>-1){
                    order.selected=true;
                }
            })
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.postSettings=function (order) {
        var modalInstance=$uibModal.open({
            animation:true,
            controller:'postSettingsController',
            windowClass: 'modal-print-a5',
            templateUrl:'/views/orders/postSettings.html',
            keyboard  : false,
            resolve:{
                'order': function () {
                    return order;
                }
            }
        });
        modalInstance.result.then(function (response) {
            order.printPost=response.printPost;
        })
    };

    $scope.export=function () {
        // console.log(XLSX.version);
        // var header=[
        //     "کد رهگیری"
        //     ,
        //     ,
        // ]
        if($scope.totalItem<=$scope.showEntries){
            /* starting from this data */

            var data= $scope.orders.map(function (item) {
                return {
                    "کد رهگیری":item.ATR+"-"+item.hashID,
                    "بارکد مرسوله پستی":item.ParcelCode,
                    "نام خریدار":item.name_copy
                }
            });

            /* generate a worksheet */
            var ws = XLSX.utils.json_to_sheet(
                data
                );

            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Presidents");

            /* write workbook and force a download */
            XLSX.writeFile(wb, "sheetjs.xlsx");
        }
    }
}]);

angular.module('adminPanel').controller('postSettingsController', ["$filter", "ngNotify", "$uibModalInstance", "$http", "$scope", "order", "$log", "$timeout", function ($filter,ngNotify,$uibModalInstance,$http, $scope,order, $log, $timeout) {
    $scope.item=order;
    $scope.url=encodeURIComponent( JSON.stringify( $scope.item));
    $scope.setdatereadyforPost=function (datereadyforPost,order_id) {
        if(datereadyforPost){
            // console.log( $filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD'));
            $http.post('/admin/api/readyOrderForSend/setDateReadyForPost',{
                datereadyforPostShamsi:$filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD'),
                datereadyforPost:datereadyforPost,
                order_id:order_id
            }).then(function (response) {
            // $scope.$apply(function () {
                $scope.item.datereadyforPostShamsi=$filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD');
                order.datereadyforPostShamsi=$filter("jalaliDate")(datereadyforPost,'jYYYY/jMM/jDD');
                $scope.url=encodeURIComponent( JSON.stringify( $scope.item));
            //     console.log($scope.item);
            // });

            // getreadyOrderForSendCount.count();
            });
        }else{
            ngNotify.set('تاریخ تعیین نشده است','error');
        }
    };

    $scope.close=function () {
        console.log(printPost);
        $uibModalInstance.close();
    }
}]);


/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('sendOrdersController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", "$uibModal", "getSendOrdersCount", "getOrdersPollCount", "$window", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService,$uibModal,getSendOrdersCount,getOrdersPollCount,$window) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.couriers=[];
    $scope.caption=" ";
    $scope.theads=[
        {
            field:'select',
            displayName:'انتخاب',
            displayNameTemplate:"" +
            "<span>" +
            "   <label for='selectAll'>انتخاب همه</label>" +
            "   <input id='selectAll' type='checkbox' ng-click='selectAllOrder({checkbox:selectAllCheckBox})' ng-model='selectAllCheckBox' >" +
            "</span>",
            template:"" +
            "<input  type=\"checkbox\" ng-model=\"item.selected\">",
            width:100
            //sortable:true,
            //filterable:true,
            //sorting:'DESC'
        },
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>{{item.id|persian}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'hashID',
            displayName:'کد رهگیری',
            template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'oDate',
            displayName:'تاریخ سفارش',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.oDate!=null'>{{item.oDate|jalaliDate : 'hh:mm jYYYY/jMM/jDD '|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            width:100
        },
        {
            field:'send_date',
            displayName:'تاریخ دریافت',
            //filterable:true,
            editable:true,
            sortable:true,
            template:"<span ng-if='item.send_date!=null'>{{item.send_date|jalaliDate : 'hh:mm jYYYY/jMM/jDD hh:mm'|persian}} </span>",
            filtering:"" +
            "<div class='input-group'>" +
            "<input  type=\"text\" class=\"form-control\" " +
            "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
            "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
            "</div>",
            sorting:'asc',
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="item.isCollapsed = !item.isCollapsed">جزییات</a>' +
            '</span>',
            width:100
        },
        {
            field:'orders.sendType',
            displayName:'',
            template:'' +
            '<span style="white-space: nowrap">' +
            '   <span ng-if="item.sendType==1">' +
            'پیک' +
            '   <span ng-if="item.sendType==0">' +
            'پست' +
            '   </span>' +
            '</span>',
            width:100,
            sortable:true,
            filtering:"" +
            "<div class='form-group'>" +
            "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
            "   <option value=''> </option>" +
            "   <option value='1'> پیک</option>" +
            "   <option value='0'>پست</option>" +
            "   </select>" +
            "</div>"
        },
        {
            field:'action2',
            displayNameTemplate:'' +
            '<span>' +
            '   <a href="" ng-click="printReceipt()" class="btn btn-primary">' +
            '       رسید سفارشات انتخاب شده' +
            '   </a>' +
            '</span>',
            template:'' +
            '<span>' +
            '   <a href="" ng-click="sendOrder({order:item})"  class="btn btn-success">ارسال سفارش</a>' +
            '</span>',
            width:100
        }
    ];



    $scope.sendTypes=[
        {
            id:0,
            name:'پیشتاز'
        },
        {
            id:1,
            name:'پیک'
        },
    ];
    $scope.detailRows=[
        {
            field:'name',
            displayName:'نام محصول',
            template:'' +
            '<span>' +
            '   {{row.name}}' +
            '   <span ng-if="row.lName">{{row.lName}}</span>' +
            '</span>',
            width:200
        },
        {
            field:'barcode',
            displayName:'بارکد ',
            template:'' +
            '<span>' +
            '   {{row.barcode}}' +
            '</span>',
            width:60
        },
        {
            field:'name',
            displayName:'تعداد',
            template:'' +
            '<span>' +
            '   {{row.pivot.approved_count | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'Aprice',
            displayName:'قیمت واحد',
            template:'' +
            '<span>' +
            '   {{row.pivot.Aprice | currency :"":0 | persian}}' +
            '</span>',
            width:20
        },
        {
            field:'image',
            displayName:'تصویر',
            template:'' +
            '<span>' +
            '   <img ng-if="item.isCollapsed" src="/image/pic/new/{{row.image}}/1/xs.jpg" alt="">' +
            '</span>',
            width:50
        },
        {
            field:'checkbox',
            displayName:'',
            template:'' +
            '<table class="table table-striped">' +
            '   <thead>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{stock.name}}' +
            '       </td>' +
            '   </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   <tr>' +
            '       <td ng-repeat="stock in stocks" ng-if="row.pivot[\'order_products_stock_\'+stock.abbr]>0">' +
            '           {{row.pivot[\'stock_\'+stock.abbr+\'_collected\'] |persian}}' +
            '       </td>' +
            '   </tr>' +
            '   </tbody>' +
            '</table>',
            width:200
        }
    ];
    $scope.counts=[
        {
            id:0,
            name:'۰'

        },
        {
            id:1,
            name:'۱'
        },
        {
            id:2,
            name:'۲'
        },
        {
            id:3,
            name:'۳'
        },
        {
            id:4,
            name:'۴'
        },
        {
            id:5,
            name:'۵'
        },{
            id:6,
            name:'۶'
        },
        {
            id:7,
            name:'۷'
        },
        {
            id:8,
            name:'۸'
        },{
            id:9,
            name:'۹'
        },{
            id:10,
            name:'۱۰'
        }
    ];

    $scope.detailSearch=[
        {
            name:'barcode',
            caption:'بارکد ...',
            value:''
        },
        {
            name:'name',
            caption:'نام ...',
            value:''
        },
        {
            name:'lName',
            caption:'نام لاتین ...',
            value:''
        }
    ];






    $scope.sendOrders=function () {
        var orders=$scope.orders.filter(function (order) {
            return order.selected===true;
        }).map(function (order) {
            return order.id;
        });

        if(orders.length>0){
            $http.post('/admin/api/sendOrders/sendSelectedOrders',{
                orders:orders
            }).then(function (response) {
                $scope.loadAll();
                getSendOrdersCount.count();
                getOrdersPollCount.count();
            },function (response) {
                ngNotify.set("error","خطا در ارسال سفارش")
            });
        }
    };


    $scope.sendOrder=function (order) {
        $http.post('/admin/api/sendOrders/sendOrders',{
            order:order,
        }).then(function (response) {
            $scope.loadAll();
            getSendOrdersCount.count();
            getOrdersPollCount.count();
        })
    };

    $scope.button= {
        sendOrder:{
            show:true,
            permission:AclService.can('add_product_to_pack'),
            // discounts:$scope.discounts
        }
    };

    $scope.selectAllOrder=function (checkBox) {
        console.log(checkBox);
        $scope.selectAllCheckBox=checkBox;
        $scope.orders.filter(function (order) {
            order.selected=checkBox;
        });
    }

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function (selectedOrders) {
        $http.post('/admin/api/sendOrders/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            detailSearch:$scope.detailSearch
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.stocks=response.data.stocks;
            // $scope.button.courier.couriers=response.data.couriers;
            $scope.orders.forEach(function (order) {
                if(selectedOrders.indexOf(order.id)>-1){
                    order.selected=true;
                }
            })
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.printReceipt=function () {
        var url=$scope.orders.filter(function (order) {
            return order.selected;
        }).map(function (order) {
            return {
                date:moment().format('L'),
                hashId:order.ATR+"-"+order.hashID,
                ParcelCode:order.ParcelCode,
                name_copy:order.name_copy,
                // sendType:order.sendType===1?"پیک":"پست"
                time:moment().format('h:mm')
            }
        });
        $scope.url=encodeURIComponent( JSON.stringify( url));
        $window.open('/admin/data2#/printOrderReceipt.js?q='+$scope.url, '_blank');
    };


    // $scope.export=function () {
    //     // console.log(XLSX.version);
    //     // var header=[
    //     //     "کد رهگیری"
    //     //     ,
    //     //     ,
    //     // ]
    //     if($scope.totalItem<=$scope.showEntries){
    //         /* starting from this data */
    //
    //         var data= $scope.orders.map(function (item) {
    //             return {
    //                 "کد رهگیری":item.ATR+"-"+item.hashID,
    //                 "بارکد مرسوله پستی":item.ParcelCode,
    //                 "نام خریدار":item.name_copy
    //             }
    //         });
    //
    //         /* generate a worksheet */
    //         var ws = XLSX.utils.json_to_sheet(
    //             data
    //             );
    //
    //         /* add to workbook */
    //         var wb = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(wb, ws, "Presidents");
    //
    //         /* write workbook and force a download */
    //         XLSX.writeFile(wb, "sheetjs.xlsx");
    //     }
    // }
}]);



/**
 * Created by alireza on 9/17/17.
 */
angular.module('adminPanel').controller('sendTypeController', ["$filter", "$state", "$timeout", "$http", "$scope", "ngNotify", "AclService", function ($filter,$state,$timeout,$http,$scope,ngNotify,AclService) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption="روش های ارسال ";
    $scope.title="روش های ارسال ";
    $scope.theads=[
        {
            field:'id',
            displayName:'ردیف',
            template:'<span>' +
            '   {{item.id}}' +
            '</span>',
            sortable:true,
            filterable:true,
            sorting:'DESC',
            width:100
        },
        {
            field:'name',
            displayName:'نام ',
            template:'' +
            "<a href='' ng-click=\"can(\'edit_attribute\')&&findById({id:item.id})\">" +
            "   {{item.name}}" +
            "</a>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'caption',
            displayName:'عنوان',
            template:'' +
            "   <span> {{item.caption}}</span>",
            sortable:true,
            filterable:true,
            width:100
        },
        {
            field:'action',
            displayName:'',
            template:'' +
            "<span >" +
            "   <button class=\"btn btn-danger\" ng-click=\"removePoll({id:item.id})\">حذف</button> <" +
            "</span>",
            sortable:true,
            filterable:true,
            width:100
        }
    ];

    $scope.button= {
        createNew:{
            show:true,
            permission:'add_attribute'
        }
        //loadAllFunction:$scope.loadAll()
    };

    $scope.removePoll=function (id) {
        $http.post('/admin/api/sendType/remove',{
            id:id
        }).then(function (response) {
            $scope.loadAll();
        })
    };

    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    //$scope.lastOrderId=0;
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
    });


    $scope.loadAll= function () {
        $scope.sendType=null;
        $http.post('/admin/api/sendType/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0]
        }).then(function (response) {
            console.log(response.data.sendTypes);
            $scope.sendTypes=response.data.sendTypes;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
        }, function (response) {
            console.warn(response);
        });
    };

    $scope.findById=function (id) {
        $http.get('/admin/api/sendType/show/'+id).then(function (response) {
            $scope.sendType=response.data;
        })
    };

    $scope.createNew=function () {
        $scope.sendType={};
    };

    $scope.save=function () {
        if($scope.form.$invalid){
            ngNotify.set("لطفا فیلد ها الزامی را پر کنید" ,'error');
            return;
        }
        $http.post('/admin/api/sendType/save',{
            sendType:$scope.sendType,
        }).then(function (response) {
            ngNotify.set('ذخیره شد');
            $scope.loadAll();
        })
    };


    $scope.remove=function (index) {
        $scope.sendType.answers.splice(index,1);
    };

    $scope.addAnswer=function (answer,score) {
        if(!$scope.sendType.answers){
            $scope.sendType.answers=[];
        }
        $scope.sendType.answers.push({
            text:angular.copy( answer),
            score:score
        });

        $scope.answer="";
        $scope.score="";
    }
}]);

/**
 * Created by alireza on 7/8/17.
 */
angular.module('adminPanel').controller('allOrdersForManagerController', ["$timeout", "$state", "$http", "$scope", "ngNotify", "AclService", "getAllOrders", "$uibModal", function ($timeout,$state,$http,$scope,ngNotify,AclService,getAllOrders,$uibModal) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info',
        sticky: false,
        button: true,
        html: false
    });
    $scope.caption=" ",
        $scope.theads=[
            {
                field:'orders.id',
                displayName:'ردیف',
                template:'<span>{{item.id|persian}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'hashID',
                displayName:'کد رهگیری',
                template:'<span>{{item.ATR}}-{{item.hashID}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'name_copy',
                displayName:'خریدار',
                template:'<span>{{item.name_copy}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'weight',
                displayName:'وزن',
                template:'<span>{{item.weight}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'sendType',
                displayName:'نوع ارسال',
                template:'' +
                '<span ng-switch="item.sendType">' +
                '   <span ng-switch-when="0">' +
                '       پیشتاز' +
                '   </span>' +
                '   <span ng-switch-when="1">' +
                    //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
                '       پیک' +
                '   </span>' +
                '</span>' ,
                sortable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='1'> پیک</option>" +
                "   <option value='0'>پیشتاز</option>" +
                "   </select>" +
                "</div>",
                width:100
            },
            {
                field:'payType',
                displayName:'نوع پرداخت',
                template:'' +
                '<span ng-switch="item.payType">' +
                '   <span ng-switch-when="0">' +
                '       در محل' +
                '   </span>' +
                '   <span ng-switch-when="1">' +
                    //'   <label ng-show="can(\'change_discount_state\')" class="switch" ng-init="item.disc_status=item.disc_status==1"><input type="checkbox" ng-model="item.disc_status" ng-checked="item.disc_status" ng-change="changeDiscountState({id:item.disc_id,state:item.disc_status})"> <div class="slider round"></div></label>' ,
                '       درگاه' +
                '   </span>' +
                '</span>' ,
                sortable:true,
                filtering:"" +
                "<div class='form-group'>" +
                "   <select class=\"form-control\" ng-model='thead.filter' ng-change=\"onDropDownChange()\">" +
                "   <option value=''> </option>" +
                "   <option value='1'> درگاه</option>" +
                "   <option value='0'>در محل</option>" +
                "   </select>" +
                "</div>",
                width:100
            },
            {
                field:'orders.cDate',
                displayName:'تاریخ سفارش',
                //filterable:true,
                editable:true,
                sortable:true,
                template:"<span ng-if='item.disc_valid_date!=\"0000-00-00 00:00:00\"'>{{item.cDate|jalaliDate : 'jYYYY/jMM/jDD hh:mm'|persian}} </span>",
                filtering:"" +
                "<div class='input-group'>" +
                "<input  type=\"text\" class=\"form-control\" " +
                "   style=\"direction: ltr\" ng-model='thead.filter' ng-jalaali-flat-datepicker datepicker-config=\"datepickerConfig\">" +
                "<div class='input-group-addon' ng-click='loadLoadAll()'><i class='fa fa-calendar'></i></div>" +
                "</div>"
            },
            {
                field:'state_copy',
                displayName:'استان',
                template:'<span>{{item.state_copy}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'address_copy',
                displayName:'آدرس',
                template:'<span>{{item.address_copy|persian}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'name',
                displayName:'وضعیت',
                template:'<span>{{item.name}}-{{item.status}}</span>',
                sortable:true,
                filterable:true,
                width:100
            },
            {
                field:'operation',
                displayName:'',
                template:'' +
                '   <a style="color: #f7b424;" href="" ng-click="can(\'send_to_operator\') && assignOrder({id:item.id,status:item.status}) " class="pull-left product-icon" ><i class="fa fa-user-plus"></i></a>' +//
                '',
                width:100
            }
        ];



    $scope.can = AclService.can;
    $scope.entries=[10,25,50,100];
    $scope.showEntries='50';
    $scope.lastOrderId=0;
    //$scope.title="پنل سفارشات";

    //var Role=$resource('/admin/api/permission/:id');
    //
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadAll();
        //cfpLoadingBarProvider.includeBar=false;
    });
    $scope.loadAll= function (reload) {
        $http.post('/admin/api/ordersForManager/index',{
            theads:$scope.theads.filter(function (thead) {
                return thead.filter!=undefined;
            }),
            currentPage:$scope.currentPage,
            showEntries:$scope.showEntries,
            sort:$scope.theads.filter(function (item) {
                return item.sorting!=null;
            })[0],
            lastOrderId:$scope.lastOrderId,
            reload:reload
        },{
            ignoreLoadingBar: true
        }).then(function (response) {
            //console.log($state.is('dashboard.orders.allOrders'));
            $scope.orders=response.data.orders;
            $scope.totalItem=response.data.count;
            $scope.numPages=response.data.count/$scope.showEntries;
            $scope.lastOrderId=response.data.lastOrderId;
            //if($state.is('dashboard.ordersForManager.allOrdersForManager')){
            //    console.log(1);
            //    $timeout(function(){
            //        var reload=true;
            //        $scope.loadAll(reload);
            //        //getAllOrders.count();
            //    },5000);
            //}
        }, function (response) {
            console.warn(response);
        });
    };


    //$scope.checkOrder=function (id) {
    //    var modalInstance=$uibModal.open({
    //        animation:true,
    //        controller:'checkOrderController',
    //        size:'lg',
    //        templateUrl:'/views/orders/checkOrder.html',
    //        resolve:{
    //            'orderId': function () {
    //                return id;
    //            }
    //        }
    //    });
    //     modalInstance.result.then(function () {
    //         $scope.loadAll();
    //     }, function (response) {
    //
    //     });
    //}

    $scope.assignOrder= function (id,status) {
        console.log(status);
        var modalInstance = $uibModal.open({
            animation:true,
            controller:'assignOrderController',
            templateUrl:'/views/orders/assignOrder.html',
            resolve:{
                'orderId': function () {
                    return id;
                },
                'status': function () {
                    return status;
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.loadAll();
        }, function (response) {

        });
    }

}]);
angular.module('adminPanel').controller('assignOrderController', ["$http", "$scope", "ngNotify", "orderId", "status", "$uibModalInstance", function ($http,$scope,ngNotify,orderId,status,$uibModalInstance) {
    $scope.status=status;
    $scope.command=null;
    console.log(status);
    $http.get('/admin/api/ordersForManager/getAllRole').then(function (response) {
        $scope.roles=response.data;
    });

    $scope.getUsers= function () {
        $http.post('/admin/api/ordersForManager/getUsersByRoleId',{
            roleId:$scope.role
        }).then(function (response) {
            $scope.users=response.data;
        })
    };

    $scope.save= function () {
        //else if(command==1) $scope.status=status;
        $http.post('/admin/api/ordersForManager/assignOrderToOperator',{
            orderId:orderId,
            operatorId:$scope.user
        }).then(function (response) {
            $uibModalInstance.close();
        })
    };

    $scope.cancel= function () {
        $uibModalInstance.dismiss();
    }


}]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('printA4OrderController', ["$stateParams", "$scope", function ($stateParams,$scope) {
        // console.log($stateParams.q);
        $scope.query=JSON.parse($stateParams.q);
        $scope.$order=$scope.query.order;
        $scope.products=$scope.query.products;
        $scope.productCount=$scope.query.productCount;
        $scope.discountValue=$scope.query.discountValue;
        $scope.totalPayment=$scope.query.totalPayment;
        $scope.client=$scope.query.client;
        $scope.aPriceT=$scope.query.aPriceT;
        $scope.tPriceT=$scope.query.tPriceT;
        $scope.tdiscountT=$scope.query.tdiscountT;
        $scope.fPrice=$scope.query.fPrice;
        $scope.period=$scope.query.period;
        $scope.print=function () {
            var usercss = '@page { size : portrait A4 }';

            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = usercss;
            document.body.appendChild(css);
            window.print();
        };

    }]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('printCollectingPaperController', ["$stateParams", "$scope", function ($stateParams,$scope) {
        // console.log($stateParams.q);
        $scope.query=JSON.parse($stateParams.q);
        $scope.order=$scope.query.order;
        $scope.products=$scope.query.products;
        $scope.productCount=$scope.query.productCount;
        $scope.discountValue=$scope.query.discountValue;
        $scope.totalPayment=$scope.query.totalPayment;
        $scope.client=$scope.query.client;
        $scope.aPriceT=$scope.query.aPriceT;
        $scope.tPriceT=$scope.query.tPriceT;
        $scope.tdiscountT=$scope.query.tdiscountT;
        $scope.fPrice=$scope.query.fPrice;
        $scope.period=$scope.query.period;
        $scope.stocks=$scope.query.stocks;
        $scope.print=function () {
            var usercss = '@page { size : landscape A4 }';

            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = usercss;
            document.body.appendChild(css);
            window.print();
        };

    }]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('printOrderReceiptController', ["$stateParams", "$scope", function ($stateParams,$scope) {
        // console.log($stateParams.q);
        $scope.orders=JSON.parse($stateParams.q);
        $scope.print=function () {
            var usercss = '@page { size : landscape A5 }';

            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = usercss;
            document.body.appendChild(css);
            window.print();
        };

    }]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('printPostInvoiceController', ["$stateParams", "$scope", "$auth", "$state", "$http", "$rootScope", "AclService", function ($stateParams,$scope,$auth,$state,$http,$rootScope,AclService) {
        console.log($stateParams.q);
        $scope.order=JSON.parse($stateParams.q);
        $scope.totalPayment=0;
        $scope.order.products.forEach(function (product) {
            $scope.totalPayment+=  product.pivot.approved_count*(product.pivot.Aprice-product.pivot.Adiscount);
        });
        $scope.print=function () {
            var usercss = '@page { size : portrait A4 }';
            //
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = usercss;
            document.body.appendChild(css);
            window.print();
        };

        if($scope.order.payType===0){
            $scope.price=0;
            $scope.order.products.forEach(function (product) {
                $scope.price+=(product['pivot']['Aprice']-product['pivot']['Adiscount'])*product['pivot']['approved_count'];
            });
            if($scope.price>50000){
                $scope.payType=88;
            }else{
                $scope.payType=1;
            }
        }
    }]);

/**
 * Created by alireza on 12/25/16.
 */
angular.module('adminPanel')
    .controller('printSummaryPostInvoiceController', ["$stateParams", "$scope", "$auth", "$state", "$http", "$rootScope", "AclService", function ($stateParams,$scope,$auth,$state,$http,$rootScope,AclService) {
        $scope.order=JSON.parse($stateParams.q);
        $scope.totalPayment=0;
        $scope.order.products.forEach(function (product) {
            $scope.totalPayment+=  product.pivot.approved_count*(product.pivot.Aprice-product.pivot.Adiscount);
        });
        $scope.print=function () {
            var usercss = '@page { size : portrait A5 }';
            //
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = usercss;
            document.body.appendChild(css);
            window.print();
        };
        if($scope.order.payType===0){
            $scope.price=0;
            $scope.order.products.forEach(function (product) {
                $scope.price+=(product['pivot']['Aprice']-product['pivot']['Adiscount'])*product['pivot']['approved_count'];
            });
            if($scope.price>50000){
                $scope.payType=88;
            }else{
                $scope.payType=1;
            }
        }
    }]);
