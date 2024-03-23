import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function SlideElement({ slideData, style }) {
    const [isVisible, setIsVisible] = useState(true)

    const handleScroll =() => {
      const slideElement = document.querySelector('#slide-element')
      if(slideElement){
        const elementTop = slideElement.getBoundingClientRect().top
        const elementBottom = slideElement.getBoundingClientRect().bottom

        setIsVisible(elementTop < window.innerHeight && elementBottom >= 0)
      }
    }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div id="slide-element" className={`${isVisible ? 'appear' : slideData.typeOut}`} style={style}>
     {slideData.content}
    </div>

  )
}
SlideElement.propTypes = {
  slideData: PropTypes.shape({
    typeOut: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }) ,
  style: PropTypes.object.isRequired,
}
export default SlideElement