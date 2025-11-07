import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const HeroSplitEdit = ({ attributes, setAttributes }) => {
	const {
		eyebrow,
		title,
		content,
		ctaLabel,
		ctaUrl,
		mediaId,
		mediaUrl,
		mediaAlt,
		layout,
	} = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-hero-split has-${layout}`,
	});

	const onSelectMedia = (media) => {
		if (!media) {
			return;
		}

		setAttributes({
			mediaId: media.id,
			mediaUrl: media?.sizes?.large?.url || media.url,
			mediaAlt: media.alt || '',
		});
	};

	const removeMedia = () => {
		setAttributes({
			mediaId: undefined,
			mediaUrl: '',
			mediaAlt: '',
		});
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Contenu', 'mystarter')} initialOpen>
					<TextControl
						label={__('Sur-titre', 'mystarter')}
						value={eyebrow}
						onChange={(value) => setAttributes({ eyebrow: value })}
					/>
					<TextControl
						label={__('Titre principal', 'mystarter')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<BaseControl
						label={__('Texte', 'mystarter')}
						help={__(
							'Utilisez la barre d’outils pour mettre en forme votre texte.',
							'mystarter'
						)}
					>
						<RichText
							tagName="div"
							className="mystarter-hero-split__richtext"
							value={content}
							onChange={(value) =>
								setAttributes({ content: value })
							}
							placeholder={__('Description…', 'mystarter')}
							allowedFormats={[
								'core/bold',
								'core/italic',
								'core/link',
								'core/underline',
							]}
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('CTA', 'mystarter')}>
					<TextControl
						label={__('Libellé', 'mystarter')}
						value={ctaLabel}
						onChange={(value) => setAttributes({ ctaLabel: value })}
					/>
					<TextControl
						label={__('Lien', 'mystarter')}
						value={ctaUrl}
						onChange={(value) => setAttributes({ ctaUrl: value })}
						placeholder="https://"
					/>
				</PanelBody>

				<PanelBody title={__('Visuel', 'mystarter')}>
					{mediaUrl ? (
						<div className="mystarter-hero-split__media-preview">
							<img src={mediaUrl} alt={mediaAlt || ''} />
							<Button variant="link" onClick={removeMedia}>
								{__('Retirer l’image', 'mystarter')}
							</Button>
						</div>
					) : null}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							value={mediaId}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button
									variant={mediaUrl ? 'secondary' : 'primary'}
									onClick={open}
								>
									{mediaUrl
										? __('Remplacer l’image', 'mystarter')
										: __('Choisir une image', 'mystarter')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<TextControl
						label={__('Texte alternatif', 'mystarter')}
						value={mediaAlt}
						onChange={(value) => setAttributes({ mediaAlt: value })}
					/>
					<SelectControl
						label={__('Disposition', 'mystarter')}
						value={layout}
						options={[
							{
								label: __('Image à droite', 'mystarter'),
								value: 'media-right',
							},
							{
								label: __('Image à gauche', 'mystarter'),
								value: 'media-left',
							},
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				<div className="mystarter-hero-split__content-wrap">
					{eyebrow ? (
						<p className="mystarter-hero-split__eyebrow">
							{eyebrow}
						</p>
					) : null}
					{title ? (
						<h1>{title}</h1>
					) : (
						<span className="mystarter-placeholder">
							{__('Ajoutez un titre', 'mystarter')}
						</span>
					)}
					{content ? (
						<RichText.Content
							tagName="div"
							className="mystarter-hero-split__content"
							value={content}
						/>
					) : (
						<p className="mystarter-placeholder">
							{__('Ajoutez un texte descriptif', 'mystarter')}
						</p>
					)}
					{ctaLabel ? (
						<span className="mystarter-button is-primary">
							{ctaLabel}
						</span>
					) : (
						<span className="mystarter-placeholder">
							{__('Libellé du bouton', 'mystarter')}
						</span>
					)}
				</div>
				<div className="mystarter-hero-split__media">
					{mediaUrl ? (
						<img src={mediaUrl} alt={mediaAlt || ''} />
					) : (
						<div className="mystarter-hero-split__placeholder">
							{__('Ajouter une image', 'mystarter')}
						</div>
					)}
				</div>
			</section>
		</Fragment>
	);
};

export default HeroSplitEdit;
