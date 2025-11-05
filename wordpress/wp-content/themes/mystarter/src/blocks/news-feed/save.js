import { RichText, useBlockProps } from '@wordpress/block-editor';

const formatDate = (isoDate) => {
	try {
		return new Intl.DateTimeFormat('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(isoDate));
	} catch (error) {
		return '';
	}
};

const Save = ({ attributes }) => {
	const { highlight, items } = attributes;
	const blockProps = useBlockProps.save({
		className: 'mystarter-block mystarter-news-feed',
	});

	return (
		<section {...blockProps}>
			{highlight ? (
				<article className="mystarter-news-feed__highlight">
					{highlight.image ? (
						<div className="mystarter-news-feed__image">
							<img src={highlight.image} alt="" loading="lazy" />
						</div>
					) : null}
					<div className="mystarter-news-feed__highlight-content">
						<span className="mystarter-news-feed__eyebrow">
							Actualité
						</span>
						{highlight.title ? (
							<RichText.Content
								tagName="h3"
								value={highlight.title}
							/>
						) : null}
						{highlight.date ? (
							<time dateTime={highlight.date}>
								{formatDate(highlight.date)}
							</time>
						) : null}
						{highlight.excerpt ? (
							<RichText.Content
								tagName="p"
								value={highlight.excerpt}
							/>
						) : null}
						{highlight.link ? (
							<a
								className="mystarter-button is-primary"
								href={highlight.link}
							>
								Lire l’article
							</a>
						) : null}
					</div>
				</article>
			) : null}

			{items?.length ? (
				<div className="mystarter-news-feed__list">
					{items.map((item, index) => (
						<article
							className="mystarter-news-feed__item"
							key={item.id || index}
						>
							{item.title ? (
								<RichText.Content
									tagName="h4"
									value={item.title}
								/>
							) : null}
							{item.date ? (
								<time dateTime={item.date}>
									{formatDate(item.date)}
								</time>
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
									Lire
								</a>
							) : null}
						</article>
					))}
				</div>
			) : null}
		</section>
	);
};

export default Save;
