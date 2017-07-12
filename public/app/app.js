var app = angular.module('bookapp', ['ui.router', 'angular-loading-bar', 'angularUtils.directives.dirPagination']);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
})
app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "templates/home.html"
			})
			.state('Newbook', {
				url: "/addnew",
				templateUrl: "templates/newbook.html"
			})
			.state('Editbook', {
				url: "/editbook",
				templateUrl: "templates/editbook.html"
			})
	}
]);

app.run(function($rootScope, $state) {
	$rootScope.$state = $state;
});

app.service('sharedbook', function() {
	var property = [];
	return {
		getProperty: function() {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
});

app.filter('searchFor', function() {
	return function(arr, searchBook) {
		if (!searchBook) {
			return arr;
		}
		var result = [];
		searchBook = searchBook.toLowerCase();
		angular.forEach(arr, function(item) {
			if (item.bookname.toLowerCase().indexOf(searchBook) !== -1 || item.authorname.toLowerCase().indexOf(searchBook) !== -1) {
				result.push(item);
			}
		});
		return result;
	};
});

app.controller('book-list', function($scope, $state, $http, sharedbook, $filter) {
	$scope.booklist = {};
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$http.get("/book").success(function(response) {
			$scope.booklist = response.Books;
			$scope.items2 = $scope.booklist;
			$scope.$watch('searchBook', function(val) {
				$scope.booklist = $filter('searchFor')($scope.items2, val);
			});
	});

	$scope.editBook = function($index) {
		$scope.number = ($scope.pageSize * ($scope.currentPage - 1)) + $index;
		sharedbook.setProperty($scope.booklist[$scope.number]);
		$state.go('Editbook');
	};

	$scope.deleteBook = function($index) {
		$scope.number = ($scope.pageSize * ($scope.currentPage - 1)) + $index;
		$http.delete("/book/" + $scope.booklist[$scope.number].bookname).success(function(res) {
				$state.go($state.current, {}, {
					reload: true
				});
		});
	};
});

app.controller('add-new-book', function($scope, $http, $state) {
	$scope.bookdata = {};
	$scope.addBook = function() {
		var payload = {
			"bookname": $scope.bookdata.bookname,
			"authorname": $scope.bookdata.authorname,
			"price": $scope.bookdata.price
		}
		$http.post("/book", payload).success(function(res) {
				$state.go("home");
		});
	};
});

app.controller('edit-book', function($scope, $http, $state, sharedbook) {
	$scope.bookdata = sharedbook.getProperty();
	$scope.updateBook = function() {
		var payload = {
			"id": $scope.bookdata._id,
			"bookname": $scope.bookdata.bookname,
			"authorname": $scope.bookdata.authorname,
			"price": $scope.bookdata.price
		}
		console.log(payload,"pppppp") 
		$http.put("/book", payload).success(function(res) {
				$state.go("home");
		});
	};
	$scope.cancel = function() {
		$state.go("home");
	};
});