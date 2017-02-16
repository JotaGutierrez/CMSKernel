<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
interface TranslatableRepository
{
    public function translatableOfId(TranslatableId $id);

    public function query($specification = null);

    public function count($specification = null);
}
