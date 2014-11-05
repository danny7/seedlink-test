$(function () {
	var showNFiltersAtBeginning = 4;
	var allFilterVisibilities = [];
	var allFilters = Array.prototype.slice.apply(
		document.querySelectorAll('.filters-list [data-role="list-item"]')
	);

	allFilters.forEach(function (filter, i ,allFilters) {
		filter.filterIndex = i;
		allFilterVisibilities[i] = i < (showNFiltersAtBeginning + 1) && i !== 0;
		if (!allFilterVisibilities[i]) {
			filter.style.display = 'none';
		}
	});

	var manuallyRemovedFilter = document.querySelector('#manually-removed-filter');



	var addFilterButton = document.querySelector('#button-add-a-filter');
	$(addFilterButton).on('click', function () {
		for (var _i = 1; _i < allFilters.length; _i++) {
			if (!allFilterVisibilities[_i]) break;
		};
		l(_i);
		allFilterVisibilities[_i] = true;
		allFilters[_i].style.display = '';
	});



	var candidatesList = document.querySelector('#column-candidate-items .people-list');

	var popupWindowTaskBrief = website.popupWindowsService.createWindow(
		document.querySelector('#current-position-brief'),
		{
			showButtons: [ document.querySelector('#current-position') ],
			hideOnBackplateClick: true
		}
	);

	$('.filter .x-button').on('click' ,function (e) {
		var filter = e.target.parentNode;
		// l(filter);
		allFilterVisibilities[filter.filterIndex] = false;
		filter.style.display = 'none';
	});

	$('.button-remove').on('click', function (e) {
		var people = e.target.parentNode;
		manuallyRemovedFilter.style.display = '';
		destroy(people);
	});

	$('.button-add').on('click', function (e) {
		var people = e.target.parentNode;
		addOnePeopleToCandidate(people);
	});

	$('#button-filtered-list-add-all').on('click', function (e) {
		var firstPeopleInFilteredList;
		do {
			firstPeopleInFilteredList = 
			document.querySelector('#column-filtered-items .people-list .people');
			addOnePeopleToCandidate(firstPeopleInFilteredList);
		} while (firstPeopleInFilteredList)
	});



	function destroy(dom) {
		dom.parentNode.removeChild(dom);
		dom = undefined;
		delete dom;
	}

	function addOnePeopleToCandidate(people) {
		if (!people) return;

		var peopleName = people.querySelector('.people-name').innerText;
		var peopleRank = people.querySelector('.people-rank').innerText;
		var peopleAvatarImage = people.querySelector('.avatar').style.backgroundImage;

		var clonedPeople = document.createElement('DIV');
		clonedPeople.dataset.role = 'list-item';
		clonedPeople.className = 'people';

		var tempSpan = null;

		tempSpan = document.createElement('SPAN');
		tempSpan.className = 'people-name';
		tempSpan.innerText = peopleName;
		clonedPeople.appendChild(tempSpan);

		tempSpan = document.createElement('SPAN');
		tempSpan.className = 'people-rank';
		tempSpan.innerText = peopleRank;
		clonedPeople.appendChild(tempSpan);

		tempSpan = document.createElement('SPAN');
		tempSpan.dataset.role = 'avatar';
		tempSpan.className = 'avatar';
		tempSpan.style.backgroundImage = peopleAvatarImage;
		clonedPeople.appendChild(tempSpan);

		candidatesList.appendChild(clonedPeople);

		destroy(people);
	}
});