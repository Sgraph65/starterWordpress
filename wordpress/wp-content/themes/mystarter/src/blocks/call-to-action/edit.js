import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const {
		eyebrow,
		title,
		content,
		buttonText,
		buttonUrl,
		openInNewTab,
		accent,
		backgroundImageId,
		backgroundImageUrl,
	} = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-cta has-${accent}-accent`,
		style: backgroundImageUrl
			? {
					backgroundImage: `url(${backgroundImageUrl})`,
				}
			: undefined,
	});

	const removeBackgroundImage = () =>
		setAttributes({
			backgroundImageId: undefined,
			backgroundImageUrl: undefined,
		});

	const previewContent = content ? (
		<div
			className="mystarter-cta__content"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	) : null;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Contenu', 'mystarter')} initialOpen>
					<TextControl
						label={__('Sur-titre', 'mystarter')}
						value={eyebrow || ''}
						onChange={(value) => setAttributes({ eyebrow: value })}
					/>
					<TextControl
						label={__('Titre', 'mystarter')}
						value={title || ''}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextareaControl
						label={__('Description', 'mystarter')}
						help={__(
							'HTML de base accepté (ex. <p>, <strong>).',
							'mystarter'
						)}
						value={content || ''}
						onChange={(value) => setAttributes({ content: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Bouton', 'mystarter')}>
					<TextControl
						label={__('Libellé', 'mystarter')}
						value={buttonText || ''}
						onChange={(value) =>
							setAttributes({ buttonText: value })
						}
					/>
					<TextControl
						label={__('Lien', 'mystarter')}
						value={buttonUrl || ''}
						onChange={(value) =>
							setAttributes({ buttonUrl: value })
						}
						placeholder="https://"
					/>
					<ToggleControl
						label={__('Ouvrir dans un nouvel onglet', 'mystarter')}
						checked={openInNewTab}
						onChange={(value) =>
							setAttributes({ openInNewTab: value })
						}
					/>
				</PanelBody>

				<PanelBody title={__('Arrière-plan', 'mystarter')}>
					<SelectControl
						label={__('Accent', 'mystarter')}
						value={accent}
						onChange={(value) => setAttributes({ accent: value })}
						options={[
							{ value: 'accent', label: __('Rose', 'mystarter') },
							{ value: 'dark', label: __('Sombre', 'mystarter') },
							{ value: 'light', label: __('Clair', 'mystarter') },
						]}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									backgroundImageId: media.id,
									backgroundImageUrl:
										media.sizes?.large?.url || media.url,
								})
							}
							value={backgroundImageId}
							render={({ open }) => (
								<Button variant="secondary" onClick={open}>
									{backgroundImageUrl
										? __('Changer d’image', 'mystarter')
										: __('Choisir une image', 'mystarter')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{backgroundImageUrl ? (
						<Button variant="link" onClick={removeBackgroundImage}>
							{__('Retirer l’image', 'mystarter')}
						</Button>
					) : null}
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				<div className="mystarter-cta__overlay" />
				<div className="mystarter-cta__inner">
					{eyebrow ? (
						<span className="mystarter-cta__eyebrow">
							{eyebrow}
						</span>
					) : null}
					{title ? <h2>{title}</h2> : null}
					{previewContent}
					{buttonText ? (
						<a
							className="mystarter-button is-primary"
							href={buttonUrl || '#'}
							target={openInNewTab ? '_blank' : undefined}
							rel={
								openInNewTab ? 'noopener noreferrer' : undefined
							}
						>
							{buttonText}
						</a>
					) : null}
				</div>
			</section>
		</Fragment>
	);
};

export default Edit;
