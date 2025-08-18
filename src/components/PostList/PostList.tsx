import css from './PostList.module.css';

export default function PostList() {
  return (
    <ul className={css.list}>
      {/* список постів, кожен з яких створює наступну розмітку */}
      <li className={css.listItem}>
        <h2 className={css.title}>Title</h2>
        <p className={css.content}>Контент</p>
        <div className={css.footer}>
          <button className={css.edit}>Edit</button>
          <button className={css.delete}>Delete</button>
        </div>
      </li>
    </ul>
  );
}
