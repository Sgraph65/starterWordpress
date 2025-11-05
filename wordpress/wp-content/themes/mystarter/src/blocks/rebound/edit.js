import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { Fragment, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

const postTypeOptions = [
	{ label: __('Pages', 'mystarter'), value: 'page' },
	{ label: __('Articles', 'mystarter'), value: 'post' },
	{ label: __('Actualités', 'mystarter'), value: 'actualite' },
];

const Edit = ({ attributes, setAttributes }) => {
	const { items, context, columns } = attributes;
	const [searchTerm, setSearchTerm] = useState('');

	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-rebound columns-${columns}`,
	});

	const availablePosts = useSelect(
		(select) => {
			const { getEntityRecords } = select('core');
			const query = {
				per_page: 20,
				_embed: true,
				search: searchTerm || undefined,
				status: 'publish',
			};

			return getEntityRecords('postType', context, query) || [];
		},
		[context, searchTerm]
	);

	const postOptions = useMemo(
		() =>
			availablePosts.map((post) => {
				const media =
					post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
					null;

				return {
					id: post.id,
					type: context,
					title: post.title?.rendered || post.title,
					link: post.link,
					excerpt:
						post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, '') ||
						'',
					featuredImage: media,
				};
			}),
		[availablePosts, context]
	);

	const addItem = (item) => {
		if (
			items.find(
				(current) =>
					current.id === item.id && current.type === item.type
			)
		) {
			return;
		}

		setAttributes({ items: [...items, item] });
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, idx) => idx !== index) });
	};

	const updateItem = (index, key, value) => {
		const nextItems = [...items];
		nextItems[index] = {
			...nextItems[index],
			[key]: value,
		};
		setAttributes({ items: nextItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Sélection', 'mystarter')} initialOpen>
					<SelectControl
						label={__('Source', 'mystarter')}
						value={context}
						onChange={(value) =>
							setAttributes({ context: value, items: [] })
						}
						options={postTypeOptions}
					/>
					<TextControl
						label={__('Recherche', 'mystarter')}
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder={__('Rechercher un contenu…', 'mystarter')}
					/>
					<RangeControl
						label={__('Colonnes', 'mystarter')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={2}
						max={4}
					/>

					<div className="mystarter-rebound__options">
						{postOptions.length ? (
							postOptions.map((option) => (
								<Button
									key={option.id}
									variant="secondary"
									onClick={() => addItem(option)}
								>
									{option.title}
								</Button>
							))
						) : (
							<p>
								{__(
									'Aucun contenu trouvé pour cette recherche.',
									'mystarter'
								)}
							</p>
						)}
					</div>
				</PanelBody>

				<PanelBody title={__('Éléments sélectionnés', 'mystarter')}>
					{items.length ? (
						<div className="mystarter-rebound-form">
							{items.map((item, index) => (
								<div
									className="mystarter-rebound-form__item"
									key={`${item.type}-${item.id}`}
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
							{__(
								'Ajoutez des contenus à mettre en avant.',
								'mystarter'
							)}
						</p>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mystarter-rebound__grid">
					{items.length ? (
						items.map((item, index) => (
							<article
								className="mystarter-rebound__item"
								key={`${item.type}-${item.id || index}`}
							>
								{item.featuredImage ? (
									<div className="mystarter-rebound__media">
										<img src={item.featuredImage} alt="" />
									</div>
								) : null}
								{item.title ? <h3>{item.title}</h3> : null}
								{item.excerpt ? <p>{item.excerpt}</p> : null}
								{item.link ? (
									<a
										className="mystarter-button is-ghost"
										href={item.link}
									>
										{__('Découvrir', 'mystarter')}
									</a>
								) : null}
							</article>
						))
					) : (
						<p className="mystarter-rebound__empty-preview">
							{__('Aucun élément sélectionné', 'mystarter')}
						</p>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
