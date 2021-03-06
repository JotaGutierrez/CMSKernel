<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Spec\LIN3S\CMSKernel\Domain\Model\Page;

use LIN3S\CMSKernel\Domain\Model\Page\PageId;
use LIN3S\SharedKernel\Domain\Model\Identity\Id;
use PhpSpec\ObjectBehavior;

class PageIdSpec extends ObjectBehavior
{
    function it_can_be_created()
    {
        $this->shouldHaveType(PageId::class);
        $this->shouldHaveType(Id::class);
    }
}
