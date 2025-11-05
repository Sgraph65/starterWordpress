import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { slides, autoplay, interval } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-block mystarter-block-slider',
		'data-autoplay': autoplay,
		'data-interval': interval,
	});

	if (!slides?.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			<div className="mystarter-block-slider__viewport">
				<div className="mystarter-block-slider__slides">
					{slides.map((slide, index) => (
						<figure
							className="mystarter-block-slider__slide"
							key={slide.id || index}
						>
							{slide.url ? (
								<img
									src={slide.url}
									alt={slide.alt}
									loading="lazy"
								/>
							) : null}
							{slide.caption ? (
								<RichText.Content
									tagName="figcaption"
									value={slide.caption}
								/>
							) : null}
						</figure>
					))}
				</div>
				<button
					type="button"
					className="mystarter-block-slider__control is-prev"
					aria-label="Slide précédent"
				>
					<span aria-hidden="true">‹</span>
				</button>
				<button
					type="button"
					className="mystarter-block-slider__control is-next"
					aria-label="Slide suivant"
				>
					<span aria-hidden="true">›</span>
				</button>
			</div>
			<div className="mystarter-block-slider__dots" aria-hidden="true" />
		</div>
	);
};

export default Save;
