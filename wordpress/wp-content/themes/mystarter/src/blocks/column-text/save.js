import { RichText, useBlockProps } from '@wordpress/block-editor';

import { PRESET_ICONS_MAP } from './icons';

const renderIcon = (item) => {
	if (!item.showIcon) {
		return null;
	}

	if (item.iconType === 'image' && item.imageUrl) {
		return (
			<span className="mystarter-two-column__icon is-image">
				<img src={item.imageUrl} alt="" loading="lazy" />
			</span>
		);
	}

	if (item.iconType === 'preset' && item.presetIcon) {
		const preset = PRESET_ICONS_MAP[item.presetIcon];

		if (preset?.src) {
			return (
				<span className="mystarter-two-column__icon is-image">
					<img src={preset.src} alt="" loading="lazy" />
				</span>
			);
		}
	}

	return (
		<span className="mystarter-two-column__icon">
			<span
				className={`dashicons dashicons-${item.dashicon || 'star-filled'}`}
				aria-hidden="true"
			/>
		</span>
	);
};

const Save = ({ attributes }) => {
	const { columns, items = [] } = attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-two-column has-${columns}-columns`,
		style: {
			'--mystarter-columns-count': columns,
		},
	});

	return (
		<section {...blockProps}>
			{items.map((item, index) => (
				<div className="mystarter-two-column__column" key={index}>
					{renderIcon(item)}
					{item.title ? (
						<RichText.Content tagName="h3" value={item.title} />
					) : null}
					{item.content ? (
						<RichText.Content
							tagName="div"
							className="mystarter-two-column__content"
							value={item.content}
						/>
					) : null}
				</div>
			))}
		</section>
	);
};

export default Save;
