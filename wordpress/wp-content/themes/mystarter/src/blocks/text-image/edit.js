import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const {
		title,
		content,
		mediaId,
		mediaUrl,
		mediaAlt,
		imagePosition,
		background,
	} = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-text-image has-${imagePosition}-image has-${background}-background`,
	});

	const onSelectImage = (media) => {
		if (!media || !media.url) {
			return;
		}

		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt || '',
		});
	};

	const removeImage = () => {
		setAttributes({
			mediaId: undefined,
			mediaUrl: undefined,
			mediaAlt: '',
		});
	};

	const previewContent = content ? (
		<div
			className="mystarter-text-image__content"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	) : null;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Contenu', 'mystarter')} initialOpen>
					<TextControl
						label={__('Titre principal', 'mystarter')}
						value={title || ''}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextareaControl
						label={__('Texte', 'mystarter')}
						help={__(
							'HTML de base accepté (ex. <p>, <strong>).',
							'mystarter'
						)}
						value={content || ''}
						onChange={(value) => setAttributes({ content: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Image', 'mystarter')}>
					{mediaUrl ? (
						<div className="mystarter-text-image__preview">
							<img src={mediaUrl} alt={mediaAlt || ''} />
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
						value={mediaAlt}
						onChange={(value) => setAttributes({ mediaAlt: value })}
					/>
					<SelectControl
						label={__('Position de l’image', 'mystarter')}
						value={imagePosition}
						onChange={(value) =>
							setAttributes({ imagePosition: value })
						}
						options={[
							{
								label: __('Image à droite', 'mystarter'),
								value: 'right',
							},
							{
								label: __('Image à gauche', 'mystarter'),
								value: 'left',
							},
						]}
					/>
				</PanelBody>

				<PanelBody title={__('Apparence', 'mystarter')}>
					<SelectControl
						label={__('Couleur de fond', 'mystarter')}
						value={background}
						onChange={(value) =>
							setAttributes({ background: value })
						}
						options={[
							{ label: __('Clair', 'mystarter'), value: 'light' },
							{ label: __('Gris', 'mystarter'), value: 'muted' },
							{
								label: __('Accent', 'mystarter'),
								value: 'accent',
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps}>
				{mediaUrl ? (
					<div className="mystarter-text-image__media">
						<img src={mediaUrl} alt={mediaAlt || ''} />
					</div>
				) : null}
				<div className="mystarter-text-image__content">
					{title ? <h2>{title}</h2> : null}
					{previewContent}
				</div>
			</section>
		</Fragment>
	);
};

export default Edit;
