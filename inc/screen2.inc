<div align="left">Contextual Information</div>
<table class="middleTable containerColor2">
	<tr>
		<td>
			<form id="contextualInformation">
				<input type="checkbox" style="cursor: default" value="product_id" name="Product" disabled="disabled">Product
				<input type="checkbox" style="cursor: default" value="machine_id" name="Machine" disabled="disabled">Machine
				<input type="checkbox" style="cursor: default" value="shift_id" name="Shift" disabled="disabled">Shift
				<input type="checkbox" style="cursor: default" value="mould_id" name="Mould" disabled="disabled">Mould
			</form>
		</td>
	</tr>
</table>
<br>
<table id="targetTable" border=1 width=100%>
</table>
<br>
<table width=100%>

	<tr height=50>
		<td width="40%">
			<table id="targetList" width="100%">
			</table>
		</td>
		<td>
			Upper bound
		</td>
		<td>
			<input id="upperBoundBox" style="width: 100%" type="textbox">
		</td>
		<td>
			&nbsp;
		</td>

	</tr>
	<tr height=30>
		<td width="30%">
			&nbsp;
		</td>
		<td>
			Lower bound
		</td>
		<td>
			<input id="lowerBoundBox" style="width: 100%" type="textbox">
		</td>
		<td align="right">
			<div align="right" class="btn-group screen;" role="group" aria-label="...">
				<button type="button" id="cancelBtn" class="btn btn-default">Cancel</button>
				<button type="button" id="addTargetBtn" class="btn btn-default">Add Target</button>
			</div>
		</td>
	</tr>
</table>
</div>
