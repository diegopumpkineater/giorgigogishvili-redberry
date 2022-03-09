// VARIABLES
var radioquestion = document.getElementsByName("check")
var devtalksquestion = document.getElementsByClassName("devtalks-input")
var specialquestion = document.getElementsByClassName("tell-input")
var rad1div = document.getElementsByClassName("devtalks-div")
var devtalksdiv = document.getElementsByClassName("devtalks-speak-div")
var specialdiv = document.getElementsByClassName("tell-div")
var radioanswer
var nextbutton = document.getElementsByClassName("next-img")

// ERRORS ARAAY
var errorsarray = []
errorsarray["radio"] = { title: 'This question is required', div: rad1div, index: 3 }
errorsarray["devTalk"] = { title: '', div: devtalksdiv, index: 2 }
errorsarray["special"] = { title: 'This input is required', div: specialdiv, index: 2 }

// VALIDATION OF ERRORS
function checkErrors() {
    if (radioanswer == null || radioanswer == "") {
        writeError(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
    } else {
        errorsarray["radio"].title = ''
        writeError(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
    }
    if (devtalksdiv[0] != null) {
        if (devtalksquestion[0].value == null || devtalksquestion[0].value == "") {
            writeError(errorsarray["devTalk"].div, errorsarray["devTalk"].title, errorsarray["devTalk"].index)
        } else {
            errorsarray["devTalk"].title = ''
            writeError(errorsarray["devTalk"].div, errorsarray["devTalk"].title, errorsarray["devTalk"].index)
        }
    }
    if (specialquestion[0].value == null || specialquestion[0].value == "") {
        specialquestion[0].parentElement.children[specialquestion[0].parentElement.children.length - 1].innerHTML = errorsarray["special"].title
        writeError(errorsarray["special"].div, errorsarray["special"].title, errorsarray["special"].index)
    } else {
        errorsarray["special"].title = ""
        writeError(errorsarray["special"].div, errorsarray["special"].title, errorsarray["special"].index)
    }
}

// IF THERE ARE SOME ERRORS OUTPUT ERRORS
function writeError(field, error, index) {
    field[0].children[index].innerHTML = error
}

// DRAW DEVTALKS TEXT BOXES
function drawDevTalkBox(divclassname, spanclassname, spaninnerhtml, textareaclass, textareaplacehodlder, textareaname, h4class) {
    var div = document.createElement("div")
    div.className = divclassname

    var span = document.createElement("span")
    span.className = spanclassname
    span.innerHTML = spaninnerhtml

    var textarea = document.createElement("textarea")
    textarea.cols = "68"
    textarea.rows = "7"

    textarea.className = textareaclass
    textarea.placeholder = textareaplacehodlder
    textarea.name = textareaname

    var h4 = document.createElement("h4")
    h4.className = h4class

    div.appendChild(span)
    div.appendChild(textarea)
    div.appendChild(h4)

    var leftsidediv = document.getElementsByClassName("left-side")
    leftsidediv[0].appendChild(div)

}

// CHECK IF YOU CKLICK ON THIS RADIO
radioquestion.forEach((rad1) => {
    rad1.addEventListener('click', () => {
        radioanswer = rad1.value;
        errorsarray["radio"].title = ''
        writeError(errorsarray["radio"].div, errorsarray["radio"].title, errorsarray["radio"].index)
        if (rad1.value == "yes") {
            if (devtalksdiv[0] != null) {
                if (devtalksdiv[0].lastElementChild.className == "devtalks-h4") {
                    devtalksquestion[0].parentElement.remove()
                }
                if (specialdiv[0].lastElementChild.className == "special-h4") {
                    specialquestion[0].parentElement.remove()
                }
            }
            drawDevTalkBox("devtalks-speak-div", "devtalks-speak-span", "What would you speak about at Devtalk?", "devtalks-input", "I would...", "devtalks-txt", "devtalks-h4")
            errorsarray["devTalk"].title = "This question is required, Please fill it"
            errorsarray["special"].title = "This question is required, Please fill it"
            // GIVE TEXT BOX EVENTLISTENER 
            devtalksquestion[0].addEventListener("input", () => {
                if (devtalksquestion[0].value == null || devtalksquestion[0].value == "") {
                    errorsarray["devTalk"].title = 'This question is required, Please fill it'
                    devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devTalk"].title
                } else {
                    errorsarray["devTalk"].title = ''
                    devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devTalk"].title
                }
            })

            specialquestion[0].addEventListener("input", () => {
                if (specialquestion[0].value == null || specialquestion[0].value == "") {
                    errorsarray["special"].title = 'This question is required, Please fill it'
                    specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
                } else {
                    errorsarray["special"].title = ''
                    specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
                }
            })
            // IF ANSWERD IS NO DELETE ALL TEXT BOXES
        } else if (rad1.value == "no") {
            if (devtalksquestion[0] != null) {
                if (devtalksdiv[0].lastElementChild.className == "devtalks-h4") {
                    devtalksquestion[0].parentElement.remove()
                }

            }
            specialquestion[0].addEventListener("input", () => {
                if (specialquestion[0].value == null || specialquestion[0].value == "") {
                    errorsarray["special"].title = 'This question is required, Please fill it'
                    specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
                } else {
                    errorsarray["special"].title = ''
                    specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
                }

            })
            errorsarray["devTalk"].title = ""
        }
    })
})

// SAVE DATA IN LOCALSTORAGE AND VALIDATE INPUTS
if (localStorage.getItem("will_organize_devtalk") == "true") {
    radioquestion[0].checked = true
    errorsarray["radio"].title = ""
    // IF YES IS SAVED LOCAL STORAGE DRAW TEXBOX
    drawDevTalkBox("devtalks-speak-div", "devtalks-speak-span", "What would you speak about at Devtalk?", "devtalks-input", "I would...", "devtalks-txt", "devtalks-h4")
    // GIVING TEXBOXES OWN EVENT LISTENER
    devtalksquestion[0].addEventListener("input", () => {
        if (devtalksquestion[0].value == null || devtalksquestion[0].value == "") {
            errorsarray["devTalk"].title = 'This question is required, Please fill it'
            devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devTalk"].title
        } else {
            errorsarray["devTalk"].title = ''
            devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devTalk"].title
        }
    })

    specialquestion[0].addEventListener("input", () => {
        if (specialquestion[0].value == null || specialquestion[0].value == "") {
            errorsarray["special"].title = 'This question is required, Please fill it'
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        } else {
            errorsarray["special"].title = ''
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }
    })

} else if (localStorage.getItem("will_organize_devtalk") == "false") {
    radioquestion[1].checked = true
    errorsarray["radio"].title = ""
    specialquestion[0].addEventListener("input", () => {
        if (specialquestion[0].value == null || specialquestion[0].value == "") {
            errorsarray["special"].title = 'This question is required, Please fill it'
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        } else {
            errorsarray["special"].title = ''
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }
    })
}

// GIVING TEXT BOXES SAVED VALUES
if (devtalksquestion[0] != null) {
    if (localStorage.getItem("devtalk_topic")) {
        devtalksquestion[0].value = localStorage.getItem("devtalk_topic")
        errorsarray["devTalk"].title = ''
    }
}
if (localStorage.getItem("something_special")) {
    specialquestion[0].value = localStorage.getItem("something_special")
    errorsarray["special"].title = ''
}

specialquestion[0].addEventListener("input", () => {
    if (specialquestion[0].value == null || specialquestion[0].value == "") {
        errorsarray["special"].title = 'This question is required, Please fill it'
        specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
    } else {
        errorsarray["special"].title = ''
        specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
    }
})

// IF YOU CLICK THIS BUTTON IT WILL SAVE TO LOCALSTORAGE AND REDIRECT
nextbutton[0].addEventListener('click', () => {
    checkErrors()
    if (errorsarray["radio"].title == "" && errorsarray["devTalk"].title == "" && errorsarray["special"].title == "") {
        if (radioanswer == "yes") {
            localStorage.setItem('will_organize_devtalk', true);
        } else {
            localStorage.setItem('will_organize_devtalk', false);
        }
        if (devtalksdiv[0] != null) {
            localStorage.setItem('devtalk_topic', devtalksquestion[0].value);
        } else {
            localStorage.setItem('devtalk_topic', "");
        }
        localStorage.setItem('something_special', specialquestion[0].value);
        window.location.replace("../submit.html")
    }

})