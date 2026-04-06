/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              fontSize: '1.0625rem',
              lineHeight: '1.7',
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.375rem',
                fontWeight: 700,
              },
              h3: {
                fontSize: '1.2rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              fontSize: '1.125rem',
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.625rem',
              },
              h3: {
                fontSize: '1.35rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
