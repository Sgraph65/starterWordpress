import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const { content, citation, accent } = attributes;
	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-quote${accent ? ' is-accented' : ''}`,
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Formulaire', 'mystarter')} initialOpen>
					<TextareaControl
						label={__('Citation', 'mystarter')}
						help={__(
							'HTML de base accepté pour la mise en forme.',
							'mystarter'
						)}
						value={content || ''}
						onChange={(value) => setAttributes({ content: value })}
					/>
					<TextControl
						label={__('Auteur / Source', 'mystarter')}
						value={citation || ''}
						onChange={(value) => setAttributes({ citation: value })}
					/>
					<ToggleControl
						label={__('Afficher l’accent décoratif', 'mystarter')}
						checked={accent}
						onChange={(value) => setAttributes({ accent: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<blockquote {...blockProps}>
				{content ? (
					<p
						className="mystarter-quote__content"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : (
					<p className="mystarter-quote__content">
						{__(
							'Ajoutez votre citation dans le panneau de droite.',
							'mystarter'
						)}
					</p>
				)}
				{citation ? (
					<cite className="mystarter-quote__citation">
						{citation}
					</cite>
				) : null}
			</blockquote>
		</Fragment>
	);
};

export default Edit;
