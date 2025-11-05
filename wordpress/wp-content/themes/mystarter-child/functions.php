<?php
/**
 * Theme bootstrap for MyStarter Child.
 */

add_action(
    'wp_enqueue_scripts',
    static function (): void {
        wp_enqueue_style(
            'mystarter-child-style',
            get_stylesheet_uri(),
            [ 'mystarter-style' ],
            wp_get_theme()->get( 'Version' )
        );

        $asset_path = get_theme_file_path( 'build/index.asset.php' );

        if ( file_exists( $asset_path ) ) {
            $asset = include $asset_path;

            if ( isset( $asset['dependencies'], $asset['version'] ) ) {
                wp_enqueue_script(
                    'mystarter-child-scripts',
                    get_theme_file_uri( 'build/index.js' ),
                    $asset['dependencies'],
                    $asset['version'],
                    true
                );
            }

            if ( file_exists( get_theme_file_path( 'build/style-index.css' ) ) ) {
                wp_enqueue_style(
                    'mystarter-child-build',
                    get_theme_file_uri( 'build/style-index.css' ),
                    [ 'mystarter-style' ],
                    $asset['version']
                );
            }
        }
    }
);

add_action(
    'enqueue_block_editor_assets',
    static function (): void {
        $asset_path = get_theme_file_path( 'build/index.asset.php' );

        if ( ! file_exists( $asset_path ) ) {
            return;
        }

        $asset = include $asset_path;

        if ( isset( $asset['dependencies'], $asset['version'] ) ) {
            wp_enqueue_script(
                'mystarter-child-editor-scripts',
                get_theme_file_uri( 'build/index.js' ),
                $asset['dependencies'],
                $asset['version'],
                true
            );
        }

        if ( file_exists( get_theme_file_path( 'build/index.css' ) ) ) {
            wp_enqueue_style(
                'mystarter-child-editor-style',
                get_theme_file_uri( 'build/index.css' ),
                [],
                $asset['version']
            );
        }
    }
);
