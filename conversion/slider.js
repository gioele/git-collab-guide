function setup_all_sliders() {
	var lists = document.querySelectorAll('ol');
	for (var i = 1; i < lists.length; i++) {
		var slider = new VanillaSlider(lists[i]);
	}
}

document.addEventListener("DOMContentLoaded", setup_all_sliders);
