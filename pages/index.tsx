// pages/index.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Welcome to IELTS AI Writing MVP</h1>
      <p>Select a feature to get started:</p>
      <ul>
        <li><Link href="/WritePracticePage">Practice Task 1</Link></li>
        <li><Link href="/WriteTask2Page">Practice Task 2</Link></li>
        <li><Link href="/WritingTabsPage">All Writing Tabs</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;
