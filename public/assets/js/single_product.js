



















$(function($) {

    "use strict";

    //===== 01. Main Menu
    function mainMenu() {
        // Variables
        var var_window = $(window),
            navContainer = $('.nav-container'),
            pushedWrap = $('.nav-pushed-item'),
            pushItem = $('.nav-push-item'),
            pushedHtml = pushItem.html(),
            pushBlank = '',
            navbarToggler = $('.navbar-toggler'),
            navMenu = $('.nav-menu'),
            navMenuLi = $('.nav-menu ul li ul li'),
            closeIcon = $('.navbar-close');
        // navbar toggler
        navbarToggler.on('click', function() {
            navbarToggler.toggleClass('active');
            navMenu.toggleClass('menu-on');
        });
        // close icon
        closeIcon.on('click', function() {
            navMenu.removeClass('menu-on');
            navbarToggler.removeClass('active');
        });

        // adds toggle button to li items that have children
        navMenu.find('li a').each(function() {
            if ($(this).next().length > 0) {
                $(this)
                    .parent('li')
                    .append(
                        '<span class="dd-trigger"><i class="flaticon-down-arrow"></i></span>'
                    );
            }
        });
        // expands the dropdown menu on each click
        navMenu.find('li .dd-trigger').on('click', function(e) {
            e.preventDefault();
            $(this)
                .parent('li')
                .children('ul')
                .stop(true, true)
                .slideToggle(350);
            $(this).parent('li').toggleClass('active');
        });

        // check browser width in real-time
        function breakpointCheck() {
            var windoWidth = window.innerWidth;
            if (windoWidth <= 1199) {
                navContainer.addClass('breakpoint-on');

                pushedWrap.html(pushedHtml);
                pushItem.hide();
            } else {
                navContainer.removeClass('breakpoint-on');

                pushedWrap.html(pushBlank);
                pushItem.show();
            }
        }

        breakpointCheck();
        var_window.on('resize', function() {
            breakpointCheck();
        });
    };
    // Document Ready
    $(document).ready(function() {
        mainMenu();
    });

    // jquery nice select js
    $('select').niceSelect();
    


    let controller = document.querySelector('.shop-big-slider')
    const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const productHeaing = Array.from(document.querySelectorAll(".product-title"));

const productId = searchParams.get("productId");
console.log(productId);
    const handleProduct = async () => {
        const res = await axios.get(`/products/${productId}`);
        const productData = res.data;
        productHeaing.map((elem)=>{
            elem.innerHTML = productData.title;
        })
        let finalArr = [...productData.images,productData.thumbnail];
        console.log(finalArr);
        finalArr.reverse().map((imgSrc,index)=>{
            const htmlString =
  '<div class="single-img">' +
  '<img src="/uploads/' + imgSrc + '" alt="img" />' +
  '</div>';
  const htmlString2 =
  '<div class="single-img">' +
  '<a  class="img-popup">' +
  '<img src="/uploads/' + imgSrc + '" alt="" />' +
  '</a>' +
  '</div>';
              
  $('.shop-big-slider').slick('slickAdd',htmlString);
  $('.shop-thumb-slider').slick('slickAdd',htmlString2);

            
        })
    }
    handleProduct();

    $('.shop-big-slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplaySpeed: 1500,
		asNavFor: '.shop-thumb-slider',
        fade: true,
        initialSlide:2,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="prev"><i class="icofont-arrow-left"></i></div>',
        nextArrow: '<div class="next"><i class="icofont-arrow-right"></i></div>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    $('.shop-thumb-slider').slick({
		dots: false,
		arrows: false,
		autoplaySpeed: 1500,
		focusOnSelect: true,
        vertical: true,
		asNavFor: '.shop-big-slider',
        initialSlide: 2,
		slidesToShow: 3,
		slidesToScroll: 1
    });


});
