import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	LinearProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const zeroPadding = (
	input: number = 0,
	width: number = 4,
	zero: string | number = '0',
) => {
	const inputString = String(input);
	if (inputString.length >= width) {
		return inputString;
	}
	return (
		new Array(width - inputString.length + 1).join(String(zero)) + inputString
	);
};

const getItemsToExport = (exportedSets) => {
	return exportedSets.reduce(
		(setAcc, set) =>
			setAcc.concat(
				set.sizes.reduce(
					(sizeAcc, size) =>
						sizeAcc.concat(
							[...Array(size.count)].map((_, index) => ({
								...size,
								name: `${set.slug}/base-${size.name}-${zeroPadding(
									index,
									2,
								)}.svg`,
							})),
						),
					[],
				),
			),
		[],
	);
};

const ExportModal = ({
	handleExport,
	resetSelectedSets,
	exportedSets,
	isOpen,
	onClose,
}) => {
	const [itemsToExport, setItemsToExport] = useState([]);
	const [isExporting, setIsExporting] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (isExporting) {
			console.log(itemsToExport);
			handleExport(
				itemsToExport,
				(itemsLeftLength) => {
					setProgress((1 - itemsLeftLength / itemsToExport.length) * 100);
				},
				() => {
					setIsExporting(false);
					onClose();
				},
			);
		} else {
			setProgress(0);
		}
	}, [isExporting, itemsToExport]);

	useEffect(() => {
		if (!isOpen) {
			setItemsToExport([]);
			setIsExporting(false);
			setProgress(0);
		}
	}, [isOpen, resetSelectedSets]);

	useEffect(() => {
		setItemsToExport(getItemsToExport(exportedSets));
		setProgress(0);
	}, [exportedSets]);

	return (
		<Dialog fullWidth maxWidth="sm" onClose={onClose} open={isOpen}>
			<DialogTitle>Bulk download</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You are about to start the download of a zip containing{' '}
					{itemsToExport.length} files.
				</DialogContentText>
				{isExporting && (
					<LinearProgress value={progress} variant="determinate" />
				)}
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					disabled={isExporting}
					onClick={() => setIsExporting(!isExporting)}
					variant="contained"
				>
					Download
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ExportModal.propTypes = {
	exportedSets: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			sizes: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					count: PropTypes.number.isRequired,
					mask: PropTypes.number.isRequired,
					triangles: PropTypes.number.isRequired,
				}).isRequired,
			).isRequired,
		}).isRequired,
	),
	resetSelectedSets: PropTypes.func.isRequired,
	handleExport: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ExportModal;
