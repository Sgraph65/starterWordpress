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
    }
);
