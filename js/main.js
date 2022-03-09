//VARIABLES 
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var number = document.getElementById("number");
var firstnamediv = document.getElementsByClassName("first-name-div")
var lastnamediv = document.getElementsByClassName("last-name-div")
var emaildiv = document.getElementsByClassName("E-mail-div")
var numberdiv = document.getElementsByClassName("number-div")
var errormessage = document.getElementById("errormessage")

// ARRAY OF ERORS  
var errorsarr = {};
errorsarr["Firstname"] = { title: "Firstname is required", div: firstnamediv }
errorsarr["Lastname"] = { title: "Lastname is required", div: lastnamediv }
errorsarr["Email"] = { title: "Email is required", div: emaildiv }
errorsarr["Number"] = { title: "", div: numberdiv }


//OUTPUT OF ERORS  
function writeError(field, error) {
    field[0].children[1].innerHTML = error
}

// CHECK INPUT IS EMPTY OR NOT
function checkifempty(inputname, field, valuelength) {
    if (valuelength == 0 || valuelength < 0) {
        writeError(field, `${inputname} is required`)
        errorsarr[inputname].title = `${inputname} is required`
        return false
    } else {
        writeError(field,)
        errorsarr[inputname].title = ``
        return true
    }
}

//VALIDATION OF FIRSTNAME
function validatefirstname() {
    if (!lengthvalidate("Firstname", firstnamediv, firstname.value.length, 2, 55)) { return }
    if (checkifonlychars("Firstname", firstnamediv, firstname.value)) { return }
}

// CHECK IF FIRST NAME HAS A NUMBER OR NOT 
function checkifonlychars(inputname, field, value) {
    if (/^[a-zA-Z]+$/.test(value)) {
        writeError(field, ``)
        errorsarr[inputname].title = ``
        return true
    } else {
        writeError(field, `${inputname} should only contain letters`)
        errorsarr[inputname].title = `${inputname} should only contain letters`
        return false;
    }
}

//VALIDATION OF LASTNAME
function validatelastname() {
    if (!lengthvalidate("Lastname", lastnamediv, lastname.value.length, 2, 55)) { return }
    if (checkifonlychars("Lastname", lastnamediv, lastname.value)) { return }
}

//VALIDATION OF EMAIL
function validateEmail() {
    if (!checkifempty("Email", emaildiv, email.value.length)) { return }
    if (checkemail(emaildiv, email.value)) { return }
}

//VALIDATION OF E-MAIL
function checkemail(field, email) {
    if (/^[\w.,!#$%^&*()-_+=><?/{}[\]';":]+[@]{1}[\w.]+[.]{1}[\w]+$/.test(email)) {
        writeError(field, ``)
        errorsarr["Email"].title = ``
        return true
    } else {
        writeError(field, `Email Format is wrong`)
        errorsarr["Email"].title = `Email Format is wrong`
        return false;
    }
}


//VALIDATION OF NUMBER
function validatenumber() {
    if (number.value == "") {
        errorsarr["Number"].title = ''
        writeError(numberdiv, ``)
        return 0
    }
    if (!checkplussign(numberdiv, number.value)) { return }
    if (!checkifalpha(numberdiv, number.value)) { return }
    if (GeoNum(numberdiv, number.value)) { return }
}


// VAIDATION OF NUMBER
function GeoNum(field, value) {
    if (/^[+]{1}[9]{1}[9]{1}[5]{1}[5]{1}[0-9]{8}$/.test(value.toString())) {
        writeError(field, ``)
        errorsarr["Number"].title = ``
        return true
    } else {
        writeError(field, `Only georgian Phone number is valid(start with +995)`)
        errorsarr["Number"].title = `Only georgian Phone number is valid(start with +995)`
        return false;
    }
}

// CHECK NUMBER INPUT START WITH + OR NOT
function checkplussign(field, value) {
    if (value[0] == '+') {
        writeError(field, ``)
        errorsarr["Number"].title = ``
        return true
    } else {
        number.value = number.value.slice(0, 0)
        writeError(field, `Number should start with +`)
        errorsarr["Number"].title = `Number should start with +`
        return false
    }
}

// CHECK IF NUMBER INPUT HAS ALPHABET OR NOT
function checkifalpha(field, value) {

    if (!(/^[a-zA-Z.,!#$%^&*()\-_=><?/{}[\]';":@\s]+$/.test(value[value.length - 1]))) {
        writeError(field, ``)
        errorsarr["Number"].title = ``
        return true
    } else {
        number.value = number.value.slice(0, value.length - 1)
        writeError(field, `Input only numbers`)
        errorsarr["Number"].title = `Input only numbers`
        return false
    }
}

// CHECK VALIDATION LENGTH
function lengthvalidate(inputname, field, valuelength, minlength, maxlength) {
    if (valuelength > minlength && valuelength < maxlength) {
        writeError(field, ``)
        errorsarr[inputname].title = ``
        return true;
    } else if (valuelength > 0 && valuelength < minlength) {
        writeError(field, `${inputname} shoud be more than ${minlength} character`)
        errorsarr[inputname].title = `${inputname} shoud be more than ${minlength} character`
        return false;
    } else if (valuelength > 0 && valuelength > maxlength) {
        writeError(field, `${inputname} shoud not be more than ${maxlength} character`)
        errorsarr[inputname].title = `${inputname} shoud not be more than ${maxlength} character`
        return false
    } else if (valuelength == 0) {
        writeError(field, `${inputname} is required`)
        errorsarr[inputname].title = `${inputname} is required`
        return false
    }
}

// EVENT LISTENER
firstname.addEventListener("input", validatefirstname);
firstname.addEventListener("click", validatefirstname);
lastname.addEventListener("input", validatelastname);
lastname.addEventListener("click", validatelastname);
email.addEventListener("input", validateEmail);
email.addEventListener("click", validateEmail);
number.addEventListener("input", validatenumber);

// SAVE IN LOCAL STORAGE USERS DATA
if (localStorage.getItem('first_name') != null && localStorage.getItem('first_name') != "") {
    firstname.value = localStorage.getItem('first_name')
    errorsarr["Firstname"].title = ``
}
if (localStorage.getItem('last_name') != null && localStorage.getItem('last_name') != "") {
    lastname.value = localStorage.getItem('last_name')
    errorsarr["Lastname"].title = ``
}
if (localStorage.getItem('email') != null && localStorage.getItem('email') != "") {
    email.value = localStorage.getItem('email')
    errorsarr["Email"].title = ``
}
if (localStorage.getItem('phone') != null && localStorage.getItem('phone') != "") {
    number.value = localStorage.getItem('phone')
    errorsarr["Number"].title = ``
}

// CKECK IF ALL INPUT ARE FULL OR NOT
var next = document.getElementsByClassName("next-img");
next[0].addEventListener("click", function () {
    if (errorsarr["Firstname"].title == "" && errorsarr["Lastname"].title == "" && errorsarr["Email"].title == "" && errorsarr["Number"].title == "") {
        if (firstname.value != null) {
            localStorage.setItem('first_name', firstname.value);
        }
        if (lastname.value != null) {
            localStorage.setItem('last_name', lastname.value);
        }
        if (email.value != null) {
            localStorage.setItem('email', email.value);
        }
        if (email.value != null) {
            localStorage.setItem('phone', number.value);
        }
        window.location.replace("../technical-skillset.html");
    } else {
        // IF SOME INPUT IS NOT FULL ALERT ERROR
        writeError(errorsarr["Firstname"].div, errorsarr["Firstname"].title)
        writeError(errorsarr["Lastname"].div, errorsarr["Lastname"].title)
        writeError(errorsarr["Email"].div, errorsarr["Email"].title)
        writeError(errorsarr["Number"].div, errorsarr["Number"].title)

    }
});