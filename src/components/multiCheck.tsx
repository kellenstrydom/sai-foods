import { useState, useRef, useEffect } from 'react';
import { checkValueExists } from '../utils/checkValue';
import styles from './MultiCheck.module.css';

type WordEntry = {
  id: number;
  word: string;
  status: 'safe' | 'not_safe' | null;
};

export function MultiCheck() {
  const [entries, setEntries] = useState<WordEntry[]>([
    { id: 0, word: '', status: null },
  ]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Focus the last input when a new entry is added
  useEffect(() => {
    if (entries.length > 0) {
      const lastIndex = entries.length - 1;
      inputRefs.current[lastIndex]?.focus();
    }
  }, [entries.length]);

  const handleInputChange = (index: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, word: value } : entry
      )
    );
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const word = entries[index].word.trim().toLowerCase();
      if (!word) return;

      const isInTable = await checkValueExists(word);
      const updatedEntries = [...entries];

      updatedEntries[index] = {
        ...updatedEntries[index],
        word,
        status: isInTable ? 'not_safe' : 'safe',
      };

      if (index === entries.length - 1) {
        updatedEntries.push({
          id: updatedEntries.length,
          word: '',
          status: null,
        });
      }

      setEntries(updatedEntries);
    }
  };

  const handleRemove = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Live List Checker</h2>
      <div className={styles.container}>
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`${styles.entry} ${
              entry.status === 'safe'
                ? styles.safe
                : entry.status === 'not_safe'
                ? styles.notSafe
                : ''
            }`}
          >
            {/* Tick or cross to the left of the input */}
            {entry.status === 'safe' && (
              <span className={styles.statusIcon} title="Safe">
                ✔️
              </span>
            )}
            {entry.status === 'not_safe' && (
              <span className={styles.statusIcon} title="Not Safe">
                ❌
              </span>
            )}
            <input
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              value={entry.word}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={entry.status !== null}
              className={styles.input}
              placeholder="Enter word"
            />
            {entry.status !== null && (
              <button
                onClick={() => handleRemove(index)}
                className={styles.removeBtn}
                title="Remove"
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
