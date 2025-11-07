#!/usr/bin/env bash

set -euo pipefail

THEME_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BLOCKS_DIR="${THEME_DIR}/src/blocks"
CONFIG_FILE="${THEME_DIR}/config/blocks.json"
ACTIVE_JS="${THEME_DIR}/src/blocks-active.js"

if [[ ! -d "${BLOCKS_DIR}" ]]; then
	echo "Impossible de trouver ${BLOCKS_DIR}" >&2
	exit 1
fi

mapfile -t BLOCKS < <(find "${BLOCKS_DIR}" -mindepth 1 -maxdepth 1 -type d -not -name '__*' -exec basename {} \; | sort)

if [[ ${#BLOCKS[@]} -eq 0 ]]; then
	echo "Aucun bloc détecté dans ${BLOCKS_DIR}" >&2
	exit 1
fi

CURRENT_ACTIVE=()
if [[ -f "${CONFIG_FILE}" ]]; then
	CURRENT_ACTIVE=($(python3 -c "import json,sys;data=json.load(open('${CONFIG_FILE}'));print(' '.join(data.get('active', [])))" 2>/dev/null || true))
fi

declare -a SELECTED=()

function is_active() {
	local value="$1"
	for item in "${CURRENT_ACTIVE[@]}"; do
		if [[ "${item}" == "${value}" ]]; then
			return 0
		fi
	done
	return 1
}

if [[ $# -gt 0 ]]; then
	for arg in "$@"; do
		if [[ " ${BLOCKS[*]} " != *" ${arg} "* ]]; then
			echo "Bloc inconnu: ${arg}" >&2
			exit 1
		fi
		SELECTED+=("${arg}")
	done
else
	echo "Sélection des blocs à activer :"
	for block in "${BLOCKS[@]}"; do
		prompt="[Y/n]"
		default="y"
		if ! is_active "${block}"; then
			prompt="[y/N]"
			default="n"
		fi

		read -r -p " - ${block} ${prompt} " reply || true
		reply="${reply:-${default}}"
		if [[ "${reply}" =~ ^[Yy]$ ]]; then
			SELECTED+=("${block}")
		fi
	done
fi

if [[ ${#SELECTED[@]} -eq 0 ]]; then
	echo "Aucun bloc sélectionné, annulation." >&2
	exit 1
fi

printf 'Blocs actifs : %s\n' "${SELECTED[*]}"

{
	echo "{"
	echo '  "available": ['
	for idx in "${!BLOCKS[@]}"; do
		suffix=","
		[[ $idx -eq $((${#BLOCKS[@]} - 1)) ]] && suffix=""
		printf '    "%s"%s\n' "${BLOCKS[$idx]}" "${suffix}"
	done
	echo '  ],'
	echo '  "active": ['
	for idx in "${!SELECTED[@]}"; do
		suffix=","
		[[ $idx -eq $((${#SELECTED[@]} - 1)) ]] && suffix=""
		printf '    "%s"%s\n' "${SELECTED[$idx]}" "${suffix}"
	done
	echo '  ]'
	echo "}"
} > "${CONFIG_FILE}"

{
	cat <<'HEADER'
/**
 * Fichier généré automatiquement par scripts/configure-blocks.sh
 * Ne pas modifier manuellement.
 */
HEADER
	for block in "${SELECTED[@]}"; do
		echo "import './blocks/${block}';"
	done
} > "${ACTIVE_JS}"

echo "Configuration mise à jour. Pense à lancer 'yarn build' pour régénérer les assets."
