/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

import {lin3sEventBus} from './../../bundle.dependencies';
import {TemplateSelector} from './../../bundle.components';

const init = () => {
  const templateSelectors = document.querySelectorAll('.template-selector');

  if (templateSelectors.length === 0) {
    return;
  }

  templateSelectors.forEach((templateSelector) => {
      new TemplateSelector(templateSelector);
  });
};

lin3sEventBus.onDomReady(init);
