// FETCH DATA FROM SERVER
fetch('https://bootcamp-2022.devtest.ge/api/applications?token=d064cfe2-f87f-4d39-a739-21263620f03e',
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        var i = 0
        applicationsdata = data
        applicationsdata.forEach((app) => {
            var backgrounddiv = document.getElementsByClassName("app-column")
            backgrounddiv[0].innerHTML += `
        <li>
        <div class="app-sumbited-list">
        <div class="submittied-app-box">
            <p class="subittied-app-text"> ${i + 1} </p>
        </div>
        <button class="arrow">
            <img class="arrow-img" src="images/Vector2.svg" alt="arrow">
        </button>
        </div>
        </li>
            `
            i += 1
        });
        app = data
        // GET SKILLS NAME
        function showskillset(index) {
            skills = app[index]["skills"]
            var langdiv = `<div class="language">`
            var experiencediv = `<div class="experience">`
            var skillsname = ["HTML",
                "CSS",
                "PHP",
                "Laravel",
                "React.JS",
                "Vue.JS",
                "Svelte",
                "Angular"]
            for (let j = 0; j < skills.length; j++) {
                langdiv += `<p class="paragraph">${skillsname[skills[j]["id"] - 1]}</p>`
                experiencediv += `<p class="paragraph1">Years of experience: ${skills[j]["experience"]}</p>`
            }
            experiencediv += `</div>`
            langdiv += experiencediv
            langdiv += `</div>`
            return langdiv
        }
        // IF LIST BOX ARROW IS CLICKED SHOW INFORMATION PAGE
        var showdatabutton = document.querySelectorAll(".arrow")
        if (showdatabutton != null) {
            var i = 0
            showdatabutton.forEach((button) => {
                button.value = i;
                var butonparent = button.parentElement
                butonparent.innerHTML += `
                    <div class="container" style="display:none;">
                <div class="personal-section">
                    <h1>Personal Information</h1>
                    <div class="firts-name">
                        <h6>First name</h6>
                        <h5 class="name">${app[button.value]["first_name"]}</h5>
                    </div>
                    <div class="last-name">
                        <h6>Last Name</h6>
                        <h5 class="surname">${app[button.value]["last_name"]}</h5>
                    </div>
                    <div class="email">
                        <h6>E Mail</h6>
                        <h5 class="email1">${app[button.value]["email"]}</h5>
                    </div>
                    <div class="phone">
                        <h6>Phone</h6>
                        <h5 class="number">${app[button.value]["phone"] ? app[button.value]["phone"] : "Phone is not submitted"}</h5>
                    </div>
                </div>

                <div class="skillset-section">
                    <h1>Skillset</h1>`+
                    showskillset(button.value)


                    + `</div>

                <div class="covid-section">
                    <h1>Covid Situation</h1>
                    <div class="work">
                        <h2>How would you prefer to work?</h2>
                        <div class="from-office">
                            <div class=${app[button.value]["work_preference"] == "from_office" ? "radio-circle-pos" : "radio-circle1"}></div>
                            <h3>From Sairme Office</h3>
                        </div>
                        <div class="from-home">
                            <div class=${app[button.value]["work_preference"] == "from_home" ? "radio-circle0-pos" : "radio-circle"}></div>
                            <h3 class="home">From Home</h3>
                        </div>
                        <div class="hybrid">
                            <div class=${app[button.value]["work_preference"] == "hybrid" ? "radio-circle2-pos" : "radio-circle2"}></div>
                            <h3 class="hybrid1">Hybrid</h3>           
                        </div>
                    </div>
                    <div class="covid">
                        <h2 class="covid-title">Did you have covid 19?</h2>
                            <div class="covid-answer">
                                <div class=${app[button.value]["had_covid"] ? "yes" : "yes-no"}></div>
                                <h3 class="yes-title" >Yes</h3>

                                <div class=${app[button.value]["had_covid"] ? "no" : "no-yes"}></div>
                                <h3 class="no-title" >No</h3>
                            </div>
                    </div>
                    <div class="covid-date">
                        <h2 class="date-title">When did you have covid 19?</h2>
                        <div class="date-div">
                            <span class="when-input">${app[button.value]["had_covid_at"] ? app[button.value]["had_covid_at"] : "Covid date is not submitted"}</span>
                            <div class="calendar"></div> 
                        </div>
                    </div>
                    <div class="vaccinated">
                        <h2 class="vaccinated-title">Have you been vaccinated?</h2>
                            <div class="vaccinated-answer">
                                <div class=${app[button.value]["vaccinated"] ? "yes-vaccinated" : "yes-vaccinated-no"}></div>
                                <h3 class="yes-title-vaccinated" >Yes</h3>

                                <div class="${app[button.value]["vaccinated"] ? "no-vaccinated" : "no-vaccinated-yes"}"></div>
                                <h3 class="no-title-vaccinated" >No</h3>
                            </div>
                    </div>
                    <div class="when-date">
                        <h2 class="when-title">When did you get covid vaccine?</h2>
                        <div class="when-div">
                            <span class="when2-input">${app[button.value]["vaccinated_at"] ? app[button.value]["vaccinated_at"] : "Vaccinated date is not submitted"}</span>
                            <div class="calendar2"></div> 
                        </div>
                    </div>
                    <div class="space"></div>
                    <div class="insigt-section">
                        <h1>Insigts</h1>
                        <h2 class="devtalks-title">Would you attend Devtalks and maybe also organize your own?</h2>
                            <div class="devtalks-answer">
                                <div class=${app[button.value]["will_organize_devtalk"] ? "yes-devtalk" : "yes-devtalk-no"}></div>
                                <h3 class="devtalk-title" >Yes</h3>

                                <div class=${app[button.value]["will_organize_devtalk"] ? "no-devtalk" : "no-devtalk-yes"}></div>
                                <h3 class="devtalk-title2" >No</h3>
                            </div>
                        <h2 class="speak-devtalk">What would you speak about at Devtalk?</h2>
                        <div class="devtalk-text">${app[button.value]["devtalk_topic"] ? app[button.value]["devtalk_topic"] : "Devtalk topic is not submitted"}</div>
                        <h2 class="speak-special">Tell us something special</h2>
                        <div class="special-text">${app[button.value]["something_special"] ? app[button.value]["something_special"] : "Special topic is not submitted"}</div>
                    </div> 

                </div>
            </div>`
                i += 1
            })


            //AFTTER ARROW IS CLICKED GIVING ANOTHER EVENT LISTENER WHICH WILL HIDE IN sINFORMATION BOX
            var buts = document.querySelectorAll(".arrow")
            buts.forEach((this1) => {
                this1.addEventListener('click', () => {
                    console.log(this1.className)
                    if (this1.className == "arrow") {
                        this1.parentElement.parentElement.style = "margin-bottom:700px";
                        this1.nextElementSibling.style = "display:block;"
                        this1.className = "arrow1"
                    } else
                        if (this1.className == "arrow1") {
                            this1.parentElement.parentElement.style = "margin-bottom:0px";
                            this1.nextElementSibling.style = "display:none;"
                            this1.className = "arrow"
                        }
                })
            })
        }
    })

