/**
 * Handles toggling the main navigation menu for small screens.
 */
jQuery( document ).ready( function( $ ) {
	var $masthead = $( '#masthead' ),
	    timeout = false;

	$.fn.smallMenu = function() {
		$masthead.find( '.site-navigation' ).removeClass( 'main-navigation' ).addClass( 'main-small-navigation' );
		$masthead.find( '.site-navigation h1' ).removeClass( 'assistive-text' ).addClass( 'menu-toggle' );

		$( '.menu-toggle' ).unbind( 'click' ).click( function() {
			$masthead.find( '.menu' ).toggle();
			$( this ).toggleClass( 'toggled-on' );
			// $( this ).slideToggle(1000);
		} );
	};

	// Check viewport width on first load.
	if ( $( window ).width() < 1024 )
		$.fn.smallMenu();

	// Check viewport width when user resizes the browser window.
	$( window ).resize( function() {
		var browserWidth = $( window ).width();

		if ( false !== timeout )
			clearTimeout( timeout );

		timeout = setTimeout( function() {
			if ( browserWidth < 1024 ) {
				$.fn.smallMenu();
			} else {
				$masthead.find( '.site-navigation' ).removeClass( 'main-small-navigation' ).addClass( 'main-navigation' );
				$masthead.find( '.site-navigation h1' ).removeClass( 'menu-toggle' ).addClass( 'assistive-text' );
				$masthead.find( '.menu' ).removeAttr( 'style' );
			}
		}, 200 );
	} );
} );

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header"); // Select the header element
    const scrollThreshold = 88; // Scroll distance in pixels
    const scrollToTopButton = document.createElement("button"); // Create the scroll-to-top button

    // Add class if page is loaded and not at the top
    if (window.scrollY >= scrollThreshold) {
        header.classList.add("scrolled");
    }

    // Function to handle scrolling behavior
    function handleScroll() {
        if (window.scrollY >= scrollThreshold) {
            header.classList.add("scrolled");
            scrollToTopButton.style.display = "block"; // Show the button
        } else {
            header.classList.remove("scrolled");
            scrollToTopButton.style.display = "none"; // Hide the button
        }
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Create the scroll-to-top button
    scrollToTopButton.className = "scroll-to-top";
    scrollToTopButton.innerText = "↑";
    scrollToTopButton.style.position = "fixed";
    scrollToTopButton.style.bottom = "20px";
    scrollToTopButton.style.right = "20px";
    scrollToTopButton.style.padding = "2px 15px 10px 15px";
    scrollToTopButton.style.fontSize = "20px";
    scrollToTopButton.style.cursor = "pointer";
    scrollToTopButton.style.display = "none"; // Initially hidden
    scrollToTopButton.style.border = "none";
    scrollToTopButton.style.borderRadius = "5px";
    scrollToTopButton.style.backgroundColor = "rgba(51, 51, 51, 0.7)";
    scrollToTopButton.style.color = "#fff";
    scrollToTopButton.style.zIndex = "1000";

    document.body.appendChild(scrollToTopButton); // Add button to the page

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Run on page load to check initial position
    handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    function onYouTubeIframeAPIReady() {
        document.querySelectorAll("iframe.home-youtube-video").forEach((iframe) => {
            if (iframe.src.includes("youtube.com/embed")) {
                const player = new YT.Player(iframe, {
                    events: {
                        "onStateChange": function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                iframe.classList.add("video-playing");
                            } else {
                                // iframe.classList.remove("video-playing");
                            }
                        }
                    }
                });
            }
        });
    }

    // Load YouTube API script if not already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
        onYouTubeIframeAPIReady();
    }
});


