class StuSlider{

    sliderClass="";

    constructor(sliderClass, slideDelay, sliderWidth, sliderHeight, showArrow=1, showDots = 1, showPause = 1, showAbout = 1, defaultSlide=0) {

        this.sliderClass = sliderClass;

        // AutoSlideTimer must be null in case of just 1 slide
        this.autoSlideTimer = null

        // Load the wanted delay to this instance
        this.delay = slideDelay

        // setting up the default slide
        this.currentSlide = defaultSlide;
        this.showArrow = showArrow;
        this.showDots = showDots;
        this.showPause = showPause;
        this.showAbout = showAbout;


        const sliderStyles = new StuSliderCss(sliderClass, sliderWidth, sliderHeight);

        // Select slider container
        this.sliderContainer = document.querySelector(`.${sliderClass}-slider-container`);

        // Select the slider relative to sliderContainer
        this.slider = this.sliderContainer.querySelector(`.${sliderClass}-slider`);

        // Select all slides of the slider relative to sliderContainer
        this.slides = this.sliderContainer.querySelectorAll(`.${sliderClass}-slide`);

        // If only one slide
        if (this.slides.length === 1) {
            //cancel interval
            clearInterval(this.autoSlideTimer);
        }

        // How many pixels in percentage represent a slide in width
        this.slideWidthPercentage = 100 / this.slides.length;

        // Binding the methods to the instance
        this.goToNextSlide = this.goToNextSlide.bind(this);
        this.goToPreviousSlide = this.goToPreviousSlide.bind(this);
        this.onRadioClick = this.onRadioClick.bind(this);

        // Generate UI of the slider by this function
        this.setupSlider();

    }



    // Method to go to the next slide
    goToNextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slideTo(this.currentSlide);
    }

    // Method to go to the previous slide
    goToPreviousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.slideTo(this.currentSlide);
    }

    // Method that generate UI of the slider
    setupSlider(){

        if(this.showArrow == 1){

            // Create left arrow div
            this.leftArrowDiv = document.createElement('div');
            this.leftArrowDiv.className = `${this.sliderClass}-left-arrow`;
            this.leftArrowDiv.innerHTML = '&#x25C0;';
            this.leftArrowDiv.onclick = () => this.goToPreviousSlide();

            // Create right arrow div
            this.rightArrowDiv = document.createElement('div');
            this.rightArrowDiv.className = `${this.sliderClass}-right-arrow`;
            this.rightArrowDiv.innerHTML = '&#x25B6;';
            this.rightArrowDiv.onclick = () => this.goToNextSlide();

        }




        // Create control div
        this.controlDiv = document.createElement('div');
        this.controlDiv.className = `${this.sliderClass}-control`;

        if (this.showDots == 1){

            // Create navigation div
            this.navigationDiv = document.createElement('div');
            this.navigationDiv.className = `${this.sliderClass}-navigation`;

            // For all slides, create dots (label) and hidden radio
            this.slides.forEach((slide, index) => {

                this.radioInput = document.createElement('input');
                this.radioInput.type = 'radio';
                this.radioInput.name = 'slider';
                this.radioInput.className = `${this.sliderClass}-radio`; 
                this.radioInput.id = `${this.sliderClass}-slide${index + 1}`;

                this.radioInput.style.display = 'none';

                if (index === 0) this.radioInput.checked = true;

                this.radioLabel = document.createElement('label');
                this.radioLabel.classList.add(`${this.sliderClass}-radio-label`);
                this.radioLabel.htmlFor = `${this.sliderClass}-slide${index + 1}`;
                if (index === 0) this.radioLabel.classList.add(`active`);

                this.radioInput.addEventListener('click', () => this.onRadioClick(index));

                this.navigationDiv.appendChild(this.radioInput);
                this.navigationDiv.appendChild(this.radioLabel);
            });
        }

        if (this.showPause == 1){

            // Create pause div
            this.pauseDiv = document.createElement('div');
            this.pauseDiv.className = `${this.sliderClass}-pause`;
            this.pauseDiv.style.zIndex = "1000";
            this.pauseDiv.style.marginLeft = "10px";

            // Create pause div
            this.pauseInput = document.createElement('input');
            this.pauseInput.type = "checkbox";
            this.pauseInput.className = `${this.sliderClass}-pause-checkbox`;
            this.pauseInput.checked = false;
            this.pauseInput.id = `${this.sliderClass}-pause-input`;
            this.pauseInput.style.display = "none";

            // Create pause label
            this.pauseLabel = document.createElement('label');
            this.pauseLabel.classList.add(`${this.sliderClass}-button-label`);
            this.pauseLabel.htmlFor = `${this.sliderClass}-pause-input`;
            this.pauseLabel.innerHTML= "\u23F8";

        



            // pause event (check / uncheck)
            this.pauseInput.addEventListener('change', function() {
                // Pause or play in inner html
                if (this.pauseInput.checked) {
                    this.pauseLabel.innerHTML = "\u23F5";
                    clearInterval(this.autoSlideTimer);
                } else {
                    this.pauseLabel.innerHTML = "\u23F8";
                    this.resetAutoSlideTimer();
                }
            }.bind(this));

        }

        if(this.showAbout == 1){

            // Create about 
            this.aboutDiv = document.createElement('div');
            this.aboutP = document.createElement('p');
            this.aboutP.innerHTML = "?"
            this.aboutP.classList.add(`${this.sliderClass}-about`, `${this.sliderClass}-button-label`);
            this.aboutDiv.appendChild(this.aboutP);
        
        }
        // If more than 1 slide
        if (this.slides.length > 1) {
        
            if (this.showArrow == 1){
                // Add arrow
                this.sliderContainer.appendChild(this.leftArrowDiv);
                this.sliderContainer.appendChild(this.rightArrowDiv);
            }

            if (this.showDots == 1){
                // Add navigation
                this.controlDiv.appendChild(this.navigationDiv);
            }
            if (this.showPause == 1){
                // Add pause
                this.pauseDiv.appendChild(this.pauseInput);
                this.pauseDiv.appendChild(this.pauseLabel);
                this.controlDiv.appendChild(this.pauseDiv);
            }

            if (this.showAbout == 1){
                this.controlDiv.appendChild(this.aboutDiv);
            }
            
            // Add all controls
            this.sliderContainer.appendChild(this.controlDiv);
        
        }else{
            if(this.showAbout == 1){
                // Just about control
                this.controlDiv.appendChild(this.aboutDiv);
            }
            this.sliderContainer.appendChild(this.controlDiv);
        
        }

        if (this.showAbout == 1) {
            // Click on about
            this.aboutP.addEventListener('click', () => {
                // Create about info
                let aboutInfo = this.sliderContainer.querySelector(`.${this.sliderClass}-AboutInfo`);
                if (!aboutInfo) {
                    aboutInfo = document.createElement('div');
                    aboutInfo.className = `${this.sliderClass}-AboutInfo`;

                    // Add about to the body
                    document.body.appendChild(aboutInfo);
            
                    // 
                    const developerInfo = `
                    <div style="max-width: 600px; padding: 20px; color: #FFF; font-size: 1.2em; text-align: center;">
                        <h2>StuSlider - by HIRT Stephane</h2>
                        <p>A new, very simple slider with no dependencies other than javascript and html5.</p>
                        <ul>
                            <li>💡 Smooth, responsive transition</li>
                            <li>🖱 Easy control with buttons and navigation</li>
                            <li>⏰ Automatic scrolling with pause option</li>
                        </ul>
                        <a href="https://github.com/Steform" target="_blank" style="color: #00F; text-decoration: underline;">My Github</a>
                    </div>
                    `;
            
                    aboutInfo.innerHTML = developerInfo;
            
                    // Add click event to quit
                    aboutInfo.addEventListener('click', function() {
                        aboutInfo.style.display = 'none';
                    });
                }
            
                // Add style to about
                aboutInfo.style.display = 'flex';
            });
        }
        
        // Define slide width
        this.slider.style.width = `${100 * this.slides.length}%`;
        
        // For all slides, flex with the good width
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${this.slideWidthPercentage}%`;
        });

        // Start to slide
        this.resetAutoSlideTimer();

    }

    // Method when click on a dot
    onRadioClick(index) {
        if (index !== this.currentSlide) {
            this.slideTo(index);
        } else {
            this.resetAutoSlideTimer();
        }
    }

    // Method to slide on a given index
    slideTo(index) {
        this.slider.style.transform = `translateX(-${index * this.slideWidthPercentage}%)`;
        this.currentSlide = index;
        
        if (this.showPause == 1) {
            // Check if slider is in pause mode
            if (!this.pauseInput.checked) {
                this.resetAutoSlideTimer();
            }
        }
        
        // Updating active slide
        this.updateActiveSlide();
    }

    resetAutoSlideTimer() {
        clearInterval(this.autoSlideTimer);
        this.autoSlideTimer = setInterval(this.goToNextSlide.bind(this), this.delay);
    }

    updateActiveSlide() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle(`active`, index === this.currentSlide);
        });
    
        if (this.showDots == 1){
            // Sélectionnez les labels de radio spécifiques à cette instance
            const radioLabels = this.navigationDiv.querySelectorAll(`.${this.sliderClass}-radio-label`);
            radioLabels.forEach((label, index) => {
                label.classList.toggle(`active`, index === this.currentSlide);
            });
        }
    }    

}



class StuSliderCss{

    constructor(sliderClass, sliderWidth, sliderHeight){


        const style = document.createElement('style');
        style.innerHTML = `
        .${sliderClass}-slider-container {
            overflow: hidden;
            position: relative;
            width: ${sliderWidth};
            height: ${sliderHeight};
        }

        .${sliderClass}-slider {
            display: flex;
            width: 400%;
            height: 100%;
            transition: transform 0.6s ease;
        }

        .${sliderClass}-left-arrow, 
        .${sliderClass}-right-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 1.5vw;
            height: 1.5vw;
            font-size: 1.5vw;
            opacity: 0.6;
            color: #333;
            cursor: pointer;
            z-index: 1000;
            user-select: none;
            text-shadow: 0 0 5px white; 
        }    

        .${sliderClass}-left-arrow {
            left: 1.5%;
        }

        .${sliderClass}-right-arrow {
            right: 1.5%;
        }


        .${sliderClass}-left-arrow:hover {
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
            color: #0056b3; 
        }

        .${sliderClass}-right-arrow:hover {
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
            color: #0056b3; 
        }

        /* Media query pour les écrans de largeur maximale de 768px (tablette) */
        @media (max-width: 768px) {
            .${sliderClass}-left-arrow,
            .${sliderClass}-right-arrow {
                width: 3vw;
                height: 3vw;
                font-size: 3vw;
            }
        }

        /* Media query pour les écrans de largeur maximale de 480px (mobile) */
        @media (max-width: 480px) {
            .${sliderClass}-left-arrow,
            .${sliderClass}-right-arrow {
                width: 6.5vw;
                height: 6.5vw;
                font-size: 6.5vw;
            }
        }

        @media screen and (max-width: 767px){

            .${sliderClass}-slider-container {
                height: 380px;
            }

        }

        .${sliderClass}-slide {
            flex: 0 0 25%;
            height: 100%;
            opacity: 1; /* Opacité par défaut pour tous les slides */
        }

        .${sliderClass}-slide.active {
            opacity: 1; /* Opacité pour le slide actif */
        }

        .${sliderClass}-control {
            display: flex;
            justify-content: center;
            margin-top: -60px;
        }

        .${sliderClass}-navigation label {
            width: 11px;
            height: 11px;
            margin: 5px;
            cursor: pointer;
            background-color: #333;
            opacity: 0.6;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 1px 1px white;
        }

        .${sliderClass}-navigation label.active {
            opacity: 0.6; /* Opacité pour le bouton actif */
        }

        .${sliderClass}-navigation label:hover{

            background-color: #0056b3; 

        }

        .${sliderClass}-radio {
            display: none;
        }

        .${sliderClass}-pause {

            z-index: 1000;
            margin-left:10px;

        }

        .${sliderClass}-pause-checkbox{

            display:none;
        }

        .${sliderClass}-button-label{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px 0px;
            width: 28px;
            height: 28px;
            background-color: #333;
            color: #FFFFFF; 
            border: none; 
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none; 
            font-family: Arial, sans-serif; 
            transition: background-color 0.3s; 
            opacity: 0.6;
            user-select: none;
            box-shadow: 0 0 1px 1px white;
            margin: 0px;
            margin-right:10px;
        }

        .${sliderClass}-button-label:hover{
            background-color: #0056b3; 
        }

        .${sliderClass}-pause-label:active {
            background-color: #004299; 
            transform: translateY(1px);
        }

        .${sliderClass}-AboutInfo {
            position: fixed;  /* Positionné par rapport à l'écran/viewport */
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7); /* Noir avec 80% d'opacité */
            z-index: 9999; /* Assurez-vous qu'il s'affiche au-dessus de tout */
            display: flex;
            align-items: center;      /* Centrage vertical */
            justify-content: center;  /* Centrage horizontal */
        }
        `;
        document.head.appendChild(style);
    }
}
