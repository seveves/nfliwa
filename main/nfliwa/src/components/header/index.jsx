import { Component, h } from 'preact';
import { Link } from 'preact-router/match';

import './style.scss';

export default class Header extends Component {
  burgerMenuRef = createRef();
  toggleVisRef = createRef();

  toggleMenu = () => {
    this.burgerMenuRef.current.classList.toggle('change');
    this.toggleVisRef.current.classList.toggle('hidden-sm');
  };

  render() {
    return (
      <nav>
        <h2>
          <a href="/client">NaturFreunde Lichtenwald</a>
        </h2>
        <div class="burger-menu" ref={this.burgerMenuRef} onClick={this.toggleMenu}>
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
        <ul ref={this.toggleVisRef} class="toggle-vis hidden-sm">
          <li>
            <Link activeClassName="active" href="/posts" alt="news">
              Neuigkeiten
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/gruppen" alt="groups">
              Gruppen
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/wanderwege" alt="hiking trails">
              Wanderwege
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/termine" alt="events">
              Termine
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/mitgliedschaft" alt="membership">
              Mitgliedschaft
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
