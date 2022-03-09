// BUTTON VARIABLE
var button = document.getElementsByClassName("submit-button")
var data = {}

//  TOKEN
data["token"] = "d064cfe2-f87f-4d39-a739-21263620f03e"

//  LOCAL STORAGE
data["first_name"] = localStorage.getItem("first_name")
data["last_name"] = localStorage.getItem("last_name")
data["email"] = localStorage.getItem("email")

// CHECK PHONE INPUT
if (localStorage.getItem("phone") != null && localStorage.getItem("phone") != "") {
    data["phone"] = localStorage.getItem("phone")
}

// SKILLS LOCAL STORAGE
data["skills"] = JSON.parse(localStorage.getItem("skills"))

// CHECK WORK PREFERENCE INPUTS
if (localStorage.getItem("work_preference") == "office") {
    data["work_preference"] = "from_office"
} else if (localStorage.getItem("work_preference") == "home") {
    data["work_preference"] = "from_home"
} else if (localStorage.getItem("work_preference") == "hybrid") {
    data["work_preference"] = "hybrid"
}

// HAD COVID LOCALSTORAGE
data["had_covid"] = JSON.parse(localStorage.getItem("had_covid"))

// CHECK COVID INPUTS 
if (localStorage.getItem("had_covid_at") != null && localStorage.getItem("had_covid_at") != "") {
    data["had_covid_at"] = localStorage.getItem("had_covid_at")
}

// VACCINATED LOCALSOTAGE
data["vaccinated"] = JSON.parse(localStorage.getItem("vaccinated"))

//CHECK VACCINATED DATE EXIST OR NOT
if (localStorage.getItem("vaccinated_at") != null && localStorage.getItem("vaccinated_at") != "") {
    data["vaccinated_at"] = localStorage.getItem("vaccinated_at")
}

// WILL ORGINIZE GIVE TRUE OF FALSE DEVTALK
data["will_organize_devtalk"] = JSON.parse(localStorage.getItem("will_organize_devtalk"))

// CKECKED IF DEVTALK TOPIC IS AVAILABLE
if (localStorage.getItem("devtalk_topic") != null && localStorage.getItem("devtalk_topic") != "") {
    data["devtalk_topic"] = localStorage.getItem("devtalk_topic")
}

// SOMETHING SPECIAL LOCALSTORAGE
data["something_special"] = localStorage.getItem("something_special")

//SEND INFORMATION TO SERVER
button[0].addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://bootcamp-2022.devtest.ge/api/application", true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
        if (xhr.status === 201) {
            window.location.replace("../thanks.html")
        } else {
            console.log(JSON.parse(xhr.responseText))
        }
    }
})