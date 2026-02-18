import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'bxhqrawc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
export async function getHome() {
  const query = `
    *[_type == "home"][0]{
      title,
      learnSection{
        heading,
        subheading,
        body,
        ctaText,
        ctaUrl
      },
      learnSectionBottom{
        heading,
        subheading,
        body,
        ctaText,
        ctaUrl
      }
    }
  `

  return sanityClient.fetch(query)
}


export async function getAllGuides() {
  return sanityClient.fetch(`
    *[_type == "guide" && defined(slug.current)]
    | order(lastUpdated desc) {
      title,
      slug { current },
      seoTitle,
      seoDescription,
      targetAudience
    }
  `)
}

export async function getFeaturedGuides(limit = 3) {
  return sanityClient.fetch(
    `
    *[_type == "guide" && defined(slug.current)]
    | order(lastUpdated desc)[0...$limit]{
      title,
      slug { current },
      seoDescription,
      targetAudience
    }
    `,
    { limit }
  );
}


export async function getGuideBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "guide" && slug.current == $slug][0]{
      title,
      body,
      seoTitle,
      seoDescription,
      lastUpdated,
      relatedGuides[]->{
        title,
        slug { current }
      }
    }
  `,
    { slug }
  )
}
export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      siteTitle,
      headerLinks[]{
        label,
        url
      },
      ctaText,
      ctaUrl,
      footerCopyright,
      footerLinks[]{
        label,
        url
      }
    }
  `)
}


