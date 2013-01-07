/** Copyright (c) Maroun Baydoun, 2013, based on the  jquery-i18n plugin (https://github.com/bryanwb/jquery-i18n) by Bryan Berry
	Under the terms of the MIT license 
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, 	distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
 (function ($) {

    var loQale = function (string, locale) {
        var locale = locale || loQale.options.locale;
        if (!this.loQale[locale] || !this.loQale[locale].strings) {
            return string;
        }
        return this.loQale[locale].strings[string] || string;
    };

    _ = loQale;

    //The default options
    var defaults = {
        locale: 'en', //the default locale
        triggerOnInit: false, //if true, a translation will occur after initialization of the library
        triggerOnLocaleChange: false, //if true, a translation will occur every time the locale is changed via loQale.setLocale
        context: $('body'), //the default context under which elements will be translated
		stringAttribute:'data-string' // the data attribute used to identify the string corresponding to a DOM element
    };

    /**
     * Initializes the library
     **/
    loQale.init = function (options) {

        loQale.options = $.extend({}, defaults, options);

        if (loQale.options.triggerOnInit) {
            loQale.translate();
        }

    }

    loQale.setLocale = function (locale) {
	
		if(loQale.options.locale === locale){
			return;
		}
		
        loQale.options.locale = locale;

        if (loQale.options.triggerOnLocaleChange) {
            loQale.translate();
        }
    };

    loQale.getLocale = function () {
        return loQale.options.locale;
    };

	 /**
     * Translates DOM elements to the new locale
     * @param {context} The context under which DOM elements will be translated - Defaults to the context passed to loQale.init() or *otherwise the default context (body)
     **/
    loQale.translate = function (context) {

		if(loQale.options.onBeforeTranslate){
			loQale.options.onBeforeTranslate();
		}
		
        var elementsToTranslate;

        if (!context) {
            context = loQale.options.context;
        }

        elements= context.find('['+loQale.options.stringAttribute+']');

        for (var i = 0, length = elements.length; i < length; i++) {

            var element = $(elements[i]);
            var elementStringName = element.attr(loQale.options.stringAttribute);
			var elementStringValue = _(elementStringName);
            var elementTag = element.prop('tagName').toLowerCase();

			if(loQale.options.onBeforeElementTranslate){
			
				var returnValue=loQale.options.onBeforeElementTranslate(element,elementStringName,elementStringValue);
				if(typeof returnValue !=='undefined'){
					if(returnValue===false){
						continue;
					}
					else if(returnValue!==true){
						elementStringValue=returnValue;
					}
				}
			}

            if (elementTag === 'input') {
                element.attr('value', elementStringValue);
            } else {
                element.html(elementStringValue);
            }
			
			if(loQale.options.onAfterElementTranslate){
				loQale.options.onAfterElementTranslate(element,elementStringName,elementStringValue);
			}

        }

		if(loQale.options.onAfterTranslate){
			loQale.options.onAfterTranslate();
		}
    }


	/**
     * Converts a number to numerals in the specified locale. Currently only
     * supports devanagari numerals for Indic languages like Nepali and Hindi
     * @param {Number} Number to be converted
     * @param {locale} locale that number should be converted to
     * @returns {String} Unicode string for localized numeral 
     **/
    loQale._n = function (num, locale) {

        locale = locale || loQale.options.locale;

        if (!this.loQale[locale] || !this.loQale[locale].numBase) {
            return num;
        }


        //48 is the base for western numerals
        var numBase = loQale[loQale.options.locale].numeralBase || 48;
        var prefix = loQale[loQale.options.locale].numeralPrefix || "u00";

        var convertDigit = function (digit) {
            return '\\' + prefix + (numBase + parseInt(digit)).toString(16);
        };

        var charArray = num.toString().split("").map(convertDigit);
        return eval('"' + charArray.join('') + '"');
    };

    _n = loQale._n;

    /* ToDo
     * implement sprintf
     * conversion functions for monetary and numeric 
     * sorting functions (collation) for different locales
     */

	 window.loQale=loQale;
	 
})(jQuery);