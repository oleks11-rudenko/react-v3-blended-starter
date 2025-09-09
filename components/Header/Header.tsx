import Link from 'next/link';
import css from './Header.module.css';
import UsersMenu from '../UsersMenu/UsersMenu';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link href="/" aria-label="Home" className={css.headerLink}>
          Postly
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link className={css.navigationLink} href="/">
                Home
              </Link>
            </li>
            <li className={css.navigationItem}>
              <UsersMenu />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
