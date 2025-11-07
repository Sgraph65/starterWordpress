import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';
import { Fragment, useMemo } from '@wordpress/element';

import { DEFAULT_ALLOWED_MODULES } from '../columns-grid/constants';

const ColumnEdit = () => {
	const blockProps = useBlockProps({
		className: 'mystarter-columns-grid__column',
	});

	const allowed = useMemo(
		() =>
			applyFilters(
				'mystarter.columnsGrid.allowedModules',
				DEFAULT_ALLOWED_MODULES
			),
		[]
	);

	const hasAllowedModules = Array.isArray(allowed) && allowed.length > 0;

	return (
		<Fragment>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={hasAllowedModules ? allowed : undefined}
					renderAppender={() => (
						<div className="mystarter-columns-grid__appender">
							<InnerBlocks.ButtonBlockAppender />
						</div>
					)}
				/>
			</div>
			{!hasAllowedModules ? (
				<Notice status="warning" isDismissible={false}>
					{__(
						'Aucun module n’est activé pour les colonnes. Utilisez le filtre `mystarter.columnsGrid.allowedModules` pour en définir.',
						'mystarter'
					)}
				</Notice>
			) : null}
		</Fragment>
	);
};

export default ColumnEdit;
