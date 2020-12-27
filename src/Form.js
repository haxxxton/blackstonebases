import {
	Button,
	ButtonGroup,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Slider,
	Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const masks = [
	{ label: 'No mask', value: 0 },
	{ label: '25mm', value: 1, size: 25 / 2 - 1, maskName: 'round25' },
	{ label: '32mm', value: 2, size: 32 / 2 - 1.5, maskName: 'round32' },
	{ label: '40mm', value: 3, size: 40 / 2 - 2, maskName: 'round40' },
	{ label: '50mm', value: 4, size: 50 / 2 - 2.5, maskName: 'round50' },
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
			<Typography variant="h4">Manual Generation</Typography>
		</Grid>
		<Grid item xs={12}>
			<Divider variant="middle" />
			<Typography gutterBottom>Quick size buttons</Typography>
			<ButtonGroup color="secondary">
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
			<Divider variant="middle" />
			<Typography gutterBottom>
				Mask size - ({masks[maskSize].label})
			</Typography>
			<Grid container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Slider
						color="secondary"
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
			<Divider variant="middle" />
			<Typography gutterBottom>
				Triangles per edge - ({trianglesPerTriangle})
			</Typography>
			<Grid container>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Slider
						color="secondary"
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
			</Grid>
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
				onClick={() => handleDownload()}
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
