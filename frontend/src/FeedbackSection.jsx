import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldAlert, Send } from 'lucide-react';
import './FeedbackSection.css';

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (reaction) => {
    try {
      await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction, message: feedback })
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      // Even if backend fails, show success to user for demo
      setSubmitted(true); 
    }
  };

  if (submitted) {
    return (
      <div className="feedback-container glass-card">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-success">
          <Flame size={48} className="accent-icon glow-pulse" />
          <h3>Your Judgment is Recorded.</h3>
          <p>The dark flames consume your offering.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="feedback-container glass-card">
      <h3 className="feedback-title">Rate the Arsenal</h3>
      <p className="feedback-desc">Is this domain worthy of its dark power, or does it need more hellfire?</p>
      
      <textarea 
        className="feedback-input" 
        placeholder="Leave a message in the ashes... (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={3}
      />

      <div className="feedback-actions">
        <button onClick={() => handleSubmit('DOMINANT')} className="btn-primary feedback-button">
          <Flame size={18} /> Absolutely Epic
        </button>
        <button onClick={() => handleSubmit('NEEDS_FIRE')} className="btn-social feedback-button">
          <ShieldAlert size={18} /> Needs More Fire
        </button>
      </div>
    </div>
  );
}
