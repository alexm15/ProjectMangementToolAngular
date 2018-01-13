app.service("trelloService", function () {
    this.createCard = function (card_name, card_desc, start_date, due_date) {
        console.log(start_date);
        var newCard = {
            name: card_name,
            desc: card_desc + this.appendStartDate(start_date),
            //due: this.convertStringToDate(due_date).toISOString(),
            due: due_date.toISOString(),
            // Place this card at the top of our list 
            idList: "5a008ddf7f0afee2bb74b510",
            pos: 'top'
        };

        Trello.post('/cards/', newCard, function(){
            console.log("Refresh list now.");
        }, function () {
            console.log(newCard);
        });
    };

    this.testService = function() {
        console.log("Hello from trelloService");
    };

    this.convertStringToDate = function (dateAsString) {
        console.log("date to convert: " + dateAsString);
        var dateArray = dateAsString.split("-");
        var dateObj = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); //month is 0-based
        return dateObj;
    };

    this.appendStartDate = function (date) {
//        console.log("Before convertion to date: " + date);
//        var dateObj = this.convertStringToDate(date);
//        console.log("after convertion: " + dateObj);
//        console.log("As ISOString: " + dateObj.toISOString());
        return " Start Date:" + date.toISOString();

    };
});


