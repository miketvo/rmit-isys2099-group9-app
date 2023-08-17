import {createElement} from 'react'
import { useParams} from 'react-router-dom'

const generatePage = (pageName) => {
    const pageComponent = () => import(`../pages/${pageName}`).default
         
    try {
        return createElement(pageComponent())
    } catch (err) { 
        return <div><h2>Not Found</h2></div>
    }
}

const PageRender = () => {
    const {page, id, subPage, subId} = useParams()

    let pageName = ""

    if (id) {
        if (subPage) {
            if (subId) {
                pageName = `${page}/[id]/${subPage}/[id]`
            } else {
                pageName = `${page}/[id]/${subPage}`
            }
        } else {
            pageName = `${page}/[id]`
        }
    } else {
        pageName = `${page}`
    }

    return generatePage(pageName)
}

export default PageRender