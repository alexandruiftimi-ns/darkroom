<?php
/**
 * Title: Hero
 * Slug: {{slug}}/hero
 * Categories: banner
 * Description: The first screen: one promise, one sentence, one action.
 */
?>
<!-- wp:group {"align":"full","layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem"}}}} -->
<div class="wp-block-group alignfull" style="padding-top:6rem;padding-bottom:6rem">
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><?php echo esc_html__( 'The one promise of {{name}}', '{{slug}}' ); ?></h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><?php echo esc_html__( 'Placeholder: the reason to care, in one or two sentences.', '{{slug}}' ); ?></p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#contact"><?php echo esc_html__( 'The main action', '{{slug}}' ); ?></a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
