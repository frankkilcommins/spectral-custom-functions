
/**
 * Validates the casing of a property based on the specified casing type.
 *
 * @param {string} targetVal - The property to validate.
 * @param {object} opts - The options for validation.
 * @param {string} opts.type - The casing type to validate against. Defaults to 'camel'.
 * @param {object} paths - The paths object containing the target property path.
 * @returns {Array} - An array of validation errors, if any.
 * 
 * Function conforms to reserved properties for HAL as defined in the HAL specification:
 * https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11#name-reserved-properties
 *
 * @author Frank Kilcommins (@frankkilcommins)
 */

const casingPatterns = {
    flat: /^[a-z]+$/,
    camel: /^[a-z]+[A-Za-z0-9]*$/,
    pascal: /^[A-Z][A-Za-z0-9]*$/,
    kebab: /^[a-z]+(-[a-z]+)*$/,
    cobol: /^[A-Z]+(-[A-Z]+)*$/,
    snake: /^[a-z]+(_[a-z]+)*$/,
    macro: /^[A-Z]+(_[A-Z]+)*$/
  };
  
  module.exports = (targetVal, opts, paths) => {
    const property = targetVal;
    const casingType = opts && opts.type ? opts.type : 'camel';
    const except = ['_links', '_embedded'];
  
    if (except.includes(property) || property.includes(':')) {
      return [];
    }
  
    const pattern = casingPatterns[casingType];
    if (!pattern) {
      return [
        {
          message: `Unknown casing type: ${casingType}`,
          path: paths.target,
        },
      ];
    }
  
    if (!pattern.test(property)) {
      return [
        {
          message: `${property} MUST follow ${casingType} case`,
          path: paths.target,
        },
      ];
    }
  
    return [];
  };
  