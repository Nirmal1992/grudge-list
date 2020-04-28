import React, { useContext } from 'react';
import Grudge from './Grudge';
import { useGrudges } from './GrudgeContext';

const Grudges = () => {
  const grudges = useGrudges();
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (
        <Grudge key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
};

export default Grudges;
