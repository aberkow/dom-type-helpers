
/**
 * The base type for querying a DOM element using querySelector()
 */
type queryElementConfig = {
  selector: string,
  scope?: Document | Element
}

/**
 * Query for attributes based on querySelector and getAttribute 
 */
type queryAttributeConfig = queryElementConfig & { attribute: string }

/**
 * 
 * Query for DOM elements in a type safe way. Helps to avoid unnecessary code editor errors and/or tons of `null` checks
 * 
 * @param object config: A CSS selector to query the DOM
 * - selector: a CSS selector
 * - scope: the scope at which to query. defaults to `document`
 * @throws error 
 * 
 * @returns HTMLElement the queried element
 */
export const queryElement = (config: queryElementConfig): HTMLElement => {
  const scope = config.scope !== undefined ? config.scope : document

  if (scope === undefined) {
    throw new Error(`The scope '${scope}' is undefined`)
  }

  const el = scope.querySelector(config.selector)

  if (el === null) {
    throw new Error(`DOM Element with selector '${config.selector}' not found in ${scope}`)
  }

  return el as HTMLElement
}

/**
 * 
 * query a DOM element for its attributes. Returns an array of values
 * 
 * @param object config: A CSS selector to query the DOM
 * - selector: a CSS selector
 * - scope: the scope at which to query. defaults to `document`
 * - attributes: an array of attributes to find
 * 
 * @throws error on null attribute
 * @returns the attribute value
 */
export const queryAttribute = (config: queryAttributeConfig): string => {
  const el = queryElement(config)

  const attribute = el.getAttribute(config.attribute)
  
  if (attribute === null) {
    throw new Error(`The element ${el} does not have ${config.attribute} as an attribute`)
  }

  return attribute
}