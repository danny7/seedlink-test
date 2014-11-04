$(function () {
	var popupWindowTaskBrief = website.popupWindowsService.createWindow(
		document.querySelector('#current-position-brief'),
		{
			showButtons: [ document.querySelector('#current-position') ],
			hideOnBackplateClick: true
		}
	);

	$('.filter .x-button').add('.button-remove').on('click' ,function (e) {
		var filter = e.target.parentNode;
		// l(filter);
		filter.parentNode.removeChild(filter);
		filter = undefined;
		delete filter;
	});
});