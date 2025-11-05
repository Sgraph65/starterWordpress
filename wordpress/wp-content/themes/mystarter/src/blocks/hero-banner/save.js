import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const {
		layout,
		eyebrow,
		title,
		content,
		buttonText,
		buttonUrl,
		openInNewTab,
		mediaUrl,
		mediaAlt,
		videoUrl,
		slides,
		sliderAutoplay,
		sliderInterval,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-hero is-layout-${layout}`,
		...(layout === 'slider'
			? {
					'data-autoplay': sliderAutoplay,
					'data-interval': sliderInterval,
				}
			: {}),
	});

	if (layout === 'slider') {
		return (
			<section {...blockProps}>
				<div className="mystarter-hero__slider-viewport">
					<div className="mystarter-hero__slides">
						{slides.map((slide, index) => (
							<article
								className="mystarter-hero__slide"
								key={slide.mediaUrl || index}
							>
								{slide.mediaUrl ? (
									<div className="mystarter-hero__slide-background">
										<img
											src={slide.mediaUrl}
											alt={slide.mediaAlt}
											loading="lazy"
										/>
									</div>
								) : null}
								<div className="mystarter-hero__slide-overlay" />
								<div className="mystarter-hero__slide-inner">
									{slide.eyebrow ? (
										<span className="mystarter-hero__eyebrow">
											{slide.eyebrow}
										</span>
									) : null}
									{slide.title ? (
										<RichText.Content
											tagName="h2"
											value={slide.title}
										/>
									) : null}
									{slide.content ? (
										<RichText.Content
											tagName="div"
											className="mystarter-hero__content"
											value={slide.content}
										/>
									) : null}
									{slide.buttonText ? (
										<a
											className="mystarter-button is-primary"
											href={slide.buttonUrl || '#'}
											target={
												slide.openInNewTab
													? '_blank'
													: undefined
											}
											rel={
												slide.openInNewTab
													? 'noopener noreferrer'
													: undefined
											}
										>
											{slide.buttonText}
										</a>
									) : null}
								</div>
							</article>
						))}
					</div>
					<button
						type="button"
						className="mystarter-hero__control is-prev"
						aria-label="Slide précédente"
					>
						<span aria-hidden="true">‹</span>
					</button>
					<button
						type="button"
						className="mystarter-hero__control is-next"
						aria-label="Slide suivante"
					>
						<span aria-hidden="true">›</span>
					</button>
				</div>
				<div className="mystarter-hero__dots" aria-hidden="true" />
			</section>
		);
	}

	return (
		<section {...blockProps}>
			{layout === 'video' ? (
				<div className="mystarter-hero__video">
					{videoUrl ? (
						<video src={videoUrl} autoPlay muted loop playsInline />
					) : null}
				</div>
			) : null}

			{layout === 'static' && mediaUrl ? (
				<div className="mystarter-hero__media">
					<img src={mediaUrl} alt={mediaAlt} loading="lazy" />
				</div>
			) : null}

			<div className="mystarter-hero__overlay" />

			<div className="mystarter-hero__inner">
				{eyebrow ? (
					<RichText.Content
						tagName="span"
						className="mystarter-hero__eyebrow"
						value={eyebrow}
					/>
				) : null}
				{title ? <RichText.Content tagName="h1" value={title} /> : null}
				{content ? (
					<RichText.Content
						tagName="div"
						className="mystarter-hero__content"
						value={content}
					/>
				) : null}
				{buttonText ? (
					<a
						className="mystarter-button is-primary"
						href={buttonUrl || '#'}
						target={openInNewTab ? '_blank' : undefined}
						rel={openInNewTab ? 'noopener noreferrer' : undefined}
					>
						{buttonText}
					</a>
				) : null}
			</div>
		</section>
	);
};

export default Save;
