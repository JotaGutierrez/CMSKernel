<?php

/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\BenGorFileBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $treeBuilder->root('cms_kernel_ben_gor_file_bridge')
            ->children()
                ->arrayNode('file_types')
                    ->prototype('array')
                        ->children()
                            ->arrayNode('upload_endpoint')->addDefaultsIfNotSet()
                                ->children()
                                    ->scalarNode('path')
                                        ->defaultValue(null)
                                    ->end()
                                    ->scalarNode('name')
                                        ->defaultValue(null)
                                    ->end()
                                ->end()
                            ->end()
                            ->arrayNode('gallery_endpoint')->addDefaultsIfNotSet()
                                ->children()
                                    ->scalarNode('path')
                                        ->defaultValue(null)
                                    ->end()
                                    ->scalarNode('name')
                                        ->defaultValue(null)
                                    ->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ->end();

        return $treeBuilder;
    }
}
