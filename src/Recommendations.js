import React from 'react';

const recommendations = {
  books: [
    { title: "Deep Work", author: "Cal Newport", description: "Learn to focus deeply in a distracted world." },
    { title: "Atomic Habits", author: "James Clear", description: "Build better habits and break bad ones." },
    { title: "The Power of Now", author: "Eckhart Tolle", description: "A guide to spiritual enlightenment." },
  ],
  apps: [
    { name: "Forest", description: "Stay focused by growing a virtual tree." },
    { name: "Headspace", description: "A mindfulness and meditation app." },
    { name: "Todoist", description: "Organize your tasks and boost productivity." },
  ],
  articles: [
    { title: "The Science of Focus", url: "https://medium.com/swlh/the-science-of-staying-focused-652bbc47df66", description: "Learn about the science of concentration." },
    { title: "10 Ways to Boost Productivity", url: "https://www.simplilearn.com/tutorials/productivity-tutorial/proven-ways-of-how-to-increase-productivity-at-work", description: "Practical tips for becoming more productive." },
    { title: "Digital Minimalism", url: "https://antimaximalist.com/social-media-minimalism/", description: "A guide to decluttering your digital life." },
  ],
  techniques: [
    { name: "Pomodoro Technique", description: "Work in intervals with breaks for maximum focus." },
    { name: "Mindful Breathing", description: "A simple technique to calm your mind." },
    { name: "Time Blocking", description: "Plan your day into dedicated blocks of time." },
  ],
};

const Recommendations = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recommendations</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📚 Books</h2>
        <ul style={styles.list}>
          {recommendations.books.map((book, index) => (
            <li key={index} style={styles.item}>
              <strong>{book.title}</strong> by {book.author}
              <p style={styles.description}>{book.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📱 Apps</h2>
        <ul style={styles.list}>
          {recommendations.apps.map((app, index) => (
            <li key={index} style={styles.item}>
              <strong>{app.name}</strong>
              <p style={styles.description}>{app.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📰 Articles</h2>
        <ul style={styles.list}>
          {recommendations.articles.map((article, index) => (
            <li key={index} style={styles.item}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                {article.title}
              </a>
              <p style={styles.description}>{article.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🛠️ Techniques</h2>
        <ul style={styles.list}>
          {recommendations.techniques.map((technique, index) => (
            <li key={index} style={styles.item}>
              <strong>{technique.name}</strong>
              <p style={styles.description}>{technique.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#3498db",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    marginBottom: "15px",
    borderBottom: "1px solid #ecf0f1",
    paddingBottom: "10px",
  },
  description: {
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },
  link: {
    color: "#2980b9",
    textDecoration: "none",
  },
};

export default Recommendations;
