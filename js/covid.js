// VARIABLES 
var radio1 = document.getElementsByName("radio");
var radio2 = document.getElementsByName("check");
var radio3 = document.getElementsByName("check1");
var rad1div = document.getElementsByClassName("work-div")
var rad2div = document.getElementsByClassName("contact-div")
var rad3div = document.getElementsByClassName("vaccinated-div")
var radio1Answer;
var radio2Answer;
var radio3Answer;
var nextpagebutton = document.getElementsByClassName("next-img");
var errorsarray = []

// ERRORS VALIDATION
errorsarray["radio"] = { title: 'This question required', div: rad1div, index: 4 }
errorsarray["check"] = { title: 'This question required', div: rad2div, index: 3 }
errorsarray["check1"] = { title: 'This question required', div: rad3div, index: 3 }
errorsarray["date1"] = { title: '' }
errorsarray["date2"] = { title: '' }

//WRITEERROR FUNCTION
function writeerror(field, error, index) {
    field[0].children[index].innerHTML = error
}
// SHOW DATE IF IT IS AVAILABLE
function showdate(parent, value, question) {
    var newdiv = document.createElement("div")
    newdiv.className = "when-div"
    var questionspan = document.createElement("span")
    questionspan.className = "when-span"
    questionspan.innerHTML = question
    var dateinputdiv = document.createElement("div")
    dateinputdiv.className = "date-div"
    var input = document.createElement("input")
    input.type = "date"
    input.className = "when-input"
    input.value = value
    input.id = "covid-date"
    input.placeholder = "date"
    var errormessage = document.createElement("h4")
    dateinputdiv.appendChild(input)
    newdiv.appendChild(questionspan)
    newdiv.appendChild(dateinputdiv)
    newdiv.appendChild(errormessage)
    parent.appendChild(newdiv)
}

// TAKE LOCALSTORAGE DATA AND CHECK RADIO
if (localStorage.getItem('work_preference') && localStorage.getItem('work_preference') == "office") {
    radio1[0].checked = true
    radio1Answer = radio1[0].value
    errorsarray["radio"].title = ""
} else if (localStorage.getItem('work_preference') == "home") {
    radio1[1].checked = true
    radio1Answer = radio1[1].value
    errorsarray["radio"].title = ""
} else if (localStorage.getItem("work_preference") == "hybrid") {

    radio1[2].checked = true
    radio1Answer = radio1[2].value
    errorsarray["radio"].title = ""
}

// TAKE LOCALSTORAGE DATA AND WRITE CORRECT DATE FOR HAD COVID
if (localStorage.getItem('had_covid_at')) {
    showdate(rad2div[0], localStorage.getItem('had_covid_at'), "When?")
    radio2[0].checked = true
    radio2Answer = radio2[0].value
    errorsarray["check"].title = ""
} else {
    if (localStorage.getItem("had_covid") == "false") {
        radio2[1].checked = true
        radio2Answer = radio2[1].value
        errorsarray["check"].title = ""
    }
}

// TAKE LOCALSTORAGE DATA AND WRITE CORRECT DATE FOR VACCONATED
if (localStorage.getItem('vaccinated_at')) {
    showdate(rad3div[0], localStorage.getItem('vaccinated_at'), "When did you get your last covid vaccine?")
    radio3[0].checked = true
    radio3Answer = radio3[0].value
    errorsarray["check1"].title = ""
} else {
    if (localStorage.getItem("vaccinated") == "false") {
        radio3[1].checked = true
        radio3Answer = radio3[1]
        errorsarray["check1"].title = ""
    }
}

//RADIO ANSWERS SELECT AND VALIDATION
radio1.forEach((rad1) => {
    rad1.addEventListener('click', () => {
        radio1Answer = rad1.value;
        errorsarray["radio"].title = ''
        writeerror(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
    })
})

// CHECK RADIO ANSWER AND CREATE DATE INPUT
radio2.forEach((rad2) => {
    rad2.addEventListener('click', () => {
        errorsarray["check"].title = ''
        writeerror(errorsarray["check"].div, errorsarray["check"].title, errorsarray["check"].index)
        radio2Answer = rad2.value;
        if (rad2.value == "yes") {
            if (rad2div[0].children.length > 4) {
                newdiv.parentElement.remove()
            }
            showdate(rad2div[0], "", "When?")
        } else {
            if (rad2div[0].children.length > 4)
                rad2div[0].lastChild.remove()
            errorsarray["date1"].title = ""
            if (localStorage.getItem("had_covid_at")) {
                localStorage.removeItem("had_covid_at")
            }
        }
    })
})

// CHECK RADIO ANSWER AND CREATE DATE INPUT
radio3.forEach((rad3) => {
    rad3.addEventListener('click', () => {
        radio3Answer = rad3.value;
        errorsarray["check1"].title = ''
        writeerror(errorsarray["check1"].div, errorsarray["check1"].title, errorsarray["check1"].index)
        if (rad3.value == "yes") {
            if (rad3div[0].children.length > 4) {
                newdiv.parentElement.remove()
            }
            showdate(rad3div[0], "", "When did you get your last covid vaccine?")
        } else {
            if (rad3div[0].children.length > 4)
                rad3div[0].lastChild.remove()
            errorsarray["date2"].title = ""
            if (localStorage.getItem("vaccinated_at")) {
                localStorage.removeItem("vaccinated_at")
            }
        }
    })
})

//CKECKED IF RADIO ANSWERS ARE EMPTY OR NOT
function RadiosAreEmpty() {
    if (radio1Answer == null) {
        writeerror(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
    } else {
        errorsarray["radio"].title = ''
        writeerror(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
    }
    if (radio2Answer == null) {
        writeerror(errorsarray["check"].div, errorsarray["check"].title, errorsarray["check"].index)
    } else {
        errorsarray["check"].title = ''
        writeerror(errorsarray["check"].div, errorsarray["check"].title, errorsarray["check"].index)
    }
    if (radio3Answer == null) {
        writeerror(errorsarray["check1"].div, errorsarray["check1"].title, errorsarray["check1"].index)
    } else {
        errorsarray["check1"].title = ''
        writeerror(errorsarray["check1"].div, errorsarray["check1"].title, errorsarray["check1"].index)
    }
}

///CKECKED IF DATE STRING IS EMPTY OR NOT
function checkifdateisempty(input) {
    if (input == "") {
        return true
    } else {
        return false
    }
}

//CHECK CHILDRENNODES LENGTH
function childrennodesn(parent) {
    if (parent.children.length > 4) {
        return true
    } else {
        return false
    }
}

//IF YOU CLICK THIS BUTTON IT WILL GO NEXT PAGE
nextpagebutton[0].addEventListener('click', () => {
    RadiosAreEmpty()
    if (childrennodesn(rad2div[0])) {
        var inputvalue1 = rad2div[0].children[4].children[1].firstChild
        if (checkifdateisempty(inputvalue1.value)) {
            errorsarray["date1"].title = 'Date is required'
            rad2div[0].children[4].children[2].innerHTML = 'Date is required'
        } else {
            errorsarray["date1"].title = ''
            rad2div[0].children[4].children[2].innerHTML = ''
        }
    }
    //CKECKED IF VACCINATED DATE EXITS OR NOT
    if (childrennodesn(rad3div[0])) {
        var inputvalue2 = rad3div[0].children[4].children[1].firstChild
        if (checkifdateisempty(inputvalue2.value)) {
            errorsarray["date2"].title = 'Date is required'
            rad3div[0].children[4].children[2].innerHTML = 'Date is required'
        } else {
            errorsarray["date2"].title = ''
            rad3div[0].children[4].children[2].innerHTML = ''
        }
    }
    //CKECKED IF NO ERRORS SAVE EVERYTHING IN LOCALSTORAGE
    if (errorsarray["radio"].title == "" && errorsarray["check"].title == "" && errorsarray["check1"].title == "" && errorsarray["date1"].title == "" && errorsarray["radio"].title == "") {
        localStorage.setItem('work_preference', radio1Answer);
        if (radio2Answer == "yes") {
            localStorage.setItem('had_covid', true);
        } else {
            localStorage.setItem('had_covid', false);
        }
        if (childrennodesn(rad2div[0])) {
            var inputvalue1 = rad2div[0].children[4].children[1].firstChild.value
            localStorage.setItem('had_covid_at', inputvalue1);
        }
        if (radio3Answer == "yes") {
            localStorage.setItem('vaccinated', true);
        } else {
            localStorage.setItem('vaccinated', false);
        }

        if (childrennodesn(rad3div[0])) {
            var inputvalue2 = rad3div[0].children[4].children[1].firstChild.value
            localStorage.setItem('vaccinated_at', inputvalue2);
        }
        window.location.replace("../Redberrian-Insights.html");
    }

})
