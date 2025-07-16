// Import document schemas
import LandingPageSchema from './schemas/landingPageSchema'
import ArtistProfileSchema from './schemas/artistProfileSchema'
import InfoPageSchema from './schemas/infoPageSchema'

export const schema = {
  types: [
    LandingPageSchema, 
    ArtistProfileSchema,
    InfoPageSchema,
  ],
}
