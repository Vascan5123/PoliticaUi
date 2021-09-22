<?php

/*
 * This file is part of vascan/politica-ui.
 *
 * Copyright (c) 2021 Lupan Vasile.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Vascam\PoliticaUi;

use Flarum\Extend;
use Flarum\Api\Event\Serializing;
use Swader\Web3Address\Listener\AddUserWeb3AddressAttribute;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale')



];
