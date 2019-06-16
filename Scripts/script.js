$(document).ready(function() {

  var prevScrollpos = window.pageYOffset;

  $(document).on('click', '#index-navbar-btn', function(e) {
    e.preventDefault();
    showIndex();
  });

  $(document).on('click', '.index', function(e) {
    var indexJustOpened = true;
    hideIndex();
    $(window).scrollEnd(function() {
      if (indexJustOpened == true) {
        $(".navbar").addClass("hidden");
        indexJustOpened = false;
      }
    }, 200);
  });

  $(window).on("scroll", function() {
    var currentScrollPos = window.pageYOffset;

    if (window.pageYOffset > ($(".featured").outerHeight()) / 2) {
      $(".scroll-top-btn").attr("style", "opacity: 0.8;");
    } else {
      $(".scroll-top-btn").attr("style", "opacity: 0;");
    }

    if (currentScrollPos == 0) {
      $(".navbar").attr("style", "border-bottom: 5px solid rgba(149,128,116,0.5);");
    } else {
      $(".navbar").attr("style", "border-bottom: 5px solid rgba(149,128,116,1);");
    }

    if (prevScrollpos > currentScrollPos) {
      $(".navbar").removeClass("hidden");
    } else if (prevScrollpos < currentScrollPos && currentScrollPos > $(".navbar").outerHeight()) {
      $(".navbar").addClass("hidden");
    }
    prevScrollpos = currentScrollPos;
  });

  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
  };
});

function showIndex() {
  // Show index
  $(".index").attr("style", "height: 100%");
  // Disable page scrolling
  var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  ];
  var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
  html.data('scroll-position', scrollPosition);
  html.data('previous-overflow', html.css('overflow'));
  html.css('overflow', 'hidden');
  window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

function hideIndex() {
  // Hide index
  $(".index").attr("style", "height: 0%");
  // Enable page scrolling
  var html = jQuery('html');
  var scrollPosition = html.data('scroll-position');
  html.css('overflow', html.data('previous-overflow'));
  window.scrollTo(scrollPosition[0], scrollPosition[1])
}
