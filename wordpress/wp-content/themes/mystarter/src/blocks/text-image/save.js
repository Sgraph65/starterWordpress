import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { title, content, mediaUrl, mediaAlt, imagePosition, background } =
		attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-text-image has-${imagePosition}-image has-${background}-background`,
	});

	return (
		<section {...blockProps}>
			{mediaUrl ? (
				<div className="mystarter-text-image__media">
					<img src={mediaUrl} alt={mediaAlt} loading="lazy" />
				</div>
			) : null}
			<div className="mystarter-text-image__content">
				{title ? <RichText.Content tagName="h2" value={title} /> : null}
				{content ? (
					<RichText.Content
						tagName="div"
						value={content}
						className="mystarter-text-image__content"
					/>
				) : null}
			</div>
		</section>
	);
};

export default Save;
