export default {
  name: 'rndTaxCreditsPage',
  title: 'R&D Tax Credits Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main title for the R&D Tax Credits page',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
      description: 'Subtitle or tagline for the R&D Tax Credits page'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the page (optional)',
      options: {
        hotspot: true
      }
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines'
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'id',
              title: 'Section ID',
              type: 'string',
              description: 'Unique identifier for section (used for navigation)',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Title of the section',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'}
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'}
                    ]
                  }
                }
              ],
              description: 'Main content for this section with support for bullet points'
            },
            {
              name: 'accordionItems',
              title: 'Accordion Items',
              type: 'array',
              description: 'Nested content displayed in accordions',
              of: [
                {
                  type: 'object',
                  name: 'accordionItem',
                  fields: [
                    {
                      name: 'title',
                      title: 'Accordion Title',
                      type: 'string',
                      description: 'Title of the accordion item',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'text',
                      title: 'Accordion Content',
                      type: 'array',
                      of: [
                        {
                          type: 'block',
                          styles: [
                            {title: 'Normal', value: 'normal'},
                            {title: 'H3', value: 'h3'},
                            {title: 'H4', value: 'h4'}
                          ],
                          lists: [
                            {title: 'Bullet', value: 'bullet'},
                            {title: 'Numbered', value: 'number'}
                          ],
                          marks: {
                            decorators: [
                              {title: 'Strong', value: 'strong'},
                              {title: 'Emphasis', value: 'em'}
                            ]
                          }
                        }
                      ],
                      description: 'Content inside the accordion with support for bullet points'
                    }
                  ]
                }
              ]
            },
            {
                name: 'postContent',
                title: 'End Section Content',
                type: 'array',
                of: [
                  {
                    type: 'block',
                    styles: [
                      {title: 'Normal', value: 'normal'},
                      {title: 'H3', value: 'h3'},
                      {title: 'H4', value: 'h4'}
                    ],
                    lists: [
                      {title: 'Bullet', value: 'bullet'},
                      {title: 'Numbered', value: 'number'}
                    ],
                    marks: {
                      decorators: [
                        {title: 'Strong', value: 'strong'},
                        {title: 'Emphasis', value: 'em'}
                      ]
                    }
                  }
                ],
                description: 'Optional post-accordion content for this section with support for bullet points'
              },
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'R&D Tax Credits Page'
      }
    }
  }
}
