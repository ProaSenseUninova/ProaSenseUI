<table class="middleTable containerColor2">
	<tr style="text-align:center">
		<td>
			<b>
Query tester
</b>
		</td>
	</tr>
</table>

<br>
<table class="queryTable">
	<tr>
		<td colspan="2">
			URL:
			<input style="width:600px" value="/storage-reader/query" id="url" readonly type="textbox" />
		</td>

	</tr>
	<tr>
		<td>Event type</td>
		<td>Query type</td>
	</tr>
	<tr>
		<td width="50%">
			<select id="eventType" class="queryBox">
				<option value="simple">Simple</option>
				<option value="derived">Derived</option>
				<option value="predicted">Predicted</option>
				<option value="anomaly">Anomaly</option>
				<option value="recommendation">Recommendation</option>
				<option value="feedback">Feedback</option>
			</select>
		</td>
		<td>
			<select id="queryType" class="queryBox">
				<option value="default">Default</option>
				<option class="amm" value="average">Average</option>
				<option class="amm" value="minimum">minimum</option>
				<option class="amm" value="maximum">maximum</option>
			</select>
		</td>
	</tr>
</table>
<table id="attributesTable" class="queryTable editBox">
	<tr id="sensorId">
		<td width="33%">
			Sensor Id:
		</td>
		<td>
			<select>
				<option value="1000695">1000695</option>
				<option value="1000696">1000696</option>
			</select>
		</td>
	</tr>
	<tr id="startTime">
		<td>
			Start time:
		</td>
		<td>
			<input style="width:50" value="2014" placeholder="Year" type="textbox" /> -
			<input style="width:40" value="02" placeholder="Mon" type="textbox" /> -
			<input style="width:40" value="08" placeholder="Day" type="textbox" /> &nbsp
			<input style="width:40" value="07" placeholder="HH" type="textbox" /> :
			<input style="width:40" value="10" placeholder="MM" type="textbox" /> :
			<input style="width:40" value="18" placeholder="SS" type="textbox" />
		</td>
	</tr>
	<tr id="endTime">
		<td>
			End time
		</td>
		<td>
			<input style="width:50" value="2014" placeholder="Year" type="textbox" /> -
			<input style="width:40" value="02" placeholder="Mon" type="textbox" /> -
			<input style="width:40" value="08" placeholder="Day" type="textbox" /> &nbsp
			<input style="width:40" value="07" placeholder="HH" type="textbox" /> :
			<input style="width:40" value="10" placeholder="MM" type="textbox" /> :
			<input style="width:40" value="18" placeholder="SS" type="textbox" />
		</td>
	</tr>
	<tr id="componentId">
		<td>
			Component id
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
	<tr id="propertyKey">
		<td>
			Property key
		</td>
		<td>
			<select>
				<option value="value">value</option>
			</select>
		</td>
	</tr>
	<tr id="eventName">
		<td>
			Event name
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
	<tr id="anomalyType">
		<td>
			Anomaly type
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
	<tr id="recommendationId">
		<td>
			Recommendation id
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
	<tr id="actor">
		<td>
			Actor
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
	<tr id="status">
		<td>
			Status
		</td>
		<td>
			<input type="textbox" />
		</td>
	</tr>
</table>
<table class="queryTable">
	<tr>
		<td>
			Response:
		</td>
	</tr>
	<tr>
		<td>
			<textarea id="textBox" rows=10 cols=80 readonly>
			</textarea>
		</td>
	</tr>
	<tr style="text-align:right">
		<td>
			<button type="button" id="sendBtn" class="btn btn-default">Send</button>
		</td>
	</tr>
</table>
