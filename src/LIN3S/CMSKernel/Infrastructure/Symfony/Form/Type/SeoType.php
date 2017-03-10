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

use LIN3S\CMSKernel\Domain\Model\Seo\Metadata;
use LIN3S\SharedKernel\Exception\InvalidArgumentException;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class SeoType extends AbstractType implements DataMapperInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('metaTitle', TextType::class, [
                'required' => false,
                'label'    => 'Meta title',
            ])
            ->add('metaDescription', TextType::class, [
                'required' => false,
                'label'    => 'Meta descripción',
            ])
            ->add('robotsIndex', ChoiceType::class, [
                'label'   => 'Indexación',
                'choices' => [
                    'Sí' => true,
                    'No' => false,
                ],
            ])
            ->add('robotsFollow', ChoiceType::class, [
                'label'   => 'Seguimiento',
                'choices' => [
                    'Sí' => true,
                    'No' => false,
                ],
            ])
            ->setDataMapper($this);
    }

    public function mapDataToForms($data, $forms)
    {
        if (null === $data) {
            return;
        }
        if (!$data instanceof Metadata) {
            throw new InvalidArgumentException(
                sprintf(
                    'Given data must be %s instance, %s given',
                    Metadata::class,
                    get_class($data)
                )
            );
        }

        $forms = iterator_to_array($forms);

        $forms['metaTitle']->setData($data->title()->title());
        $forms['metaDescription']->setData($data->description()->description());
        $forms['robotsIndex']->setData($data->robots()->index());
        $forms['robotsFollow']->setData($data->robots()->follow());
    }

    public function mapFormsToData($forms, &$data)
    {
        $forms = iterator_to_array($forms);

        if (empty($data)) {
            $data = [
                'metaTitle'       => '',
                'metaDescription' => '',
                'robotsIndex'     => true,
                'robotsFollow'    => true,
            ];
        } else {
            $data = [
                'metaTitle'       => $forms['metaTitle']->getData(),
                'metaDescription' => $forms['metaDescription']->getData(),
                'robotsIndex'     => $forms['robotsIndex']->getData(),
                'robotsFollow'    => $forms['robotsFollow']->getData(),
            ];
        }
    }
}
