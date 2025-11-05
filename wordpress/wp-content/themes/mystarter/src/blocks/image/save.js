import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { mediaUrl, alt, caption, linkUrl, openInNewTab } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-block mystarter-block-image',
	});

	if (!mediaUrl) {
		return <div {...blockProps} />;
	}

	const imageElement = <img src={mediaUrl} alt={alt} loading="lazy" />;

	return (
		<figure {...blockProps}>
			{linkUrl ? (
				<a
					href={linkUrl}
					target={openInNewTab ? '_blank' : undefined}
					rel={openInNewTab ? 'noopener noreferrer' : undefined}
				>
					{imageElement}
				</a>
			) : (
				imageElement
			)}

			{caption ? (
				<RichText.Content
					tagName="figcaption"
					value={caption}
					className="mystarter-block-image__caption"
				/>
			) : null}
		</figure>
	);
};

export default Save;
