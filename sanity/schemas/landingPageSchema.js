import { HomeIcon, UsersIcon, } from '@sanity/icons'

export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: HomeIcon,
  // Limit to a single instance
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title (Browser Tab)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (for SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Logo Image',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      icon: HomeIcon,
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'OUR SERVICES',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              name: 'service',
              title: 'Service',
              type: 'object',
              fields: [
                {
                  name: 'iconImage',
                  title: 'Icon Image (SVG preferred)',
                  type: 'image',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'backgroundImage',
                  title: 'Background Image',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'linkText',
                  title: 'Link Text',
                  type: 'string',
                  initialValue: 'Find out more',
                },
                {
                  name: 'linkUrl',
                  title: 'Link URL (e.g., #section-id or /page)',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whoWeAreSection',
      title: 'Who We Are Section',
      type: 'object',
      icon: UsersIcon,
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Who We Are',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'ifaAccredited',
          title: 'IFA Accredited Panel',
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'IFA Logo',
              type: 'image',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'IFA Accredited',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description1',
              title: 'Description Paragraph 1',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description2',
              title: 'Description Paragraph 2',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Icon Image (SVG preferred)',
                  type: 'image',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'pageTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Landing Page',
        subtitle: 'Singleton Page Configuration',
      }
    },
  },
}
