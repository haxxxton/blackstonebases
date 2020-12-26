import PropTypes from 'prop-types';
import React from 'react';

export const toRadians = (degrees) => Math.PI * (degrees / 180);

const chanceForOutlined = 2 / 3;
const changeForSolid = 1 / 2;

const pathString = (triangleSize) =>
	`M 0 0 L 0 ${triangleSize} L ${triangleSize * Math.sin(toRadians(60))} ${
		triangleSize / 2
	} z`;

const getStroke = (strokeChance) => {
	if (Math.random() <= strokeChance) {
		return '#000';
	}
	return void 0;
};

const getFill = (fillChance) => {
	if (Math.random() <= fillChance) {
		return '#000';
	}
	return 'none';
};

const getStyles = (fillChance, strokeChance) => {
	const fill = getFill(fillChance);
	if (fill === 'none') {
		return {
			stroke: getStroke(strokeChance),
			fill,
		};
	}
	return {
		stroke: '#000',
		fill,
	};
};

const TrianglePath = ({
	rowIndex,
	isFlipped,
	triangleSize,
	fillChance,
	strokeChance,
}) => (
	<path
		d={pathString(triangleSize)}
		{...getStyles(fillChance, strokeChance)}
		strokeWidth="0.5"
		transform={`translate(0, ${rowIndex * triangleSize}) scale(${
			isFlipped ? -1 : 1
		}, 1)`}
	/>
);

TrianglePath.propTypes = {
	rowIndex: PropTypes.number.isRequired,
	isFlipped: PropTypes.bool,
	fillChance: PropTypes.number.isRequired,
	strokeChance: PropTypes.number.isRequired,
	triangleSize: PropTypes.number.isRequired,
};

export default TrianglePath;
