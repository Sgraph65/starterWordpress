import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
	Button,
} from '@wordpress/components';
import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

const normalizePost = (post) => {
	const media = post._embedded?.['wp:featuredmedia']?.[0];

	return {
		id: post.id,
		title: post.title?.rendered || post.title,
		date: post.date,
		excerpt: post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, '') || '',
		link: post.link,
		image: media?.source_url,
	};
};

const Edit = ({ attributes, setAttributes }) => {
	const { highlightId, highlight, items, postsPerPage } = attributes;

	const blockProps = useBlockProps({
		className: 'mystarter-block mystarter-news-feed',
	});

	const posts = useSelect(
		(select) => {
			const { getEntityRecords } = select('core');
			return (
				getEntityRecords('postType', 'actualite', {
					per_page: postsPerPage + 3,
					_embed: true,
					status: 'publish',
				}) || []
			);
		},
		[postsPerPage]
	);

	const normalizedPosts = useMemo(() => posts.map(normalizePost), [posts]);

	useEffect(() => {
		if (normalizedPosts.length && !highlightId) {
			const [firstPost] = normalizedPosts;
			setAttributes({
				highlightId: firstPost?.id,
				highlight: firstPost,
			});
		}
	}, [normalizedPosts, highlightId, setAttributes]);

	useEffect(() => {
		if (normalizedPosts.length && items.length === 0) {
			const filtered = normalizedPosts.filter(
				(post) => post.id !== highlightId
			);
			setAttributes({ items: filtered.slice(0, postsPerPage) });
		}
	}, [
		normalizedPosts,
		highlightId,
		items.length,
		postsPerPage,
		setAttributes,
	]);

	const highlightOptions = [
		{ label: __('Sélectionner…', 'mystarter'), value: '' },
		...normalizedPosts.map((post) => ({
			label: post.title,
			value: String(post.id),
		})),
	];

	const selectHighlight = (id) => {
		if (!id) {
			return;
		}

		const target = normalizedPosts.find(
			(post) => String(post.id) === String(id)
		);
		if (target) {
			setAttributes({
				highlightId: target.id,
				highlight: target,
				items: normalizedPosts
					.filter((post) => post.id !== target.id)
					.slice(0, postsPerPage),
			});
		}
	};

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = {
			...next[index],
			[key]: value,
		};
		setAttributes({ items: next });
	};

	const removeItem = (index) => {
		const next = items.filter((_, idx) => idx !== index);
		setAttributes({ items: next });
	};

	const addItem = () => {
		const fallback = normalizedPosts.find(
			(post) =>
				post.id !== highlightId &&
				!items.find((item) => item.id === post.id)
		);

		if (fallback) {
			setAttributes({ items: [...items, fallback] });
		}
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Paramètres', 'mystarter')} initialOpen>
					<SelectControl
						label={__('Actualité mise en avant', 'mystarter')}
						value={highlightId ? String(highlightId) : ''}
						onChange={(value) => selectHighlight(value)}
						options={highlightOptions}
					/>
					<RangeControl
						label={__('Nombre d’actualités listées', 'mystarter')}
						value={postsPerPage}
						onChange={(value) =>
							setAttributes({ postsPerPage: value })
						}
						min={2}
						max={6}
					/>
				</PanelBody>

				<PanelBody title={__('Mise en avant', 'mystarter')}>
					<TextControl
						label={__('Titre', 'mystarter')}
						value={highlight?.title || ''}
						onChange={(value) =>
							setAttributes({
								highlight: { ...highlight, title: value },
							})
						}
					/>
					<TextareaControl
						label={__('Résumé', 'mystarter')}
						value={highlight?.excerpt || ''}
						onChange={(value) =>
							setAttributes({
								highlight: { ...highlight, excerpt: value },
							})
						}
					/>
					<TextControl
						label={__('Lien', 'mystarter')}
						value={highlight?.link || ''}
						onChange={(value) =>
							setAttributes({
								highlight: { ...highlight, link: value },
							})
						}
					/>
				</PanelBody>

				<PanelBody title={__('Liste', 'mystarter')}>
					{items.length ? (
						<div className="mystarter-news-form">
							{items.map((item, index) => (
								<div
									className="mystarter-news-form__item"
									key={item.id || index}
								>
									<TextControl
										label={__('Titre', 'mystarter')}
										value={item.title || ''}
										onChange={(value) =>
											updateItem(index, 'title', value)
										}
									/>
									<TextareaControl
										label={__('Résumé', 'mystarter')}
										value={item.excerpt || ''}
										onChange={(value) =>
											updateItem(index, 'excerpt', value)
										}
									/>
									<TextControl
										label={__('Lien', 'mystarter')}
										value={item.link || ''}
										onChange={(value) =>
											updateItem(index, 'link', value)
										}
									/>
									<Button
										variant="link"
										onClick={() => removeItem(index)}
									>
										{__('Retirer', 'mystarter')}
									</Button>
								</div>
							))}
						</div>
					) : (
						<p>
							{__('Aucune actualité supplémentaire', 'mystarter')}
						</p>
					)}
					<Button variant="secondary" onClick={addItem}>
						{__('Ajouter une actualité', 'mystarter')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{highlight ? (
					<article className="mystarter-news-feed__highlight">
						{highlight.image ? (
							<div className="mystarter-news-feed__image">
								<img src={highlight.image} alt="" />
							</div>
						) : null}
						<div className="mystarter-news-feed__highlight-content">
							<span className="mystarter-news-feed__eyebrow">
								{__('À la une', 'mystarter')}
							</span>
							{highlight.title ? (
								<h3>{highlight.title}</h3>
							) : null}
							{highlight.excerpt ? (
								<p>{highlight.excerpt}</p>
							) : null}
							{highlight.link ? (
								<a
									className="mystarter-button is-primary"
									href={highlight.link}
								>
									{__('Lire l’article', 'mystarter')}
								</a>
							) : null}
						</div>
					</article>
				) : (
					<p className="mystarter-news-feed__empty">
						{__(
							'Sélectionnez une actualité à mettre en avant.',
							'mystarter'
						)}
					</p>
				)}

				<div className="mystarter-news-feed__list">
					{items.length ? (
						items.map((item, index) => (
							<article
								className="mystarter-news-feed__item"
								key={item.id || index}
							>
								{item.title ? <h4>{item.title}</h4> : null}
								{item.excerpt ? <p>{item.excerpt}</p> : null}
								{item.link ? (
									<a
										className="mystarter-button is-ghost"
										href={item.link}
									>
										{__('Lire', 'mystarter')}
									</a>
								) : null}
							</article>
						))
					) : (
						<p className="mystarter-news-feed__empty">
							{__('Aucune actualité listée', 'mystarter')}
						</p>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
