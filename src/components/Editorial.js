import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../assets/Editorial.css';

const elements = { div: motion.div, article: motion.article, li: motion.li };

export const Reveal = ({ as = 'div', delay = 0, children, ...props }) => {
  const reducedMotion = useReducedMotion();
  const Element = elements[as] || motion.div;
  return <Element {...props} initial={reducedMotion ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </Element>;
};

export const SectionHeading = ({ number, kicker, title, id }) => <Reveal className="editorial-heading">
  <div className="editorial-heading-title">
    <p className="editorial-eyebrow"><span aria-hidden="true">{number} /</span>{kicker}</p>
    <h2 id={id}>{title}</h2>
  </div>
</Reveal>;
