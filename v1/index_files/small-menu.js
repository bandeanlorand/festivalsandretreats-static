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

    // Add class if page is loaded and not at the top
    if (window.scrollY >= scrollThreshold) {
        header.classList.add("scrolled");
        document.body.classList.add("show-scroll-to-top");
    }

    // Function to handle scrolling behavior
    function handleScroll() {
        if (window.scrollY >= scrollThreshold) {
            header.classList.add("scrolled");
            document.body.classList.add("show-scroll-to-top"); // Show pseudo-element
        } else {
            header.classList.remove("scrolled");
            document.body.classList.remove("show-scroll-to-top"); // Hide pseudo-element
        }
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Detect click on `body:after` to scroll to top
    document.body.addEventListener("click", function (event) {
        if (event.target.closest("body") && document.body.classList.contains("show-scroll-to-top")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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


