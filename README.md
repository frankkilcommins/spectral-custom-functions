# A Collection of Custom Spectral Functions

From time to time, there's a need to have some more flexibility than just the [core functions](https://docs.stoplight.io/docs/spectral/cb95cf0d26b83-core-functions) within [**Spectral**](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview). This is where the ability to define your own [custom functions](https://docs.stoplight.io/docs/spectral/a781e290eb9f9-custom-functions) is awesome! 

Here's a collection of custom Spectral functions I find myself using from time to time.

| Function   | Description     | Details|
| ---------- | -------------- | -----|
| `hal-casing` | Apply casing rules in combination with _Hypertext Application Language (HAL)_ keywords | [view](#hal-casing) |
| `curie-casing` | Apply _casing_ rules in combination with _Compact URI_ syntax | [view](#curie-casing) |

## How to use

To leverage these rules along with you `*.spectral.yaml|json` ruleset, do the following:

- create a folder relative to your ruleset file called `custom-functions`
- within your ruleset file specify the `functionDir` and  `functions` as follows:

```yaml
functions: [hal-casing, curie-casing]
functionsDir: ./custom-functions
```

A full example ruleset taking advantage of these rules can be found in the [.spectral.yaml](.spectral.yaml) file in this repo.

## Usage

Feel free to use or extend this work (referencing to this repo is preferred). PRs back with more useful functions are much appreciated 💚.

🌟 the repo if it's been useful for your work.

## Custom Rules

### hal-casing

If your APIs are conforming to the [HAL specification](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11#name-reserved-properties) and leveraging `application/hal+json`, then you might find it cumbersome to use the core **casing** function. This `hal-casing` function gives you the ability to apply your casing of choice (e.g., `camelCase` or `snake-case`), while safely allowing reserved properties for HAL as defined in the [HAL specification](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11#name-reserved-properties).

Supported cases:

| name   | sample         |
| ------ | -------------- |
| flat   | verylongname   |
| camel  | veryLongName   |
| pascal | VeryLongName   |
| kebab  | very-long-name |
| cobol  | VERY-LONG-NAME |
| snake  | very_long_name |
| macro  | VERY_LONG_NAME |

#### Example rule leveraging the function

```yaml
camelCase-property-names:
description: Property names must be camelCase
severity: error
recommended: true
message: '{{property}} MUST follow camelCase'
given: $..properties.*~
then:
    function: hal-casing
    functionOptions:
    type: camel
```

#### Sample schemas that pass the rule

> notice use of `_embedded` and `_links` reserved HAL keywords

```yaml
schemas:
Policy:
    type: object
    properties:
    policyNumber:
        description: The insurance policy number
        type: string
        example: IXP12345678
    iso100:
        description: Policy complies with random ISO
        type: boolean
        example: true           
PagedPolicies:
    type: object
    properties:
    _embedded:
        type: object
        properties:
        policies:
            type: array
            items:
            $ref: '#/components/schemas/Policy'
    _links:
        type: object
        properties:
        self:
            type: object
            properties:
            href:
                type: string
```

### curie-casing

If your APIs specify or leverage compact URIs conforming to the [CURIE Syntax](https://www.w3.org/TR/2010/NOTE-curie-20101216/), then you might find it cumbersome to use the core **casing** function. This `curie-casing` function gives you the ability to apply your casing of choice (e.g., `camelCase` or `snake-case`),

 This `curie-casing` function gives you the ability to apply your casing of choice (e.g., `camelCase` or `snake-case`), while safely allowing CURIEs. Currently the function applies the chosen casing to both the _prefix_ and the _reference_ (e.g., both sides of the `:` delimiter).

Supported cases:

| name   | sample         |
| ------ | -------------- |
| flat   | verylongname   |
| camel  | veryLongName   |
| pascal | VeryLongName   |
| kebab  | very-long-name |
| cobol  | VERY-LONG-NAME |
| snake  | very_long_name |
| macro  | VERY_LONG_NAME |

#### Example rule leveraging the **curie-casing** function

```yaml
  curie-property-names:
    description: CURIE properties must follow camelCase
    severity: error
    recommended: true
    message: '{{property}} MUST follow camelCase on both sides of the ":"'
    given: $..properties.*~
    then:
      function: curie-casing
      functionOptions:
        type: camel 
```

#### Sample schemas that pass the **curie-casing** rule

```yaml
  schemas:
    Policy:
      type: object
      properties:
        policyNumber:
          description: The insurance policy number
          type: string
          example: IXP12345678
        iso100:
          description: Policy complies with random ISO
          type: boolean
          example: true           
    PagedPolicies:
      type: object
      properties:
        _embedded:
          type: object
          properties:
            policies:
              type: array
              items:
                $ref: '#/components/schemas/Policy'
        _links:
          type: object
          properties:
            self:
              type: object
              properties:
                href:
                  type: string
            ea:policy:
              type: object
              properties:
                self:
                  type: object
                  properties:
                    href:
                      type: string
                ea:customer:
                  type: object
                  properties:
                    href:
                      type: string
```
