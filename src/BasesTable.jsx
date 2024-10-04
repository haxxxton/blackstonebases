import { ChangeHistory, ChangeHistoryTwoTone } from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	Divider,
	Grid,
	Hidden,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ExportModal from './ExportModal';

const boxes = [
	{
		name: 'Core',
		slug: 'core',
		sizes: [
			{
				name: '25mm',
				mask: 1,
				triangles: 3,
				count: 24,
			},
			{
				name: '32mm',
				mask: 2,
				triangles: 3,
				count: 19,
			},
			{
				name: '40mm',
				mask: 3,
				triangles: 4,
				count: 1,
			},
		],
	},
	{
		name: 'Escalation',
		slug: 'escalation',
		sizes: [
			{
				name: '25mm',
				mask: 1,
				triangles: 3,
				count: 7,
			},
			{
				name: '32mm',
				mask: 2,
				triangles: 3,
				count: 6,
			},
		],
	},
	{
		name: 'Ascension',
		slug: 'ascension',
		sizes: [
			{
				name: '50mm',
				mask: 4,
				triangles: 5,
				count: 2,
			},
		],
	},
	{
		name: 'Traitor Command',
		slug: 'traitor-command',
		sizes: [
			{
				name: '32mm',
				mask: 2,
				triangles: 3,
				count: 1,
			},
			{
				name: '40mm',
				mask: 3,
				triangles: 4,
				count: 1,
			},
		],
	},
	{
		name: 'No Respite',
		slug: 'no-respite',
		sizes: [
			{
				name: '25mm',
				mask: 1,
				triangles: 3,
				count: 6,
			},
			{
				name: '32mm',
				mask: 2,
				triangles: 3,
				count: 3,
			},
		],
	},
	{
		name: 'The Dreaded Ambull',
		slug: 'the-dreaded-ambull',
		sizes: [
			{
				name: '25mm',
				mask: 1,
				triangles: 3,
				count: 2,
			},
			{
				name: '50mm',
				mask: 4,
				triangles: 5,
				count: 1,
			},
		],
	},
	{
		name: 'Deadly Alliance',
		slug: 'deadly-alliance',
		sizes: [
			{
				name: '50mm',
				mask: 4,
				triangles: 5,
				count: 1,
			},
		],
	},
	{
		name: 'Annual & WD Explorers',
		slug: 'annual-wd-explorers',
		sizes: [
			{
				name: '25mm',
				mask: 1,
				triangles: 3,
				count: 2,
			},
			{
				name: '32mm',
				mask: 2,
				triangles: 3,
				count: 2,
			},
			{
				name: '40mm',
				mask: 2,
				triangles: 3,
				count: 5,
			},
		],
	},
];

const BasesTable = ({ handleExport }) => {
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);
	const [exportedSets, setExportedSets] = useState([]);

	const handleBoxCheck = ({ target: { checked } }, box) => {
		if (checked) {
			// add to list of sets
			setExportedSets(exportedSets.concat(box));
		} else {
			// remove from list of sets
			setExportedSets(exportedSets.filter((set) => set.slug !== box.slug));
		}
	};

	return (
		<React.Fragment>
			<Hidden smUp>
				<Box m={6} />
			</Hidden>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h4">Automatic Generation</Typography>
					<Divider variant="middle" />
				</Grid>
			</Grid>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Checkbox
								checked={exportedSets.length === boxes.length}
								checkedIcon={<ChangeHistoryTwoTone />}
								color="secondary"
								icon={<ChangeHistory />}
								onChange={({ target: { checked } }) => {
									if (checked) {
										setExportedSets(boxes);
									} else {
										setExportedSets([]);
									}
								}}
							/>
						</TableCell>
						<TableCell>
							<Typography variant="subtitle1">Boxed Game</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="subtitle1">Size</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="subtitle1">Count</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{boxes.map((box, boxIndex) => (
						<React.Fragment key={box.name}>
							{box.sizes.map((size, sizeIndex) => (
								<TableRow key={size.name}>
									{sizeIndex === 0 && (
										<>
											<TableCell rowSpan={box.sizes.length}>
												<Checkbox
													checked={
														!!exportedSets.find((set) => set.slug === box.slug)
													}
													checkedIcon={<ChangeHistoryTwoTone />}
													color="secondary"
													icon={<ChangeHistory />}
													onChange={(e) => handleBoxCheck(e, box)}
												/>
											</TableCell>
											<TableCell rowSpan={box.sizes.length}>
												<strong>{box.name}</strong>
											</TableCell>
										</>
									)}
									<TableCell>{size.name}</TableCell>
									<TableCell>{size.count}</TableCell>
								</TableRow>
							))}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
			<Button
				color="secondary"
				disabled={exportedSets.length === 0}
				fullWidth
				onClick={() => {
					setIsExportModalOpen(true);
				}}
				variant="contained"
			>
				Bulk download selected sets
			</Button>
			<ExportModal
				exportedSets={exportedSets}
				handleExport={handleExport}
				isOpen={isExportModalOpen}
				onClose={() => {
					setIsExportModalOpen(false);
					setExportedSets([]);
				}}
				resetSelectedSets={() => setExportedSets([])}
			/>
		</React.Fragment>
	);
};

BasesTable.propTypes = {
	handleExport: PropTypes.func.isRequired,
};

export default BasesTable;
