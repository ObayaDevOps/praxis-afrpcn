// Import document schemas
import LandingPageSchema from './schemas/landingPageSchema'
import RnDTaxCreditsPageSchema from './schemas/rndTaxCreditsPageSchema'
import CapitalAllowancePageSchema from './schemas/capitalAllowancePageSchema'
import AccountsnFilingPageSchema from './schemas/accountsFilingPageSchema'



export const schema = {
  types: [
    LandingPageSchema, 
    RnDTaxCreditsPageSchema,
    CapitalAllowancePageSchema,
    AccountsnFilingPageSchema
  ],
}
