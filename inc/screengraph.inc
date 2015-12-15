<table class="headerTable">
	<tr>
		<td colspan=3>
			<div class="pageHeader"><b>Real time KPIs</b></div>
		</td>
	</tr>
	<tr>
		<td width=33% style="vertical-align: middle">
			<div class="pageHeader">Total units</div>
			<div class="pageHeader" id="totalUnits" style="color:#999">0</div>
		</td>
		<td width=33% align="center" style="vertical-align: middle">
			<div id="gauge" style="width: 150px; height: 120px;"></div>
		</td>
		<td style="vertical-align: middle;">
			<div class="pageHeader">OEE</div>
			<div class="progress" style="width:60%;margin:auto">
				<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">
					0%
				</div>
			</div>
		</td>
	</tr>
</table>
<table id="graphTable" class="containerColor chartTable" width="100%">
	<tr>
		<form id="chartSelector" action="">
			<td data-cInfo="context_global">
				<input type="radio" checked name="type" value="Global"> Global
				<br>
			</td>
			<td data-cInfo="context_product">
				<input type="radio" name="type" value="product"> Product
				<br>
			</td>
			<td data-cInfo="context_machine">
				<input type="radio" name="type" value="machine"> Machine
				<br>
			</td>
			<td data-cInfo="context_shift">
				<input type="radio" name="type" value="shift"> Shift
				<br>
			</td>
			<td data-cInfo="context_mould">
				<input type="radio" name="type" value="mould"> Mould
				<br>
			</td>
		</form>
	</tr>
	<tr>
		<td id="graphCell" align="center" rowspan=2 colspan=5>
			<div id="chartTitle"></div>
			<div id="chart"></div>
		</td>
		<td style="border:0px solid black;vertical-align:top;width:150px">
			<b>period covered:</b>
			<br>
			<br> From:
			<br>
			<input type="text" class="inputField" id="fromDateChart" value="">
			<br> To:
			<br>
			<input type="text" class="inputField" id="toDateChart" value="">
			<br>
			<br>
			<b>Granulatiry:</b>
			<br>
			<br>
			<select id="granularityChart" class="box">
				<option value="hourly">Hourly</option>
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
				<option selected value="monthly">Monthly</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>
			<div align="right" class="btn-group screen;" role="group" aria-label="...">
				<button type="button" id="graphButton" class="btn btn-default">Update</button>
			</div>
		</td>
	</tr>
</table>
<br>
<div align="left">Contextual Information</div>
<table id="heatMapTable" class="containerColor chartTable" width="100%">
	<tr>
		<td width="25%">&nbsp;</td>
		<td  width="25%" style="text-align:center">
			<b>Vertical set:&emsp;</b>
			<select id="verticalSet"> 
				<option value="product">Product</option>
				<option value="machine">Machine</option>
				<option selected value="shift">Shift</option>
				<option value="mould">Mould</option>
			</select>
		</td>
		<td  width="25%" style="text-align:center">
			<b>Horizontal set:&emsp;</b>
			<select id="horizontalSet"> 
				<option value="product">Product</option>
				<option selected value="machine">Machine</option>
				<option value="shift">Shift</option>
				<option value="mould">Mould</option>
			</select>
		</td>&nbsp;<td>
	</tr>
	<tr>
		<td rowspan=2 colspan=4 align="center">
			<div id="heatMapTitle"></div>
			<div id="heatMap" class="heatmap"></div>
		</td>
		<td style="border:0px solid black;vertical-align:top;width:150px">
			<b>period covered:</b>
			<br>
			<br> From:
			<br>
			<input type="text" class="inputField" id="fromDateHeatMap" value="">
			<br> To:
			<br>
			<input type="text" class="inputField" id="toDateHeatMap" value="">
			<br>
			<br>
			<b>Granulatiry:</b>
			<br>
			<br>
			<select id="granularityHeatMap" class="box">
				<option value="hourly">Hourly</option>
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
				<option value="monthly">Monthly</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>
			<div align="right" class="btn-group screen;" role="group" aria-label="...">
				<button type="button" id="heatMapButton" class="btn btn-default">Update</button>
			</div>
		</td>
	</tr>
</table>
