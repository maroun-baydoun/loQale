/** @file loQale.js
 *   @version 1.0.0
 *   @author Maroun Baydoun <maroun.baydoun@gmail.com>
 *   @license See LICENSE.md file included in this distribution.
 */

(function ($) {


    "use strict";


    var loQale = (function () {


        /**
         *The current options of loQale, initialized with the default values.
         *@type Object
         */
        var options = {
            locale: 'en', //the default locale
            triggerOnInit: false, //if true, a translation will occur after initialization of the library
            triggerOnLocaleChange: false, //if true, a translation will occur every time the locale is changed via loQale.setLocale
            context: $('html'), //the default context under which elements will be translated
            stringAttribute: 'data-string' // the data attribute used to identify the string corresponding to a DOM element
        };
        
        /**
         *The DOM elements that will be translated.
         *@type Object
         */
        var elementsToTranslate;
        
        
        /**
         *Initializes loQale. If triggerOnInit is set to true, a translation will occur.
         *@function
         *@param {Object} userOptions The options specified by the user 
         */
        function init(userOptions) {
            options = $.extend({}, options, userOptions);
            
            findElementsToTranslate();


            if (options.triggerOnInit) {
                translate();
            }
        }

        /**
         *Returns a localized string.
         *@function
         *@param {String} string The string to translate
         *@param {String} [locale] Overrides the current locale
         *@retuns {String} The localized string, or the string itself if it was not found in the locale
         */
        function getLocalizedString(string, locale) {
            var usedLocale = locale || options.locale;
            if (!loQale[usedLocale] || !loQale[usedLocale].strings) {
                return string;
            }
            return loQale[usedLocale].strings[string] || string;
        }

        /**
         *Sets the current locale. If triggerOnLocaleChange is set to true, a translation will occur.
         *@function
         *@param {String} locale The new locale
         */
        function setLocale(locale) {

            if (options.locale === locale) {
                return;
            }

            options.locale = locale;

            if (options.triggerOnLocaleChange) {
                translate();
            }
        }

        /**
         *Return the current locale.
         *@function
         *@retuns {String} The current locale
         */
        function getLocale() {
            return options.locale;
        }

        
       /**
         *Finds the DOM elements that need to be translated.
         *@function
         */
        function findElementsToTranslate() {
            
            elementsToTranslate = options.context.find('[' + options.stringAttribute + ']');
        }
        
        /**
         *Translates a DOM element.
         *@function
         *@param {Object} [element] The DOM element to translate
         */
        function translateElement(element) {
            
            var elementStringName = element.attr(options.stringAttribute),
                elementStringValue = getLocalizedString(elementStringName),
                elementTag = element.prop('tagName').toLowerCase();
            
            if (options.onBeforeElementTranslate) {

                var returnValue = options.onBeforeElementTranslate(element, elementStringName, elementStringValue);
                
                if (typeof returnValue !== 'undefined') {
                    if (returnValue === false) {
                        return;
                    } else if (returnValue !== true) {
                        elementStringValue = returnValue;
                    }
                }
            }
            
            if (elementTag === 'input') {
                element.attr('value', elementStringValue);
            } else {
                element.html(elementStringValue);
            }
            
            if (options.onAfterElementTranslate) {
                options.onAfterElementTranslate(element, elementStringName, elementStringValue);
            }
        }
        
        /**
         *Translates DOM elements.
         *@function
         *@param {Object} [elements] The DOM elements to translate instead of the elements selected by default from the context
         */
        function translate(elements) {

            elements = elements || elementsToTranslate;
            
            if (options.onBeforeTranslate) {
                options.onBeforeTranslate(elements);
            }

           
            for (var i = 0, length = elements.length; i < length; i++) {

                var element = $(elements[i]);
                
                translateElement(element);
            }

            if (options.onAfterTranslate) {
                options.onAfterTranslate(elements);
            }
            
            $('html').attr('lang',options.locale);
        }


        return {
            init: function (userOptions) {
                init(userOptions);
            },
            setLocale: function (locale) {
                setLocale(locale);
            },
            getLocale: function () {
                return getLocale();
            },
            getLocalizedString: function (string, locale) {
                return getLocalizedString(string, locale);
            },
            translate:function(elements){
                translate(elements);
            }
        };


    })();

    window.loQale = loQale;

})(jQuery);