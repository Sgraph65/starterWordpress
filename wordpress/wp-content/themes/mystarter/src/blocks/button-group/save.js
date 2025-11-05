import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { buttons, layout } = attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-button-group is-${layout}`,
	});

	if (!buttons?.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			{buttons.map((button, index) => (
				<a
					key={`button-${index}`}
					className={`mystarter-button is-${button.style || 'primary'}`}
					href={button.url || '#'}
					target={button.newTab ? '_blank' : undefined}
					rel={button.newTab ? 'noopener noreferrer' : undefined}
				>
					<RichText.Content tagName="span" value={button.label} />
				</a>
			))}
		</div>
	);
};

export default Save;
