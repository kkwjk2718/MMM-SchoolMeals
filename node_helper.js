var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-SchoolMeals helper started...");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_MEALS") {
            this.getMeals(payload);
        }
    },

    getMeals: function(config) {
        var url = "https://open.neis.go.kr/hub/mealServiceDietInfo";

        // 현재 날짜를 yyyyMMdd 형식으로 설정
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var formattedToday = yyyy + mm + dd;
        var requestUrl = `${url}?KEY=${config.apiKey}&Type=json&plndex=1&pSize=30&ATPT_OFCDC_SC_CODE=${config.atptOfcdcScCode}&SD_SCHUL_CODE=${config.sdSchulCode}&MLSV_YMD=${formattedToday}`;

        request(requestUrl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).mealServiceDietInfo[1].row;
                this.sendSocketNotification("MEALS_RESULT", result);
            }
        });
    }
});
