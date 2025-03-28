import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
  h1Hero: {
    description: "Hero heading - largest text style",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '3rem', // 48px
      fontWeight: '600',
      lineHeight: '4rem', // 64px
    },
  },
  h2Header: {
    description: "Secondary heading",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '2rem', // 32px
      fontWeight: '400',
      lineHeight: '3rem', // 48px
    },
  },
  h3Header: {
    description: "Tertiary heading - uppercase variant",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '2rem', // 32px
      fontWeight: '400',
      lineHeight: '3rem', // 48px
      textTransform: 'uppercase',
    },
  },
  h4Header: {
    description: "Quaternary heading",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '1.25rem', // 20px
      fontWeight: '400',
      lineHeight: '1.875rem', // 30px
    },
  },
  body1: {
    description: "Primary body text",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '1rem', // 16px
      fontWeight: '400',
      lineHeight: '1.5rem', // 24px
    },
  },
  body1Bold: {
    description: "Primary body text - bold variant",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '1rem', // 16px
      fontWeight: '600',
      lineHeight: '1.5rem', // 24px
    },
  },
  body2: {
    description: "Secondary body text - smaller",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      lineHeight: '1.25rem', // 20px
    },
  },
  body2Bold: {
    description: "Secondary body text - smaller, bold variant",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.875rem', // 14px
      fontWeight: '600',
      lineHeight: '1.25rem', // 20px
    },
  },
  button: {
    description: "Button text style",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.25rem', // 20px
    },
  },
  caption: {
    description: "Caption text - small text for labels and captions",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.75rem', // 12px
      fontWeight: '400',
      lineHeight: '1.125rem', // 18px
    },
  },
  tiny: {
    description: "Tiny text - smallest text style",
    value: {
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.625rem', // 10px
      fontWeight: '400',
      lineHeight: '0.875rem', // 14px
    },
  },
}) 