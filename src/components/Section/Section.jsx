import PropTypes from 'prop-types';
import css from './Section.module.css';

function Section({children}) {
  return (
  <section className={css.Container}>
    {children}
  </section>
  );
}

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;