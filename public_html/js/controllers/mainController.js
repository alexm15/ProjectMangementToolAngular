app.controller("mainController", function ($scope, $interval, ganttChart, trelloService) {
    $scope.initGantt = google.charts.load('current', {'packages': ['gantt']});
    $scope.todoList = [];
    $scope.cardName = "";
    $scope.cardDesc = "";
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    
    google.charts.setOnLoadCallback(function () {
        if ($scope.todoList.length > 0) {
            ganttChart.drawChart($scope.todoList);
        }

    });

    $scope.testService = function () {
        trelloService.testService();
    };

    $scope.createCard = function () {
        trelloService.createCard($scope.cardName, $scope.cardDesc, $scope.startDate, $scope.endDate);
    };

    $scope.authorizeTrelloAccess = function () {
        Trello.authorize("Project Management Tool");
        $scope.applicationAuthorized = true;
    };

//    $scope.getList = function() {
//        $scope.result = Trello.lists.get("5a008ddf7f0afee2bb74b510", {cards: "open"}, function () {
//            if (typeof $scope.result.responseText !== 'undefined') {
//                $scope.todoList = JSON.parse($scope.result.responseText);
//                console.log($scope.todoList);
//                //ganttChart.drawChart($scope.todoList);
//                
//            }
//        });
//    };


    $interval(function () {
        $scope.result = Trello.lists.get("5a008ddf7f0afee2bb74b510", {cards: "open"}, function () {
            if (typeof $scope.result.responseText !== 'undefined') {
                $scope.todoList = JSON.parse($scope.result.responseText);
                //console.log($scope.todoList);
                ganttChart.drawChart($scope.todoList);

            }
        });
    }, 1000);




}
);






