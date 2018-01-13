app.controller("mainController", function ($scope, $interval, ganttChart) {
    $scope.test = "Angular Works";
    $scope.initGantt = google.charts.load('current', {'packages': ['gantt']});
    $scope.todoList = [];
    google.charts.setOnLoadCallback(function() {
        if ($scope.todoList.length > 0) {
            ganttChart.drawChart($scope.todoList);
        }
        
    });

    $scope.authorizeTrelloAccess = function () {
        Trello.authorize("Project Management Tool");
        $scope.applicationAuthorized = true;
    };

    $scope.getList = function() {
        $scope.result = Trello.lists.get("5a008ddf7f0afee2bb74b510", {cards: "open"}, function () {
            if (typeof $scope.result.responseText !== 'undefined') {
                $scope.todoList = JSON.parse($scope.result.responseText);
                console.log($scope.todoList);
                //ganttChart.drawChart($scope.todoList);
                
            }
        });
    };
    

//    $interval(function () {
//        $scope.result = Trello.lists.get("5a008ddf7f0afee2bb74b510", {cards: "open"}, function () {
//            if (typeof $scope.result.responseText !== 'undefined') {
//                $scope.todoList = JSON.parse($scope.result.responseText);
//                console.log($scope.todoList);
//                ganttChart.drawChart($scope.todoList);
//                
//            }
//        });
//    }, 10000);
    
    
}
);






