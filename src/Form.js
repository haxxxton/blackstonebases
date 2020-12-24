import {
	Button,
	ButtonGroup,
	Checkbox,
	FormControlLabel,
	Grid,
	Slider,
	Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const masks = [
	{ label: 'No mask', value: 0 },
	{ label: '25mm', value: 1 },
	{ label: '32mm', value: 2 },
	{ label: '40mm', value: 3 },
	{ label: '50mm', value: 4 },
];

const Form = ({
	fillChance,
	handleDownload,
	setFillChance,
	setGeneration,
	setStrokeChance,
	setTrianglesPerTriangle,
	maskSize,
	setMaskSize,
	strokeChance,
	trianglesPerTriangle,
}) => (
	<Grid container>
		<Grid item xs={12}>
			<Typography gutterBottom>
				Mask size - ({masks[maskSize].label})
			</Typography>
			<Grid container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Slider
						marks={masks}
						max={masks.length - 1}
						min={0}
						onChange={(_, value) => setMaskSize(value)}
						onChangeCommitted={(_, value) => setMaskSize(value)}
						step={null}
						value={maskSize}
						valueLabelDisplay={'auto'}
					/>
				</Grid>
			</Grid>
		</Grid>
		<Grid item xs={12}>
			<Typography gutterBottom>Quick size buttons</Typography>
			<ButtonGroup color="primary">
				<Button
					onClick={() => {
						setTrianglesPerTriangle(3);
						setMaskSize(1);
					}}
				>
					25mm round base
				</Button>
				<Button
					onClick={() => {
						setTrianglesPerTriangle(3);
						setMaskSize(2);
					}}
				>
					32mm round base
				</Button>
				<Button
					onClick={() => {
						setTrianglesPerTriangle(4);
						setMaskSize(3);
					}}
				>
					40mm round base
				</Button>
				<Button
					onClick={() => {
						setTrianglesPerTriangle(5);
						setMaskSize(4);
					}}
				>
					50mm round base
				</Button>
				<Button
					onClick={() => {
						setTrianglesPerTriangle(6);
						setMaskSize(0);
					}}
				>
					80mm hex base
				</Button>
			</ButtonGroup>
		</Grid>
		<Grid item xs={12}>
			<Typography gutterBottom>
				Triangles per edge - ({trianglesPerTriangle})
			</Typography>
			<Slider
				marks
				max={10}
				min={2}
				onChange={(_, value) => setTrianglesPerTriangle(value)}
				onChangeCommitted={(_, value) => setTrianglesPerTriangle(value)}
				step={1}
				value={trianglesPerTriangle}
				valueLabelDisplay={'auto'}
			/>
		</Grid>
		<Grid item xs={12}>
			<Typography gutterBottom>
				Fill Chance - ({Math.floor(fillChance * 100)}%)
			</Typography>
			<Slider
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
		<Grid item xs={12}>
			<Typography gutterBottom>
				Stroke Chance - ({Math.floor(strokeChance * 100)}%)
			</Typography>
			<Slider
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
		<Grid item xs={6}>
			<Button
				color="primary"
				fullWidth
				onClick={setGeneration}
				variant="contained"
			>
				Regenerate
			</Button>
		</Grid>
		<Grid item xs={6}>
			<Button
				color="secondary"
				fullWidth
				onClick={handleDownload}
				variant="contained"
			>
				Download
			</Button>
		</Grid>
	</Grid>
);

Form.propTypes = {
	fillChance: PropTypes.number.isRequired,
	handleDownload: PropTypes.func.isRequired,
	setFillChance: PropTypes.func.isRequired,
	setGeneration: PropTypes.func.isRequired,
	setStrokeChance: PropTypes.func.isRequired,
	setTrianglesPerTriangle: PropTypes.func.isRequired,
	maskSize: PropTypes.number.isRequired,
	setMaskSize: PropTypes.func.isRequired,
	strokeChance: PropTypes.number.isRequired,
	trianglesPerTriangle: PropTypes.number.isRequired,
};

export default Form;
