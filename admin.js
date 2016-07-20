   var app = angular.module('myApp', ['ngRoute'], ['ngSanitize']);

  
   app.controller('pageController', ['$scope', 'Pages', function ($scope, Pages, $http) {
    $scope.get_page_data = function() {
        $http.post('/get_page_data').
        success(function(data) {
			$scope.pages = data;
        })
    };
    
  }])
  
  .controller('itemCtrl', ['$scope', '$routeParams', 'Items', function ($scope, $routeParams, Items, $http) {
    $scope.get_item_data = function() {
        $http.post('/get_item_data').
        success(function(data) {
			$scope.items = data;
        })
    };
  }])
  
 .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/page', {
        templateUrl: '/page.html',
        controller: 'pageController'
      })
    
      .when('/item', {
        templateUrl: '/item.html',
        controller: 'itemCtrl'
     })
     .otherwise({
              redirectTo: '/',
              templateUrl: '/home.html',
              controller: function ($scope) {
                    $scope.message = 'Admin Page';
                }
            });
  }]);
/*
    어드민 페이지에 넣어야할 기능
페이지 관리 ->
현재 페이지 목록 보여주기
페이지 추가 및 삭제기능


제품 관리 ->
제품 현황:제품이름, 가격, 좋아요개수
제품 추가, 수정, 삭제
*/

<body ng-app="myApp">
    <ng-view></ng-view>
    <script type="text/ng-template" id="/home.html">
      <h1>{{message}}</h1>
          <a href="#/page"><button>페이지 관리</button></a>
    <a href="#/item"><button>제품 관리</button></a>
</script>
    <script type="text/ng-template" id="/page.html">
  <ul>
    <li ng-repeat="page in pages">
      
    </li>
  </ul>
</script>
  <script type="text/ng-template" id="/item.html">
  <ul>
    <li ng-repeat="item in items">
      
    </li>
  </ul>
</script>
</body>