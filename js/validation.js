import "./jquery-3.7.1.js";
// $("#name").on("keyup", function (event){
//     console.log("key",event.key)
// })


$("#dob").attr("max", new Date().toISOString().split("T")[0]);

$("#name, #email,#gender, #phone, #dob, input[name='country'], input[name='interests']").on("input", function () {
    validation($(this));
});
$("#reset_button").on("click", function(){
    clearForm()
} )


$("#back_form").on("click",function(){
    $(".for_hide").show()
    $(".admin").hide()
})

$("#submit_button").on("click", function () {
    let isvalid = true;
    $("form input, form select").each(function () {
        if (!validation($(this))) {
            isvalid = false;
        }
    });
    if (isvalid) {
        register_user();
        clearForm();
    }
});

function validation(field) {
    let fieldName = field.attr("name");
    let value = field.val();
    let errorDiv = $("#" + fieldName + "_error");

    if (!value) {
        errorDiv.text(fieldName + " is required");
        field.removeClass("valid").addClass("invalid");
        return false;
    } else {
        if (fieldName === "name") {
            if (!/^[a-zA-Z\s]+$/.test(value)) { 
                errorDiv.text("Name must contain only alphabets and spaces");
                field.removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text(""); 
                field.removeClass("invalid");
                field.addClass("valid");
                return true;
            }
        }
       else if (fieldName === "email") {
            if (!EmailValidation(value)) {
                errorDiv.text("Invalid email address");
                field.removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text("");
                field.removeClass("invalid");
                field.addClass("valid");
                return true;
            }
        }
       else if (fieldName === "phone"){
            if (!validatePhoneNumber(value)) {
                errorDiv.text("Invalid number");
                field.removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text("");
                field.removeClass("invalid");
                field.addClass("valid");
                return true;
            }
        }
      else  if (fieldName === "dob") {
            let dobDate = new Date(value);
            let currentDate = new Date();
            if (dobDate > currentDate) {
                errorDiv.text("Date of birth cannot be in the future");
                field.removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text("");
                field.removeClass("invalid").addClass("valid");
                return true;
            }
        }

      else  if (fieldName==="gender"){
            if(!value){
                errorDiv.text("Select Gender");
                field.removeClass("valid").addClass("invalid");
                return false;
            }
            else{
                errorDiv.text("");
                field.removeClass("invalid");
                field.addClass("valid");
                return true;
            }
        }

      else  if (fieldName === "country") {
            let checkedCountry = $("input[name='country']:checked").val();
            if (!checkedCountry) {
                errorDiv.text("Select a country");
                $(".countries").removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text("");
                $(".countries").removeClass("invalid").addClass("valid");
                return true;
            }
        }
       else if (fieldName === "interests") {
            let checkedInterests = $("input[name='interests']:checked");
            if (checkedInterests.length === 0) {
                errorDiv.text("Select at least one interest");
                $(".interests").removeClass("valid").addClass("invalid");
                return false;
            } else {
                errorDiv.text("");
                $(".interests").removeClass("invalid").addClass("valid");
                return true;
            }
        }
        errorDiv.text("");
        field.removeClass("invalid");
        field.addClass("valid");
        
        return true;
    }
}




function EmailValidation(email) {
    let regex =
        /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

    if (regex.test(email)) {

        console.log("pass")
        return true
    } else {
        console.log("fail")
        return false
    }

}

let PHONE_NUMBER_PATTERN = /^\d{10}$/;

function validatePhoneNumber(phone) {
    return PHONE_NUMBER_PATTERN.test(phone);
}

function register_user() {
    let reg_Name = $("#name").val();
    let reg_Email = $("#email").val();
    let reg_Dob = $("#dob").val();
    let reg_Gender = $("#gender").val();


    let reg_country_selected = $("input[name='country']:checked").val()
    let reg_about = $("#about").val()

    let selectedInterests = [];

    $("input[name='interests']:checked").each(function () {
        selectedInterests.push($(this).val());
    });

    let reg_user = {
        Name: reg_Name,
        Email: reg_Email,
        Dob: reg_Dob,
        Gender: reg_Gender,
        Country: reg_country_selected,
        Intersts: selectedInterests,
        About: reg_about,

    }
    let User_data = JSON.parse(localStorage.getItem("reg_user")) || [];
    User_data.push(reg_user);
    localStorage.setItem("reg_user", JSON.stringify(User_data));

    // $("#data").append(reg_Name +""+ reg_Email)
    // console.log("Done")


    ShowUser()
    $(".for_hide").hide()
    $(".admin").show()
}

function clearForm() {
    $("#name, #email,#gender, #phone, #dob, #about").val("");
    $("input,select,.countries,.interests").removeClass("invalid  valid" );
    $("input[type='checkbox'], input[type='radio']").prop("checked", false);
    $("#name_error,#email_error,#phone_error,#dob_error,#gender_error,#country_error,#interests_error").text("")
}

function ShowUser() {
    let user_list = JSON.parse(localStorage.getItem("reg_user")) || [];
    let show = $("#data")

    show.empty();

    user_list.forEach(function (reg_user) {
        let dob = new Date(reg_user.Dob);
        // British English uses day-month-year order
        let formattedDate = dob.toLocaleDateString('en-GB');

        show.append("<tr>" +
            "<td>" + reg_user.Name + "</td>" +
            "<td>" + reg_user.Email + "</td>" +
            "<td>" + formattedDate + "</td>" +
            "<td>" + reg_user.Gender + "</td>" +
            "<td>" + reg_user.About + "</td>" +
            "</tr>");
    })


    
}


// reg_user.Intersts


    // if (!EmailValidation(Email)) {
    //     $("#email_error").text("Enter Valid Email")
    //     return false
    // }
    // if (!validatePhoneNumber(Phone)) {
    //     // $("#phone_error").text("Please enter a valid 10-digit phone number.");
    //     $("#phone_error").text("Enter Valid Phone Number")
    //     return false;
    // } else {
    //     $("#phone_error").text("");
    // }

    // if (Name == "" || Email == "" || Phone == "" || Dob == "" || Gender == "") {
    //     console.log("null")
    //     $("#phone_error").text("Enter Phone")
    //     return false
    // }






    // $("#name_error").text("yes")

    
    // used for check is all values collecting from interests
    //     let selectedInterests = [];

    // $("input[name='interests']:checked").each(function() {
    //     selectedInterests.push($(this).val());
    // });

    // console.log("Selected interests:", selectedInterests);
    // console.log("Selected interests:", selectedInterests.join(", "));



    // if EmailValidation fails it return false  otherwishe true

    // if(!Name=="" && !Email=="" ){
    //     console.log(Name)
    //     // console.log(Email)       
    //     if(!Email=="" ){
    //         EmailValidation(Email)
    //     }
    //     return true

    // }

