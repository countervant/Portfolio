import React from 'react';
import { focusData } from '../../data';
import './Focus.css';

const Focus = () => {
  return (
    <section id="focus" className="section focus container reveal">
      <h2 className="section-title">focus</h2>
      <ul className="focus-list">
        {focusData.map((item, index) => (
          <li key={index} className="focus-item">
            {item}
          </li>
        ))}
      </ul>
      <div className="divider"></div>
    </section>
  );
};

export default Focus;
