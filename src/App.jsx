import './App.css';

import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	Link,
	Slider,
	Typography,
} from '@mui/material';
import { saveAs } from 'filesaver.js-npm';
import JSZip from 'jszip';
import React, { useCallback, useRef, useState } from 'react';
import svgDownload from 'svg-file-downloader';

import BasesTable from './BasesTable';
import Form, { masks } from './Form';
import Image from './Image';
import basesImg from './images/bases.jpg';
import headerImg from './images/blackstone-logo@2x.png';
import TrianglePath, { toRadians } from './TrianglePath';

const svgDoctype = '<?xml version="1.0" standalone="no"?>\n';

const mmToPx = (mm) => mm * 2.834644252;

const visualScale = 1.728;

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
					zip
						.folder(`blackstonebases-${exportTime}`)
						.file(
							'randomness-settings.txt',
							`Fill Chance: ${fillChance * 100}%\nStroke Change: ${
								strokeChance * 100
							}%`,
						);
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
			<header>
				<img src={headerImg} />
			</header>
			<Grid container>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Typography variant="body1">
						Welcome to Blackstone Bases. Please feel free to use this tool to
						generate SVG images themed for Blackstone Fortress™. You can set
						the amount of “randomness” the triangle designs with the sliders
						below. Then either manually generate single bases or use the
						automated generator to bulk download bases for the list of sets.
					</Typography>
					<Typography component="p" variant="body1">
						If you would like to see some examples of the finished product have
						a look at the{' '}
						<Link
							color="secondary"
							href="https://imgur.com/gallery/9aa66Vc"
							rel="noreferrer"
							target="_blank"
						>
							following gallery on Imgur
						</Link>
						.<br />
						However, I have since repainted this example to look like the
						following:
						<Link href={basesImg}>
							<Image aspectRatio={2016 / 1135} disableSpinner src={basesImg} />
						</Link>
					</Typography>
				</Grid>
				<Grid item xs={12}></Grid>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Divider variant="middle" />
					<Typography gutterBottom>
						Fill Chance - ({Math.floor(fillChance * 100)}%)
					</Typography>
					<Grid container>
						<Grid item xs={1} />
						<Grid item xs={10}>
							<Slider
								color="secondary"
								marks
								max={1}
								min={0}
								onChange={(_, value) => setFillChance(value)}
								onChangeCommitted={(_, value) => setFillChance(value)}
								step={0.05}
								value={fillChance}
								valueLabelDisplay={'auto'}
								valueLabelFormat={(value) => `${Math.floor(value * 100)}%`}
							/>
						</Grid>
					</Grid>
					<Typography gutterBottom>
						Stroke Chance - ({Math.floor(strokeChance * 100)}%)
					</Typography>
					<Grid container>
						<Grid item xs={1} />
						<Grid item xs={10}>
							<Slider
								color="secondary"
								marks
								max={1}
								min={0}
								onChange={(_, value) => setStrokeChance(value)}
								onChangeCommitted={(_, value) => setStrokeChance(value)}
								step={0.05}
								value={strokeChance}
								valueLabelDisplay={'auto'}
								valueLabelFormat={(value) => `${Math.floor(value * 100)}%`}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Card className="lighter-card-bg">
						<Typography align="center">
							<svg
								key={generation}
								ref={svgWrapper}
								className="canvas"
								height={`${
									triangleSize * (trianglesPerTriangle * 2) * visualScale + 20
								}`}
								width={`${
									triangleSize *
										(trianglesPerTriangle * 2) *
										Math.sin(toRadians(60)) *
										visualScale +
									20
								}`}
							>
								<defs>
									{masks.map((mask) => {
										if (mask.value === 0) return null;
										return (
											<clipPath key={mask.value} id={mask.maskName}>
												<circle
													cx={
														triangleSize *
															trianglesPerTriangle *
															Math.sin(toRadians(60)) *
															visualScale +
														10
													}
													cy={
														triangleSize * trianglesPerTriangle * visualScale +
														10
													}
													fill="#000"
													r={mmToPx(mask.size)}
												/>
											</clipPath>
										);
									})}
								</defs>
								{clipPath && maskSize && (
									<circle
										cx={
											triangleSize *
												trianglesPerTriangle *
												Math.sin(toRadians(60)) *
												visualScale +
											10
										}
										cy={triangleSize * trianglesPerTriangle * visualScale + 10}
										fill="none"
										r={mmToPx(masks[maskSize].size)}
										stroke="#000"
										strokeWidth="0.5"
									/>
								)}
								<g {...clipPath}>
									<g
										transform={`translate(${
											triangleHeight * trianglesPerTriangle * visualScale + 10
										}, ${
											triangleSize * trianglesPerTriangle * visualScale + 10
										})`}
									>
										{generateArray(6).map((_, triangleIndex) => (
											<g
												key={triangleIndex}
												transform={`rotate(${triangleIndex * 60} 0 0)`}
											>
												{generateArray(trianglesPerTriangle).map(
													(_, columnIndex) => (
														<g
															key={columnIndex}
															transform={`translate(${
																columnIndex * triangleHeight
															}, ${(columnIndex * triangleSize) / 2})`}
														>
															{generateArray(
																trianglesPerTriangle - columnIndex,
															).map((_, rowIndex) => (
																<React.Fragment
																	key={`${columnIndex}-${rowIndex}`}
																>
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
															))}
														</g>
													),
												)}
												<line
													stroke="#000"
													strokeWidth="0.5"
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
						</Typography>
					</Card>
					<Typography align="center" component="p" variant="caption">
						NB: images will be exported without a background (the background
						above is just to ease visibility). Also due to the slope of GW
						bases, generated round bases are little smaller in diameter than the
						listed base size (as these are designed to be placed on the top of
						the base).
					</Typography>
				</Grid>
			</Grid>
			<Box m={6} />
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
			<Box m={6} />
			<Grid container>
				<Grid item xs={12}>
					<Divider variant="middle" />
				</Grid>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Typography variant="h4">Learnings</Typography>
					<Typography variant="h6">Cricut</Typography>
					<Typography component="p">
						This project was initially intended to help me to cut out the
						generated shapes using a Cricut Maker. However, initial attempts
						found that the SVG’s generated are too complex (even after
						flattening and merging the design into a single shape), and that
						Cricut Design Space (the software used to send cut data to the
						machine) simply wouldnt accept the uploaded files. I did find that I
						had much more success using a transparent PNG.
					</Typography>
					<Typography component="p">
						Cutting 0.7mm thick plasticard, I had decent success using the
						“Plastic Packaging” material option, and then setting the blade
						pressure to “More”. Cricut lists its default Cut Pressure as 314
						with 2x Multi-cut using a Fine-Point Blade.
					</Typography>
				</Grid>
			</Grid>
			<Box m={6} />
			<Grid container>
				<Grid item xs={12}>
					<Divider variant="middle" />
				</Grid>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Typography variant="h4">Upcoming features</Typography>
					<Typography component="p">
						I plan to add the following features based upon requests through
						reddit/facebook groups:
						<ul>
							<li>Custom bulk export options (ie. 100 x 25mm)</li>
							<li>
								Height/Depth map of the shapes to ease creation of 3D files
							</li>
						</ul>
					</Typography>
				</Grid>
			</Grid>
			<Box m={6} />
			<Grid container>
				<Grid item xs={12}>
					<Divider variant="middle" />
				</Grid>
				<Grid item sm={3} />
				<Grid item sm={6} xs={12}>
					<Typography align="center" variant="subtitle1">
						Blackstone Bases built with love by{' '}
						<Link
							color="secondary"
							href="https://github.com/haxxxton"
							rel="noreferrer"
							target="_blank"
						>
							haxxxton
						</Link>
						.
						<br />
						<br />
					</Typography>
					<Typography align="center" variant="caption">
						GW, Games Workshop, Citadel, White Dwarf, Space Marine, 40K,
						Warhammer, Warhammer 40,000, the ‘Aquila’ Double-headed Eagle logo,
						Warhammer Age of Sigmar, Battletome, Stormcast Eternals, and all
						associated logos, illustrations, images, names, creatures, races,
						vehicles, locations, weapons, characters, and the distinctive
						likenesses thereof, are either ® or ™, and/or © Games Workshop
						Limited, variably registered around the world.
					</Typography>
					<Box m={6} />
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
