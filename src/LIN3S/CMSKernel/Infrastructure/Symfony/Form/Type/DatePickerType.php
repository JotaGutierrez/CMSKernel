<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Symfony\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */
class DatePickerType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('date_picker', HiddenType::class)
            ->addModelTransformer(new CallbackTransformer(
                function ($value) {
                    return ['date_picker' => $value];
                },
                function ($value) {
                    return $value['date_picker'];
                }
            ));
    }

    public function getBlockPrefix()
    {
        return 'lin3s_cms_date_picker';
    }
}
