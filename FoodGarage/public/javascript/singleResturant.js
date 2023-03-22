var singleResturantProduct = [];
var singleResturantTemplate = "";

var getSingleResturantDetails = (code) =>{
    $.ajax({
        url: '/get/SingleProduct?code=' + code,
        method: 'GET',
        data: {},
        dataType: 'JSON',
        success : (data) =>{
            console.log(data);
            console.log(code);
            singleResturantProduct = data.singleProduct;
            getSingleProduct();
        }
    });
}

var getSingleProduct = () =>{
    $.ajax({
        url: 'templates/singleResturantProduct.htm',
        method: 'GET',
        success: (template) =>{
            console.log(template);
            singleResturantTemplate = Handlebars.compile(template);
            showProduct();
        }
    })
}

showProduct = () => {
    for(var i=0; i<singleResturantProduct.length; i++){
        $("#singleRestuarants").append(singleResturantTemplate(singleResturantProduct[i]));
    }
    console.log(singleResturantProduct);
}