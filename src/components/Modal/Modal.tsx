import css from './Modal.module.css';

export default function Modal({ children }) {
  <div className={css.backdrop} role="dialog" aria-modal="true">
    <div className={css.modal}>{children}</div>
  </div>;
}
