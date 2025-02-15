import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig
    ,{
        rules: {
            '@nx/enforce-module-boundaries': [
              'error',
              {
                enforceBuildableLibDependency: true,
                allow: [
                  '^.*/eslint(\\.base)?\\.config\\.[cm]?js$',
                  "@app/api"
                ],
                depConstraints: [
                  {
                    sourceTag: '*',
                    onlyDependOnLibsWithTags: ['*'],
                  },
                ],
              },
            ]
        }
    }
];
