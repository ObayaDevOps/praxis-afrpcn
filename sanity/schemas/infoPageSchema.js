export default {
  name: 'infoPage',
  title: 'Info Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title for the info page (e.g., "Welcome to the Info Page!")',
    },
    {
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      description: 'A brief introductory paragraph for the page.',
    },
    {
      name: 'secondTitle',
      title: 'Second Title',
      type: 'string',
      description: 'The main title for the info page (e.g., "Welcome to the Info Page!")',
    },
        {
      name: 'secondIntroText',
      title: 'Second Introduction Text',
      type: 'text',
      description: 'A brief introductory paragraph for the team.',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'The heading for a content section (e.g., "Heading 1").',
            },
            {
              name: 'paragraph',
              title: 'Paragraph',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'The paragraph text for this content section.',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional image for this content block.',
            },
            {
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessible description for the image (recommended when image is provided).',
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'paragraph',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled Content Block',
                subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : 'No paragraph provided',
              };
            },
          },
        },
      ],
      description: 'Add and order sections with headings and paragraphs.',
    },
  ],
};
