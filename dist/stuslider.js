var StuSlider = /** @class */ (function () {
    function StuSlider(sliderClassPrefix, delay, sliderWidth, sliderHeight, showArrow, showDots, showPause, showAbout, defaultSlide) {
        if (showArrow === void 0) { showArrow = true; }
        if (showDots === void 0) { showDots = true; }
        if (showPause === void 0) { showPause = true; }
        if (showAbout === void 0) { showAbout = true; }
        if (defaultSlide === void 0) { defaultSlide = 0; }
        this.sliderClassPrefix = sliderClassPrefix;
        this.delay = delay;
        this.sliderWidth = sliderWidth;
        this.sliderHeight = sliderHeight;
        this.showArrow = showArrow;
        this.showDots = showDots;
        this.showPause = showPause;
        this.showAbout = showAbout;
        this.defaultSlide = defaultSlide;
        this.PauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="512px" viewBox="0 0 512 512" width="512px"><path d="M224,402.08751V109.83125C224,104.3875 218.6,100 211.8,100h-71.6c-6.8,0-12.2,4.3875-12.2,9.83125V402.08751C128,407.53125,133.4,412,140.2,412h71.6c6.8,0,12.2,-4.3875,12.2,-9.91249z" fill="#ffffff" /><path d="M371.8,100h-71.6c-6.7,0-12.2,4.3875-12.2,9.83125V402.08751C288,407.53125,293.4,412,300.2,412h71.6c6.7,0,12.2,-4.3875,12.2,-9.91249V109.83125C384,104.3875,378.6,100,371.8,100Z" fill="#ffffff" /></svg>';
        this.PlaySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M78.158003,51.843 25.842,82.048c-1.418,0.819-3.191,-0.206-3.191,-1.843V19.795c0,-1.638 1.773,-2.662 3.191,-1.843L78.158003,48.157c1.416997,0.819 1.416997,2.867 -9.99e-4,3.686z" fill="#ffffff"/></svg>';
        this.NextSvg = this.PlaySvg;
        this.PrevSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M23.715376,51.843 76.031375,82.048c1.418,0.819 3.191,-0.205 3.191,-1.843V19.795c0,-1.638 -1.773,-2.661 -3.191,-1.843L23.714376,48.157c-1.418001,0.819 -1.418001,2.867 10e-4,3.686z" fill="#ffffff"/></svg>';
        // `autoSlideTimer` must be null in case of just 1 slide
        this.autoSlideTimer = null;
        // setting up the default slide
        this.currentSlide = this.defaultSlide;
        // initiating styles
        new StuSliderCss(sliderClassPrefix, sliderWidth, sliderHeight);
        if (!document.querySelector(".".concat(this.sliderClassPrefix, "-slider-container")) || !document.querySelector(".".concat(this.sliderClassPrefix, "-slider"))
            || !document.querySelector(".".concat(this.sliderClassPrefix, "-slide"))) {
            throw new Error("No slider container or slider found");
        }
        else {
            this.sliderContainer = document.querySelector(".".concat(this.sliderClassPrefix, "-slider-container"));
            // inner slider
            this.slider = this.sliderContainer.querySelector(".".concat(this.sliderClassPrefix, "-slider"));
            // select all slides of the slider relative to sliderContainer
            this.slides = this.sliderContainer.querySelectorAll(".".concat(this.sliderClassPrefix, "-slide"));
        }
        // width of the slide in percentage
        this.slideWidthPercentage = 100 / this.slides.length;
        // display the slider
        this.displaySlider();
    }
    StuSlider.prototype.displayAbout = function () {
        if (this.showAbout) {
            // create about 
            this.aboutDiv = document.createElement('div');
            this.aboutP = document.createElement('p');
            this.aboutP.innerHTML = "?";
            this.aboutP.classList.add("".concat(this.sliderClassPrefix, "-about"), "".concat(this.sliderClassPrefix, "-button-label"));
            this.aboutDiv.appendChild(this.aboutP);
            this.controlDiv.appendChild(this.aboutDiv);
            // create about info
            var aboutInfo_1 = this.sliderContainer.querySelector(".".concat(this.sliderClassPrefix, "-aboutinfo"));
            if (!aboutInfo_1) {
                aboutInfo_1 = document.createElement('div');
                aboutInfo_1.className = "".concat(this.sliderClassPrefix, "-aboutinfo");
            }
            // click on about
            this.aboutP.addEventListener('click', function () {
                // add about to the body
                document.body.appendChild(aboutInfo_1);
                var developerInfo = "\n                    <div style=\"max-width: 600px; padding: 20px; color: #FFF; font-size: 1.2em; text-align: center;\">\n                        <h2>StuSlider - by HIRT Stephane</h2>\n                        <p>A new, very simple slider with no dependencies other than javascript and html5.</p>\n                        <ul style=\"list-style: none;\">\n                            <li>\uD83D\uDCA1 Smooth, responsive transition</li>\n                            <li>\uD83D\uDDB1 Easy control with buttons and navigation</li>\n                            <li>\u23F0 Automatic scrolling with pause option</li>\n                        </ul>\n                        <a href=\"https://github.com/Steform\" target=\"_blank\" style=\"color: #00F; text-decoration: underline;\">My Github</a>\n                    </div>\n                    ";
                aboutInfo_1.innerHTML = developerInfo;
                // add click event to close the about info
                aboutInfo_1.addEventListener('click', function () {
                    aboutInfo_1.style.display = 'none';
                });
                // add style to about
                aboutInfo_1.style.display = 'flex';
            });
        }
    };
    StuSlider.prototype.displayArrows = function () {
        var _this = this;
        if (this.showArrow) {
            // create left arrow div
            this.leftArrowDiv = document.createElement('div');
            this.leftArrowDiv.className = "".concat(this.sliderClassPrefix, "-left-arrow");
            this.leftArrowDiv.innerHTML = this.PrevSvg;
            this.leftArrowDiv.onclick = function () { return _this.goToPreviousSlide(); };
            // create right arrow div
            this.rightArrowDiv = document.createElement('div');
            this.rightArrowDiv.className = "".concat(this.sliderClassPrefix, "-right-arrow");
            this.rightArrowDiv.innerHTML = this.NextSvg;
            this.rightArrowDiv.onclick = function () { return _this.goToNextSlide(); };
        }
        if (this.showArrow && this.slides.length > 1) {
            this.sliderContainer.appendChild(this.leftArrowDiv);
            this.sliderContainer.appendChild(this.rightArrowDiv);
        }
    };
    StuSlider.prototype.displayDots = function () {
        var _this = this;
        if (this.showDots) {
            // create navigation div
            this.navigationDiv = document.createElement('div');
            this.navigationDiv.className = "".concat(this.sliderClassPrefix, "-navigation");
            // For all slides, create dots (label) and hidden radio
            this.slides.forEach(function (slide, index) {
                _this.radioInput = document.createElement('input');
                _this.radioInput.type = 'radio';
                _this.radioInput.name = 'slider';
                _this.radioInput.className = "".concat(_this.sliderClassPrefix, "-radio");
                _this.radioInput.id = "".concat(_this.sliderClassPrefix, "-slide").concat(index + 1);
                _this.radioInput.style.display = 'none';
                _this.radioLabel = document.createElement('label');
                _this.radioLabel.classList.add("".concat(_this.sliderClassPrefix, "-radio-label"));
                _this.radioLabel.htmlFor = "".concat(_this.sliderClassPrefix, "-slide").concat(index + 1);
                if (index === 0) {
                    _this.radioInput.checked = true;
                    _this.radioLabel.classList.add("active");
                }
                _this.radioInput.addEventListener('click', function () { return _this.onRadioClick(index); });
                _this.navigationDiv.appendChild(_this.radioInput);
                _this.navigationDiv.appendChild(_this.radioLabel);
            });
        }
        if (this.showDots && this.slides.length > 1) {
            this.controlDiv.appendChild(this.navigationDiv);
        }
    };
    StuSlider.prototype.displayPauseDiv = function () {
        var _this = this;
        if (this.showPause) {
            if (this.delay != 0) {
                // create pause div
                this.pauseDiv = document.createElement('div');
                this.pauseDiv.className = "".concat(this.sliderClassPrefix, "-pause");
                this.pauseDiv.style.zIndex = "1000";
                this.pauseDiv.style.marginLeft = "10px";
                // create pause div
                this.pauseInput = document.createElement('input');
                this.pauseInput.type = "checkbox";
                this.pauseInput.className = "".concat(this.sliderClassPrefix, "-pause-checkbox");
                this.pauseInput.checked = false;
                this.pauseInput.id = "".concat(this.sliderClassPrefix, "-pause-input");
                this.pauseInput.style.display = "none";
                // create pause label
                this.pauseLabel = document.createElement('label');
                this.pauseLabel.classList.add("".concat(this.sliderClassPrefix, "-button-label"));
                this.pauseLabel.htmlFor = "".concat(this.sliderClassPrefix, "-pause-input");
                this.pauseLabel.innerHTML = this.PauseSvg;
                // pause event (check / uncheck)
                this.pauseInput.addEventListener('change', function () {
                    var _a;
                    // pause or play
                    if (_this.pauseInput.checked) {
                        _this.pauseLabel.innerHTML = _this.PlaySvg;
                        clearInterval((_a = _this.autoSlideTimer) !== null && _a !== void 0 ? _a : 0);
                    }
                    else {
                        _this.pauseLabel.innerHTML = _this.PauseSvg;
                        _this.resetAutoSlideTimer();
                    }
                });
            }
        }
        if (this.showPause && this.slides.length > 1 && this.delay != 0) {
            this.pauseDiv.appendChild(this.pauseInput);
            this.pauseDiv.appendChild(this.pauseLabel);
            this.controlDiv.appendChild(this.pauseDiv);
        }
    };
    StuSlider.prototype.displaySlider = function () {
        var _this = this;
        this.displayArrows();
        // create control div
        this.controlDiv = document.createElement('div');
        this.controlDiv.className = "".concat(this.sliderClassPrefix, "-control");
        this.displayDots();
        this.displayPauseDiv();
        this.displayAbout();
        this.sliderContainer.appendChild(this.controlDiv);
        // define slide width
        this.slider.style.width = "".concat(100 * this.slides.length, "%");
        // for all slides, flex with the good width
        this.slides.forEach(function (slide) {
            slide.style.flex = "0 0 ".concat(_this.slideWidthPercentage, "%");
        });
        // start to slide
        this.resetAutoSlideTimer();
    };
    StuSlider.prototype.goToNextSlide = function () {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slideTo(this.currentSlide);
    };
    StuSlider.prototype.goToPreviousSlide = function () {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.slideTo(this.currentSlide);
    };
    // Method when click on a dot
    StuSlider.prototype.onRadioClick = function (index) {
        if (index !== this.currentSlide) {
            this.slideTo(index);
        }
        else {
            this.resetAutoSlideTimer();
        }
    };
    // Method to slide on a given index
    StuSlider.prototype.slideTo = function (index) {
        this.slider.style.transform = "translateX(-".concat(index * this.slideWidthPercentage, "%)");
        this.currentSlide = index;
        // check if slider is in pause mode
        if (this.showPause && !this.pauseInput.checked) {
            this.resetAutoSlideTimer();
        }
        // Updating active slide
        this.updateActiveSlide();
    };
    StuSlider.prototype.resetAutoSlideTimer = function () {
        var _this = this;
        var _a;
        clearInterval((_a = this.autoSlideTimer) !== null && _a !== void 0 ? _a : 0);
        if (this.delay !== 0) {
            this.autoSlideTimer = window.setInterval(function () { return _this.goToNextSlide(); }, this.delay);
        }
    };
    StuSlider.prototype.updateActiveSlide = function () {
        var _this = this;
        this.slides.forEach(function (slide, index) {
            slide.classList.toggle("active", index === _this.currentSlide);
        });
        if (this.showDots) {
            // select scoped radio labels and toggle active class
            var radioLabels = this.navigationDiv.querySelectorAll(".".concat(this.sliderClassPrefix, "-radio-label"));
            radioLabels.forEach(function (label, index) {
                label.classList.toggle("active", index === _this.currentSlide);
            });
        }
    };
    return StuSlider;
}());
export { StuSlider };
var StuSliderCss = /** @class */ (function () {
    function StuSliderCss(sliderClass, sliderWidth, sliderHeight) {
        var style = document.createElement('style');
        style.innerHTML = "\n        .".concat(sliderClass, "-slider-container {\n            overflow: hidden;\n            position: relative;\n            width: ").concat(sliderWidth, ";\n            height: ").concat(sliderHeight, ";\n        }\n\n        .").concat(sliderClass, "-slider {\n            display: flex;\n            width: 400%;\n            height: 100%;\n            transition: transform 0.6s ease;\n        }\n\n        .").concat(sliderClass, "-left-arrow, \n        .").concat(sliderClass, "-right-arrow {\n            position: absolute;\n            top: 50%;\n            transform: translateY(-50%);\n            width: 1.5vw;\n            height: 1.5vw;\n            font-size: 3vw;\n            opacity: 0.6;\n            color: #333;\n            cursor: pointer;\n            z-index: 1000;\n            user-select: none;\n            text-shadow: 0 0 5px white; \n            stroke: #333;\n            stroke-width: 3;\n            fill: none;\n            \n        }\n\n        .").concat(sliderClass, "-left-arrow {\n            left: 1.5%;\n        }\n\n        .").concat(sliderClass, "-right-arrow {\n            right: 1.5%;\n        }\n\n\n        .").concat(sliderClass, "-left-arrow:hover {\n            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);\n            color: #0056b3; \n        }\n\n        .").concat(sliderClass, "-right-arrow:hover {\n            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);\n            color: #0056b3; \n        }\n\n        @media (max-width: 768px) {\n            .").concat(sliderClass, "-left-arrow,\n            .").concat(sliderClass, "-right-arrow {\n                width: 3vw;\n                height: 3vw;\n                font-size: 3vw;\n            }\n        }\n\n        @media (max-width: 480px) {\n            .").concat(sliderClass, "-left-arrow,\n            .").concat(sliderClass, "-right-arrow {\n                width: 6.5vw;\n                height: 6.5vw;\n                font-size: 6.5vw;\n            }\n        }\n\n        @media screen and (max-width: 767px){\n\n            .").concat(sliderClass, "-slider-container {\n                height: 380px;\n            }\n\n        }\n\n        .").concat(sliderClass, "-slide {\n            flex: 0 0 25%;\n            height: 100%;\n            opacity: 1; /* Opacit\u00E9 par d\u00E9faut pour tous les slides */\n        }\n\n        .").concat(sliderClass, "-slide.active {\n            opacity: 1; /* Opacit\u00E9 pour le slide actif */\n        }\n\n        .").concat(sliderClass, "-control {\n            display: flex;\n            justify-content: center;\n            margin-top: -60px;\n        }\n\n        .").concat(sliderClass, "-navigation label {\n            width: 11px;\n            height: 11px;\n            margin: 5px;\n            cursor: pointer;\n            background-color: #333;\n            opacity: 0.6;\n            border-radius: 50%;\n            display: inline-block;\n            box-shadow: 0 0 1px 1px white;\n            font-family: Arial, sans-serif; \n        }\n\n        .").concat(sliderClass, "-navigation label.active {\n            opacity: 0.6; /* Opacit\u00E9 pour le bouton actif */\n        }\n\n        .").concat(sliderClass, "-navigation label:hover{\n\n            background-color: #0056b3; \n\n        }\n\n        .").concat(sliderClass, "-radio {\n            display: none;\n        }\n\n        .").concat(sliderClass, "-pause {\n\n            z-index: 1000;\n            margin-left:10px;\n\n        }\n\n        .").concat(sliderClass, "-pause-checkbox{\n\n            display:none;\n        }\n\n        .").concat(sliderClass, "-button-label{\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            padding: 2px 0px;\n            width: 28px;\n            height: 28px;\n            background-color: #333;\n            color: #FFFFFF; \n            border: none; \n            border-radius: 4px;\n            cursor: pointer;\n            text-decoration: none; \n            transition: background-color 0.3s; \n            opacity: 0.6;\n            user-select: none;\n            box-shadow: 0 0 1px 1px white;\n            margin: 0px;\n        }\n\n        .").concat(sliderClass, "-button-label:hover{\n            background-color: #0056b3; \n        }\n\n        .").concat(sliderClass, "-pause-label:active {\n            background-color: #004299; \n            transform: translateY(1px);\n            font-family: Arial, sans-serif; \n        }\n\n        .").concat(sliderClass, "-about {\n\n            z-index: 1000;\n            margin-left:10px;\n\n        }\n\n        .").concat(sliderClass, "-aboutinfo {\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.7);\n            z-index: 9999;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        ");
        document.head.appendChild(style);
    }
    return StuSliderCss;
}());
export { StuSliderCss };
//# sourceMappingURL=stuslider.js.map