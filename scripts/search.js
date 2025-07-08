try {
  const search_input = document.getElementById('search-value');
  search_input.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    const container = document.querySelector('.search_container-values');
    container.innerHTML = '';
    if (query.length === 0) return;

    const results = await dishController.search(query);
    results.forEach(dish => {
      container.insertAdjacentHTML('beforeend', dishController.searchTemplate(dish));
    });
  });
}
catch {
  console.log('> Ignoring search script');
}