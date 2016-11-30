<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Persistence\Doctrine\DBAL\Menu\Types;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\GuidType;
use LIN3S\CMSKernel\Domain\Model\Menu\MenuItemId;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class MenuItemIdType extends GuidType
{
    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        if ($value instanceof MenuItemId) {
            return $value->id();
        }

        return $value;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return MenuItemId::generate($value);
    }

    public function getName()
    {
        return 'menu_item_id';
    }
}
