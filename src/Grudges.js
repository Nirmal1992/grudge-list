import React from 'react';
import Grudge from './Grudge';
import { useGrudges } from './GrudgeContext';

const Grudges = () => {
  const { present: grudges } = useGrudges();
  console.log(useGrudges());
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
