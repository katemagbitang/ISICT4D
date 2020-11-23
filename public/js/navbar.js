$(document).ready(function (req, res) {

    function preloadFunc()
    {


        $.get('/getsession',  function (data, status) {
            if(data.userType == "Regular"){
                $("#nav").hide();
                $("#navlog").show();
                $("#navadmin").hide();

            }else if(data.userType == "Admin"){
                $("#nav").hide();
                $("#navlog").hide();
                $("#navadmin").show();
            }else if(data.userType == "Visitor"){
                $("#nav").show();
                $("#navlog").hide();
                $("#navadmin").hide();
            }
            

            // if(data.userType == "Regular"){
            //     $('.addTCBtn').prop('disabled', false);

            // }else if(data.userType == "Admin"){
            //     $('.addTCBtn').hide();
            // }else if(data.userType == "Visitor"){
            //     $('.addTCBtn').prop('disabled', true);
            // }
            

        })

        // $.get('/getCartItemsCount', function(data, status){
        //     console.log("data: " + data);
        //     console.log("status: " + status);

        //     $('.navcartitemscount').html(data);
        // })

        // $.get('/getUnseenNotifsCount', function(data, status){
        //     $('.navnotifcount').html(data);


        // })

        




    };
    window.onpaint = preloadFunc();

    



    






})