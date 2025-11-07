import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const ColumnSave = () => {
	const blockProps = useBlockProps.save({
		className: 'mystarter-columns-grid__column',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};

export default ColumnSave;
