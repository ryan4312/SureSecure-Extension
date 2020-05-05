# SureSecure Extension

A Firefox browser extension for SureSecure Android Application (https://github.com/jmayo93/SureSecure)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Firefox Browser
SureSecure Application running on a physical device connected to the same network as the computer running the extension
```

### Installing

A step by step series of examples that tell you how to get a development env running

Obtain a local copy of the code

```
Download the repository from github (https://github.com/ryan4312/SureSecure-Extension)
```

Add it to Firefox

```
-Open Firefox
-go to about:debugging
-Select This Firefox
-Under Temporary Extensions select Load Temporary Add-on...
-Browser for the repository downloaded earlier
-select manifest.json
```

The extension should now be running in your Firefox instance, but wait theres more!
Before you can try it out you must connect your extension to your application.

```
-Enter about:addons in your address bar to bring you to the Manage Extension page
-Find SureSecure under the Enabled extensions and select it
-Select the Options tab
-Follow the instructions to enter the ip address from the application to the default server input.
```

At this point the extension should be running in your firefox instance, and connected to the application.

```
-Try it out!
-Visit some site with a sign in page
-Select the extension icon from the toolbar
-Select your credentials
-Watch as they are entered into the page
```


## Built With

* [Antu](https://github.com/fabianalexisinostroza/Antu) - Icon provided by Fabián Alexis
* [Google Pacifico](https://fonts.google.com/specimen/Pacifico) - Google Pacifico Fonts


## Authors

* **Ryan Frisch**  - [Github](https://github.com/ryan4312)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details
