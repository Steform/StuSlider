export class StuSlider{

    aboutDiv!: HTMLElement;
    aboutP!: HTMLParagraphElement;
    autoSlideTimer!: number | null; // in ms
    controlDiv!: HTMLElement;
    currentSlide!: number;
    leftArrowDiv!: HTMLElement;
    navigationDiv!: HTMLElement;
    pauseDiv!: HTMLElement;
    pauseInput!: HTMLInputElement;
    pauseLabel!: HTMLLabelElement;
    radioInput!: HTMLInputElement;
    radioLabel!: HTMLLabelElement;
    rightArrowDiv!: HTMLElement;
    sliderContainer!: HTMLElement;
    slider!: HTMLElement;
    slides!: NodeListOf<Element>;
    slideWidthPercentage!: number;

    PauseSvg: string;
    PlaySvg: string;
    NextSvg: string;
    PrevSvg: string;

    constructor(private sliderClassPrefix: string, private delay: number, private sliderWidth: string, 
        private sliderHeight: string, private showArrow: boolean = true, private showDots: boolean = true, 
        private showPause: boolean = true, private showAbout: boolean = true, private defaultSlide: number = 0) 
    {

        this.PauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="512px" viewBox="0 0 512 512" width="512px"><path d="M224,402.08751V109.83125C224,104.3875 218.6,100 211.8,100h-71.6c-6.8,0-12.2,4.3875-12.2,9.83125V402.08751C128,407.53125,133.4,412,140.2,412h71.6c6.8,0,12.2,-4.3875,12.2,-9.91249z" fill="#ffffff" /><path d="M371.8,100h-71.6c-6.7,0-12.2,4.3875-12.2,9.83125V402.08751C288,407.53125,293.4,412,300.2,412h71.6c6.7,0,12.2,-4.3875,12.2,-9.91249V109.83125C384,104.3875,378.6,100,371.8,100Z" fill="#ffffff" /></svg>';
        this.PlaySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M78.158003,51.843 25.842,82.048c-1.418,0.819-3.191,-0.206-3.191,-1.843V19.795c0,-1.638 1.773,-2.662 3.191,-1.843L78.158003,48.157c1.416997,0.819 1.416997,2.867 -9.99e-4,3.686z" fill="#ffffff"/></svg>';
        this.NextSvg = this.PlaySvg
        this.PrevSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M23.715376,51.843 76.031375,82.048c1.418,0.819 3.191,-0.205 3.191,-1.843V19.795c0,-1.638 -1.773,-2.661 -3.191,-1.843L23.714376,48.157c-1.418001,0.819 -1.418001,2.867 10e-4,3.686z" fill="#ffffff"/></svg>';
        // `autoSlideTimer` must be null in case of just 1 slide
        this.autoSlideTimer = null

        // setting up the default slide
        this.currentSlide = this.defaultSlide;



    }

    initialize() {

        // initiating styles
        new StuSliderCss(this.sliderClassPrefix, this.sliderWidth, this.sliderHeight);

        if (!document.querySelector(`.${this.sliderClassPrefix}-slider-container`) || !document.querySelector(`.${this.sliderClassPrefix}-slider`)
            || !document.querySelector(`.${this.sliderClassPrefix}-slide`)) {
            throw new Error("No slider container or slider found");
        } else {
            this.sliderContainer = document.querySelector(`.${this.sliderClassPrefix}-slider-container`)!;
            // inner slider
            this.slider = this.sliderContainer.querySelector(`.${this.sliderClassPrefix}-slider`)!;
            // select all slides of the slider relative to sliderContainer
            this.slides = this.sliderContainer.querySelectorAll(`.${this.sliderClassPrefix}-slide`);
        }

        // width of the slide in percentage
        this.slideWidthPercentage = 100 / this.slides.length;

        // display the slider
        this.displaySlider();

    }

    displayAbout() {
        if (this.showAbout){
            // create about 
            this.aboutDiv = document.createElement('div');
            this.aboutP = document.createElement('p');
            this.aboutP.innerHTML = "?"
            this.aboutP.classList.add(`${this.sliderClassPrefix}-about`, `${this.sliderClassPrefix}-button-label`);
            this.aboutDiv.appendChild(this.aboutP);
            this.controlDiv.appendChild(this.aboutDiv);

            // create about info
            let aboutInfo = this.sliderContainer.querySelector(`.${this.sliderClassPrefix}-aboutinfo`);
            if (!aboutInfo) {
                aboutInfo = document.createElement('div');
                aboutInfo.className = `${this.sliderClassPrefix}-aboutinfo`;
            }

            // click on about
            this.aboutP.addEventListener('click', () => {

                    // add about to the body
                    document.body.appendChild(aboutInfo!);
            
                    const developerInfo = `
                    <div style="max-width: 600px; padding: 20px; color: #FFF; font-size: 1.2em; text-align: center;">
                        <h2>StuSlider - by HIRT Stephane</h2>
                        <p>A new, very simple slider with no dependencies other than javascript and html5.</p>
                        <ul style="list-style: none;">
                            <li>💡 Smooth, responsive transition</li>
                            <li>🖱 Easy control with buttons and navigation</li>
                            <li>⏰ Automatic scrolling with pause option</li>
                        </ul>
                        <a href="https://github.com/Steform" target="_blank" style="color: #00F; text-decoration: underline;">My Github</a>
                    </div>
                    `;
            
                    aboutInfo!.innerHTML = developerInfo;
            
                    // add click event to close the about info
                    aboutInfo!.addEventListener('click', function() {
                        (aboutInfo as HTMLDivElement)!.style.display = 'none';
                    });
            
                // add style to about
                (aboutInfo as HTMLDivElement)!.style.display = 'flex';
            });
        }
    }

    displayArrows() {
        if(this.showArrow){
            // create left arrow div
            this.leftArrowDiv = document.createElement('div');
            this.leftArrowDiv.className = `${this.sliderClassPrefix}-left-arrow`;
            this.leftArrowDiv.innerHTML = this.PrevSvg;
            this.leftArrowDiv.onclick = () => this.goToPreviousSlide();
            // create right arrow div
            this.rightArrowDiv = document.createElement('div');
            this.rightArrowDiv.className = `${this.sliderClassPrefix}-right-arrow`;
            this.rightArrowDiv.innerHTML = this.NextSvg;
            this.rightArrowDiv.onclick = () => this.goToNextSlide();
        }
        if (this.showArrow && this.slides.length > 1) {
            this.sliderContainer.appendChild(this.leftArrowDiv);
            this.sliderContainer.appendChild(this.rightArrowDiv);
        }
    }

    displayDots() {
        if(this.showDots){

            // create navigation div
            this.navigationDiv = document.createElement('div');
            this.navigationDiv.className = `${this.sliderClassPrefix}-navigation`;

            // For all slides, create dots (label) and hidden radio
            this.slides.forEach((slide, index) => {

                this.radioInput = document.createElement('input');
                this.radioInput.type = 'radio';
                this.radioInput.name = 'slider';
                this.radioInput.className = `${this.sliderClassPrefix}-radio`; 
                this.radioInput.id = `${this.sliderClassPrefix}-slide${index + 1}`;

                this.radioInput.style.display = 'none';

                this.radioLabel = document.createElement('label');
                this.radioLabel.classList.add(`${this.sliderClassPrefix}-radio-label`);
                this.radioLabel.htmlFor = `${this.sliderClassPrefix}-slide${index + 1}`;

                if (index === 0) {
                    this.radioInput.checked = true;
                    this.radioLabel.classList.add(`active`);
                }

                this.radioInput.addEventListener('click', () => this.onRadioClick(index));

                this.navigationDiv.appendChild(this.radioInput);
                this.navigationDiv.appendChild(this.radioLabel);
            });
        }
        if(this.showDots && this.slides.length > 1){
            this.controlDiv.appendChild(this.navigationDiv);
        }
    }

    displayPauseDiv() {
        if (this.showPause){
            if (this.delay != 0){

                // create pause div
                this.pauseDiv = document.createElement('div');
                this.pauseDiv.className = `${this.sliderClassPrefix}-pause`;
                this.pauseDiv.style.zIndex = "1000";
                this.pauseDiv.style.marginLeft = "10px";

                // create pause div
                this.pauseInput = document.createElement('input');
                this.pauseInput.type = "checkbox";
                this.pauseInput.className = `${this.sliderClassPrefix}-pause-checkbox`;
                this.pauseInput.checked = false;
                this.pauseInput.id = `${this.sliderClassPrefix}-pause-input`;
                this.pauseInput.style.display = "none";

                // create pause label
                this.pauseLabel = document.createElement('label');
                this.pauseLabel.classList.add(`${this.sliderClassPrefix}-button-label`);
                this.pauseLabel.htmlFor = `${this.sliderClassPrefix}-pause-input`;
                this.pauseLabel.innerHTML= this.PauseSvg;

                // pause event (check / uncheck)
                this.pauseInput.addEventListener('change', () => {
                    // pause or play
                    if (this.pauseInput.checked) {
                        this.pauseLabel.innerHTML = this.PlaySvg;
                        clearInterval(this.autoSlideTimer ?? 0);
                    } else {
                        this.pauseLabel.innerHTML = this.PauseSvg;
                        this.resetAutoSlideTimer();
                    }
                });
            }

        }
        if (this.showPause && this.slides.length > 1 && this.delay != 0) {
            this.pauseDiv.appendChild(this.pauseInput);
            this.pauseDiv.appendChild(this.pauseLabel);
            this.controlDiv.appendChild(this.pauseDiv);
        }
    }

    displaySlider(){

        this.displayArrows();

        // create control div
        this.controlDiv = document.createElement('div');
        this.controlDiv.className = `${this.sliderClassPrefix}-control`;

        this.displayDots();

        this.displayPauseDiv();

        this.displayAbout();

        this.sliderContainer.appendChild(this.controlDiv);

        // define slide width
        this.slider.style.width = `${100 * this.slides.length}%`;
        
        // for all slides, flex with the good width
        this.slides.forEach(slide => {
            (slide as HTMLElement).style.flex = `0 0 ${this.slideWidthPercentage}%`;
        });

        // start to slide
        this.resetAutoSlideTimer();

    }

    goToNextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slideTo(this.currentSlide);
    }

    goToPreviousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.slideTo(this.currentSlide);
    }

    // Method when click on a dot
    onRadioClick(index: number) {
        if (index !== this.currentSlide) {
            this.slideTo(index);
        } else {
            this.resetAutoSlideTimer();
        }
    }

    // Method to slide on a given index
    slideTo(index: number) {
        this.slider.style.transform = `translateX(-${index * this.slideWidthPercentage}%)`;
        this.currentSlide = index;
        
        // check if slider is in pause mode
        if (this.showPause && !this.pauseInput.checked) {
            this.resetAutoSlideTimer();
        }
        
        // Updating active slide
        this.updateActiveSlide();
    }

    resetAutoSlideTimer() {
        clearInterval(this.autoSlideTimer ?? 0);
        if (this.delay !== 0) {
            this.autoSlideTimer = window.setInterval(() => this.goToNextSlide(), this.delay);
        }
    }

    updateActiveSlide() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle(`active`, index === this.currentSlide);
        });
    
        if (this.showDots){
            // select scoped radio labels and toggle active class
            const radioLabels = this.navigationDiv.querySelectorAll(`.${this.sliderClassPrefix}-radio-label`);
            radioLabels.forEach((label, index) => {
                label.classList.toggle(`active`, index === this.currentSlide);
            });
        }
    }    

}

export class StuSliderCss{

    constructor(sliderClass: string, sliderWidth: string, sliderHeight: string){


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
            font-size: 3vw;
            opacity: 0.6;
            color: #333;
            cursor: pointer;
            z-index: 1000;
            user-select: none;
            text-shadow: 0 0 5px white; 
            stroke: #333;
            stroke-width: 3;
            fill: none;
            
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

        @media (max-width: 768px) {
            .${sliderClass}-left-arrow,
            .${sliderClass}-right-arrow {
                width: 3vw;
                height: 3vw;
                font-size: 3vw;
            }
        }

        @media (max-width: 480px) {
            .${sliderClass}-left-arrow,
            .${sliderClass}-right-arrow {
                width: 6.5vw;
                height: 6.5vw;
                font-size: 6.5vw;
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
            font-family: Arial, sans-serif; 
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
            transition: background-color 0.3s; 
            opacity: 0.6;
            user-select: none;
            box-shadow: 0 0 1px 1px white;
            margin: 0px;
        }

        .${sliderClass}-button-label:hover{
            background-color: #0056b3; 
        }

        .${sliderClass}-pause-label:active {
            background-color: #004299; 
            transform: translateY(1px);
            font-family: Arial, sans-serif; 
        }

        .${sliderClass}-about {

            z-index: 1000;
            margin-left:10px;

        }

        .${sliderClass}-aboutinfo {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        `;
        document.head.appendChild(style);
    }
}