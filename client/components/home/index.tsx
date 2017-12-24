import { Component, h } from 'preact';

import './style.scss';

import Markdown from '../../lib/markdown';

export default class Home extends Component<{path, title}, {page}> {

  public render({ }, { page }) {
    return (
      <div>
        <About />
        <Info />
        <SocialMedia />
        <Footer />
      </div>
    );
  }
}

const About = () => (
  <section class="about">
    <div class="card">
      <h1>Willkommen!</h1>
      <h3>Ortsgruppe Plochingen-Reichenbach-Lichtenwald</h3>
      <p>Als im Jahre 1946 von einigen Männern und Frauen die Ortsgruppe der NaturFreunde gegründet wurde, konnten sie nicht ahnen, welchen Aufschwung diese nehmen würde.
Das Vereinsleben entwickelte sich und ein Holzhaus auf dem Spielberg in Hegenlohe (heute Lichtenwald) wurde erstellt und mit viel Idealismus wurde dieses weiter ausgebaut und war fortan der Mittelpunkt des Vereinsgeschehens.<br/><br/>
Aber bald schon wurde dieses Haus zu klein.<br/><br/> 1968 wurde der Grundstein zum Bau des heutigen „Schurwaldhauses“ der NaturFreunde OG Plochingen-Reichenbach-Lichtenwald gelegt.<br/><br/> Weit über 17000 Arbeitsstunden Eigenleistung der Mitglieder und deren Freunde wurden erbracht, bevor das Haus 1971 der Öffentlichkeit übergeben wurde.
Das Haus hat jetzt 44 Betten, davon 10 im Matratzenlager- Ein Campingplatz und ein Spielplatz sind dem Haus angegliedert.<br/> Für Wanderer wurden 40 km Rundwanderwege ausgeschildert.<br/><br/>
Das Schurwaldhaus ist voll bewirtschaftet durch Verpachtung an die Fam. Haug
    </p>
  </div>
  </section>
);

const Info = () => (
  <section class="about right">
    <div class="card">
      <h1>Wir engagieren uns ...</h1>
      <ul>
        <li>für eine sozial-ökologische <a href="https://www.naturfreunde.de/movum-briefe-zur-transformation">Transformation</a> von Politik und Gesellschaft</li>
        <li>für naturnahe und bezahlbare Erholung für alle</li>
        <li>im Natur- und Umweltschutz, zum Beispiel beim Engagement für den Erhalt der Biologischen Vielfalt</li>
        <li>in der Umweltbildung für Kinder und Jugendliche</li>
        <li>für die Energiewende, zum Beispiel beim Engagement gegen Fracking, Kohle, Atom und Bebauung von Landschaftsschutzgebieten</li>
        <li>im Natursport, zum Beispiel bei der Ausbildung im naturfreundlichen Breitensport</li>
        <li>für einen sanften Tourismus (zum Beispiel auf unseren <a href="https://www.naturfreunde.de/natura-trails">Natura Trails</a>, wie auch einer in unserer Umgebung entstehen soll)</li>
      </ul>
      <div class="info">
        <a class="btn-link" href="/client/static/mitgliedschaft" alt="more info about membership">Infos zur Mitgliedschaft</a>
      </div>
  </div>
  </section>
);

const SocialMedia = () => (
  <section class="social">
    <div class="row">
      <div class="col">
        <h2>Social Media</h2>
        <p>Egal ob auf Facebook oder Instagram.<br/><br/>
          Verfolge unsere Aktivitäten oder verlinke uns bei deinen Aktivitäten rund um unser NaturFreunde-Haus.
        </p>
        <p>Wir beobachten in den Kanälen alles mit dem Hashtag <b>#naturfreundelichtenwald</b></p>
        <br/>
        <ul>
          <li>
            <a href="https://fb.me/naturfreundelichtenwald" alt="facebook">
              <img src="img/fb-logo.png" alt="facebook logo"/>
              <span>@naturfreundelichtenwald auf Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/naturfreundelichtenwald" alt="instagram">
              <img src="img/instagram-logo.png" alt="instagram logo"/>
              <span>@naturfreundelichtenwald auf Instagram</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col">
        <h2>Vereinsleben</h2>
        <p>Egal ob bei unseren Vereinsabenden, in der Seniorengruppe oder der Frauengymnastik.<br/>
        Wir freuen uns immer auf neue Gesichter!<br/>
        </p>
        <p>Besonders stolz sind wir auf unser naturpädagogisches Angebot für Grundschulkinder der 1. bis 3. Klasse: die <b>Umweltdetektive</b>!</p>
        <p>Neben den ganz kleinen Umweltentdeckern bieten wir desweiteren mit der <b>Naturforscherwerkstatt</b> ein Angebot für Kinder der 4. bis 7. Klasse an.</p>
        <div class="info">
          <a class="btn-link" href="/client/static/gruppen" alt="more info about our groups">Zu unseren Gruppen</a>
        </div>
      </div>
      <div class="col">
        <h2>Unser Haus</h2>
        <p>Unser Schurwaldhaus ist ein besonders beliebtes Ausflugsziel für Wanderer, Radfahrer und Familien.<br/><br/>
        Die große Terasse lädt bei tollem Wetter zum draußen sitzen ein und unser großer Naturspielplatz wie das Ziegengehege bieten auch für Kinder Unterhaltung.<br/><br/>
        Unser Haus ist voll bewirtschaftet durch Verpachtung an die Fam. Haug.<br/> Die Webseite zum Schurwaldbesen finden sie <a href="http://www.schurwaldbesen.com/" alt="homepage link">hier</a>
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <div class="footer">
    <div>
      <a href="/client/static/impressum" alt="imprint">Impressum</a>
    </div>
  </div>
)
