var socketIOAddress = 'http://gris-groupware.uninova.pt'
var restAddress = 'data/';

//For IE and Android
String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

//For IE and Android
String.prototype.startsWith = function(suffix) {
	return this.indexOf(suffix) === 0;
};


$(function() {
	if ($(window).width() >= 800) {
		$('#arrow').hide();
	}
});



function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}


$(window).resize(function() {

	if ($(window).width() < 800) {
		if (toClosePane) {
			closePane();
			$('#arrow').show();
		}
	} else {
		openPane();
		$('#arrow').hide();
		toClosePane = true;
	}
});


function hover(e) {
	var imgUrl = $(e).attr("src");
	$(e).attr("src", imgUrl.substring(0, imgUrl.length - 4) + "Over.png");
}

function unhover(e) {
	var imgUrl = $(e).attr("src");
	$(e).attr("src", imgUrl.substring(0, imgUrl.length - 8) + ".png");
}

// CHANGE THE INITIAL SEED HERE
Math.seed = 0;

/**
 * Math.seededRandom()
 * 
 */
Math.seededRandom = function(max, min) {
	max = max || 1;
	min = min || 0;

	Math.seed = (Math.seed * 9301 + 49297) % 233280;
	var rnd = Math.seed / 233280.0;

	return min + rnd * (max - min);
}

function closePane() {
	toClosePane = true;
	var imgUrl = $('#arrow').attr("src");
	$('#wrapper').css('paddingLeft', 0);
	$('#arrow').css('left', 5);
	$('#sidebar-wrapper').css("width", 0);
	$('#arrow').attr("src", imgUrl.replace("left", "right"));
	setTimeout(function() {
		scrGraph.adjustGraph();
		scrGraph.adjustHeatMap();
	}, 1000);
}

function openPane() {
	toClosePane = false;
	var imgUrl = $('#arrow').attr("src");
	$('#wrapper').css('paddingLeft', 290);
	$('#arrow').css('left', 255);
	$('#sidebar-wrapper').css("width", 290);
	$('#arrow').attr("src", imgUrl.replace("right", "left"));
	setTimeout(function() {
		scrGraph.adjustGraph();
		scrGraph.adjustHeatMap();
	}, 1000);
}

function hex(c) {
	var s = "0123456789abcdef";
	var i = parseInt(c);
	if (i == 0 || isNaN(c))
		return "00";
	i = Math.round(Math.min(Math.max(0, i), 255));
	return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
	return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) {
	return (s.charAt(0) == '#') ? s.substring(1, 7) : s
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
	var color = [];
	color[0] = parseInt((trim(hex)).substring(0, 2), 16);
	color[1] = parseInt((trim(hex)).substring(2, 4), 16);
	color[2] = parseInt((trim(hex)).substring(4, 6), 16);
	return color;
}

function generateColor(colorStart, colorEnd, colorCount) {

	// The beginning of your gradient
	var start = convertToRGB(colorStart);

	// The end of your gradient
	var end = convertToRGB(colorEnd);

	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;

	var saida = [];
	for (i = 0; i < len; i++) {
		var factor = -4;
		var a = 1 / (Math.exp(factor) - 1);
		var c = [];
		alpha += (1.0 / len);
		var y = a * (Math.exp(factor * alpha) - 1);
		c[0] = start[0] * y + (1 - y) * end[0];
		c[1] = start[1] * y + (1 - y) * end[1];
		c[2] = start[2] * y + (1 - y) * end[2];

		saida.push('#' + convertToHex(c));

	}

	return saida.reverse();

}

function countProperties(obj) {
	var count = 0;

	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
}

function changePane(e) {
	var imgUrl = $(e).attr("src");
	if (imgUrl.indexOf("right") > 0) {
		openPane();
	} else {
		closePane();
	}
}

function showScreen(show) {
	$('#page-content-wrapper').css('visibility', show ? 'visible' : 'hidden');
	$('.screen').css('visibility', show ? 'visible' : 'hidden');

}

function removeElement(delId) {
	if (newParentId == delId) {
		newParentId = null;
		activeScreen.closeScreen();
	}
	if (!screen1.checkConstraints(delId)) {
		$('html').block({
			'message': null
		});
		var kpi = {};
		for (var i = 0; i < kpiInfo.length; i++) {
			if (kpiInfo[i].id == delId) {
				kpi = kpiInfo[i];
				break;
			}
		}
		var formulaId = "";
		for (var i = 0; i < kpiFormulas.length; i++) {
			if (kpiFormulas[i].kpi_id == delId) {
				formulaId = kpiFormulas[i].id;
				break;
			}
		}
		$.ajax({
			url: restAddress + 'proasense_hella/kpi_formula',
			type: 'POST',
			data: '{"type":"DELETE","data":[{"id":' + formulaId + '}]}',
			success: function(result) {

				if (result.succeeded) {
					$.ajax({
						url: restAddress + 'proasense_hella/kpi',
						type: 'POST',
						data: '{"type":"DELETE","data":[{"id":' + delId + '}]}',
						success: function(result) {
							$('html').unblock();
							if (result.succeeded) {
								var tree = $('#KPITree').jstree();
								$.notify('Kpi deleted', 'success');
								$('#kpiList option[value=' + delId + ']').remove();
								if (loadedKpi == delId) {
									activeScreen.closeScreen();
								}
								var children = tree.get_node(delId).children;
								tree.delete_node(delId);
								var parentId = kpi.parent_id;
								var parentKpi = null;
								if (parentId != null) {
									for (var i = 0; i < kpiInfo.length; i++) {
										if (kpiInfo[i].id == parentId) {
											parentKpi = kpiInfo[i];
											break;
										}
									}

									for (var i = 0; i < parentKpi.children.length; i++) {
										if (parentKpi.children[i].id == delId) {
											parentKpi.children.splice(i, 1);
											break;
										}
									}

								}
								for (var i = 0; i < kpiInfo.length; i++) {
									if (children.indexOf(kpiInfo[i].id.toString()) > -1) {
										kpiInfo[i].parent_id = parentId;
									}
									if (kpiInfo[i].id == delId) {
										kpiInfo.splice(i, 1);
										i--;
									}
								}
								var tmpKpiInfo = cloneKpis(kpiInfo);
								for (var i = 0; i < kpiInfo.length; i++) {
									if (children.indexOf(kpiInfo[i].id.toString()) > -1) {
										tree.create_node(parentId, tmpKpiInfo[i]);
										if (parentKpi != null) {
											parentKpi.children.push(kpiInfo[i]);
										}
									}
								}
								screen1.loadKpis();
								for (var i = 0; i < children.length; i++) {
									$.ajax({
										url: restAddress + 'proasense_hella/kpi',
										type: 'POST',
										data: '{"type":"UPDATE","data":{"id":' + children[i] + ',"parent_id":' + parentId + '}}',
										success: function(result) {

										}
									});
								}
							} else {
								$.notify('Error deleting KPI');
							}

						}
					})
					for (var i = 0; i < kpiFormulas.length; i++) {
						if (kpiFormulas[i].kpi_id == delId) {
							kpiFormulas.splice(i, 1);
							break;
						}
					}
				} else {
					$('html').unblock();
					$.notify('Error deleting formula');
				}


			}
		});
	} else {
		$.notify('Violation of foreign key constraint');
	}
}
