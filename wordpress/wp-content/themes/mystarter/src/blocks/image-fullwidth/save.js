import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { mediaUrl, alt, caption } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-block mystarter-block-image-fullwidth',
	});

	if (!mediaUrl) {
		return <div {...blockProps} />;
	}

	return (
		<figure {...blockProps}>
			<img src={mediaUrl} alt={alt} loading="lazy" />
			{caption ? (
				<RichText.Content
					tagName="figcaption"
					value={caption}
					className="mystarter-block-image-fullwidth__caption"
				/>
			) : null}
		</figure>
	);
};

export default Save;
