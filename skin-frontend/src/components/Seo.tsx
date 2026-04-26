import { Helmet } from 'react-helmet-async'

type SeoProps = {
  title: string
  description?: string
}

const SITE_NAME = 'Skin From North'

export default function Seo({ title, description }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const desc =
    description ??
    'Imported skincare in Pakistan — authentic products from CeraVe, Cetaphil, and The Ordinary.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
    </Helmet>
  )
}

