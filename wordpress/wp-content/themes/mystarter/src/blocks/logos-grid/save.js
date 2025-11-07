import { useBlockProps } from '@wordpress/block-editor';

const LogosSave = ({ attributes }) => {
	const { columns, items = [], grayscale } = attributes;
	const blockProps = useBlockProps.save({
		className: `mystarter-logos has-${columns}-columns ${
			grayscale ? 'is-grayscale' : ''
		}`,
	});

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				if (!item.imageUrl) {
					return null;
				}

				const logo = <img src={item.imageUrl} alt={item.alt || ''} loading="lazy" />;

				return item.link ? (
					<a
						className="mystarter-logos__item"
						key={index}
						href={item.link}
						target="_blank"
						rel="noreferrer noopener"
					>
						{logo}
					</a>
				) : (
					<div className="mystarter-logos__item" key={index}>
						{logo}
					</div>
				);
			})}
		</div>
	);
};

export default LogosSave;
