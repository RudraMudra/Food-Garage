var singleRestuarantTemplate = "";

/**
 * Methoid to get the template
 * @param {*} type 
 */
var getRestuarantTemplate = () => {
    $.ajax({
        url: 'templates/singleResturantTemplate.htm',
        method: 'GET',
        success: function(responseTemplate){
            singleRestuarantTemplate = responseTemplate;
            console.log(responseTemplate);
            singleRestuarantTemplate = Handlebars.compile(singleRestuarantTemplate);
        }
    })
}



var loadTemplate = (type, code) =>{
    $("#mainTemplateContainer").addClass("background-image");
    var url = '';
    switch(type){
        case 'login':
            url = 'templates/login.htm';
            break;
        case 'forgotPwd':
            url = 'templates/forgotPwd.htm';
            break;
        case 'newSignUp':
            url = 'templates/signup.htm';
            break;
        case 'exploreFood':
            $("#mainTemplateContainer").removeClass("background-image");
            url = 'templates/Exploring.htm'
            break;
        case 'singleResturant':
            $("#mainTemplateContainer").removeClass("background-image");
            // $(".container").remove("Restaurants");
            url = 'templates/singleResturant.htm';
            break;
    }
    $.ajax({
        url: url,
        method: 'GET',
        success: function (responseTemplate) {
            $("#mainTemplateContainer").html(responseTemplate);
            if(type == 'exploreFood'){
                getRestuarantData({});
            }else if(type == 'singleResturant'){
                getSingleResturantDetails(code);
            }
        }
    })
}

var searchRestuarants = () =>{
    var Rdata = {
        searchText: $("#searchText").val()
    }
    console.log(Rdata);
    getRestuarantData(Rdata);
}


var getRestuarantData = (Rdata) =>{
    var url = '/get/restuarantDetails';
    $.ajax({
        method: "POST",
        url: url,
        data: Rdata,
        dataType: "JSON",
        success: function (response) {
            $("#exploreRestuarants").html("");
            var restuarantData = response.details;
            for(var i=0; i<restuarantData.length; i++){
                restuarantData[i].starTemplate = getRatingStarTemplate(restuarantData[i].ratings);
                $("#exploreRestuarants").append(singleRestuarantTemplate(restuarantData[i]));
            }
        },
        error: (err) =>{
            console.error();
        }
    })
}

var getRatingStarTemplate = (rating) =>{
    var startTemplate = '';
    var isHalfStarThere = false;
    if(rating %  1 == 0){
        isHalfStarThere = false;
    }else{
        isHalfStarThere = true;
    }
    for(var i=0; i<Math.floor(rating); i++){
        startTemplate += "<i class = 'fa fa-star'></i>";
    }
    if(isHalfStarThere){
        startTemplate += '<i class = "fa fa-star-half-empty"></i>';
    }
    var emptyStarCount = Math.floor(5 - rating);
    for(var i=0; i<emptyStarCount; i++){
        startTemplate += "<i class='fa fa-star-o'></i>";
    }
    return startTemplate;
}

$(document).ready(() =>{
    

    $.ajax({
        url: '/check/isUserLoggedin',
        method: 'POST',
        dataType: 'JSON',
        success: function (response) {
            console.log("response");
            console.log(response);
            if (response.isUserLoggedin) {    
                loadTemplate('exploreFood') ;
            }else{
                loadTemplate('login');
            }
        }
    })
    getRestuarantTemplate();
});


validateCustomer = () =>{
    var userInfo = {};
    userInfo.userAccountId = $("#userAccountId").val();
    userInfo.acctPwd = $("#userPassword").val();
    console.log(userInfo);

    $.ajax({
        method: "POST",
        url: "/validate/customer/details",
        data: userInfo,
        dataType: "JSON",
        success: function (response) {
            if(response.status == 'Success'){
                // valid user
                loadTemplate('exploreFood') ;
            }else{
                $("#loginError").show(100);
            }
        }
    });
}

var logoutUser = () =>{
    $.ajax({
        url: '/logout/Session',
        method: 'POST',
        dataType: 'JSON',
        success: (response) =>{
            loadTemplate('login');
        }
    })
}