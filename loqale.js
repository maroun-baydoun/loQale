/** Copyright (c) Maroun Baydoun, 2013, based on the  jquery-i18n plugin (https://github.com/bryanwb/jquery-i18n) by Bryan Berry
	Under the terms of the MIT license 
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, 	distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

 (function ($) {


 var loQale=(function() {
	
		
		var options;
		var defaults = {
			locale: 'en', //the default locale
			triggerOnInit: false, //if true, a translation will occur after initialization of the library
			triggerOnLocaleChange: false, //if true, a translation will occur every time the locale is changed via loQale.setLocale
			context: $('body'), //the default context under which elements will be translated
			stringAttribute:'data-string' // the data attribute used to identify the string corresponding to a DOM element
		};
		
		
		function init(userOptions){
			options=$.extend({}, defaults, userOptions);
			
			if (options.triggerOnInit) {
				translate();
			}
		}
		
		function getLocalizedString(string, locale) {
			var locale = locale || options.locale;
			if (!this.loQale[locale] || !this.loQale[locale].strings) {
				return string;
			}
			return this.loQale[locale].strings[string] || string;
		};

		
		function setLocale(locale) {
	
			if(options.locale === locale){
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

			if(options.onBeforeTranslate){
				options.onBeforeTranslate();
			}
			
			var elementsToTranslate;

			if (!context) {
				context = options.context;
			}

			elements= context.find('['+options.stringAttribute+']');

			for (var i = 0, length = elements.length; i < length; i++) {

				var element = $(elements[i]);
				var elementStringName = element.attr(options.stringAttribute);
				var elementStringValue = getLocalizedString(elementStringName);
				var elementTag = element.prop('tagName').toLowerCase();

				if(options.onBeforeElementTranslate){
				
					var returnValue=options.onBeforeElementTranslate(element,elementStringName,elementStringValue);
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
				
				if(options.onAfterElementTranslate){
					options.onAfterElementTranslate(element,elementStringName,elementStringValue);
				}

			}

			if(options.onAfterTranslate){
				options.onAfterTranslate();
			}
		}
		
		
		return { 
			init: function (userOptions) {
				init(userOptions);
			},
			setLocale:function(locale){
				setLocale(locale);
			},
			getLocale:function(){
				return getLocale();
			},
			getLocalizedString:function(string,locale){
				return getLocalizedString(string,locale);
			}
			
		};
		
	
	})();
	
	window.loQale=loQale;
})(jQuery);