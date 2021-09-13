
function inputChecker(){
    console.log("input checker called");
    let inputEmail = document.getElementById("inputEmail").value;
    let inputNumber = document.getElementById("inputNumber").value;
    let inputZip = document.getElementById("inputZip").value;
    let inputPassword = document.getElementById("inputPassword").value;
    let inputPassword2 = document.getElementById("inputPassword2").value;
    let passwordStore = "";
    // See which fields are changed
    let fields = [inputEmail, inputNumber, inputZip, inputPassword, inputPassword2];
    console.log(fields);
    var cnt = 0;
    let errorString = "";
    let password_checked = false;
    let fieldsChangedStr = "";

    fields.forEach(function(field){
        // If field has input --> validate --> continue to update or alert user sth is wrong
        if (field == ""){
            console.log("user did not change the ", cnt , "value");
            cnt+=1;
            return;
        }
        switch(cnt){
            case 0: // email check
                let reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
                if(field.match(reg_email) == null){
                    errorString += "Please enter a valid email address\n";
                    document.getElementById("inputEmail").value = "";
                }
                else{
                    fieldsChangedStr += ("Email Changed from " + String(document.getElementById("p-email").innerHTML)+" to "+String(field) + "<br>");
                    document.getElementById("inputEmail").value = "";
                    document.getElementById("p-email").innerHTML = field;
                }
                break;
            case 1: // phone check
                let reg_phone = /^[1-9]{3}-[0-9]{3}-[0-9]{4}$/;
                if(field.match(reg_phone) == null){
                    errorString += "Please enter a valid phone number\n";
                    document.getElementById("inputNumber").value = "";
                }
                else{
                    console.log("phone check passed");
                    fieldsChangedStr += ("Phone Changed from " + String(document.getElementById("p-phone").innerHTML)+" to "+String(field) + "<br>");
                    document.getElementById("inputNumber").value = "";
                    document.getElementById("p-phone").innerHTML = field;
                }
                break;
            case 2: // zip code check
                let reg_zip = /^[0-9]{5}(?:-[0-9]{4})?$/;
                if(String(field).match(reg_zip) == null){
                    errorString += "Please enter a valid zip number\n";
                    document.getElementById("inputZip").value = "";
                }
                else{
                    console.log("zip code check passed!");
                    fieldsChangedStr += ("Zip Changed from " + String(document.getElementById("p-zip").innerHTML)+" to "+String(field) + "<br>");
                    document.getElementById("inputZip").value = "";
                    document.getElementById("p-zip").innerHTML = field;
                }
                break;
            case 3: // password check
                let reg_password = /^[\S]{6,}$/; 
                if(field.match(reg_password) == null){
                    errorString += "Password should be at least 6 characters\n";
                    document.getElementById("inputPassword").value = "";
                }
                else{
                    console.log("password checked");
                    password_checked = true;
                    document.getElementById("inputPassword").value = "";
                    document.getElementById("p-password").innerHTML = "*".repeat(field.length);
                }
                break;
            case 4: // password confirmation check
                console.log("password2 changed to: ", field);
                if(field != inputPassword){
                    errorString += "Please confirm your password matches";
                    document.getElementById("inputPassword2").value = "";
                }
                else{
                    if(password_checked){
                        fieldsChangedStr += ("Password Changed! <br>");
                        passwordStore = field;
                        document.getElementById("inputPassword2").value = "";
                        document.getElementById("p-password2").innerHTML = "*".repeat(field.length);    
                    }
                    else{
                        document.getElementById("inputPassword2").value = "";
                    }
                }
                break;
        }
        cnt+=1;
    })
    if(errorString != ""){
        console.log(errorString);
        document.getElementById("alert").style["display"] = "block";
        document.getElementById("alertMsg").innerHTML = errorString;
    }
    else{
        document.getElementById("inform").style["display"] = "block";
        document.getElementById("changeMsg").innerHTML = fieldsChangedStr;
    }
    
    
    
}

