
var registerRestuarantDetails = () =>{
    var restuarantData = {};
    restuarantData.name = $("#name").val();
    restuarantData.themeLine = $("#themeLine").val();
    restuarantData.ratings = $("#ratings").val();
    restuarantData.code = $("#code").val();
    restuarantData.restuarantIamge = imageUrl;

    console.log(restuarantData);
    $.ajax({
        type: "GET",
        url: "/add/newRestuarant",
        data: restuarantData,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}

var imageUrl = '';
var uploadRestuarantImage = () => {
    var uploadingFile = $('input[name=RestuarantImage]')[0].files[0];
    var formData = new FormData();
    formData.append("RestuarantImage", uploadingFile);

    $.ajax({
        url: '/upload/Image',
        method: 'POST',
        data: formData,
        encytype: 'multipart,form-data',
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: (response) =>{
            console.log(response);
            console.log("file uploaded successfully");
            imageUrl = response.filepath;
        }
    })
}