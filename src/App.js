import './App.css';

import { Container, Grid } from '@material-ui/core';
import { saveAs } from 'filesaver.js-npm';
import JSZip from 'jszip';
import React, { useCallback, useRef, useState } from 'react';
import svgDownload from 'svg-file-downloader';

import BasesTable from './BasesTable';
import Form from './Form';
import TrianglePath, { toRadians } from './TrianglePath';

const svgDoctype = '<?xml version="1.0" standalone="no"?>\n';

const mmToPx = (mm) => mm * 4.9;

const generateArray = (count) => [...Array(count)];

const triangleSize = mmToPx(80) / 12;

function App() {
	const svgWrapper = useRef();
	const [maskSize, setMaskSize] = useState(0);
	const [generation, setGeneration] = useState(0);
	const [trianglesPerTriangle, setTrianglesPerTriangle] = useState(6);
	const [fillChance, setFillChance] = useState(0.3);
	const [strokeChance, setStrokeChance] = useState(0.3);
	const [remainingItemsToExport, setRemainingItemsToExport] = useState();

	const triangleHeight = triangleSize * Math.sin(toRadians(60));

	const handleDownload = (name) => {
		svgDownload(
			svgWrapper.current,
			false,
			name ||
				`hex-${trianglesPerTriangle}-${Math.floor(
					fillChance * 100,
				)}-${Math.floor(strokeChance * 100)}-${Date.now()}.svg`,
		);
	};
	const handleExport = useCallback(
		(items, onTick, onComplete) => {
			const zip = new JSZip();
			const exportTime = Date.now();
			const exportItem = (item, itemsLeft) => {
				setRemainingItemsToExport(itemsLeft);
				if (item) {
					onTick(itemsLeft.length);
					setMaskSize(item.mask);
					setTrianglesPerTriangle(item.triangles);
					setGeneration(generation + 1);
					window.setTimeout(() => {
						zip
							.folder(`blackstonebases-${exportTime}`)
							.file(
								item.name,
								svgDoctype +
									new XMLSerializer().serializeToString(svgWrapper.current),
							);
						exportItem(itemsLeft[0], itemsLeft.slice(1));
					}, 100);
				} else {
					zip.generateAsync({ type: 'blob' }).then((content) => {
						saveAs(content, `blackstonebases-${exportTime}.zip`);
						onComplete();
					});
				}
			};
			exportItem(items[0], items.slice(1));
		},
		[generation, remainingItemsToExport],
	);
	let clipPath = {};
	if (maskSize) {
		if (maskSize === 1) {
			clipPath = {
				clipPath: "url('#round25')",
			};
		} else if (maskSize === 2) {
			clipPath = {
				clipPath: "url('#round32')",
			};
		} else if (maskSize === 3) {
			clipPath = {
				clipPath: "url('#round40')",
			};
		} else if (maskSize === 4) {
			clipPath = {
				clipPath: "url('#round50')",
			};
		}
	}

	return (
		<Container maxWidth="lg">
			<svg
				key={generation}
				ref={svgWrapper}
				height={`${triangleSize * (trianglesPerTriangle * 2) + 20}`}
				width={`${triangleSize * (trianglesPerTriangle * 2) + 20}`}
			>
				<defs>
					<clipPath id="round25">
						<circle
							cx={
								triangleSize * trianglesPerTriangle * Math.sin(toRadians(60)) +
								10
							}
							cy={triangleSize * trianglesPerTriangle + 10}
							fill="#000"
							r={mmToPx(12.5)}
						/>
					</clipPath>
					<clipPath id="round32">
						<circle
							cx={
								triangleSize * trianglesPerTriangle * Math.sin(toRadians(60)) +
								10
							}
							cy={triangleSize * trianglesPerTriangle + 10}
							fill="#000"
							r={mmToPx(16)}
						/>
					</clipPath>
					<clipPath id="round40">
						<circle
							cx={
								triangleSize * trianglesPerTriangle * Math.sin(toRadians(60)) +
								10
							}
							cy={triangleSize * trianglesPerTriangle + 10}
							fill="#000"
							r={mmToPx(20)}
						/>
					</clipPath>
					<clipPath id="round50">
						<circle
							cx={
								triangleSize * trianglesPerTriangle * Math.sin(toRadians(60)) +
								10
							}
							cy={triangleSize * trianglesPerTriangle + 10}
							fill="#000"
							r={mmToPx(25)}
						/>
					</clipPath>
				</defs>
				<g {...clipPath}>
					<g
						transform={`translate(${
							triangleHeight * trianglesPerTriangle + 10
						}, ${triangleSize * trianglesPerTriangle + 10})`}
					>
						{generateArray(6).map((_, triangleIndex) => (
							<g
								key={triangleIndex}
								transform={`rotate(${triangleIndex * 60} 0 0)`}
							>
								{generateArray(trianglesPerTriangle).map((_, columnIndex) => (
									<g
										key={columnIndex}
										transform={`translate(${columnIndex * triangleHeight}, ${
											(columnIndex * triangleSize) / 2
										})`}
									>
										{generateArray(trianglesPerTriangle - columnIndex).map(
											(_, rowIndex) => (
												<React.Fragment key={`${columnIndex}-${rowIndex}`}>
													<TrianglePath
														fillChance={fillChance}
														rowIndex={rowIndex}
														strokeChance={strokeChance}
														triangleSize={triangleSize}
													/>
													{columnIndex !== 0 && (
														<TrianglePath
															fillChance={fillChance}
															isFlipped
															rowIndex={rowIndex}
															strokeChance={strokeChance}
															triangleSize={triangleSize}
														/>
													)}
												</React.Fragment>
											),
										)}
									</g>
								))}
								<line
									stroke="#000"
									strokeWidth="1"
									x1="0"
									x2={
										triangleSize *
										trianglesPerTriangle *
										Math.sin(toRadians(60))
									}
									y1={trianglesPerTriangle * triangleSize}
									y2={(triangleSize * trianglesPerTriangle) / 2}
								/>
							</g>
						))}
					</g>
				</g>
			</svg>
			<Grid container spacing={4}>
				<Grid item md={6} xs={12}>
					<Form
						fillChance={fillChance}
						handleDownload={handleDownload}
						maskSize={maskSize}
						setFillChance={setFillChance}
						setGeneration={() => setGeneration(generation + 1)}
						setMaskSize={setMaskSize}
						setStrokeChance={setStrokeChance}
						setTrianglesPerTriangle={setTrianglesPerTriangle}
						strokeChance={strokeChance}
						trianglesPerTriangle={trianglesPerTriangle}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<BasesTable handleExport={handleExport} />
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
