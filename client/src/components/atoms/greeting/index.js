import React from 'react'
import styles from "./greeting.module.scss"
import { useLocation } from 'react-router-dom';

function Greeting({username}) {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  const getPageGreeting = () => {
    switch (pageName) {
      case 'edit-note':
        return {text: `Ready to refine, `, emoji: '✏️'};
      case 'full-note':
        return {text: `Dive in, `, emoji: '📖'};
      case 'create-note':
        return {text: `New idea, `, emoji: '💡'};
      default:
        return {text: `Welcome back, `, emoji: '👋'};
    }
  };

  const {text, emoji} = getPageGreeting();

  return (
    <section className={styles.container}>
      <h2>
        {text}<span className={styles.username}>{username}</span>! {emoji}
      </h2>
    </section>
  )
}

export default Greeting