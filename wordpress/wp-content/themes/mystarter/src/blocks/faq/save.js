import { RichText, useBlockProps } from '@wordpress/block-editor';

const FAQSave = ({ attributes }) => {
	const { items = [], display } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-faq is-${display}`,
	});

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const content = item.answer ? (
					<RichText.Content
						tagName="div"
						className="mystarter-faq__answer-content"
						value={item.answer}
					/>
				) : null;

				if (display === 'accordion') {
					return (
						<details className="mystarter-faq__item" key={index}>
							<summary className="mystarter-faq__question">
								{item.question}
							</summary>
							{content}
						</details>
					);
				}

				return (
					<div className="mystarter-faq__item" key={index}>
						<div className="mystarter-faq__question">{item.question}</div>
						{content}
					</div>
				);
			})}
		</div>
	);
};

export default FAQSave;
