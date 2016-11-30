import { Component, h } from 'preact';
import './style.scss';

import InnerImage from './inner-image';

const React = { createElement: h };
declare const fetch: any;

interface IImage {
  imageId: string;
  imageUrl: String;
  base64: string;
}

export default class LazyImage extends Component<{ image: IImage }, {}> {

  public render({ image }) {
    let style = { backgroundImage: 'url(' + image.base64 + ')' };
    return (
      <div class="lazy-image" style={style}>
        <InnerImage imageUrl={image.imageUrl} />
      </div>
    );
  }
}
