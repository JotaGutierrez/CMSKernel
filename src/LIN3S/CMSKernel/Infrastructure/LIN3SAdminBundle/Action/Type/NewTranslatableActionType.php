<?php

/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\CMSKernel\Infrastructure\LIN3SAdminBundle\Action\Type;

use LIN3S\AdminBundle\Action\ActionType;
use LIN3S\AdminBundle\Action\Type\EntityId;
use LIN3S\AdminBundle\Configuration\EntityConfiguration;
use LIN3S\AdminBundle\Form\FormHandler;
use LIN3S\SharedKernel\Application\CommandBus;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class NewTranslatableActionType implements ActionType
{
    use EntityId;

    private $flashBag;
    private $twig;
    private $formHandler;
    private $commandBus;
    private $urlGenerator;

    public function __construct(
        FormHandler $formHandler,
        CommandBus $commandBus,
        \Twig_Environment $twig,
        FlashBagInterface $flashBag,
        UrlGeneratorInterface $urlGenerator
    ) {
        $this->twig = $twig;
        $this->flashBag = $flashBag;
        $this->formHandler = $formHandler;
        $this->commandBus = $commandBus;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * {@inheritdoc}
     */
    public function execute($entity, EntityConfiguration $config, Request $request, $options = null)
    {
        $this->checkRequired($options, 'form');

        $locale = $request->query->get('locale');
//        if (loquesea) {
//            // TODO: HACER EL IF DE ARRIBA CUANDO EL LOCALE QUE NOS LLEGA NO ESTÁ DEFINIDO EN LA CONFIG
//            throw new NotFoundHttpException(
//                sprintf('%s locale is not supported from the admin', $locale)
//            );
//        }

        $form = $this->formHandler->createForm($options['form'], null, ['locale' => $locale]);
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $form->handleRequest($request);
            if ($form->isValid() && $form->isSubmitted()) {
                $this->commandBus->handle(
                    $form->getData()
                );
                $this->flashBag->add(
                    'lin3s_admin_success',
                    sprintf(
                        'The %s translation is successfully saved',
                        $config->name()
                    )
                );

                return $this->redirect($options, $config->name(), $form->getData());
            } else {
                $this->flashBag->add(
                    'lin3s_admin_error',
                    sprintf(
                        'Errors while saving %s translation. Please check all fields and try again',
                        $config->name()
                    )
                );
            }
        }

        return new Response(
            $this->twig->render('@LIN3SAdmin/Admin/new.html.twig', [
                'entity'       => $entity,
                'entityConfig' => $config,
                'locale'       => $locale,
                'form'         => $form->createView(),
            ])
        );
    }

    private function checkRequired($options, $field)
    {
        if (!isset($options[$field])) {
            throw new \InvalidArgumentException(
                sprintf(
                    '%s option is required so, you must declare inside action in the admin.yml', $field
                )
            );
        }
    }

    public function redirect($options, $entity, $command)
    {
        if (!isset($options['redirectAction'])) {
            return new RedirectResponse(
                $this->urlGenerator->generate('lin3s_admin_list', [
                    'entity' => $entity,
                ])
            );
        }

        return new RedirectResponse(
            $this->urlGenerator->generate('lin3s_admin_custom', [
                'action' => $options['redirectAction'],
                'entity' => $entity,
                'id'     => $command->id(),
            ])
        );
    }
}
