import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="132" r="125" />
        <rect x="0" y="314" rx="0" ry="0" width="280" height="88" />
        <rect x="0" y="277" rx="10" ry="10" width="280" height="24" />
        <rect x="0" y="418" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="418" rx="10" ry="10" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton