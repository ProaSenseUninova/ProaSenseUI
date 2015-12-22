function openKPI() {
	scrQuery.closeScreen();
	$('.headerSelector').find('a').eq(0).attr('class', 'selected');
	$('.headerSelector').find('a').eq(1).attr('class', 'notSelected');
	$('.headerSelector').find('a').eq(2).attr('class', 'notSelected');
	var isScrHidden = $('.screen').css('visibility') == "hidden";
	activeScreen = screen1;
	if (!isScrHidden) {
		activeScreen.openScreen();
	}
}

function openTarget() {
	scrQuery.closeScreen();
	$('.headerSelector').find('a').eq(0).attr('class', 'notSelected');
	$('.headerSelector').find('a').eq(1).attr('class', 'selected');
	$('.headerSelector').find('a').eq(2).attr('class', 'notSelected');
	var isScrHidden = $('.screen').css('visibility') == "hidden";
	activeScreen = screen2;
	//if(!isScrHidden)
	//{
	activeScreen.openScreen();
	//}
}

function openQuery() {
	$('.headerSelector').find('a').eq(0).attr('class', 'notSelected');
	$('.headerSelector').find('a').eq(1).attr('class', 'notSelected');
	$('.headerSelector').find('a').eq(2).attr('class', 'selected');
	scrQuery.openScreen();

}


function Screen1(elInfo) {
	this.elInfo = elInfo

	var scr = this;

	$.get("inc/screen1.inc", function(content) {
		scr.content = content;
	});

	this.saveBtn = function() {
		this.saveLoadedElement();
	}


	this.cancelBtn = function() {
		this.closeScreen();
	}

	this.selectBoxes = function(e) {
		$('.elRow').css('display', 'none');
		$('.elAggRow').css('display', 'none');
		if ($('#calculationType').val() == 'aggregate' && $('#kpiSensor1').val() != null) {
			$('.elAggRow').css('display', 'table-row');
		} else if ($('#calculationType').val() == 'composed' && ($('#kpiSensor2').val() != null || $('#kpiSensor3').val() != null || $('#kpiSensor4').val() != null)) {
			$('.elRow').css('display', 'table-row');
		}
		$('.kpi').css('display', 'none');
		$('.simple').css('display', 'none');
		$('.aggregate').css('display', 'none');
		$('.composed').css('display', 'none')
		$('.' + e.currentTarget.value).css('display', 'table-row');
	}
	this.kpiSensor1 = function() {
		$('.elAggRow').css('display', 'table-row');
		if ($('#kpiSensor1').val() == 'sensor') {
			$('#selectSensor2').css('display', 'inline-block');
			$('#selectKpi1').css('display', 'none');
		} else {
			$('#selectSensor2').css('display', 'none');
			$('#selectKpi1').css('display', 'inline-block');
		}
	}
	this.kpiSensor = function() {
		$('.elRow').css('display', 'table-row');
		var kpiSensors = $('.kpiSensor');
		for (var i = 0; i < kpiSensors.length; i++) {
			if (kpiSensors.eq(i).val() == 'sensor') {
				$('.sensorChoice').eq(i).css('display', 'inline-block');
				$('.kpiChoice').eq(i).css('display', 'none');
			} else if (kpiSensors.eq(i).val() == 'kpi') {
				$('.kpiChoice').eq(i).css('display', 'inline-block');
				$('.sensorChoice').eq(i).css('display', 'none');
			}
		}
	}
	this.loadSensors = function() {
		var tmpVal = [];
		for (var i = 0; i < $('.sensorBox').length; i++) {
			tmpVal.push($('.sensorBox').eq(i).val());
		}
		$('.sensorBox').find('option:gt(0)').remove();
		for (var i = 0; i < sensors.length; i++) {
			$('.sensorBox').append('<option value=' + sensors[i].id + '>' + sensors[i].name + '</option>');
		}
		for (var i = 0; i < $('.sensorBox').length; i++) {
			$('.sensorBox').eq(i).val(tmpVal[i]);
		}
	}
	this.loadKpis = function() {
		var tmpVal = [];
		for (var i = 0; i < $('.kpiBox').length; i++) {
			tmpVal.push($('.kpiBox').eq(i).val());
		}
		$('.kpiBox').find('option:gt(0)').remove();
		for (var i = 0; i < this.kpiInfo.length; i++) {
			$('.kpiBox').append('<option value=' + this.kpiInfo[i].id + '>' + this.kpiInfo[i].name + '</option>');
		}
		for (var i = 0; i < $('.kpiBox').length; i++) {
			$('.kpiBox').eq(i).val(tmpVal[i]);
		}
	}

	this.checkConstraints = function(id) {
		for (var i = 0; i < kpiFormulas.length; i++) {
			if (kpiFormulas[i].kpi_id == id) {
				continue;
			}
			if (kpiFormulas[i].term1_kpi_id == id || kpiFormulas[i].term2_kpi_id == id || kpiFormulas[i].term3_kpi_id == id) {
				return true
			}
		}
		return false;
	}


	this.openScreen = function() {

		$('.content').html(this.content);
		showScreen(true);
		$('#cancelBtn').on('click', function(event) {
			scr.cancelBtn();
		});
		$('#saveBtn').on('click', function(event) {
			scr.saveBtn();
		});
		$('#calculationType').change(this.selectBoxes);
		$('.kpiSensor').change(this.kpiSensor);
		$('#kpiSensor1').change(this.kpiSensor1);
		$('#op2').change(this.thirdElement);
		this.loadSensors();
		this.loadKpis();

		$('.box').change(function(e) {
			$(e.currentTarget).css('color', 'black');
		});
		if (loadedKpi != "") {
			this.loadElData(loadedKpi)
		} else {}
	}
	this.thirdElement = function() {
		var els = $('.thEl');
		if ($('#op2').val() == 'none') {
			els.attr('disabled', true);
			els.css('color', '#808080');
		} else {

			els.attr('disabled', false);
			for (var i = 0; i < els.length; i++) {
				if (els.eq(i).val() != null) {
					els.eq(i).css('color', 'black');
				}
			}
		}
	}

	this.closeScreen = function() {
		this.changeLoadedKpi();
		showScreen(false);
		$('.content').html('');
	}

	this.updateField = function(id, value) {
		$('#' + id).val(value);
		if (value !== null) {
			$('#' + id).css('color', 'black');
		}
	}

	this.loadElData = function(elId) {
		for (var i = 0; i < this.kpiInfo.length; i++) {
			if (this.kpiInfo[i].id == elId) {
				this.changeLoadedKpi(elId);
				el = this.kpiInfo[i];
				this.updateField('name', el.name);
				this.updateField('description', el.description);

				this.updateField('calculationType', el.calculation_type);
				var kpiFormula = {};
				for (var j = 0; j < kpiFormulas.length; j++) {
					if (kpiFormulas[j].kpi_id == loadedKpi) {
						kpiFormula = kpiFormulas[j];
						break;
					}
				}
				if (el.calculation_type == 'simple') {
					this.updateField('selectSensor1', kpiFormula.term1_sensor_id);
				} else if (el.calculation_type == 'aggregate') {
					var isKpi = kpiFormula.term1_kpi_id != null;
					$('#kpiSensor1').val(isKpi ? 'kpi' : 'sensor');
					$('#kpiSensor1').css('color', 'black');
					$('#selectAggType').val(kpiFormula.operator_1);
					$('#selectAggType').css('color', 'black');
					if (isKpi) {
						$('#selectKpi1').val(kpiFormula.term1_kpi_id);
						$('#selectKpi1').css('color', 'black');
					} else {
						$('#selectSensor2').val(kpiFormula.term1_sensor_id);
						$('#selectSensor2').css('color', 'black');
					}
					this.kpiSensor1();
				} else if (el.calculation_type == 'composed') {
					var isKpi = [];
					isKpi[0] = kpiFormula.term1_kpi_id != null;
					isKpi[1] = kpiFormula.term2_kpi_id != null;
					isKpi[2] = kpiFormula.term3_kpi_id != null;
					$('#op1').val(kpiFormula.operator_1);
					$('#op1').css('color', 'black');
					$('#op2').val(kpiFormula.operator_2 == null ? 'none' : kpiFormula.operator_2);
					$('#op2').css('color', kpiFormula.operator_2 == null ? '#808080' : 'black');
					$('#kpiSensor2').val(isKpi[0] ? 'kpi' : 'sensor');
					$('#kpiSensor2').css('color', 'black');
					$('#kpiSensor3').val(isKpi[1] ? 'kpi' : 'sensor');
					$('#kpiSensor3').css('color', 'black');
					$('#kpiSensor4').val(isKpi[2] ? 'kpi' : 'sensor');
					$('#kpiSensor4').css('color', 'black');
					if (kpiFormula.operator_2 == null) {
						$('#kpiSensor4').val(null);
						$('#kpiSensor4').eq(i).css('color', '#808080');
					}
					for (var i = 0; i < isKpi.length; i++) {
						var val = "";
						if (isKpi[i]) {
							val = kpiFormula['term' + (i + 1) + '_kpi_id'];
							$('.kpiChoice').eq(i).val(val);
							$('.kpiChoice').eq(i).css('color', val == null ? '#808080' : 'black');
						} else {
							val = kpiFormula['term' + (i + 1) + '_sensor_id'];
							$('.sensorChoice').eq(i).val(kpiFormula['term' + (i + 1) + '_sensor_id']);
							$('.sensorChoice').eq(i).css('color', val == null ? '#808080' : 'black');
						}
					}
					this.thirdElement();
					this.kpiSensor();


				}


				this.updateField('samplingRate', el.sampling_rate);
				this.updateField('samplingInterval', el.sampling_interval);

				$('.kpi').css('display', 'none');
				$('.simple').css('display', 'none');
				$('.aggregate').css('display', 'none');
				$('.composed').css('display', 'none')
				$('.' + el.calculation_type).css('display', 'table-row');

				var chk = $('#contextualInformation input');
				chk[0].checked = el.context_product;
				chk[1].checked = el.context_machine;
				chk[2].checked = el.context_shift;
				chk[3].checked = el.context_mould;


				$('.' + el.calculationType).css('display', 'table-row');
				return true;
			}
		}
		return false;
	}
	this.changeLoadedKpi = function(elId) /***/ {
		var oldId = loadedKpi;
		loadedKpi = arguments.length > 0 ? elId : "";

		var tree = $("#KPITree").jstree(true);
		var toDelete = true;
		for (var i = 0; i < this.kpiInfo.length; i++) {
			if (oldId == this.kpiInfo[i].id) {
				toDelete = false;
				break;
			}
		}
		if (toDelete) {
			tree.delete_node(oldId);
			if (arguments.length > 0) {
				if (!tree.get_text(elId).endsWith('</span>')) {
					tree.edit(elId);
				}
			}
		}
	}
	this.getKpiFormula = function(kpi, kpiFormula) {
		if (kpi.calculation_type == 'simple') {
			kpiFormula.term1_sensor_id = parseInt($('#selectSensor1').val());
		} else if (kpi.calculation_type == 'aggregate') {
			if ($('#kpiSensor1').val() == 'kpi') {
				kpiFormula.term1_kpi_id = parseInt($('#selectKpi1').val());
			} else {
				kpiFormula.term1_sensor_id = parseInt($('#selectSensor2').val());
			}
			kpiFormula.operator_1 = $('#selectAggType').val();

		} else if (kpi.calculation_type == 'composed') {
			if ($('#kpiSensor2').val() == 'kpi') {
				kpiFormula.term1_kpi_id = parseInt($('#selectKpi2').val());
			} else {
				kpiFormula.term1_sensor_id = parseInt($('#selectSensor3').val());
			}
			if ($('#kpiSensor3').val() == 'kpi') {
				kpiFormula.term2_kpi_id = parseInt($('#selectKpi3').val());
			} else {
				kpiFormula.term2_sensor_id = parseInt($('#selectSensor4').val());
			}
			kpiFormula.operator_1 = $('#op1').val();
			if ($('#op2').val() != 'none') {
				kpiFormula.operator_2 = $('#op2').val();
				if ($('#kpiSensor4').val() == 'kpi') {
					kpiFormula.term3_kpi_id = parseInt($('#selectKpi4').val());
				} else {
					kpiFormula.term3_sensor_id = parseInt($('#selectSensor5').val());
				}
			}
		}
		return kpiFormula;
	}
	this.saveLoadedElement = function() {
		var kpi = {};
		var kpiFormula = {};
		var kpiIndex = "";
		var kpiFormulaIndex = "";
		var kpiFormulaId = "";
		if (loadedKpi != "") {

			for (var i = 0; i < kpiInfo.length; i++) {
				if (kpiInfo[i].id == loadedKpi) {
					kpi = jQuery.extend({}, kpiInfo[i]);
					kpiIndex = i;
					break;
				}
			}
			for (var i = 0; i < kpiFormulas.length; i++) {
				if (kpiFormulas[i].kpi_id == loadedKpi) {
					kpiFormulaId = kpiFormulas[i].id;
					kpiFormulaIndex = i;
					break;
				}
			}

			kpiFormula.id = kpiFormulaId;
			kpiFormula.kpi_id = parseInt(loadedKpi);
			kpiFormula.term1_kpi_id = null;
			kpiFormula.term1_sensor_id = null;
			kpiFormula.operator_1 = null;
			kpiFormula.term2_kpi_id = null;
			kpiFormula.term2_sensor_id = null;
			kpiFormula.operator_2 = null;
			kpiFormula.term3_kpi_id = null;
			kpiFormula.term3_sensor_id = null;
			kpiFormula.criteria = null;

			kpi.name = $('#name').val();
			kpi.text = $('#name').val() + delEditBtn;
			kpi.description = $('#description').val();
			kpi.calculation_type = $('#calculationType').val();
			kpi.sampling_rate = parseInt($('#samplingRate').val());
			kpi.sampling_interval = $('#samplingInterval').val();
			var context = $('#contextualInformation :input');
			for (var i = 0; i < context.length; i++) {
				kpi[context[i].value] = context[i].checked;
			}
			kpiFormula = this.getKpiFormula(kpi, kpiFormula);
			$('html').block({
				'message': null
			});
			$.ajax({
				url: restAddress + 'proasense_hella/kpi_formula',
				type: 'POST',
				data: '{"type":"UPDATE","data":' + JSON.stringify(kpiFormula) + '}',
				success: function(result) {

					if (result.succeeded) {
						var tmpObj = jQuery.extend({}, kpi);
						delete tmpObj.parent_id;
						delete tmpObj.text;
						delete tmpObj.children;
						$.ajax({
							url: restAddress + 'proasense_hella/kpi',
							type: 'POST',
							data: '{"type":"UPDATE","data":' + JSON.stringify(tmpObj) + '}',
							success: function(result) {
								$('html').unblock();

								if (result.succeeded) {
									$.notify('KPI updated', 'success');
									kpiInfo[kpiIndex] = kpi;
									kpiFormulas[kpiFormulaIndex] = kpiFormula;
									$('#KPITree').jstree().rename_node(kpi.id, kpi.text);
									activeScreen.closeScreen();
								} else {
									$.notify('KPI update failed');
								}
							}
						});
					} else {
						$('html').unblock();
						$.notify('Formula update failed');
					}
				}
			});

		} else {
			if ($('#calculationType').val() != null && $('#samplingInterval').val() != null && $('#name').val() != "" && $('#description').val() != "") {
				var newKpi = {};
				var newKpiFormula = {};
				newKpiFormula.term1_sensor_id = null;
				newKpiFormula.operator_1 = null;
				newKpiFormula.term2_kpi_id = null;
				newKpiFormula.term2_sensor_id = null;
				newKpiFormula.operator_2 = null;
				newKpiFormula.term3_kpi_id = null;
				newKpiFormula.term3_sensor_id = null;
				newKpiFormula.criteria = null;

				newKpi.parent_id = newParentId;
				newKpi.name = $('#name').val();
				newKpi.description = $('#description').val();
				var samplingRate = parseInt($('#samplingRate').val());
				newKpi.sampling_rate = isNaN(samplingRate) ? 0 : samplingRate;
				newKpi.sampling_interval = $('#samplingInterval').val();
				var chk = $('#contextualInformation input');
				newKpi.context_product = chk[0].checked;
				newKpi.context_machine = chk[1].checked;
				newKpi.context_shift = chk[2].checked;
				newKpi.context_mould = chk[3].checked;
				newKpi.calculation_type = $('#calculationType').val();
				newKpiFormula = this.getKpiFormula(newKpi, newKpiFormula);

				$('html').block({
					'message': null
				});
				$.ajax({
					url: restAddress + 'proasense_hella/kpi',
					type: 'POST',
					data: '{"type":"INSERT","data":[' + JSON.stringify(newKpi) + ']}',
					success: function(result) {

						if (result.succeeded) {

							newKpiFormula.kpi_id = result.insertId[0];
							newKpi.id = result.insertId[0];
							$.ajax({
								url: restAddress + 'proasense_hella/kpi_formula',
								type: 'POST',
								data: '{"type":"INSERT","data":[' + JSON.stringify(newKpiFormula) + ']}',
								success: function(result) {
									$('html').unblock();
									if (result.succeeded) {
										$.notify('KPI added', 'success');
										newKpi.children = [];
										for (var i = 0; i < kpiInfo.length; i++) {
											if (kpiInfo[i].id == newParentId) {
												kpiInfo[i].children.push(newKpi);
												break;
											}
										}
										newKpiFormula.id = result.insertId[0];
										kpiInfo.push(newKpi);
										kpiFormulas.push(newKpiFormula);
										newKpi.text = newKpi.name + delEditBtn;
										$('#KPITree').jstree().create_node(newParentId, jQuery.extend({}, newKpi));
										screen1.closeScreen();
									} else {
										$.notify('Error adding formula');
									}
								}
							});
						} else {
							$('html').unblock();
							$.notify('Error adding kpi');
						}
					}
				});

			} else {
				$.notify('Please fill all the boxes', 'info');
			}
		}
	}
}

function Screen2(kpiInfo) {
	this.kpiInfo = kpiInfo;

	var scr = this;

	$.get('inc/screen2.inc', function(content) {
		scr.content = content;
	});

	this.openScreen = function() {
		if (loadedKpi != "") {
			$('.content').html(this.content);
			$('#cancelBtn').on('click', function(event) {
				scr.cancelBtn();
			});
			$('#addTargetBtn').on('click', function(event) {
				scr.addTargetBtn();
			});
			this.loadElData(loadedKpi)
			showScreen(true);
		}

	}

	this.loadElData = function(elId) {
		for (var i = 0; i < this.kpiInfo.length; i++) {
			if (this.kpiInfo[i].id == elId) {
				this.changeLoadedKpi(elId);
				el = this.kpiInfo[i];
				var titleRow = '<tr bgcolor="#cccccc">'
				var firstRow = '<tr bgcolor="#cccccc">'
				var listRow = '';
				var listCol1 = '';
				var listCol2 = '';

				var contexts = ['context_product', 'context_machine', 'context_shift', 'context_mould'];

				var options = '';
				for (var j = 0; j < $('#contextualInformation input').length; j++) {
					var chk = $('#contextualInformation input')[j];
					options = '<option value=null>All '+chk.name+'s</option>';
					chk.checked = el[contexts[j]];
					if (chk.checked) {
						firstRow = firstRow + '<td>' + chk.name + '</td>';
						var tmpVect = eval(chk.value.split('_')[0] + 's');
						for (var k = 0; k < tmpVect.length; k++) {
							options = options + '<option value=' + tmpVect[k].id + '>' + tmpVect[k].name + '</option>';
						}
						listRow = listRow + '<tr><td width="300px">' + chk.name + '</td><td><select data-value="' + chk.value + '">' + options + '</select></td></tr>';
					}
				}
				options = '';
				
				$('#targetList').append(listRow);
				titleRow=titleRow+'<td colspan=7 style="text-align:center"><b>'+el.name+'</b></td>'
				firstRow = firstRow + '<td>Lower bound</td><td colspan=2>Upper bound</td></tr>';
				$('#targetTable').append(titleRow);
				$('#targetTable').append(firstRow);
				var toAppend = '';

				for (var j = 0; j < kpiTargets.length; j++) {
					if (kpiTargets[j].kpi_id != el.id) {
						continue;
					}
					toAppend = '<tr id=' + kpiTargets[j].id + '>';
					var chk = $('#contextualInformation input:checked');
					for (var k = 0; k < chk.length; k++) 
					{
						if(kpiTargets[j][chk[k].value]==null)
						{
							toAppend = toAppend + '<td>All '+ chk[k].name.split(' ')[0]+'s</td>';
						}
						else
						{
							toAppend = toAppend + '<td>' + eval('get' + chk[k].name.split(' ')[0] + '(' + kpiTargets[j][chk[k].value] + ').name'); + '</td>';
						}
					}
					toAppend = toAppend + '<td>' + kpiTargets[j].lower_bound + '</td><td>' + kpiTargets[j].upper_bound + '</td>';
					toAppend = toAppend + '<td width="25px" data-id=' + kpiTargets[j].id + ' style="cursor:pointer" align="center" title="Delete element" ><span class="glyphicon glyphicon-minus" style="color:#333333" aria-hidden="true"></span></td></tr>';
					$('#targetTable').append(toAppend);
					var scr = this;
					$('#targetTable').find('tr:last').find('td:last').click(function(e) {
						scr.delTargetInfo(e.currentTarget);
					})
				}

				return true;
			}
		}
		return false;
	}

	this.saveLoadedElement = function() {
		var id = this.loadedKpi;
		if (id != "") {
			var query = '[{';
			var selectBoxes = $('select');
			for (var j = 0; j < selectBoxes.length; j++) {
				query = query + '"' + selectBoxes.eq(j).attr('data-value') + '":' + selectBoxes.eq(j).find('option:selected').val() + ',';
			}
			query = query + '"kpi_id":' + loadedKpi + ',"upper_bound":"' + $('#upperBoundBox').val() + '","lower_bound":"' + $('#lowerBoundBox').val() + '"}]';
			$('html').block({
				'message': null
			});
			$.ajax({
				url: restAddress + 'proasense_hella/kpi_target',
				type: 'POST',
				data: '{"type":"INSERT","data":' + query + '}',
				success: function(response) {
					$('html').unblock();
					if (response.succeeded) {
						var newTgId = response.insertId[0];
						var newTgObj = JSON.parse(query)[0];
						newTgObj.id = newTgId;
						if (newTgObj.lower_bound == "") {
							newTgObj.lower_bound = 0;
						}
						if (newTgObj.upper_bound == "") {
							newTgObj.upper_bound = 0;
						}
						kpiTargets.push(newTgObj);
						var rows = $('#targetList').find('tr');
						var toAppend = '<tr>'
						var targetInfoEl = {}
						var kpiTargetBoxVal = $('#kpiTargetBox').val()
						var upperBoundBox = $('#upperBoundBox').val()
						var lowerBoundBox = $('#lowerBoundBox').val()

						for (var j = 0; j < rows.length ; j++) {
							toAppend = toAppend + '<td>' + rows.eq(j).find('select option:selected').text() + '</td>';
						}
						toAppend = toAppend + '<td>'+ (lowerBoundBox == '' ? 0 : lowerBoundBox) + '</td><td>' + (upperBoundBox == '' ? 0 : upperBoundBox) +  '</td><td width="25px" data-id=' + newTgId + ' style="cursor:pointer" align="center" title="Delete element" ><span class="glyphicon glyphicon-minus" style="color:#333333" aria-hidden="true"></span></td></tr>';
						$('#targetTable').append(toAppend);



						$('#targetTable').find('tr:last').find('td:last').click(function(e) {
							scr.delTargetInfo(e.currentTarget);
						})
						$.notify('New target added', 'success');
					} else {
						$.notify("Violation of primary key constraint.");
					}

				}
			});



		}
	}
	this.delTargetInfo = function(element) {
		var id = element.dataset.id
		$('html').block({
			'message': null
		});
		$.ajax({
			url: restAddress + 'proasense_hella/kpi_target',
			type: 'POST',
			data: '{"type":"DELETE","data":[{"id":' + id + '}]}',
			success: function(response) {
				$('html').unblock();
				if (response.succeeded) {
					$.notify('Target deleted', 'success');
					element.parentElement.remove();
					for (i = 0; i < kpiTargets.length; i++) {
						if (kpiTargets[i].id == id) {
							kpiTargets.splice(i, 1);
							break;
						}
					}
				} else {
					$.notify('Error deleting target');
				}
			}
		});


	}
	this.closeScreen = function() {
		this.changeLoadedKpi();
		showScreen(false);
		$('.content').html('');
	}
	this.cancelBtn = function() {
		this.closeScreen();
	}
	this.addTargetBtn = function() {
		this.saveLoadedElement();
	}

	this.changeLoadedKpi = function(elId) {
		var oldId = loadedKpi;
		loadedKpi = arguments.length > 0 ? elId : "";
		var tree = $("#KPITree").jstree(true);
		var toDelete = true;
		for (var i = 0; i < this.kpiInfo.length; i++) {
			if (oldId == this.kpiInfo[i].id) {
				toDelete = false;
				break;
			}
		}
		if (toDelete) {
			tree.delete_node(oldId);
			if (arguments.length > 0) {
				if (!tree.get_text(elId).endsWith('</span>')) {
					tree.edit(elId);
				}
			}
		}
	}


}


function ScreenGraph(kpiInfo) {
	this.testGraphData = JSON.parse('{"data":[' + '[3,4,1,6,4,8,null,8,6,3],' + '[7,3,9,2,4,5,9,3,4,5],' + '[2,5,6,2,14,6,7,6,3,9]],' + '"subTitle":"Source: use case data",' + '"legend":["A","B","C"],' + '"title":"Availability",' + '"labels":["December","January","February","March","April","May"]}');
	this.kpiInfo = kpiInfo;
	var scr = this;
	$.get('inc/screengraph.inc', function(content) {
		scr.content = content;
	});

	this.getRandomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.seededRandom(16, 0))];
		}
		return color;
	}
	this.adjustGraph = function() {
		var chart = $('#chart')
		if (chart.length > 0) {
			chart.find('svg').attr('width', 0);
			if (chart.chart('config') !== false) {
				chart.chart();
				chart.find('svg').attr('width', 400);
				chart.chart('config').features.legend.x = chart.width() - 100;
				chart.chart();
				var series = $.elycharts.templates['line_basic_1'].series;
				var len = this.graphData.data.length;
				var objs = chart.find('[fill="none"]');
				for (var i = 0; i < len; i++) {
					var color = series['serie' + (i + 1)].color;
					objs.eq(i + objs.length - len).attr('fill', color);
				}
			}
		}
	}
	this.adjustHeatMap = function() {
		var heatMap = $('#heatMap');
		if (heatMap.length > 0) {
			this.initializeHeatMap(this.heatMapData);
		}
	}

	$(window).resize(function() {
		scrGraph.adjustGraph();
		scrGraph.adjustHeatMap();

	});

	this.startYear=null;

	this.graphContextualInformation="Global";

	this.graphGranularity = "monthly"

	this.updateGraph = function() {
		this.graphContextualInformation = $('#graphTable').find('input:checked').val();
		this.graphGranularity=$('#granularityChart').val();
		var graphStartTime = $('#fromDateChart').handleDtpicker('getDate').getTime();
		this.startYear=(new Date(graphStartTime)).getFullYear();
		var graphEndTime = $('#toDateChart').handleDtpicker('getDate').getTime();
		var graphGranularity = $('#granularityChart').val();
		//scr.initializeGraph(this.testGraphData);
		$.ajax({
			url: restAddress + "func/getGraphData?kpiId=" + loadedKpi + "&contextualInformation=" + this.graphContextualInformation + "&startTime=" + graphStartTime + "&endTime=" + graphEndTime + "&granularity=" + graphGranularity,
			type: "GET",
			success: function(graphData) {
				scr.initializeGraph(graphData);
			},
		});
	}
	this.updateHeatMap = function(startDate,endDate,legend) {
		var graphRadioValue = $('#heatMapTable').find('input:checked').val();
		var horizontalSet = $('#horizontalSet').val();
		var verticalSet = $('#verticalSet').val();
		var heatMapStartTime = startDate!==undefined?startDate:$('#fromDateHeatMap').handleDtpicker('getDate').getTime();
		var heatMapEndTime = endDate!==undefined?endDate:$('#toDateHeatMap').handleDtpicker('getDate').getTime();
		var contextName = legend!==undefined?legend:'Global';
		var heatMapGranularity = legend!==undefined?$('#granularityChart').val():$('#granularityHeatMap').val()
		$.ajax({
			url: restAddress + "func/getHeatMapData?kpiId=" + loadedKpi +"&contextualInformation="+scr.graphContextualInformation+ "&varX="+horizontalSet+"&varY="+verticalSet+ "&startTime=" + heatMapStartTime + "&endTime=" + heatMapEndTime + "&granularity=" + heatMapGranularity+"&contextName="+contextName,
			type: "GET",
			success: function(heatMapData) {
				scr.initializeHeatMap(heatMapData)
			}
		});
	}
	this.connect = function() {
		if (this.socket !== undefined) {
			this.socket.disconnect();
		}
		this.socket = io(socketIOAddress, {
			'force new connection': true,
			'transports': ['polling']
		});
		this.socket.on('message', function(data) {
			var KPIName = "";
			var KPIRecName = data.kpi === undefined ? "" : data.kpi;
			for (var i = 0; i < scr.kpiInfo.length; i++) {
				if (scr.kpiInfo[i].id == loadedKpi) {
					KPIName = scr.kpiInfo[i].name;
					break;
				}
			}
			if (KPIName == KPIRecName) {
				scr.totalUnits(data.totalUnits);
				scr.scrapRate(data.scrapRate);
				scr.oee(data.oee);
			}

		});
	}

	this.disconnect = function() {
		if (this.socket !== undefined) {
			this.socket.disconnect();
		}
	}

	this.liveSample = function() {

		setInterval(function() {
			scr.scrapRate(parseInt(Math.random() * 100 + 0.5))
			scr.oee(parseInt(Math.random() * 100 + 0.5))
			scr.totalUnits(parseInt(Math.random() * 20 + 0.5))
		}, 1000)
	}

	this.totalUnits = function(val) {
		if (arguments.length == 0) {
			return parseFloat($('#totalUnits').text());
		} else if (val !== '' && !isNaN(val) && $('#totalUnits').length > 0) {
			$('#totalUnits').text(eval(val));
		}
	}

	this.scrapRate = function(val) {
		if (arguments.length == 0) {
			return parseFloat(this.gage.txtValue[0].textContent)
		} else if (val !== '' && !isNaN(val) && this.gage !== undefined) {
			this.gage.refresh(eval(val));
		}
	}

	this.oee = function(val) {
		if (arguments.length == 0) {
			return parseFloat($('.progress-bar').text());
		} else if (val !== '' && !isNaN(val) && $('.progress-bar').length > 0) {
			$('.progress-bar').text(eval(val) + "%")
			$('.progress-bar').css('width', eval(val) + '%').attr('aria-valuenow', eval(val));
		}
	}



	this.openScreen = function(id) {
		$('.content').html(this.content);
		this.graphContextualInformation="Global";
		this.graphGranularity = "monthly";
		var radiosGraph = $('#graphTable').find('td').slice(1, 5);
		var verticalSet = $('#verticalSet');
		var horizontalSet = $('#horizontalSet');
		if (arguments.length > 0) {
			for (var i = 0; i < this.kpiInfo.length; i++) {
				if (this.kpiInfo[i].id == id) {
					var element = this.kpiInfo[i];
					for (var j = 0; j < 4; j++) {
						var contains = element[radiosGraph.eq(j).attr('data-cInfo')];
						radiosGraph.eq(j).attr('hidden', !contains);
						verticalSet.find('option').eq(j).attr('hidden', !contains);
						horizontalSet.find('option').eq(j).attr('hidden', !contains);
					}
					if(verticalSet.find('option').eq(2).attr('hidden'))
					{
						var tmpObj=verticalSet.find('option[hidden!=hidden]');
						if(tmpObj.length>0)
						{
							tmpObj.eq(0).attr('selected',true);
						}
						else
						{
							verticalSet.val(null);
						}
					}
					if(horizontalSet.find('option').eq(1).attr('hidden'))
					{
						var tmpObj=horizontalSet.find('option[hidden!=hidden]');
						if(tmpObj.length>0)
						{
							tmpObj.eq(0).attr('selected',true);
						}
						else
						{
							horizontalSet.val(null);
						}
					}
					break;
				}
			}
		}
		

		
		var graphContextualInformation = $('#graphTable').find('input:checked').val();

		var graphStartTime = (new Date(2014, 11, 31)).getTime();
		this.startYear=(new Date(graphStartTime)).getFullYear();
		var graphEndTime = (new Date(2015, 4, 31)).getTime();
		var graphGranularity = $('#granularityChart').val();
		$('#graphButton').on('click', function(event) {
			scr.updateGraph();
		});
		$('#heatMapButton').on('click', function(event) {
			scr.updateHeatMap();
		});
		//this.initializeGraph(this.testGraphData,true);
		$.ajax({
			url: restAddress + "func/getGraphData?kpiId=" + loadedKpi + "&contextualInformation=" + graphContextualInformation + "&granularity=" + graphGranularity + "&startTime=" + graphStartTime + "&endTime=" + graphEndTime,
			type: "GET",
			success: function(graphData) {
				scr.initializeGraph(graphData);
			},
		});
		var graphRadioValue = $('#heatMapTable').find('input:checked').val();
		var horizontalSet = $('#horizontalSet').val();
		var verticalSet = $('#verticalSet').val();
		var heatMapStartTime = (new Date()).getTime() - 3 * 30 * 24 * 60 * 60 * 1000; //3 Months ago
		var heatMapEndTime = (new Date()).getTime()
		var heatMapGranularity = $('#granularityHeatMap').val()
		$.ajax({
			url: restAddress + "func/getHeatMapData?kpiId=" + loadedKpi + "&contextualInformation=" + graphContextualInformation + "&varX="+horizontalSet+ "&varY="+verticalSet+"&startTime=" + heatMapStartTime + "&endTime=" + heatMapEndTime + "&granularity=" + heatMapGranularity+"&contextName=Global",
			type: "GET",
			success: function(heatMapData) {
				scr.initializeHeatMap(heatMapData)
			}
		});


		this.gage = new JustGage({
			id: "gauge",
			value: 0,
			min: 0,
			max: 100,
			titleFontColor: "#000",
			titleFontSize: 20,
			title: "Scrap rate",
		});
		$.ajax({
			url: restAddress + "func/getRealTimeKpis?kpiId=" + loadedKpi,
			type: "GET",
			success: function(realTimeKpisData) {
				scr.totalUnits(realTimeKpisData.totalUnits);
				scr.scrapRate(realTimeKpisData.scrapRate);
				scr.oee(realTimeKpisData.oee);
			},
		});

		var firstDate = new Date(2014, 11, 31);

		var secondDate = new Date(2015, 4, 31);

		$('#fromDateChart').appendDtpicker({
				"dateOnly": true,
				"onShow": function(handler) {},
				"onHide": function(handler) {}
			},
			firstDate);

		$('#toDateChart').appendDtpicker({
				"dateOnly": true,
				"onShow": function(handler) {},
				"onHide": function(handler) {}
			},
			secondDate);
		$('#fromDateHeatMap').appendDtpicker({
				"dateOnly": true,
				"onShow": function(handler) {},
				"onHide": function(handler) {}
			},
			firstDate);

		$('#toDateHeatMap').appendDtpicker({
				"dateOnly": true,
				"onShow": function(handler) {},
				"onHide": function(handler) {}
			},
			secondDate);
		showScreen(true);

		this.connect();

	}

	/**
	 * numSeries: Number of series in the graph;
	 * numValuesPerSerie: Number of points in each serie in the graph (only relevant when values are passed as Input A;
	 * Input A: Receives individual numbers in following format: 1,2,34,12.2,...
	 * Input B: Receives sets of values in the following format: [1,2,34,12.2,...]
	 *
	 * Output: Formatted series for the graph as an object as: serieN:[1,2,34,12.2,...]
	 **/
	this.graphSeriesValues = function(seriesData) {
		var graphSeries = {};

		if (typeof(seriesData) == "object") {
			for (var i = 0; i < seriesData.length; i++) {
				graphSeries["serie" + (i + 1)] = seriesData[i];
			}
		} else
			console.log("Sorry. No valid values. Neither numbers or objects in the right format received.");

		return graphSeries;
	}


	this.closeScreen = function() {
		showScreen(false);
		$('.content').html('');
		this.disconnect();
	}

	this.initializeHeatMap = function(heatMapData) {
		this.heatMapData = heatMapData;
		var xLabelLength =  heatMapData.xLabels.length 
		var factor =xLabelLength/ 6 < 0.2 ? 0.2:xLabelLength/6 ;
		
		$('#heatMap').empty();
		$('#heatMap').width(0);
		var containerWidth = $('#heatMapTable').find('td').eq(4).width();
		var width = containerWidth < 550 * factor ? 550 * factor : containerWidth > 800 * factor ? 800 * factor : containerWidth;
		var minWidth = width<400?400:width;
		var deltaX=xLabelLength!=1?xLabelLength!=2?0:40:80
		$('#heatMap').width(minWidth);
		var margin = {
				top: 30,
				right: 0,
				bottom: 50,
				left: 80
			},
			height = (201 - margin.top - margin.bottom) * heatMapData.yLabels.length,
			gridSize = Math.floor(width / (heatMapData.xLabels.length + 1)),
			gridHeight = 118,
			legendElementWidth = gridSize*minWidth/width,
			buckets = 9,
			colors = generateColor("#FFFFFF", "#F7A35C", 18); // alternatively colorbrewer.YlGnBu[9]

		var svg = d3.select("#heatMap").append("svg")
			.attr("width", minWidth)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var yLabels = svg.selectAll(".dayLabel")
			.data(heatMapData.yLabels)
			.enter().append("text")
			.text(function(d) {
				return d;
			})
			.attr("x", deltaX)
			.attr("y", function(d, i) {
				return i * gridHeight;
			})
			.style("text-anchor", "end")
			.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
			.attr("class", function(d, i) {
				return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
			});

		var xLabels = svg.selectAll(".timeLabel")
			.data(heatMapData.xLabels)
			.enter().append("text")
			.text(function(d) {
				return d;
			})
			.attr("x", function(d, i) {
				return i * gridSize+deltaX;
			})
			.attr("y", 0)
			.style("text-anchor", "middle")
			.attr("transform", "translate(" + gridSize / 2 + ", -6)")
			.attr("class", function(d, i) {
				return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
			});

		var colorScale = d3.scale.quantile()
			.domain([0, buckets - 1, d3.max(heatMapData.data, function(d) {
				return d.value;
			})])
			.range(colors);

		var cards = svg.selectAll(".hour")
			.data(heatMapData.data, function(d) {
				return d.varY + ':' + d.varX;
			});

		cards.append("title");

		cards.enter().append("rect")
			.attr("varX", function(d) {
				return d.varX
			})
			.attr("varY", function(d) {
				return d.varY
			})
			.attr("x", function(d) {
				return (d.varX - 1) * gridSize+deltaX;
			})
			.attr("y", function(d) {
				return (d.varY - 1) * gridHeight;
			})
			.attr("title", function(d) {
				$(this).tooltip({
					content: d.value==null?"No data":'Value: '+d.value,
					position: {
						at: "top-60"
					},
					show: {
						duration: 0
					},
					hide: {
						duration: 0
					}
				});
				return "Value: " + d.value;
			})
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("class", "hour bordered")
			.attr("width", gridSize)
			.attr("height", gridHeight)
			.style("fill", colors[0]);

		cards.transition().duration(1000)
			.style("fill", function(d) {
				return colorScale(d.value);
			});

		cards.select("title").text(function(d) {
			return d.value;
		});

		cards.exit().remove();
		var colorScales = [];
		var colorsLegend = [];
		for (var j = 0; j < colorScale.quantiles().length; j++) {
			if (j % 4 == 0) {
				colorScales.push(colorScale.quantiles()[j]);
				colorsLegend.push(colors[j]);
			}
		}
		colorsLegend.push(colors[colors.length - 1]);

		var legend = svg.selectAll(".legend")
			.data([0].concat(colorScales), function(d) {
				return d;
			});

		legend.enter().append("g")
			.attr("class", "legend");
		legend.append("rect")
			.attr("x", function(d, i) {
				return legendElementWidth * factor * i;
			})
			.attr("y", height + margin.top - 30)
			.attr("width", legendElementWidth * factor)
			.attr("height", gridHeight / 6)
			.style("fill", function(d, i) {
				return colorsLegend[i];
			});

		legend.append("text")
			.attr("class", "mono")
			.text(function(d) {
				return "≥ " + Math.round(d);
			})
			.attr("x", function(d, i) {
				return legendElementWidth * factor * i;
			})
			.attr("y", height + gridHeight - 80);
		var fillColor = "";
		legend.exit().remove();
		$('rect').hover(function() {
				fillColor = $(this).css('fill');
				$(this).css('fill', '#AFE8FF');
			},
			function() {
				$(this).css('fill', fillColor);
			});


		var KPIName = "";
		for (var i = 0; i < scr.kpiInfo.length; i++) {
			if (scr.kpiInfo[i].id == loadedKpi) {
				KPIName = scr.kpiInfo[i].name;
				break;
			}
		}
		$('#heatMapTitle').html('<h4>' + heatMapData.title + '</h4>' + (heatMapData.subTitle !== undefined ? '<h5>' + heatMapData.subTitle + '</h5>' : ''));
	}

	this.initializeGraph = function(graphData) {
		this.graphData = graphData;
		if (graphData.data != null) {
			// KPI Chart
			var len = graphData.data.length;
			$.elycharts.templates['line_basic_1'] = {
				type: "line",
				margins: [10, 110, 20, 50],
				defaultSeries: {
					plotProps: {
						"stroke-width": 4
					},
					dot: true,
					dotProps: {
						stroke: "white",
						"stroke-width": 2
					}
				},
				series: {
					serie1: {
						color: "#7CB5EC"
					},
					serie2: {
						color: "#000000"
					},
					serie3: {
						color: "#90ED7D"
					},
					serie4: {
						color: "#F7A35C"
					},
					serie5: {
						color: "#8085E9"
					},
					serie6: {
						color: "#CC0000"
					},
					serie7: {
						color: "#009999"
					},
					serie8: {
						color: "#9900CC"
					},
					serie9: {
						color: "#F5007B"
					},
					serie10: {
						color: "#0000EB"
					},
					serie11: {
						color: "#EBEB00"
					},
					serie12: {
						color: "#A0A0A0"
					},					


				},
				defaultAxis: {
					labels: true,

				},
				features: {
					mousearea: {
						onMouseClick: function(a, b, c, d) {
							if(b.startsWith('serie'))
							{
								var serieIndex = b.substring(5, b.length) - 1;
								var labelIndex = scr.graphData.labels.length  >1?Math.round((c / (scr.graphData.data[serieIndex].length - 1) * (scr.graphData.labels.length - 1))):0;
								var legend=scr.graphData.legend[serieIndex];
								var label = scr.graphData.labels[labelIndex]
								var startDate=new Date(parseInt(scr.graphData.labelsTimeStamp[labelIndex]));
								var n = 0;
								
								var endDate;
								switch(scr.graphGranularity)
								{
									case 'monthly':
										endDate=new Date(startDate.getTime());
										endDate.setMonth(endDate.getMonth()+1);
										break;
									case 'weekly':
										endDate = new Date(startDate.getTime()+1000*3600*24*7);
										break;
									case 'daily':
										endDate = new Date(startDate.getTime()+1000*3600*24);
										break;
									case 'hourly':
										endDate = new Date(startDate.getTime()+1000*3600);
										break;
									default:
										endDate=new Date(startDate.getTime());
										endDate.setMonth(endDate.getMonth()+1);
								}
								
								scr.updateHeatMap(startDate.getTime(),endDate.getTime(),legend);
							}
						},
					},
					grid: {
						draw: [true, false],
						props: {
							"stroke-dasharray": "-"
						}
					},
					legend: {
						horizontal: false,
						width: 190,
						height: 13 * len,
						x: 700,
						y: 325 - 13 * len,
						dotProps: {
							stroke: "black",
							"stroke-width": 0
						},
						borderProps: {
							opacity: 0.0,
							"stroke-width": 0
						}
					}
				}
			};
			$(function() {
				Math.seed = 50;
				var initialPos= Object.keys($.elycharts.templates["line_basic_1"].series).length+1;
				for (i = initialPos; i <= len; i++) {
					$.elycharts.templates["line_basic_1"].series['serie' + i] = {
						'color': scr.getRandomColor()
					};
				}
				$.elycharts.templates["line_basic_1"].features.legend.x = $('#chart').width() - 100;
				var limits=[];
				for(var i=0;i<kpiTargets.length;i++)
				{
					if(loadedKpi==kpiTargets[i].kpi_id)
					{
						limits.push(kpiTargets[i].lower_bound);
						limits.push(kpiTargets[i].upper_bound);
					}
				}
				$("#chart").chart("clear");
				$("#chart").chart({
					template: "line_basic_1",
					tooltips: function(serieId, valueIndex, allValues, singleValue) {
						var legend="";
						
						if(valueIndex.startsWith("serie"))
						{
							legend=this.legend[valueIndex.substring(5,valueIndex.length)-1]+"<br>";
						}
						else
						{
							legend="Limit<br>";
						}
						var value = legend+  (loadedKpi == "4" ? 'Value: ' + parseFloat((singleValue * 100).toFixed(2)) + "%" : 'Value: ' + parseFloat(singleValue.toFixed(3)));
						return value;
					},
					percentage:loadedKpi==4?true:false,
					legend: graphData.legend,
					labels: graphData.labels,
					values: scr.graphSeriesValues(graphData.data),
					limits:limits,
					defaultSeries: {
						tooltip: {
							width: 100,
							height: 40,
							contentStyle: {
								"text-align": "center"
							}
						},
						fill: false,
						stacked: false,
						highlight: {
							scale: 2
						},
						startAnimation: {
							active: true,
							type: "grow",
							easing: "bounce"
						}
					}
				});
				var series = $.elycharts.templates['line_basic_1'].series;
				var objs = $('#chart').find('[fill="none"]');
				for (var i = 0; i < len; i++) {
					var color = series['serie' + (i + 1)].color;
					objs.eq(i + objs.length - len).attr('fill', color);
				}

				var KPIName = "";
				for (var i = 0; i < scr.kpiInfo.length; i++) {
					if (scr.kpiInfo[i].id == loadedKpi) {
						KPIName = scr.kpiInfo[i].name;
						break;
					}
				}

				$('#chartTitle').html('<h4>' + graphData.title + '</h4>' + (graphData.subTitle !== undefined ? '<h5>' + graphData.subTitle + '</h5>' : ''));


			});
			if ($('#graphTable').width() != $('#page-content-wrapper').width()) {
				this.adjustGraph();
			}
		}
	};

	$.elycharts.templates['line_basic_1'] = {
		type: "line",
		margins: [10, 110, 20, 50],
		defaultSeries: {
			plotProps: {
				"stroke-width": 4
			},
			dot: true,
			dotProps: {
				stroke: "white",
				"stroke-width": 2
			}
		},
		series: {
			serie1: {
				color: "#7CB5EC"
			},
			serie2: {
				color: "#000000"
			},
			serie3: {
				color: "#90ED7D"
			},
			serie4: {
				color: "#F7A35C"
			},
			serie5: {
				color: "#8085E9"
			},


		},
		defaultAxis: {
			labels: true
		},
		features: {
			grid: {
				draw: [true, false],
				props: {
					"stroke-dasharray": "-"
				}
			},
			legend: {
				horizontal: false,
				width: 190,
				height: 80,
				x: 700,
				y: 240,
				dotProps: {
					stroke: "black",
					"stroke-width": 0
				},
				borderProps: {
					opacity: 0.0,
					"stroke-width": 0
				}
			}
		}
	};

}


function ScreenQuery() {
	var scr = this;

	this.baseUrl = '/storage-reader/query';
	$.get("inc/screenquery.inc", function(content) {
		scr.content = content;
	});

	this.openScreen = function() {
		$('.content').html(this.content);
		showScreen(true);
		$('#sendBtn').on('click', function(event) {
			scr.send();
		});
		this.selectBoxes();
		$('.queryBox').change(this.queryBoxes);
		$('.editBox').change(this.updateUrl);

	}

	this.closeScreen = function() {
		showScreen(false);
		$('.content').html('');
	}
	this.queryBoxes = function(e) {
		scr.selectBoxes();
	}
	this.selectBoxes = function() {
		$('#attributesTable').find('tr').css('display', 'none');
		$('#startTime').css('display', 'table-row');
		$('#endTime').css('display', 'table-row');
		if ($('#eventType').val() == 'anomaly' || $('#eventType').val() == 'feedback') {
			$('#queryType').val('default');
			$('.amm').css('display', 'none');
		} else {
			$('.amm').css('display', 'block');
		}
		$('#url').val(this.baseUrl + '/' + $('#eventType').val() + '/' + $('#queryType').val())
		if ($('#queryType').val() != 'default') {
			$('#propertyKey').css('display', 'table-row');
		}
		if ($('#eventType').val() == 'simple') {
			$('#sensorId').css('display', 'table-row');

		}
		if ($('#eventType').val() == 'derived') {
			$('#componentId').css('display', 'table-row');
		}
		if ($('#eventType').val() == 'predicted') {
			$('#eventName').css('display', 'table-row');
		}
		if ($('#eventType').val() == 'anomaly') {
			$('#anomalyType').css('display', 'table-row');
		}
		if ($('#eventType').val() == 'recommendation') {
			if ($('#queryType').val() == 'default') {
				$('#actor').css('display', 'table-row');
				$('#eventName').css('display', 'table-row');
				$('#recommendationId').css('display', 'table-row');
			}
		}
		if ($('#eventType').val() == 'feedback') {
			$('#actor').css('display', 'table-row')
			$('#recommendationId').css('display', 'table-row')
		}
		if ($('#eventType').val() == 'default') {
			$('#actor').css('display', 'table-row');
			$('#recommendationId').css('display', 'table-row');
		}
		this.updateUrl();
	}
	this.updateUrl = function() {
		var attributes = $('#attributesTable').find('tr:visible');
		var url = $('#url').val().split('?')[0] + '?';
		for (var i = 0; i < attributes.length; i++) {
			var attr = scr.getAttribute(attributes.eq(i));
			if (attr != "") {
				url = url + attributes.eq(i).attr('id') + '=' + attr;
				url = url + '&';
			}
		}
		url = url.slice(0, url.length - 1);
		$('#url').val(url);
	}

	this.getAttribute = function(el) {
		var selector = (el.attr('id') == "sensorId" || el.attr('id') == "propertyKey") ? 'select' : 'input';
		if (el.attr('id').indexOf('Time') > -1) {
			var els = el.find(selector);
			return (new Date(els.eq(0).val(), els.eq(1).val() - 1, els.eq(2).val(), els.eq(3).val(), els.eq(4).val(), els.eq(5).val())).getTime();
		} else {
			return el.find(selector).val();
		}
	}
	this.send = function() {
		var response = $.get($('#url').val());
		this.postResponse(response);

	}
	this.postResponse = function(res) {
		if (res.responseText === undefined) {
			setTimeout(function() {
				scr.postResponse(res)
			}, 100);
		} else {
			$('#textBox').val(res.responseText);
		}
	}
}
