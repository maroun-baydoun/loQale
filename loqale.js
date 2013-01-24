/* Copyright (c) Maroun Baydoun, 2013,
*   Under the terms of the MIT license.
*   Based on the  jquery-i18n plugin (http://github.com/bryanwb/jquery-i18n) by Bryan Berry.
*
*	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function ($) {


    "use strict";
    
    var loQale = (function () {

		//the current options of loQale i.e the merging on the defaults and the user-specified options
        var options;
		
		//the default options
        var defaults = {
            locale: 'en', //the default locale
            triggerOnInit: false, //if true, a translation will occur after initialization of the library
            triggerOnLocaleChange: false, //if true, a translation will occur every time the locale is changed via loQale.setLocale
            context: $('body'), //the default context under which elements will be translated
            stringAttribute: 'data-string' // the data attribute used to identify the string corresponding to a DOM element
        };

		/**
		**Initializes loQale. If triggerOnInit is set to true, a translation will occur.
		**@param {userOptions}
		**/
        function init(userOptions) {
            options = $.extend({}, defaults, userOptions);

            if (options.triggerOnInit) {
                translate();
            }
        }

		/**
		**Returns a localized string for the current locale, or the specified locale if specified
		**/
        function getLocalizedString(string, locale) {
            var locale = locale || options.locale;
            if (!loQale[locale] || !loQale[locale].strings) {
                return string;
            }
            return loQale[locale].strings[string] || string;
        };


        function setLocale(locale) {

            if (options.locale === locale) {
                return;
            }

            options.locale = locale;

            if (options.triggerOnLocaleChange) {
                translate();
            }
        };

        function getLocale() {
            return options.locale;
        };

        function translate(context) {

            if (options.onBeforeTranslate) {
                options.onBeforeTranslate();
            }

            
            if (!context) {
                context = options.context;
            }

            var elementsToTranslate= context.find('[' + options.stringAttribute + ']');

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