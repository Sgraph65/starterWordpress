import { RichText, useBlockProps } from '@wordpress/block-editor';

const HeroSplitSave = ({ attributes }) => {
	const { eyebrow, title, content, ctaLabel, ctaUrl, mediaUrl, mediaAlt, layout } =
		attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-hero-split has-${layout}`,
	});

	return (
		<section {...blockProps}>
			<div className="mystarter-hero-split__content-wrap">
				{eyebrow ? (
					<p className="mystarter-hero-split__eyebrow">{eyebrow}</p>
				) : null}
				{title ? <h1>{title}</h1> : null}
				{content ? (
					<RichText.Content
						tagName="div"
						className="mystarter-hero-split__content"
						value={content}
					/>
				) : null}
				{ctaLabel ? (
					<a className="mystarter-button is-primary" href={ctaUrl || '#'}>
						{ctaLabel}
					</a>
				) : null}
			</div>
			<div className="mystarter-hero-split__media">
				{mediaUrl ? <img src={mediaUrl} alt={mediaAlt || ''} loading="lazy" /> : null}
			</div>
		</section>
	);
};

export default HeroSplitSave;
