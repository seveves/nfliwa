import { Component, h, render } from 'preact';
import { Link } from 'preact-router/match';

import './style.scss';

export default class Header extends Component<{}, { active }> {

  toggleMenu = (ev) => {
    document.getElementsByClassName('burger-menu')[0].classList.toggle('change');
    document.getElementsByClassName('toggle-vis')[0].classList.toggle('hidden-sm');
  }

  public render() {
    return (
      <nav>
        <h2>
          <a href="/client">NaturFreunde Lichtenwald</a>
        </h2>
        <div class="burger-menu" onClick={this.toggleMenu}>
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
        <ul class="toggle-vis hidden-sm">
          <li><Link activeClassName="active" href="/client/posts" alt="news">Neuigkeiten</Link></li>
          <li><Link activeClassName="active" href="/client/static/gruppen" alt="groups">Gruppen</Link></li>
          <li><Link activeClassName="active" href="/client/static/wanderwege" alt="hiking trails">Wanderwege</Link></li>
          <li><Link activeClassName="active" href="/client/events" alt="events">Veranstaltungen</Link></li>
          <li><Link activeClassName="active" href="/client/static/termine" alt="events">Termine</Link></li>
          <li><Link activeClassName="active" href="/client/static/mitgliedschaft" alt="membership">Mitgliedschaft</Link></li>
        </ul>
      </nav>
    );
  }
}
