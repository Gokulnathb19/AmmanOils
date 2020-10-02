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

    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
    });


    // SLIDER
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
    })


    // PARALLAX EFFECT
    $.stellar({
      horizontalScrolling: false,
    }); 


    // MAGNIFIC POPUP  
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    // LOGIN FORM
    $('.login-popup-link').magnificPopup({
      type:'inline',
      midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      callbacks: {
        open: function() {
          $.magnificPopup.instance.close = function() {
            // Do whatever else you need to do here
            document.getElementById('login-form').getElementsByClassName('text-warning')[0].style.display = "none";
            document.getElementById('login-form').getElementsByClassName('text-danger')[0].style.display = "none";
            document.getElementById('login-form').getElementsByClassName('text-success')[0].style.display = "none";
            $('#username').val('');
            $('#password').val('');
    
            // Call the original close method to close the popup
            $.magnificPopup.proto.close.call(this);
          };
        }
      }
    });

    $('#adminAccess').click(function(){
      $.ajax({
        url: './php/validateSession.php',
        type: "GET",
        dataType: "json",
        success: function (data) {
          let res = JSON.parse(data);
          let success = res.success;
          if (success)
            location.href = './admin.html';
          else{
            document.getElementById('login-form').getElementsByClassName('text-warning')[0].style.display = "none";
            document.getElementById('login-form').getElementsByClassName('text-danger')[0].style.display = "none";
            document.getElementById('login-form').getElementsByClassName('text-success')[0].style.display = "none";
            $('#username').val('');
            $('#password').val('');
            $.magnificPopup.open({
              items: {
                  src: '#login-form',
                  type: 'inline'
              }
            });
          }
        }
      });
    });

    $('#login-submit').click(function(){
      document.getElementById('login-form').getElementsByClassName('text-warning')[0].style.display = "none";
      document.getElementById('login-form').getElementsByClassName('text-danger')[0].style.display = "none";
      document.getElementById('login-form').getElementsByClassName('text-success')[0].style.display = "none";
      let username = $('#username').val();
      let password = $('#password').val();
      if (username == '' || username == undefined || password == '' || password == undefined)
        document.getElementById('login-form').getElementsByClassName('text-warning')[0].style.display = 'block';
      else{
        let oldBtnData = onSubmitted('#login-submit');
        $.ajax({
          url: './php/validateLogin.php',
          type: "POST",
          dataType: "json",
          data: {username: username, password: password},
          success: function (data) {
            let res = JSON.parse(data);
            let success = res.success;
            if (!success)
              document.getElementById('login-form').getElementsByClassName('text-danger')[0].style.display = 'block';
            else
              location.href = './admin.html';
            afterSubmitted('#login-submit', oldBtnData);
          }
        });
      }
    });
    
    let socialForm = function(products){
      $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      });

      // SOCIAL FORM
      let socialFormContentBeforeSubmitBtn = '<div class="white-popup-block"><div id="social-contact"><center><h2 class="text-primary">Order Details</h2><h6 class="text-success">Your order has been sent successfully. Our Team will contact you as soon as possible. Thank you!</h6><h6 class="text-danger">Please fill or select all the fields</h6><h6 class="text-warning">Email or Mobile No or Litre(s) Quantity is invalid</h6></center><div class="col-md-6 col-sm-6"><input type="text" class="form-control" id="scf-name" name="name" placeholder="Full name"></div><div class="col-md-6 col-sm-6"><input type="text" class="form-control" id="scf-mobNo" name="mobno" placeholder="Mobile No"></div><div class="col-md-12 col-sm-12"><input type="email" class="form-control" id="scf-email" name="email" placeholder="Email address"></div>';
      for(let i=0; i<products.length; i++)
      {
        /*socialFormContentBeforeSubmitBtn += '<div class="custom-control custom-checkbox mb-3">'+
        '<input type="checkbox" class="" id="product'+String(i)+'" value="'+products[i]+'" name="products">'+
        '<label class="" for="product'+String(i)+'">'+products[i]+'</label></div>'+*/
        socialFormContentBeforeSubmitBtn += '<div class="col-md-12 col-sm-12"><label class="checkbox">'+ products[i] +
        '<input type="checkbox" name="scf-products" value="'+products[i]+'">'+
        '<span class="checkmark"></span></label>'+
        '<div style="display: none;" name="scf-litres"><div class="col-md-6"><b>Litre(s)</b></div><div class="col-md-6"><b>Quantity</b></div><div class="col-md-6">1/2 Litre(s)</div><div class="col-md-6"><input class="form-control" type="number" min="0" max="1000" value="0"></div><div class="col-md-6">1 Litre(s)</div><div class="col-md-6"><input class="form-control" type="number" min="0" max="1000" value="0"></div><div class="col-md-6">5 Litre(s)</div><div class="col-md-6"><input class="form-control" type="number" min="0" max="1000" value="0"></div></div></div>';
      //'<select class="form-control" style="display:none;" name="scf-litres"><option value="select">Litres</option><option value="1/2">1/2 Litre(s)</option><option value="1">1 Litre(s)</option><option value="5">5 Litre(s)</option></select>';
        //socialFormContentBeforeSubmitBtn += '<option value="'+products[i]+'">'+products[i]+'</option>';
      }
      socialFormContentBeforeSubmitBtn += '<center><h6 class="text-success">Your order has been sent successfully. Our Team will contact you as soon as possible. Thank you!</h6><h6 class="text-danger">Please fill or select all the fields</h6><h6 class="text-warning">Email or Mobile No or Litre(s) Quantity is invalid</h6></center>';
      //socialFormContentBeforeSubmitBtn += '</select><select class="form-control" id="scf-litres"><option value="select">Litres</option><option value="1/2L">1/2 Litre</option><option value="1L">1 Litre</option></select>';
      let socialFormContentSubmitBtnWa = '<button class="form-control" id="scf-submit" name="submit" onclick="sendWaMessage()">Order Now</button>';
      let socialFormContentSubmitBtnMail = '<button class="form-control" id="scf-submit" name="submit" onclick="sendEmailMessage()">Order Now</button>';
      let socialFormContentAfterSubmitBtn = '</div></div>';
      $('.social-form-wa').magnificPopup({
        items: {
            src: socialFormContentBeforeSubmitBtn + socialFormContentSubmitBtnWa + socialFormContentAfterSubmitBtn,
            type: 'inline'
        }
      });

      $('.social-form-mail').magnificPopup({
        items: {
          src: socialFormContentBeforeSubmitBtn + socialFormContentSubmitBtnMail + socialFormContentAfterSubmitBtn,
            type: 'inline'
        }
      });
    }

    $(function(){
        $.ajax({
            url: './php/getContact.php',
            type: "GET",
            dataType: 'json',
            success: function (data) {
                let res = JSON.parse(data);
                let success = res.success;
                if (success)
                {
                    $('#social-email-href').attr('href','mailto:'+res.email);
                    $('#social-tel-href').attr('href', 'tel:'+res.tel);
                    $('#social-wa-href').attr('href', 'https://api.whatsapp.com/send/?phone=91'+res.tel+'&text='+window.encodeURIComponent('Hi Amman Edible Oils,\r\n'));
                    $('#social-tel').html(res.tel);
                    $('#social-fb-href').attr('href', res.fb);
                    $('#social-insta-href').attr('href', res.insta);
                }
            }
          });
    });


    // SMOOTHSCROLL
    $(function() {
      try {
        $('.custom-navbar a, #home a').on('click', function(event) {
          var $anchor = $(this);
            $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
              event.preventDefault();
        });
      } catch (error) {
        console.log(error);
      }
    });


    $(function() {
      $.ajax({
        url: './php/products.php',
        type: "GET",
        dataType: "json",
        success: function (data) {
          let productsHTML = '';
          let products = [];
           $(data).each(function(i, product){
             products.push(product.product_name);
              productsHTML += '<div class="col-md-4 col-sm-4">'+
                '<div class="team-thumb wow fadeInUp" data-wow-delay="0.2s">'+
                    '<img src="images/products/'+product.product_image_name+'" class="img-responsive" alt="" style="height:500px;">'+
                          '<div href="#product-desc-popup-'+String(i)+'" class="open-popup-link team-hover">'+
                              '<div class="team-item">'+
                                    '<h4>'+product.product_name+'</h4>'+ 
                                    '<h4>1/2L - Rs.'+product.product_price+'</h4>'+
                                    '<h4>1L - Rs.'+product.product_price_2+'</h4>'+
                                    '<h4 style="color:#ce3232;">5L - Rs.'+product.product_price_3+'</h4>'+
                                    '<ul class="social-icon">'+
                                        '<li><a  class="fa fa-whatsapp social-form-wa"></a></li>'+
                                        '<li><a  class="fa fa-envelope-o social-form-mail"></a></li>'+
                                    '</ul>'+
                              '</div>'+
                              '<div id="product-desc-popup-'+String(i)+'" class="white-popup mfp-hide">'+
                                    '<center>'+
                                        '<h3>'+product.product_name+'</h3><h6>(1/2L - Rs.'+product.product_price+', 1L - Rs.'+product.product_price_2+', <span style="color:#ce3232;">5L - Rs.'+product.product_price_3+'</span>)</h6>'+
                                        '<ul class="social-icon">'+
                                              '<li><a  class="fa fa-whatsapp social-form-wa" onclick="setProduct(`'+product.product_name+'`);"></a></li>'+
                                              '<li><a  class="fa fa-envelope-o social-form-mail" onclick="setProduct(`'+product.product_name+'`);"></a></li>'+
                                        '</ul>'+
                                    '</center>'+
                                    '<p class="justified-text pre-line">'+product.long_desc+'</p>'+
                              '</div>'+
                          '</div>'+
                '</div>'+
                '<div class="team-info">'+
                    '<h3>'+product.product_name+'</h3>'+
                    '<p>'+product.short_desc+'</p>'+
                '</div>'+
            '</div>';
          });
          $('#products').html(productsHTML);
          socialForm(products);
        }
      });
    });

    $(function(){
      let d = new Date();
      $('#current-year').html(d.getFullYear());
    });


    // WOW ANIMATION
    new WOW({ mobile: false }).init();

})(jQuery);

let setProduct = function(product){
  console.log('setting product');
  var timer = setInterval(myTimer, 10);
  function myTimer(){
    let prodlength = $('input[name="scf-products"]').length;
    console.log(prodlength);
    if(prodlength > 0)
      {
        $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
        $("input[name='scf-products']").change(function(){
          let litres = document.getElementsByName('scf-litres');
           $.each($("input[name='scf-products']"), function(index){
        
                  if($(this).prop('checked'))
                    litres[index].style.display = "block";
                  else
                    litres[index].style.display = "none";
        
              });
              $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
        });
        $.each($("input[name='scf-products']"), function(index){
        
          if($(this).val() === product)
          {
            $(this).click();
          }

      });
        clearInterval(timer);
      }
  }
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

function sendMessage(type){
  for(let i=0; i<2; i++){
    document.getElementById('social-contact').getElementsByClassName('text-danger')[i].style.display = 'none';
    document.getElementById('social-contact').getElementsByClassName('text-warning')[i].style.display = 'none';
    document.getElementById('social-contact').getElementsByClassName('text-success')[i].style.display = 'none';
  }
  let name = $('#scf-name').val();
  let email = $('#scf-email').val();
  let mobNo = $('#scf-mobNo').val();
  let litres = [];
  let products = [];
  let isQuantityNull = false;
  let invalidQuantity = false;
  let equalToZero = false;
  let litresElements = $('div[name="scf-litres"]');
  $.each($("input[name='scf-products']"), function(index){
        
    if($(this).prop('checked'))
      {
        products.push($(this).val());
        let litresValues = {};
        litresValues['1/2L'] = litresElements.eq(index).children('div').eq(3).children('input').val();
        litresValues['1L'] = litresElements.eq(index).children('div').eq(5).children('input').val();
        litresValues['5L'] = litresElements.eq(index).children('div').eq(7).children('input').val();
        litresValues['1/2L'] = (litresValues['1/2L'] === undefined)? "":litresValues['1/2L'];
        litresValues['1L'] = (litresValues['1L'] === undefined)? "":litresValues['1L'];
        litresValues['5L'] = (litresValues['5L'] === undefined)? "":litresValues['5L'];
        litres.push(litresValues);
        if(litresValues['1/2L'] === '' && litresValues['1L'] === '' && litresValues['5L'] === '')
          isQuantityNull = true;
        if(!litresValues['1/2L'].match("^[0-9]+$") || !litresValues['1L'].match("^[0-9]+$") || !litresValues['5L'].match("^[0-9]+$"))
          invalidQuantity = true;
        if(!litresValues['1/2L'].match("^[1-9][0-9]*$") && !litresValues['1L'].match("^[1-9][0-9]*$") && !litresValues['5L'].match("^[1-9][0-9]*$"))
          equalToZero = true;
        
      }

  });
  if((name === undefined || name === '') || (email === undefined || email === '') || (mobNo === undefined
     || mobNo === '') || isQuantityNull || (products === undefined || products === '' 
     || products.length === 0)){
      for(let i=0; i<2; i++){
        document.getElementById('social-contact').getElementsByClassName('text-danger')[i].style.display = 'block'; 
      }
      $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
      return;
     }
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || !(mobNo.length === 10 && mobNo.match("^[0-9]+$")) || invalidQuantity){
      for(let i=0; i< 2; i++){
        document.getElementById('social-contact').getElementsByClassName('text-warning')[i].style.display = 'block'; 
        document.getElementById('social-contact').getElementsByClassName('text-warning')[i].innerHTML = "Email or Mobile No or Litre(s) Quantity is invalid";
      }
      $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
      return;
    }
  if(equalToZero){
      for(let i=0; i<2; i++){
        document.getElementById('social-contact').getElementsByClassName('text-warning')[i].style.display = 'block'; 
        document.getElementById('social-contact').getElementsByClassName('text-warning')[i].innerHTML = "For all the selected products, atleast one of the available litre(s) should be greater than zero";
      }
      $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
      return;
  }
  products = products.join(',');
  let oldBtnData = onSubmitted('#scf-submit');
  let urlEndPoint, errMessageType;
  if(type === 'wa')
  {
    urlEndPoint = 'sendWAMessage.php';
    errMessageType = 'Whatsapp Message';
  }
  else if(type === 'email'){
    urlEndPoint = 'sendEmail.php';
    errMessageType = 'Email';
  }
  $.ajax({
    //url: './php/' + 'check.php',
    url: './php/' + urlEndPoint,
    type: "POST",
    data: {name: name,email: email, mobile: mobNo, litres: litres, products: products},
    dataType: "json",
    success: function (data) {
      let res = JSON.parse(data);
      let success = res.success;
      if(success)
      {
        for(let i=0; i<2;i++){
          document.getElementById('social-contact').getElementsByClassName('text-success')[i].style.display = 'block';
        }
        $('.white-popup-block').height($('#scf-submit').offset().top + $('#scf-submit').height() - $('.white-popup-block').offset().top);
      }
      else
        console.log('Error: Error in sending '+ errMessageType);
      afterSubmitted('#scf-submit', oldBtnData);
    }
  });
  //console.log('json req:', {name: name,email: email, mobile: mobNo, litres: litres, products: products});
}

function sendWaMessage(){
  sendMessage('wa');
}

function sendEmailMessage(){
  sendMessage('email');
}

function forgetPassword(){
  document.getElementById('login-form').getElementsByClassName('text-warning')[0].style.display = "none";
  document.getElementById('login-form').getElementsByClassName('text-danger')[0].style.display = "none";
  document.getElementById('login-form').getElementsByClassName('text-success')[0].style.display = "none";
  let oldBtnData = onSubmitted('#login-submit');
  $.ajax({
    url: './php/forgetPassword.php',
    type: "POST",
    dataType: "json",
    success: function (data) {
      let res = JSON.parse(data);
      let success = res.success;
      if(success)
        document.getElementById('login-form').getElementsByClassName('text-success')[0].style.display = 'block';
      else
        console.log('Error: Error in retrieving the password');
      afterSubmitted('#login-submit', oldBtnData);
    }
  });
}
