function getProducts(){
    $.ajax({
        url: './php/products.php',
        type: "GET",
        dataType: "json",
        success: function (data) {
          let productsHTML = '<table class="table table-hover"><thead><th>S.No</th><th>Product Name</th><th>Product Short Description</th><th>Product Description</th><th>Product Cost - 1/2L</th><th>Product Cost - 1L</th><th>Product Cost - 5L</th><th>Product Image</th><th>Action</th></thead><tbody>';
           $(data).each(function(i, product){
              productsHTML += '<tr>'+
                  '<td>'+ String(i+1) +'</td>'+
                  '<td id="product_name_'+String(i)+'">'+ product.product_name +'</td>'+
                  '<td id="product_short_desc_'+String(i)+'">'+ product.short_desc +'</td>'+
                  '<td id="product_long_desc_'+String(i)+'" class="pre-line">'+ product.long_desc +'</td>'+
                  '<td id="product_price_'+String(i)+'">'+ product.product_price +'</td>'+
                  '<td id="product_price_2_'+String(i)+'">'+ product.product_price_2 +'</td>'+
                  '<td id="product_price_3_'+String(i)+'">'+ product.product_price_3 +'</td>'+
                  '<td id="product_image_'+String(i)+'">'+ '<img src="images/products/' + product.product_image_name + '" class="img-responsive" alt="" style="height:100px;width:100px;">' +'</td>'+
                  '<td>'+ '<center><button href="#update-product-form" class="btn btn-success update-product-form-popup-link" onclick="updateProductForm(\''+product.product_id+','+String(i)+'\');" style="color:white;">Edit <i class="fa fa-edit"></i></button> / <button class="btn btn-danger" onclick="deleteProduct('+product.product_id+',\''+product.product_image_name+'\');" style="color:white;">Delete <i class="fa fa-remove"></i></button></center>' + '</td>'+
              '</tr>';
          });
          productsHTML += '</tbody></table>';
          $('#products-table').html(productsHTML);
          $('.update-product-form-popup-link').magnificPopup({
            type:'inline',
            midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            callbacks: {
                open: function() {
                  $.magnificPopup.instance.close = function() {
                    $('#update-form-product-name').val('');
                    $('#update-form-product-short-desc').val('');
                    $('#update-form-product-long-desc').val('');
                    $('#update-form-product-price').val('');
                    $('#update-form-product-price-2').val('');
                    $('#update-form-product-price-3').val('');
                    $('#update-form-product-image').val('');
                    $('#update-form-product-image-old').val('');
                    $('#update-form-product-id').val('');
            
                    // Call the original close method to close the popup
                    $.magnificPopup.proto.close.call(this);
                  };
                }
              }
          });
        }
      });
}

function logout(){
    $.ajax({
        url: './php/logout.php',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            let res = JSON.parse(data);
            console.log(res);
            let success = res.success;
            if (success)
            {
                location.href = './index.html';
            }
        }
      });
}

(function ($) {

    "use strict";
  
      // PRE LOADER
      $(window).load(function(){
        $('.preloader').fadeOut(1000); // set duration in brackets    
      });
  
  
      // MENU
      $('.navbar-collapse a').on('click',function(){
        $(".navbar-collapse").collapse('hide');
      });
  
  
      // PARALLAX EFFECT
      $.stellar({
        horizontalScrolling: false,
      }); 
  
      
      $('.navbar-collapse a').on('click',function(){
        $(".navbar-collapse").collapse('hide');
      });

  
      // PRODUCT FORM
      $('.add-product-form-popup-link').magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        callbacks: {
            open: function() {
              $.magnificPopup.instance.close = function() {
                $('#add-form-product-name').val('');
                $('#add-form-product-short-desc').val('');
                $('#add-form-product-long-desc').val('');
                $('#add-form-product-price').val('');
                $('#add-form-product-price-2').val('');
                $('#add-form-product-price-3').val('');
                $('#add-form-product-image').val('');
                $('#add-form-product-image-old').val('');
                $('#add-form-product-id').val('');
                document.getElementById('add-product-form').getElementsByClassName('text-danger')[0].getElementsByClassName.display = 'none';
        
                // Call the original close method to close the popup
                $.magnificPopup.proto.close.call(this);
              };
            }
          }
      });

      $('.change-password-form-popup-link').magnificPopup({
        type:'inline',
        midClick: true,
        callbacks: {
            open: function() {
              $.magnificPopup.instance.close = function() {
                document.getElementById('change-password-form').getElementsByClassName('text-danger')[0].getElementsByClassName.display = 'none';
        
                // Call the original close method to close the popup
                $.magnificPopup.proto.close.call(this);
              };
            }
          }
      });

      $('.social-contact-form-popup-link').magnificPopup({
        type:'inline',
        midClick: true
      });
      
  
      
      $("#product-danger-alert").hide();
      $("#product-success-alert").hide();
      $(getProducts());
  
      // WOW ANIMATION
      new WOW({ mobile: false }).init();
  
  })(jQuery);

  function displaySuccessAlert(content){
    $('#product-success-alert-content').html(content);
    let boxWidth = $('#product-success-alert').width();
    $("#product-success-alert").show();
    $("#product-success-alert").animate({
        width: boxWidth
    });
    setTimeout(function(){
        $("#product-success-alert").animate({
        width: 0
        });
        let successAlert = '<div class="alert alert-box alert-success" id="product-success-alert">'+
        '<button type="button" class="close" data-dismiss="alert">x</button>'+
        '<strong>Success! </strong> <span id="product-success-alert-content"></span>'+
        '</div>';
        $('#product-success-alert').remove();
        $('#team').append(successAlert);
        $("#product-success-alert").hide();
    }, 5000);
  }

  function displayDangerAlert(content){
    $('#product-danger-alert-content').html(content);
        let boxWidth = $('#product-danger-alert').width();
        $("#product-danger-alert").show();
        $("#product-danger-alert").animate({
            width: boxWidth
        });
        setTimeout(function(){
            $("#product-danger-alert").animate({
            width: 0
            });
            let dangerAlert = '<div class="alert alert-box alert-danger" id="product-danger-alert">'+
            '<button type="button" class="close" data-dismiss="alert">x</button>'+
            '<strong>Error! </strong> <span id="product-danger-alert-content"></span>'+
            '</div>';
            $('#product-danger-alert').remove();
            $('#team').append(dangerAlert);
                $("#product-danger-alert").hide();
        }, 5000);
  }

  function deleteProduct(productId, productImageName){
      let del = confirm('Are you sure want to delete this product?');
      if(del)
      {
        $.ajax({
            url: './php/deleteProduct.php',
            type: "POST",
            dataType: "json",
            data: {product_id: productId, product_image_name: productImageName},
            success: function (data) {
                let res = JSON.parse(data);
                let success = res.success;
                if (success)
                {
                    getProducts();
                    displaySuccessAlert('The Product has been deleted successfully');
                }
                else
                {
                    displayDangerAlert('Error in deleting the Product (May be the product already deleted)');
                }
            }
          });
      }
  }

  function updateProductForm(productIdWithIndex){
    let productIndex = productIdWithIndex.split(',')[1];
    let oldProductImageName =  $('#product_image_'+productIndex+' img').attr('src').split('/').slice(-1);
    let oldProductName = $('#product_name_'+productIndex).html();
    let oldProductShortDesc = $('#product_short_desc_'+productIndex).html();
    let oldProductLongDesc = $('#product_long_desc_'+productIndex).html();
    let oldProductPrice = $('#product_price_'+productIndex).html();
    let oldProductPrice2 = $('#product_price_2_'+productIndex).html();
    let oldProductPrice3 = $('#product_price_3_'+productIndex).html();
    $('#update-form-product-name').val(oldProductName);
    $('#update-form-product-short-desc').val(oldProductShortDesc);
    $('#update-form-product-long-desc').val(oldProductLongDesc);
    $('#update-form-product-price').val(oldProductPrice);
    $('#update-form-product-price-2').val(oldProductPrice2);
    $('#update-form-product-price-3').val(oldProductPrice3);
    $('#update-form-product-id').val(productIdWithIndex);
    $('#update-form-product-image-old').val(oldProductImageName);

  }

  function updateProduct(){
    let productIdWithIndexArray = $('#update-form-product-id').val().split(',');
    let productId = productIdWithIndexArray[0];
    let productIndex = productIdWithIndexArray[1];
    let oldProductName = $('#product_name_'+productIndex).html();
    let oldProductShortDesc = $('#product_short_desc_'+productIndex).html();
    let oldProductLongDesc = $('#product_long_desc_'+productIndex).html();
    let oldProductPrice = $('#product_price_'+productIndex).html();
    let oldProductPrice2 = $('#product_price_2_'+productIndex).html();
    let oldProductPrice3 = $('#product_price_3_'+productIndex).html();
    let newProductName = $('#update-form-product-name').val();
    let newProductShortDesc = $('#update-form-product-short-desc').val();
    let newProductLongDesc = $('#update-form-product-long-desc').val();
    let newProductPrice = $('#update-form-product-price').val();
    let newProductPrice2 = $('#update-form-product-price-2').val();
    let newProductPrice3 = $('#update-form-product-price-3').val();
    let productImage = document.getElementById('update-form-product-image').files[0];
    let productImageName = productImage!==undefined? productImage.name: '';
    let oldProductImageName = $('#update-form-product-image-old').val();
    let updateProductData = new FormData();
    updateProductData.append('product_id', productId);
    if (oldProductName!==newProductName)
        updateProductData.append('product_name', newProductName);
    if (oldProductShortDesc!==newProductShortDesc)
        updateProductData.append('short_desc', newProductShortDesc);
    if (oldProductLongDesc!==newProductLongDesc)
        updateProductData.append('long_desc', newProductLongDesc);
    if (oldProductPrice!==newProductPrice)
        updateProductData.append('product_price', newProductPrice);
    if (oldProductPrice2!==newProductPrice2)
        updateProductData.append('product_price_2', newProductPrice2);
    if (oldProductPrice3!==newProductPrice3)
        updateProductData.append('product_price_3', newProductPrice3);
    if (productImageName!=='' && productImageName!==undefined)
    {
        updateProductData.append('product_old_image_name', oldProductImageName);
        updateProductData.append('product_image_name', productImageName);
        updateProductData.append('product_image', productImage);
    }

    let oldBtnData = onSubmitted('#update-form-product-submit');
    $.ajax({
        url: './php/updateProduct.php',
        type: "POST",
        dataType: 'json',
        data: updateProductData,
        processData: false,
        contentType: false,
        success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            if (success)
            {
                getProducts();
                document.getElementsByClassName('mfp-close')[0].click();
                displaySuccessAlert('The Product has been updated successfully');
            }
            else
            {
                document.getElementsByClassName('mfp-close')[0].click();
                displayDangerAlert('Error in updating the selected Product (May be no changes detected)');
            }
            afterSubmitted('#update-form-product-submit', oldBtnData);
        }
      });
    }

function addProduct(){
    let newProductName = $('#add-form-product-name').val();
    let newProductShortDesc = $('#add-form-product-short-desc').val();
    let newProductLongDesc = $('#add-form-product-long-desc').val();
    let newProductPrice = $('#add-form-product-price').val();
    let newProductPrice2 = $('#add-form-product-price-2').val();
    let newProductPrice3 = $('#add-form-product-price-3').val();
    let productImage = document.getElementById('add-form-product-image').files[0];
    let productImageName = productImage!==undefined? productImage.name: '';
    if((newProductName===undefined || newProductName==='') || (newProductShortDesc===undefined || 
    newProductShortDesc==='') || (newProductLongDesc===undefined || newProductLongDesc==='') || 
    (newProductPrice===undefined || newProductPrice==='') || (newProductPrice2===undefined ||
    newProductPrice2==='') || (newProductPrice3===undefined ||
        newProductPrice3==='') || (productImageName===undefined || productImageName==='')){
            document.getElementById('add-product-form').getElementsByClassName('text-danger')[0].style.display = 'block';
            return;
        }
    let oldBtnData = onSubmitted('#add-form-product-submit');
    let addProductData = new FormData();
    addProductData.append('product_name', newProductName);
    addProductData.append('short_desc', newProductShortDesc);
    addProductData.append('long_desc', newProductLongDesc);
    addProductData.append('product_price', newProductPrice);
    addProductData.append('product_price_2', newProductPrice2);
    addProductData.append('product_price_3', newProductPrice3);
    addProductData.append('product_image_name', productImageName);
    addProductData.append('product_image', productImage);
    $.ajax({
        url: './php/addProduct.php',
        type: "POST",
        dataType: 'json',
        data: addProductData,
        processData: false,
        contentType: false,
        success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            if (success)
            {
                getProducts();
                document.getElementsByClassName('mfp-close')[0].click();
                displaySuccessAlert('The Product has been added successfully');
            }
            else
            {
                document.getElementsByClassName('mfp-close')[0].click();
                displayDangerAlert('Error in add new Product');
            }
            afterSubmitted('#add-form-product-submit', oldBtnData);
        }
      });
}

function changePassword(){
    let password = $('#change-password').val();
    let confirmPassword = $('#confirm-password').val();
    if(password !== confirmPassword){
            document.getElementById('change-password-form').getElementsByClassName('text-danger')[0].style.display = 'block';
            return;
        }
    let oldBtnData = onSubmitted('#change-password-submit');
    $.ajax({
        url: './php/changePassword.php',
        type: "POST",
        dataType: 'json',
        data: {password: password},
        success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            afterSubmitted('#change-password-submit',oldBtnData);
            if (success)
            {
                document.getElementsByClassName('mfp-close')[0].click();
                displaySuccessAlert('Password changed successfully. You will be logged out within 5 seconds. Re-login to access your account');
                setTimeout(function(){
                    logout();
                }, 5000);
            }
            else
            {
                document.getElementsByClassName('mfp-close')[0].click();
                displayDangerAlert('Error in changing Password');
            }
        }
      });
}

function getcontact(){
    $.ajax({
        url: './php/getContact.php',
        type: "GET",
        dataType: 'json',
        success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            if (success)
            {
                $('#social-email').val(res.email);
                $('#social-tel').val(res.tel);
                $('#social-wa').val(res.wa);
                $('#social-fb').val(res.fb);
                $('#social-insta').val(res.insta);
            }
        }
      });
}

function updateContact(){
    let email = $('#social-email').val();
    let tel = $('#social-tel').val();
    let wa = $('#social-wa').val();
    let fb = $('#social-fb').val();
    let insta = $('#social-insta').val();
    let oldBtnData = onSubmitted('#scf-submit');
    $.ajax({
        url: './php/updateContact.php',
        type: "POST",
        dataType: 'json',
        data: {email: email, tel: tel,wa: wa, fb: fb, insta: insta},
        success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            afterSubmitted('#scf-submit',oldBtnData);
            document.getElementsByClassName('mfp-close')[0].click();
            if (success)
            {
                displaySuccessAlert('Contact Form Updated Successfully');
            }
            else{
                displayDangerAlert('Error in updating contact (May be no changes detected)');
            }
        }
      });
}

function onSubmitted(locator){
    let oldButtonData = $(locator).html();
    $(locator).html('<i class="fa fa-refresh fa-spin" style="25px;"></i>');
    $(locator).prop('disabled', true);
    return oldButtonData;
}
  
function afterSubmitted(locator, oldButtonData){
    $(locator).prop('disabled', false);
    $(locator).html(oldButtonData);
}
  