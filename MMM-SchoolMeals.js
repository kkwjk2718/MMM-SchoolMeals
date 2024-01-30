Module.register("MMM-SchoolMeals", {
    defaults: {
        // 여기에 기본 설정을 추가하세요.
    },

    start: function() {
        this.meals = [];
        this.getMeals();

        // 매일 자정에 급식 정보 업데이트
        var self = this;
        var refreshSchedule = function() {
            var now = new Date();
            var millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
            if (millisTillMidnight < 0) {
                millisTillMidnight += 86400000; // 다음날로
            }
            setTimeout(function() {
                self.getMeals();
                refreshSchedule(); // 다음날을 위해 재설정
            }, millisTillMidnight);
        };

        refreshSchedule();
    },

    getMeals: function() {
        this.sendSocketNotification("GET_MEALS", this.config);
    },

    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return [];
    },

    getDom: function() {
        var wrapper = document.createElement("table");
        wrapper.className = "small table";
    
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>조식</th><th>중식</th><th>석식</th>";
        wrapper.appendChild(headerRow);
    
        var mealsRow = document.createElement("tr");
        var caloriesRow = document.createElement("tr");
        var mealsTypes = { "조식": "급식 없음", "중식": "급식 없음", "석식": "급식 없음" };
        var caloriesTypes = { "조식": "", "중식": "", "석식": "" };
    
        this.meals.forEach(meal => {
            var mealName = meal.MMEAL_SC_NM; // 식사 유형 (조식, 중식, 석식)
            var mealInfo = meal.DDISH_NM.trim() === "" ? "급식 없음" : meal.DDISH_NM.replace(/\([^)]*\)/g, '').replace(/\s+/g, ', ');
            var calInfo = meal.CAL_INFO || "";
            mealsTypes[mealName] = mealInfo;
            caloriesTypes[mealName] = calInfo;
        });
    
        // 각 식사 유형에 맞는 데이터를 행에 추가
        mealsRow.innerHTML += `<td>${mealsTypes["조식"]}</td>`;
        mealsRow.innerHTML += `<td>${mealsTypes["중식"]}</td>`;
        mealsRow.innerHTML += `<td>${mealsTypes["석식"]}</td>`;
    
        caloriesRow.innerHTML += `<td>${caloriesTypes["조식"]}</td>`;
        caloriesRow.innerHTML += `<td>${caloriesTypes["중식"]}</td>`;
        caloriesRow.innerHTML += `<td>${caloriesTypes["석식"]}</td>`;
    
        wrapper.appendChild(mealsRow);
        wrapper.appendChild(caloriesRow);
    
        return wrapper;
    }
,    

    socketNotificationReceived: function(notification, payload) {
        if (notification === "MEALS_RESULT") {
            this.meals = payload;
            this.updateDom();
        }
    }
});
