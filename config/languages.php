<?php

return [
    'supported_locales' => [
        'fr' => [
            'name' => 'Français',
            'flag' => '🇫🇷',
            'is_default' => true
        ],
        'en' => [
            'name' => 'English',
            'flag' => '🇬🇧',
            'is_default' => false
        ],
        'de' => [
            'name' => 'Deutsch',
            'flag' => '🇩🇪',
            'is_default' => false
        ]
    ],
    
    'fallback_locale' => 'fr',
    
    'hide_default_locale_in_url' => true
];
