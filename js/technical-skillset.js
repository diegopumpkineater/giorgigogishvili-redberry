//CONNECT TO SERVER WITH API
const request = new XMLHttpRequest();

//TOKEN
var token = "d064cfe2-f87f-4d39-a739-21263620f03e"

//SENT REQUEST
request.open("GET", "https://bootcamp-2022.devtest.ge/api/skills")
request.setRequestHeader('Authorization', 'Bearer ' + token)
request.send()
request.onload = () => {
    var skillsData = JSON.parse(request.response)
    if (request.status === 200) {
        console.log(skillsData)
        for (let i = 0; i < skillsData.length; i++) {
            var options = document.createElement("option")
            options.value = skillsData[i].id
            options.innerHTML = skillsData[i].title
            var select = document.getElementsByClassName("skills-select")
            select[0].appendChild(options)
        }
    } else {
        //EROR OF CONSOL LOG
        console.log("Error Happened")
    }
}

//CREATE SKILLS OBJECT
class Info {
    constructor(skill, experience) {
        this.id = skill;
        this.experience = experience;
    }
}

// CREATE SLIKKS NAMES ARRAY
var arrayOfExperienceInfo = []
var arrayOfSkills = ['HTML',
    'CSS',
    'PHP',
    'Laravel',
    'React.JS',
    'Vue.JS',
    'Svelte',
    'Angular',]

// GET ELEMENTS DIV
var skillDiv = document.getElementsByClassName("skill-div")
var expDiv = document.getElementsByClassName("experience-div")

//ERRORS OF ARRAY
var errorsArr = {}
errorsArr["experience"] = { title: 'required', div: expDiv }
errorsArr["skill"] = { title: '', div: expDiv }
errorsArr["requiredskill"] = { title: '1 Skill is minimum', div: expDiv }

//GET ELEMENTS INPUT
var skill = document.getElementsByClassName("skills-select")
var experience = document.getElementsByClassName("experience-input")

// IF THERE ARE SOME ERRORS OUTPUT ERRORS
function writeerror(field, error) {
    field[0].children[1].innerHTML = error
}

// GET BUTTON 
var button = document.getElementsByClassName("add-prog-lang")

// VALIDATION OF BUTTON
function addButton() {
    if (experience[0].value == "") {
        errorsArr["experience"].title = "Experience is required"
        writeerror(errorsArr["experience"].div, errorsArr["experience"].title)
    } else {
        for (let i = 0; i < arrayOfExperienceInfo.length; i++) {

            if (arrayOfExperienceInfo[i]["id"] == skill[0].value) {
                errorsArr["skill"].title = "skill is already used";
                writeerror(errorsArr["skill"].div, errorsArr["skill"].title);
                return
            } else {
                errorsArr["skill"].title = "";
                writeerror(errorsArr["skill"].div, errorsArr["skill"].title);
            }
        }
        // CREATE LIST ELEMENT
        var list = document.createElement("li")
        var mainDiv = document.getElementsByClassName("add-box");
        var divToAdd = document.createElement("div");
        divToAdd.className = "add-delete";
        // CREATE SPAN ELEMENT
        var span1 = document.createElement("span");
        span1.className = "skill-name";
        span1.innerHTML = arrayOfSkills[skill[0].value - 1]
        span1.value = skill[0].value
        var span2 = document.createElement("span");
        span2.className = "skill-year";
        span2.innerHTML = `Years of Experience: ${experience[0].value}`
        span2.value = experience[0].value
        //CREATE DELETE BUTTON
        var deleteButton = document.createElement("button")
        deleteButton.className = "delete-button"
        // CREATE DELETE BUTTON DIV
        var div1 = document.createElement("div")
        div1.className = "delete-button0"
        var div2 = document.createElement("div")
        div2.className = "delete-button1"
        deleteButton.appendChild(div1)
        deleteButton.appendChild(div2)

        var icon = document.createElement("i")
        icon.className = "fa-solid fa-circle-minus"
        icon.style = "color:#FE3B1F;font-size:28px;"
        // APPEND CHILD 
        deleteButton.appendChild(icon)
        divToAdd.appendChild(span1)
        divToAdd.appendChild(span2)
        divToAdd.appendChild(deleteButton)
        list.appendChild(divToAdd)
        mainDiv[0].appendChild(list)
        var info = new Info(skill[0].value, experience[0].value)
        arrayOfExperienceInfo.push(info)
        // VALIDATION OF DELETE BUTTON
        var deleteButton = document.querySelectorAll(".delete-button")
        console.log(deleteButton)
        deleteButton.forEach((del) => {
            del.addEventListener("click", () => {
                console.log(arrayOfExperienceInfo)
                for (let i = 0; i < arrayOfExperienceInfo.length; i++) {
                    if (arrayOfExperienceInfo[i]["id"] == del.parentElement.children[0].value && arrayOfExperienceInfo[i]["experience"] == del.parentElement.children[1].value) {
                        arrayOfExperienceInfo.splice(i, 1)
                        localStorage.setItem('skills', JSON.stringify(arrayOfExperienceInfo));
                    }
                }
                del.parentElement.remove()

            })

        })
        localStorage.setItem('skills', JSON.stringify(arrayOfExperienceInfo));

    }

}

button[0].addEventListener("click", addButton)

//VALIDATION OF NEXT BUTTON
var nextbutton = document.getElementsByClassName("next-img")
nextbutton[0].addEventListener("click", function () {
    if (arrayOfExperienceInfo.length < 1) {
        writeerror(errorsArr["requiredskill"].div, errorsArr["requiredskill"].title)
    } else {
        localStorage.setItem('skills', JSON.stringify(arrayOfExperienceInfo));
        window.location.replace("../covid.html")
    }
})
//VALIDATION OF SKILLS
if (localStorage.getItem('skills') != null && localStorage.getItem('skills') != "") {
    var arrayofsavedskills = JSON.parse(localStorage.getItem('skills'))
    for (let i = 0; i < arrayofsavedskills.length; i++) {
        //ADDING LI
        var list = document.createElement("li")
        var mainDiv = document.getElementsByClassName("add-box");
        var divToAdd = document.createElement("div");
        divToAdd.className = "add-delete";
        //SKILLS NAME
        var span1 = document.createElement("span");
        span1.className = "skill-name";
        span1.innerHTML = arrayOfSkills[arrayofsavedskills[i]["id"] - 1]
        span1.value = arrayofsavedskills[i]["id"]
        //YEARS OF EXPERIENCE
        var span2 = document.createElement("span");
        span2.className = "skill-year";
        span2.innerHTML = `Years of Experience: ${arrayofsavedskills[i]["experience"]}`
        span2.value = arrayofsavedskills[i]["experience"]
        //DELETE BUTTON
        var deleteButton = document.createElement("button")
        deleteButton.className = "delete-button"

        var div1 = document.createElement("div")
        div1.className = "delete-button0"
        var div2 = document.createElement("div")
        div2.className = "delete-button1"
        deleteButton.appendChild(div1)
        deleteButton.appendChild(div2)
        //DELETE BUTTON ICON
        var icon = document.createElement("i")
        icon.className = ""
        icon.style = "color:#FE3B1F;font-size:28px;"
        //APPENDING CHILDREN TO NEW ELEMENT
        deleteButton.appendChild(icon)
        divToAdd.appendChild(span1)
        divToAdd.appendChild(span2)
        divToAdd.appendChild(deleteButton)
        list.appendChild(divToAdd)
        mainDiv[0].appendChild(list)
        //PUSHING SKILLS TO ARRAY
        var info = new Info(arrayofsavedskills[i]["id"], arrayofsavedskills[i]["experience"])
        arrayOfExperienceInfo.push(info)
    }
    var deleteButton = document.querySelectorAll(".delete-button")
    deleteButton.forEach((del) => {
        del.addEventListener("click", () => {
            for (let i = 0; i < arrayOfExperienceInfo.length; i++) {
                if (arrayOfExperienceInfo[i]["id"] == del.parentElement.children[0].value && arrayOfExperienceInfo[i]["experience"] == del.parentElement.children[1].value) {
                    arrayOfExperienceInfo.splice(i, 1)
                    localStorage.setItem('skills', JSON.stringify(arrayOfExperienceInfo));
                }
                del.parentElement.remove()
            }
        })
    })
}