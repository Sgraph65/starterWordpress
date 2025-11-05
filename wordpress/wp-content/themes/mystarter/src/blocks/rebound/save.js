import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { items, columns } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-rebound columns-${columns}`,
	});

	if (!items?.length) {
		return <div {...blockProps} />;
	}

	return (
		<div {...blockProps}>
			<div className="mystarter-rebound__grid">
				{items.map((item, index) => (
					<article
						className="mystarter-rebound__item"
						key={`${item.type}-${item.id || index}`}
					>
						{item.featuredImage ? (
							<div className="mystarter-rebound__media">
								<img
									src={item.featuredImage}
									alt=""
									loading="lazy"
								/>
							</div>
						) : null}
						{item.title ? (
							<RichText.Content tagName="h3" value={item.title} />
						) : null}
						{item.excerpt ? (
							<RichText.Content
								tagName="p"
								value={item.excerpt}
							/>
						) : null}
						{item.link ? (
							<a
								className="mystarter-button is-ghost"
								href={item.link}
							>
								Découvrir
							</a>
						) : null}
					</article>
				))}
			</div>
		</div>
	);
};

export default Save;
