loQale
=====

loQale, a simple JavaScript library to internationalize your web applications.

Introduction
------------

loQale automatically maps the localized strings to their corresponding  HTML elements, so that your web application can be translated on the fly. 



Usage
-----

#####Prerequisites

To start using loQale you need:

1.  The latest version of loQale available [here](https://github.com/maroun-baydoun/loQale/archive/master.zip).
2.  jQuery 1.7+.
3. One or more JSON files containing your localized strings.

        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="loqale.js"></script>
        <script type='text/javascript' src='strings.en.json'></script>
        <script type='text/javascript' src='strings.fr.json'></script>

#####Localized strings files

A JSON file is needed every locale you want the application to support. Each JSON file contains the mapping between your string names and their values in the corresponding locale. 

For the English locale, create *strings.en.json*:

    loQale.en={
      strings : {
  		"firstname":"First Name",
		"lastname":"Last Name",
		"register":"Register",
		"submit":"Submit"
      }
    };


For the French locale, create *strings.fr.json*:

    loQale.fr={
      strings : {
		"firstname":"Pr&eacute;nom",
		"lastname":"Nom",
		"register":"Inscrivez-vous",
		"submit":"Envoyer",
     }
    };




#####HTML

Add the ```data-string``` attribute to the HTML elements that need to be localized. The value of ```data-string``` is the string name corresponding to this element.

    <form>
      <fieldset>
	    <legend data-string="register"></legend>
	    <label data-string="firstname"></label>
	    <input type="text"/>
	    <label data-string="lastname"></label>
	    <input type="text"/>				
	    <input type="submit" data-string="submit"/>			
     </fieldset>
    </form>

#####Initializing loQale 

Inside jQuery's ```$(document).ready()```, call ```loQale.init()``` to initialize the library.


    $(document).ready(function(){
       loQale.init();
    }


#####Applying localization 

To apply the localization call ```loQale.setLocale(localname)``` to change the current locale and then  ```loQale.translate()``` to translate the application.


    loQale.setLocale('en'); // sets the locale to English
    loQale.translate(); // translates the application into English

    loQale.setLocale('fr'); // sets the locale to French
    loQale.translate(); // translates the application into French
    
     
    

Attribution
-------

loQale is based on the [jquery-i18n][] plugin by [Bryan Berry][]

  [jquery-i18n]: https://github.com/bryanwb/jquery-i18n
  [Bryan Berry]: https://github.com/bryanwb



License
-------

loQale is a free software, licensed under the [MIT license][]. See the file LICENSE.md in this distribution for more details.

   [MIT license]: http://opensource.org/licenses/mit-license.php


