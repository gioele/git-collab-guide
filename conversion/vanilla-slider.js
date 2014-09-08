/**
* vanilla-slider.js
*
* @fileoverview Simple semantic slider based on WallopSlider.
*
* @author Gioele Barabucci
*/

var VanillaSlider = VanillaSlider || {};

VanillaSlider = (function() {
	function Vanilla(selector_or_node, options) {
		if (selector_or_node instanceof Node) {
			this.list = selector_or_node;
		} else {
			this.list = document.querySelector(selector_or_node);
		}

		this.options = {
			indexFirstPicture: 1,
			loopAtEnd: false,

			classForCurrentPicture: 'vanilla-slider__item--current',
			classForShowPrevious: 'vanilla-slider__item--show-previous',
			classForShowNext: 'vanilla-slider__item--show-next',
			classForHidePrevious: 'vanilla-slider__item--hide-previous',
			classForHideNext: 'vanilla-slider__item--hide-next'
		};

		this.options = extend(this.options, options);
		this.event = null;

		var container = document.createElement('div');
		wrapList(this.list, container);
		addControls(container);
		addClasses(this.list, container, this.options);

		this.pictures = this.list.children;
		this.numPictures = this.pictures.length;
		this.currentPictureIndex = this.options.indexFirstPicture;

		var buttonsContainer = container.children[container.children.length-1];
		this.buttonPrevious = buttonsContainer.children[0];
		this.buttonNext = buttonsContainer.children[1];

		this.bindEvents();
		this.createCustomEvent();
	}

	function wrapList(list, container) {
		list.parentNode.replaceChild(container, list);
		container.appendChild(list);
	}

	function addControls(container) {
		var buttonsContainer = document.createElement('div');
		var buttonPrev = document.createElement('button');
		var buttonNext = document.createElement('button');
		buttonPrev.innerHTML = "Previous"; // FIXME: make configurable
		buttonNext.innerHTML = "Next"; // FIXME: make configurable

		buttonPrev.disabled = true;

		buttonsContainer.appendChild(buttonPrev);
		buttonsContainer.appendChild(buttonNext);

		container.appendChild(buttonsContainer);
	}

	function addClasses(list, container, options) {
		addClass(list, 'vanill-slider__list'); // FIXME: make configurable
		addClass(container, 'vanilla-slider'); // FIXME: make configurable
		addClass(list.children[options.indexFirstPicture - 1], options.classForCurrentPicture);
	}

	// Update prev/next disabled attribute
	Vanilla.prototype.updatePagination = function () {
		var noMorePictures = (this.currentPictureIndex == this.numPictures) && !this.options.loopAtEnd
		this.buttonNext.disabled = noMorePictures;

		var atFirstPicture = (this.currentPictureIndex == 1);
		this.buttonPrevious.disabled = atFirstPicture;
	};

	// Reset all settings by removing classes and attributes added by goTo() & updatePagination()
	Vanilla.prototype.removeAllHelperSettings = function () {
		removeClass(this.pictures[this.currentPictureIndex - 1], this.options.classForCurrentPicture);

		// FIXME: avoid $$, remove classes from all items in a certain list
		removeClass($$(this.options.classForHidePrevious)[0], this.options.classForHidePrevious);
		removeClass($$(this.options.classForHideNext)[0], this.options.classForHideNext);
		removeClass($$(this.options.classForShowPrevious)[0], this.options.classForShowPrevious);
		removeClass($$(this.options.classForShowNext)[0], this.options.classForShowNext);

		this.buttonPrevious.disabled = false;
		this.buttonNext.disabled = false;
	};

	// Method to add classes to the right elements depending on the index passed
	Vanilla.prototype.goTo = function (index) {
		if (index > this.numPictures || index < 1 || index == this.currentPictureIndex) { return; }

		this.removeAllHelperSettings();

		var classForShowing;
		var classForHiding;

		var goingForward = index > this.currentPictureIndex;
		if (goingForward) {
			classForHiding = this.options.classForHidePrevious;
			classForShowing = this.options.classForShowNext;
		} else {
			classForHiding = this.options.classForHideNext;
			classForShowing = this.options.classForShowPrevious;
		};

		addClass(this.pictures[this.currentPictureIndex - 1], classForHiding);

		addClass(this.pictures[index - 1], this.options.classForCurrentPicture);
		addClass(this.pictures[index - 1], classForShowing);

		this.currentPictureIndex = index;

		this.updatePagination();

		// Update event currentPictureIndex property and dispatch it
		this.event.detail.currentPictureIndex = this.currentPictureIndex;
		this.list.dispatchEvent(this.event);
	};

	// Callback for when previous button is clicked
	Vanilla.prototype.onPreviousButtonClicked = function () {
		var indexPrev = this.currentPictureIndex - 1;
		this.goTo(indexPrev);
	};

	// Callback for when "Next" button is clicked
	Vanilla.prototype.onNextButtonClicked = function () {
		var indexNext = this.currentPictureIndex + 1;

		if(indexNext > this.numPictures && this.options.loopAtEnd) {
			indexNext = 1
		}

		this.goTo(indexNext);
	};

	// Attach click handlers
	Vanilla.prototype.bindEvents = function () {
		var _this = this;
		this.buttonPrevious.addEventListener('click', function () { _this.onPreviousButtonClicked(); });
		this.buttonNext.addEventListener('click', function () { _this.onNextButtonClicked(); });
	};

	// Method so it is nicer for the user to use custom events
	Vanilla.prototype.on = function (eventName, callback) {
		if (eventName !== 'pictureChange') {
			throw new Error('the only available event is "pictureChange"');
		}

		this.list.addEventListener(eventName, function(event) {
			return callback(event);
		}, false);
	};

	// Create custom Event
	Vanilla.prototype.createCustomEvent = function () {
		var _this = this;
		this.event = new CustomEvent('pictureChange', {
			detail: {
				currentPictureIndex: Number(_this.currentPictureIndex)
			},
			bubbles: true,
			cancelable: true
		});
	};

	/**
	 * Helper functions
	 */

	function $$(element) {
		if (!element) { return; }
		return document.getElementsByClassName(element);
	}

	function addClass(element, className) {
		if (!element) { return; }
		var origClassName = element.className || '';
		element.className = origClassName + ' ' + className;
	}

	function removeClass(element, className) {
		if (!element) { return; }
		element.className = element.className.replace(className, '');
	}

	function extend(origOptions, userOptions){
		var extendOptions = {}, attrname;
		for (attrname in origOptions) { extendOptions[attrname] = origOptions[attrname]; }
		for (attrname in userOptions) { extendOptions[attrname] = userOptions[attrname]; }
		return extendOptions;
	}

	// Pollyfill for CustomEvent() Constructor - thanks to Internet Explorer
	// https://developer.mozilla.org/en/docs/Web/API/CustomEvent#Polyfill
	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}

	CustomEvent.prototype = window.CustomEvent.prototype;
	window.CustomEvent = CustomEvent;

	return Vanilla;
})();
