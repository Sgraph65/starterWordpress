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
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { mediaId, mediaUrl, alt, caption } = attributes;
	const blockProps = useBlockProps({
		className: 'mystarter-block mystarter-block-image-fullwidth',
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

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Image', 'mystarter')} initialOpen>
					{mediaUrl ? (
						<div className="mystarter-block-image-fullwidth__preview">
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

				<PanelBody title={__('Légende', 'mystarter')}>
					<TextareaControl
						label={__('Texte', 'mystarter')}
						help={__(
							'Vous pouvez ajouter du HTML de base (ex. <em>).',
							'mystarter'
						)}
						value={caption || ''}
						onChange={(value) => setAttributes({ caption: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<figure {...blockProps}>
				{mediaUrl ? (
					<img src={mediaUrl} alt={alt || ''} />
				) : (
					<div className="mystarter-block-image-fullwidth__placeholder">
						{__(
							'Sélectionnez une image pleine largeur',
							'mystarter'
						)}
					</div>
				)}
				{caption ? (
					<figcaption
						className="mystarter-block-image-fullwidth__caption"
						dangerouslySetInnerHTML={{ __html: caption }}
					/>
				) : null}
			</figure>
		</Fragment>
	);
};

export default Edit;
