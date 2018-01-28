(function(W) {
	function Class() {
		this.model = {};
		this.W = W;
		this.document = this.W.document;
		this.input = this.document.querySelector('.js-input-field');
		this.songsCountDropDown = this.document.querySelector('.js-songs-count-dropdown');
		this.button = this.document.querySelector('.js-input-button');
		this.layoutWrapper = this.document.querySelector('.js-layout-wrapper');
		this.contentPlaceHolder = this.document.querySelector('.js-content-placeholder');
		this.loaderOverlay = this.document.querySelector('.js-loader-overlay');
	}

	Class.prototype.init = function() {
		this.bindUIHandlers();
	};
	Class.prototype.sendRequest = function(artistName) {
		var request = new XMLHttpRequest(),
			url = 'http://localhost:8000/search/songs/' + artistName,
			_ref = this;

		request.responseType = 'json';
		request.open('GET', url);
		request.onload = function() {
			_ref.model = request.response.concat([]);
			_ref.loadMusicUI();
		};
		request.send();
	};
	Class.prototype.removeContentPlaceHolder = function() {
		if (this.contentPlaceHolder) {
			this.contentPlaceHolder.parentNode.removeChild(this.contentPlaceHolder);
			this.contentPlaceHolder = null;
		}
	};
	Class.prototype.showLoader = function() {
		this.layoutWrapper.innerHTML = '';
		this.loaderOverlay.style.display = 'flex';
	};
	Class.prototype.hideLoader = function() {
		this.loaderOverlay.style.display = 'none';
	};
	Class.prototype.loadMusicUI = function() {
		var fragment = this.document.createDocumentFragment(),
			_ref = this,
			songsCount = Number(_ref.songsCountDropDown.value),
			iterator = 0;

		for (iterator; iterator < songsCount; iterator++) {
			var element = document.createElement('div'),
				dataObject = this.model[iterator];

			element.innerHTML = dataObject.iframeTag;
			element.firstChild.className += 'u-margin-b1';
			fragment.appendChild(element.firstChild);
		}

		this.layoutWrapper.appendChild(fragment);
		setTimeout(function() {
			_ref.hideLoader();
		}, 1000);
	};
	Class.prototype.bindUIHandlers = function() {
		this.bindInputKeyPress();
		this.bindButtonClick();
	};
	Class.prototype.bindInputKeyPress = function() {
		var _ref = this;

		this.input.addEventListener(
			'keypress',
			function(e) {
				if (e.keyCode === 13) {
					_ref.handleDataSubmit();
				}
			},
			false
		);
	};
	Class.prototype.handleDataSubmit = function() {
		var inputText = this.input.value.trim().toLowerCase();

		if (!inputText) {
			this.input.focus();
			return false;
		}
		this.showLoader();
		this.sendRequest(inputText);
	};
	Class.prototype.bindButtonClick = function() {
		var _ref = this;

		this.button.addEventListener(
			'click',
			function() {
				_ref.handleDataSubmit();
			},
			false
		);
	};

	var instance = new Class();
	instance.init();
})(window);
