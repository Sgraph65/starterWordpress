import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { mediaId, mediaUrl, alt, caption, linkUrl, openInNewTab } =
		attributes;

	const blockProps = useBlockProps({
		className: 'mystarter-block mystarter-block-image',
	});

	const onSelectImage = (media) => {
		if (!media || !media.url) {
			return;
		}

		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
			alt: media.alt || '',
		});
	};

	const removeImage = () => {
		setAttributes({
			mediaId: undefined,
			mediaUrl: undefined,
			alt: '',
		});
	};

	let previewImage = (
		<div className="mystarter-block-image__placeholder">
			{__('Aucune image sélectionnée', 'mystarter')}
		</div>
	);

	if (mediaUrl) {
		previewImage = <img src={mediaUrl} alt={alt || ''} />;
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Image', 'mystarter')} initialOpen>
					{mediaUrl ? (
						<div className="mystarter-block-image__preview">
							<img src={mediaUrl} alt={alt || ''} />
							<Button variant="secondary" onClick={removeImage}>
								{__('Retirer l’image', 'mystarter')}
							</Button>
						</div>
					) : null}
					<MediaUpload
						onSelect={onSelectImage}
						value={mediaId}
						render={({ open }) => (
							<Button variant="primary" onClick={open}>
								{mediaUrl
									? __('Remplacer l’image', 'mystarter')
									: __('Choisir une image', 'mystarter')}
							</Button>
						)}
					/>
					<TextControl
						label={__('Texte alternatif', 'mystarter')}
						value={alt}
						onChange={(value) => setAttributes({ alt: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Lien', 'mystarter')}>
					<TextControl
						label={__('URL', 'mystarter')}
						value={linkUrl}
						onChange={(value) => setAttributes({ linkUrl: value })}
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

				<PanelBody title={__('Légende', 'mystarter')}>
					<TextareaControl
						label={__('Texte', 'mystarter')}
						help={__(
							'Vous pouvez ajouter du HTML de base (ex. <strong>).',
							'mystarter'
						)}
						value={caption || ''}
						onChange={(value) => setAttributes({ caption: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<figure {...blockProps}>
				{linkUrl && mediaUrl ? (
					<a
						href={linkUrl}
						target={openInNewTab ? '_blank' : undefined}
						rel={openInNewTab ? 'noopener noreferrer' : undefined}
					>
						{previewImage}
					</a>
				) : (
					previewImage
				)}
				{caption ? (
					<figcaption
						className="mystarter-block-image__caption"
						dangerouslySetInnerHTML={{ __html: caption }}
					/>
				) : null}
			</figure>
		</Fragment>
	);
};

export default Edit;
