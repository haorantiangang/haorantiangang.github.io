/**
 * Created by lxf on 16/4/6.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl',
	function($scope) {
		$scope.message = "";
		$scope.ctrlScope = $scope;

		$scope.phones="";
		$scope.one=function(){
			$scope.message="5元说明"
		}
		$scope.two=function(){
			$scope.message="10元说明"
		}
		$scope.three=function(){
			$scope.message="20元说明"
		}
		$scope.four=function(){
			$scope.message="25元说明"
		}
		$scope.five=function(){
			$scope.message="30元说明"
		}
		$scope.six=function(){
			$scope.message="50元说明"
		}
		$scope.go=function(){
			var phonematch = /^1[3|4|5|8][0-9]\d{8}$/;

//            alert("hahaha"+$scope.phones);
			if(!$scope.phones.match(phonematch))
			{
				alert("手机格式不正确");
			}else
				alert("购买成功");
		}
	}
);