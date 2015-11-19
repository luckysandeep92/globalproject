var BASE_URL = document.getElementById("app_base_url").getAttribute("data-url");

function ChangeTax() {
    var taxcount = $("#change_tax").val();
    if (taxcount < 0) {
        alert("Could not be less than one");
        $("#change_tax").val('');
    }
}

function getUserInfo() {
    phone_no = $("#webuser-web_user_contact_no").val();
    var alldata;
    if (phone_no != '') {
        $.ajax({
            url: JS_BASE_URL + "user/userinfo",
            data: "phone_no=" + phone_no,
            method: 'get',
            success: function(response) {
                alldata = $.parseJSON(response)
                if (alldata != '') {
                    $("#webuser-web_user_full_name").val(alldata['web_user_name']);
                    $('select>option[value="' + alldata['web_user_gender'] + '"]').prop('selected', true);
                    $("#webuser-web_user_contact_no").val(alldata['web_user_contact_no']);
                    $("#webuser-web_user_email").val(alldata['web_user_email']);
                    $("#address-address_line_1").val(alldata['address_line_1']);
                    $("#address-address_line_2").val(alldata['address_line_2']);
                } else {
                    $("#webuser-web_user_full_name").val('');
                    $('select>option[value="' + alldata['web_user_gender'] + '"]').prop('selected', false);
                    $("#webuser-web_user_contact_no").val('');
                    $("#webuser-web_user_email").val('');
                    $("#address-address_line_1").val('');
                    $("#address-address_line_2").val('');
                }
            }
        });
    }

}

$(function() {

    (function() {
        var customSelect = $('#hide_row'),
                customSelectInput = customSelect.find('input[type=text]');

        customSelectInput.next('.custom_select').css({
            'width': customSelectInput.width() + 'px'
        });

    })();


    $('#productcategorycuttype-product_category_name').autocomplete({
        source: BASE_URL + 'productcategorycuttype/getcategory',
        minLength: 2,
        select: function(event, ui) {
            $("#productcategorycuttype-product_category_name").val(ui.item.name);
            $("#productcategorycuttype-product_category_id").val(ui.item.id);
            //return false;
        }
    });
    $('.input-daterange').find('input').each(function() {

        $(this).datepicker({
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            format: 'yyyy-mm-dd'
        });
    });
    $(document).on('click', '#profile #mediaImg .pagination li a', function(e) {

        e.preventDefault();
        var hf = $(this).attr('href');

//        var term = $(this).siblings('#file_tags').val();
        $('#profile').find('#all_images #least').css('visibility', 'hidden');
        $('.ajax-loaf').css('display', 'block');

        $.ajax({
//            url: JS_BASE_URL + hf,
            url: hf,
            success: function(response) {
                $('#profile').find('#all_images').html($(response).find('#aResult').html());

                $('.fileTagTxt').val('');
                $('.fileTagTxt').attr('value', '');
                $('#File_Tag_Id').val('');
                $('#File_Tag_Id').attr('value', '');
                $('.ajax-loaf').css('display', 'none');
                $('#all_images .chImg').each(function() {
                    $(this).attr('id', window.vid);
                    $('.ajax-loaf').css('display', 'none');
                });

            }
        });


    });

    $("body").on('click', '#clicked_id', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var file_id = $(this).attr('data-id');
        $("#image_responsive" + window.gvar).remove();
        $("#imgText" + window.gvar).append("<img id='image_responsive" + window.gvar + "' src=" + href + " width='60' heigth='70' style='margin-left:111px;margin-top:-31px'> ");
        $("#image_name" + window.gvar).val(file_id);
//    $("div.row").remove();
        $("button.close").click();

//        alert("hi");
    });







    function delTagContentMainImg() {
        var r = confirm('Are you sure to delete ?');
        if (r == true) {
            $('#tagContentMainImg').find('img').remove();
            $('input[name="image_name[]"]').val('');
            $('.tagContentMainRemoveBtn').css('display', 'none');
        }
    }

    function removeImg(id) {
        var r = confirm('Are you sure to delete ?');
        if (r == true) {
            $('#remove_' + id).remove();
        }

    }

    function removeImgclass(id, obj) {
        $(obj).parents('.imageRender').remove();
        var imageRender = 0;
        $('body .imageRender').each(function() {

            $(this).attr('id', 'remove_' + imageRender);
            imageRender++;

        });
        var renderbutton = 0;
        $('body #renderbutton').each(function() {

            var sele = 'selectImg(' + renderbutton + ')';
            $(this).attr('onclick', sele);
            renderbutton++;
        });
        var renderImageDivChosedImage = 0;
        $('body .renderImageDivChosedImage').each(function() {

            $(this).attr('id', 'imgText' + renderImageDivChosedImage);
            renderImageDivChosedImage++;
        });
        var image_name = 0;
        $('body .image_name').each(function() {

            $(this).attr('id', 'image_name' + image_name);
            image_name++;
        });

        var imageId = 0;
        $('body #imageId').each(function() {

            $(this).attr('value', imageId);
            imageId++;
        });

    }

    function uploadImg2() {
        var getImageName = $('#selectImgValue').val();
        var getImageID = $('#selectImgID').val();
        var imgID = $('#imageId').val();
        $('.nav-tabs li,.secondnav li').removeClass('active');
        $('.nav-tabs li:first,.secondnav li:first').addClass('active');
        $('.tab-content div').removeClass('active in');
        $('.tab-content #profile').addClass('active in');
        $('#image_name' + imgID).val(getImageID);
        $('#imgText' + imgID).html('<img src="' + getImageName + '" height="60" width="70" />');
        $('#myModal').attr('class', 'modal fade');
        $('#myModal').attr("aria-hidden", "true");
        $('#myModal').css('display', 'none');
        $('.modal-backdrop').attr('class', 'modal-backdrop fade');
        $('.modal-backdrop').remove();
        $('body').attr('class', 'body');
        $('.body').removeAttr('style');
        stopPropogation();
    }
    function loadMediaImg() {
        $.ajax({
            type: 'get',
            url: JS_BASE_URL + 'content/getallimages',
            data: 'all_image=images',
            success: function(response) {
                $('#all_images').html(response);
            }
        });
    }

    function getImg(id) {
        $('.imgSelect').css('border', 'none');
        $('#img_' + id).css('border', '2px solid blue');
        var imgName = $('#img_' + id).attr('src');
        var imgTitle = $('#img_' + id).attr('title');
        $('#selectImgValue').val(imgName);
        $('#imageTitle').val(imgTitle);
        $('#selectImgID').val(id);
        $('.imageTitleDiv').show();

    }


    function mediaImage() {
        $('.media-image').css('background-color', '#fff');
        $('.upalod-image').css('background-color', '#e3e3e3');
        $('#media-image-file').show();
        $('#upload-image-file').hide();
        $('#uploadFile').val('');
        loadMediaImg();
    }

    function uploadImage() {
        $('.upalod-image').css('background-color', '#fff');
        $('.media-image').css('background-color', '#e3e3e3');
        $('#media-image-file').hide();
        $('#upload-image-file').show();
        $('#uploadFile').val('');
    }

    function cancleBtn() {
        $('.close').click();
    }


    function delContentMainImg() {
        var r = confirm('Are you sure to delete ?');
        if (r == true) {
            $('#ContentMainImg').find('img').remove();
            $('input[name="content_image_file_id"]').val('');
            $('.contentMainRemoveBtn').css('display', 'none');
        }
    }

    function delVideoContentMainImg() {
        var r = confirm('Are you sure to delete ?');
        if (r == true) {
            $('#videoContentMainImg').find('img').remove();
            $('input[name="video_id"]').val('');
            $('.videoContentMainRemoveBtn').css('display', 'none');
        }
    }

    function delTagContentMainImg() {
        var r = confirm('Are you sure to delete ?');
        if (r == true) {
            $('#tagContentMainImg').find('img').remove();
            $('input[name="image_name[]"]').val('');
            $('.tagContentMainRemoveBtn').css('display', 'none');
        }
    }

    $(function() {
        // For all Content except video
        $('.contentMainRemoveBtn').css('display', 'none');
        if ($('#ContentMainImg').find('img').length) {
            $('.contentMainRemoveBtn').css('display', 'block');
        }
        $('#ContentMainImg').bind("DOMSubtreeModified", function() {
            if ($('#ContentMainImg').find('img').length) {
                $('.contentMainRemoveBtn').css('display', 'block');
            }
        });

        // For Video
        $('.videoContentMainRemoveBtn').css('display', 'none');
        if ($('#videoContentMainImg').find('img').length) {
            $('.videoContentMainRemoveBtn').css('display', 'block');
        }
        $('#videoContentMainImg').bind("DOMSubtreeModified", function() {
            if ($('#videoContentMainImg').find('img').length) {
                $('.videoContentMainRemoveBtn').css('display', 'block');
            }
        });

        // For Tag
        $('.tagContentMainRemoveBtn').css('display', 'none');
        if ($('#tagContentMainImg').find('img').length) {
            $('.tagContentMainRemoveBtn').css('display', 'block');
        }
        $('#tagContentMainImg').bind("DOMSubtreeModified", function() {
            if ($('#tagContentMainImg').find('img').length) {
                $('.tagContentMainRemoveBtn').css('display', 'block');
            }
        });

    });





    function selectImg(id) {
        window.gvar = id;
        window.vid = 'chImgsel';
        $('.nav-tabs li').removeClass('active');
        $('.nav-tabs li:first').addClass('active');
        $('.nav-tabs li a').removeClass('active');
        $('.nav-tabs li a:first').addClass('active');
        $('.tab-content div').removeClass('active in');
        $('.tab-content #profile').addClass('active in');
        $('#profile').find('#all_images #least').css('visibility', 'hidden');
        $('.ajax-loaf').css('display', 'block');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-target', '#myModal');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-toggle', 'modal');
        $.ajax({
            url: JS_BASE_URL + 'productcategory/list',
            success: function(response) {

                $('#profile').find('#all_images').html($(response).find('#aResult').html());


                $('#all_images .chImg').each(function() {
                    $(this).attr('id', window.vid);
                });
                $('.ajax-loaf').css('display', 'none');

            }

        });


    }

    function selectImgvideo(id) {
        window.gvar = id;
        window.vid = 'chImgselvideo';
        $('.nav-tabs li').removeClass('active');
        $('.nav-tabs li:first').addClass('active');
        $('.nav-tabs li a').removeClass('active');
        $('.nav-tabs li a:first').addClass('active');
        $('.tab-content div').removeClass('active in');
        $('.tab-content #profile').addClass('active in');
        $('#profile').find('#all_images #least').css('visibility', 'hidden');
        $('.ajax-loaf').css('display', 'block');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-target', '#myModal');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-toggle', 'modal');
        $.ajax({
            url: JS_BASE_URL + 'productcategory/list',
            success: function(response) {

                $('#profile').find('#all_images').html($(response).find('#aResult').html());


                $('#all_images .chImg').each(function() {
                    $(this).attr('id', window.vid);
                });
                $('.ajax-loaf').css('display', 'none');

            }

        });


    }

    function selectImgpdf(id) {
        window.gvar = id;
        window.vid = 'chImgselpdf';
        $('.nav-tabs li').removeClass('active');
        $('.nav-tabs li:first').addClass('active');
        $('.nav-tabs li a').removeClass('active');
        $('.nav-tabs li a:first').addClass('active');
        $('.tab-content div').removeClass('active in');
        $('.tab-content #profile').addClass('active in');
        $('#profile').find('#all_images #least').css('visibility', 'hidden');
        $('.ajax-loaf').css('display', 'block');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-target', '#myModal');
        $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-toggle', 'modal');
        $.ajax({
            url: JS_BASE_URL + 'file/list',
            success: function(response) {

                $('#profile').find('#all_images').html($(response).find('#aResult').html());


                $('#all_images .chImg').each(function() {
                    $(this).attr('id', window.vid);
                });
                $('.ajax-loaf').css('display', 'none');

            }

        });


    }
    $(document).on('click', '#manage_media', function() {
        $('#profile').find('#all_images #least').css('visibility', 'hidden');
        $('.ajax-loaf').css('display', 'block');
        var type = $(this).attr('data-content-type');
        $.ajax({
            url: JS_BASE_URL + 'file/list?type=' + type,
            success: function(response) {

                $('#profile').find('#all_images').html($(response).find('#aResult').html());
                $('.fileTagTxt').val('');
                $('.fileTagTxt').attr('value', '');
                $('#File_Tag_Id').val('');
                $('#File_Tag_Id').attr('value', '');

                $('.ajax-loaf').css('display', 'none');
                $('#all_images .chImg').each(function() {
                    $(this).attr('id', window.vid);
                });

            }

        });

    });

    $(document).on('click', '#upload_media', function() {
        $('#upload_img_frame').attr('src', $('#upload_img_frame').attr('src'));

    });

    $(document).on('click', '#chImg', function(e) {
        e.preventDefault();
        $('#all_images .chImg').removeClass('chImgAct');
        $(this).addClass('chImgAct');
        var chImgAct = $(this);
        var Curl = JS_FE_BASE_URL;
        if ($(this).hasClass('chImgAct'))
        {

            if ($('.chImgAct .img-responsive').hasClass('image'))
            {
                var filePath = $(chImgAct).children('#img-responsive').attr('src');
                var fileTitle = $(chImgAct).children('#img-responsive').attr('alt');
                var fileId = $(chImgAct).children('#img-responsive').attr('data-id');
                var filetype = $(chImgAct).children('#img-responsive').attr('data-type');
                //var imgtag = '<img id="shareImg" src="' + filePath + '"  alt="' + fileTitle + '" style="width:250px;"/>';


                var imgtag = '<img id="shareImg" data-type="' + filetype + '" data-id="' + fileId + '" src="' + filePath + '"  alt="' + fileTitle + '" title="' + fileTitle + '" />';


            }
            if ($('.chImgAct .img-responsive').hasClass('video'))
            {
                var imgtag = '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + $(this).attr('data-url') + '"></iframe>';
            }
            if ($('.chImgAct .img-responsive').hasClass('pdf'))
            {
                var imgtag = '<iframe width="420" height="315" src="' + JS_CDN_URL + '' + $(this).attr('data-url') + $(this).attr('data-ext') + '"></iframe>';
            }
            if ($('.chImgAct .img-responsive').hasClass('audio'))
            {
                var imgtag = '<audio controls><source src="' + JS_CDN_URL + '' + $(this).attr('data-url') + $(this).attr('data-ext') + '" >Your browser does not support the audio element.</audio>';
            }
            tinyMCE.activeEditor.execCommand('mceInsertContent', false, imgtag);
            cancleBtn();
        }
        else
        {
            alert("Please select image");
        }
        if ($('#uploadFile').val() == '') {
            alert('Please select file');
            return false;
        }
    });


    $(document).on('click', '#chImgsel', function(e) {
        e.preventDefault();
        var obj = $(this);
        $('#all_images .chImg').removeClass('chImgAct');
        $(obj).addClass('chImgAct');
        $('.chImgAct').css('border', '1px solid #000');
        var chImgAct = $(this);
        if (chImgAct.length > 0)
        {


            var filePath = $(chImgAct).children('#img-responsive').attr('src');
            if ($(chImgAct).children('#img-responsive').hasClass('image')) {


                var fileTitle = $(chImgAct).children('#img-responsive').attr('alt');
                var fileId = $(chImgAct).children('#img-responsive').attr('data-id');
                var imgtag = '<img src="' + filePath + '"  alt="' + fileTitle + '" style="width:60px;height:60px;"/>';
                $('#imgText' + window.gvar).html(imgtag);
                $('#image_name' + window.gvar).attr('value', fileId);
                cancleBtn();

            }
            else
            {
                alert("Please select image");
            }


        }
        else
        {
            alert("Please select image");
        }
        if ($('#uploadFile').val() == '') {
            alert('Please select file');
            return false;
        }
    });
    $(document).on('click', '#chImgselvideo', function(e) {
        e.preventDefault();
        var obj = $(this);
        $('#all_images .chImg').removeClass('chImgAct');
        $(obj).addClass('chImgAct');
        $('.chImgAct').css('border', '1px solid #000');
        var chImgAct = $(this);
        if (chImgAct.length > 0)
        {


            var filePath = $(chImgAct).children('#img-responsive').attr('src');
            if ($(chImgAct).children('#img-responsive').hasClass('video')) {


                var fileTitle = $(chImgAct).children('#img-responsive').attr('title');
                var fileId = $(chImgAct).children('#img-responsive').attr('data-id');
                var imgtag = '<img src="' + filePath + '"  alt="' + fileTitle + '" style="width:60px;height:60px;"/>';
                $('#imgText' + window.gvar).html(imgtag);
                $('#image_name' + window.gvar).attr('value', fileId);
                cancleBtn();

            }
            else
            {
                alert("Please select Video");
            }


        }
        else
        {
            alert("Please select image");
        }
        if ($('#uploadFile').val() == '') {
            alert('Please select file');
            return false;
        }
    });

    $(document).on('click', '#chImgselpdf', function(e) {
        e.preventDefault();
        var obj = $(this);
        $('#all_images .chImg').removeClass('chImgAct');
        $(obj).addClass('chImgAct');
        $('.chImgAct').css('border', '1px solid #000');
        var chImgAct = $(this);
        if (chImgAct.length > 0)
        {


            var filePath = $(chImgAct).children('#img-responsive').attr('src');
            if ($(chImgAct).children('#img-responsive').hasClass('pdf')) {


                var fileTitle = $(chImgAct).children('#img-responsive').attr('title');
                var fileId = $(chImgAct).children('#img-responsive').attr('data-id');
                var imgtag = '<img src="' + filePath + '"  alt="' + fileTitle + '" style="width:60px;height:60px;"/>';
                $('#imgText' + window.gvar).html(imgtag);
                $('#image_name' + window.gvar).attr('value', fileId);
                cancleBtn();

            }
            else
            {
                alert("Please select Pdf");
            }


        }
        else
        {
            alert("Please select pdf");
        }
        if ($('#uploadFile').val() == '') {
            alert('Please select file');
            return false;
        }
    });
});
function selectImg(id) {

    window.gvar = id;
    window.vid = 'chImgsel';
    $('.nav-tabs li').removeClass('active');
    $('.nav-tabs li:first').addClass('active');
    $('.nav-tabs li a').removeClass('active');
    $('.nav-tabs li a:first').addClass('active');
    $('.tab-content div').removeClass('active in');
    $('.tab-content #profile').addClass('active in');
    $('#profile').find('#all_images #least').css('visibility', 'hidden');
    $('.ajax-loaf').css('display', 'block');
    $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-target', '#myModal');
    $('#remove_' + id).find('.renderImageDivButton').children('button').attr('data-toggle', 'modal');
    $.ajax({
        url: JS_BASE_URL + 'productcategory/list',
        success: function(response) {
            $('#profile').find('#all_images').html($(response).find('#aResult').html());


            $('#all_images .chImg').each(function() {
                $(this).attr('id', window.vid);
            });
            $('.ajax-loaf').css('display', 'none');

        }

    });


}


var i = 1;
function addMoreImg(id) {
    i = parseInt(i) + parseInt($('#imageId').val());
    var html = "<div id='remove_" + i + "' class='imageRender'>";
    html += "<div class='renderPlusIcon'>";
    html += "<i style='cursor: pointer;' class='glyphicon glyphicon-plus' onClick='addMoreImg(" + i + ");'></i>";
    html += "</div>";

    html += "<div class='renderRedIcon'>";
    html += "<i style='cursor: pointer;' class='glyphicon glyphicon-remove' onClick='removeImg(" + i + ");'></i>";
    html += "</div>";

    html += "<div  class='renderImageTitle'>";
    html += "<label>Image Title</label><br><input type='text' value='' name='image_title[]' class='form-control'></div>";
    html += "<div class='renderImageDiv'><label>Image</label><br/>";
    html += "<div class='mce-widget mce-btn mce-first mce-last renderImageDivButton' >";
    html += "<button id='renderbutton' tabindex='-1' type='button' role='presentation' onClick='selectImg(" + i + ");'>Select Image</button>";
    html += "</div>";
    html += "<input type='hidden' value='' id='image_name" + i + "' name='image_name[]'>";
    html += "<div class='renderImageDivAddButton'>";
    html += "<div id='imgText" + i + "' class='renderImageDivChosedImage'></div>";
    html += "</div></div></div>";

    $('#remove_' + id).after(html);
    i++;
}
function removeImg(id) {
    var r = confirm('Are you sure to delete ?');
    if (r == true) {
        $('#remove_' + id).remove();
    }

}