import React from 'react';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import { useUndo, useGrudges, useRedo } from './GrudgeContext';

const Application = () => {
  const handleUndo = useUndo();
  const handleRedo = useRedo();
  const { past, future } = useGrudges();

  return (
    <div className="Application">
      <NewGrudge />
      <Grudges />
      <button
        disabled={!past.length}
        onClick={handleUndo}
        style={{ marginRight: '5px' }}
      >
        UNDO
      </button>
      <button disabled={!future.length} onClick={handleRedo}>
        REDO
      </button>
    </div>
  );
};

export default Application;
