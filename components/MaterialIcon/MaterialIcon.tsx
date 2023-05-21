import * as MaterialIcons from 'react-icons/md'
import * as TfiIcons from 'react-icons/tfi'
import * as CgIcons from 'react-icons/cg'

const ReactIcons = {
  ...MaterialIcons,
  ...TfiIcons,
  ...CgIcons,
}

type TypeReactIconName = keyof typeof ReactIcons

const MaterialIcon = ({
  name,
  isFlipHorizontal,
}: {
  name: TypeReactIconName
  isFlipHorizontal?: boolean
}) => {
  const IconComponent = ReactIcons[name]

  //   if (!IconComponent) {
  //     return <ReactIcons.MdDragIndicator />
  //   }

  return (
    <div className={isFlipHorizontal ? 'flipHorizontal' : ''}>
      {!!IconComponent ? (
        <IconComponent /> || <ReactIcons.MdDragIndicator />
      ) : (
        <ReactIcons.MdDragIndicator />
      )}
    </div>
  )
}

export default MaterialIcon
