/* Sorting Plugin for Nitro
 * Requried by main.js - so don't remove it
 * By Jono Cooper & George Czabania
 * Licensed under the BSD License
 */

// Globals
var $sortType

//Adds as a plugin
plugin.add(function() {
	
	console.log("Loaded sort.js")

	$(document).ready(function() {
		$panel.left.append('\
			<span>\
			<button data-toggle="dropdown" class="sort">Sort</button>\
			<ul class="dropdown-menu">\
			  <li class="current" data-value="magic"><span class="icon magic"></span>Magic</li>\
			  <li data-value="manual"><span class="icon hand"></span>by Hand</li>\
			  <li data-value="priority"><span class="icon priority"></span>Priority</li>\
			  <li data-value="date"><span class="icon date"></span>Date</li>\
			</ul>\
			</span>')

		$sortType = $('.panel .left span ul li')
		$sortType.on('click', function() {
			$sortType.removeClass('current')
			$(this).addClass('current')
			var val = $(this).attr('data-value')
			core.storage.prefs.listSort[ui.session.selected] = val
			$('#L' + ui.session.selected + ' .name').click()
			core.storage.save()
		})
	})

	var getDateWorth = function(timestamp) {

		if(timestamp == "") {
			return 0;
		}

		var due = new Date(timestamp),
			today = new Date();

		// Copy date parts of the timestamps, discarding the time parts.
		var one = new Date(due.getFullYear(), due.getMonth(), due.getDate());
		var two = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		
		// Do the math.
		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var millisBetween = one.getTime() - two.getTime();
		var days = millisBetween / millisecondsPerDay;
		
		// Round down.
		var diff = Math.floor(days);

		if(diff > 14) {
			diff = 14
		}

		return 14 - diff + 1;

	}
	
	plugin.sort = function(array, method) {

		// Clone list
		list = array.slice(0)

		// Convert task IDs to obects
		for(var i = 0; i < list.length; i++) {
			var id = list[i];
			list[i] = core.storage.tasks[list[i]];
			list[i].arrayID = id;
		}
		
		// Sorting methods
		switch(method) {
			
			case "magic":
				list.sort(function(a, b) {

					var rating = {
						a: getDateWorth(a.date),
						b: getDateWorth(b.date)
					}

					var worth = { none: 0, low: 2, medium: 6, high: 10 }

					rating.a += worth[a.priority]
					rating.b += worth[b.priority]

					if(a.logged && !b.logged) return true
					else if(!a.logged && b.logged) return false
					else if(a.logged && b.logged) return null

					else if(rating.a < rating.b) return true
					else if (rating.c > rating.b) return false
					else return null
	
				})
				break
				
			case "manual":
				break;
				
			case "priority":
				
				list.sort(function(a,b) {
					var worth = { none: 0, low: 1, medium: 2, high: 3 };
					if(a.logged && !b.logged) return true
					else if(!a.logged && b.logged) return false
					else if(a.logged && b.logged) return null
					else if(worth[a.priority] < worth[b.priority]) return true;
					else if(worth[a.priority] > worth[b.priority]) return false;
					else return null
				});
				break;
				
			case "date":
				list.sort(function(a,b) {
					if(a.logged && !b.logged) return true
					else if(!a.logged && b.logged) return false
					else if(a.logged && b.logged) return null
					// Handle tasks without dates
					if(a.date=="" && b.date !== "") return true;
					else if(b.date=="" && a.date !== "") return false;
					else if (a.date == "" && b.date == "") return null;
					// Sort timestamps
					else if(a.date >  b.date) return true;
					else if(a.date <  b.date) return false;
					else return null
				});
				break;
			
		}
		
		// Unconvert task IDs to obects
		for(var i = 0; i < list.length; i++) {
			var id = list[i].arrayID
			delete list[i].arrayID
			list[i] = id
		}
		
		return list;
		
	};
	
});