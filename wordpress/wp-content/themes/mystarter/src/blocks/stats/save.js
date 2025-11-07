import { RichText, useBlockProps } from '@wordpress/block-editor';

const StatsSave = ({ attributes }) => {
	const { count, items = [] } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-stats has-${count}-items`,
	});

	return (
		<div {...blockProps}>
			{items.map((item, index) => (
				<div className="mystarter-stats__item" key={index}>
					{item.value ? (
						<RichText.Content
							tagName="div"
							className="mystarter-stats__value"
							value={item.value}
						/>
					) : null}
					{item.label ? (
						<RichText.Content
							tagName="div"
							className="mystarter-stats__label"
							value={item.label}
						/>
					) : null}
					{item.description ? (
						<RichText.Content
							tagName="p"
							className="mystarter-stats__description"
							value={item.description}
						/>
					) : null}
				</div>
			))}
		</div>
	);
};

export default StatsSave;
