$(document).ready(function(){
    //disables submit button
   function disableSubmit(){
    $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }

    //checks if all fields are filled up
    function areAllFilled(){

        var valid ;
        

        if($("#username").val() != '' && $("#email").val() != '' && $("#password").val() != '' && $("#fname").val() != '' && $("#lname").val() != '' ){
        // if($("#username").val() != '' && $("#email").val() != ''){
            valid = true;
        }else{
            valid = false;
        }
        return valid;
    }


    function isFilled(field){
    // var valid = false;

        if (field.val() ==""){
            if(field.is($('#fname'))){
                $('#fname').css({'border': "1px solid #DB4E35 "});
                $('#fNameError').text('First name is required.');
            }
            if(field.is($('#lname'))){
                $('#lname').css({'border': "1px solid #DB4E35 "});
                $('#lNameError').text('Last name is required.');
            }
            // if(field.is($('#password'))){
            //     $('#password').css({'border': "1px solid #DB4E35 "});
            //     $('#pwError').text('Password is required.');
            // }
            disableSubmit();            
            // valid = false;
            
        }
        else{
            if (field.is($('#fname'))){
                $('#fname').css({'border': "1px solid #4E6172 "});
                $('#fNameError').text('');
            }
            if (field.is($('#lname'))){
                $('#lname').css({'border': "1px solid #4E6172 "});
                $('#lNameError').text('');
            }
            // if (field.is($('#password'))){
            //     $('#password').css({'border': "1px solid #4E6172 "});
            //     $('#pwError').text('');
            // }

            if (areAllFilled() == true)
                enableSubmit();
            // valid = true;
        }

        // return valid;
    }

    function validUsername(user){

        if (user.val() == ""){
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username is required');
            disableSubmit();
        }
        else if(user.val().length < 4 || user.val().length > 15){
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username must be 4-15 characters only.');
            disableSubmit();
        }
        else{
            $('#username').css({'border': "1px solid #4E6172 "});
            $('#usernameError').text('');

            username = user.val();

            $.get('/getUsername', {username:username}, function(result){
                if(result.username == username){
                    $('#username').css({'border': "1px solid #DB4E35 "});
                    $('#usernameError').text('Username already registered');
                    disableSubmit();
                }
                else{
                    $('#username').css({'border': "1px solid #4E6172 "});
                    $('#usernameError').text('');
                    console.log("ELSE");

                    enableSubmit();
                        
                }
            });
        }
    }

    function validEmail(mail){
        // var username = $('#username').val();
        // var valid = false;

        if (mail.val() == ""){
            // valid = false;
            $('#email').css({'border': "1px solid #DB4E35 "});
            $('#emailError').text('Email is required');
            disableSubmit();
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.val()) == false){
            // valid = false; // sets to false because the email is not valid.
            $('#email').css({'border': "1px solid #DB4E35 "});
            $("#emailError").text('Invalid email format');

            disableSubmit();

        }
        else{
            $('#email').css({'border': "1px solid #4E6172 "});
            $('#emailError').text('');
        // }
        // // else{
            email = mail.val();

            $.get('/getEmail', {email:email}, function(result){
                if(result.email == email){
                    $('#email').css({'border': "1px solid #DB4E35 "});
                    $('#emailError').text('Email already registered');
                    // valid = false;
                    disableSubmit();
                    
                }
                else{
                    $('#email').css({'border': "1px solid #4E6172 "});
                    $('#emailError').text('');

                    if (areAllFilled() == true){
                        enableSubmit();
                    }
                    // valid = true;    
                }
            });
            // valid = true;
        }
        // return valid;
    }

    function validPassword(pass){
        if(pass.val() == ''){
            $('#password').css({'border': "1px solid #DB4E35 "});
            $('#pwError').text('Password is required.');
            disableSubmit();
        }
        else if(pass.val().length < 5){
            $('#password').css({'border': "1px solid #DB4E35 "});
            $('#pwError').text('Password must be at least 5 characters.');
            disableSubmit();
        }
        else{
            $('#password').css({'border': "1px solid #4E6172 "});
            $('#pwError').text('');
            
            if (areAllFilled() == true)
                enableSubmit();
        }
    }

    function validCPassword(cpwname)
    {
        // var valid = true;

        if(cpwname.val() == '') 
        {
            valid = false;
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* confirmed password is required');
            disableSubmit();
        }
        else if(cpwname.val() != $('#password').val()){
            valid = false;
            $('#password').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* password and confirmed password do not match');
            disableSubmit();

        }
        else if (cpwname.val().length < 5){
            $('#cpassword').css({'border': "1px solid #DB4E35 "});
            $('#errorcpassword').text('Password must be at least 5 characters.');
            disableSubmit();
        }
        else{
            $('#password').css({
                'border' : '1.5px solid #DDDDDD'
            })
            $('#cpassword').css({
                        'border' : '1px solid #DDDDDD'
            })
            $('#errorcpassword').text("");

            if(areAllFilled() == true ){
                enableSubmit();
            }
            // valid = true;
        }
        // return valid;
    }

    $('#username').keyup(function(){
        // var user = $('#username');

        if ($('#username').val() == ""){
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username is required');
            disableSubmit();
        }
        else if($('#username').val().length < 4 || $('#username').val().length > 15){
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username must be 4-15 characters only.');
            disableSubmit();
        }
        else{
            $('#username').css({'border': "1px solid #4E6172 "});
            $('#usernameError').text('');

            username = $('#username').val();

            $.get('/getUsername', {username:username}, function(result){
                if(result){
                    if(result.username == username){
                        $('#username').css({'border': "1px solid #DB4E35 "});
                        $('#usernameError').text('Username already registered');
                        disableSubmit();
                    }
                    else {
                        // $('#username').css({'border': "1px solid #4E6172 "});
                        // $('#usernameError').text('');
                        if(areAllFilled())
                            enableSubmit();
                    }
                }
            });
        }
    });

    $('#fname').keyup(function(){
        // validateField($('#fname'));
        isFilled($('#fname'));
    });

    $('#lname').keyup(function(){
        // validateField($('#lname'));
        isFilled($('#lname'));
    });

    $('#password').keyup(function(){
        // validateField($('#password'));
        validPassword($('#password'));
    });

    $('#cpassword').keyup(function(){
        // validateField($('#password'));
        validCPassword($('#cpassword'));
    });

    $('#email').keyup(function(){
        // validateField($('#email'));
        validEmail($('#email'));
    });

});
