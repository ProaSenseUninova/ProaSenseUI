<table class="screenTable">
	<tbody>
		<tr>
			<td width="150px">
				Name
			</td>
			<td colspan="5" style="text-align:left">
				<input style="width: 300px" id="name" type="textbox" />
			</td>
		</tr>
		<tr>
			<td width="150px">
				Description
			</td>
			<td colspan="5" style="text-align:left">
				<input style="width: 300px" id="description" type="textbox" />
			</td>
		</tr>
		<tr>
			<td>
				Calculation</option>
			</td>
			<td colspan=5>
				<select id="calculationType" class="box grey">
					<option value="" disabled selected hidden>Calculation Type</option>
					<option value="simple">Simple Measure</option>
					<option value="aggregate">Aggregate Measure</option>
					<option value="composed">Composed Measure</option>
				</select>
			</td>


		</tr>
		<tr class="hiddenRow simple">
			<td>
				&nbsp;
			</td>
			<td>
				<select id="selectSensor1" class="box grey sensorBox">
					<option value="" disabled selected hidden>Select Sensor</option>
				</select>
			</td>
			<td colspan=2>
				&nbsp;
			</td>


		</tr>

		<tr class="hiddenRow aggregate">
			<td>
				&nbsp;
			</td>
			<td>
				<select id="kpiSensor1" class="box grey">
					<option value="" disabled selected hidden>KPI/Sensor</option>
					<option value="kpi">KPI</option>
					<option value="sensor">Sensor</option>
				</select>
			</td>
			<td>
				&nbsp;
			</td>
			<td>
				<select id="selectAggType" class="box grey">
					<option value="" disabled selected hidden>Select Aggregation Type</option>
					<option value="minimum">Minimum</option>
					<option value="maximum">Maximum</option>
					<option value="average">Average</option>
					<option value="sum">Sum</option>
					<option value="standard_deviation">Standard Deviation</option>
					<option value="count">Count</option>
				</select>
			</td>



		</tr>
		<tr class="hiddenRow elAggRow">
			<td>
				&nbsp;
			</td>
			<td>
				<select id="selectSensor2" class="box grey sensorBox">
					<option value="" disabled selected hidden>Select Sensor</option>
				</select>
				<select id="selectKpi1" class="box grey kpiBox">
					<option value="" disabled selected hidden>Select Kpi</option>
				</select>
			</td>
			<td>
				&nbsp;
			</td>
			<td>
				&nbsp;
			</td>



		</tr>
		<tr class="hiddenRow composed">
			<td>
				&nbsp;
			</td>
			<td>
				<select id="kpiSensor2" class="box grey kpiSensor">
					<option value="" disabled selected hidden>KPI/Sensor</option>
					<option value="kpi">KPI</option>
					<option value="sensor">Sensor</option>
				</select>
			</td>
			<td>
				<select id="op1" class="box grey" style="width:60">
					<option value="" disabled selected hidden>Op</option>
					<option value="+">+</option>
					<option value="-">-</option>
					<option value="*">x</option>
					<option value="/">/</option>
				</select>
			</td>
			<td>
				<select id="kpiSensor3" class="box grey kpiSensor">
					<option value="" disabled selected hidden>KPI/Sensor</option>
					<option value="kpi">KPI</option>
					<option value="sensor">Sensor</option>
				</select>
			</td>
			<td>
				<select id="op2" class="box grey" style="width:80">
					<option value="" disabled selected hidden>Op</option>
					<option value="none">none</option>
					<option value="+">+</option>
					<option value="-">-</option>
					<option value="*">x</option>
					<option value="/">/</option>
				</select>
			</td>
			<td>
				<select id="kpiSensor4" disabled class="box grey kpiSensor thEl">
					<option value="" disabled selected hidden>KPI/Sensor</option>
					<option value="kpi">KPI</option>
					<option value="sensor">Sensor</option>
				</select>
			</td>

		</tr>
		<tr class="hiddenRow elRow">
			<td>
				&nbsp;
			</td>
			<td>
				<select id="selectSensor3" class="box grey sensorBox sensorChoice">
					<option value="" disabled selected hidden>Select Sensor</option>
				</select>
				<select id="selectKpi2" class="box grey kpiBox kpiChoice">
					<option value="" disabled selected hidden>Select KPI</option>
				</select>
			</td>
			<td width=40>
				&nbsp;
			</td>
			<td>
				<select id="selectSensor4" class="box grey sensorBox sensorChoice">
					<option value="" disabled selected hidden>Select Sensor</option>
				</select>
				<select id="selectKpi3" class="box grey kpiBox kpiChoice">
					<option value="" disabled selected hidden>Select KPI</option>
				</select>
			</td>
			<td width=40>
				&nbsp;
			</td>
			<td>
				<select id="selectSensor5" disabled class="box grey sensorBox sensorChoice thEl">
					<option value="" disabled selected hidden>Select Sensor</option>
				</select>
				<select id="selectKpi4" disabled class="box grey kpiBox kpiChoice thEl">
					<option value="" disabled selected hidden>Select KPI</option>
				</select>
			</td>

		</tr>

		<tr class="samplingRate">
			<td>
				Sampling
			</td>
			<td>
				<input id="samplingRate" type="textbox">
			</td>
			<td colspan=4>

				<select id="samplingInterval" class="box grey">
					<option value="" disabled selected hidden>Sampling interval</option>
					<option value="week">Week</option>
					<option value="day">Day</option>
					<option value="hour">Hour</option>
					<option value="minute">Minute</option>
				</select>
			</td>
		</tr>
		<!--<tr>
<td width="15%">&nbsp</td>
<td width="37%">&nbsp</td>
<td width="10%">&nbsp</td>
<td width="">&nbsp</td>


</tr>		-->
		<br>
	</tbody>
</table>
<div align="left">Contextual Information</div>
<table class="bottomTable containerColor2">
	<tr>
		<td>
			<form id="contextualInformation">
				<input type="checkbox" value="context_product">Product
				<br>
				<input type="checkbox" value="context_machine">Machine
				<br>
				<input type="checkbox" value="context_shift">Shift
				<br>
				<input type="checkbox" value="context_mould">Mould
				<br>
			</form>
		</td>
	</tr>
</table>
<br>
<div align="right" class="btn-group screen;" role="group" aria-label="...">
	<button type="button" id="cancelBtn" class="btn btn-default">Cancel</button>
	<button type="button" id="saveBtn" class="btn btn-default">Save</button>
</div>
