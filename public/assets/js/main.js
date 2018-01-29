(function(W) {
	function Class() {
		this.model = {};
		this.W = W;
		this.constants = {
			songs: 'songs',
			playlists: 'playlists',
			templates: {
				dropdown: {
					songs:
						'<option selected value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="all">All</option>',
					playlists:
						'<option selected value="1">1</option><option value="2">2</option><option value="all">All</option>'
				}
			}
		};
		this.document = this.W.document;
		this.input = this.document.querySelector('.js-input-field');
		this.songsCountDropDownWrapper = this.document.querySelector('.js-songs-dropdown-wrapper');
		this.songsCountDropDown = this.document.querySelector('.js-songs-count-dropdown');
		this.mediaDropDown = this.document.querySelector('.js-media-dropdown');
		this.button = this.document.querySelector('.js-input-button');
		this.layoutWrapper = this.document.querySelector('.js-layout-wrapper');
		this.contentPlaceHolder = this.document.querySelector('.js-content-placeholder');
		this.loaderOverlay = this.document.querySelector('.js-loader-overlay');
	}

	Class.prototype.init = function() {
		this.bindUIHandlers();
	};
	Class.prototype.sendRequest = function(mediaType, artistName) {
		var request = new XMLHttpRequest(),
			url = 'http://localhost:8000/search/' + mediaType + '/' + artistName,
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
			mediaCountDropDownValue = _ref.songsCountDropDown.value,
			isCountAll = !!(mediaCountDropDownValue === 'all'),
			mediaCount = isCountAll ? this.model.length : Number(mediaCountDropDownValue),
			iterator = 0;

		for (iterator; iterator < mediaCount; iterator++) {
			var element = document.createElement('div'),
				dataObject = this.model[iterator];

			element.innerHTML = dataObject.iframeTag;
			// element.firstChild.className += 'u-margin-b1';
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
		this.bindMediaDropDownChange();
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
		var inputText = this.input.value.trim().toLowerCase(),
			mediaType = this.mediaDropDown.value.toLowerCase();

		if (!inputText || !mediaType) {
			this.input.focus();
			return false;
		}
		this.showLoader();
		this.sendRequest(mediaType, inputText);
	};
	Class.prototype.handleMediaDropDownChange = function(mediaType) {
		switch (mediaType) {
			case 'songs':
				this.songsCountDropDown.innerHTML = this.constants.templates.dropdown.songs;
				break;
			case 'playlists':
				this.songsCountDropDown.innerHTML = this.constants.templates.dropdown.playlists;
				break;
			case 'default':
				break;
		}
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
	Class.prototype.bindMediaDropDownChange = function() {
		var _ref = this;

		this.mediaDropDown.addEventListener(
			'change',
			function(e) {
				var mediaType = e.target.value.toLowerCase();
				_ref.handleMediaDropDownChange(mediaType);
			},
			false
		);
	};

	var instance = new Class();
	instance.init();
})(window);
