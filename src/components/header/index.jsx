import { Component, h, createRef } from 'preact';
import { Link } from 'preact-router/match';

import styles from './style.css';

export default class Header extends Component {
  burgerMenuRef = createRef();
  toggleVisRef = createRef();

  toggleMenu = () => {
    this.burgerMenuRef.current.classList.toggle(styles.change);
    this.toggleVisRef.current.classList.toggle(styles.hiddenSm);
  };

  render() {
    return (
      <nav>
        <h2>
          <a href="/">NaturFreunde Lichtenwald</a>
        </h2>
        <div className={styles.burgerMenu} ref={this.burgerMenuRef} onClick={this.toggleMenu}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        <ul ref={this.toggleVisRef} className={styles.hiddenSm}>
          <li>
            <Link activeClassName={styles.active} href="/posts" alt="news">
              Neuigkeiten
            </Link>
          </li>
          <li>
            <Link activeClassName={styles.active} href="/gruppen" alt="groups">
              Gruppen
            </Link>
          </li>
          <li>
            <Link activeClassName={styles.active} href="/wanderwege" alt="hiking trails">
              Wanderwege
            </Link>
          </li>
          <li>
            <Link activeClassName={styles.active} href="/termine" alt="events">
              Termine
            </Link>
          </li>
          <li>
            <Link activeClassName={styles.active} href="/mitgliedschaft" alt="membership">
              Mitgliedschaft
            </Link>
          </li>
          <li>
            <Link activeClassName={styles.active} href="/asl" alt="ausserschulische lernorte">
              ASL
            </Link>
          </li>
          <li>
            <a href="https://trails.naturfreunde-lichtenwald.de" alt="NaturFreunde Trails">
              MTB-Trails
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
