import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const DEFAULT_BUTTON = {
	label: __('Nouveau bouton', 'mystarter'),
	url: '',
	newTab: false,
	style: 'primary',
};

const Edit = ({ attributes, setAttributes }) => {
	const { buttons, layout } = attributes;
	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-button-group is-${layout}`,
	});

	const addButton = () => {
		setAttributes({ buttons: [...buttons, { ...DEFAULT_BUTTON }] });
	};

	const updateButton = (index, key, value) => {
		const next = [...buttons];
		next[index] = {
			...next[index],
			[key]: value,
		};
		setAttributes({ buttons: next });
	};

	const removeButton = (index) => {
		setAttributes({ buttons: buttons.filter((_, idx) => idx !== index) });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Boutons', 'mystarter')} initialOpen>
					{buttons.length ? (
						<div className="mystarter-button-form">
							{buttons.map((button, index) => (
								<div
									className="mystarter-button-form__item"
									key={`button-${index}`}
								>
									<TextControl
										label={__('Libellé', 'mystarter')}
										value={button.label}
										onChange={(value) =>
											updateButton(index, 'label', value)
										}
									/>
									<TextControl
										label={__('Lien', 'mystarter')}
										value={button.url}
										onChange={(value) =>
											updateButton(index, 'url', value)
										}
										placeholder="https://"
									/>
									<ToggleControl
										label={__(
											'Ouvrir dans un nouvel onglet',
											'mystarter'
										)}
										checked={button.newTab}
										onChange={(value) =>
											updateButton(index, 'newTab', value)
										}
									/>
									<SelectControl
										label={__('Style', 'mystarter')}
										value={button.style}
										onChange={(value) =>
											updateButton(index, 'style', value)
										}
										options={[
											{
												label: __(
													'Principal',
													'mystarter'
												),
												value: 'primary',
											},
											{
												label: __(
													'Secondaire',
													'mystarter'
												),
												value: 'secondary',
											},
											{
												label: __('Ghost', 'mystarter'),
												value: 'ghost',
											},
										]}
									/>
									<Button
										variant="link"
										onClick={() => removeButton(index)}
									>
										{__('Retirer', 'mystarter')}
									</Button>
								</div>
							))}
						</div>
					) : (
						<p className="mystarter-button-group__empty">
							{__('Ajoutez votre premier bouton.', 'mystarter')}
						</p>
					)}
					<Button variant="primary" onClick={addButton}>
						{__('Ajouter un bouton', 'mystarter')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Disposition', 'mystarter')}>
					<SelectControl
						label={__('Disposition', 'mystarter')}
						value={layout}
						onChange={(value) => setAttributes({ layout: value })}
						options={[
							{ label: __('Ligne', 'mystarter'), value: 'row' },
							{
								label: __('Colonne', 'mystarter'),
								value: 'column',
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{buttons.length ? (
					buttons.map((button, index) => (
						<a
							key={`button-${index}`}
							className={`mystarter-button is-${button.style || 'primary'}`}
							href={button.url || '#'}
							target={button.newTab ? '_blank' : undefined}
							rel={
								button.newTab
									? 'noopener noreferrer'
									: undefined
							}
						>
							{button.label || __('Bouton', 'mystarter')}
						</a>
					))
				) : (
					<p className="mystarter-button-group__empty-preview">
						{__('Aucun bouton configuré', 'mystarter')}
					</p>
				)}
			</div>
		</Fragment>
	);
};

export default Edit;
