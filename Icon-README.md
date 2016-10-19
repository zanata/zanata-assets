# Zanata Icons

The icons used are generated using the [Icomoon](https://icomoon.io/app) app

## Modifying the icon set

- Import the selection.json file from src/assets/fonts to the IcoMoon app
- Add additional icons
- Make sure that the names of the preexisting icons have been changed
- Before clicking Download under the Font option, make sure that the settings are set to the following: 
class prefix is "i--", font name is Zanata, and the option to include the <i> class is selected.
- Download the font zip and extract
- Add all 4 font files to /src/assets/fonts/zanata-vX
- Open style.scss and variables.scss which have just been downloaded
- Copy the code (eg "\e611") for each icon in variables.scss to the content tag for each icon in 
style.scss, replacing the variable name 
- Then copy the new code from style.scss to replace the icon codes in src/assets/sass/_globals/_i-icons.scss
- Make sure that the src location at the top of _i-icons.scss points to the font directory

You will now have the necessary css and font files to load the icons. 

## Example use

`<i class="i i--users"></i>`


