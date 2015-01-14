// HOW TO USE:
// Include module and then use factory
// This will add the specific properties to the NodeList prototype
// Then it will return a function that accepts a CSS string selector
// RETURNS ==> NodeList with elems.

angular('query-selector', [])
.factory('$select', [function (){
	// Properties defined via Object.defineProperties method
	// This way it wont cause issues like length and others
	// Object.defineProperties =>
	// Full support (88.0% global browser share)
	// No support (4.6% global browser share)
	// Unknown support (3.6% global browser share)
	if(!NodeList.prototype.each && !NodeList.prototype.removeClass && !NodeList.prototype.addClass && !NodeList.prototype.getElement) {
		Object.defineProperties(NodeList.prototype, {
			'each': {
				value: function(fn){
					var self = this;
					// Array.prototype.forEach => 
					// Full support (88.3% global browser share)
					// Support through polyfill (4.2% global browser share)
					// Unknown support (3.8% global browser share)
					Array.prototype.slice.call(this, 0).forEach(function (){
						fn.apply(self, arguments);
					});
					return self;
				}
			}
			,'removeClass': {
				value: function (_class, time){
					this.each(function (element){
						element.classList.remove(_class);
					});
					return this;
				}
			}
			,'addClass': {
				value: function (_class){
					this.each(function (element, index){
						element.classList.add(_class);
					});
					return this;
				}
			}
			,'getElement': {
				value: function (index){
					var nodeList;
					// This will wrap a single element in a NodeList
					this[index].setAttribute('wrapNodeList','');
					nodeList = document.querySelectorAll('[wrapNodeList]');
					this[index].removeAttribute('wrapNodeList');
					return nodeList;
				}
			}
		});
	}
	return function (selector){ return document.querySelectorAll(selector); }
}]);