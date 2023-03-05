import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'eCommerce Template',
  description:
    'This eCommerce template can be customized for all your small business needs.',
  keywords:
    'eCommerce, website template, web design, custom web development, React, Redux, MERN, MongoDB, Express.js, Node.js',
}

export default Meta
