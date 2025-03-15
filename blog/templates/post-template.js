class BlogPost {
  constructor(title, content, metadata) {
    this.title = title;
    this.content = content;
    this.metadata = {
      author: 'Kelvin Warui',
      date: new Date(),
      tags: [],
      readTime: '0 min',
      ...metadata
    };
  }

  generateHTML() {
    return `
      <article class="blog-post">
        <header class="post-header">
          <h1>${this.title}</h1>
          <div class="post-meta">
            <span class="author">${this.metadata.author}</span>
            <span class="date">${this.metadata.date.toLocaleDateString()}</span>
            <span class="read-time">${this.metadata.readTime}</span>
          </div>
          <div class="tags">
            ${this.metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </header>
        <div class="post-content">
          ${this.content}
        </div>
        <footer class="post-footer">
          <div class="share-buttons">
            <button onclick="share('twitter')">Share on Twitter</button>
            <button onclick="share('linkedin')">Share on LinkedIn</button>
          </div>
        </footer>
      </article>
    `;
  }
} 