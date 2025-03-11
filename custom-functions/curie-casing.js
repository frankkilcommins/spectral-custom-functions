
/**
 * Validates the casing of a CURIE (Compact URI) property. See https://www.w3.org/TR/2010/NOTE-curie-20101216/ for more details
 *
 * @param {string} targetVal - The target value to validate.
 * @param {object} opts - The options for validation.
 * @param {string} opts.type - The casing type to enforce (default: 'camel').
 * @param {object} paths - The paths for error reporting.
 * @returns {Array} - An array of error messages, if any.
 *
 * @author Frank Kilcommins (@frankkilcommins)
 */

const curieCasingPatterns = {
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
  
    if (!property.includes(':')) {
      return [];
    }
  
    const parts = property.split(':');
    if (parts.length !== 2) {
      return [
        {
          message: `${property} is not a valid CURIE`,
          path: paths.target,
        },
      ];
    }
  
    const [prefix, name] = parts;
    const pattern = curieCasingPatterns[casingType];
    if (!pattern) {
      return [
        {
          message: `Unknown casing type: ${casingType}`,
          path: paths.target,
        },
      ];
    }
  
    if (!pattern.test(prefix) || !pattern.test(name)) {
      return [
        {
          message: `${property} MUST follow ${casingType} case on both sides of the ':'`,
          path: paths.target,
        },
      ];
    }
  
    return [];
  };
  