/* Copyright Bryan W Berry, 2009, 
 * under the MIT license http://www.opensource.org/licenses/mit-license.php
 * 
 * this library is heavily influenced by the GNU LIBC library
 *  http://www.gnu.org/software/libc/manual/html_node/Locales.html
 */

(function($){

     $.loQale = function(string, locale){
	 var lang = locale || $.loQale.lang;
	 if (!this.loQale[lang] || !this.loQale[lang].strings){
	     return string;
	 }
	 return this.loQale[lang].strings[string]||string;
     };

     $._ = $.loQale;

     $.loQale.setLocale = function (locale){
	 $.loQale.lang = locale;
     };

     $.loQale.getLocale = function (){
	 return $.loQale.lang;
     };


     /**
      * Converts a number to numerals in the specified locale. Currently only
      * supports devanagari numerals for Indic languages like Nepali and Hindi
      * @param {Number} Number to be converted
      * @param {locale} locale that number should be converted to
      * @returns {String} Unicode string for localized numeral 
      */
     $.loQale._n = function(num, locale){

	 locale = locale || $.loQale.lang;

	 if (!this.loQale[locale] || !this.loQale[locale].numBase ){
	     return num;
	 }


	 //48 is the base for western numerals
	 var numBase = $.loQale[$.loQale.lang].numeralBase || 48;
	 var prefix =  $.loQale[$.loQale.lang].numeralPrefix || "u00";
     
	 var convertDigit = function(digit){	     
	     return '\\' + prefix + 
		 (numBase + parseInt(digit)).toString(16);
	 };
	 
	 var charArray = num.toString().split("").map(convertDigit);
	 return eval('"' + charArray.join('') + '"');
     };

     $._n = $.loQale._n;

     /* ToDo
      * implement sprintf
      * conversion functions for monetary and numeric 
      * sorting functions (collation) for different locales
      */

 })(jQuery);


