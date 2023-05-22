import cn from 'classnames'

import * as MaterialIcons from 'react-icons/md'
import * as TfiIcons from 'react-icons/tfi'
import * as CgIcons from 'react-icons/cg'
import * as IoIcons from 'react-icons/io5'
import * as FiIcons from 'react-icons/fi'
import * as RxIcons from 'react-icons/rx'

const ReactIcons = {
  ...MaterialIcons,
  ...TfiIcons,
  ...CgIcons,
  ...IoIcons,
  ...FiIcons,
  ...RxIcons,
}

export type TypeReactIconName = keyof typeof ReactIcons

const MaterialIcon = ({
  name,
  isFlipHorizontal,
  className,
}: {
  name: TypeReactIconName
  isFlipHorizontal?: boolean
  className?: string
}) => {
  const IconComponent = ReactIcons[name]

  //   if (!IconComponent) {
  //     return <ReactIcons.MdDragIndicator />
  //   }

  return (
    <>
      {!!IconComponent ? (
        (
          <IconComponent
            className={cn(className, isFlipHorizontal ? 'flipHorizontal' : '')}
          />
        ) || (
          <ReactIcons.MdDragIndicator
            className={cn(className, isFlipHorizontal ? 'flipHorizontal' : '')}
          />
        )
      ) : (
        <ReactIcons.MdDragIndicator
          className={cn(className, isFlipHorizontal ? 'flipHorizontal' : '')}
        />
      )}
    </>
  )
}

export default MaterialIcon
