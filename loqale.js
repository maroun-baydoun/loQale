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
         *Initializes loQale. If triggerOnInit is set to true, a translation will occur.
         *@function
         *@param {Object} userOptions The options specified by the user 
         */
        function init(userOptions) {
            options = $.extend({}, options, userOptions);

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
         *Translates DOM elements.
         *@function
         *@param {Object} [context] Overrides the current DOM context
         */
        function translate(context) {

            if (options.onBeforeTranslate) {
                options.onBeforeTranslate();
            }


            if (!context) {
                context = options.context;
            }

            var elementsToTranslate = context.find('[' + options.stringAttribute + ']');

            for (var i = 0, length = elementsToTranslate.length; i < length; i++) {

                var element = $(elementsToTranslate[i]);
                var elementStringName = element.attr(options.stringAttribute);
                var elementStringValue = getLocalizedString(elementStringName);
                var elementTag = element.prop('tagName').toLowerCase();

                if (options.onBeforeElementTranslate) {

                    var returnValue = options.onBeforeElementTranslate(element, elementStringName, elementStringValue);
                    if (typeof returnValue !== 'undefined') {
                        if (returnValue === false) {
                            continue;
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

            if (options.onAfterTranslate) {
                options.onAfterTranslate();
            }
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
            }

        };


    })();

    window.loQale = loQale;

})(jQuery);