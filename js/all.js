$.fn.exists = function () {
    return this.length !== 0;
}

if($('.animation').exists()){
    const timeline = gsap.timeline();
    timeline.from('.animation', { opacity: 0, duration: 1, stagger: 0.5});
}

const isArrEqual = (arr1, arr2) => {
    return arr1.join("") === arr2.join("") ? true : false;
};

if ($("#productBacklogSort").exists()) {
    let productBacklogDOM = $("#productBacklogSort")[0];
    const answerAry = ["1", "2", "3", "4"];
    let productBacklog = Sortable.create(productBacklogDOM, {
        group: "shart",
        onUpdate: () => { // 順序變動時 (項目數量新增、減少時，不會啟動)
            let order = productBacklog.toArray();
            const answerrr = isArrEqual(order, answerAry); // true
            if (answerrr === false) {
                messageShow("哦歐！排序錯誤，請再調整順序");
            }
        }
    });
};

if ($("#productBacklog").exists() && $('#springBacklog').exists()) {
    let productBacklogDOM = $("#productBacklog")[0];
    let springBacklogDOM = $("#springBacklog")[0];
    let standardScore = 20;
    var totalScoreDOM = $(".totalScore");
    var springSortableObj = Sortable.create(springBacklogDOM, {
        group: "dnd", //drag and drop，同一個 group 可以互相拖曳
        animation: 10,
        dataIdAttr: "data-score", // 拖動後的順序，默認 data-id
        onEnd: () => {
            calScore(springSortableObj, standardScore, totalScoreDOM, "超過" + standardScore + "點，請再調整清單");
        }
    });
    let productbacklogSortableObj = Sortable.create(productBacklogDOM, {
        group: "dnd", //drag and drop，同一個 group 可以互相拖曳
        animation: 10,
        dataIdAttr: "data-score", // 拖動後的順序，默認 data-id
        onEnd: () => {
            calScore(springSortableObj, standardScore, totalScoreDOM, "超過" + standardScore + "點，請再調整清單");
        }
    }
    );
}

if ($('#startSprint').exists()) {
    $('#startSprint').on('click', function () {
        let standardScore = 20;
        let calScoreResult = calScore(springSortableObj, standardScore, totalScoreDOM, "超過" + standardScore + "點，請再調整清單");
        if (calScoreResult) {
            location.href = "introducePage_sprint.html";
        }
    })
}

if ($('#springListDrag').exists() && $('#springListDragResult').exists()) {
    let springListDragDOM = $("#springListDrag")[0];
    let springListDragResultDOM = $("#springListDragResult")[0];
    var springListArr = [];
    var springListDragResultObj = Sortable.create(springListDragResultDOM, {
        group: "dnd", //drag and drop，同一個 group 可以互相拖曳
        animation: 10,
        onEnd: (event) => {
            springListArr = springListDragResultObj.toArray();
        }

    });
    var springListDragObj = Sortable.create(springListDragDOM, {
        group: "dnd", //drag and drop，同一個 group 可以互相拖曳
        animation: 10,
        onEnd: (event) => {
            springListArr = springListDragResultObj.toArray();
        }
    });
}

if ($('#finsihSprint').exists()) {
    $('#finsihSprint').on('click', function () {
        const answerAry = ["1", "2"];
        const answerrr = isArrEqual(springListArr, answerAry); // true
        if (!springListArr.length) {
            messageShow("尚未置入任何項目，請置入項目");
        }
        else if (answerrr === false) {
            messageShow("置入錯誤，請重新置入");
        }
        else {
            location.href = "feedback.html";
        }
    })
}

if ($('#gotoFinish').exists()) {
    $('#gotoFinish').on('click', function () {
        let question1 = $("[name='radioGroup1']:checked").val();
        let question2 = $("[name='radioGroup2']:checked").val();
        if (question1 == undefined || question2 == undefined) {
            messageShow("尚未選擇，請選擇適合的答案");
        }
        else if (question1 == "false" || question2 == "false") {
            messageShow("選擇錯誤，請再思考一下");
        }
        else{
            location.href = "finishPage.html";
        }
    })
}

function messageShow(content) {
    $('.messageContent').text(content);
    $("#message").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
    });
}

function calScore(sortableObj, standardScore, resultDOM, errorMessageContent) {
    let totalScore = 0;
    totalScore = sortableObj
        .toArray()
        .map((ele) => parseInt(ele, 10)) // 轉 10 進位
        .reduce((a, b) => a + b, 0); // 將陣列化為單一值，a 前一次的結果 、 b 目前的元素，0 為初始值

    resultDOM.text(totalScore);

    if (totalScore > standardScore) {
        resultDOM.addClass("warning");
        messageShow(errorMessageContent);
        return false;
    }
    else if (totalScore === 0) {
        messageShow("尚未置入任何項目，請置入項目");
        return false;
    }
    else {
        resultDOM.removeClass("warning");
        return true;
    }
}


