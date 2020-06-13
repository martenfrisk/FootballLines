import React, { useState } from 'react'
import {
	Line,
	Area,
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Legend,
	Brush
} from 'recharts'
import { dif, years, aik, misc } from './data'
import hammarby from './assets/ham.json'
import malmo from './assets/malmo.json'
import goteborg from './assets/ifkgoteborg.json'
import hacken from './assets/bkhacken.json'
import './App.css'

const App = () => {
	const [ show, setShow ] = useState({
		dif: false,
		aik: false,
		ham: false,
		mff: false,
		gbg: true,
		bkh: true,
		icons: true
	})

	const teamColors = {
		dif: '#32baf2',
		aik: 'black',
		ham: '#00834c',
		mff: '#0091d4',
		gbg: '#1367bc',
		bkh: 'black'
	}


	const handleShow = (e: any) => {
		setShow({ ...show, [e.target.name]: e.target.checked })
	}

	const renderColorfulLegendText = (value: any, entry: any) => {
		const { color } = entry
		if (value === 'div1' || value === 'div2' || value === 'div3') {
			return null
		} else {
			return <span style={{ color }}>{value}</span>
		}
	}

	const formatTooltip = (value: any, name: any, props: any) => {
		let year = props.payload.yr
		let teamsAmt = years.find(({ yr }) => (yr = year))
		let position: number
		if (value > teamsAmt!.div1) {
		} else {
		}
		let division: string
		if (props.payload.div === 1) {
			division = 'AS'
			position = value
		} else if (props.payload.div === 2) {
			division = 'SE'
			position = value - teamsAmt!.div1
		} else if (props.payload.div === 3) {
			division = 'Div 1'
			position = value - (teamsAmt!.div1 + teamsAmt!.div2)
		} else {
			division = 'Div 2'
			position = value - (teamsAmt!.div1 + teamsAmt!.div2 + teamsAmt!.div3!)
		}
		return `${position} (${division})`
	}

	const CustomizedDot = (props: any) => {
		const { cx, cy, stroke, value } = props

		if (value === 1) {
			return (
				<svg
					x={cx - 10}
					y={cy - 30}
					width={40}
					height={35}
					xmlns="http://www.w3."
					version="1.1"
					viewBox="1 0 511.99999 511"
				>
					<g id="Layer_2" data-name="Layer 2">
							<path
								style={{ strokeWidth:20,overflow:'visible', fill: 'none', stroke: stroke }}
								d="M56,251.29c-27.61,0-50-29.52-50-65.93s22.39-65.92,50-65.92M158.42,251.29c27.61,0,50-29.52,50-65.93s-22.39-65.92-50-65.92"
							/>
							<circle
								style={{ strokeWidth:20,overflow:'visible', fill: 'none', stroke: stroke }}
								cx="107.21"
								cy="59.21"
								r="51.21"
							/>
							<polygon
								style={{ strokeWidth:20,overflow:'visible', fill: 'none', stroke: stroke }}
								points="55.71 112.6 158.71 112.6 158.71 298.41 55.71 298.6 55.71 112.6"
							/>
					</g>
				</svg>
			)
		}

		return null
		
	}

	return (
		<div>
			<div style={{ marginTop: '50px', marginLeft: '50px' }}>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.dif,
						cursor: 'pointer',
						textDecoration: show.dif ? 'underline' : 'none'
					}}
				>
					DIF
					<input
						type="checkbox"
						checked={show.dif}
						name="dif"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.aik,
						cursor: 'pointer',
						textDecoration: show.aik ? 'underline' : 'none'
					}}
				>
					AIK
					<input
						type="checkbox"
						checked={show.aik}
						name="aik"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.ham,
						cursor: 'pointer',
						textDecoration: show.ham ? 'underline' : 'none'
					}}
				>
					Hammarby
					<input
						type="checkbox"
						checked={show.ham}
						name="ham"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.mff,
						cursor: 'pointer',
						textDecoration: show.mff ? 'underline' : 'none'
					}}
				>
					Malmö FF
					<input
						type="checkbox"
						checked={show.mff}
						name="mff"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.gbg,
						cursor: 'pointer',
						textDecoration: show.gbg ? 'underline' : 'none'
					}}
				>
					IFK Göteborg
					<input
						type="checkbox"
						checked={show.gbg}
						name="gbg"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
				<label
					style={{
						marginRight: '2rem',
						color: teamColors.bkh,
						cursor: 'pointer',
						textDecoration: show.bkh ? 'underline' : 'none'
					}}
				>
					BK Häcken
					<input
						type="checkbox"
						checked={show.bkh}
						name="bkh"
						onChange={handleShow}
						style={{ display: 'none' }}
					/>
				</label>
			</div>
			<ResponsiveContainer width="100%" height={450}>
				<ComposedChart data={years} margin={{ bottom: 20, left: 50, top: 40, right: 40 }}>
					<defs>
						<linearGradient id="divOne" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#5FBFED" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#5FBFED" stopOpacity={0.1} />
						</linearGradient>
						<linearGradient id="divTwo" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#F6E3AC" stopOpacity={0.7} />
							<stop offset="95%" stopColor="#F6E3AC" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="divThree" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#F192B0" stopOpacity={0.6} />
							<stop offset="95%" stopColor="#F192B0" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="#f5f5f5" vertical={false} />
					<XAxis dataKey="yr" interval="preserveEnd" />
					<YAxis
						reversed
						orientation="right"
						interval="preserveStart"
						domain={[ 0, 16 ]}
						ticks={[ 1, 5, 10, 16, 20, 30, 40 ]}
						type="number"
					/>
					<Tooltip formatter={formatTooltip} />
					<Legend
						align="right"
						verticalAlign="top"
						iconSize={0}
						layout="vertical"
						formatter={renderColorfulLegendText}
					/>
					<div style={{ marginTop: '30px', height: '10px' }}> </div>
					<Brush dataKey="yr" height={30} stroke="rgba(0,0,0, 0.2)" />
					<Area
						label={false}
						stroke="none"
						dot={false}
						activeDot={false}
						dataKey="div1"
						type="stepBefore"
						stackId="a"
						isAnimationActive={false}
						fill="url(#divOne)"
					/>
					<Area
						label={false}
						stroke="none"
						dot={false}
						activeDot={false}
						dataKey="div2"
						type="stepBefore"
						stackId="a"
						isAnimationActive={false}
						fill="url(#divTwo)"
					/>
					<Area
						label={false}
						stroke="none"
						dot={false}
						activeDot={false}
						dataKey="div3"
						type="stepBefore"
						stackId="a"
						isAnimationActive={false}
						fill="url(#divThree)"
					/>
					{show.dif && (
						<Line
							type="stepBefore"
							data={dif}
							activeDot={{ stroke: '#002554', fill: '#32baf2' }}
							dot={<CustomizedDot />}
							dataKey="diftot"
							stroke="#32baf2"
							strokeWidth={1}
							xAxisId="0"
							name="Djurgården"
						/>
					)}
					{show.aik && (
						<Line
							type="stepBefore"
							data={aik}
							activeDot={{ stroke: 'black', fill: 'yellow' }}
							dot={<CustomizedDot />}
							dataKey="aiktot"
							stroke="black"
							strokeWidth={1}
							xAxisId="0"
							name="AIK"
						/>
					)}
					{show.ham && (
						<Line
							type="stepBefore"
							data={hammarby}
							activeDot={{ stroke: 'green', fill: 'white' }}
							dot={<CustomizedDot />}
							dataKey="pos"
							stroke="green"
							strokeWidth={1}
							xAxisId="0"
							name="Hammarby"
						/>
					)}
					{show.mff && (
						<Line
							type="stepBefore"
							data={malmo}
							activeDot={{ stroke: '#0091d4', fill: 'white' }}
							dot={<CustomizedDot />}
							dataKey="pos"
							stroke="#0091d4"
							strokeWidth={1}
							xAxisId="0"
							name="Malmö FF"
						/>
					)}
					{show.gbg && (
						<Line
							type="stepBefore"
							data={goteborg}
							activeDot={{ stroke: 'rgb(19, 103, 188)', fill: 'rgb(249, 187, 58)' }}
							dot={<CustomizedDot />}
							dataKey="pos"
							stroke="rgb(19, 103, 188)"
							strokeWidth={1}
							xAxisId="0"
							name="IFK Göteborg"
						/>
					)}
					{show.bkh && (
						<Line
							type="stepBefore"
							data={hacken}
							activeDot={{ stroke: 'black', fill: 'yellow' }}
							dot={<CustomizedDot />}
							dataKey="pos"
							stroke="black"
							strokeWidth={1}
							xAxisId="0"
							name="BK Häcken"
							connectNulls
						/>
					)}
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
}

export default App
