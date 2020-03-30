var currentClass = "";
var currentSection = "a";

var fetchData = {};

fetchData.currentClass = "";
fetchData.currentSection = "a";

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var secondyrData;
var thirdsyrData;
var fourthyrData;
var yrData;

$(document).ready(function () {

    $("#sd_two").click(function(){
        fetchData.currentClass = "secondyear";
        fetchData.currentSection = "a";
        fetchStudentData();
    });

    $("#sd_three").click(function(){
        fetchData.currentClass = "thirdyear";
        fetchData.currentSection = "a";
        fetchStudentData();
    });

    $("#sd_four").click(function(){
        fetchData.currentClass = "fourthyear";
        fetchData.currentSection = "a";
        fetchStudentData();
    });

});

window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
    });
}, false);

function setClass(className){

    if(fetchData.currentSection != className){
        fetchData.currentSection = className;
        fetchStudentData();
    }
    console.log(fetchData.currentClass,fetchData.currentSection);
}

function fetchStudentData(){
    var needFetch = true;
    if(needFetch)
    {
    $("#studentData tbody").empty();
    $.ajax({
        url: "http://localhost:3001/fetchStudent",
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        data: fetchData,
        success : (result) => {
            if(result){
                yrData = result;
                console.log(result);
                for(let ind = 0;ind < result.length;ind++){
                    let data = result[ind];
                    let index = ind +1;
                    let date = new Date(data.studentDOB).toISOString().slice(0,10);
                    $("#studentData tbody").append('<tr><td>'+ index + '</td>' + '<td>'+ data.studentRegId + '</td>' + '<td>'+ data.studentName + '</td>' + '<td>'+ data.studentMail + '</td>'+ '<td>'+ date + '</td></tr>' );
                }
            }
        }
    });
}
}

function fileUpload(){
    
    try{
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Uploading...</div></div>');
   
    var fileCatcher = document.getElementById('file-group');
    var fileInput = document.getElementById('file-input');
    var inputError = document.getElementById("errmsg");

    var formdata = new FormData(fileCatcher);
    const resFileType = true;

        if(resFileType){
            inputError.innerHTML = "";

            document.getElementById('custClass').value = fetchData.currentClass;
            document.getElementById('custSection').value = fetchData.currentSection;

            console.log(fetchData.currentClass,fetchData.currentSection);
            formdata.append('classParent',fetchData.currentClass);
            formdata.append('classSection',fetchData.currentSection);

            for (var value of formdata.values()) {
                console.log(value); 
             }
    
            $.ajax({
                url: "http://localhost:3001/fileUpload",
                method: 'POST',
                data: formdata,
                processData: false,
                contentType: false,

                success : (result) => {
                    if(result){
                        console.log(result);
                        var $el = $('#file-input');
                        $el.wrap('<form>').closest('form').get(0).reset();
                        $el.unwrap();
                        $( "#loadingDiv" ).fadeOut(500, function() {
                            $( "#loadingDiv" ).remove(); //makes page more lightweight 
                        }); 
                        $("#myModal").modal("hide");
                        fetchStudentData();
                    }
                    else{
                        console.log("no outpt");
                    }
                }
            });
    
    
        }
        else{
            inputError.innerHTML = "Please Upload a valid File. Either in csv, ods,xls, xlsx, xlt";
            return false;
        }        


    return false;
}
catch(err){
    console.log(err);
    return false;
}
}

function regIdUpdate(){
    if(fetchData.currentClass == "secondyear"){
        document.getElementById("rollId").innerHTML = "18BCS";
        document.getElementById("editrollId").innerHTML = "18BCS";
        document.getElementById("altrollId").innerHTML = "18BCS";
        $("#stuRegId").val("18BCS");
        $("#stuYear").val("secondyear");
        $("#altstuYear").val("secondyear");
        $("#editrollId").val("18BCS");
        $("#altrollId").val("18BCS"); 
        $("#altstuRegId").val("18BCS");  
                     
    }
    else if(fetchData.currentClass == "thirdyear"){
        document.getElementById("rollId").innerHTML = "17BCS";
        document.getElementById("editrollId").innerHTML = "17BCS";
        document.getElementById("altrollId").innerHTML = "17BCS";
        $("#stuRegId").val("17BCS");
        $("#stuYear").val("thirdyear");
        $("#altstuYear").val("thirdyear");
        $("#editrollId").val("17BCS");
        $("#altrollId").val("17BCS");
        $("#altstuRegId").val("17BCS");  

    }
    else if(fetchData.currentClass == "fourthyear"){
        document.getElementById("rollId").innerHTML = "16BCS";
        document.getElementById("editrollId").innerHTML = "16BCS";
        document.getElementById("altrollId").innerHTML = "16BCS";
        $("#stuRegId").val("16BCS");
        $("#stuYear").val("fourthyear");
        $("#altstuYear").val("fourthyear");
        $("#editrollId").val("16BCS");
        $("#altrollId").val("16BCS");
        $("#altstuRegId").val("16BCS");  

    }
}

function addStudent(event){

    event.preventDefault();

    document.getElementById("addStudentDataErr").innerHTML = "";
    $("#addStudentDataErr").val("");

    var fileCatcher = $("#addStudent");
     
    console.log(fileCatcher.serialize());

    $.ajax({
        url: "/addStudent",
        method: 'POST',
        data: fileCatcher.serialize(),
        processData: false,
        success : (result) => {
            if(result.status){
                fetchStudentData();
                alert("Student Added");
                document.getElementById("addStudent").reset();
                $("#myModal-1").modal('hide');
                return false;
            }
            else{
                document.getElementById("addStudentDataErr").innerHTML = "Already registered with Id";
                $("#addStudentDataErr").val("Already registered with Id");
            }
        }
    });
    return false;

}

function editStudent(event){

    event.preventDefault();

    let regId = $("#editrollId").val() + $("#stuRegNumEdit").val();

    let stuData = {
        register : regId,
        year: fetchData.currentClass
    };

        $.ajax({
        url : '/deleteStudent',
        method: 'POST',
        data: JSON.stringify(stuData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        success : (result) => {
            if(result){
                fetchStudentData();
                alert("Student Deleted");
                document.getElementById("editStudent").reset();
                return false;
            }
        }

    });

}

function getStudentCheckStatus(event){
    document.getElementById("editStudentDataErr").innerHTML = "";
    document.getElementById("stuNameEdit").innerHTML = "";
    document.getElementById("stuEmailEdit").innerHTML = "";
    $("#stuNameEdit").val("");
    $("#stuEmailEdit").val("");
    event.preventDefault();

    let regId = $("#editrollId").val() + $("#stuRegNumEdit").val();
    let stuData = {
        register : regId
    };
    console.log(yrData);

    for(let ele in yrData){
        if(regId == yrData[ele].studentRegId){
            $("#stuNameEdit").val(yrData[ele].studentName);
            $("#stuEmailEdit").val(yrData[ele].studentMail);
            $('#editStudentData').removeAttr('disabled');
            return false;
        }
    }
    document.getElementById("editStudentDataErr").innerHTML = "No student Found";
}


function updateValues(event){

    document.getElementById("altStudentDataErr").innerHTML = "";
    document.getElementById("altstuName").innerHTML = "";
    document.getElementById("altstuEmail").innerHTML = "";
    document.getElementById("altstuDate").innerHTML = "";
    $("#altstuName").val("");
    $("#altstuEmail").val("");
    $("#altstuDate").val("");
    event.preventDefault();

    let regId = $("#altrollId").val() + $("#altstuRegNum").val();

    $("#altstuRegId").val(regId);
    console.log(yrData);

    for(let ele in yrData){
        if(regId == yrData[ele].studentRegId){

            let date = new Date(yrData[ele].studentDOB).toISOString().slice(0,10);
            $("#altstuName").val(yrData[ele].studentName);
            $("#altstuEmail").val(yrData[ele].studentMail);
            $("#altsel1").val(yrData[ele].studentSection);
            $("#altstuDate").val(date);
            $("#alterStudentCheck").addClass("hide");
            $("#alterStudentChange").removeClass("hide");
            $("#altstuRegNum").attr("disabled", "disabled");
            $("#altstuName").removeAttr("disabled", "disabled");
            $("#altstuEmail").removeAttr("disabled", "disabled");
            $("#altsel1").removeAttr("disabled", "disabled");
            $("#altstuDate").removeAttr("disabled", "disabled");
            $("#altStudentData").removeAttr("disabled", "disabled");
            return false;

        }
    }
    document.getElementById("altStudentDataErr").innerHTML = "No student Found";
}

function changeValues(event){
    event.preventDefault();

    document.getElementById("alterStudentData").reset();
    $("#altstuName").val("");
    $("#altstuEmail").val("");
    $("#altsel1").val("");
    $("#altstuDate").val("");

    $("#alterStudentCheck").removeClass("hide");
    $("#alterStudentChange").addClass("hide");
    $("#altstuRegNum").removeAttr("disabled", "disabled");
    $("#altstuName").attr("disabled", "disabled");
    $("#altstuEmail").attr("disabled", "disabled");
    $("#altsel1").attr("disabled", "disabled");
    $("#altstuDate").attr("disabled", "disabled");
    $("#altStudentData").attr("disabled", "disabled");
    return false;
}


function alterStudent(event){
    event.preventDefault();

    document.getElementById("altStudentDataErr").innerHTML = "";
    
    var fileCatcher = $("#alterStudentData");
     
    console.log(fileCatcher.serialize());

    $.ajax({
        url: "/alterStudent",
        method: 'PUT',
        data: fileCatcher.serialize(),
        processData: false,
        success : (result) => {
            if(result.status){
                console.log(result);
                alert("Updated StudentData");
                document.getElementById("alterStudentData").reset();
                fetchStudentData();
                return false;

            }
            else{
                document.getElementById("addStudentDataErr").innerHTML = "Already registered with Id";
                $("#addStudentDataErr").val("Already registered with Id");
            }
        }
    });
    return false;
}

