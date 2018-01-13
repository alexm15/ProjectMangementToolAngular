app.service("ganttChart", function () {

    this.daysToMilliseconds = function (days) {
        return days * 24 * 60 * 60 * 1000;
    };
    
    this.testService = function() {
        console.log("Hello from ganttChart");
    };

    this.drawChart = function (taskList) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Task ID');
        data.addColumn('string', 'Task Name');
        data.addColumn('string', 'Resource');
        data.addColumn('date', 'Start Date');
        data.addColumn('date', 'End Date');
        data.addColumn('number', 'Duration');
        data.addColumn('number', 'Percent Complete');
        data.addColumn('string', 'Dependencies');

        var options = {
            height: 600
        };

        var trelloCards = taskList.cards;
        for (var i = 0; i < trelloCards.length; i++) {
            var id = trelloCards[i].id;
            var name = trelloCards[i].name;
            var start_date = this.getStartDate(trelloCards[i]);
            var due_date = this.getDueDate(trelloCards[i]);
            data.addRow([id, name, "Trello Card", start_date, due_date, null, 0, null]);
        }

        var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
        chart.draw(data, options);
    };

    this.getStartDate = function (card) {
        if (card.desc.includes("Start Date:")) {
            var posOfColon = card.desc.search(":");
            // console.log("':' position: " + posOfColon);

            var dateSubstring = card.desc.substring(posOfColon + 1, card.desc.length);
            // console.log("date substring: " + dateSubstring);
            // console.log(card.name + " start date: " + new Date(dateSubstring));
            return new Date(dateSubstring);
        } else {
            //console.log(card.name + " start date: " + new Date(2017, 10, 01));
            return new Date(2017, 10, 01); //default start date
        }
    };

    this.getDueDate = function (card) {
        if (card.due !== null) {
            // console.log(card.name + " due date: " + new Date(card.due));
            return new Date(card.due);
        } else {
            //console.log(card.name + " due date: " + new Date(2017, 11, 15));
            return new Date(2017, 11, 15); // default due date
        }
    };


});

