/* ./plugins/cmd.js */

// CMD
// Easily do something in a single line

cmd = function (cmd) {
	// Contains all the commands

	switch(cmd) {
		// File Menu
		case 'newtask':
			$addBTN.click()
			break
		case 'newlist':
			$sidebar.find('.listAddBTN').click()
			break
		case 'sync':
			$settingsbtn.click()
			$('a[data-target=#tabSync]').tab('show')
			break

		// Edit Menu
		case 'find':
			$search.focus()
			break
		case 'prefs':
			$settingsbtn.click()
			$('a[data-target=#tabGeneral]').tab('show')
			break

		// Sort
		case 'sort-magic':
			$sortType.find('.magic').parent().click()
			break
		case 'sort-default':
			$sortType.find('.default').parent().click()
			break
		case 'sort-priority':
			$sortType.find('.priority').parent().click()
			break
		case 'sort-date':
			$sortType.find('.date').parent().click()
			break

		// GoTo
		case 'today':
			$('#Ltoday .name').click()
			break
		case 'next':
			$('#Lnext .name').click()
			break
		case 'scheduled':
			$('#Lscheduled .name').click()
			break
		case 'logbook':
			$('#Llogbook .name').click()
			break
		case 'allTasks':
			$('#Lall .name').click()
			break

		// View menu
		case 'language':
			$settingsbtn.click()
			$('a[data-target=#tabLanguage]').tab('show')
			break
		case 'theme':
			$settingsbtn.click()
			$('a[data-target=#tabTheme]').tab('show')
			break
		case 'syncSettings':
			$settingsbtn.click()
			$('a[data-target=#tabSync]').tab('show')
			break

		// Help Menu
		case 'about':
			$('#aboutDialog .version').html(version)
			$('#aboutDialog').fadeToggle(150)
			$('#settingsOverlay').toggle(0)
			break
		case 'donors':
			$('#donateDialog').fadeToggle(150)
			$('#settingsOverlay').toggle(0)
			break
		case 'donate':
			window.location = 'http://nitrotasks.com/donate.html'
			break
		case 'help':
			window.location = 'http://nitrotasks.com/help'
			break
		case 'bug':
			window.location = 'https://github.com/stayradiated/Nitro/issues'
			break

		// Extra stuff for keyboard shortcuts
		case 'editTask':
			// $editBTN.click()
			$tasks.find('.selected').map(function() {
				$(this).trigger(jQuery.Event('dblclick', {metaKey: true}))
			})
			break
		case 'editList':
			$sidebar.find('.selected .name').dblclick()
			break
		case 'check':
			$tasks.find('.selected .checkbox').click()
			break
		case 'delete':
			// if($warning.is(':visible')) $("#overlay").click()
			$delBTN.click()
			break

		case 'prevTask':
			if(!$tasks.find('.selected').length) {
				$tasks.find('li').first().addClass('selected')
			} else {
				if(ui.session.selected === 'next') {
					if($tasks.find('.selected').is(':first-of-type')) {
						$tasks.find('.selected').parent().prev().prev().find('li').last().find('.content').click()
					} else {
						$tasks.find('.selected').prevAll('li:not(".hidden")').first().find('.content').click()
					}
				} else {
					$tasks.find('.selected').prev('li').find('.content').click()
				}
			}
			
			break
		case 'nextTask':
			if(!$tasks.find('.selected').length) {
				$tasks.find('li').first().addClass('selected')
			} else {
				if(ui.session.selected === 'next') {
					if($tasks.find('.selected').is(':last-of-type')) {
						$tasks.find('.selected').parent().next().next().find('li').first().find('.content').click()
					} else {
						$tasks.find('.selected').nextAll('li:not(".hidden")').first().find('.content').click()
					}
				} else {
					$tasks.find('.selected').next('li').find('.content').click()
				}
			}
			break
		case 'prevList':
			if(!$sidebar.find('.selected').length) {
				$sidebar.find('li').first().find('.name').click()
			} else if ($sidebar.find('.selected').is(':first-of-type')) {
				$sidebar.find('.selected').parent().prev('h2').prev('ul').find('li').last().find('.name').click()
			} else {
				$sidebar.find('.selected').prev('li').find('.name').click()
			}
			break
		case 'nextList':
			if(!$sidebar.find('.selected').length) {
				$sidebar.find('li').first().find('.name').click()
			} else if ($sidebar.find('.selected').is(':last-of-type')) {
				$sidebar.find('.selected').parent().next('h2').next('ul').find('li').first().find('.name').click()
			} else {
				$sidebar.find('.selected').next('li').find('.name').click()
			}
			break

		case 'moveTaskUp':
			if($tasks.find('.selected').length) {
				var $this = $tasks.find('.selected').first(),
					id = $this.attr('data-id').toNum(),
					$parent = $this.parent()

				if(ui.session.selected === 'next') {
					var l = core.storage.lists.items[$parent.attr('id')].order,
						i = l.indexOf(id)
				} else {
					var	l = core.storage.lists.items[ui.session.selected].order,
						i = l.indexOf(id)
				}

				if(i > 0) {
					l.splice(i, 1)
					l.splice(i - 1, 0, id)

					if($parent.is('.wholeList')) {
						$parent.find('li, p').remove()
						for (var i in l) {
							$parent.addClass('wholeList').append(ui.tasks.draw(l[i]))
						}
					} else {
						$sidebar.find('.selected .name').click()
					}

					$tasks.find('[data-id='+id+']').addClass('selected')
					core.storage.save()
				}
			}
			break
		case 'moveTaskDown':
			if($tasks.find('.selected').length) {
				var $this = $tasks.find('.selected').first(),
					id = $this.attr('data-id').toNum(),
					$parent = $this.parent()

				if(ui.session.selected === 'next') {
					var l = core.storage.lists.items[$parent.attr('id')].order,
						i = l.indexOf(id)
				} else {
					var	l = core.storage.lists.items[ui.session.selected].order,
						i = l.indexOf(id)
				}

				if(i > -1 && !$this.is(':last-of-type')) {
					l.splice(i, 1)
					l.splice(i + 1, 0, id)

					if($parent.is('.wholeList')) {
						$parent.find('li, p').remove()
						for (var i in l) {
							$parent.addClass('wholeList').append(ui.tasks.draw(l[i]))
						}
					} else {
						$sidebar.find('.selected .name').click()
					}

					$tasks.find('[data-id='+id+']').addClass('selected')
					core.storage.save()
				}
			}
			break
		case 'moveListUp':
			var id = ui.session.selected,
				l = core.storage.lists.order,
				i = l.indexOf(id)
			if(i > 0) {
				l.splice(i, 1)
				l.splice(i - 1, 0, id)
				ui.reload()
				$('#L' + id + ' .name').click()
				core.storage.save()
			}
			break
		case 'moveListDown':
			var id = ui.session.selected,
				l = core.storage.lists.order,
				i = l.indexOf(id)
			if(i > -1) {
				l.splice(i, 1)
				l.splice(i + 1, 0, id)
				ui.reload()
				$('#L' + id + ' .name').click()
				core.storage.save()
			}
			break

		case 'escape':
			$('#overlay, #settingsOverlay').click()
			break
	}
}
/* ./plugins/filter.js */

/* Filters Plugin for Nitro
 * By Jono Cooper & George Czabania
 * Licensed under the BSD License
 */

//Adds as a plugin
plugin.add(function() {
	
	console.log("Loaded filter.js")
	
	filter = function(list, filters) {
		
		// This will check one task and either return true or false
		var check = function(task, key, property) {
			
			// Handles multiple properties in an array
			if(typeof property === 'object') {
				var match = false;
				// Loop through this
				for(var i = 0; i < property.length; i++) {			
					if(check(task, key, property[i])) {
						match = true;
					}
				}
				return match;
			}
			
			// Formats the property value
			switch(key) {
				
				case "logged":
						
					// Get tasks that are logged
					if (property === true) {
						if(typeof task[key] == 'number') return true;
						
					// Get tasks that were logged after a certain time
					} else if (typeof property == 'number') {
						if(task[key] >= property) return true;
					}
					break;
					
				case "notes":
				
					// Get tasks with notes
					if (property === true) {
						// Notes must have at least one non-space char
						if(task[key].match(/\S/)) return true;
					}
					break;
					
				case "priority":
				
					// Gets tasks without a priority
					if (property === false) {
						property = "none";
					
					// Get tasks that have a priority
					} else if (property === true) {
						if(task[key] !== "none") return true;
					}
					break;
					
				case "date":
				
					if (property === true) {
						if (task[key] != false) return true;
					}
				
					var due = new Date(task[key]),
						today = new Date();
						
					if (property == 'month') {
						if (due.getMonth() == today.getMonth()) return true;
					}
				
					// Copy date parts of the timestamps, discarding the time parts.
					var one = new Date(due.getFullYear(), due.getMonth(), due.getDate());
					var two = new Date(today.getFullYear(), today.getMonth(), today.getDate());
					
					// Do the math.
					var millisecondsPerDay = 1000 * 60 * 60 * 24;
					var millisBetween = one.getTime() - two.getTime();
					var days = millisBetween / millisecondsPerDay;
					
					// Round down.
					var diff = Math.floor(days);
					
					// Get tasks due today
					if (property == 'overdue') {
						if (diff < 0) return true
					} else if (property == 'today') {
						if (diff === 0) return true;
					} else if(property == 'tomorrow') {
						if (diff <= 1) return true;
					} else if (property == 'week') {
						if (diff <= 7) return true;
					} else if (property == 'fortnight') {
						if (diff <= 14) return true;
					} else if (typeof property == 'number') {
						if (diff <= property) return true;
					}
					break;
			}
			
			if(task[key] == property) {
				return true;
			} else {
				return false;
			}
		}
		
		var results = [];		
		
		// Loop through tasks
		for(var i = 0; i < list.length; i++) {
			
			var task = core.storage.tasks[list[i]];
			
			for(var key in filters) {
				
				// Convert string to boolean
				if(filters[key] === 'true') filters[key] = true;
				if(filters[key] === 'false') filters[key] = false;
				
				if(check(task, key, filters[key])) {
					
					results.push(list[i]);
					
				}
				
			}
			
		}

		// Get all tasks that are logged, but not in the logbook
		if(filters === 'logged') {
			for (var i=0; i<core.storage.tasks.length; i++) {
				if(!core.storage.tasks[i].hasOwnProperty('deleted') && core.storage.tasks[i].logged && core.storage.tasks[i].list !== 'logbook') {
					results.push(i);
				}
			}
		}
		
		return results;
		
	};
	
});
/* ./plugins/keys.js */

// Keyboard Shortcuts!

key('up, k', function() {cmd('prevTask')})
key('down, j', function() {cmd('nextTask')})
key('⌘+up, ⌘+k', function() {cmd('moveTaskUp')})
key('⌘+down, ⌘+j', function() {cmd('moveTaskDown')})

key('⇧+up, ⇧+k, i', function() {cmd('prevList')})
key('⇧+down, ⇧+j, u', function() {cmd('nextList')})
key('⇧+⌘+up, ⇧+⌘+k', function() {cmd('moveListUp')})
key('⇧+⌘+down, ⇧+⌘+j', function() {cmd('moveListDown')})

key('space', function() {cmd('check')})
key('enter', function() {cmd('editTask'); return false})
key('⌘+enter', function() {cmd('editList'); return false})

key('delete', function() {cmd('delete')})

key('f', function() {cmd('find'); return false})
key('p', function() {cmd('prefs')})
// key('a', function() {cmd('about')})
// key('h', function() {cmd('help')})

key('n, t', function() {cmd('newtask'); return false})
key('l', function() {cmd('newlist'); return false})
key('s', function() {cmd('sync')})

key('1', function() {cmd('today')})
key('2', function() {cmd('next')})
key('3', function() {cmd('scheduled')})
key('4', function() {cmd('logbook')})
key('5', function() {cmd('allTasks')})

key('esc', function() {cmd('escape')})

// Tasks
$tasks.on('keydown', 'input.content', function(e) {
	if(e.keyCode === 13) {
		console.log("Hello World")
	}
})

// Lists
$lists.on('keydown', 'input', function(e) {
	if(e.keyCode === 13) {
		ui.toggleListEdit($(this).parent(), 'close')
	}
})

// Tasks
$tasks.on('keydown', 'input.content', function(e) {
	if(e.keyCode === 13) {
		var $this = $(this).closest('li'),
			id = $this.attr('data-id').toNum()
		ui.toggleTaskEdit($this, {}, function() {
			$tasks.find('[data-id='+id+']').click()
		})
	}
})

$tasks.on('keydown', 'input, textarea', function(e) {
	if(e.keyCode === 27) {
		var $this = $(this).closest('li'),
			id = $this.attr('data-id').toNum()
		ui.toggleTaskEdit($this, {}, function() {
			$tasks.find('[data-id='+id+']').click()
		})
	}
})
/* ./plugins/scheduled.js */

/* Nitro Scheduled & Recurring Plugin
 * By Jono Cooper & George Czabania
 * Licensed under the BSD License
 */
plugin.add(function() {

	var $this,
	//Nice shorthand Method
		$l = $.i18n;

	//Creates Scheduled List if it doesn't already exist
	if(!core.storage.lists.items.scheduled) { 
		core.storage.lists.items.scheduled = {order: [], time: {name: 0, order: 0}};
	}

	$smartlists.on('ready', function() {

		console.log("Loading scheduled.js")

		//Creates a list item
		var markup = Mustache.to_html(templates.list, {
			id: 'scheduled',
			name: $l._('scheduled')
		})

		//Adds to Sidebar
		$('#Lnext').after(markup)
		$this = $('#Lscheduled')

		//Updates Count
		$this.find('.count').html(core.list('scheduled').populate().length)

	})

	$('body').append('\
		<div id="scheduledDialog">\
			<div class="inner">\
				<table>\
					<tr class="radioscheduled">\
						<td><input type="radio" name="scheduledtype" id="scheduledRadio" value="scheduled" checked></td>\
						<td><label for="scheduledRadio" class="translate" data-translate="scheduled"></label></td>\
					</tr>\
					<tr class="radioscheduled bottom">\
						<td><input type="radio" name="scheduledtype" value="recurring" id="recurringRadio"></td>\
						<td><label for="recurringRadio" class="translate" data-translate="recurring"></label><br></td>\
					</tr>\
					<tr class="schedule">\
						<td>\
							<label for="reviewNo" class="translate" data-translate="reviewNo"></label>\
						</td>\
						<td>\
							<input id="reviewNo" min="1" type="number">\
							<select id="reviewLength">\
								<option value="days" class="translate" data-translate="days"></option>\
								<option value="weeks" class="translate" data-translate="weeks"></option>\
								<option value="months" class="translate" data-translate="months"></option>\
								<option value="years" class="translate" data-translate="years"></option>\
							</select>\
						</td>\
					</tr>\
					<tr class="schedule">\
						<td>\
							<label for="reviewAction" class="translate" data-translate="reviewAction"></label>\
						</td>\
						<td>\
							<select class="reviewAction"></select><br>\
						</td>\
					</tr> <tr class="recurring"> <td><label for="recurType" class="translate" data-translate="recurType"></label></td> <td><select id="recurType"> <option value="daily" class="translate" data-translate="daily"></option>\
								<option value="weekly" class="translate" data-translate="weekly"></option>\
								<option value="monthly"class="translate" data-translate="monthly"></option>\
							</select></td>\
					</tr>\
				</table>\
					<div class="recurring" id="recurSpecial"></div>\
				<table>\
					<tr class="recurring"> <td><label for="recurNext" class="translate" data-translate="recurNext"></label></td> <td><input type="text" id="recurNext" placeholder="Next Occurance"></td> </tr> <tr class="recurring"> <td><label for="recurEnds" class="translate" data-translate="recurEnds"></label></td> <td><input type="text" id="recurEnds" placeholder="Last Occurance"></td> </tr> <tr class="recurring"> <td>\
							<label for="reviewAction" class="translate" data-translate="reviewAction"></label>\
						</td>\
						<td>\
							<select class="reviewAction"></select><br>\
						</td>\
					</tr>\
				</table>\
				<div id="buttonbox">\
					<button class="cancel translate" data-translate="cancel"></button>\
					<button class="create"></button>\
				</div>\
			</div>\
		</div>')

	//We need a timeout
	setTimeout(function(){
		$('#scheduledDialog .translate').map(function () {
			$(this).html($.i18n._($(this).attr('data-translate')));
		})
	}, 2000)

	//I'm bad at coding. Sue me.
	$('#scheduledDialog .inner .create').click(function () {

		var id = $(this).parent().parent().attr('data-type');
		//Calculates Date
		var date = parseInt($('#reviewNo').val());
		var unit = $('#reviewLength').val();

		//Zeros Days
		var today = new Date();
		today.setSeconds(0);
		today.setMinutes(0);
		today.setHours(0);
		var tmpdate = new Date()

		if (unit == 'days') {
			today.setDate(today.getDate() + date);
		} else if (unit == 'weeks') {
			today.setDate(today.getDate() + (date * 7));
		} else if (unit == 'months') {
			today.setMonth(today.getMonth() + date);
		} else if (unit == 'years') {
			today.setYear(today.getFullYear() + date);
		};

		if (id == 'add') {
			if ($('#scheduledDialog input[type=radio]:checked').val() === 'scheduled') {
				//Creates a new Scheduled Task
				plugin.scheduled.core.add('New Task', 'scheduled');

				//Edits Data inside of it
				var task = core.storage.tasks[core.storage.lists.items.scheduled.order.length - 1];

				//Calculates Difference
				//task.date = (Math.round((today.getTime() - tmpdate.getTime()) / 1000 / 60 / 60 /24));
				task.next = today.getTime();
				task.list = $('.schedule .reviewAction').val();


			} else if ($('#scheduledDialog input[type=radio]:checked').val() === 'recurring') {

				var test = $('#recurNext').val();
				if (test == '' || new Date(test) == 'Invalid Date') {
					return;
				}
				//Creates a new Recurring Task
				plugin.scheduled.core.add('New Task', 'recurring');

				//Edits Data inside of it
				var task = core.storage.tasks[core.storage.lists.items.scheduled.order.length - 1];
				task.next = new Date($('#recurNext').val()).getTime();

				//Makes sure that it doesn't break polyStorage. I dunno.
				if ($('#recurEnds').val() == '') {
					task.ends = '';
				} else {
					task.ends = new Date($('#recurEnds').val()).getTime();	
				}

				task.list = $('.recurring .reviewAction').val();
				task.recurType = $('#recurType').val();

				if (task.recurType === 'daily') {
					task.recurInterval = [parseInt($('#recurSpecial input').val())];
				} else if (task.recurType === 'weekly') {
					var interval = [];

					$('#recurSpecial div').map(function () {
						interval.push([parseInt($(this).children('input').val()), $(this).children('select').val(), task.next]);
					})

					task.recurInterval = interval;
				} else if (task.recurType == 'monthly') {
					var interval = [];

					$('#recurSpecial div').map(function () {
						interval.push([1, parseInt($(this).children('.type').val()), 'day', task.next]);
					})

					task.recurInterval = interval;
				}
			}

		} else {
			//THIS DOESN't WORK. Don't use it. Don't even try. Don't even look at it.
			var id = (core.storage.tasks[id].type).substr(0,1) + id;
			var task = core.storage.tasks[id.substr(1)];

			if (id.substr(0, 1) == 's') {

				//Edits Values
				task.next = new Date(today).getTime();
				task.list = $('.schedule .reviewAction').val()

			} else if (id.substr(0, 1) == 'r') {
				task.next = $('#recurNext').val();
				task.ends = $('#recurEnds').val();
				task.recurType = $('#recurType').val();

				if (task.recurType === 'daily') {
					task.recurInterval = [parseInt($('#recurSpecial input').val())];
				} else if (task.recurType === 'weekly') {
					var interval = [];

					$('#recurSpecial div').map(function () {
						interval.push([parseInt($(this).children('input').val()), $(this).children('select').val(), task.next]);
					})

					task.recurInterval = interval;
				} else if (task.recurType == 'monthly') {
					var interval = [];

					$('#recurSpecial div').map(function () {
						interval.push([1, parseInt($(this).children('.type').val()), 'day', task.next]);
					})

					task.recurInterval = interval;
				}
			}
		}

		//Saves
		core.storage.save();

		//Closes
		$('#scheduledDialog .inner').fadeOut(150);
		$('#scheduledDialog').hide(0);

		//Reschedule Schedule
		plugin.scheduled.core.update();

		//Reload UI
		$('#Lscheduled .name').click();
		obj.view.$('.count').html(core.list('scheduled').populate().length);
		obj.view.$().attr('id', 'L' + obj.model.get('id'));
		ui.lists.update().count();

	});

	$('#scheduledDialog .cancel').click(function () {
		$addBTN.click();
	});

	var weeks = '<input type="number"> weeks on <select><option value="1">Monday</option><option value="2">Tuesday</option><option value="3">Wednesday</option> <option value="4">Thursday</option> <option value="5">Friday</option> <option value="6">Saturday</option> <option value="0">Sunday</option></select>';
	var months = 'on the <select class="type"><option value="1">1st</option> <option value="2">2nd</option> <option value="3">3rd</option> <option value="4">4th</option> <option value="5">5th</option> <option value="6">6th</option> <option value="7">7th</option> <option value="8">8th</option> <option value="9">9th</option> <option value="10">10th</option> <option value="11">11th</option> <option value="12">12th</option> <option value="13">13th</option> <option value="14">14th</option> <option value="15">15th</option> <option value="16">16th</option> <option value="17">17th</option> <option value="18">18th</option> <option value="19">19th</option> <option value="20">20th</option> <option value="21">21st</option> <option value="22">22nd</option> <option value="23">23rd</option> <option value="24">24th</option> <option value="25">25th</option> <option value="26">26th</option> <option value="27">27th</option> <option value="28">28th</option> <option value="29">29th</option> <option value="30">30th</option> <option value="31">31st</option></select> day';

	$body.on('click', '.addRecur', function () {
		var length = $('#recurType').val();

		if (length === 'weekly') {
			$('#recurSpecial').append('<div>And ' + weeks + '<span class="removeRecur">-</span></div>')
		} else if (length === 'monthly') {
			$('#recurSpecial').append('<div>And ' + months + '<span class="removeRecur">-</span></div>')
		}

	});

	$body.on('click', '.removeRecur', function () {
		$(this).parent().remove();
	})

	//Date Picker
	$('#recurNext, #recurEnds').datepicker();

	$('#scheduledDialog input[type=radio]').on('change', function () {
		var toggle = $(this).val();

		if (toggle === 'scheduled') {
			$('#scheduledDialog .inner .schedule').show(0);
			$('#scheduledDialog .inner .recurring').hide(0);
		} else if (toggle === 'recurring') {
			$('#scheduledDialog .inner .schedule').hide(0);
			$('#scheduledDialog .inner .recurring').show(0);
		}
	});

	//First time:
	$('#recurSpecial').html('<table><tr><td>Every:</td><td><input type="number" min="1" value="7"> days</td></tr></table>');

	$('#recurType').on('change', function () {
		var toggle = $(this).val();

		if (toggle === 'daily') {
			$('#recurSpecial').html('<table><tr><td>Every:</td><td><input type="number" min="1" value="7"> days</td></tr></table>');
		} else if (toggle === 'weekly') {
			$('#recurSpecial').html('<div>Every ' + weeks + '<span class="addRecur">+</span></div>');
		} else if (toggle === 'monthly') {
			$('#recurSpecial').html('<div>Every month ' + months + '<span class="addRecur">+</span></div>');
		}
	});
		
	plugin.scheduled = {
		core: {
			add: function(name, type) {
				//ID of task
				var taskId = core.storage.tasks.length;
				core.storage.tasks.length++;

				if (type === 'scheduled') {
					core.storage.tasks[taskId] = {
						content: name,
						priority: 'none',
						date: '',
						notes: '',
						list: 'today',
						type: 'scheduled',
						tags: [],
						next: '0',
						date: '',
						synced: false,
						time: {
							content: 0,
							priority: 0,
							date: 0,
							notes: 0,
							list: 0,
							type: 0,
							next: 0,
							date: 0
						}
					}

				} else if (type === 'recurring') {
					core.storage.tasks[taskId] = {
						content: name,
						priority: 'none',
						date: '',
						notes: '',
						list: 'today',
						type: 'recurring',
						next: '0',
						date: '',
						tags: [],
						recurType: 'daily',
						recurInterval: [1],
						ends: '0',
						synced: false,
						time: {
							content: 0,
							priority: 0,
							date: 0,
							notes: 0,
							list: 0,
							type: 0,
							next: 0,
							date: 0,
							recurType: 0,
							recurInterval: 0,
							ends: 0
						}
					}
				}
				//Pushes to order
				core.storage.lists.items.scheduled.order.unshift(taskId);
				core.storage.save();
				console.log("Added a new " + type + " task")
			},

			update: function() {
				//Loops through all da tasks
				for (var i=0; i < core.storage.lists.items.scheduled.order.length; i++) {

					//Defines task for later
					var id = core.storage.lists.items.scheduled.order[i];
					var task = core.storage.tasks[id];

					if (task.next != '0') {

						//Add the task to the list if the date has been passed
						if (new Date(task.next).getTime() <= new Date().getTime()) {

							//Makes a new Task
							core.task().add(task.content, task.list);
							var data = core.storage.tasks[core.storage.tasks.length -1];

							//Sets Data
							data.notes = task.notes;
							data.priority = task.priority;

							//Task is scheduled
							if (task.type == 'scheduled') {

								//Deletes from scheduled
								console.log(id)					
								core.task(id).move('trash');
								console.log('Task: ' + id + ' has been scheduled');

							//Task is recurring
							} else if (task.type == 'recurring') {

								//Checks Ends
								if (task.ends != 0 || task.ends != '') {
									//If it's ended
									if (new Date(task.ends).getTime() <= new Date().getTime()) {
										//Task has finished.
										console.log('The recurring has come to an end. Casting into oblivion.');
										core.task(id).move('trash');
										return;
									}
								}

								//Calculates Due Date
								if (task.date != '') {
									//Adds number to next
									var tmpdate = new Date(task.next);
									tmpdate.setDate(tmpdate.getDate() + parseInt(task.date));
									data.date = tmpdate.getTime();
								}

								//Change the Next Date
								if (task.recurType == 'daily') {
									var tmpdate = new Date(task.next);
									tmpdate.setDate(tmpdate.getDate() + task.recurInterval[0]);
									task.next = tmpdate.getTime();
								} else if (task.recurType == 'weekly') {
									var nextArr = [];

									//Loop through everything and create new dates
									for (var key in task.recurInterval) {
										//Checks if date has been passed
										if (new Date(task.recurInterval[key][2]).getTime() <= new Date().getTime()) {
											//If it has, we'll work out the next date.

											//Adds Weeks
											task.recurInterval[key][2] = new Date(task.recurInterval[key][2]).setDate(new Date(task.recurInterval[key][2]).getDate() + (7 * parseInt(task.recurInterval[key][0])))


											//Adds Days
											var next = parseInt(task.recurInterval[key][1]),
											day = new Date(task.recurInterval[key][2]).getDay(),
											diff = (next - day) == 0 ? 7 : (next - day);

											//Final Date
											task.recurInterval[key][2] = new Date(task.recurInterval[key][2]).setDate(task.recurInterval[key][2] .getDate() + diff);

											//task.recurInterval[key][2] = cli.calc.dateConvert(Date.parse(task.recurInterval[key][2]).addWeeks(parseInt(task.recurInterval[key][0]) - 1).moveToDayOfWeek(parseInt(task.recurInterval[key][1])));
										}

										//Even if it hasn't, we'll still push it to an array.
										nextArr.push(new Date(task.recurInterval[key][2]).getTime());
									}
									//Next date as the next one coming up
									task.next = Array.min(nextArr).getTime();
								} else if (task.recurType == 'monthly') {
									var nextArr = []

									//Loop through everything and create new dates
									for (var key in task.recurInterval) {
										//Checks if date has been passed
										if (new Date(task.recurInterval[key][3]).getTime() <= new Date().getTime()) {
											if (task.recurInterval[key][2] == 'day') {
												
												//BROKEN. FIXME
												if (new Date.setDate(task.recurInterval[key][1]).getTime() <= new Date().getTime()) {
													//If it's been, set it for the next month
													task.recurInterval[key][3] = new Date().setDate(task.recurInterval[key][1]).setMonth(new Date().getMonth() + 1).getTime();
												} else {
													//If it hasn't, set it for this month
													task.recurInterval[key][3] = new Date().setDate(task.recurInterval[key][1]).getTime();
												}
											} else {
												//BROKEN. FIXME
												//This is a piece of crap that I don't plan to implement unless someone tells me to.
												/*
												var namearr = ['zero', 'set({day: 1})', 'second()', 'third()', 'fourth()', 'last()'];
												var datearr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
												//Fuckit. Using eval. Stupid date.j
												/*var result = eval('Date.today().' + namearr[task.recurInterval[key][1]] + '.' + datearr[task.recurInterval[key][2]] + '()')

												console.log(result)

												//If it's already been, next month
												if (result.getTime() < new Date().getTime()) {
													var result = eval('Date.today().' + namearr[task.recurInterval[key][1]] + '.addMonths(1).' + datearr[task.recurInterval[key][2]] + '()')
												}

												task.recurInterval[key][3] = cli.calc.dateConvert(new Date(result));*/
											}
										}

										//Even if it hasn't, we'll still push it to an array.
										nextArr.push(new Date(task.recurInterval[key][3]).getTime());
									}

									//Next date as the next one coming up
									task.next = Array.min(nextArr).getTime();

								}
								console.log('Task: ' + i + ' has been recurred')
							}
							core.storage.save();
						};
					};
				};
			}
		},

		ui: {
			add: function() {
				$('#scheduledDialog .inner').fadeToggle(150).attr('data-type', 'add');
				$('.radioscheduled input[value=scheduled]').attr('checked', 'true');
				$('#scheduledDialog').toggle(0);
				plugin.scheduled.ui.init('add');
			},

			init: function (type) {
				if (type == 'edit') {
					var id = $('#scheduledDialog .inner').attr('data-type');
					var id = (core.storage.tasks[id].type).substr(0,1) + id;

					//Fills in Values
					var task = core.storage.tasks[id.substr(1)];
					var text = $.i18n._('edit');

					if (id.substr(0, 1) == 's') {

						//Zeros Days
						var today = new Date();
						today.setSeconds(0);
						today.setMinutes(0);
						today.setHours(0);
						var tmpdate = new Date(task.next)

						var no = (Math.round((tmpdate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24)),
							length = 'days',
							action = task.list;

						//Hides Bits of UI
						$('#scheduledDialog .inner .schedule').show(0);
						$('#scheduledDialog .inner .recurring').hide(0);


					} else if (id.substr(0, 1) == 'r') {
						//Hides Bits of UI
						$('#scheduledDialog .inner .schedule').hide(0);
						$('#scheduledDialog .inner .recurring').show(0);

						//Changes UI
						$('#recurType').val(task.recurType).change();

						if (task.recurType == 'daily') {
							$('#recurSpecial input').val(task.recurInterval[0]);
						} else if (task.recurType == 'weekly') {
							for (var i = 0; i < task.recurInterval.length; i++) {
								if (i != 0) {
									$('.addRecur').click()
								}
								//Puts data in
								$($('#recurSpecial div')[i]).children('input').val(task.recurInterval[i][0]);
								$($('#recurSpecial div')[i]).children('select').val(task.recurInterval[i][1]);
							}
						} else if (task.recurType == 'monthly') {
							for (var i = 0; i < task.recurInterval.length; i++) {
								if (i != 0) {
									$('.addRecur').click()
								}
								//Puts data in
								$($('#recurSpecial div')[i]).children('.type').val(task.recurInterval[i][1]);
							}
						}

						$('#recurNext').datepicker('setDate', new Date(task.next));
						if ($('#recurEnds').val() != '') {
							$('#recurEnds').datepicker('setDate', new Date(task.ends));	
						} else {
							$('#recurEnds').val('');
						}
					}

					$('.radioscheduled').hide(0);

				} else {
					var no = 5,
						length = 'days',
						action = 'today',
						text = $.i18n._('create');

					$('.radioscheduled').show(0);
					$('#scheduledDialog .inner .schedule').show(0);
					$('#scheduledDialog .inner .recurring').hide(0);
				}

				var output = '<option value="today">' + $.i18n._('today') + '</option><option value="next">' + $.i18n._('next') + '</option>';
				for (var i = 0; i < core.storage.lists.order.length; i++) {
					output += '<option value="' + core.storage.lists.order[i] + '">' + core.storage.lists.items[core.storage.lists.order[i]].name + '</option>'
				};

				$('.reviewAction').html(output);

				//Updates UI
				$('#reviewNo').val(no);
				$('#reviewLength').val(length);
				$('.reviewAction').val(action);
				$('#scheduledDialog .inner .create').html(text)

			}
		}
	}
});
//Because functions have to be defined before being run
plugin.add(function() {
	//Updates Scheduled and Recurring Tasks
	plugin.scheduled.core.update();
})

//Because I'm lazy.
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};
/* ./plugins/search.js */

/* Nitro Search Plugin
 * By Jono Cooper & George Czabania
 * Licensed under the BSD License
 */

//Adds as a plugin
plugin.add(function() {

	//Load plugin on document ready
	$(document).ready(function() {
		$panel.right.append('<input id="search" type="search" placeholder="Search">')
		$search = $("#search")
	});

	$panel.right.on('keyup', '#search', function() {

		var $this = $(this),
			input = $this.val()

		var searcher = function(key) {
			var pass1 = [],
				pass2 = true;

			// Loop through each word in the query
			for (var q = 0; q < query.length; q++) {

				// Create new search
				search = new RegExp(query[q], 'i');

				if(typeof(key) == 'function') {
					//Nope. Not a good idea
					return;
				}

				var task = core.storage.tasks[key]

				// Search
				if (search.test(task.content + task.notes + '#' + task.tags.toString().replace(/,/g,' #'))) {
					pass1.push(true);
				} else {
					pass1.push(false);
				}
			}

			// This makes sure that the task has matched each word in the query
			for (var p = 0; p < pass1.length; p++) {
				if (pass1[p] === false) {
					pass2 = false;
				}
			}

			// If all terms match then add task to the results array
			if (pass2) {
				return (key)
			}
		}
		
		if (input == '') {
			//If there's no input, just load list
			$sidebar.find('.selected .name').click();
		} else {
			//Puts the results into the UI
			$tasks.html('<h2>Search Results: ' + $this.val() + '</h2><ul></ul>')

			//There is some input
			// Set vars
			var query = input.split(' '),
				results = [],
				search;

			if (ui.session.selected == 'all') {
				// Search loop
				for (var t = 0; t < core.storage.tasks.length; t++) {

					// If task exists
					if (core.storage.tasks[t]) {

						//Seaches Task
						var str = searcher(t);
						if (str != undefined) {
							results.push(str);
						}
					}
				}

			} else {
				for (var key in core.storage.lists.items[ui.session.selected].order) {
					var str = parseInt(searcher(core.storage.lists.items[ui.session.selected].order[key]))
					if (!isNaN(str)) {
						results.push(str);
					}
				}
			}
			// Draws
			$tasks.find('ul').append(ui.lists.drawTasks(results))
		}
	})
})
/* ./plugins/settings.js */

$(function() {
	//Adds button to panel
	$panel.right.prepend('<button class="settingsbtn"></button>')
	$settingsbtn = $('.settingsbtn')
	$settingsbtn.on('click', function() {
		$('#prefsDialog').modal();
	})
	$('body').append('\
		<div id="prefsDialog">\
			<ul class="nav nav-tabs"><li class="active"><a href="#" data-target="#tabGeneral" data-toggle="tab" class="translate" data-translate="general">g</a></li><li><a href="#" data-target="#tabLanguage" data-toggle="tab" class="translate" data-translate="language">g</a></li><li><a href="#" data-target="#tabTheme" data-toggle="tab" class="translate" data-translate="theme">g</a></li><li><a href="#" data-target="#tabSync" data-toggle="tab" class="translate" data-translate="sync">g</a></li></ul>\
			<div class="tab-content">  \
				<div class="tab-pane active" id="tabGeneral">\
				<form>\
					<input type="checkbox" id="deleteWarnings"><label for="deleteWarnings" class="translate" data-translate="hideWarnings"></label><br>\
					<label class="description translate" data-translate="deleteWarningsDescription"></label>\
					<hr>\
					<label class="left translate" data-translate="nextDescription"> </label><select id="nextAmount">\
						<option value="noLists" class="translate" data-translate="nextNoLists"></option>\
						<option value="everything" class="translate" data-translate="nextEverything"></option>\
					</select>\
				</form>\
				</div>  \
				<div class="tab-pane" id="tabLanguage">\
					<table>\
						<thead>\
							<tr>\
								<th class="translate" data-translate="language"></th>\
								<th class="translate" data-translate="authortext"></th>\
								<th class="translate" data-translate="language"></th>\
								<th class="translate" data-translate="authortext"></th>\
							</tr>\
						</thead>\
						<tbody>\
							<tr>\
								<td class="language"><a href="#" data-value="english">English</a></td>\
								<td class="author">Caffeinated Code</td>\
								<td class="language"><a href="#" data-value="bad">Bad English</a></td>\
								<td class="author"><a href="mailto:jono@joncoooper.com">Jono Cooper</a>\
							</tr>\
								<!--td class="language"><a href="#" data-value="hungarian">Magyar</a></td>\
								<td class="author"><a href="mailto:sjozsef0227@gmail.com">József Samu</a>\
							</td>\
							<tr>\
								<td class="language"><a href="#" data-value="pirate">English (Pirate)</a></td>\
								<td class="author">Caffeinated Code</td>\
								<td class="language"><a href="#" data-value="portuguese">Português</a></td>\
								<td class="author"><a href="mailto:email@belenos.me">Belenos Govannon</a></td>	\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="german">Deutsch</a></td>\
								<td class="author"><a href="mailto:d.peteranderl@googlemail.com">Dennis Peteranderl</a>, <a href="info@agentur-simon.de">Bertram Simon</a></td>\
								<td class="language"><a href="#" data-value="russian">Русский</a></td>\
								<td class="author"><a href="mailto:a.pryah@gmail.com">Andrej Pryakhin</a></td>\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="spanish">Español</a></td>\
								<td class="author"><a href="mailto:admin@bumxu.com">Juande Martos</a></td></td>\
								<td class="language"><a href="#" data-value="finnish">Suomi</a></td>\
								<td class="author"><a href="mailto:rami.selin@gmail.com">Rami Selin</a></td>\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="basque">Euskara</a></td>\
								<td class="author"><a href="mailto:atxooy@gmail.com">Naxo Oyanguren</a></td>\
								<td class="language"><a href="#" data-value="vietnamese">Tiếng Việt</a></td>\
								<td class="author"><a href="mailto:dinhquan@narga.net">Nguyễn Đình Quân</a></td>\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="french">Français</a></td>\
								<td class="author"><a href="mailto:maurin.raphael@gmail.com">Raphaël Maurin</a></td>\
								<td class="language"><a href="#" data-value="arabic">‏العربية‏</a></td>\
								<td class="author"><a href="mailto:fouad.hassouneh@gmail.com">Fouad Hassouneh</td>\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="italian">Italiano</a></td>\
								<td class="author"><a href="mailto:lmassa@bwlab.it.com">Luigi Massa</a></td>\
								<td class="language"><a href="#" data-value="chinese">中文(简体)</a></td>\
								<td class="author"><a href="mailto:1132321739qq@gmail.com">tuhaihe</a>, 2012</td>\
							</tr>\
							<tr>\
								<td class="language"><a href="#" data-value="polish">Polski</a></td>\
								<td class="author">Marcin Tydelski,<br>Kajetan Szczepaniak</td>\
								<td class="language"><a href="#" data-value="turkish">Türkçe</a></td>\
								<td class="author"><a href="mailto:selimssevgi@gmail.com">Selim Sırrı Sevgi</a></td>\
							</tr-->\
						</tbody>\
					</table>  \
				</div>\
				<div class="tab-pane" id="tabTheme">  \
					<label class="left translate" data-translate="pickTheme"></label><select id="theme">\
						<option value="default">Default</option>\
						<option value="linux">Linux</option>\
						<option value="none">None</option>\
					</select><br>\
					<label class="description translate" data-translate="themeDescription"></label>\
					<div class="pythonshit">\
						<hr>\
						<label class="left translate" data-translate="replaceDefault"></label><input type="file" id="chooseBG"><br>\
						<label class="left translate" data-translate="useDefault"></label><button id="removeBG" class="translate" data-translate="removeBG"></button><br>\
						<label class="left translate" data-translate="bgSize"></label><select id="backgroundSize">\
							<option value="zoom" class="translate" data-translate="fill"></option>\
							<option value="shrink" class="translate" data-translate="shrink"></option>\
							<option value="tile" class="translate" data-translate="tile"></option>\
						</select>\
						<label class="description translate" data-translate="bgDescription"></label>\
						<hr>\
						<label class="left translate" data-translate="headingColor"></label>\
						<select id="headingColor">\
							<option value="" class="translate" data-translate="default"></option>\
							<option value="light" class="translate" data-translate="light"></option>\
							<option value="dark" class="translate" data-translate="dark"></option>\
						</select>\
						<label class="description translate" data-translate="headingDescription"></label>\
					</div>\
				</div>\
				<div class="tab-pane" id="tabSync">\
					<div class="connect">\
						<h2>Choose a service to setup Nitro Sync</h2>\
						<div class="icons">\
							<a class="icon" href="#" data-service="dropbox"><img src="css/img/dropbox.png"></a>\
							<a class="icon" href="#" data-service="ubuntu"><img src="css/img/ubuntu.png"></a>\
						</div>\
					</div>\
					<div class="waiting">\
						<p><span class="translate" data-translate="syncAuthenticate"> </span><a class="cancel">Cancel</a></p>\
						<img class="spinner" src="css/img/spinner.gif">\
					</div>\
					<div class="settings">\
						<a class="left logout translate" data-translate="syncLogout" href="#"></a>\
						<label class="left translate" data-translate="syncLoggedIn"></label><span class="email right">Not logged in.</span><br>\
						<label class="left translate" data-translate="syncService"></label><span class="service">No service set.</span>					\
						<!--label class="left">Delete server: </label><button class="deleteserver">Delete</button>\
						<label class="description">WARNING: This will delete the nitro_data.json file on your storage account! This action cannot be undone!</label>\
						<label class="left">Delete client: </label><button class="deleteclient">Delete client</button>\
						<label class="description">WARNING: This will delete all your tasks! You will lose everything!</label-->\
						<hr>\
						<label class="left translate" data-translate="syncLabel"></label><select id="syncInterval">\
							<option value="never" class="translate" data-translate="syncNever"></option>\
							<option value="manual" class="translate" data-translate="syncManual"></option>\
							<option value="timer" class="translate" data-translate="syncTimer"></option>\
							<option value="auto" class="translate" data-translate="syncAuto"></option>\
						</select><br>\
						<label class="description translate" data-translate="syncDescription"></label>\
					</div>\
				</div>\
			</div>\
		</div>\
	');
	//Because it needs time to load
	setTimeout(function() {
		$('#prefsDialog .translate').map(function () {
			$(this).html($.i18n._($(this).attr('data-translate')));
		})
	}, 300)

	var $tabSync = $('#tabSync')

	/**********************************
		SETTINGS
	**********************************/

	// CHECK BOXES [DELETE WARNINGS & LOW GRAPHICS MODE]
	$('#tabGeneral form input').change(function () {

		core.storage.prefs.deleteWarnings = $('#deleteWarnings').prop('checked')
		core.storage.save()

	})

	// NEXT AMOUNT
	$('#nextAmount').change(function () {

		core.storage.prefs.nextAmount = this.value;
		core.storage.save();

		//Reloads next if it is selected
		if (ui.session.selected === 'next') {
			$('#Lnext .name').click();
		}
	});

	// THEME
	$('#theme').change(function () {
		// Get value
		var theme = $(this)[0].value;

		// Set CSS file
		$('link.theme').attr('href', 'css/' + theme + '.css').ready(function () {
			$(window).resize();
		});

		//Saves Theme
		core.storage.prefs.theme = theme;
		core.storage.save();

		//Tells Python
		if (app == 'python') {
			document.title = 'theme|' + core.storage.prefs.theme
		}
	});

	/**********************************
		CUSTOM BACKGROUNDS
	**********************************/

	// REMOVE CUSTOM BACKGROUND
	$('#removeBG').click(function () {
		localStorage.removeItem('background');
		$tasks[0].style.backgroundImage = 'none';
	});

	// DRAG AND DROP
	$body.bind({
		dragover: function () {
			// Stop the window from opening the file
			return false;
		},
		drop: function (e) {
			// Get the files from the event
			e = e || window.event;
			e.preventDefault();
			e = e.originalEvent || e;
			if (e.hasOwnProperty('files') || e.hasOwnProperty('dataTransfer')) {
				var files = (e.files || e.dataTransfer.files);
				setBG(files[0]);
				return false;
			}
		}
	});

	// BUTTON UPLOAD
	$('#chooseBG').change(function (e) {
		var files = $(this)[0].files;
		setBG(files[0]);
	});

	// Takes a file and sets it as the background
	var setBG = function (f) {
		core.storage.prefs.bgSize = this.value;
		var reader = new FileReader();
		reader.onload = function (event) {

			localStorage.removeItem('background');
			localStorage.setItem('background', event.target.result);

			$tasks[0].style.backgroundImage = 'url(' + event.target.result + ')';
		};
		reader.readAsDataURL(f);
		core.storage.save()
	};

	// BACKGROUND SIZE
	$('#backgroundSize').change(function () {
		core.storage.prefs.bgSize = this.value;
		switch (this.value) {
		case 'tile':
			$tasks.removeClass('shrink zoom').addClass('tile');
			break;
		case 'shrink':
			$tasks.removeClass('tile zoom').addClass('shrink');
			break;
		case 'zoom':
			$tasks.removeClass('tile shrink').addClass('zoom');
			break;
		}
		core.storage.save();
	});

	// HEADING COLOR
	$('#headingColor').change(function () {
		core.storage.prefs.bgColor = this.value;
		core.storage.save();

		$tasks.find('h2').removeClass('light dark').addClass(core.storage.prefs.bgColor);
	});

	/**********************************
			LOADING PREFERENCES
	**********************************/
	$('#deleteWarnings').prop('checked', core.storage.prefs.deleteWarnings);
	$('#nextAmount').val(core.storage.prefs.nextAmount);
	$('#theme').val(core.storage.prefs.theme);
	$('#backgroundSize').val(core.storage.prefs.bgSize);
	$('#headingColor').val(core.storage.prefs.bgColor);

	// CUSTOM BACKGROUND
	if (localStorage.hasOwnProperty('background')) {
		$tasks[0].style.backgroundImage = 'url(' + localStorage.getItem('background') + ')';
	} else if (core.storage.prefs.hasOwnProperty('background')) {
		$tasks[0].style.backgroundImage = 'url(' + core.storage.prefs.background + ')';
	}

	$tasks.addClass(core.storage.prefs.bgSize);

	// LANGUAGE
	$('#tabLanguage a.current').removeClass('current');
	$('#tabLanguage .language a').each(function () {
		if ($(this).data('value') === core.storage.prefs.lang) {
			$(this).addClass('current');
		}
	});
	$('#tabLanguage').bind('click', function (e) {
		if ($(e.srcElement).is('.language a')) {
			core.storage.prefs.lang = $(e.srcElement).data('value');
			core.storage.save();

			window.location.reload();
			return false;
		}
	});

	// SYNC
	$('#syncInterval').val(core.storage.prefs.sync.interval)
	if(core.storage.prefs.sync.hasOwnProperty('access')) {		
		// Load settings
		$tabSync.find('.email').html(core.storage.prefs.sync.email)
		$tabSync.find('.service').html(core.storage.prefs.sync.service)
		// Show settings
		$tabSync.find('.connect').hide()
		$tabSync.find('.settings').show()
	}


	/**********************************
				SYNC
	**********************************/

	var animateTab = function(tab, from, to) {
		var oldHeight = tab.height()
		tab.height('auto')
		from.hide()
		to.show()
		var newHeight = tab.height()
		to.hide()
		from.show().fadeOut(150, function() {
			tab.height(oldHeight)
			to.fadeIn(150)
			tab.animate({
				height: newHeight
			}, 300)
		})
	}

	$tabSync.find('a.icon').click(function() {
			
		var service = $(this).data('service');
			
		// Run sync
		sync.run(service, function (result) {
			if(result) {
				$tabSync.find('.email').html(core.storage.prefs.sync.email);
				$tabSync.find('.service').html(service);
				animateTab($tabSync, $tabSync.find('.waiting'), $tabSync.find('.settings'))
			} else {
				$tabSync.find('.waiting p').html("Could not sync with server...")
				setTimeout(function() {
					animateTab($tabSync, $tabSync.find('.waiting'), $tabSync.find('.connect'))
				}, 5000)
			}
		})
		
		animateTab($tabSync, $tabSync.find('.connect'), $tabSync.find('.waiting'))
	})

	$tabSync.find('a.cancel').click(function() {

		animateTab($tabSync, $tabSync.find('.waiting'), $tabSync.find('.connect'))

	})

	$tabSync.find('.logout').click(function () {
		// Delete tokens from localStorage
		delete core.storage.prefs.sync.email
		delete core.storage.prefs.sync.access
		delete core.storage.prefs.sync.service
		core.storage.save()
		// Go back to main page
		animateTab($tabSync, $tabSync.find('.settings'), $tabSync.find('.connect'))
	})

	// SYNC TYPE
	$('#syncInterval').change(function () {
		var interval = this.value
		core.storage.prefs.sync.interval = interval
		core.storage.save()
	})

});

/* ./plugins/sort.js */

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
/* ./plugins/sync.js */

/* Nitro Sync Plugin
 * By Jono Cooper & George Czabania
 * Licensed under the BSD License
 * Uses jQuery for AJAX calls
 */

//Adds as a plugin
plugin.add(function() {

	$(document).ready(function() {
		$panel.right.prepend('<button id="runSync"></button>')
		$runSync = $('#runSync')
	})

	$panel.right.on('click', '#runSync', function() {
		$this = $(this)

		if($this.hasClass('running')) {
			// Do nothing...
		} else if(core.storage.prefs.sync.hasOwnProperty('access') && core.storage.prefs.sync !== 'never') {
			$this.addClass('running')
			sync.run('dropbox', function(success, time) {
				if(success) {
					console.log("Everything worked - took " + time/1000 + "s")
				} else {
					// Display notification that sync failed
					sync.notify("Could not sync with server...")
				}
				$this.removeClass('running')
			})
		} else {
			$settingsbtn.trigger('click')
			$('a[data-target=#tabSync]').tab('show');
		}
	})

	sync = {
		// Magical function that handles connect and emit
		run: function (service, callback) {

			var time = core.timestamp()

			if (service) {
				core.storage.prefs.sync.service = service;
			} else if (!core.storage.prefs.sync.hasOwnProperty('service')) {
				console.log("Error: Don't know what service to use.");
				return;
			}

			if (core.storage.prefs.sync.hasOwnProperty('access')) {

				sync.emit(function(success) {
					time = core.timestamp() - time
					if (typeof callback === "function") callback(success, time);
				});

			} else {

				sync.connect(function (result) {
					if(result) {
						sync.emit(function(success) {
							time = core.timestamp() - time
							if (typeof callback === "function") callback(success, time)
						})
					} else {
						if (typeof callback === "function") callback(result, 0)
					}
				})
			}

		},
		ajaxdata: {
			'data': {}
		},
		connect: function (callback) {

			console.log("Connecting to Nitro Sync server")

			// Already has access token
			if (core.storage.prefs.sync.hasOwnProperty('access')) {

				var ajaxdata = sync.ajaxdata

				// Watch ajax data for changes
				ajaxdata.watch('data', function (id, oldval, newval) {

					if (newval == "success") {
						console.log("Nitro Sync server is ready")
						if(typeof callback === 'function') callback(true)
					} else if (newval == "failed") {
						console.log("Could not connect to Server")
						if(typeof callback === 'function') callback(false)
					}

					// Unwatch AJAX
					ajaxdata.unwatch();

				})

				if (app == 'python') {
					document.title = 'null'
					document.title = 'ajax|access|' + core.storage.prefs.sync.access + '|' + core.storage.prefs.sync.service
				} else {
					$.ajax({
						type: "POST",
						url: core.storage.prefs.sync.url + '/auth/',
						dataType: 'json',
						data: {
							access: JSON.stringify(core.storage.prefs.sync.access),
							service: core.storage.prefs.sync.service
						},
						success: function (data) {
							ajaxdata.data = data;
						},
						error: function(data) {
							console.log("Could not connect to Server")
							if(typeof callback === 'function') callback(false)
						}
					})
				}

			// Needs access token
			} else {
				var ajaxdata = sync.ajaxdata;
				ajaxdata.watch('data', function (id, oldval, newval) {

					console.log("Verifying token");
					core.storage.prefs.sync.token = newval;

					// Display popup window
					if (app == 'python') {
						document.title = 'frame|' + newval.authorize_url;
					} else {
						var width = 960,
							height = 600
							left = (screen.width / 2) - (width / 2),
							top = (screen.height / 2) - (height / 2)
						window.open(newval.authorize_url, Math.random(), 'toolbar=no, type=popup, status=no, width='+width+', height='+height+', top='+top+', left='+left);
						if (app == 'web') {
							$('#login .container').html('<div class="loading">Loading... You may need to disable your popup blocker.</div>');
						}
					}

					// Unbind first AJAX thing
					ajaxdata.unwatch();

					// New Ajax Request
					ajaxdata.watch('data', function (id, oldval, newval) {
						if(newval != 'failed') {
							console.log("Nitro Sync server is ready")
							core.storage.prefs.sync.access = newval.access
							core.storage.prefs.sync.email = newval.email
							delete core.storage.prefs.sync.token
							callback(true)
							core.storage.save()
						} else {
							console.log("Connection failed. Server probably timed out.")
							callback(false)
						}

						// Unbind AJAX
						ajaxdata.unwatch();
					});

					// Ajax Request we're watching for
					if (app == 'python') {
						document.title = 'null';
						document.title = 'ajax|token|' + JSON.stringify(core.storage.prefs.sync.token) + '|' + core.storage.prefs.sync.service;
					} else {
						$.ajax({
							type: "POST",
							url: core.storage.prefs.sync.url + '/auth/',
							dataType: 'json',
							data: {
								token: core.storage.prefs.sync.token,
								service: core.storage.prefs.sync.service
							},
							success: function (data) {
								ajaxdata.data = data;
							},
							error: function(data) {
								console.log("Could not connect to Server")
								if(typeof callback === 'function') callback(false)
							}
						});
					}

					return newval;
				})

				//^ Ajax Request we're watching for
				if (app == 'python') {
					document.title = 'null';
					document.title = 'ajax|reqURL|' + core.storage.prefs.sync.service;
				} else {
					$.ajax({
						type: "POST",
						url: core.storage.prefs.sync.url + '/auth/',
						dataType: 'json',
						data: {
							reqURL: 'true',
							service: core.storage.prefs.sync.service
						},
						success: function (data) {
							ajaxdata.data = data;
						},
						error: function(data) {
							console.log("Could not connect to Server")
							if(typeof callback === 'function') callback(false)
						}
					});
				}
			}
		},

		emit: function (callback) {
			var client = {
					tasks: core.storage.tasks,
					lists: core.storage.lists,
					stats: {
						uid: core.storage.prefs.sync.email,
						os: app,
						language: core.storage.prefs.lang,
						version: version
					}
				},
				ajaxdata = sync.ajaxdata

			//Watches Ajax request
			ajaxdata.watch('data', function (id, oldval, newval) {
				newval = decompress(newval);
				console.log("Finished sync");
				core.storage.tasks = newval.tasks;
				core.storage.lists = newval.lists;
				core.storage.save();
				ui.reload();
			});

			//^ Ajax Request we're watching for
			if (app == 'python') {
				document.title = 'null';
				document.title = 'ajax|sync|' + JSON.stringify(compress(client)) + '|' + JSON.stringify(core.storage.prefs.sync.access) + '|' + core.storage.prefs.sync.service;
			} else {
				$.ajax({
					type: "POST",
					url: core.storage.prefs.sync.url + '/sync/',
					dataType: 'json',
					data: {
						data: JSON.stringify(compress(client)),
						access: core.storage.prefs.sync.access,
						service: core.storage.prefs.sync.service
					},
					success: function (data) {
						if (data != 'failed') {
							ajaxdata.data = data;
							if(typeof callback === 'function') callback(true)
							return true;
						} else {
							if(typeof callback === 'function') callback(false)
							return false;
						}
					},
					error: function () {
						console.log("Hello")
						if(typeof callback === 'function') callback(false)
						return false;
					}
				});
			}
		},
		notify:function (msg) {
			$runSync.before('<div class="message">'+msg+'</div>')
			var $msg = $panel.right.find('.message')
			$msg.hide().fadeIn(300)
			setTimeout(function() {
				$msg.fadeOut(500, function() {
					$(this).remove()
				})
			}, 4000)
		}
	}

	function compress(obj) {
		var chart = {
			name: 'a',
			tasks: 'b',
			content: 'c',
			priority: 'd',
			date: 'e',
			today: 'f',  		// Deprecated
			showInToday: 'g', 	// Deprecated
			list: 'h',
			lists: 'i',
			logged: 'j',
			time: 'k',
			sync: 'l',
			synced: 'm',
			order: 'n',
			queue: 'o',
			length: 'p',
			notes: 'q',
			items: 'r',
			next: 's',
			someday: 't',
			deleted: 'u',
			logbook: 'v',
			scheduled: 'w',
			version: 'x'
		},
			out = {};

		for (var key in obj) {
			if (chart.hasOwnProperty(key)) {
				out[chart[key]] = obj[key];
				if (typeof obj[key] === 'object' && isArray(obj[key]) == false) {
					out[chart[key]] = compress(out[chart[key]]);
				}
			} else {
				out[key] = obj[key];
				if (typeof obj[key] === 'object' && isArray(obj[key]) == false) {
					out[key] = compress(out[key]);
				}
			}
		}
		return out;
	}

	function decompress(obj) {
		var chart = {
			a: 'name',
			b: 'tasks',
			c: 'content',
			d: 'priority',
			e: 'date',
			f: 'today',
			g: 'showInToday',
			h: 'list',
			i: 'lists',
			j: 'logged',
			k: 'time',
			l: 'sync',
			m: 'synced',
			n: 'order',
			o: 'queue',
			p: 'length',
			q: 'notes',
			r: 'items',
			s: 'next',
			t: 'someday',
			u: 'deleted',
			v: 'logbook',
			w: 'scheduled',
			x: 'version'
		},
			out = {};

		for (var key in obj) {
			if (chart.hasOwnProperty(key)) {
				out[chart[key]] = obj[key];
				if (typeof obj[key] === 'object' && isArray(obj[key]) == false) {
					out[chart[key]] = decompress(out[chart[key]]);
				}
			} else {
				out[key] = obj[key];
				if (typeof obj[key] === 'object' && isArray(obj[key]) == false) {
					out[key] = decompress(out[key]);
				}
			}
		}
		return out;
	}

	// Because typeof is useless here
	function isArray(obj) {
		return obj.constructor == Array;
	}

	// object.watch
	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: function (prop, handler) {
				var
				oldval = this[prop],
					newval = oldval,
					getter = function () {
						return newval;
					},
					setter = function (val) {
						oldval = newval;
						return newval = handler.call(this, prop, oldval, val);
					};

				if (delete this[prop]) { // can't watch constants
					Object.defineProperty(this, prop, {
						get: getter,
						set: setter,
						enumerable: true,
						configurable: true
					});
				}
			}
		});
	}

	// object.unwatch
	if (!Object.prototype.unwatch) {
		Object.defineProperty(Object.prototype, "unwatch", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: function (prop) {
				var val = this[prop];
				delete this[prop]; // remove accessors
				this[prop] = val;
			}
		});
	}
});
/* ./plugins/tags.js */

// Tags plugin 2

plugin.add(function() {

	$tasks.on('blur', 'input.tags', function() {

		var $this = $(this).closest('li'),
			val = $(this).val(),
			model = {
				id: $this.attr('data-id').toNum()
			},
			task = core.storage.tasks[model.id]

		var tags = val.split(/\s*,\s*/)

		// Because regex is hard
		for(var i = 0; i < tags.length; i++) {
			if(tags[i].length == 0) {
				tags.splice(i, 1)
			}
		}

		task.tags = tags
		core.storage.save('tasks', model.id, 'tags')

	})

	// Clicking a tag
	$tasks.on('click', '.tag', function() {

		// Get tag name
		var tag = '#' + $(this).text();
		// Go to All Tasks list
		$('#Lall .name').trigger('click')
		// Run search - We should give the searchbox an ID
		$search.val(tag).trigger('keyup')
		
	})

})
/* ./plugins/timer.js */

timer = {

	loadList: function() {
		var $list = $('#L0 .name')[0]

		console.time("n")

		for(var i = 1; i < 2; i++) {

			$list.click()

		}
		console.timeEnd("n")

	},

	addTask: function() {

		var $btn = $('button.add')[0]

		console.time("n")

		for(var i = 1; i < 101; i++) {

			$btn.click()

		}
		console.timeEnd("n")

	},

	mustache: function(list) {

		$('body').empty();

		var tasks = ""

		console.time("n")

		for(var i = 0; i < list.length; i++) {

			var data = core.storage.tasks[list[i]];

			tasks += Mustache.to_html(templates.task.collapsed, {
				id: i,
				content: data.content,
				notes: data.notes,
				date: data.date,
				priority: data.priority
			})

		}

		$('body').html(tasks)

		console.timeEnd("n")

	}

}
/* ./plugins/upgrade.js */

// Upgrade localStorage from 1.3.1 to 1.4

// plugin.add(function() {

	upgrade = function() {

		var storage = $.polyStorage.get('jstorage', 'empty')
		if(storage === 'empty') return
		console.log("Running database upgrade")

		var tasks = storage.tasks,
			lists = storage.lists,
			prefs = storage.prefs

		var convertDate = function(date) {
			var date = new Date(date)
			return date.getTime()
		}

		// --------------------------
		// 			>> 1.3.1
		// --------------------------

		// Check tasks for timestamps
		for(var id in tasks) {
			if (id !== 'length' && !tasks[id].hasOwnProperty('deleted')) {
				var _this = tasks[id]
				// Check task has time object
				if (!_this.hasOwnProperty('time')) {
					_this.time = {
						content: 0,
						priority: 0,
						date: 0,
						notes: 0,
						today: 0,
						showInToday: 0,
						list: 0,
						logged: 0
					}
				}
				// Check task has sync status
				if (!_this.hasOwnProperty('synced')) {
					_this.synced = false
				}
				// Make sure list is a number
				if(typeof _this.list === 'string') _this.list = _this.list.toNum()
			}
		}
		// Check lists for timestamps
		for(var id in lists.items) {
			if (id !== 'length' && id !== '0') {
				var _this = lists.items[id]
				// Check if list has been deleted
				if (!_this.hasOwnProperty('deleted')) {
					// Check list has time object
					if (!_this.hasOwnProperty('time') || typeof(_this.time) === 'number') {					
						// Add or reset time object
						_this.time = {
							name: 0,
							order: 0
						}				
					}
					if (id !== 'today' && id !== 'next' && id !== 'someday') {
						// Check list has synced status
						if (!_this.hasOwnProperty('synced')) {				
							_this.synced = 'false';
						}
					}
					// Convert everything to numbers
					for  (var x = 0; x < _this.order.length; x++) {
						if(typeof _this.order[x] === 'string') {
							_this.order[x] = _this.order[x].toNum();
						}
					}
				}					
			}
		}
		// Make sure all lists exist
		for(var id = 1; id < lists.items.length; id++) {
			if(!lists.items.hasOwnProperty(id)) {
				lists.items[id] = {
					deleted: 0
				}
			}
		}
		//Check someday list
		if (lists.items.someday) {
			//Create Someday List
			var id = lists.items.length
			lists.items[id] = $.extend(true, {}, lists.items.someday)
			lists.items.length++
			lists.order.push(id)
			delete lists.items.someday
			// Update task.list
			for (var i = lists.items[id].order.length - 1; i >= 0; i--) {
				var _this  = lists.items[id].order[i]
				_this.list = id
			}
		}
		//Check for scheduled
		if (!lists.scheduled) {
			lists.scheduled = {length: 0}
		}
		// Check preferences exist. If not, set to default
		lists.time          = prefs.time   				|| 0
		prefs.sync 			= prefs.sync 				|| {}
		prefs.sync.interval = prefs.sync.interval  		|| 'manual'
		prefs.sync.active   = prefs.sync.active    		|| true
		prefs.sync.url      = prefs.sync.url       		|| 'http://app.nitrotasks.com'
		prefs.sync.timer    = prefs.sync.timer     		|| 120000
		prefs.lang          = prefs.lang           		|| 'english'
		prefs.bg            = prefs.bg             		|| {}
		prefs.bg.color      = prefs.bg.color       		|| ''
		prefs.bg.size       = prefs.bg.size        		|| 'tile'

		// --------------------------
		// 			LISTS
		// --------------------------

		// Fix up List 0
		lists.items[0] = {deleted: 0}

		// Add in logbook
		lists.items.logbook = {
			order: [],
			time: {
				order: 0
			}
		}

		lists.items.scheduled = {
			order: [],
			time: {
				order: 0
			}
		}

		// Fix Next list
		for (var i = lists.items.next.order.length - 1; i >= 0; i--) {
			var id = lists.items.next.order[i],
				_this = tasks[id]
			if(_this.list !== 'next') {
				lists.items.next.order.splice(i, 1)
			}
		};

		// Move scheduled tasks
		for (var key in lists.scheduled) {
			if(key !== 'length') {
				var _this = lists.scheduled[key],
					id = tasks.length
				console.log(_this, id)
				tasks[id] = $.extend(true, {}, _this)
				_this = tasks[id]
				_this.tags = []
				if(_this.priority === 'important') _this.priority = 'high'
				if(_this.next) _this.next = convertDate(_this.next)
				if(_this.ends) _this.ends = convertDate(_this.ends)

				lists.items.scheduled.order.push(id)
				tasks.length++
			}
		}

		delete lists.scheduled


		// --------------------------
		// 			TASKS
		// --------------------------

		for(var key in tasks) {

			if(key != 'length') {

				var _this = tasks[key]

				// Remove old properties
				delete _this.showInToday
				delete _this.today
				if(_this.hasOwnProperty('time')) {
					delete _this.time.showInToday
					delete _this.time.today
				}

				// Important -> High
				if(_this.priority === 'important') _this.priority = 'high'

				// Updated logged propety
				if(_this.logged === "true" || _this.logged === true) {
					_this.logged === core.timestamp()
					_this.list = 'logbook'
					lists.items.logbook.order.push(key)
				}

				// Add tags
				_this.tags = []

				// Update date property
				if(_this.date !== "" && _this.hasOwnProperty('date')) {
					_this.date = convertDate(_this.date)
				}

			}

		}


		// --------------------------
		// 			PREFS
		// --------------------------

		// Add in listSort
		prefs.listSort = {}

		localStorage.removeItem('jstorage')
		core.storage.tasks = tasks
		core.storage.lists = lists
		core.storage.prefs = prefs
		core.storage.save()

	}
// })
