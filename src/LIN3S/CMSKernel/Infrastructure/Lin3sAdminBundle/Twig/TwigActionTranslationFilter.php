<?php

/*
 * This file is part of the Admin Bundle.
 *
 * Copyright (c) 2015-2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\Lin3sAdminBundle\Twig;

use Symfony\Component\Translation\TranslatorInterface;

/**
 * Twig action translation filter.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class TwigActionTranslationFilter extends \Twig_Extension
{
    /**
     * The translator.
     *
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * Constructor.
     *
     * @param TranslatorInterface $translator The translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            'action_translation' => new \Twig_Filter('action_translation', [$this, 'actionTranslation']),
        ];
    }

    /**
     * Callback of action translation Twig filter that returns resultant array.
     *
     * @param string $options The action options
     *
     * @return array|string
     */
    public function actionTranslation($options)
    {
        if (!is_array($options)) {
            return $this->translator->trans($options, [], 'CmsKernelAdminBridge');
        }

        $resultOptions = [];
        foreach ($options as $optionKey => $option) {
            $option = null === json_decode($option, true) ? $option : json_decode($option, true);

            if (is_array($option)) {
                foreach ($option as $iterationKey => $iteration) {
                    if (is_array($iteration)) {
                        foreach ($iteration as $iKey => $i) {
                            if (is_array($i)) {
                                foreach ($i as $iiKey => $ii) {
                                    $resultOptions[$optionKey][$iterationKey][$iKey][$iiKey] = $this->translator->trans($ii, [], 'CmsKernelAdminBridge');
                                }
                            } else {
                                $resultOptions[$optionKey][$iterationKey][$iKey] = $this->translator->trans($i, [], 'CmsKernelAdminBridge');
                            }
                        }
                    } else {
                        $resultOptions[$optionKey][$iterationKey] = $this->translator->trans($iteration, [], 'CmsKernelAdminBridge');
                    }
                }
            } else {
                $resultOptions[$optionKey] = $this->translator->trans($option, [], 'CmsKernelAdminBridge');
            }
        }

        return $resultOptions;
    }
}
