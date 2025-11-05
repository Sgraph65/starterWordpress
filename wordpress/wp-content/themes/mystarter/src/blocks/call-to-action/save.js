import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const {
		eyebrow,
		title,
		content,
		buttonText,
		buttonUrl,
		openInNewTab,
		accent,
		backgroundImageUrl,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-cta has-${accent}-accent`,
		style: backgroundImageUrl
			? {
					backgroundImage: `url(${backgroundImageUrl})`,
				}
			: undefined,
	});

	return (
		<section {...blockProps}>
			<div className="mystarter-cta__overlay" />
			<div className="mystarter-cta__inner">
				{eyebrow ? (
					<RichText.Content
						tagName="span"
						className="mystarter-cta__eyebrow"
						value={eyebrow}
					/>
				) : null}
				{title ? <RichText.Content tagName="h2" value={title} /> : null}
				{content ? (
					<RichText.Content
						tagName="div"
						className="mystarter-cta__content"
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
						<RichText.Content tagName="span" value={buttonText} />
					</a>
				) : null}
			</div>
		</section>
	);
};

export default Save;
