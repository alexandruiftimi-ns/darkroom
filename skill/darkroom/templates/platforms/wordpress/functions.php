<?php
/**
 * {{name}} theme functions. Block themes do not load style.css by themselves; extra CSS lives in assets/site.css.
 */

add_action( 'wp_enqueue_scripts', function () {
	$v = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( '{{slug}}', get_theme_file_uri( 'assets/site.css' ), array(), $v );
	wp_enqueue_script( '{{slug}}', get_theme_file_uri( 'assets/site.js' ), array(), $v, array( 'strategy' => 'defer' ) );
} );

add_action( 'after_setup_theme', function () {
	add_editor_style( 'assets/site.css' );
} );
