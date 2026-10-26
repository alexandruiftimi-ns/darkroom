<?php
declare(strict_types=1);
require __DIR__ . '/partials/bootstrap.php';
$title = '{{name}}';
require __DIR__ . '/partials/head.php';
?>
<main id="main">
  <section class="section">
    <div class="wrap">
      <h1>The one promise of {{name}}</h1>
      <p>Placeholder: the reason to care, in one or two sentences.</p>
      <a class="button" href="#contact">The main action</a>
    </div>
  </section>
  <section class="section" id="contact">
    <div class="wrap">
      <h2>Contact</h2>
      <?php if (($_GET['sent'] ?? '') === '1'): ?>
        <p role="status">Thank you. We will reply soon.</p>
      <?php endif; ?>
      <form method="post" action="contact.php" class="form">
        <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
        <p class="hp" aria-hidden="true"><label>Leave empty <input name="website" tabindex="-1" autocomplete="off"></label></p>
        <p><label for="name">Name</label><br><input id="name" name="name" required autocomplete="name"></p>
        <p><label for="email">Email</label><br><input id="email" name="email" type="email" required autocomplete="email"></p>
        <p><label for="message">Message</label><br><textarea id="message" name="message" rows="5" required></textarea></p>
        <p><button class="button" type="submit">Send</button></p>
      </form>
    </div>
  </section>
</main>
<?php require __DIR__ . '/partials/foot.php'; ?>
