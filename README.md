# StuSlider Documentation

## Origin

This slider was created to replace an older one, [the FlexSlider 2](http://flexslider.woothemes.com/):

With this replacement in mind, and to validate my JavaScript skills, I set about writing my own customizable slider.

Here is the [demo link](https://steform.github.io/StuSlider/demo/) of my slider, you can see the result to decide if this StuSlider meets your needs.

You can also find the demo in the `demo` folder of this repository.

## How to import

To use the 'StuSlider' Class, you must import the 'stuslider.js' (and the source maps if you want to) JavaScript file into your project.

You can do that at the bottom of your page/view/template like this:

```html
    <script type="module">
            
        import { StuSlider } from './stuslider.js';
    </script>
```

You can build a new script with `npm run build` after having installed the dependencies.

## Setting Up the HTML Structure

After importing the JavaScript file, you need to configure your slider in your HTML code.

1. Create a main `<div>` with a class name ending with "-slider-container," where the beginning of the name is the unique slider identifier. For example, "stu-slider-container" could be your slider container.

2. Inside this container, create a child `<div>` with the class name "stu-slider" to represent your slider.

3. Add as many slide elements as you need, and each should have a class name following the pattern "stu-slide." You can customize the content of each slide as per your requirements.

Here's an example HTML structure for your slider:

```html
<div class="stu-slider-container">
    <div class="stu-slider">
        <div class="stu-slide">Your content here</div>
        <div class="stu-slide">Another slide content</div>
        <div class="stu-slide">More content for another slide</div>
    </div>
</div>
```

You can have as many slides as you want, and you can place any content inside each slide. This structure allows you to easily configure and manage your slider's content.


## Instance

This slider is designed to be displayed multiple times on a page if necessary, which is why it was designed as a JavaScript class.

Each parameterized instance will behave differently from another.

You will need an instance per slide.

Here's an example of how to create a fullscreen instance of the slider using the HTML structure mentioned above:

```JavaScript
<script type="text/javascript">

    const slider1 = new StuSlider(sliderClass='stu', sliderDelay=3000, sliderWidth='100%', sliderHeight='100vh', showArrow=1, showDots=1, showPause=1, showAbout=1);

    slider1.initialize();

</script>
```

or

```JavaScript
<script type="text/javascript">

    const slider1 = new StuSlider('stu',3000, '100%', '100vh');
    slider1.initialize();

</script>
```

### Required parameters for creating an instance

As you can see, there are configurable parameters, some of which are mandatory:

1. `sliderClass` => The name of the CSS class to avoid conflicts with other elements.
2. `sliderDelay` => The delay between two slides in milliseconds.
3. `sliderWidth` => The width (you can use percentages, vw sizes, pixel sizes; it's flexible).
4. `sliderHeight` => The height (as flexible as the width).


### Optional parameters

Some parameters are optional and have default values:

1. `showArrow` => By default, arrows are visible (default is true), set to false if not needed.
2. `showDots` => By default, dots for slides are visible (default is true), set to false if not needed.
3. `showPause` => By default, the pause button is visible (default is true), set to false if not needed.
4. `showDots` => By default, the about button is visible (default is true), set to false if not needed.
5. `showAbout` => By default, the about button is visible (default is true), set to false if not needed.
6. `defaultSlide` => By default, the slider starts with the first slide (default value is  `0`), set to the slide number you want to start with if needed.

## Compiling

To compile the StuSlider project, you will need Node.js and npm (Node Package Manager) installed on your system. If you don't have them installed, follow the instructions below:

### Installing Node.js and npm

#### Windows:

1. Download the Node.js installer from [nodejs.org](https://nodejs.org/).
2. Run the installer and follow the on-screen instructions.
3. Once installed, open a new command prompt or PowerShell window.

#### Linux:

1. Open a terminal.
2. Run the following commands:
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```

### Installing Dependencies

After installing Node.js and npm, navigate to the root folder of your StuSlider project using the terminal or command prompt.

Run the following command to install the project dependencies:

```bash
npm install
```

This command will download and install all the necessary packages specified in your `package.json` file.

### Building the Project

Once the dependencies are installed, run the following command to build your StuSlider project:

```bash
npm run build
```

Certainly! Below is the section on compiling your StuSlider project, including instructions for installing npm, installing dependencies, and running the build command. I've provided examples for both Windows and Linux users:

markdown

## Compiling

To compile the StuSlider project, you will need Node.js and npm (Node Package Manager) installed on your system. If you don't have them installed, follow the instructions below:

### Installing Node.js and npm

#### Windows:

1. Download the Node.js installer from [nodejs.org](https://nodejs.org/).
2. Run the installer and follow the on-screen instructions.
3. Once installed, open a new command prompt or PowerShell window.

#### Linux:

1. Open a terminal.
2. Run the following commands:
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```

### Installing Dependencies

After installing Node.js and npm, navigate to the root folder of your StuSlider project using the terminal or command prompt.

Run the following command to install the project dependencies:
```bash
npm install
```

This command will download and install all the necessary packages specified in your `package.json` file.
Building the Project

### Building the Project

Once the dependencies are installed, run the following command to build your StuSlider project:
```bash
npm run build
```

This command triggers the build script defined in your `package.json`, generating the necessary files for your slider.

After a successful build, you can find the compiled files in the specified output directory.

Now you are ready to integrate the compiled StuSlider into your web project.

Feel free to customize the instructions based on your specific project structure or requirements.

## Licence

This slider was created by Stéphane Hirt. You can find more information and the source code on GitHub and the license is provided with the code.

