class PortfolioSearch {
  constructor() {
    this.searchIndex = [];
    this.initializeSearch();
  }

  async initializeSearch() {
    // Initialize search index
    const response = await fetch('/api/portfolio-items');
    const items = await response.json();
    
    this.searchIndex = items.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      tags: item.tags
    }));
  }

  search(query) {
    const results = this.searchIndex.filter(item => {
      const searchString = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });

    this.displayResults(results);
  }

  displayResults(results) {
    const container = document.querySelector('.search-results');
    container.innerHTML = results.map(item => `
      <div class="search-result-item">
        <h3>${item.title}</h3>
        <p>${item.content.substring(0, 150)}...</p>
        <div class="tags">
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

// Portfolio Filter System
class PortfolioFilter {
  constructor() {
    this.filters = {
      category: 'all',
      tags: []
    };
    this.initializeFilters();
  }

  initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFilter('category', btn.dataset.filter);
      });
    });

    document.querySelectorAll('.tag-filter').forEach(tag => {
      tag.addEventListener('click', () => {
        this.toggleTag(tag.dataset.tag);
      });
    });
  }

  setFilter(type, value) {
    this.filters[type] = value;
    this.applyFilters();
  }

  toggleTag(tag) {
    if (this.filters.tags.includes(tag)) {
      this.filters.tags = this.filters.tags.filter(t => t !== tag);
    } else {
      this.filters.tags.push(tag);
    }
    this.applyFilters();
  }

  applyFilters() {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
      const matchesCategory = this.filters.category === 'all' || 
                            item.dataset.category === this.filters.category;
      
      const matchesTags = this.filters.tags.length === 0 || 
                         this.filters.tags.every(tag => 
                           item.dataset.tags.split(',').includes(tag)
                         );

      if (matchesCategory && matchesTags) {
        item.style.display = 'block';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
        item.classList.remove('fade-in');
      }
    });
  }
} 