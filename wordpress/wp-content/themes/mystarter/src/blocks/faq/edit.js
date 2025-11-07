import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_ITEM = {
	question: '',
	answer: '',
};

const FAQEdit = ({ attributes, setAttributes }) => {
	const { questions, items = [], display } = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-faq is-${display}`,
	});

	useEffect(() => {
		let nextItems = items.map((item) => ({ ...EMPTY_ITEM, ...item }));

		if (nextItems.length < questions) {
			const addition = Array.from({ length: questions - nextItems.length }).map(
				() => ({ ...EMPTY_ITEM })
			);
			nextItems = [...nextItems, ...addition];
		} else if (nextItems.length > questions) {
			nextItems = nextItems.slice(0, questions);
		}

		if (
			nextItems.length !== items.length ||
			nextItems.some(
				(item, index) => JSON.stringify(item) !== JSON.stringify(items[index])
			)
		) {
			setAttributes({ items: nextItems });
		}
	}, [questions, items, setAttributes]);

	const updateItem = (index, value) => {
		const nextItems = [...items];
		nextItems[index] = value;
		setAttributes({ items: nextItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Réglages', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de questions', 'mystarter')}
						value={questions}
						onChange={(value) =>
							setAttributes({
								questions: Math.min(Math.max(value || 2, 2), 10),
							})
						}
						min={2}
						max={10}
					/>
					<SelectControl
						label={__('Apparence', 'mystarter')}
						value={display}
						options={[
							{ label: __('Accordéon', 'mystarter'), value: 'accordion' },
							{ label: __('Liste ouverte', 'mystarter'), value: 'list' },
						]}
						onChange={(value) => setAttributes({ display: value })}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<PanelBody
						key={`faq-${index}`}
						title={__('Question', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<TextControl
							label={__('Question', 'mystarter')}
							value={item.question}
							onChange={(value) =>
								updateItem(index, { ...item, question: value })
							}
						/>
						<BaseControl label={__('Réponse', 'mystarter')}>
							<RichText
								tagName="div"
								className="mystarter-faq__richtext"
								value={item.answer}
								onChange={(value) =>
									updateItem(index, { ...item, answer: value })
								}
								placeholder={__('Réponse…', 'mystarter')}
								allowedFormats={[
									'core/bold',
									'core/italic',
									'core/link',
									'core/list',
								]}
							/>
						</BaseControl>
					</PanelBody>
				))}
			</InspectorControls>

			<div {...blockProps}>
				{items.map((item, index) => (
					<div className="mystarter-faq__item" key={index}>
						<button type="button" className="mystarter-faq__question">
							<span>
								{item.question || __('Question', 'mystarter')}
							</span>
						</button>
						<div className="mystarter-faq__answer">
							{item.answer ? (
								<RichText.Content
									tagName="div"
									value={item.answer}
								/>
							) : (
								<p className="mystarter-placeholder">
									{__('Ajoutez une réponse', 'mystarter')}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default FAQEdit;
