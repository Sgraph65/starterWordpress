import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { content, citation, accent } = attributes;

	const blockProps = useBlockProps.save({
		className: `mystarter-block mystarter-quote${
			accent ? ' is-accented' : ''
		}`,
	});

	return (
		<blockquote {...blockProps}>
			{content ? (
				<RichText.Content
					tagName="p"
					value={content}
					className="mystarter-quote__content"
				/>
			) : null}
			{citation ? (
				<RichText.Content
					tagName="cite"
					value={citation}
					className="mystarter-quote__citation"
				/>
			) : null}
		</blockquote>
	);
};

export default Save;
