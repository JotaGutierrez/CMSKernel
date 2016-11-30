<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Domain\Model\Page;

use LIN3S\SharedKernel\Domain\Model\Exception;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class PageDoesNotExistException extends Exception
{
    public function __construct()
    {
        parent::__construct('The page does not exist');
    }
}
