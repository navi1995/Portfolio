﻿$(function () {
	var isAnimatedScroll = false;

	$(window).on("resize", setupHeaderSize);
	$(window).resize();
	$(window).scroll(function () {
		var heightToHit = Math.floor($("#aboutMeRows").offset().top / 100) * 100;
		var scrollHeight = $(window).scrollTop();

		if (scrollHeight >= heightToHit) {
			$(".navbar-container").addClass("solid-bar");
		} else {
			$(".navbar-container").removeClass("solid-bar");
		}

		if (!isAnimatedScroll) {
			$("#headerNavBar a").each(function () {
				var $navEl = $(this);
				var $el = $("#" + $navEl.attr("data-scroll"));

				if ($el.offset().top - 80 <= scrollHeight && $el.offset().top - 80 + $el.height() > scrollHeight) {
					$("#headerNavBar a").removeClass("active");
					$navEl.addClass("active");
				}
			});
		}

		setupVisibleElementAnimations();
	});
	setupNavigationClicks();
	$(window).on("load", setupHeaderSize);

	function setupNavigationClicks() {
		$("#headerNavBar a").off("click.navigate").on("click.navigate", function () {
			var $el = $(this);
			var $scrollToEl = $("#" + $el.attr("data-scroll"));

			if ($scrollToEl.length > 0) {
				scrollTo($scrollToEl);
			}

			$("#headerNavBar a").removeClass("active");
			$el.addClass("active");
		});
		$("#begin").off("click.letsStart").on("click.letsStart", function () {
			scrollTo($("#aboutMeRows"));
		});
	}

	function setupVisibleElementAnimations() {
		var $els = $("[data-animation]");
		var animationDelay = ".5s";

		$els.each(function () {
			var $el = $(this);

			if (isElementInView($el)) {
				console.log("in view");
			}

			if (isElementInView($el) && !$el.hasClass("animated")) {
				var animationClass = $el.attr("data-animation");

				$el.css({
					"-webkit-animation-delay": animationDelay,
					"-moz-animation-delay": animationDelay,
					"animation-delay": animationDelay
				});

				$el.addClass("animated").addClass(animationClass);
				$el.removeClass("invis");
			}
		});
	}

	function isElementInView(el) {
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	}

	function setupHeaderSize() {
		var browserHeight = $(window).height();
		var navbarHeight = $(".navbar-container").height();
		var headerTextHeight = $(".headers").height();
		var paddingY = (browserHeight - navbarHeight) / 2 - headerTextHeight / 2;

		//if (paddingY < 254) {
		//	paddingY = 254;
		//}

		$(".headers").css("padding", paddingY + "px 0px");
	}

	function scrollTo($el) {
		if ($el.length > 0) {
			isAnimatedScroll = true;

			$("html").animate({
				scrollTop: $el.offset().top - 80
			}, 1000, function () {
				isAnimatedScroll = false;
			});
		}
	}
});