"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slideCount = slides.length;

    let currentIndex = 0;
    let isTransitioning = false;

    // Clone just one slide on each end
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slideCount - 1].cloneNode(true);
    track.appendChild(firstSlideClone);
    track.insertBefore(lastSlideClone, slides[0]);

    // Create indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';

    // Add indicators for each real slide (not clones)
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        indicator.addEventListener('click', () => {
            currentIndex = i + 1; // Add 1 because of the cloned slide
            updateCarousel(true);
        });
        indicatorsContainer.appendChild(indicator);
    }

    // Insert indicators after the carousel
    document.querySelector('.gallery-carousel-wrapper').appendChild(indicatorsContainer);

    // Initialize Featherlight for images and videos
    slides.forEach((slide) => {
        const video = slide.querySelector('video');
        if (video) {
            // Set up Featherlight for video slides
            const videoSrc = video.getAttribute('src');
            $(slide).featherlight({
                html: `<video controls autoplay loop style="width: 100%; height: auto;">
                           <source src="${videoSrc}" type="video/mp4">
                           Your browser does not support the video tag.
                       </video>`,
                closeOnClick: 'anywhere',
            });
        } else {
            // Set up Featherlight for image slides
            $(slide).featherlight({
                targetAttr: 'href',
                closeOnClick: 'anywhere',
            });
        }
    });

    // Adjust starting position
    currentIndex = 1;
    updateCarousel(false);

    // Add click handlers for prev/next buttons
    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        updateCarousel(true);
    });

    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        updateCarousel(true);
    });

    function updateCarousel(animate) {
        isTransitioning = animate;
        const slideWidth = slides[0].offsetWidth;
        const containerWidth = track.parentElement.offsetWidth;
        const offset = (containerWidth - slideWidth) / 2;
        const translateX = -currentIndex * slideWidth + offset;

        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        }

        track.style.transform = `translateX(${translateX}px)`;

        // Reset transition after animation
        if (!animate) {
            setTimeout(() => {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
            }, 50);
        }

        // Update active states for slides
        const realIndex = (currentIndex - 1 + slideCount) % slideCount;
        const allSlides = document.querySelectorAll('.carousel-slide');
        allSlides.forEach((slide, index) => {
            if (index - 1 === realIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === realIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Handle transitions at the ends of the carousel
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        // Jump to the appropriate position when reaching cloned slides
        if (currentIndex <= 0) {
            currentIndex = slideCount;
            updateCarousel(false);
        } else if (currentIndex >= slideCount + 1) {
            currentIndex = 1;
            updateCarousel(false);
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel(false);
        }, 250);
    });
});

