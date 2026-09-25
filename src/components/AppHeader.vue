<template>
  <header class="header">
    <RouterLink to="/" class="logo" aria-label="Rêves de rue, accueil">
      <span class="logo-reves">Rêves</span>
      <span class="logo-derue">De rue</span>
    </RouterLink>

    <nav class="sections">
      <RouterLink to="/programmation">Programme</RouterLink>
      <a href="#">Infos pratiques</a>
      <a href="#">Favoris</a>
      <a href="#">Association</a>
    </nav>

    <a href="#" class="bouton bouton-primaire">Billetterie</a>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-600);
  padding: 20px var(--spacing-800);
  flex-wrap: wrap;
}

.logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  background: var(--violet-dream-800);
  padding: var(--spacing-200) var(--spacing-300);
  transform: rotate(-6deg);
  text-decoration: none;
  line-height: 1;
}
.logo-reves {
  font-family: var(--font-family-brand);
  font-weight: var(--font-weight-regular);
  font-size: 40px;
  color: var(--mustard-white-50);
}
.logo-derue {
  font-family: var(--font-family-brand);
  font-weight: var(--font-weight-regular);
  font-size: 15px;
  color: var(--mustard-white-50);
}

.sections {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: var(--spacing-400);
  flex-wrap: wrap;
}
.sections a {
  font-family: var(--font-family-headings);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-heading-3);
  text-transform: uppercase;
  color: var(--color-libelle-text-border);
  text-decoration: none;
  padding: var(--spacing-200) 10px;
  border-bottom: var(--border-width-100) solid transparent;
}
.sections a:hover {
  border-bottom-color: var(--color-libelle-text-border);
}
.sections a.router-link-active {
  background: var(--color-libelle-active);
  color: var(--color-libelle-text-active);
  border-radius: var(--radius-200) var(--radius-200) 0 0;
  border-bottom-color: var(--color-libelle-text-border);
}

@media (max-width: 900px) {
  .header {
    padding: var(--spacing-400);
  }
  .sections {
    order: 3;
    width: 100%;
    justify-content: flex-start;
  }
  .sections a {
    font-size: var(--font-size-medium);
  }
}
</style>
