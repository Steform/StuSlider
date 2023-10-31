# StuSlider Documentation

## Origin

This slider was created to replace an older one, the FlexSlider 2:

FlexSlider 2

With its replacement in mind, and to validate my JavaScript skills, I set about writing my own customizable slider.

## Project Importation

To use the 'StuSlider' Class, you must import the 'stuslider.js' JavaScript file into your project.

You can do that at the bottom of your page/view/template like this:

```html
<script src="stuslider.js"></script>
```

## Setting Up the HTML Structure

After importing the JavaScript file, you need to define your slider in your HTML code.

1. Create a main <div> with a class name ending with "-slider-container," where the beginning of the name is the unique slider identifier. For example, "stu-slider-container" could be your slider container.

2. Inside this container, create a child <div> with the class name "stu-slider" to represent your slider.

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

</script>
```

or

```JavaScript
<script type="text/javascript">

    const slider1 = new StuSlider('stu',3000, '100%', '100vh');

</script>
```

### Needed parameters for creating an instance

As you can see, there are configurable parameters, some of which are mandatory:

1. sliderClass => The name of the CSS class to avoid conflicts with other elements.
2. sliderDelay => The delay between two slides in milliseconds.
3. sliderWidth => The width (you can use percentages, vw sizes, pixel sizes; it's flexible).
4. sliderHeight => The height (as flexible as the width).


### Optional parameters

Some parameters are optional and have default values:

1. showArrow => By default, arrows are visible (value is normally true), set to 0 if not needed.
2. showDots => By default, dots for slides are visible (default value is normally true), set to 0 if not needed.
3. showPause => By default, the pause button is visible (default value is normally true), set to 0 if not needed.
4. showDots => By default, the about button is visible (default value is normally true), set to 0 if not needed.

## Licence

This slider was created by Stéphane Hirt. You can find more information and the source code on GitHub and the license is provided with the code

