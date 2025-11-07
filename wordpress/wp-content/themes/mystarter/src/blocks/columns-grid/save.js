import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { columns } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-columns-grid has-${columns}-columns`,
		style: {
			'--mystarter-columns-count': columns,
		},
	});

	return (
		<div {...blockProps}>
			<div className="mystarter-columns-grid__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
