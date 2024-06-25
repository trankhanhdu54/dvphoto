(function () {
    'use strict';
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }
        , BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        , iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        , Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        , Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }
        , any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    // Preloader 
    jQuery("#preloader").fadeOut(800);
    jQuery(".preloader-bg").delay(600).fadeOut(800);
    
    // Full Height
    var fullHeight = function () {
        if (!isMobile.any()) {
            jQuery('.js-fullheight').css('height', jQuery(window).height());
            jQuery(window).resize(function () {
                jQuery('.js-fullheight').css('height', jQuery(window).height());
            });
        }
    };
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        jQuery('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !jQuery(this.element).hasClass('animated')) {
                i++;
                jQuery(this.element).addClass('item-animate');
                setTimeout(function () {
                    jQuery('body .animate-box.item-animate').each(function (k) {
                        var el = jQuery(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            }
                            else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            }
                            else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            }
                            else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    
    /* *** Menu Navigation *** */
    var OnePageNav = function () {
        var navToggler = jQuery('.ann-js-dorothea-nav-toggle');
        jQuery(".smoothscroll[href^='#'], #ann-navbar ul li a[href^='#']").on('click', function (e) {
            e.preventDefault();
            var hash = this.hash;
            jQuery('html, body').animate({
                scrollTop: jQuery(hash).offset().top
            }, 700, 'easeInOutExpo', function () {
                window.location.hash = hash;
            });
        });
        jQuery("#ann-navbar ul li a[href^='#']").on('click', function (e) {
            if (navToggler.is(':visible')) {
                navToggler.click();
            }
        });
    };
    OnePageNav();
    jQuery(window).scroll(function () {
        var $this = jQuery(this)
            , st = $this.scrollTop()
            , navbar = jQuery('.dorothea-header');
        if (st > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled');
            }
        }
        if (st < 150) {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled sleep');
            }
        }
        if (st > 350) {
            if (!navbar.hasClass('awake')) {
                navbar.addClass('awake');
            }
        }
        if (st < 350) {
            if (navbar.hasClass('awake')) {
                navbar.removeClass('awake');
                navbar.addClass('sleep');
            }
        }
    });
    jQuery('.ann-js-dorothea-nav-toggle').on('click', function (e) {
        var $this = jQuery(this);
        e.preventDefault();
        if (jQuery('body').hasClass('menu-open')) {
            $this.removeClass('active');
            jQuery('.dorothea-menu .dorothea-menu-inner > ul > li').each(function (i) {
                var that = jQuery(this);
                setTimeout(function () {
                    that.removeClass('is-show');
                }, i * 100);
            });
            setTimeout(function () {
                jQuery('.dorothea-menu').removeClass('dorothea-menu-show');
            }, 800);
            jQuery('body').removeClass('menu-open');
        }
        else {
            jQuery('.dorothea-menu').addClass('dorothea-menu-show');
            $this.addClass('active');
            jQuery('body').addClass('menu-open');
            setTimeout(function () {
                jQuery('.dorothea-menu .dorothea-menu-inner > ul > li').each(function (i) {
                    var that = jQuery(this);
                    setTimeout(function () {
                        that.addClass('is-show');
                    }, i * 100);
                });
            }, 500);
        }
    });
    jQuery('nav .dropdown').hover(function () {
        var $this = jQuery(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function () {
        var $this = jQuery(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });
    jQuery('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
    });
    
    // Smooth Scrolling
    jQuery('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]').not('[href="#0"]').click(function (event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                // Figure out element to scroll to
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = jQuery(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        }
                        else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    
    // Slider
    var sliderMain = function () {
        jQuery('.flexslider').flexslider({
            animation: "fade"
            , slideshowSpeed: 5000
            , directionNav: true
            , start: function () {
                setTimeout(function () {
                    jQuery('.slider-text').removeClass('animated fadeInUp');
                    jQuery('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
            , before: function () {
                setTimeout(function () {
                    jQuery('.slider-text').removeClass('animated fadeInUp');
                    jQuery('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
        });
    };
    // Document on load.
    jQuery(function () {
        fullHeight();
        contentWayPoint();
        sliderMain();
    });
    // Show more
    jQuery(function() {
			jQuery(document).on( 'click', '.dorothea-more-trigger', function(event){
				event.preventDefault();
				if (jQuery('.dorothea-show-more-container').hasClass('visible')) {
					jQuery('.dorothea-show-more-container').toggleClass('animated');
					jQuery('.dorothea-show-more-container').removeClass('visible');
				} else {
					jQuery('.dorothea-show-more-container').addClass('visible');
					jQuery('.dorothea-show-more-container').removeClass('animated');
					jQuery('.dorothea-more-wrapper').addClass('hidden');
				}
			})

		});
    jQuery(function() {
      var self = this;
			var $grid = jQuery('.grid');

			$grid.each(function(){
				var $el = jQuery(this);
				var initial_items = 9;
				function showNextItems(pagination) {
					  var itemsMax = jQuery('.visible_item').length;
					  var itemsCount = 0;
					  jQuery('.visible_item').each(function () {
					    if (itemsCount < pagination) {
					        jQuery(this).removeClass('visible_item');
					        itemsCount++;
					    }
					  });
					  if (itemsCount >= itemsMax) {
					    jQuery('.shop-dorothea-more-trigger').hide();
					  }
				}
				jQuery('.shop-dorothea-more-trigger').on('click', function (e) {
					  e.preventDefault();
						var next_items = 9;
					  showNextItems(next_items);
				});
			});
		});
    // Progress-wrap
     var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = jQuery(window).scrollTop();
        var height = jQuery(document).height() - jQuery(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    jQuery(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
}());

// Accordion Box
  if (jQuery(".faqs-box").length) {
    jQuery(".faqs-box").on("click", ".acc-btn", function () {
      var outerBox = jQuery(this).parents(".faqs-box");
      var target = jQuery(this).parents(".accordion");

      if (jQuery(this).next(".acc-content").is(":visible")) {
        //return false;
        jQuery(this).removeClass("active");
        jQuery(this).next(".acc-content").slideUp(300);
        jQuery(outerBox).children(".accordion").removeClass("active-block");
      } else {
        jQuery(outerBox).find(".accordion .acc-btn").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(outerBox).children(".accordion").removeClass("active-block");
        jQuery(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        jQuery(this).next(".acc-content").slideDown(300);
      }
    });
  }
