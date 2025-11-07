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
	TextareaControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_PLAN = {
	name: '',
	price: '',
	period: '',
	description: '',
	features: '',
	buttonLabel: '',
	buttonUrl: '',
	featured: false,
};

const PricingEdit = ({ attributes, setAttributes }) => {
	const { count, plans = [] } = attributes;

	const blockProps = useBlockProps({
		className: 'mystarter-pricing',
	});

	useEffect(() => {
		let next = plans.map((plan) => ({ ...EMPTY_PLAN, ...plan }));

		if (next.length < count) {
			const addition = Array.from({ length: count - next.length }).map(
				() => ({ ...EMPTY_PLAN })
			);
			next = [...next, ...addition];
		} else if (next.length > count) {
			next = next.slice(0, count);
		}

		if (
			next.length !== plans.length ||
			next.some(
				(plan, index) => JSON.stringify(plan) !== JSON.stringify(plans[index])
			)
		) {
			setAttributes({ plans: next });
		}
	}, [count, plans, setAttributes]);

	const updatePlan = (index, value) => {
		const next = [...plans];
		next[index] = value;
		setAttributes({ plans: next });
	};

	const featureList = (plan) =>
		plan.features
			.split('\n')
			.filter(Boolean)
			.map((feature, idx) => <li key={idx}>{feature}</li>);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Réglages', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de plans', 'mystarter')}
						value={count}
						onChange={(value) =>
							setAttributes({
								count: Math.min(Math.max(value || 1, 1), 4),
							})
						}
						min={1}
						max={4}
					/>
				</PanelBody>

				{plans.map((plan, index) => (
					<PanelBody
						key={`plan-${index}`}
						title={__('Offre', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<TextControl
							label={__('Nom du plan', 'mystarter')}
							value={plan.name}
							onChange={(value) =>
								updatePlan(index, { ...plan, name: value })
							}
						/>
						<TextControl
							label={__('Prix', 'mystarter')}
							value={plan.price}
							onChange={(value) =>
								updatePlan(index, { ...plan, price: value })
							}
							placeholder="49€"
						/>
						<TextControl
							label={__('Période', 'mystarter')}
							value={plan.period}
							onChange={(value) =>
								updatePlan(index, { ...plan, period: value })
							}
							placeholder={__('par mois', 'mystarter')}
						/>
						<BaseControl label={__('Description', 'mystarter')}>
							<RichText
								tagName="div"
								className="mystarter-pricing__richtext"
								value={plan.description}
								onChange={(value) =>
									updatePlan(index, { ...plan, description: value })
								}
								placeholder={__('Petite description…', 'mystarter')}
							/>
						</BaseControl>
						<TextareaControl
							label={__('Liste d’avantages (1 par ligne)', 'mystarter')}
							value={plan.features}
							onChange={(value) =>
								updatePlan(index, { ...plan, features: value })
							}
						/>
						<TextControl
							label={__('Libellé du bouton', 'mystarter')}
							value={plan.buttonLabel}
							onChange={(value) =>
								updatePlan(index, { ...plan, buttonLabel: value })
							}
						/>
						<TextControl
							label={__('Lien du bouton', 'mystarter')}
							value={plan.buttonUrl}
							onChange={(value) =>
								updatePlan(index, { ...plan, buttonUrl: value })
							}
							placeholder="https://"
						/>
						<ToggleControl
							label={__('Mettre en avant ce plan', 'mystarter')}
							checked={plan.featured}
							onChange={(value) =>
								updatePlan(index, { ...plan, featured: value })
							}
						/>
					</PanelBody>
				))}
			</InspectorControls>

			<div {...blockProps}>
				{plans.map((plan, index) => {
					const planFeatures = featureList(plan);

					return (
						<div
							className={`mystarter-pricing__card${
								plan.featured ? ' is-featured' : ''
							}`}
							key={index}
						>
						{plan.name ? (
							<h3>{plan.name}</h3>
						) : (
							<span className="mystarter-placeholder">
								{__('Nom du plan', 'mystarter')}
							</span>
						)}
						<div className="mystarter-pricing__price">
							<span>{plan.price || '49€'}</span>
							<small>
								{plan.period || __('par mois', 'mystarter')}
							</small>
						</div>
						{plan.description ? (
							<RichText.Content
								tagName="p"
								className="mystarter-pricing__description"
								value={plan.description}
							/>
						) : (
							<p className="mystarter-placeholder">
								{__('Ajoutez une description', 'mystarter')}
							</p>
						)}
						<ul className="mystarter-pricing__features">
							{planFeatures.length ? (
								planFeatures
							) : (
								<li className="mystarter-placeholder">
									{__('Ajoutez des avantages', 'mystarter')}
								</li>
							)}
						</ul>
						<span
							className={`mystarter-button ${
								plan.featured ? 'is-primary' : 'is-secondary'
							}`}
						>
							{plan.buttonLabel || __('Bouton', 'mystarter')}
						</span>
						</div>
					);
				})}
			</div>
		</Fragment>
	);
};

export default PricingEdit;
