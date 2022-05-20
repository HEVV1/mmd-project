// GLOBALY ACCESSIBLE ----------------------------------------------------------------------------------
var initMap;
var map;
var map_mobile;
var markers;
var marker_data_partners;
var updateInfoWindowPosition;
// ---------------------------------------------------------------------------------------------------------------
(function($) {
	initMap = function() {
		// setup brains
		map = new google.maps.Map($('.block-map .wrapper-map')[0], {
			zoom			: 8.5,
			center			: new google.maps.LatLng(56.9320, 23.9689),
			mapTypeId   	: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			styles: [
			]
		});
		map_mobile = new google.maps.Map($('.block-map .wrapper-map')[1], {
			zoom			: 8.5,
			center			: new google.maps.LatLng(56.9320, 23.9689),
			mapTypeId   	: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			styles: [
			]
		});
		var opt = {minZoom: 8.5, maxZoom: 17};
		map.setOptions(opt);
		map_mobile.setOptions(opt);
		

		// trigger resize because it was under display: none;
		google.maps.event.trigger(map, 'resize');
		google.maps.event.trigger(map_mobile, 'resize');
		
		markers = [
			{
				lat: 56.9320,
				lng: 23.9689
			}
		];

		for (let i = 0; i < markers.length; i++) {
			createMarker(markers[i]);
		}

		$('.block-map').removeClass('loading');
	}

	$(document).ready(function(){
		var script = document.createElement('script');
		script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARPhnXtM36JaVv5ZMr8V17LqfWkbLn3nk&callback=initMap&v=3');
		script.setAttribute('defer', 'defer');
		script.setAttribute('async', '');
		document.head.appendChild(script);
	});

})(jQuery);

function createMarker(marker_data) {
	/*
	 * HTMLMapMarker Javascript class
	 * Extends the Google Maps OverlayView class
	 * Set up to accept our latlng, html for the div, and the map to attach it to as arguments
	 */
	class HTMLMapMarker extends google.maps.OverlayView
	{	
		// Constructor accepting args
		constructor(args) {
			super();
			this.latlng = args.latlng;
			this.html = args.html;
			this.setMap(args.map);
		}

		// Create the div with content and add a listener for click events
		createDiv() {
			this.div = document.createElement('div');
			this.div.style.position = 'absolute';
			if (this.html) {
				this.div.innerHTML = this.html;
			}
			google.maps.event.addDomListener(this.div, 'click', event => {
				google.maps.event.trigger(this, 'click');
			});

			google.maps.event.addDomListener(marker, 'click');

			
			$('.wrapper-marker', '.block-map').on('click', function(event) {
			
			});
		}
		
		// Append to the overlay layer
		// Appending to both overlayLayer and overlayMouseTarget which should allow this to be clickable
		appendDivToOverlay() {
			const panes = this.getPanes();
			panes.overlayLayer.appendChild(this.div);
			panes.overlayMouseTarget.appendChild(this.div);
		}

		// Position the div according to the coordinates
		positionDiv() {
			const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
			if (point) {
				this.div.style.left = `${point.x}px`;
				this.div.style.top = `${point.y}px`;
			}
		}

		// Create the div and append to map
		draw() {
			if (!this.div) {
				this.createDiv();
				this.appendDivToOverlay();
			}
			this.positionDiv();
		}

		// Remove this from map
		remove() {
			if (this.div) {
				this.div.parentNode.removeChild(this.div);
				this.div = null;
			}
		}

		// Return lat and long object
		getPosition() {
			return this.latlng;
		}

		// Return whether this is draggable
		getDraggable() {
			return false;
		}
	}

	for (let i = 0; i < markers.length; i++) {
		if (markers[i] == marker_data) {
			var marker = new HTMLMapMarker({
				latlng: new google.maps.LatLng(marker_data.lat, marker_data.lng),
				map: map,
				html: 
				'<div class=\'wrapper-marker markets\' id=market_'+i+' data='+i+'>'+
					'<div class=\'circle\'>'+
						'<div class=\'wrapper-image\'>'+
							'<img src=\'./assets/images/ic_map_location.svg\'>'+
						'</div>'+
					'</div>'+
				'</div>'
			});
		}
	}
	for (let i = 0; i < markers.length; i++) {
		if (markers[i] == marker_data) {
			var marker = new HTMLMapMarker({
				latlng: new google.maps.LatLng(marker_data.lat, marker_data.lng),
				map: map_mobile,
				html: 
				'<div class=\'wrapper-marker markets\' id=market_'+i+' data='+i+'>'+
					'<div class=\'circle\'>'+
						'<div class=\'wrapper-image\'>'+
							'<img src=\'./assets/images/ic_map_location.svg\'>'+
						'</div>'+
					'</div>'+
				'</div>'
			});
		}
	}
	return marker;	
}