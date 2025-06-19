export default {
  name: 'artistProfile',
  title: 'Artist Profile',
    type: 'document',
    fields: [
      {
      name: 'artistTitle',
      title: 'Artist Title',
        type: 'string',
      description: 'The main title for the artist\'s profile.',
      },
      {
      name: 'artistSubtitle',
      title: 'Artist Subtitle',
        type: 'string',
      description: 'A subtitle or brief description for the artist.',
      },
      {
      name: 'carouselImage',
      title: 'Carousel Image',
        type: 'image',
        options: {
        hotspot: true, // Enables hotspot for image cropping
      }
    },
    {
      name: 'about',
      title: 'About',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A rich text section for general information about the artist or project.',
    },
    {
      name: 'voiceNote',
      title: 'Voice Note',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      description: 'An audio file for a voice note related to the project.',
    },
    {
      name: 'voiceNoteDescription',
      title: 'Voice Note Description',
      type: 'text',
      description: 'A description for the voice note.',
    },
    {
      name: 'gallery',
      title: 'Gallery',
                type: 'array',
                of: [
                  {
          type: 'image',
          options: {
            hotspot: true, // Enables hotspot for image cropping
          },
                    fields: [
                      {
              name: 'caption',
                        type: 'string',
              title: 'Caption',
              description: 'Caption for the image in the gallery.',
            },
          ],
        },
      ],
      description: 'A collection of images for the gallery.',
    },
    {
      name: 'additionalContent',
      title: 'Additional Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'An optional additional section for the artist profile.',
    },
  ],
};
  