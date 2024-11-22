import React, { useState } from 'react';

const initialThreads = [
  {
    id: 1,
    title: "How do you stay productive?",
    content: "Share your best productivity tips!",
    comments: ["Focus on one task at a time.", "The Pomodoro technique works wonders."],
  },
  {
    id: 2,
    title: "Mindfulness practices",
    content: "What mindfulness practices have helped you?",
    comments: ["Meditation is my go-to.", "Mindful breathing every morning!"],
  },
];

const Community = () => {
  const [threads, setThreads] = useState(initialThreads);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleCreateThread = () => {
    if (!newThreadTitle || !newThreadContent) {
      alert("Please fill out all fields.");
      return;
    }
    const newThread = {
      id: threads.length + 1,
      title: newThreadTitle,
      content: newThreadContent,
      comments: [],
    };
    setThreads([newThread, ...threads]);
    setNewThreadTitle("");
    setNewThreadContent("");
  };

  const handleAddComment = (threadId) => {
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? { ...thread, comments: [...thread.comments, newComment] }
          : thread
      )
    );
    setNewComment("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Community</h1>
      <div style={styles.newThread}>
        <h2 style={styles.sectionTitle}>Start a New Discussion</h2>
        <input
          type="text"
          placeholder="Thread Title"
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="What's on your mind?"
          value={newThreadContent}
          onChange={(e) => setNewThreadContent(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <button onClick={handleCreateThread} style={styles.button}>
          Create Thread
        </button>
      </div>
      <div style={styles.threadList}>
        <h2 style={styles.sectionTitle}>Discussion Threads</h2>
        {threads.map((thread) => (
          <div
            key={thread.id}
            style={styles.thread}
            onClick={() => setSelectedThread(thread)}
          >
            <h3 style={styles.threadTitle}>{thread.title}</h3>
            <p style={styles.threadContent}>{thread.content}</p>
          </div>
        ))}
      </div>
      {selectedThread && (
        <div style={styles.threadDetails}>
          <h2 style={styles.sectionTitle}>{selectedThread.title}</h2>
          <p style={styles.threadContent}>{selectedThread.content}</p>
          <h3>Comments:</h3>
          <ul style={styles.comments}>
            {selectedThread.comments.map((comment, index) => (
              <li key={index} style={styles.comment}>
                {comment}
              </li>
            ))}
          </ul>
          <div style={styles.newComment}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={styles.textarea}
            ></textarea>
            <button
              onClick={() => handleAddComment(selectedThread.id)}
              style={styles.button}
            >
              Add Comment
            </button>
          </div>
          <button
            onClick={() => setSelectedThread(null)}
            style={styles.backButton}
          >
            Back to Threads
          </button>
        </div>
      )}
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
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  newThread: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "1rem",
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "80px",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#ecf0f1",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  threadList: {
    marginBottom: "20px",
  },
  thread: {
    border: "1px solid #ecf0f1",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  threadTitle: {
    fontSize: "1.2rem",
    color: "#3498db",
  },
  threadContent: {
    fontSize: "1rem",
    color: "#7f8c8d",
  },
  threadDetails: {
    border: "1px solid #ecf0f1",
    borderRadius: "5px",
    padding: "20px",
  },
  comments: {
    listStyleType: "none",
    padding: 0,
    marginBottom: "20px",
  },
  comment: {
    borderBottom: "1px solid #ecf0f1",
    padding: "5px 0",
  },
  newComment: {
    marginBottom: "20px",
  },
  backButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#ecf0f1",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Community;
