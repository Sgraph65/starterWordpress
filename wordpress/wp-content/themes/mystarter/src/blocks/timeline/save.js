import { RichText, useBlockProps } from '@wordpress/block-editor';

const TimelineSave = ({ attributes }) => {
	const { layout, columns, items = [] } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-timeline is-${layout}`,
	});

	return (
		<ol {...blockProps}>
			{items.map((item, index) => (
				<li className="mystarter-timeline__step" key={index}>
					{item.label ? (
						<span className="mystarter-timeline__label">{item.label}</span>
					) : null}
					{item.title ? <RichText.Content tagName="h3" value={item.title} /> : null}
					{item.description ? (
						<RichText.Content
							tagName="div"
							className="mystarter-timeline__content"
							value={item.description}
						/>
					) : null}
				</li>
			))}
		</ol>
	);
};

export default TimelineSave;
