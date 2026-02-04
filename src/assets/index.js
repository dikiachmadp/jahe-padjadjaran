// =============================================================================
// CENTRALIZED ASSET MANAGEMENT
// =============================================================================
// All assets should be imported through this file for consistency
// Usage: import { logo, heroBg } from 'assets'
// =============================================================================

// Logos
import logo from './logos/logo.svg'

// Images
import heroBg from './images/hero-bg.svg'

// Illustrations
import productShowcase from './illustrations/product-showcase.svg'

// Icons
import placeholderIcon from './icons/placeholder-icon.svg'

// Placeholders
import placeholder from './placeholders/placeholder.svg'

// =============================================================================
// EXPORTS
// =============================================================================
export {
  // Logos
  logo,
  
  // Images
  heroBg,
  
  // Illustrations
  productShowcase,
  
  // Icons
  placeholderIcon,
  
  // Placeholders
  placeholder
}

// =============================================================================
// OPTIONAL: Named exports by category for granular imports
// =============================================================================
export const logos = { logo }
export const images = { heroBg }
export const illustrations = { productShowcase }
export const icons = { placeholderIcon }
export const placeholders = { placeholder }
