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
    console.log(fetchData.currentClass);

    


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
                console.log(result);
                for(let ind = 0;ind < result.length;ind++){
                    let data = result[ind];
                    let index = ind +1;
                    let date = new Date(data.studentDOB).toISOString().slice(0,10);
                    $("#studentData tbody").append('<tr><td>'+ index + '</td>' + '<td>'+ data.studentRegId + '</td>' + '<td>'+ data.studentName + '</td>' + '<td>'+ data.studentMail + '</td>'+ '<td>'+ date + '</td></tr>' );
                }
            }
            else{
                console.log("no outpt");
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


