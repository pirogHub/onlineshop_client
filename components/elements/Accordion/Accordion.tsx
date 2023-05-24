import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IAccordion } from '@/types/common'
import cn from 'classnames'
const Accordion = ({
  children,
  title,
  titleClass,
  arrowOpenClass,
  isMobileForFilters,
  hideArrowClass,
  isExpandedDefault,
  callback,
  boxShadowStyle,
}: IAccordion) => {
  const [expanded, setExpanded] = useState(isExpandedDefault ? true : false)

  const toggleAccordion = () => {
    if (callback) callback(expanded)
    setExpanded(!expanded)
  }

  return (
    <>
      {title ? (
        isMobileForFilters ? (
          <button
            style={{ boxShadow: boxShadowStyle }}
            className={`${titleClass} ${hideArrowClass}`}
          >
            {title}
          </button>
        ) : (
          <motion.button
            initial={false}
            onClick={toggleAccordion}
            className={cn(
              titleClass,
              expanded ? (isMobileForFilters ? '' : arrowOpenClass) : ''
            )}
          >
            {title}
          </motion.button>
        )
      ) : (
        ''
      )}
      <AnimatePresence initial={false}>
        {(isMobileForFilters || expanded) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Accordion
