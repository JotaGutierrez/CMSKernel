/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {React} from './../../../bundle.dependencies';

class IconFileTypeXls extends React.Component {

  static propTypes = {
    cssClass: React.PropTypes.string
  };

  static defaultProps = {
    cssClass: ''
  };

  render() {
    const {cssClass} = this.props;
    const iconCssClass = `icon ${cssClass}`;

    return <svg
      className={iconCssClass}
      version="1.1"
      viewBox="0 0 58 58">
      <g>
        <path d="M50.95,12.187l-0.771-0.771L40.084,1.321L39.313,0.55C38.964,0.201,38.48,0,37.985,0H8.963C7.777,0,6.5,0.916,6.5,2.926V39
          v16.537V56c0,0.837,0.842,1.653,1.838,1.91c0.05,0.013,0.098,0.032,0.15,0.042C8.644,57.983,8.803,58,8.963,58h40.074
          c0.16,0,0.319-0.017,0.475-0.048c0.052-0.01,0.1-0.029,0.15-0.042C50.658,57.653,51.5,56.837,51.5,56v-0.463V39V13.978
          C51.5,13.211,51.408,12.645,50.95,12.187z M47.935,12H39.5V3.565L47.935,12z M8.963,56c-0.071,0-0.135-0.026-0.198-0.049
          C8.609,55.877,8.5,55.721,8.5,55.537V41h41v14.537c0,0.184-0.109,0.339-0.265,0.414C49.172,55.974,49.108,56,49.037,56H8.963z
          M8.5,39V2.926C8.5,2.709,8.533,2,8.963,2h28.595C37.525,2.126,37.5,2.256,37.5,2.391V14h11.609c0.135,0,0.264-0.025,0.39-0.058
          c0,0.015,0.001,0.021,0.001,0.036V39H8.5z"/>
        <polygon points="22.227,43.924 20.299,48.025 20.162,48.025 18.385,43.924 16.512,43.924 19.232,49.105 16.676,54 18.576,54
          20.299,50.199 20.436,50.199 22.035,54 23.936,54 21.379,49.105 24.1,43.924 	"/>
        <polygon points="28.037,43.924 26.369,43.924 26.369,54 32.672,54 32.672,52.756 28.037,52.756 	"/>
        <path d="M38.94,49.064c-0.314-0.228-0.654-0.422-1.019-0.581c-0.365-0.159-0.702-0.323-1.012-0.492
          c-0.31-0.169-0.57-0.364-0.779-0.588c-0.21-0.224-0.314-0.518-0.314-0.882c0-0.146,0.036-0.299,0.109-0.458
          c0.073-0.159,0.173-0.303,0.301-0.431c0.127-0.128,0.273-0.234,0.438-0.321s0.337-0.139,0.52-0.157
          c0.328-0.027,0.597-0.032,0.807-0.014c0.209,0.019,0.378,0.05,0.506,0.096c0.127,0.046,0.226,0.091,0.294,0.137
          s0.13,0.082,0.185,0.109c0.009-0.009,0.036-0.055,0.082-0.137c0.045-0.082,0.1-0.185,0.164-0.308
          c0.063-0.123,0.132-0.255,0.205-0.396c0.073-0.142,0.137-0.271,0.191-0.39c-0.265-0.173-0.611-0.299-1.039-0.376
          c-0.429-0.077-0.853-0.116-1.271-0.116c-0.41,0-0.8,0.063-1.169,0.191s-0.693,0.313-0.971,0.554
          c-0.278,0.241-0.499,0.535-0.663,0.882s-0.246,0.743-0.246,1.189c0,0.492,0.104,0.902,0.314,1.23
          c0.209,0.328,0.474,0.613,0.793,0.854c0.319,0.241,0.661,0.451,1.025,0.629c0.364,0.178,0.704,0.355,1.019,0.533
          s0.576,0.376,0.786,0.595c0.209,0.219,0.314,0.483,0.314,0.793c0,0.511-0.148,0.896-0.444,1.155c-0.296,0.26-0.723,0.39-1.278,0.39
          c-0.183,0-0.378-0.019-0.588-0.055c-0.21-0.036-0.419-0.084-0.629-0.144c-0.21-0.06-0.413-0.123-0.608-0.191
          c-0.196-0.068-0.358-0.139-0.485-0.212l-0.287,1.176c0.155,0.137,0.339,0.253,0.554,0.349c0.214,0.096,0.439,0.171,0.677,0.226
          c0.237,0.055,0.472,0.094,0.704,0.116s0.458,0.034,0.677,0.034c0.51,0,0.966-0.077,1.367-0.232
          c0.401-0.155,0.738-0.362,1.012-0.622s0.485-0.561,0.636-0.902s0.226-0.695,0.226-1.06c0-0.538-0.105-0.978-0.314-1.319
          C39.517,49.577,39.255,49.292,38.94,49.064z"/>
        <path d="M24.5,13h-12v4v2v2v2v2v2v2v2v4h10h2h21v-4v-2v-2v-2v-2v-2v-4h-21V13z M14.5,19h8v2h-8V19z M14.5,23h8v2h-8V23z M14.5,27h8
          v2h-8V27z M22.5,33h-8v-2h8V33z M43.5,33h-19v-2h19V33z M43.5,29h-19v-2h19V29z M43.5,25h-19v-2h19V25z M43.5,19v2h-19v-2H43.5z
          M14.5,17v-2h8v2H14.5z"/>
      </g>
    </svg>;
  }
}

export default IconFileTypeXls;
