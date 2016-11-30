<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Translation;

use LIN3S\SharedKernel\Domain\Model\Exception;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TranslatableDoesNotExistException extends Exception
{
    public function __construct()
    {
        parent::__construct('The translatable does not exist');
    }
}
