import { RichText, useBlockProps } from '@wordpress/block-editor';

const TestimonialsSave = ({ attributes }) => {
	const { items = [], autoplay, interval } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-testimonials',
		'data-autoplay': autoplay,
		'data-interval': interval,
	});

	if (!items.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			<div className="mystarter-testimonials__viewport">
				<div className="mystarter-testimonials__slides">
					{items.map((item, index) => (
						<article className="mystarter-testimonials__slide" key={index}>
							{item.quote ? (
								<RichText.Content tagName="blockquote" value={item.quote} />
							) : null}
							<div className="mystarter-testimonials__author">
								{item.avatarUrl ? (
									<img
										src={item.avatarUrl}
										alt={item.avatarAlt || ''}
										loading="lazy"
									/>
								) : null}
								<div>
									{item.author ? <strong>{item.author}</strong> : null}
									{item.role || item.company ? (
										<span>
											{[item.role, item.company].filter(Boolean).join(' • ')}
										</span>
									) : null}
								</div>
							</div>
						</article>
					))}
				</div>
				<button
					type="button"
					className="mystarter-testimonials__control is-prev"
					aria-label="Témoignage précédent"
				>
					‹
				</button>
				<button
					type="button"
					className="mystarter-testimonials__control is-next"
					aria-label="Témoignage suivant"
				>
					›
				</button>
			</div>
			<div className="mystarter-testimonials__dots" aria-hidden="true" />
		</div>
	);
};

export default TestimonialsSave;
