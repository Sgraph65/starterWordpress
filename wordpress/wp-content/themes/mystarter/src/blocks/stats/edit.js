import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	RangeControl,
	TextControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_STAT = {
	value: '',
	label: '',
	description: '',
};

const StatsEdit = ({ attributes, setAttributes }) => {
	const { count, items = [] } = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-stats has-${count}-items`,
	});

	useEffect(() => {
		let next = items.map((item) => ({ ...EMPTY_STAT, ...item }));

		if (next.length < count) {
			const addition = Array.from({ length: count - next.length }).map(
				() => ({ ...EMPTY_STAT })
			);
			next = [...next, ...addition];
		} else if (next.length > count) {
			next = next.slice(0, count);
		}

		if (
			next.length !== items.length ||
			next.some(
				(item, index) => JSON.stringify(item) !== JSON.stringify(items[index])
			)
		) {
			setAttributes({ items: next });
		}
	}, [count, items, setAttributes]);

	const updateItem = (index, value) => {
		const next = [...items];
		next[index] = value;
		setAttributes({ items: next });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Réglages', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de stats', 'mystarter')}
						value={count}
						onChange={(value) =>
							setAttributes({
								count: Math.min(Math.max(value || 2, 2), 6),
							})
						}
						min={2}
						max={6}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<PanelBody
						key={`stat-${index}`}
						title={__('Stat', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<TextControl
							label={__('Valeur', 'mystarter')}
							value={item.value}
							onChange={(value) =>
								updateItem(index, { ...item, value: value })
							}
						/>
						<TextControl
							label={__('Label', 'mystarter')}
							value={item.label}
							onChange={(value) =>
								updateItem(index, { ...item, label: value })
							}
						/>
						<BaseControl label={__('Description', 'mystarter')}>
							<RichText
								tagName="div"
								className="mystarter-stats__richtext"
								value={item.description}
								onChange={(value) =>
									updateItem(index, { ...item, description: value })
								}
								placeholder={__('Description…', 'mystarter')}
							/>
						</BaseControl>
					</PanelBody>
				))}
			</InspectorControls>

			<div {...blockProps}>
				{items.map((item, index) => (
					<div className="mystarter-stats__item" key={index}>
						{item.value ? (
							<div className="mystarter-stats__value">{item.value}</div>
						) : (
							<span className="mystarter-placeholder">
								{__('Valeur', 'mystarter')}
							</span>
						)}
						{item.label ? (
							<div className="mystarter-stats__label">{item.label}</div>
						) : (
							<span className="mystarter-placeholder">
								{__('Label', 'mystarter')}
							</span>
						)}
						{item.description ? (
							<RichText.Content
								tagName="p"
								className="mystarter-stats__description"
								value={item.description}
							/>
						) : (
							<p className="mystarter-placeholder">
								{__('Ajoutez une description', 'mystarter')}
							</p>
						)}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default StatsEdit;
