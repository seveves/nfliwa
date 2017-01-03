import { Component, h } from 'preact';
import Portal from 'preact-portal';

import './style.scss';

import InnerImage from './inner-image';

const React = { createElement: h };
declare const fetch: any;

interface IImage {
  imageId: string;
  imageUrl: String;
  base64: string;
}

export default class LazyImage extends Component<{ image: IImage }, { open: boolean }> {

  public open = () => this.setState({ open: true });
  public close = () => this.setState({ open: false });

  public render({ image }, { open = false }) {
    let style = { backgroundImage: 'url(' + image.base64 + ')' };
    return (
      <div>
        <div class="lazy-image" style={style} onClick={this.open}>
          <InnerImage imageUrl={image.imageUrl} />
        </div>
        { open ? (
          <Portal into="#modal">
            <div class="popup" onClick={this.close}>
              <img src={image.imageUrl} />
            </div>
          </Portal>
          ) : null }
      </div>
    );
  }
}
