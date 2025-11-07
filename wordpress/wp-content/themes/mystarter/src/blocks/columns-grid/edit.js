import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockEditContext,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

const ColumnsGridEdit = ({ attributes, setAttributes }) => {
	const { columns } = attributes;
	const { clientId } = useBlockEditContext();
	const blockProps = useBlockProps({
		className: `mystarter-columns-grid has-${columns}-columns`,
		style: {
			'--mystarter-columns-count': columns,
		},
	});

	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId) || [],
		[clientId]
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	useEffect(() => {
		const diff = columns - innerBlocks.length;

		if (diff === 0) {
			return;
		}

		if (diff > 0) {
			const addition = Array.from({ length: diff }).map(() =>
				createBlock('mystarter/columns-grid-column')
			);
			replaceInnerBlocks(
				clientId,
				[...innerBlocks, ...addition],
				false
			);
		} else {
			replaceInnerBlocks(
				clientId,
				innerBlocks.slice(0, columns),
				false
			);
		}
	}, [columns, innerBlocks, replaceInnerBlocks, clientId]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Configuration', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de colonnes', 'mystarter')}
						value={columns}
						onChange={(value) =>
							setAttributes({
								columns: Math.min(Math.max(value || 1, 1), 6),
							})
						}
						min={1}
						max={6}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mystarter-columns-grid__inner">
					<InnerBlocks
						allowedBlocks={['mystarter/columns-grid-column']}
						templateLock="all"
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default ColumnsGridEdit;
