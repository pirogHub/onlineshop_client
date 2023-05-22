import { StylesConfig, GroupBase, OptionProps } from "react-select";
import { IOption } from "@/types/common";
import { CSSObjectWithLabel } from "react-select"


const helper_isSelected = (
    state: OptionProps<IOption, boolean, GroupBase<IOption>>,
    color_selected: string,
    color_notSelected: string
) => {
    return state.isSelected
        ? state.isSelected
            ? color_selected
            : color_notSelected
        : state.isSelected
            ? color_notSelected
            : color_selected
}

const helper_byTheme_isSelected = (
    theme: string,
    state: OptionProps<IOption, boolean, GroupBase<IOption>>,
    color_selected: string,
    color_notSelected: string
) => {
    return theme === 'dark' ?
        state.isSelected
            ? color_selected
            : color_notSelected
        : state.isSelected
            ? color_notSelected
            : color_selected
}

export const controlStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
    ...defaultStyles,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '1px solid #9E9E9E',
    height: '40px',
    boxShadow: 'none',
    borderRadius: '4px',
    '&:hover': {
        borderColor: '#9E9E9E',
    },
    '& .css-1dimb5e-singleValue': {
        color: theme === 'dark' ? '#f2f2f2' : '#222222',
    },
    borderRight: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
})
export const menuStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
    ...defaultStyles,
    boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
    borderRadius: '4px',
    height: 'auto',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f2f2f2f2',
    width: 'calc(100% + 40px)',
    minHeight: 30,
})

export const optionStyles = (
    defaultStyles: CSSObjectWithLabel,
    state: OptionProps<IOption, boolean, GroupBase<IOption>>,
    theme: string
) => {
    const backgroundHoverForLightMode = helper_isSelected(state, '#9e9e9e', '#f2f2f2')

    const backgroundHoverForDarkMode = helper_isSelected(state, '#f2f2f2', '#9e9e9e')

    const colorHoverForLightMode = helper_isSelected(state, '#f2f2f2', '#9e9e9e')

    const colorHoverForDarkMode = helper_isSelected(state, '#9e9e9e', '#f2f2f2')


    return {
        ...defaultStyles,
        cursor: 'pointer',
        padding: '6px 12px',
        margin: 0,
        '&:hover': {
            backgroundColor:
                theme === 'dark'
                    ? backgroundHoverForDarkMode
                    : backgroundHoverForLightMode,
            color: theme === 'dark' ? colorHoverForDarkMode : colorHoverForLightMode,
        },
        backgroundColor: helper_byTheme_isSelected(theme, state, '#f2f2f2', '#2d2d2d'),
        color: helper_byTheme_isSelected(theme, state, '#222222', '#f2f2f2'),
    }
}


export const inputStyles: StylesConfig<
    IOption,
    boolean,
    GroupBase<IOption>
> = {
    control: () => ({}),
    indicatorSeparator: () => ({ border: "none" }),
    dropdownIndicator: () => ({ display: "none" }),
    menuList: (defaultStyles) => ({
        ...defaultStyles,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 30,
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#454545',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'grey',
        }
    }),
    placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: '#b9babb'
    })
}