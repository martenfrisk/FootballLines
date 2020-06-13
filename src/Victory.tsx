import React from 'react'
import { VictoryChart, VictoryLine, VictoryArea, VictoryTheme, VictoryAxis, VictoryStack, VictoryLabel } from 'victory'
import { dif, years, aik, misc } from './data'

const Victory = () => {
	return (
		<div>
			<VictoryStack >
				<VictoryArea
					interpolation="stepBefore"
					style={{ data: { fill: 'darkgray' } }}
					x="yr"
					y="div1"
					data={years}
				/>
				<VictoryArea
					interpolation="stepBefore"
					style={{ data: { fill: 'lightgray' } }}
					x="yr"
					y="div2"
					data={years}
				/>
				<VictoryArea
					interpolation="stepBefore"
					style={{ data: { fill: 'gray' } }}
					x="yr"
					y="div3"
					data={years}
				/>

				<VictoryAxis tickCount={20} />
				<VictoryAxis tickCount={10} dependentAxis />
			</VictoryStack>
		</div>
	)
}

export default Victory
