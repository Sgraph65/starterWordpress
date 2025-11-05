import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { images, columns, displayCaptions } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-block-gallery columns-${columns}`,
	});

	if (!images?.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			<div className="mystarter-block-gallery__grid">
				{images.map((image, index) => (
					<figure
						className="mystarter-block-gallery__item"
						key={image.id || index}
					>
						<img src={image.url} alt={image.alt} loading="lazy" />
						{displayCaptions && image.caption ? (
							<figcaption>{image.caption}</figcaption>
						) : null}
					</figure>
				))}
			</div>
		</div>
	);
};

export default Save;
