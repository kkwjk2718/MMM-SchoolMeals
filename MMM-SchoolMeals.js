Module.register("MMM-SchoolMeals", {
    defaults: {
    },

    start: function() {
        this.meals = [];
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
    
        // 조식, 중식, 석식 표시부분
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>조식</th><th>중식</th><th>석식</th>";
        wrapper.appendChild(headerRow);
    
        var meals = ["조식", "중식", "석식"];
        var mealsRow = document.createElement("tr");
        var caloriesRow = document.createElement("tr");
    
        meals.forEach((meal, index) => {
            if (this.meals.length > index && this.meals[index].MMEAL_SC_NM === meal) {
                // 식사 정보가 존재하는 경우
                mealsRow.innerHTML += `<td>${this.meals[index].DDISH_NM.trim() === "" ? "급식 없음" : this.meals[index].DDISH_NM.replace(/\([^)]*\)/g, '').replace(/\s+/g, ', ')}</td>`;
                caloriesRow.innerHTML += `<td>${this.meals[index].CAL_INFO || ""}</td>`;
            } else {
                // 식사 정보가 존재하지 않는 경우
                mealsRow.innerHTML += "<td>급식 없음</td>";
                caloriesRow.innerHTML += "<td></td>";
            }
        });
    
        wrapper.appendChild(mealsRow);
        wrapper.appendChild(caloriesRow);
    
        return wrapper;
    },
    

    socketNotificationReceived: function(notification, payload) {
        if (notification === "MEALS_RESULT") {
            this.meals = payload;
            this.updateDom();
        }
    }
});
