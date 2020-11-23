$(document).ready(function () {


    // CSS COLORS
    // #212529     dark blue
    // #DB4E35     redish
    // #AC703D     brown
    // #FFC914     yellow
    // #4E6172     gray



    function preloadFunc()
    {
        disableSubmit();
    };
    window.onpaint = preloadFunc();

    //disables submit button
    function disableSubmit(){
        $('#login-btn').prop('disabled', true);
    };

    // enables submit button
    function enableSubmit(){
        $('#login-btn').prop('disabled', false);
        
       
    };

    function errorPassword(){
        $('#password').css({'border': "1px solid #DB4E35 "});
    }

    function normalPassword(){
        $('#password').css({'border': "1px solid #4E6172 "});
    }

    function errorUsername(){
        $('#username').css({'border': "1px solid #DB4E35 "});
    }

    function normalUsername(){
        $('#username').css({'border': "1px solid #4E6172 "});
    }

    function fieldsValidate(){
        if($("#username").val() != null && $("#username").val() != ""){
            enableSubmit();
            normalUsername();
        }else{
            disableSubmit();
            errorUsername();

        }

        if($("#password").val() != null &&  $("#password").val() != ""){
            enableSubmit();
            normalPassword();
        }else{
            disableSubmit();
            errorPassword();
        }
    }

    //changes input and button UI
    $('#username').keyup(function () {
        fieldsValidate();


    });
    $('#password').keyup(function () {
        fieldsValidate();
    });

    
    









})