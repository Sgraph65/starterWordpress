import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_STEP = {
	label: '',
	title: '',
	description: '',
};

const TimelineEdit = ({ attributes, setAttributes }) => {
	const { steps, items = [], layout } = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-timeline is-${layout}`,
	});

	useEffect(() => {
		let nextItems = items.map((item) => ({ ...EMPTY_STEP, ...item }));

		if (nextItems.length < steps) {
			const addition = Array.from({ length: steps - nextItems.length }).map(
				() => ({ ...EMPTY_STEP })
			);
			nextItems = [...nextItems, ...addition];
		} else if (nextItems.length > steps) {
			nextItems = nextItems.slice(0, steps);
		}

		if (
			nextItems.length !== items.length ||
			nextItems.some(
				(item, index) => JSON.stringify(item) !== JSON.stringify(items[index])
			)
		) {
			setAttributes({ items: nextItems });
		}
	}, [steps, items, setAttributes]);

	const updateItem = (index, value) => {
		const nextItems = [...items];
		nextItems[index] = value;
		setAttributes({ items: nextItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Timeline', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre d’étapes', 'mystarter')}
						value={steps}
						onChange={(value) =>
							setAttributes({
								steps: Math.min(Math.max(value || 2, 2), 10),
							})
						}
						min={2}
						max={10}
					/>
					<SelectControl
						label={__('Disposition', 'mystarter')}
						value={layout}
						options={[
							{ label: __('Verticale', 'mystarter'), value: 'vertical' },
							{ label: __('Horizontale', 'mystarter'), value: 'horizontal' },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<PanelBody
						key={`step-${index}`}
						title={__('Étape', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<TextControl
							label={__('Label court', 'mystarter')}
							value={item.label}
							onChange={(value) =>
								updateItem(index, { ...item, label: value })
							}
						/>
						<TextControl
							label={__('Titre', 'mystarter')}
							value={item.title}
							onChange={(value) =>
								updateItem(index, { ...item, title: value })
							}
						/>
						<BaseControl
							label={__('Description', 'mystarter')}
							help={__('Rédigez la description complète.', 'mystarter')}
						>
							<RichText
								tagName="div"
								className="mystarter-timeline__richtext"
								value={item.description}
								onChange={(value) =>
									updateItem(index, { ...item, description: value })
								}
								placeholder={__('Description…', 'mystarter')}
								allowedFormats={[
									'core/bold',
									'core/italic',
									'core/link',
									'core/underline',
								]}
							/>
						</BaseControl>
					</PanelBody>
				))}
			</InspectorControls>

			<ol {...blockProps}>
				{items.map((item, index) => (
					<li className="mystarter-timeline__step" key={index}>
						{item.label ? (
							<span className="mystarter-timeline__label">{item.label}</span>
						) : null}
						{item.title ? (
							<h3>{item.title}</h3>
						) : (
							<span className="mystarter-placeholder">
								{__('Titre de l’étape', 'mystarter')}
							</span>
						)}
						{item.description ? (
							<RichText.Content
								tagName="div"
								className="mystarter-timeline__content"
								value={item.description}
							/>
						) : (
							<p className="mystarter-placeholder">
								{__('Description…', 'mystarter')}
							</p>
						)}
					</li>
				))}
			</ol>
		</Fragment>
	);
};

export default TimelineEdit;
