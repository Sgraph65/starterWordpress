import { RichText, useBlockProps } from '@wordpress/block-editor';

const PricingSave = ({ attributes }) => {
	const { plans = [] } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-pricing',
	});

	const renderFeatures = (plan) =>
		plan.features
			.split('\n')
			.filter(Boolean)
			.map((feature, idx) => <li key={idx}>{feature}</li>);

	return (
		<div {...blockProps}>
			{plans.map((plan, index) => (
				<div
					className={`mystarter-pricing__card${
						plan.featured ? ' is-featured' : ''
					}`}
					key={index}
				>
					{plan.name ? (
						<RichText.Content tagName="h3" value={plan.name} />
					) : null}
					<div className="mystarter-pricing__price">
						{plan.price ? (
							<RichText.Content tagName="span" value={plan.price} />
						) : null}
						{plan.period ? (
							<RichText.Content tagName="small" value={plan.period} />
						) : null}
					</div>
					{plan.description ? (
						<RichText.Content
							tagName="p"
							className="mystarter-pricing__description"
							value={plan.description}
						/>
					) : null}
					<ul className="mystarter-pricing__features">
						{renderFeatures(plan)}
					</ul>
					{plan.buttonLabel ? (
						<a
							className={`mystarter-button ${
								plan.featured ? 'is-primary' : 'is-secondary'
							}`}
							href={plan.buttonUrl || '#'}
						>
							{plan.buttonLabel}
						</a>
					) : null}
				</div>
			))}
		</div>
	);
};

export default PricingSave;
